import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import PopularRoutes from '../components/PopularRoutes'
import FAQ from '../components/FAQ'

export default function Home(){
  const navigate = useNavigate()
  const [from, setFrom] = useState('Douala')
  const [to, setTo] = useState('Yaoundé')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState(1)

  const submit = (e)=>{
    e.preventDefault()
    navigate('/buses', {state:{from,to,date,passengers}})
  }

  return (
      <div className="space-y-12">
          <section className="relative bg-cover bg-center text-white lg:py-80 px-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop')" }}>
              <div className="absolute inset-0 bg-black/60 rounded-lg"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-6xl mx-auto">
                  <h1 className="text-7xl font-extrabold">Book Your Journey, <span className="text-blue-500">Skip the Lines</span></h1>
                  <p className="m-4 w-2/3 text-xl">Fast, reliable bus ticket reservations. Choose your seat, book instantly, and travel with confidence.</p>
                  <div className="w-full md:w-4/5 lg:w-3/4 mt-8">
                      <form onSubmit={submit} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-md shadow-lg text-gray-800 dark:text-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
                              <div className="flex flex-col items-start">
                                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">From</label>
                                  <input value={from} onChange={e => setFrom(e.target.value)} className="p-3 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" placeholder="Departure city" />
                              </div>
                              <div className="flex flex-col items-start">
                                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">To</label>
                                  <input value={to} onChange={e => setTo(e.target.value)} className="p-3 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" placeholder="Destination city" />
                              </div>
                              <div className="flex flex-col items-start">
                                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Date</label>
                                  <input type="date" value={date} onChange={e => setDate(e.target.value)} className="p-3 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                              </div>
                              <div className="flex flex-col items-start">
                                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Passengers</label>
                                  <input type="number" min="1" value={passengers} onChange={e => setPassengers(e.target.value)} className="p-3 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" placeholder="1" />
                              </div>
                              <Button type="submit">Find Buses</Button>
                          </div>
                      </form>
                  </div>
              </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 w-2/3 mx-auto">
              <div className="card p-4 dark:bg-gray-800">
                  <h3 className="font-bold dark:text-gray-100">Why TranspoHub?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Fast search, clear prices, and secure reservations tailored for daily commuters.</p>
              </div>
              <div className="card p-4 dark:bg-gray-800">
                  <h3 className="font-bold dark:text-gray-100">Trusted Operators</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">We partner with verified bus companies across the region.</p>
              </div>
              <div className="card p-4 dark:bg-gray-800">
                  <h3 className="font-bold dark:text-gray-100">Mobile Friendly</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Book quickly on the go — optimized for mobile screens.</p>
              </div>
          </section>
          <PopularRoutes />
          <FAQ />
      </div>
  )
}
