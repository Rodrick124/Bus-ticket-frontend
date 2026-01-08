import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react'; 
import { useAuth } from '../../../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar, profile: profileProp }) => {
  const navigate = useNavigate();
  const { user } = useAuth() || {};

  // Prefer the explicit prop, then fall back to authenticated user, then defaults
  const profile = profileProp ?? (user && {
    imageUrl: user.imageUrl ?? user.avatar ?? 'https://via.placeholder.com/150',
    name: user.displayName ?? user.name ?? 'Guest User',
    email: user.email ?? '',
  }) ?? {
    imageUrl: 'https://via.placeholder.com/150',
    name: 'Guest User',
    email: '',
  };

  const navItems = [
    { name: 'Dashboard', icon: 'mdi:view-dashboard', path: '/dashboard/userdashboard' },
    { name: 'My Trips', icon: 'mdi:bus', path: '/dashboard/mytrips' },
    { name: 'Bookings', icon: 'mdi:book-multiple', path: '/dashboard/bookings' },
    { name: 'Payment', icon: 'mdi:credit-card', path: '/dashboard/payment' },
    { name: 'Profile', icon: 'mdi:account', path: '/dashboard/profile' },
    { name: 'Support', icon: 'mdi:help-circle', path: '/dashboard/support' },
  ];

  const handleLogout = () => {
    // For now, just navigate to login.
    // In a real application, you would clear local storage, cookies, etc.
    navigate('/login');
    toggleSidebar(); // Close sidebar after attempting logout/navigation
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-30 flex flex-col h-screen bg-gray-800 text-white w-64 p-4 shadow-lg
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          transition-transform duration-200 ease-in-out`}
      >
        <div className="flex flex-col items-center pb-6 border-b border-gray-700">
          <img
            className="w-24 h-24 rounded-full object-cover mb-3"
            src={profile.imageUrl}
            alt={`${profile.name}'s profile picture`}
          />
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-sm text-gray-400">{profile.email}</p>
        </div>
        <nav className="mt-6 flex-grow">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                  onClick={toggleSidebar} // Close sidebar on navigation on mobile
                >
                  <Icon icon={item.icon} className="text-2xl mr-3" />
                  <span className="text-lg">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 focus:outline-none"
          >
            <Icon icon="mdi:logout" className="text-2xl mr-3" />
            <span className="text-lg">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for small screens when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;

