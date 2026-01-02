import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../assets/Tran-logo.png'
import Button from './Button'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

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
      ? 'fixed top-0 left-0 right-0 bg-white shadow-md z-50'
      : 'fixed top-0 left-0 right-0 bg-transparent z-50'
    : 'bg-white shadow-sm'
  
  const linkColor = isHomePage && !isScrolled ? 'text-white' : 'text-gray-700'
  const helpLinkColor = isHomePage && !isScrolled ? 'text-white/80' : 'text-gray-500'

  return (
    <header className={`py-4 transition-all duration-300 ${navClass}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <img src={Logo} alt="TranspoHub" className="h-10" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className={`${linkColor} hover:text-primary`}>Home</Link>
          <Link to="/buses" className={`${linkColor} hover:text-primary`}>Book</Link>
          <a href="/contact-us" className={`${helpLinkColor}`}>Contact Us</a>
          <Button variant="secondary">Login</Button>
          <Button>Sign Up</Button>
        </nav>
      </div>
    </header>
  )
}
