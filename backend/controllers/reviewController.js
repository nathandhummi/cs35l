const Review = require('../models/reviewsModel')
const mongoose = require('mongoose')

//getting all the reviews
const getReviews = async (req, res) => {
    const reviews = await Review.find({}).sort({createdAt: -1})

    res.status(200).json(reviews)
}

//get a single review
const getReview = async (req, res) => {
    const {id} = req.params
    //make sure that the node id is valid. if not throw an error.
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such review'})
        }    const review = await Review.findById(id)

    if(!review){
        return res.status(404).json({error: 'No such review'})
    }

    res.status(200).json(review)
}

//POST a new review
const createReview = async (req, res) => {
    const { title, description, foodItemId } = req.body; // Destructure foodItemId from request body

    // Array to check if user left any fields empty
    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!description) {
        emptyFields.push('description');
    }
    if (!foodItemId) {
        emptyFields.push('foodItemId'); // Ensure foodItemId is not empty
    }

    // Check if any fields are empty
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    // Validate foodItemId
    if (!mongoose.Types.ObjectId.isValid(foodItemId)) {
        return res.status(400).json({ error: 'Invalid food item ID' });
    }

    try {
        // Create the review with the foodItemId reference
        const review = await Review.create({ title, description, foodItem: foodItemId });
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
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
    getReview,
    deleteReview,
    updateReview
}