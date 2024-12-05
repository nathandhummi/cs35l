//we want to be able to access from server.js to thie file
const express = require('express')
const ensureAuthenticated = require('../middleware/authMiddleware');

const {
    createReview, 
    getReviews, 
    deleteReview, 
    updateReview,
    getReviewsByFoodItem
} = require('../controllers/reviewController')


const router = express.Router()

//getting all the reviews
router.get('/', getReviews)

// Route to create a review (protected)
router.post('/', ensureAuthenticated, createReview);

//get a single review
//router.get('/:id', getReview)
router.get('/:foodItemId', getReviewsByFoodItem);

//POST a new review
router.post('/:id', createReview)

//DELETE a review
router.delete('/:id', deleteReview)

//UPDATE a review
router.patch('/:id', updateReview)


module.exports = router