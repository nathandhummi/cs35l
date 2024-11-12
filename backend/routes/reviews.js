//we want to be able to access from server.js to thie file
const express = require('express')
const {
    createReview, 
    getReviews, 
    getReview, 
    deleteReview, 
    updateReview
} = require('../controllers/reviewController')


const router = express.Router()

//getting all the reviews
router.get('/', getReviews)

//get a single review
router.get('/:id', getReview)

//POST a new review
router.post('/', createReview)

//DELETE a review
router.delete('/:id', deleteReview)

//UPDATE a review
router.patch('/:id', updateReview)


module.exports = router