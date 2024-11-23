// App.js
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FoodItemList from './FoodItemList'; // Adjust the path as necessary
import ReviewPage from './pages/ReviewPage'; // Add the ReviewPage component

// Initialize the Query Client
const queryClient = new QueryClient();


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="App">
                    <h1>UCLA DINING</h1>
                    {/* Define routes */}
                    <Routes>
                        {/* Route for food item list */}
                        <Route path="/" element={<FoodItemList />} />
                        
                        {/* Route for review page */}
                        <Route path="/reviews/:id" element={<ReviewPage />} />
                    </Routes>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;



