// Mock data for food items
const foodItems = [
    { id: 1, name: 'Pasta', diningHall: 'De Neve', image: 'pasta.jpg' }, // Food item at De Neve dining hall
    { id: 2, name: 'Salad', diningHall: 'B-Plate', image: 'salad.jpg' },  // Food item at B-Plate dining hall
    { id: 3, name: 'Burger', diningHall: 'Epicuria', image: 'burger.jpg' }, // Food item at Epicuria dining hall
    { id: 4, name: 'Sushi', diningHall: 'Feast', image: 'sushi.jpg' },   // Food item at Feast dining hall
    { id: 5, name: 'Pizza', diningHall: 'De Neve', image: 'pizza.jpg' },  // Another food item at De Neve
    { id: 6, name: 'Tacos', diningHall: 'B-Plate', image: 'tacos.jpg' },  // Another food item at B-Plate
    { id: 7, name: 'Ramen', diningHall: 'Epicuria', image: 'ramen.jpg' }, // Another food item at Epicuria
    { id: 8, name: 'Dim Sum', diningHall: 'Feast', image: 'dimsum.jpg' }, // Another food item at Feast
];

// Function to simulate fetching data with filters
const fetchAllFoodItems = async (filters) => {
    const { diningHall } = filters; // Destructure diningHall filter from the filters object

    // Filter food items based on the dining hall if provided
    const filteredFoodItems = diningHall
        ? foodItems.filter(item => item.diningHall === diningHall) // Filter to match only items in the selected dining hall
        : foodItems; // If no filter is provided, return all items

    return filteredFoodItems; // Return the filtered list of food items
};

// Export the function to be used in other parts of the app
export default fetchAllFoodItems;
