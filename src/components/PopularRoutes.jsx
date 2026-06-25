import React from 'react';
import { Link } from 'react-router-dom';
import BusCard from './BusCard';
import buses from '../data/buses.json';

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const PopularRoutes = () => {
  // Get 3 popular buses to display
  const popularBuses = buses.slice(0, 3);

  return (
    <section className="w-2/3 mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8">Popular Routes</h2>
      <div className='flex justify-between pb-4'>
        <p>Explore our most traveled routes and book your tickets with ease.</p>
        <Link to="/buses" className="text-blue-500 font-bold">View all<ArrowRight /> </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularBuses.map((bus) => (
          <BusCard key={bus.id} bus={bus} />
        ))}
      </div>
    </section>
  );
};

export default PopularRoutes;
