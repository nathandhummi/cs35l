const FoodItem = require('../models/foodItemModel');

// Fetch all food items
const getFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find(); // Fetch all items without any filtering
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food items', error });
  }
};

// Fetch a single food item by ID
const getFoodItemById = async (req, res) => {
  const { foodItemId } = req.params; // Extract foodItemId from the URL

  try {
    const foodItem = await FoodItem.findById(foodItemId); // Fetch the item by ID
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food item', error });
  }
};

module.exports = {
  getFoodItems,
  getFoodItemById, // Export the new function
};
