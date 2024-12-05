import { useReviewsContext } from "../hooks/useReviewsContext";
import { useEffect, useState } from "react"; // Import useState and useEffect for fetching the current user
import formatDistanceToNow from "date-fns/formatDistanceToNow"; // For formatting dates

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

    return (
        <div className="review-details">
            <h4>{review.title}</h4>
            <p>
                <strong>Review: </strong>
                {review.description}
            </p>
            <p>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</p>
            {review.user === currentUserId && ( // Only show the delete button if the review was posted by the current user
                <span className="material-symbols-outlined" onClick={handleClick}>
                    delete
                </span>
            )}
        </div>
    );
};

export default ReviewDetails;
