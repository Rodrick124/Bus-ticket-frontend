import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-200 ease-in-out ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        {/* Hamburger menu for mobile */}
        <div className="md:hidden p-4 bg-gray-800 text-white">
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        <div className="p-4 flex-1">
          {/* Main content of the dashboard will go here */}
          <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
          <p>Select an item from the sidebar to navigate.</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
