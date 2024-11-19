const express = require('express');
const router = express.Router();
const { getFoodItems } = require('../controllers/foodItemsController');

// Route to get all food items or filter by dining hall if needed
router.get('/', getFoodItems);

module.exports = router;
