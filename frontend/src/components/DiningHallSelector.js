import React from 'react';

const DiningHallSelector = ({ selectedDiningHall, onSelect }) => {
  return (
    <select value={selectedDiningHall} onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a Dining Hall</option>
      <option value="diningHall1">Dining Hall 1</option>
      <option value="diningHall2">Dining Hall 2</option>
      <option value="diningHall3">Dining Hall 3</option>
      <option value="diningHall4">Dining Hall 4</option>
      <option value="diningHall5">Dining Hall 5</option>
      <option value="diningHall6">Dining Hall 6</option>
    </select>
  );
};

export default DiningHallSelector;
