import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/Tran-logo.png'
import Button from './Button'
import { ThemeContext } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { Sun, Moon } from 'lucide-react';


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const navigate = useNavigate()
  const { user, isLoggedIn } = useAuth()

  const getInitials = (name) => {
    const trimmed = name?.trim();
    if (!trimmed) return 'U';
    const parts = trimmed.split(/\s+/).filter(Boolean);
    const firstChar = parts[0]?.[0] ?? '';
    const lastChar = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
    const initials = (firstChar + lastChar) || firstChar || 'U';
    return initials.toUpperCase();
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isHomePage])

  const navClass = isHomePage
    ? isScrolled
      ? 'fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50'
      : 'fixed top-0 left-0 right-0 bg-transparent z-50'
    : 'bg-white dark:bg-gray-800 shadow-sm'
  
  const linkColor = isHomePage && !isScrolled ? 'text-white' : 'text-gray-700 dark:text-gray-300'

  return (
    <header className={`py-4 transition-all duration-300 ${navClass}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <img src={Logo} alt="TranspoHub" className="h-10" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className={`${linkColor} hover:text-primary`}>Home</Link>
          <Link to="/buses" className={`${linkColor} hover:text-primary`}>Book</Link>
          <Link to="/contact" className={`${linkColor}`}>Contact Us</Link>
          <Link to="/help" className={`${linkColor}`}>Help</Link>
          {isLoggedIn ? (
            <button
              onClick={() => navigate('/dashboard/userdashboard')}
              className="flex items-center gap-3 focus:outline-none"
              aria-label="Open user dashboard"
              title={user?.displayName || 'Profile'}
              type="button"
            >
              {user?.profileImage ? (
                <img src={user.profileImage} alt={user?.displayName || 'Profile'} className="h-9 w-9 rounded-full object-cover" />
              ) : (
                <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-200">
                  {getInitials(user?.displayName)}
                </div>
              )}
            </button>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`${linkColor} hover:text-primary`}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="ml-4"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={!!darkMode}
            type="button"
          >
            {darkMode ? <Sun className="text-yellow-500" aria-hidden="true" /> : <Moon className="text-gray-400" aria-hidden="true" />}
          </button>
        </nav>
        {/* small-screen theme toggle (visible when md:flex hides nav) */}
        <div className="md:hidden">
          <button
            onClick={toggleTheme}
            className="ml-2"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={!!darkMode}
            type="button"
          >
            {darkMode ? <Sun className="text-yellow-500" aria-hidden="true" /> : <Moon className="text-gray-400" aria-hidden="true" />}
          </button>
        </div>
        
      </div>
    </header>
  )
}
