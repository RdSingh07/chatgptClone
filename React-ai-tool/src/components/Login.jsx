import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";

function Login({ onSwitchToSignup, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const result = await login(email, password);
    
    if (result.success) {
      if (onClose) onClose();
    } else {
      setError(result.error || "Login failed");
    }
    
    setLoading(false);
  };

  return (
    <>
      <div className="auth-header">
        <h1>Welcome back</h1>
        <p>Log in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Don't have an account?{" "}
          <button type="button" className="link-button" onClick={onSwitchToSignup}>
            Sign up
          </button>
        </p>
      </div>
    </>
  );
}

export default Login;

