import { useReviewsContext } from "../hooks/useReviewsContext";
import { useEffect, useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import '../ReviewDetails.css';

const ReviewDetails = ({ review }) => {
    const { dispatch } = useReviewsContext();
    const [currentUserId, setCurrentUserId] = useState(null);
    const [likeCount, setLikeCount] = useState(review.likedBy?.length || 0);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/auth/user", { credentials: "include" });
                if (!response.ok) throw new Error("Failed to fetch user");

                const data = await response.json();
                setCurrentUserId(data.id);

                if (review.likedBy) {
                    setHasLiked(review.likedBy.includes(data.id));
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUser();
    }, [review.likedBy]);

    const toggleLike = async () => {
        try {
            const isLiked = hasLiked || (review.likedBy?.includes(currentUserId));
            setHasLiked(!isLiked);
            setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

            const response = await fetch(`/api/reviews/${review._id}/like`, {
                method: "PATCH",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to toggle like");

            const data = await response.json();
            setHasLiked(data.review.likedBy.includes(currentUserId));
            setLikeCount(data.review.likedBy.length);
        } catch (error) {
            console.error("Error toggling like:", error);
            setHasLiked((prev) => !prev);
            setLikeCount((prev) => (hasLiked ? prev + 1 : prev - 1));
        }
    };

    const handleDelete = async () => {
        const response = await fetch(`/api/reviews/${review._id}`, {
            method: "DELETE",
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_REVIEW", payload: json });
        }
    };

    const userProfilePicture = review.user?.profilePicture || "/default-gray-square.png";
    const userName = review.user?.name || "Anonymous";
    const foodItemName = review.foodItem?.name || "Unknown Food Item"; // Fallback if food item is not populated
    const diningHallName =review.foodItem?.diningHall || "Unknown dining hall"


    return (
        <div className="review-details">
            <div className="review-header">
                <div className="user-info">
                    <img
                        src={userProfilePicture}
                        alt={`${userName}'s profile`}
                        className="profile-picture"
                    />
                    <span className="user-name">{userName}</span>
                </div>
            </div>
            <h4>Title: {review.title}</h4>
            <p>
                <strong>Review: </strong>
                {review.description}
                
            </p>
            <span className="star-rating">{'★'.repeat(review.stars)}</span>
            <div className="reviewed-item-container">
                <img 
                    src={review.foodItem?.image || '/default-food-image.png'} 
                    alt={foodItemName} 
                    className="food-item-image" 
                />
                <p className="reviewed-item">
                    <em>
                      <strong>{foodItemName}</strong> from <strong>{diningHallName}</strong>
                    </em>
                </p>
            </div>
            <p>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</p>
            <button onClick={toggleLike} className="like-button">
                <FontAwesomeIcon icon={faThumbsUp} />
                <span className="like-count"> {likeCount}</span>
            </button>
            {review.user?._id === currentUserId && (
                <span className="material-symbols-outlined" onClick={handleDelete}>
                    delete
                </span>
            )}
        </div>
    );
    
    
};
export default ReviewDetails;

