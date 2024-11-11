import { useReviewsContext } from "../hooks/useReviewsContext"

const ReviewDetails = ({ review }) => {
    const { dispatch } = useReviewsContext()

    const handleClick = async () => {
        const response = await fetch('/api/reviews/' + review._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            console.log(json)
            dispatch({type: 'DELETE_REVIEW', payload: json})
        }
    }
    return(
        <div className = "review-details">
            <h4>{review.title}</h4>
            <p><strong>Review: </strong>{review.description}</p>
            <p>{review.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}
export default ReviewDetails