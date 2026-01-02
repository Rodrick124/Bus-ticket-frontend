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

  const validate = ()=>{
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
    const booking = {bus, seats, passenger:form, total:seats.length * (bus.price||0)}
    localStorage.setItem('latestBooking', JSON.stringify(booking))
    navigate('/summary', {state:{booking}})
  }

  return (
    <div className="card p-4 space-y-4">
      <h3 className="font-bold">Passenger Information</h3>
      <form onSubmit={submit} className="grid grid-cols-1 gap-3">
        <input placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="p-2 border rounded" />
        {errors.name && <div className="text-xs text-red-500">{errors.name}</div>}
        <input placeholder="Phone Number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="p-2 border rounded" />
        {errors.phone && <div className="text-xs text-red-500">{errors.phone}</div>}
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="p-2 border rounded" />
        {errors.email && <div className="text-xs text-red-500">{errors.email}</div>}
        <input placeholder="National ID / Passport" value={form.id} onChange={e=>setForm({...form,id:e.target.value})} className="p-2 border rounded" />
        <input placeholder="Emergency Contact" value={form.emergency} onChange={e=>setForm({...form,emergency:e.target.value})} className="p-2 border rounded" />
        <div className="text-right">
          <Button type="submit">Confirm Reservation</Button>
        </div>
      </form>
    </div>
  )
}
