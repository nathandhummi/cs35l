import { useReviewsContext } from "../hooks/useReviewsContext";
import { useEffect, useState } from "react"; // Import useState and useEffect for fetching the current user
import formatDistanceToNow from "date-fns/formatDistanceToNow"; // For formatting dates
import '../ReviewDetails.css';

const ReviewDetails = ({ review }) => {
    const { dispatch } = useReviewsContext();
    const [currentUserId, setCurrentUserId] = useState(null); // State to store the logged-in user's ID

    // Fetch the logged-in user info
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/auth/user", { credentials: "include" });
                if (!response.ok) throw new Error("Failed to fetch user");

                const data = await response.json();
                setCurrentUserId(data.id); // Save the current user's ID
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUser();
    }, []);

    const handleClick = async () => {
        const response = await fetch("/api/reviews/" + review._id, {
            method: "DELETE",
        });
        const json = await response.json();

        if (response.ok) {
            console.log(json);
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
