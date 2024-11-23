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
    foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true }, 
}, {timestamps: true})

module.exports = mongoose.model('Review', reviewsSchema)
