const Menu = require('../models/menuModel');
const mongoose = require('mongoose');

// Getting all the menus
const getMenus = async (req, res) => {
  const menus = await Menu.find({}).sort({ createdAt: -1 }); // Adjust sorting if needed

  res.status(200).json(menus);
};

module.exports = {
  getMenus
};
