import { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import { useAuth } from "../contexts/AuthContext";

function Sidebar({ conversations, activeConversation, onSelectConversation, onNewChat, onClearAll, isOpen, onClose }) {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Get first letter of first name
  const getFirstLetter = () => {
    if (user?.name) {
      const firstName = user.name.split(" ")[0];
      return firstName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-header-top">
          <button className="new-chat-btn" onClick={onNewChat}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            New chat
          </button>
          <button
            className="close-sidebar-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {conversations.length > 0 && (
          <button className="clear-all-btn" onClick={onClearAll} title="Clear all conversations">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4H14M6 4V2H10V4M5 4L6 14H10L11 4H5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Clear All
          </button>
        )}
      </div>

      <div className="conversations-list">
        {conversations.map((conversation) => (
          <div key={conversation.id} className={`conversation-item ${activeConversation === conversation.id ? "active" : ""}`} onClick={() => onSelectConversation(conversation.id)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4H14M2 8H14M2 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="conversation-title">{conversation.title}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-footer" ref={dropdownRef}>
        <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="user-avatar">{getFirstLetter()}</div>
          <span className="user-name">{user?.name || user?.email || "User"}</span>
        </div>

        {showDropdown && (
          <div className="user-dropdown">
            <div className="dropdown-item" onClick={logout}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 14H3C2.46957 14 1.96086 13.7893 1.58579 13.4142C1.21071 13.0391 1 12.5304 1 12V4C1 3.46957 1.21071 2.96086 1.58579 2.58579C1.96086 2.21071 2.46957 2 3 2H6M11 11L15 8M15 8L11 5M15 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
