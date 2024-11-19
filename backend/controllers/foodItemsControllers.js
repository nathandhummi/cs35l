const FoodItem = require('../models/foodItemModel');

const getFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find(); // Fetch all items without any filtering
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food items', error });
  }
};

module.exports = {
  getFoodItems
};
