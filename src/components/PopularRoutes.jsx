import React from 'react';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';

const popularRoutes = [
  {
    from: 'Douala',
    to: 'Yaoundé',
    time: '6 hours',
    price: '3500 FCFA',
  },
  {
    from: 'Yaoundé',
    to: 'Bafoussam',
    time: '5 hours',
    price: '4000 FCFA',
  },
  {
    from: 'Bafoussam',
    to: 'Bamenda',
    time: '3 hours',
    price: '2500 FCFA',
  },
  {
    from: 'Douala',
    to: 'Buea',
    time: '2 hours',
    price: '2000 FCFA',
  },
];

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const PopularRoutes = () => {
  const navigate = useNavigate()

  const handleBooking = (route) => {
    // simple handler: navigate to buses page with route pre-filled
    navigate('/buses', { state: { from: route.from, to: route.to, presetRoute: route } })
  }
  return (
    <section className="w-2/3 mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8">Popular Routes</h2>
      <div className='flex justify-between'>
        <p>Explore our most traveled routes and book your tickets with ease.</p>
        <Link to="/buses" className="text-blue-500 font-bold">View all<ArrowRight /> </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularRoutes.map((route, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-center transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-lg">{route.from}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{route.to}</p>
              <p className="font-bold text-lg text-blue-500">Price: {route.price}</p>
            </div>
            <div className="text-right flex flex-col gap-3">
              <h3 className="font-bold text-lg">{route.to}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{route.time}</p>
              <Button type="button" onClick={() => handleBooking(route)}>Book Now</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRoutes;
