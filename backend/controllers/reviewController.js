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
    const{title, description} = req.body
    try{
        const review = await Review.create({title, description})
        res.status(200).json(review)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

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