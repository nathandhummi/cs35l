import React, { useEffect, useState } from 'react';

const UserPage = () => {
  const [user, setUser] = useState(null); // State to store user info

  useEffect(() => {
    // Fetch user info from the backend
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:4000/auth/user', {
            credentials: 'include', // Include cookies for session management
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user');
          }
          const data = await response.json();
          setUser(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>; // Show a loading message until user data is available
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Welcome, {user.name}!</h1>
      <img
        src={user.picture}
        alt="User Profile"
        style={{ borderRadius: '50%', width: '150px', height: '150px' }}
      />
      {/* Placeholder for future reviews */}
      <div style={{ marginTop: '20px' }}>
        <h2>Your Reviews</h2>
        <p>No reviews yet!</p>
      </div>
    </div>
  );
};

export default UserPage;