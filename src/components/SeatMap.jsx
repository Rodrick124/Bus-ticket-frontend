import React, { useState, useEffect } from 'react'

// SeatMap component for bus seat selection
// Layout:
// - 13 main rows with 2+3 seating (left: A-B, aisle, right: C-D-E)
//   Generates seats: 1A, 1B, 1C, 1D, 1E, 2A, 2B, ... 13A, 13B, 13C, 13D, 13E (65 seats)
// - 1 rear row with 5 seats: 14A, 14B, 14C, 14D, 14E (5 seats)
// Total = 70 seats
export default function SeatMap({ price = 0, booked = [], initialSelected = [], onChange }) {
  const ROWS = 13 // 13 rows of 2+3 seats
  const leftLabels = ['A', 'B'] // Labels for the 2-seat group
  const rightLabels = ['C', 'D', 'E'] // Labels for the 3-seat group
  const endLabels = ['A', 'B', 'C', 'D', 'E'] // Labels for the 5 seats at the end

  const [selected, setSelected] = useState(initialSelected || [])
  useEffect(() => { if (onChange) onChange(selected) }, [selected])

  const toggle = (seatId) => {
    if (booked.includes(seatId)) return
    setSelected(prev => prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId])
  }

  const SeatButton = ({ seatId, rowNum }) => {
    const isBooked = booked.includes(seatId)
    const isSelected = selected.includes(seatId)
    const base = 'w-14 h-14 rounded-lg flex flex-col items-center justify-center text-sm font-semibold transition-transform relative cursor-pointer shadow-md border'
    const cls = isBooked
      ? 'bg-red-400 text-white cursor-not-allowed border-red-500'
      : isSelected
        ? 'bg-blue-500 text-white border-blue-600'
        : 'bg-green-200 text-green-800 border-green-300 dark:bg-green-800 dark:text-green-200 dark:border-green-700'
    return (
      <button
        onClick={() => toggle(seatId)}
        disabled={isBooked}
        aria-pressed={isSelected}
        className={`${base} ${cls}`}
      >
        <span className="text-xs text-gray-600 dark:text-gray-400">{rowNum}</span>
        <span className="text-sm font-bold">{seatId.replace(/^[A-Z]/, '') || seatId}</span>
      </button>
    )
  }

  const mainRows = Array.from({ length: ROWS }, (_, i) => {
    const n = i + 1
    return {
      row: n,
      left: leftLabels.map(l => `${n}${l}`),
      right: rightLabels.map(l => `${n}${l}`)
    }
  })

  const endRowSeats = endLabels.map(l => `${ROWS + 1}${l}`)


  return (
    <div className="relative mx-auto bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg p-2 pb-8 border border-gray-200 dark:border-gray-700">

      {/* Bus interior - Main Seating (2+3 layout) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-4 overflow-auto">
          {/* Horizontal layout: each original 'row' becomes a vertical column; columns flow left-to-right */}
            <div className="flex gap-7 items-start">
              {mainRows.map(r => (
                <div key={r.row} className="flex flex-col items-center gap-3">
                  {/* left two seats stacked */}
                  <div className="flex flex-col gap-2">
                    {r.left.map(id => (
                      <SeatButton key={id} seatId={id} rowNum={r.row} />
                    ))}
                  </div>

                  {/* aisle marker between left and right clusters */}
                  <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">Aisle</div>

                  {/* right three seats stacked */}
                  <div className="flex flex-col gap-2">
                    {r.right.map(id => (
                      <SeatButton key={id} seatId={id} rowNum={r.row} />
                    ))}
                  </div>
                </div>
              ))}

              {/* Rear 6-seat block: single horizontal row, right-aligned and vertically centered */}
              <div className="flex flex-col items-center gap-4 self-center ml-auto">
                {endRowSeats.map(id => (
                  <SeatButton key={id} seatId={id} rowNum={ROWS + 1} />
                ))}
              </div>
            </div>
        </div>

      
      {/* Legend and totals */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200"><span className="w-4 h-4 bg-green-200 dark:bg-green-800 rounded-sm inline-block border border-green-300 dark:border-green-700"></span> Available</div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200"><span className="w-4 h-4 bg-blue-500 rounded-sm inline-block border border-blue-600"></span> Selected</div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200"><span className="w-4 h-4 bg-red-400 rounded-sm inline-block border border-red-500"></span> Booked</div>
        </div>
        <div className="text-gray-700 dark:text-gray-300">Selected: {selected.join(', ') || '—'} • Total: {selected.length * price} XAF</div>
      </div>
    </div>
    )
}
