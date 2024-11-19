const FoodItem = require('../models/foodItemModel')
const mongoose = require('mongoose')

const getFoodItems = async (req, res) => {
    const foodItems = await FoodItem.find({})

    res.status(200).json(foodItems)
}

module.exports = {
    getFoodItems
}