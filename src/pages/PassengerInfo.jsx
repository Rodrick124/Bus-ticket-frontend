import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function PassengerInfo(){
  const {state} = useLocation()
  const navigate = useNavigate()
  const bus = state?.bus || {}
  const seats = state?.seats || []

  const [form, setForm] = useState({name:'',phone:'',email:'',id:'',emergency:''})
  const [errors, setErrors] = useState({})
  const totalCost = seats.length * (bus.price || 0)

  const validate = () =>{
    const e = {}
    if(!form.name) e.name = 'Required'
    if(!form.phone) e.phone = 'Required'
    if(!form.email) e.email = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev)=>{
    ev.preventDefault()
    if(!validate()) return
    const booking = {bus, seats, passenger:form, total:totalCost}
    localStorage.setItem('latestBooking', JSON.stringify(booking))
    navigate('/summary', {state:{booking}})
  }

  const handlePayNow = () => {
    if (!validate()) return;
    const booking = { bus, seats, passenger: form, total: totalCost };
    navigate('/payment', { state: { booking } });
  };

  return (
    <div className="p-4 space-y-4 max-w-7xl mx-auto px-4 py-4 grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-bold py-4">Passenger Information</h3>
        <form onSubmit={submit} className="grid grid-cols-1 gap-3 card p-4 dark:bg-gray-800">
          <input placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="p-2 border rounded placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
          {errors.name && <div className="text-xs text-red-500">{errors.name}</div>}
          <input placeholder="Phone Number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="p-2 border rounded placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
          {errors.phone && <div className="text-xs text-red-500">{errors.phone}</div>}
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="p-2 border rounded placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
          {errors.email && <div className="text-xs text-red-500">{errors.email}</div>}
          <input placeholder="National ID / Passport" value={form.id} onChange={e=>setForm({...form,id:e.target.value})} className="p-2 border rounded placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
          <input placeholder="Emergency Contact" value={form.emergency} onChange={e=>setForm({...form,emergency:e.target.value})} className="p-2 border rounded placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
          <div className="flex justify-end items-center gap-4 py-4">
            <Button type="submit" className="bg-red-500 text-white p-2 rounded">Confirm Reservation</Button>
            <Button onClick={handlePayNow} type="button" className="bg-green-500 text-white p-2 rounded">Pay Now</Button>
          </div>
        </form>
      </div>
      
      <div>
        <h3 className="text-3xl font-bold py-2">Reservation Details</h3>
        <div className="card p-4 space-y-4 dark:bg-gray-800">
          <div className="text-lg">Bus Company: <strong>{bus.company}</strong></div>
          <div className="text-lg">Departure Time: <strong>{bus.departure}</strong></div>
          <div className="text-lg">Seats Selected: <strong>{seats.join(', ')}</strong></div>
          <div className="text-lg">Total Cost: <strong>{totalCost} XAF</strong></div>
        </div>
      </div>
      
    </div>
  )
}
