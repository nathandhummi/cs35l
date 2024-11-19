// api/fetchAllFoodItems.js
/*const [foodItems, setFoodItems] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);*/
/*
useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/fooditems'); 
        console.log("response:", response)
        if (!response.ok) {
          throw new Error('Failed to fetch menus');
        }
        const data = await response.json();
        console.log("data in App.js: ", data)
        setFoodItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);*/


/*// Mock data for food items
const foodItems = [
    { id: 1, name: 'Pasta', diningHall: 'De Neve', image: 'pasta.jpg' },
    { id: 2, name: 'Salad', diningHall: 'B-Plate', image: 'salad.jpg' },
    { id: 3, name: 'Burger', diningHall: 'Epicuria', image: 'burger.jpg' },
    { id: 4, name: 'Sushi', diningHall: 'Feast', image: 'sushi.jpg' },
    { id: 5, name: 'Pizza', diningHall: 'De Neve', image: 'pizza.jpg' },
    { id: 6, name: 'Tacos', diningHall: 'B-Plate', image: 'tacos.jpg' },
    { id: 7, name: 'Ramen', diningHall: 'Epicuria', image: 'ramen.jpg' },
    { id: 8, name: 'Dim Sum', diningHall: 'Feast', image: 'dimsum.jpg' },
];*/

//import useFetchFoodItems from '../hooks/useFetchFoodItems';

//const foodItems = useFetchFoodItems();

// Function to simulate fetching data with filters
const fetchAllFoodItems = async (foodItems, filters) => {
    const { diningHall } = filters;

    // Filter food items based on the dining hall if provided
    const filteredFoodItems = diningHall
        ? foodItems.filter(item => item.diningHall === diningHall)
        : foodItems;

    return filteredFoodItems;
};

export default fetchAllFoodItems;