// src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menus from backend
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('/api/menus'); // Replace '/menus' with your actual endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch menus');
        }
        const data = await response.json();
        setMenus(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // Render the UI
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Menu List</h1>
      {menus.length > 0 ? (
        <ul>
          {menus.map((menu) => (
            <li key={menu.id}> {/* Assuming 'id' is a unique identifier */}
              <h3>{menu.name}</h3>
              <p>{menu.description}</p>
              {/* Add any other details you want to display */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No menus available.</p>
      )}
    </div>
  );
}

export default App;
