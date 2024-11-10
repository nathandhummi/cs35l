import { useState } from 'react'

const ReviewForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  // const [stars, setStars] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    // default is reloading page so prevent this from happening
    e.preventDefault()

    const review = {title, description}
    
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setDescription('')
      console.log('new review added:', json)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Review</h3>

      <label>Review Header:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
      />

      <button>Add Review</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ReviewForm