import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import BusCard from '../components/BusCard';
import FilterSidebar from '../components/FilterSidebar';
import ModifySearchModal from '../components/ModifySearchModal';
import data from '../data/buses.json';
import { FiEdit2, FiChevronDown } from 'react-icons/fi';

export default function AvailableBuses() {
  const [buses, setBuses] = useState([]);
  const [filters, setFilters] = useState({
    departureTime: [],
    busClass: [],
    agencies: [],
    maxPrice: 10000
  });
  const [sortBy, setSortBy] = useState('cheapest');
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from: 'any',
    to: 'any',
    date: '',
    passengers: 1
  });

  const location = useLocation();
  const initialParams = location.state || { from: 'any', to: 'any', date: '', passengers: 1 };

  useEffect(() => {
    // Initialize search params from route or previous state
    setSearchParams(prev => ({
      ...prev,
      from: initialParams.from || prev.from,
      to: initialParams.to || prev.to,
      date: initialParams.date || prev.date,
      passengers: initialParams.passengers || prev.passengers
    }));

    // Filter buses by route
    const filteredByRoute = data.filter(bus =>
      (initialParams.from === 'any' || bus.from.toLowerCase() === initialParams.from.toLowerCase()) &&
      (initialParams.to === 'any' || bus.to.toLowerCase() === initialParams.to.toLowerCase())
    );
    setBuses(filteredByRoute);
  }, [initialParams.from, initialParams.to]);

  // Get unique agencies for filter
  const agencies = useMemo(() => {
    return [...new Set(buses.map(b => b.agency))].sort();
  }, [buses]);

  // Apply filters
  const filteredBuses = useMemo(() => {
    return buses.filter(b => {
      // Price filter
      if (b.price > filters.maxPrice) return false;

      // Bus class filter
      if (filters.busClass.length > 0 && !filters.busClass.includes(b.type)) {
        return false;
      }

      // Agency filter
      if (filters.agencies.length > 0 && !filters.agencies.includes(b.agency)) {
        return false;
      }

      // Departure time filter
      if (filters.departureTime.length > 0) {
        const hour = parseInt(b.departure.split(':')[0]);
        const timeCategory = hour >= 5 && hour < 12 ? 'morning' :
                            hour >= 12 && hour < 17 ? 'afternoon' :
                            hour >= 17 && hour < 21 ? 'evening' : 'night';
        if (!filters.departureTime.includes(timeCategory)) return false;
      }

      return true;
    });
  }, [buses, filters]);

  // Sort buses
  const sortedBuses = useMemo(() => {
    const sorted = [...filteredBuses];

    switch (sortBy) {
      case 'cheapest':
        return sorted.sort((a, b) => a.price - b.price);
      case 'fastest':
        return sorted.sort((a, b) => {
          const durationA = parseInt(a.duration);
          const durationB = parseInt(b.duration);
          return durationA - durationB;
        });
      case 'departure':
        return sorted.sort((a, b) => a.departure.localeCompare(b.departure));
      default:
        return sorted;
    }
  }, [filteredBuses, sortBy]);

  const handleModifySearch = (newParams) => {
    setSearchParams(newParams);
    // Filter buses by new route
    const filteredByRoute = data.filter(bus =>
      (newParams.from === 'any' || bus.from.toLowerCase() === newParams.from.toLowerCase()) &&
      (newParams.to === 'any' || bus.to.toLowerCase() === newParams.to.toLowerCase())
    );
    setBuses(filteredByRoute);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {searchParams.from} <span className="text-gray-400">→</span> {searchParams.to}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {searchParams.date && <span>{searchParams.date}</span>}
                {searchParams.passengers && <span> • {searchParams.passengers} Adult{searchParams.passengers > 1 ? 's' : ''}</span>}
              </p>
            </div>
            <button
              onClick={() => setIsModifyOpen(true)}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg transition"
            >
              <FiEdit2 className="w-5 h-5" />
              Modify
            </button>
          </div>
        </div>

        {/* Results Info and Sort */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Showing {sortedBuses.length} results</span>
          </p>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="cheapest">Cheapest First</option>
                <option value="fastest">Fastest</option>
                <option value="departure">Earliest Departure</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Content: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              agencies={agencies}
            />
          </div>

          {/* Bus Cards Grid */}
          <div className="lg:col-span-3">
            {sortedBuses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {sortedBuses.map(bus => (
                  <BusCard key={bus.id} bus={bus} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  No buses available for this route with the selected filters.
                </p>
                <button
                  onClick={() => setFilters({ departureTime: [], busClass: [], agencies: [], maxPrice: 10000 })}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modify Search Modal */}
      <ModifySearchModal
        isOpen={isModifyOpen}
        onClose={() => setIsModifyOpen(false)}
        initialData={searchParams}
        onModify={handleModifySearch}
      />
    </main>
  );
}
