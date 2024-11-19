const fetchAllFoodItems = async (filters = {}) => {
    const { diningHall } = filters;
    let url = 'http://localhost:4000/api/foodItems';
    if (diningHall) {
      url += `?diningHall=${diningHall}`;
    }
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch food items');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching food items:', error);
      return [];
    }
  };
  
  export default fetchAllFoodItems;
  