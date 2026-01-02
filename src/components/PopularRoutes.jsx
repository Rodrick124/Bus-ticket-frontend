import React from 'react';

const popularRoutes = [
  {
    from: 'Douala',
    to: 'Yaoundé',
    price: '3500 FCFA',
    image: 'https://images.unsplash.com/photo-1570125909248-b39b5b1a0a4c?q=80&w=1932&auto=format&fit=crop',
  },
  {
    from: 'Yaoundé',
    to: 'Bafoussam',
    price: '4000 FCFA',
    image: 'https://images.unsplash.com/photo-1599557041284-7e2a1581e358?q=80&w=2070&auto=format&fit=crop',
  },
  {
    from: 'Bafoussam',
    to: 'Bamenda',
    price: '2500 FCFA',
    image: 'https://images.unsplash.com/photo-1618925480323-253b2d7b4a52?q=80&w=2070&auto=format&fit=crop',
  },
  {
    from: 'Douala',
    to: 'Buea',
    price: '2000 FCFA',
    image: 'https://images.unsplash.com/photo-1549952939-529a7387934c?q=80&w=2070&auto=format&fit=crop',
  },
];

const PopularRoutes = () => {
  return (
    <section className="w-2/3 mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Popular Routes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {popularRoutes.map((route, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <img src={route.image} alt={`${route.from} to ${route.to}`} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{`${route.from} - ${route.to}`}</h3>
              <p className="text-sm text-gray-600 mt-2">Starting from <span className="font-bold text-blue-500">{route.price}</span></p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRoutes;
