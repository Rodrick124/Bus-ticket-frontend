import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FiCheckCircle, FiDownload, FiShare2, FiGift, FiArrowRight } from 'react-icons/fi'

export default function BookingSummary(){
  const {state} = useLocation()
  const booking = state?.booking || JSON.parse(localStorage.getItem('latestBooking')||'null')

  if(!booking) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="card p-8 text-center shadow-lg dark:bg-gray-800">
        <h3 className="text-2xl font-bold mb-4 dark:text-white">No booking found</h3>
        <Link to="/" className="text-primary hover:underline dark:text-white">Back to Home</Link>
      </div>
    </div>
  )

  const bookingId = booking.id || booking.bookingId || 'TH-0000-000'
  const paidStatus = booking.paid || booking.status || 'Paid'
  const passengerName = booking.passenger?.name || 'Guest Passenger'
  const busCategory = booking.bus?.category || booking.bus?.type || 'Standard'
  const departureDate = booking.bus?.date || booking.date || 'TBD'
  const departureTime = booking.bus?.departure || booking.departure || 'TBD'
  const seatNumber = booking.seats?.length ? booking.seats.join(', ') : 'TBD'
  const fromLabel = booking.bus?.from || 'Origin'
  const toLabel = booking.bus?.to || 'Destination'
  const fromDetail = booking.bus?.fromAgency || booking.bus?.fromDetails || ''
  const toDetail = booking.bus?.toAgency || booking.bus?.toDetails || ''
  const routeInfo = booking.bus?.duration || booking.bus?.distance
    ? `${booking.bus.distance ? booking.bus.distance + ' • ' : ''}${booking.bus.duration ?? ''}`
    : '580 KM • 6H 30M'

  return (
    <div className="min-h-[90vh] bg-gray-50 dark:bg-gray-950 px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="rounded-[2rem] bg-white dark:bg-gray-900 p-10 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <FiCheckCircle className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-slate-900 dark:text-white">Booking Confirmed!</h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">Your adventure with TransportHub is ready to begin.</p>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.85fr_1fr]">
          <section className="rounded-[2rem] bg-white dark:bg-gray-900 p-10 shadow-2xl">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Booking ID</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{bookingId}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  {paidStatus}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Passenger Name</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{passengerName}</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Bus Category</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{busCategory}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Date & Time</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{departureDate}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{departureTime}</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Seat Number</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{seatNumber}</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Total Paid</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{booking.total?.toLocaleString() ?? '0'} XAF</p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-white dark:bg-gray-900 p-10 shadow-2xl">
            <div className="flex h-full flex-col items-center justify-center gap-6">
              <div className="flex h-72 w-full items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-gray-700 dark:bg-gray-950">
                <div className="grid h-full w-full place-items-center rounded-3xl bg-white px-4 py-6 shadow-sm dark:bg-gray-900">
                  <div className="h-56 w-56 rounded-3xl bg-slate-100 dark:bg-gray-800" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-slate-900 dark:text-white">Scan for Boarding</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Present this QR code to the agency staff at the terminal.</p>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-[2rem] bg-white dark:bg-gray-900 p-8 shadow-2xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">From</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{fromLabel}</p>
              {fromDetail && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{fromDetail}</p>}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                <FiArrowRight className="h-5 w-5" />
              </span>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">{routeInfo}</p>
            </div>
            <div className="text-right lg:text-left">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">To</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{toLabel}</p>
              {toDetail && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{toDetail}</p>}
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          <button className="rounded-2xl border border-slate-200 bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 dark:border-gray-700 dark:bg-blue-700">  <span className="inline-flex items-center gap-2"><FiDownload className="h-4 w-4" />Download PDF</span></button>
          <button className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-gray-700 dark:bg-gray-950 dark:text-slate-100 dark:hover:bg-gray-900"> <span className="inline-flex items-center gap-2"><FiShare2 className="h-4 w-4" />Share Ticket</span></button>
          <Link to="/dashboard/userdashboard" className="inline-flex items-center justify-center rounded-2xl bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-800">Go to My Bookings</Link>
        </section>

        <section className="rounded-[2rem] bg-slate-950 text-white p-8 shadow-2xl">
          <div className="grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-blue-200">
              <FiGift className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Reward earned</p>
              <p className="mt-3 text-2xl font-semibold text-white">Earned 250 Loyalty Points!</p>
              <p className="mt-2 text-sm text-slate-300">Redeem points for discounts on your next trip.</p>
            </div>
            <Link to="/dashboard/userdashboard" className="inline-flex h-14 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">View Wallet</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
