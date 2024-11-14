const Menu = require('../models/menuModel');
const mongoose = require('mongoose');

// Getting all the menus
const getMenus = async (req, res) => {
  const menus = await Menu.find({}).sort({ createdAt: -1 }); // Adjust sorting if needed

  res.status(200).json(menus);
};

const getMenusByDiningHall = async (req, res) => {
  const { diningHallId } = req.params;
  try {
    const menus = await Menu.find({ diningHallId: diningHallId });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menus' });
  }
}

module.exports = {
  getMenus,
  getMenusByDiningHall
};
