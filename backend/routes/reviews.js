//we want to be able to access from server.js to thie file
const express = require('express')
const ensureAuthenticated = require('../middleware/authMiddleware');
const requireAuth = require('../middleware/requireAuth'); // Middleware to ensure the user is logged in
const { toggleLikeReview } = require('../controllers/reviewController');

const {
    createReview, 
    getReviews, 
    deleteReview, 
    updateReview,
    getReviewsByFoodItem,
    getReviewsByUser
} = require('../controllers/reviewController')


const router = express.Router()

router.use((req, res, next) => {
    console.log(`Incoming request URL: ${req.url}`);
    next(); // Pass control to the next middleware or route
});

//getting all the reviews
router.get('/', getReviews)

// Route to create a review (protected)
router.post('/', ensureAuthenticated, createReview);

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

// router.patch('/:id/like', ensureAuthenticated, toggleLikeReview);

router.patch('/:id/like', ensureAuthenticated, (req, res, next) => {
    console.log('Route hit: PATCH /:id/like');
    console.log(`Review ID from req.params.id: ${req.params.id}`); // Add this log
    next();
}, toggleLikeReview);

// router.patch('/:id/like', (req, res, next) => {
//     console.log('Route hit: PATCH /:id/like');
//     next();
// }, toggleLikeReview);

module.exports = router