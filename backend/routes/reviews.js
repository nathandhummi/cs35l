//we want to be able to access from server.js to thie file
const express = require('express')
const {
    createReview, 
    getReviews, 
    deleteReview, 
    updateReview,
    getReviewsByFoodItem,
    getReviewsByUser
} = require('../controllers/reviewController')
const requireAuth = require('../middleware/requireAuth'); // Middleware to ensure the user is logged in


const router = express.Router()

//getting all the reviews
router.get('/', getReviews)

//get a single review
//router.get('/:id', getReview)
router.get('/:foodItemId', getReviewsByFoodItem);

router.get('/user/:userId', getReviewsByUser)

router.use(requireAuth)
//POST a new review
router.post('/:id', createReview)

//DELETE a review
router.delete('/:id', deleteReview)

//UPDATE a review
router.patch('/:id', updateReview)


module.exports = router