import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const profile = {
    imageUrl: 'https://via.placeholder.com/150', // Placeholder image
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  const navItems = [
    { name: 'Dashboard', icon: '📊', path: '/dashboard' },
    { name: 'Bookings', icon: '🎫', path: '/dashboard/bookings' },
    { name: 'Messages', icon: '✉️', path: '/dashboard/messages' },
    { name: 'Settings', icon: '⚙️', path: '/dashboard/settings' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white w-64 p-4 shadow-lg">
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
              >
                <span className="text-2xl mr-3">{item.icon}</span>
                <span className="text-lg">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <Link
          to="/logout"
          className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          <span className="text-2xl mr-3">➡️</span>
          <span className="text-lg">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
