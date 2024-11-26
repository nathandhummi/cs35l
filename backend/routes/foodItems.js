const express = require('express');
const router = express.Router();
const { getFoodItems, getFoodItemById } = require('../controllers/foodItemsControllers');

// Route to get all food items or filter by dining hall if needed
router.get('/', getFoodItems);

router.get('/:foodItemId', getFoodItemById);


module.exports = router;