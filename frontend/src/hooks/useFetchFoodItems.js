import { useState, useEffect } from 'react';

function useFetchFoodItems() {
    const [foodItems, setFoodItems] = useState([]);
  
    useEffect(() => {
      const fetchFoodItems = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/fooditems');
          if (response.ok) {
            const data = await response.json();
            setFoodItems(data); // Populate the foodItems array
          } else {
            console.error('Failed to fetch food items');
          }
        } catch (error) {
          console.error('Error fetching food items:', error);
        }
      };
  
      fetchFoodItems();
    }, []);
  
    return foodItems;
  }

export default useFetchFoodItems;