import React, { useState } from 'react'
import { FiCheckCircle, FiClock, FiCreditCard, FiGlobe, FiSmartphone } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function PassengerInfo() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const bus = state?.bus || {}
  const seats = state?.seats || []

  const [form, setForm] = useState({ name: '', phone: '', email: '', id: '', emergency: '' })
  const [errors, setErrors] = useState({})
  const [paymentMethod, setPaymentMethod] = useState('card')
  const totalCost = seats.length * (bus.price || 0)

  const validate = () => {
    const e = {}
    if (!form.name) e.name = 'Required'
    if (!form.phone) e.phone = 'Required'
    if (!form.email) e.email = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    const booking = { bus, seats, passenger: form, total: totalCost }
    localStorage.setItem('latestBooking', JSON.stringify(booking))
    navigate('/summary', { state: { booking } })
  }

  const handlePayNow = () => {
    if (!validate()) return
    const booking = { bus, seats, passenger: form, total: totalCost }
    navigate('/payment', { state: { booking } })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex flex-col gap-1">
            <p className="text-3xl font-bold uppercase text-slate-900 dark:text-blue-300">Secure Checkout</p>
            <h1 className="text-sm  dark:text-white">Confirm your journey details and complete payment to finalize your booking.</h1>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                <FiCheckCircle className="h-5 w-5 text-blue-600" />
                Passenger Details
              </div>
              <div className="mt-6 grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <input
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                  {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                    <input
                      placeholder="john@example.com"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                    {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                    <input
                      placeholder="+237 6XX XXX-XXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                    {errors.phone && <p className="mt-2 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">National ID / Passport</label>
                    <input
                      placeholder="ID number"
                      value={form.id}
                      onChange={(e) => setForm({ ...form, id: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Emergency Contact</label>
                    <input
                      placeholder="+237 6XX XXX-XXX"
                      value={form.emergency}
                      onChange={(e) => setForm({ ...form, emergency: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                <FiCreditCard className="h-5 w-5 text-blue-600" />
                Payment Method
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  { value: 'card', title: 'Credit / Debit Card', description: 'Visa, Mastercard', icon: FiCreditCard },
                  { value: 'paypal', title: 'PayPal', description: 'Connect your PayPal account', icon: FiGlobe },
                  { value: 'mobile', title: 'Mobile Pay', description: 'MTN or Orange Money', icon: FiSmartphone }
                ].map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPaymentMethod(option.value)}
                      className={`flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition ${paymentMethod === option.value ? 'border-blue-500 bg-blue-50 text-slate-900 dark:border-blue-400 dark:bg-blue-950/50' : 'border-gray-200 bg-white text-slate-700 hover:border-slate-300 dark:border-gray-700 dark:bg-gray-900 dark:text-slate-300'}`}
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-blue-600 dark:bg-slate-800 dark:text-blue-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold">{option.title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{option.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Card Number</label>
                  <input
                    placeholder="0000 0000 0000 0000"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Expiry Date</label>
                    <input
                      placeholder="MM / YY"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">CVV</label>
                    <input
                      placeholder="123"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button onClick={handlePayNow} type="button" className="w-full rounded-2xl bg-blue-700 text-white hover:bg-blue-950 sm:w-auto p-2">Pay Now</Button>
              <Button type="submit" className="w-full rounded-2xl bg-slate-900 text-white hover:bg-red-600 sm:w-auto p-2">Confirm Reservation</Button>
            </div>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-700 dark:text-blue-300">Trip Summary</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{bus.company || 'Trip Summary'}</h2>
            </div>
            <div className="rounded-3xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">{bus.type || 'Standard'}</div>
          </div>

          <div className="mt-6 space-y-4 rounded-3xl bg-gray-50 p-5 dark:bg-gray-900">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <FiClock className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Departure</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{bus.from || 'Unknown'}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{bus.departure || '--:--'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <FiGlobe className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Arrival</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{bus.to || 'Unknown'}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{bus.arrival || '--:--'}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4 rounded-[1.75rem] border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
            <div className="grid gap-3">
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Date</span>
                <span>{bus.date || 'TBD'}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Time</span>
                <span>{bus.departure || '--:--'}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Seats</span>
                <span>{seats.length ? seats.join(', ') : 'None'}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Class</span>
                <span>{bus.type || 'Standard'}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Plate number</span>
                <span>{bus.plateNumber || 'Not specified'}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-gray-50 p-5 dark:bg-gray-900">
            <div className="grid gap-3 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{totalCost.toLocaleString()} XAF</span>
              </div>
              <div className="flex justify-between">
                <span>Tax & Service Fee</span>
                <span>{(totalCost * 0.05).toLocaleString(undefined, { maximumFractionDigits: 2 })} XAF</span>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Amount</p>
                <p className="mt-1 text-2xl font-semibold text-blue-900 dark:text-white">{(totalCost * 1.05).toLocaleString(undefined, { maximumFractionDigits: 2 })} XAF</p>
              </div>
              <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{seats.length} ticket(s)</div>
            </div>
          </div>

          <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">Secure encrypted transaction</p>
        </div>
      </div>
    </div>
  )
}
