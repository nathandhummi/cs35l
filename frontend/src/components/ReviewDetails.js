import { useReviewsContext } from "../hooks/useReviewsContext";
import { useEffect, useState } from "react"; // Import useState and useEffect for fetching the current user
import formatDistanceToNow from "date-fns/formatDistanceToNow"; // For formatting dates
import '../ReviewDetails.css';

const ReviewDetails = ({ review }) => {
    const { dispatch } = useReviewsContext();
    const [currentUserId, setCurrentUserId] = useState(null);
    const [likeCount, setLikeCount] = useState(review.likedBy?.length || 0); // Ensure likedBy is defined
    const [hasLiked, setHasLiked] = useState(false); // Default to false until checked

    // Fetch the current user and determine like status
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/auth/user", { credentials: "include" });
                if (!response.ok) throw new Error("Failed to fetch user");

                const data = await response.json();
                setCurrentUserId(data.id);

                // Determine if the user has already liked the review
                if (review.likedBy) {
                    setHasLiked(review.likedBy.includes(data.id));
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUser();
    }, [review.likedBy]); // Re-run when likedBy changes

    // Toggle like functionality
    const toggleLike = async () => {
        try {
            // Optimistically update UI
            const isLiked = hasLiked || (review.likedBy && review.likedBy.includes(currentUserId));
            setHasLiked(!isLiked);
            setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

            // Send request to toggle like
            const response = await fetch(`/api/reviews/${review._id}/like`, {
                method: "PATCH",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to toggle like");

            
            console.log("Log before requestin json response");
            const data = await response.json();
            console.log("Server response after like toggle:", data);
            
        
            // Sync state with server response
            console.log("Log before setHasLiked");
            console.log("data:", data);
            setHasLiked(data.review.likedBy.includes(currentUserId));
            console.log("Log after setHasLiked");

            setLikeCount(data.review.likedBy.length);
        } catch (error) {
            console.error("Error toggling like:", error);

            // Revert optimistic updates if an error occurs
            setHasLiked((prev) => !prev);
            setLikeCount((prev) => (hasLiked ? prev + 1 : prev - 1));
        }
    };

    // Handle delete review
    const handleClick = async () => {
        const response = await fetch("/api/reviews/" + review._id, {
            method: "DELETE",
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_REVIEW", payload: json });
        }
    };

    // Handle cases where review.user is null
    const userProfilePicture = review.user?.profilePicture || "/default-gray-square.png"; // Default gray square image
    const userName = review.user?.name || "Anonymous";

    return (
        <div className="review-details">
            {/* Top section with profile picture, name, and delete button */}
            <div className="review-header">
                <div className="user-info">
                    <img
                        src={userProfilePicture}
                        alt={`${userName}'s profile`}
                        className="profile-picture"
                    />
                    <span className="user-name">{userName}</span>
                </div>
                {review.user && review.user._id === currentUserId && (
                    <span className="delete-button material-symbols-outlined" onClick={handleClick}>
                        delete
                    </span>
                )}
            </div>

            {/* Review content */}
            <div className="review-content">
                <h4 className="review-title">{review.title}</h4>
                <p>
                    <strong>Review: </strong>
                    {review.description}
                </p>
                <p className="review-time">
                    {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </p>
            </div>
        </div>
    );
};

export default ReviewDetails;

