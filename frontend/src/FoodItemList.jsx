import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
//import useFetchFoodItems from './hooks/useFetchFoodItems';
import fetchAllFoodItems from './api/fetchAllFoodItems';
import { Link } from 'react-router-dom';
import './FoodItemList.css';

const FoodItemList = () => {
    const [filters, setFilters] = useState({});
    // const foodItems = useFetchFoodItems();
    const navigate = useNavigate();

    const handleDiningHallFilter = (diningHall) => {
        const newFilters = { ...filters, diningHall };
        setFilters(newFilters);
        refetch();
    };

    const handleClick = () => {
        navigate('/user');
    };

    const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
        queryKey: ['food-items', filters],
        queryFn: () => fetchAllFoodItems(filters),
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            {/* Header Section */}
            <header>
                <h1>UCLA Dining</h1>
                <div className="userDiv">
                    <button className="userButton" onClick={handleClick}>
                        <img
                            src="https://as2.ftcdn.net/v2/jpg/03/16/12/51/1000_F_316125188_FYs3RbaUQ6gGwom3sfqSvgt2QGw3fKol.jpg"
                            alt="User Icon"
                            className="userImage"
                        />
                    </button>
                </div>
            </header>

            {/* Filter Buttons */}
            <div className="filter-buttons">
                <button onClick={() => handleDiningHallFilter('De Neve')}>De Neve</button>
                <button onClick={() => handleDiningHallFilter('B-Plate')}>B-Plate</button>
                <button onClick={() => handleDiningHallFilter('Epicuria')}>Epicuria</button>
                <button onClick={() => handleDiningHallFilter('Feast')}>Feast</button>
                <button onClick={() => handleDiningHallFilter(null)}>All Dining Halls</button>
            </div>

            {/* Food Items */}
            <div className="food-items">
                {isSuccess &&
                    data.map((foodItem) => (
                        <div key={foodItem._id} className="food-card">
                            <img
                                src={foodItem.image || 'default-food-image.jpg'} // Add fallback image URL
                                alt={foodItem.name}
                            />
                            <div className="food-card-content">
                                <h2 className="food-card-title">{foodItem.name}</h2>
                                <Link to={`/reviews/${foodItem._id}`} className="food-card-link">
                                    View Reviews
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};



export default FoodItemList;
