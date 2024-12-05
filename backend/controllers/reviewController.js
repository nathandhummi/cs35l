const Review = require('../models/reviewsModel')
const mongoose = require('mongoose')

const getReviewsByFoodItem = async (req, res) => {
    const { foodItemId } = req.params; // Extract the foodItemId from the request parameters
    console.log("wowow:", foodItemId)
    console.log(`getReviewsByFoodItem called with foodItemId: ${foodItemId}`); // Debugging log

    // Validate the foodItemId
    if (!mongoose.Types.ObjectId.isValid(foodItemId)) {
        return res.status(400).json({ error: 'Invalid food item ID' });
    }

    try {
        // Find reviews with the specified foodItem ObjectId and populate the user field
        const reviews = await Review.find({ foodItem: foodItemId })
            .populate('user', 'name profilePicture') // Populate the 'user' field with 'name' and 'profilePicture'
            .sort({ createdAt: -1 });

        // Send the reviews back to the client
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReviewsByUser = async (req, res) => {
    const { userId } = req.params; // Extract the foodItemId from the request parameters

    console.log(`getReviewsByUser: ${userId}`); // Debugging log

    // Validate the foodItemId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        // Find reviews with the specified user ObjectId and populate the user field
        const reviews = await Review.find({ user: userId })
            .populate('user', 'name profilePicture') // Populate the 'user' field with 'name' and 'profilePicture'
            .sort({ createdAt: -1 });

        // Send the reviews back to the client
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//getting all the reviews
const getReviews = async (req, res) => {
    // Fetch all reviews and populate the user field
    const reviews = await Review.find({})
    .populate('user', 'name profilePicture') // Populate the 'user' field with 'name' and 'profilePicture'
    .sort({ createdAt: -1 });

    res.status(200).json(reviews)
}

//get a single review
/*const getReview = async (req, res) => {
    const {id} = req.params
    //make sure that the node id is valid. if not throw an error.
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such review'})
        }    const review = await Review.findById(id)

    if(!review){
        return res.status(404).json({error: 'No such review'})
    }

    res.status(200).json(review)
}*/

//POST a new review
const createReview = async (req, res) => {
    const { title, description, foodItemId } = req.body;

    // Ensure the user is authenticated (req.user should be populated by Passport)
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized: Please log in to create a review' });
    }

    // Array to check if user left any fields empty
    let emptyFields = [];
    if (!title) emptyFields.push('title');
    if (!description) emptyFields.push('description');
    if (!foodItemId) emptyFields.push('foodItemId');

    // Check if any fields are empty
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    // Validate foodItemId
    if (!mongoose.Types.ObjectId.isValid(foodItemId)) {
        return res.status(400).json({ error: 'Invalid food item ID' });
    }

    try {
        // Create the review with the foodItemId reference and the logged-in user's ID
        const review = await Review.create({
            title,
            description,
            foodItem: foodItemId,
            user: req.user._id, // Associate with the logged-in user
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



//DELETE a review
const deleteReview = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such review'})
    }
  
    const review = await Review.findOneAndDelete({_id: id})
  
    if(!review) {
      return res.status(400).json({error: 'No such review'})
    }
  
    res.status(200).json(review)
  }

//UPDATE a review
const updateReview = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such review'})
    }
  
    const review = await Review.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!review) {
      return res.status(400).json({error: 'No such review'})
    }
  
    res.status(200).json(review)
}

module.exports = {
    createReview,
    getReviews,
    deleteReview,
    updateReview,
    getReviewsByFoodItem,
    getReviewsByUser
}