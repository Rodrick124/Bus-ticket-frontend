import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Tran-logo.png'

export default function Footer(){
  return (
    <footer className="mt-12 bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
            <Link to="/" className="flex items-center gap-4">
                <img src={Logo} alt="TranspoHub" className="h-10"/>
            </Link>
          <p className="text-sm text-gray-600">Smart Travel. Easy Booking.</p>
        </div>
        <div className="text-sm text-gray-600">
          <p>About TranspoHub</p>
          <p>Contact: support@transpohub.com</p>
        </div>
      </div>
    </footer>
  )
}
