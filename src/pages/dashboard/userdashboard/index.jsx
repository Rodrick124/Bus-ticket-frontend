import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import Card from '../components/Card';
import { user, statistics } from '../../../data/dashboard';
import { trips } from '../../../data/trips';
import { bookings } from '../../../data/bookings';
import { payments } from '../../../data/payments';
import { Icon } from '@iconify/react';
import { ThemeContext } from '../../../context/ThemeContext';

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Build a lightweight profile object for the sidebar (allows undefined fields)
  const sidebarProfile = user
    ? {
        imageUrl: user.avatar,
        name: user.name,
        email: user.email,
      }
    : undefined;

  // Find the nearest upcoming trip
  const now = new Date();
  const upcomingTrips = trips
    .filter(trip => {
      const tripDate = new Date(trip.date);
      return !isNaN(tripDate) && tripDate > now && trip.status === 'Upcoming';
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const nearestTrip = upcomingTrips.length > 0 ? upcomingTrips[0] : null;

  return (
    <div className={`flex flex-row min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} profile={sidebarProfile} />

      {/* Main Content Area: always reserve sidebar width on md+ so content doesn't go under it */}
      <div className="flex flex-col transition-all duration-200 ease-in-out w-full md:ml-64">
        {/* Dashboard Navbar */}
        <DashboardNavbar toggleSidebar={toggleSidebar} />

        <div className="py-8 px-10 flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to your Dashboard!</h1>
              <p className="text-gray-600 dark:text-gray-400">Select an item from the sidebar to navigate.</p>
            </div>
            <div>
              <button
                onClick={() => navigate('/')}
                className="ml-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              >
                Back to site
              </button>
            </div>
          </div>
          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card icon={<Icon icon="fa-solid:book" width="32" />} text="Total Booking" figure={statistics.totalBookings} />
            <Card icon={<Icon icon="fa-solid:clock" width="32" />} text="Upcoming Trips" figure={statistics.upcomingTrips} />
            <Card icon={<Icon icon="fa-solid:check-circle" width="32" />} text="Completed Trips" figure={statistics.completedTrips} />
            <Card icon={<Icon icon="fa-solid:times-circle" width="32" />} text="Cancelled Trips" figure={statistics.cancelledTrips} />
          </div>
          {/* Nearest Trip Section */}
          <div className="mt-8 w-fit">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Nearest Upcoming Trip</h2>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              {nearestTrip ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">From</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{nearestTrip.from}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">To</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{nearestTrip.to}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{nearestTrip.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{nearestTrip.status}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-8">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      View Ticket
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Cancel Trip
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-900 dark:text-white">No upcoming trips.</p>
              )}
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-4'>
          {/* Bookings Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">My Bookings</h2>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className='py-2 text-gray-900 dark:text-white'>Booking #</th>
                    <th className="py-2 text-gray-900 dark:text-white">From</th>
                    <th className="py-2 text-gray-900 dark:text-white">To</th>
                    <th className="py-2 text-gray-900 dark:text-white">Date</th>
                    <th className="py-2 text-gray-900 dark:text-white">Status</th>
                    <th className="py-2 text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="py-2 text-gray-900 dark:text-white">{booking.id}</td>
                      <td className="py-2 text-gray-900 dark:text-white">{booking.from}</td>
                      <td className="py-2 text-gray-900 dark:text-white">{booking.to}</td>
                      <td className="py-2 text-gray-900 dark:text-white">{booking.date}</td>
                      <td className="py-2 text-gray-900 dark:text-white">{booking.status}</td>
                      <td className="py-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Payments Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">My Payments</h2>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2 text-gray-900 dark:text-white">Date</th>
                    <th className="py-2 text-gray-900 dark:text-white">Amount</th>
                    <th className="py-2 text-gray-900 dark:text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="py-2 text-gray-900 dark:text-white">{payment.date}</td>
                      <td className="py-2 text-gray-900 dark:text-white">{payment.amount}</td>
                      <td className="py-2 text-gray-900 dark:text-white">{payment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;