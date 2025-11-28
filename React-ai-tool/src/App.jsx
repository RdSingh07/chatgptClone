import { useState, useEffect } from "react";
import "./App.css";
import { useAuth } from "./contexts/AuthContext";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import InputArea from "./components/InputArea";
import LandingPage from "./components/LandingPage";
import { generateAIResponse } from "./services/geminiService";
import { getConversations, createConversation, getMessages, addMessage, clearAllConversations } from "./services/conversationService";

function App() {
  const { isAuthenticated, loading, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load conversations from localStorage when user logs in
  useEffect(() => {
    if (user && isAuthenticated) {
      const userConversations = getConversations(user.id);
      if (userConversations.length > 0) {
        setConversations(userConversations);
        // Set first conversation as active
        setActiveConversation(userConversations[0].id);
        setMessages(userConversations[0].messages || []);
      } else {
        // Create first conversation if none exist
        const newConv = createConversation(user.id);
        setConversations([newConv]);
        setActiveConversation(newConv.id);
        setMessages([]);
      }
    }
  }, [user, isAuthenticated]);

  const handleSendMessage = async (text) => {
    if (!user || !activeConversation) return;

    // Add user message (question) to localStorage
    const userMessage = addMessage(user.id, activeConversation, {
      text,
      sender: "user",
    });

    // Update local state
    setMessages((prev) => [...prev, userMessage]);
    setIsLoadingAI(true);

    try {
      // Generate AI response using Gemini
      const aiResponse = await generateAIResponse(text, messages);

      // Add AI message (answer) to localStorage
      const aiMessage = addMessage(user.id, activeConversation, {
        text: aiResponse,
        sender: "ai",
      });

      // Update local state
      setMessages((prev) => [...prev, aiMessage]);

      // Refresh conversations to update title if needed
      const updatedConversations = getConversations(user.id);
      setConversations(updatedConversations);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage = addMessage(user.id, activeConversation, {
        text: "Sorry, I encountered an error. Please try again.",
        sender: "ai",
      });
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleNewChat = () => {
    if (!user) return;

    // Create new conversation in localStorage
    const newConv = createConversation(user.id);

    // Update state
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversation(newConv.id);
    setMessages([]);

    // Close sidebar on mobile
    setIsSidebarOpen(false);
  };

  const handleSelectConversation = (conversationId) => {
    if (!user) return;

    // Load messages from localStorage
    const conversationMessages = getMessages(user.id, conversationId);
    setActiveConversation(conversationId);
    setMessages(conversationMessages);

    // Close sidebar on mobile after selection
    setIsSidebarOpen(false);
  };

  const handleClearAll = () => {
    if (!user) return;

    if (window.confirm("Are you sure you want to clear all conversation history? This action cannot be undone.")) {
      clearAllConversations(user.id);

      // Create new conversation
      const newConv = createConversation(user.id);
      setConversations([newConv]);
      setActiveConversation(newConv.id);
      setMessages([]);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className="app-container">
      <Sidebar conversations={conversations} activeConversation={activeConversation} onSelectConversation={handleSelectConversation} onNewChat={handleNewChat} onClearAll={handleClearAll} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}
      <div className="main-content">
        <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <ChatArea messages={messages} isLoadingAI={isLoadingAI} />
        <InputArea onSendMessage={handleSendMessage} disabled={isLoadingAI} />
      </div>
    </div>
  );
}

export default App;
