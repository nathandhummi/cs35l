import { useState } from 'react'
import { useReviewsContext } from '../hooks/useReviewsContext'

const ReviewForm = ({foodItemId, userId}) => {
  const { dispatch } = useReviewsContext()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  // const [stars, setStars] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])


  const handleSubmit = async (e) => {
    // default is reloading page so prevent this from happening
    e.preventDefault()

    const review = {title, description, foodItemId, userId}
    
    const response = await fetch('/api/reviews/:id', {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setEmptyFields([])
      setTitle('')
      setDescription('')
      console.log('new review added:', json)
      dispatch({type: 'CREATE_REVIEW', payload: json})
      window.location.reload();
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Leave a Review</h3>

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
  )
}

export default ReviewForm