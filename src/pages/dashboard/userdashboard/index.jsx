import React from 'react';
import Sidebar from '../components/Sidebar';

const UserDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        {/* Main content of the dashboard will go here */}
        <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
        <p>Select an item from the sidebar to navigate.</p>
      </div>
    </div>
  );
};

export default UserDashboard;
