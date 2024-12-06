import { useState } from 'react';
import { useReviewsContext } from '../hooks/useReviewsContext';
import '../ReviewForm.css';

const ReviewForm = ({ foodItemId, userId }) => {
  const { dispatch } = useReviewsContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState(0);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = { title, description, foodItemId, userId, stars };

    const response = await fetch('/api/reviews/:id', {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setError(null);
      setEmptyFields([]);
      setTitle('');
      setDescription('');
      setStars(0);
      console.log('new review added:', json);
      dispatch({ type: 'CREATE_REVIEW', payload: json });
      window.location.reload();
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>

      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;

          return (
            <span
              key={ratingValue}
              className={`star ${ratingValue <= stars ? 'filled' : ''}`}
              onClick={() => setStars(ratingValue)}
            >
              ★
            </span>
          );
        })}
      </div>
      {emptyFields.includes('stars') && <p className="error">Star rating is required</p>}
      <label>Review Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Description:</label>
      <input 
        type="text"
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      

      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ReviewForm;
