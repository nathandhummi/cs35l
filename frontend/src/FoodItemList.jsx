// Import necessary libraries and components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useFetchFoodItems from './hooks/useFetchFoodItems';
import fetchAllFoodItems from './api/fetchAllFoodItems'; // Adjust path if necessary
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Main component to display the list of food items
const FoodItemList = () => {
    // State for storing the filters applied by the user, initialized as an empty object
    const [filters, setFilters] = useState({});
    const foodItems = useFetchFoodItems();
    const navigate = useNavigate(); // Initialize navigate function

    // Function to handle filtering by dining hall; updates the filters state and triggers a refetch
    const handleDiningHallFilter = (diningHall) => {
        const newFilters = { ...filters, diningHall };
        console.log("Updated filters: ", newFilters); // Check if filters are updated correctly
        setFilters(newFilters);
        refetch();
    };
    

    const handleClick = () => {
        navigate('/user'); // Navigate to the /user page when button is clicked
      };

    // Fetch data with react-query based on the current filters
    const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
        queryKey: ['food-items', filters], // Unique key for caching, includes filters for dependency tracking
        queryFn: () => fetchAllFoodItems(filters), // The function to fetch data based on current filters
    });
    console.log("Updated filters2: ", filters);

    // Conditional rendering to handle loading and error states
    if (isLoading) return <div>Loading...</div>; // Shows a loading message while data is being fetched
    if (isError) return <div>Error: {error.message}</div>; // Displays an error message if data fetching fails

    return (
        <div>
            <h1>Food Items</h1> {/* Main header for the food items section */}
            <div>
                {/* Buttons to filter by each dining hall or show all categories */}
                <button onClick={() => handleDiningHallFilter('De Neve')}>De Neve</button>
                <button onClick={() => handleDiningHallFilter('B-Plate')}>B-Plate</button>
                <button onClick={() => handleDiningHallFilter('Epicuria')}>Epicuria</button>
                <button onClick={() => handleDiningHallFilter('Feast')}>Feast</button>
                <button onClick={() => handleDiningHallFilter(null)}>All Dining Halls</button>
            </div>
            <div className="userDiv">
                <button className="userButton" onClick={handleClick}>
                <img 
                    src="https://as2.ftcdn.net/v2/jpg/03/16/12/51/1000_F_316125188_FYs3RbaUQ6gGwom3sfqSvgt2QGw3fKol.jpg" 
                    alt="User Icon" 
                    className="userImage"
                /> 
                </button>
            </div>
            {/* Conditionally render the food items list if data is successfully fetched and not empty */}
            {isSuccess && data?.length > 0 ? (
                <ul>
                    {data.map((foodItem) => (
                        <li key={foodItem._id}> {/* Each food item is uniquely identified by its ID */}
                            <h2>{foodItem.name}</h2> {/* Display the name of the food item */}
                            <p>Dining Hall: {foodItem.diningHall}</p> {/* Display the dining hall associated with the item */}
                            {/* Conditionally render the image if available, with a fixed width of 100px */}
                            {foodItem.image && <img src={foodItem.image} alt={foodItem.name} style={{ width: '100px' }} />}
                            <Link to={`/reviews/${foodItem._id}`}>View Reviews</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                // If no food items match the filter, display a message
                <div>No food items available</div>
            )}
        </div>
    );
};

// Export the component to be used in other parts of the app
export default FoodItemList;