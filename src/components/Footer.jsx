import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import LogoWhite from '../assets/Logo-white.png'; // Import the white logo
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

export default function Footer() {
  const { darkMode } = useContext(ThemeContext); // Get darkMode state from context

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <Link to="/" className="flex items-center gap-4 mb-4 md:mb-0">
          {/* Use LogoWhite when dark mode is active, otherwise use default Logo */}
          <img src={darkMode ? LogoWhite : Logo} alt="TranspoHub" className="h-8" />
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/buses" className="hover:text-primary">Book</Link>
          <Link to="/contact" className="hover:text-primary">Contact Us</Link>
          <Link to="/help" className="hover:text-primary">Help</Link>
        </nav>
      </div>
    </footer>
  );
}