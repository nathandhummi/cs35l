const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    foodItem: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'FoodItem', 
        required: true }, 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true},
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" // Store IDs of users who liked the review
        }
    ],
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5 // Ensure stars are between 1 and 5
    }
}, {timestamps: true})

module.exports = mongoose.model('Review', reviewsSchema)
