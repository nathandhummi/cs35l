import { useEffect} from 'react'
import { useReviewsContext } from '../hooks/useReviewsContext'

// components
import ReviewDetails from '../components/ReviewDetails'
import ReviewForm from '../components/ReviewForm'

const Home = () => {
    // dont need this useState because using global state from context
    //const [reviews, setReviews] = useState(null);
    const { reviews, dispatch } = useReviewsContext()
  
    useEffect(() => {
      const fetchReviews = async () => {
        const response = await fetch('/api/reviews')
        const json = await response.json()
  
        if (response.ok) {
          // fire dispatch function in turn, fires reviewsReducer function
          // and passes in the action which is down here
          console.log(json)
          dispatch({type: 'SET_REVIEWS', payload: json})
        }
      }
  
      fetchReviews()
    }, [dispatch])
  
    return (
      <div className="home">
        <div className="notes">
          {reviews && reviews.map(review => (
            <ReviewDetails review={review} key={review._id}/>
          ))}
        </div>
        <ReviewForm />
      </div>
    )
}

export default Home