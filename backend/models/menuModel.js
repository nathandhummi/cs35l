const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  diningHallId: { type: String, required: true }, // Adjust the type based on your needs
  // Add other fields as needed
});

module.exports = mongoose.model('Menu', menuSchema);
