import React from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AvailableBuses from './pages/AvailableBuses';
import SeatSelection from './pages/SeatSelection';
import PassengerInfo from './pages/PassengerInfo';
import BookingSummary from './pages/BookingSummary';
import NotFound from './pages/NotFound';

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background text-gray-800">
      <Navbar />
      <main className={!isHomePage ? 'max-w-6xl mx-auto px-4 py-8' : ''}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/buses" element={<AvailableBuses />} />
        <Route path="/select-seats" element={<SeatSelection />} />
        <Route path="/passenger" element={<PassengerInfo />} />
        <Route path="/summary" element={<BookingSummary />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
