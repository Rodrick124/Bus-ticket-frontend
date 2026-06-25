import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

export default function FilterSidebar({ filters, setFilters, agencies }) {
  const timeSlots = [
    { id: 'morning', label: 'Morning', value: 'morning', range: [5, 12] },
    { id: 'afternoon', label: 'Afternoon', value: 'afternoon', range: [12, 17] },
    { id: 'evening', label: 'Evening', value: 'evening', range: [17, 21] },
    { id: 'night', label: 'Night', value: 'night', range: [21, 5] }
  ];

  const busClasses = ['VIP Premium', 'Classique'];

  const handleTimeToggle = (timeValue) => {
    const currentTimes = filters.departureTime || [];
    if (currentTimes.includes(timeValue)) {
      setFilters({
        ...filters,
        departureTime: currentTimes.filter(t => t !== timeValue)
      });
    } else {
      setFilters({
        ...filters,
        departureTime: [...currentTimes, timeValue]
      });
    }
  };

  const handleClassToggle = (classValue) => {
    const currentClasses = filters.busClass || [];
    if (currentClasses.includes(classValue)) {
      setFilters({
        ...filters,
        busClass: currentClasses.filter(c => c !== classValue)
      });
    } else {
      setFilters({
        ...filters,
        busClass: [...currentClasses, classValue]
      });
    }
  };

  const handleAgencyToggle = (agency) => {
    const currentAgencies = filters.agencies || [];
    if (currentAgencies.includes(agency)) {
      setFilters({
        ...filters,
        agencies: currentAgencies.filter(a => a !== agency)
      });
    } else {
      setFilters({
        ...filters,
        agencies: [...currentAgencies, agency]
      });
    }
  };

  const handlePriceChange = (e) => {
    setFilters({
      ...filters,
      maxPrice: parseInt(e.target.value)
    });
  };

  const handleReset = () => {
    setFilters({
      departureTime: [],
      busClass: [],
      agencies: [],
      maxPrice: 10000
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-fit sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <FiFilter className="w-5 h-5" />
        <h3 className="text-lg font-bold">Filters</h3>
      </div>

      {/* Departure Time */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold mb-3 text-sm">Departure Time</h4>
        <div className="flex gap-2">
          {timeSlots.map(slot => (
            <button
              key={slot.id}
              onClick={() => handleTimeToggle(slot.value)}
              className={`px-2 py-2 rounded-full text-xs font-medium transition ${
                filters.departureTime?.includes(slot.value)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bus Class */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold mb-3 text-sm">Bus Class</h4>
        <div className="space-y-2">
          {busClasses.map(busClass => (
            <label key={busClass} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.busClass?.includes(busClass) || false}
                onChange={() => handleClassToggle(busClass)}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm dark:text-gray-300">{busClass}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold mb-3 text-sm">Price Range</h4>
        <div className="space-y-3">
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={filters.maxPrice || 10000}
            onChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>1,000 CFA</span>
            <span className="font-semibold">{filters.maxPrice?.toLocaleString() || '10,000'} CFA</span>
          </div>
        </div>
      </div>

      {/* Agencies */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold mb-3 text-sm">Agencies</h4>
        <div className="space-y-2">
          {agencies.map(agency => (
            <label key={agency} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.agencies?.includes(agency) || false}
                onChange={() => handleAgencyToggle(agency)}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm dark:text-gray-300">{agency}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
      >
        Reset Filters
      </button>
    </div>
  );
}
