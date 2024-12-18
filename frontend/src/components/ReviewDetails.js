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

    // Fetch the current user and determine like status
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/auth/user", { credentials: "include" });
                if (!response.ok) throw new Error("Failed to fetch user");

                const data = await response.json();
                setCurrentUserId(data.id);

                // Check if the user has already liked the review
                if (review.likedBy) {
                    setHasLiked(review.likedBy.includes(data.id));
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUser();
    }, [review.likedBy]);

    // Toggle like functionality
    const toggleLike = async () => {
        try {
            // Optimistically update UI
            const isLiked = hasLiked || (review.likedBy?.includes(currentUserId));
            setHasLiked(!isLiked);
            setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

            // Send request to toggle like
            const response = await fetch(`/api/reviews/${review._id}/like`, {
                method: "PATCH",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to toggle like");

            const data = await response.json();

            // Sync state with server response
            setHasLiked(data.review.likedBy.includes(currentUserId));
            setLikeCount(data.review.likedBy.length);
        } catch (error) {
            console.error("Error toggling like:", error);

            // Revert optimistic updates if an error occurs
            setHasLiked((prev) => !prev);
            setLikeCount((prev) => (hasLiked ? prev + 1 : prev - 1));
        }
    };

    // Handle delete review
    const handleDelete = async () => {
        const response = await fetch(`/api/reviews/${review._id}`, {
            method: "DELETE",
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_REVIEW", payload: json });
        }
    };

    // Default user information handling
    const userProfilePicture = review.user?.profilePicture || "/default-gray-square.png";
    const userName = review.user?.name || "Anonymous";

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
            <span className="star-rate">{'★'.repeat(review.stars)}</span>
            <h4>{review.title} </h4>
            <p>
                <strong>Review: </strong>
                {review.description}
            </p>
            <p>
            
                
            </p>
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
