const fetchAllFoodItems = async (filters) => {
    console.log("Received filters: ", filters); // Check if correct filters are received
    try {
        const response = await fetch('http://localhost:4000/api/foodItems'); // Assuming fetching all data
        if (!response.ok) {
            throw new Error('Failed to fetch food items');
        }
        const data = await response.json();
        console.log("Fetched data: ", data); // Check fetched data
        
        // Filter the data based on received filters
        const filteredData = filters.diningHall
            ? data.filter(item => item.diningHall === filters.diningHall)
            : data;
        
        console.log("Filtered data: ", filteredData); // Check filtered data
        return filteredData;
    } catch (error) {
        console.error('Error fetching food items: ', error);
        return [];
    }
};


  
  export default fetchAllFoodItems;
  