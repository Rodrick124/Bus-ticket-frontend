import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function ModifySearchModal({ isOpen, onClose, initialData, onModify }) {
  const [from, setFrom] = useState(initialData?.from || '');
  const [to, setTo] = useState(initialData?.to || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [passengers, setPassengers] = useState(initialData?.passengers || 1);

  const popularRoutes = ['Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Buea'];

  const handleModify = () => {
    onModify({ from, to, date, passengers });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">Modify Search</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* From */}
          <div>
            <label className="block text-sm font-medium mb-2">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select departure city</option>
              {popularRoutes.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* To */}
          <div>
            <label className="block text-sm font-medium mb-2">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select destination city</option>
              {popularRoutes.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium mb-2">Passengers</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max="9"
                value={passengers}
                onChange={(e) => setPassengers(Math.max(1, Math.min(9, parseInt(e.target.value) || 1)))}
                className="flex-1 text-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setPassengers(Math.min(9, passengers + 1))}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleModify}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
          >
            Modify
          </button>
        </div>
      </div>
    </div>
  );
}
