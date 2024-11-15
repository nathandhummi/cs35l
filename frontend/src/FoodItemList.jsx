// FoodItemList.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchAllFoodItems from './api/fetchAllFoodItems'; // Adjust path if necessary

const FoodItemList = () => {
    const [filters, setFilters] = useState({});

    const handleDiningHallFilter = (diningHall) => {
        setFilters({ ...filters, diningHall });
        refetch();
    };

    const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
        queryKey: ['food-items', filters],
        queryFn: () => fetchAllFoodItems(filters),
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Food Items</h1>
            <div>
                <button onClick={() => handleDiningHallFilter('De Neve')}>De Neve</button>
                <button onClick={() => handleDiningHallFilter('B-Plate')}>B-Plate</button>
                <button onClick={() => handleDiningHallFilter('Epicuria')}>Epicuria</button>
                <button onClick={() => handleDiningHallFilter('Feast')}>Feast</button>
                <button onClick={() => handleDiningHallFilter(null)}>All Categories</button>
            </div>
            {isSuccess && data?.length > 0 ? (
                <ul>
                    {data.map((foodItem) => (
                        <li key={foodItem.id}>
                            <h2>{foodItem.name}</h2>
                            <p>Category: {foodItem.diningHall}</p>
                            {foodItem.image && <img src={foodItem.image} alt={foodItem.name} style={{ width: '100px' }} />}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No food items available</div>
            )}
        </div>
    );
};

export default FoodItemList;