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
    }
    //might want to add more properties later.
}, {timestamps: true})

module.exports = mongoose.model('Review', reviewsSchema)