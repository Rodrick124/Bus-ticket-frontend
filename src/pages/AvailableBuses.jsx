import React, {useEffect, useState} from 'react'
import BusCard from '../components/BusCard'
import data from '../data/buses.json'

export default function AvailableBuses(){
  const [buses, setBuses] = useState([])
  const [filter, setFilter] = useState({type:'all', maxPrice:100000, time:'all'})

  useEffect(()=>{
    setBuses(data)
  },[])

  const filtered = buses.filter(b=>{
    if(filter.type !== 'all' && b.type !== filter.type) return false
    if(b.price > filter.maxPrice) return false
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Available Buses</h2>
        <div className="flex gap-2 items-center">
          <select onChange={e=>setFilter({...filter,type:e.target.value})} className="p-2 border rounded">
            <option value="all">All Types</option>
            <option value="Standard">Standard</option>
            <option value="VIP">VIP</option>
          </select>
          <input type="range" min="1000" max="10000" defaultValue="10000" onChange={e=>setFilter({...filter,maxPrice:parseInt(e.target.value)})} />
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map(bus=> <BusCard key={bus.id} bus={bus} />)}
      </div>
    </div>
  )
}
