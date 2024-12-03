import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to get foodItemId
import { useReviewsContext } from '../hooks/useReviewsContext';


// components
import ReviewDetails from '../components/ReviewDetails';
import ReviewForm from '../components/ReviewForm';

const ReviewPage = () => {
    const { reviews, dispatch } = useReviewsContext();
    const { id: foodItemId } = useParams(); // Extract foodItemId from the URL
    const [foodItemName, setFoodItemName] = useState(''); // State to store the food item name
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFoodItem = async () => {
            try {
                const response = await fetch(`/api/foodItems/${foodItemId}`); // Fetch food item details
                const json = await response.json();

                if (response.ok) {
                    console.log("Fetched food item:", json); // Debugging log
                    setFoodItemName(json.name); // Update the food item name
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
            <h1>Reviews for {foodItemName || 'Food Item'}</h1> {/* Display the food item name */}
            <div className="reviews">
                {reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ReviewDetails review={review} key={review._id} />
                    ))
                ) : (
                    <p>No reviews available for this food item.</p>
                )}
            </div>
            <ReviewForm foodItemId={foodItemId} /> {/* Pass the foodItemId to the ReviewForm */}
        </div>
    );
};

export default ReviewPage;
