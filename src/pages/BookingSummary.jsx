import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function BookingSummary(){
  const {state} = useLocation()
  const booking = state?.booking || JSON.parse(localStorage.getItem('latestBooking')||'null')

  if(!booking) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="card p-8 text-center shadow-lg">
        <h3 className="text-2xl font-bold mb-4">No booking found</h3>
        <Link to="/" className="text-primary hover:underline">Back to Home</Link>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 p-4">
      <div className="card p-8 space-y-6 max-w-2xl w-full text-center shadow-2xl">
        <h3 className="text-4xl font-extrabold text-gray-800">Booking Summary</h3>
        <div className="text-xl text-gray-700 space-y-3">
          <div><strong>Route:</strong> {booking.bus.from} → {booking.bus.to}</div>
          <div><strong>Operator:</strong> {booking.bus.company}</div>
          <div><strong>Departure Time:</strong> {booking.bus.departure}</div>
          <div><strong>Seats:</strong> {booking.seats.join(', ')}</div>
          <div><strong>Passenger:</strong> {booking.passenger?.name}</div>
          <div className="pt-4 text-3xl font-bold text-gray-900">Total: {booking.total} XAF</div>
        </div>
      </div>

      <div className="card p-6 mt-8 text-center w-full max-w-2xl shadow-xl">
        <div className="text-2xl text-green-600 font-semibold">✓ Success! Reservation Saved</div>
        <div className="mt-4">
          <Link to="/" className="text-primary text-lg hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
