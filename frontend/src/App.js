// App.js
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FoodItemList from './FoodItemList'; // Adjust the path based on your folder structure


// Initialize the Query Client
const queryClient = new QueryClient();


function App() {
   return (
       <QueryClientProvider client={queryClient}>
           <div className="App">
               <h1>UCLA DINING</h1>
               {/* Render the FoodItemList component */}
               <FoodItemList />
           </div>
       </QueryClientProvider>
   );
}


export default App;



