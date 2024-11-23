import { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get foodItemId
import { useReviewsContext } from '../hooks/useReviewsContext';

// components
import ReviewDetails from '../components/ReviewDetails';
import ReviewForm from '../components/ReviewForm';

const ReviewPage = () => {
    const { reviews, dispatch } = useReviewsContext();
    const { id: foodItemId } = useParams(); // Extract foodItemId from the URL

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`/api/reviews`); // Fetch reviews for a specific food item
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
            <h1>Reviews for Food Item</h1>
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
