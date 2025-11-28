import "./ChatMessage.css";

function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <div className={`message-wrapper ${isUser ? "user" : "ai"}`}>
      <div className="message-container">
        <div className="message-avatar">
          {isUser ? (
            <div className="avatar-user">U</div>
          ) : (
            <div className="avatar-ai">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="message-content">
          <div className="message-text">{message.text}</div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;

