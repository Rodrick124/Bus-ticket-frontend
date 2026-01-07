import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

export default function BusCard({bus}){
  return (
    <div className="card p-4 flex items-center justify-between gap-4 dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold">{bus.company.split(' ')[0][0]}</div>
        <div>
          <div className="font-bold dark:text-gray-100">{bus.company}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">{bus.from} → {bus.to}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{bus.departure} • {bus.duration} • {bus.type}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold dark:text-gray-200">{bus.price} XAF</div>
        <div className="mt-3">
          <Link to="/select-seats" state={{bus}}>
            <Button> Select Seats </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
