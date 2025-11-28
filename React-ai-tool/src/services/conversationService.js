// Conversation service for handling Q&A storage in JSON format with localStorage

// Get storage key for a specific user
const getStorageKey = (userId) => `chatgpt_clone_conversations_${userId}`;

// Get all conversations for a user
export const getConversations = (userId) => {
  const storageKey = getStorageKey(userId);
  const conversationsJson = localStorage.getItem(storageKey);
  if (!conversationsJson) {
    return [];
  }
  try {
    return JSON.parse(conversationsJson);
  } catch (error) {
    console.error("Error parsing conversations data:", error);
    return [];
  }
};

// Save conversations for a user
const saveConversations = (userId, conversations) => {
  try {
    const storageKey = getStorageKey(userId);
    localStorage.setItem(storageKey, JSON.stringify(conversations));
  } catch (error) {
    console.error("Error saving conversations data:", error);
    throw new Error("Failed to save conversations");
  }
};

// Create a new conversation
export const createConversation = (userId, title = "New Chat") => {
  const conversations = getConversations(userId);
  const newConversation = {
    id: Date.now(),
    title,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  conversations.unshift(newConversation); // Add to beginning
  saveConversations(userId, conversations);
  return newConversation;
};

// Get a specific conversation by ID
export const getConversation = (userId, conversationId) => {
  const conversations = getConversations(userId);
  return conversations.find((conv) => conv.id === conversationId) || null;
};

// Add a message (question or answer) to a conversation
export const addMessage = (userId, conversationId, message) => {
  const conversations = getConversations(userId);
  const conversation = conversations.find((conv) => conv.id === conversationId);
  
  if (!conversation) {
    throw new Error("Conversation not found");
  }

  // Create message object
  const newMessage = {
    id: Date.now(),
    text: message.text,
    sender: message.sender, // "user" or "ai"
    timestamp: new Date().toISOString(),
  };

  // Add message to conversation
  conversation.messages.push(newMessage);
  conversation.updatedAt = new Date().toISOString();

  // Update title if it's the first user message
  if (conversation.messages.length === 1 && message.sender === "user") {
    conversation.title = message.text.substring(0, 50) + (message.text.length > 50 ? "..." : "");
  }

  saveConversations(userId, conversations);
  return newMessage;
};

// Get all messages for a conversation
export const getMessages = (userId, conversationId) => {
  const conversation = getConversation(userId, conversationId);
  return conversation ? conversation.messages : [];
};

// Update conversation title
export const updateConversationTitle = (userId, conversationId, title) => {
  const conversations = getConversations(userId);
  const conversation = conversations.find((conv) => conv.id === conversationId);
  
  if (!conversation) {
    throw new Error("Conversation not found");
  }

  conversation.title = title;
  conversation.updatedAt = new Date().toISOString();
  saveConversations(userId, conversations);
};

// Delete a conversation
export const deleteConversation = (userId, conversationId) => {
  const conversations = getConversations(userId);
  const filtered = conversations.filter((conv) => conv.id !== conversationId);
  saveConversations(userId, filtered);
};

// Clear all conversations for a user
export const clearAllConversations = (userId) => {
  const storageKey = getStorageKey(userId);
  localStorage.removeItem(storageKey);
};

// Export conversation data as JSON
export const exportConversation = (userId, conversationId) => {
  const conversation = getConversation(userId, conversationId);
  if (!conversation) {
    return null;
  }
  return JSON.stringify(conversation, null, 2);
};

// Export all conversations as JSON
export const exportAllConversations = (userId) => {
  const conversations = getConversations(userId);
  return JSON.stringify(conversations, null, 2);
};

