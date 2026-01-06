import React from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AvailableBuses from './pages/AvailableBuses';
import SeatSelection from './pages/SeatSelection';
import PassengerInfo from './pages/PassengerInfo';
import BookingSummary from './pages/BookingSummary';
import Payment from './pages/Payment';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';

const MainLayout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background text-gray-800">
      <Navbar />
      <main className={!isHomePage ? 'mx-auto' : ''}>
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
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

