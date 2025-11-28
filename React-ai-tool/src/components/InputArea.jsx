import { useState } from "react";
import "./InputArea.css";

function InputArea({ onSendMessage, disabled = false }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="input-area">
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-wrapper">
          <textarea className="message-input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Message ChatGPT..." rows="1" disabled={disabled} />
          <button type="submit" className="send-button" disabled={!input.trim() || disabled}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 8L14 2L10 8L14 14L2 8Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </form>
      <div className="input-footer">
        <span className="footer-text">Rishabh Ai Prototype. Check important info.</span>
      </div>
    </div>
  );
}

export default InputArea;
