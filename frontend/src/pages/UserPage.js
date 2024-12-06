import React, { useEffect, useState } from 'react';
import { useReviewsContext } from '../hooks/useReviewsContext';
import ReviewDetails from '../components/UserReviewDetails';
import { useNavigate } from 'react-router-dom';
import '../UserPage.css';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { reviews, dispatch } = useReviewsContext();
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchUser = async () => {
      console.log("function fired")
      try {
        const response = await fetch('/auth/user', { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to fetch user');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/user/${user.id}`, { credentials: 'include' });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_REVIEWS', payload: json }); // Replace cached reviews with user-specific reviews
        } else {
          console.error('Failed to fetch reviews:', json);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    if (user && user.id) {
      fetchReviews();
      console.log("hi:", user.id)
    }
  }, [dispatch, user]);

  if (!user) {
    return <div className="user-page-loading">Loading user info...</div>;
  }

  return (
    <div className="user-page">
      <button onClick={() => navigate(-1)}>Go Back</button> {/* Go back to the previous page */}
      <div className="user-header">
        <h1>Welcome, {user.name}!</h1>
        <img src={user.picture} alt="User Profile" className="user-profile-image" />
      </div>
      <div className="reviews">
        <h1>Your Reviews</h1>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewDetails review={review} key={review._id} />
          ))
        ) : (
          <p>No reviews from you.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
