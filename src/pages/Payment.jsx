import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Payment() {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold">Error</h2>
        <p>No booking information found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Complete Your Payment</h2>
      <div className="card p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg">Reservation Summary</h3>
          <div className="text-sm">
            <p><strong>Bus:</strong> {booking.bus?.company || 'N/A'}</p>
            <p><strong>Seats:</strong> {Array.isArray(booking.seats) ? booking.seats.join(', ') : 'N/A'}</p>
            <p><strong>Passenger:</strong> {booking.passenger?.name || 'N/A'}</p>
          </div>
        </div>
        <div className="text-xl font-bold text-center">
          Total: {booking.total ?? 0} XAF
        </div>
        <div className="text-center">
          <p className="text-gray-600">This is a placeholder for the payment gateway.</p>
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4">
            Pay Securely
          </button>
        </div>
      </div>
    </div>
  );
}
