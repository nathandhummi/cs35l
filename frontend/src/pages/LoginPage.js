import React from 'react';

const LoginPage = () => {
  const handleLogin = () => {
    // Redirect to the backend's Google login route
    window.location.href = 'http://localhost:4000/auth/google';
  };

  return (
    <div>
      <h1>Welcome to UCLA Dining</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;