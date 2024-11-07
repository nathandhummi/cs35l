const ReviewDetails = ({review}) => {
    return(
        <div className = "review details">
            <h4>{review.title}</h4>
            <p><strong>Description: </strong>{review.description}</p>
            <p>{review.createdAt}</p>
        </div>
    )
}
export default ReviewDetails