import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../UserPage.css'; // Import CSS file

const UserPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/auth/user', { credentials: 'include' });

        console.log("Response: " + response);
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
    return <div className="user-page-loading">Loading...</div>;
  }

  return (
    <div className="user-page">
      <button onClick={() => navigate(-1)}>Go Back</button> {/* Go back to the previous page */}
      <div className="user-header">
        <h1>Welcome, {user.name}!</h1>
        <img
          src={user.picture}
          alt="User Profile"
          className="user-profile-image"
        />
      </div>
      <div className="user-reviews">
        <h2>Your Reviews</h2>
        <p>No reviews yet!</p>
      </div>
    </div>
  );
};

export default UserPage;
