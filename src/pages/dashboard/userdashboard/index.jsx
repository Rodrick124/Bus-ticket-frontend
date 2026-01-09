import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import Card from '../components/Card';
import { useAuth } from '../../../context/AuthContext';
import { Icon } from '@iconify/react';

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
          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card icon={<Icon icon="fa-solid:book" width="32" />} text="Total Booking" figure="10" />
            <Card icon={<Icon icon="fa-solid:clock" width="32" />} text="Upcoming Trips" figure="2" />
            <Card icon={<Icon icon="fa-solid:check-circle" width="32" />} text="Completed Trips" figure="8" />
            <Card icon={<Icon icon="fa-solid:times-circle" width="32" />} text="Cancelled Trips" figure="0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
