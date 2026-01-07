import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BusCard from '../components/BusCard';
import data from '../data/buses.json';

export default function AvailableBuses() {
  const [buses, setBuses] = useState([]);
  const [filter, setFilter] = useState({ type: 'all', maxPrice: 10000, time: 'all' });
  const location = useLocation();

  const { from, to, date } = location.state || { from: 'any', to: 'any', date: '' };

  useEffect(() => {
    // In a real app, you'd fetch this data, but for now we filter the json
    const filteredByRoute = data.filter(bus => 
      (from === 'any' || bus.from.toLowerCase() === from.toLowerCase()) &&
      (to === 'any' || bus.to.toLowerCase() === to.toLowerCase())
    );
    setBuses(filteredByRoute);
  }, [from, to]);

  const filteredBuses = buses.filter(b => {
    if (filter.type !== 'all' && b.type !== filter.type) return false;
    if (b.price > filter.maxPrice) return false;
    // Time filter can be added here if needed
    return true;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Available Buses</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Showing routes from <span className="font-semibold text-primary">{from}</span> to <span className="font-semibold text-primary">{to}</span>
          {date && ` on ${date}`}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8 flex items-center justify-between">
        <h3 className="text-lg font-bold">Filter Results</h3>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Bus Type</label>
            <select onChange={e => setFilter({ ...filter, type: e.target.value })} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
              <option value="all">All Types</option>
              <option value="Standard">Standard</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Max Price: {filter.maxPrice} XAF</label>
            <input type="range" min="1000" max="10000" defaultValue="10000" className="w-40" onChange={e => setFilter({ ...filter, maxPrice: parseInt(e.target.value) })} />
          </div>
        </div>
      </div>

      {filteredBuses.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredBuses.map(bus => <BusCard key={bus.id} bus={bus} />)}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 dark:text-gray-400">No buses available for this route with the selected filters.</p>
        </div>
      )}
    </main>
  );
}
