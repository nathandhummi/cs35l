import React from 'react';

const MenuList = ({ menus }) => {
  return (
    <div>
      {menus.length > 0 ? (
        menus.map((menu) => (
          <div key={menu.id} className="menu-item">
            <h3>{menu.name}</h3>
            {/* Add other details as needed */}
          </div>
        ))
      ) : (
        <p>No menus available for the selected dining hall.</p>
      )}
    </div>
  );
};

export default MenuList;