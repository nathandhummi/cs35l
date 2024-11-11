import { createContext, useReducer } from 'react'

export const ReviewsContext = createContext()

export const reviewsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_REVIEWS':
            return {
                reviews: action.payload
            }
        case 'CREATE_REVIEW':
            return {
                reviews: [action.payload, ...state.reviews]
            }
        case 'DELETE_REVIEW':
            return {
                // keep only the reviews not equal to the one we have the id for
                reviews: state.reviews.filter(r => r._id !== action.payload._id)
            }
        default:
            return state
    }
}

// children property represents whatever components or template ReviewContextProvider wraps
// in this case, it is App component in App.js 
export const ReviewsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reviewsReducer, {
        reviews: null
    })

    return (
        <ReviewsContext.Provider value={{...state, dispatch}}>
            { children }
        </ReviewsContext.Provider>
    )
}