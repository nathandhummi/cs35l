import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to get foodItemId
import { useReviewsContext } from '../hooks/useReviewsContext';
import '../ReviewPage.css'


// components
import ReviewDetails from '../components/ReviewDetails';
import ReviewForm from '../components/ReviewForm';

const ReviewPage = () => {
    const { reviews, dispatch } = useReviewsContext();
    const { id: foodItemId } = useParams(); // Extract foodItemId from the URL
    const [foodItem, setFoodItem] = useState({}); // State to store food item details
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const fetchFoodItem = async () => {
            try {
                const response = await fetch(`/api/foodItems/${foodItemId}`); // Fetch food item details
                const json = await response.json();

                if (response.ok) {
                    console.log("Fetched food item:", json); // Debugging log
                    setFoodItem(json); // Update food item details (name, image, etc.)
                } else {
                    console.error("Failed to fetch food item:", json);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        if (foodItemId) {
            fetchFoodItem(); // Fetch food item details when foodItemId is available
        }
    }, [foodItemId]);

    //fetch the user in the session.
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

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                console.log("Food Item ID: " + foodItemId);
                const response = await fetch(`/api/reviews/${foodItemId}`); // Fetch reviews for a specific food item
                const json = await response.json();
                if (response.ok) {
                    console.log("Fetched reviews:", json); // Debugging log
                    dispatch({ type: 'SET_REVIEWS', payload: json });
                } else {
                    console.error("Failed to fetch reviews:", json);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        if (foodItemId) {
            fetchReviews(); // Only fetch reviews if foodItemId is available
        }
    }, [dispatch, foodItemId]);

    return (
        <div className="review-page">
            <button onClick={() => navigate(-1)}>Go Back</button> {/* Go back to the previous page */}
            {/* Food item banner */}
            {foodItem.image && (
                <div
                    className="food-banner"
                    style={{
                        backgroundImage: `url(${foodItem.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <h1 className="food-title">{foodItem.name || 'Food Item'}</h1>
                </div>
            )}
            <div className="reviews">
                <h2>Reviews for {foodItem.name || 'Food Item'}</h2>
                {reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ReviewDetails review={review} key={review._id} />
                    ))
                ) : (
                    <p>No reviews available for this food item.</p>
                )}
            </div>
            <ReviewForm 
                foodItemId={foodItemId} 
                userId={user ? user.id : null} 
            /> {/* Pass foodItemId and userId to ReviewForm */}
        </div>
    );
};

export default ReviewPage;
