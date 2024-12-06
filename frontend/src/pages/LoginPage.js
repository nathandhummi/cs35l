import React, { useEffect } from 'react';
import '../LoginPage.css';

const LoginPage = () => {
  const handleLogin = () => {
    // Redirect to the backend's Google login route
    window.location.href = 'http://localhost:4000/auth/google';
  };

  useEffect(() => {
    const emojiContainer = document.getElementById('emoji-container');

    // Generate falling emojis at intervals
    const interval = setInterval(() => {
      const emoji = document.createElement('div');
      emoji.textContent = ['🥟', '🍕', '🌯', '🍔', '🍝', '🥗', '🍣', '🥘'][Math.floor(Math.random() * 8)];
      emoji.className = 'falling-emoji';
      emoji.style.left = `${Math.random() * 100}vw`; // Random horizontal position
      emojiContainer.appendChild(emoji);

      // Remove the emoji after it's out of view
      setTimeout(() => {
        emojiContainer.removeChild(emoji);
      }, 5000); // Adjust based on animation duration
    }, 200); // Adjust frequency

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="login-container">
      <div id="emoji-container"></div>
      <h1 className="login-title">Welcome to Bite Club</h1>
      <button className="login-button" onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;