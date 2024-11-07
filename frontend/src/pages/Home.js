import { useEffect, useState } from 'react';
import ReviewDetails from '../components/ReviewDetails'
const Home = () => {
    const [reviews, setReviews] = useState(null);
  
    useEffect(() => {
      const fetchReviews = async () => {
        const response = await fetch('http://localhost:4000/api/reviews');
        const json = await response.json();
  
        if (response.ok) {
          setReviews(json);
        }
      };
  
      fetchReviews();
    }, []);
  
    return (
      <div className="home">
        <div className="notes">
          {reviews && reviews.map(review => (
            <ReviewDetails key={review._id} review={review} />
          ))}
        </div>
      </div>
    );
};

export default Home;