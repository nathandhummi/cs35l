// App.js
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FoodItemList from './FoodItemList'; // Adjust the path as necessary
import ReviewPage from './pages/ReviewPage'; // Add the ReviewPage component
import LoginPage from './pages/LoginPage'; // Add the LoginPage component
import UserPage from './pages/UserPage'; // Add the UserPage component

// Initialize the Query Client
const queryClient = new QueryClient();


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="App">
                    {/* Define routes */}
                    <Routes>
                        {/* Default route redirects to login */}
                        <Route path="/" element={<Navigate to="/login" />} />

                        {/* Public route for login page */}
                        <Route path="/login" element={<LoginPage />} />

                        {/* Route for food item list */}
                        <Route path="/food-items" element={<FoodItemList />} />
                        
                        {/* Route for review page */}
                        <Route path="/reviews/:id" element={<ReviewPage />} />

                        <Route path="/user" element={<UserPage />} />
                    </Routes>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;



