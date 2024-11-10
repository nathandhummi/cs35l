import { createContext, useReducer } from 'react'

export const ReviewsContext = createContext()

export const reviewsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_REVIEWS':
            return {
                reviews: action.payload
            }
        case 'CREATE_REVIEWS':
            return {
                reviews: [action.payload, ...state.reviews]
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