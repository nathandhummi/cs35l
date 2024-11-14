const Menu = require('../models/menuModel');

exports.getMenusByDiningHall = async (req, res) => {
  try {
    const menus = await Menu.find({ diningHallId: req.params.diningHallId }); // Adjust based on your schema
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menus' });
  }
};

