//we want to be able to access from server.js to thie file
const express = require('express')
const {createReview, getReviews, getReview

} = require('../controllers/reviewController')


const router = express.Router()

//getting all the reviews
router.get('/', getReviews)

//get a single review
router.get('/:id', getReview)

//POST a new review
router.post('/', createReview)

//DELETE a review
router.delete('/:id', (req, res) => {
    res.json({'mssg': 'DELETE a new review'})
})

//UPDATE a review
router.patch('/:id', (req, res) => {
    res.json({'mssg': 'UPDATE a new review'})
})


module.exports = router