// api/fetchAllFoodItems.js

// Mock data for food items
const foodItems = [
    { id: 1, name: 'Pasta', diningHall: 'De Neve', image: 'pasta.jpg' },
    { id: 2, name: 'Salad', diningHall: 'B-Plate', image: 'salad.jpg' },
    { id: 3, name: 'Burger', diningHall: 'Epicuria', image: 'burger.jpg' },
    { id: 4, name: 'Sushi', diningHall: 'Feast', image: 'sushi.jpg' },
    { id: 5, name: 'Pizza', diningHall: 'De Neve', image: 'pizza.jpg' },
    { id: 6, name: 'Tacos', diningHall: 'B-Plate', image: 'tacos.jpg' },
    { id: 7, name: 'Ramen', diningHall: 'Epicuria', image: 'ramen.jpg' },
    { id: 8, name: 'Dim Sum', diningHall: 'Feast', image: 'dimsum.jpg' },
];

// Function to simulate fetching data with filters
const fetchAllFoodItems = async (filters) => {
    const { diningHall } = filters;

    // Filter food items based on the dining hall if provided
    const filteredFoodItems = diningHall
        ? foodItems.filter(item => item.diningHall === diningHall)
        : foodItems;

    return filteredFoodItems;
};

export default fetchAllFoodItems;