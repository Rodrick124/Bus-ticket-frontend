import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar'; // Import DashboardNavbar
import { useAuth } from '../../../context/AuthContext';

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth() || {};

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Build a lightweight profile object for the sidebar (allows undefined fields)
  const sidebarProfile = user
    ? {
        imageUrl: user.imageUrl ?? user.avatar ?? undefined,
        name: user.displayName ?? user.name ?? undefined,
        email: user.email ?? undefined,
      }
    : undefined;

  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} profile={sidebarProfile} />

      {/* Main Content Area: always reserve sidebar width on md+ so content doesn't go under it */}
      <div className="flex flex-col transition-all duration-200 ease-in-out w-full md:ml-64">
        {/* Dashboard Navbar */}
        <DashboardNavbar toggleSidebar={toggleSidebar} />

        <div className="py-8 px-10 flex-1">
          <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
          <p>Select an item from the sidebar to navigate.</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
