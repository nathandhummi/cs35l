import { useEffect, useState } from 'react';

// components
import ReviewDetails from '../components/ReviewDetails'
import ReviewForm from '../components/ReviewForm'

const Home = () => {
    const [reviews, setReviews] = useState(null);
  
    useEffect(() => {
      const fetchReviews = async () => {
        const response = await fetch('/api/reviews');
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
        <ReviewForm />
      </div>
    );
};

export default Home;