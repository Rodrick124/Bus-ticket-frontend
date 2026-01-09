import React from 'react';

const Card = ({ icon, text, figure }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-evenly">
        <div>
          {icon}
        </div>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{text}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{figure}</p>
      </div>
    </div>
  );
};

export default Card;
