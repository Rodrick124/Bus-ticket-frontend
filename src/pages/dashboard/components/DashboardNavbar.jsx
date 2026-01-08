import React from 'react';
import { Icon } from '@iconify/react';

const DashboardNavbar = ({ toggleSidebar }) => { // Accept toggleSidebar as prop
  const pageTitle = "Dashboard Overview"; // This could be passed as a prop or determined by route

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between shadow-md h-24 px-10">
      {/* Right side: Title */}
      <div className="text-white text-xl font-semibold">
        {pageTitle}
      </div>

      {/* Left side: Hamburger menu, Notification and Settings icons */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-300 hover:text-white focus:outline-none">
          <Icon icon="mdi:bell" className="h-6 w-6" />
        </button>
        <button className="text-gray-300 hover:text-white focus:outline-none">
          <Icon icon="mdi:cog" className="h-6 w-6" />
        </button>
        {/* Hamburger menu for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          <Icon icon="mdi:menu" className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
