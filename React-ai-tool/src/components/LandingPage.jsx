import { useState } from "react";
import "./LandingPage.css";
import Login from "./Login";
import Signup from "./Signup";

function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="header-content">
          <div className="logo">AI Assistant</div>
          <div className="header-actions">
            <button
              className="login-btn"
              onClick={() => {
                setAuthMode("login");
                setShowAuthModal(true);
              }}
            >
              Log in
            </button>
            <button
              className="signup-btn"
              onClick={() => {
                setAuthMode("signup");
                setShowAuthModal(true);
              }}
            >
              Sign up for free
            </button>
          </div>
        </div>
      </header>

      <main className="landing-main">
        <div className="landing-content">
          <h1 className="landing-title">What can I help with?</h1>

          <div
            className="input-container"
            onClick={() => {
              setShowLoginPrompt(true);
              setTimeout(() => setShowLoginPrompt(false), 3000);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="action-buttons">
              <button className="action-btn" onClick={(e) => e.stopPropagation()}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Attach
              </button>
              <button className="action-btn" onClick={(e) => e.stopPropagation()}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 4V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Search
              </button>
              <button className="action-btn" onClick={(e) => e.stopPropagation()}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4H14M2 8H14M2 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Study
              </button>
            </div>
            <input
              type="text"
              className="landing-input"
              placeholder="Ask anything"
              onClick={(e) => {
                e.stopPropagation();
                setShowLoginPrompt(true);
                setTimeout(() => setShowLoginPrompt(false), 3000);
              }}
              readOnly
            />
            <button
              className="voice-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowLoginPrompt(true);
                setTimeout(() => setShowLoginPrompt(false), 3000);
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z" fill="currentColor" />
                <path d="M19 10V12C19 15.87 15.87 19 12 19M5 10V12C5 15.87 8.13 19 12 19M12 19V23M8 23H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setShowAuthModal(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {authMode === "login" ? <Login onSwitchToSignup={() => setAuthMode("signup")} onClose={() => setShowAuthModal(false)} /> : <Signup onSwitchToLogin={() => setAuthMode("login")} onClose={() => setShowAuthModal(false)} />}
          </div>
        </div>
      )}

      {showLoginPrompt && (
        <div className="login-prompt-toast">
          <div className="login-prompt-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Please login first to continue</span>
            <button
              className="login-prompt-btn"
              onClick={() => {
                setShowLoginPrompt(false);
                setAuthMode("login");
                setShowAuthModal(true);
              }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
