import React from 'react'
import { Link } from 'react-router-dom'
import { AmenitiesList } from './AmenitiesIcon'
import Button from './Button'
import Logos from '../assets/Logo.png'

export default function BusCard({ bus }) {
  const getTimeCategory = (departure) => {
    const hour = parseInt(departure.split(':')[0]);
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  const getTimeBadgeColor = () => {
    const category = getTimeCategory(bus.departure);
    const colors = {
      morning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      afternoon: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      evening: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      night: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
    };
    return colors[category];
  };

  const isSeatsLow = bus.availableSeats <= 10;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Bus Image Container */}
      <div className="relative w-full h-48 bg-gray-300 dark:bg-gray-700 overflow-hidden group">
        <img
          src={bus.image || Logos}
          alt={bus.agency}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badge - VIP Premium / Classique */}
        {bus.type === 'VIP Premium' && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
            VIP PREMIUM
          </div>
        )}
        {bus.type === 'Classique' && (
          <div className="absolute top-3 left-3 bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            CLASSIQUE
          </div>
        )}
        {/* Seats Left Badge */}
        {isSeatsLow && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Only {bus.availableSeats} seats left
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Company & Plate */}
        <div className="mb-3">
          <h3 className="font-bold text-lg dark:text-white">{bus.agency}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Plate: {bus.plateNumber}</p>
        </div>

        {/* Departure and Arrival Times */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{bus.departure}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{bus.from}</div>
          </div>

          {/* Arrow and Duration */}
          <div className="flex-1 flex flex-col items-center px-3">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{bus.duration}</div>
            <div className="w-full h-0.5 bg-gray-300 dark:bg-gray-600 relative">
              <div className="absolute right-0 top-1/2 transform translate-y-1/2">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
              </div>
            </div>
            <div className={`text-xs font-medium mt-1 px-2 py-0.5 rounded ${getTimeBadgeColor()}`}>
              {bus.type === 'VIP Premium' ? 'Express' : '1 stop'}
            </div>
          </div>

          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{bus.arrival}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{bus.to}</div>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <AmenitiesList amenities={bus.amenities} size="sm" />
        </div>

        {/* Seats Available */}
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-4">
          {bus.availableSeats} seats available
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Price</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {bus.price.toLocaleString()}
              <span className="text-lg ml-1">CFA</span>
            </div>
          </div>
          <Link to="/select-seats" state={{ bus }}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">
              Choisir ce trajet
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
