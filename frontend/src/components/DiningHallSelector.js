import React from 'react';

const DiningHallSelector = ({ selectedDiningHall, onSelect }) => {
  return (
    <select value={selectedDiningHall} onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a Dining Hall</option>
      <option value="diningHall1">Dining Hall 1</option>
      <option value="diningHall2">Dining Hall 2</option>
      {/* Add more options */}
    </select>
  );
};

export default DiningHallSelector;
