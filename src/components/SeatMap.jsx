import React, { useState, useEffect } from 'react'

// Recreated SeatMap to match the attached bus diagram.
// Layout:
// - Left vertical column: 7 seats (L1..L7)
// - Top block: 3 rows x 11 cols = 33 seats (T1..T33)
// - Middle block: 2 rows x 11 cols = 22 seats (M1..M22)
// - Bottom-right block: 2 rows x 4 cols = 8 seats (B1..B8)
// Total = 70 seats
export default function SeatMap({ price = 0, booked = [], initialSelected = [], onChange }) {
  const ROWS = 11 // 11 rows of 2+3 seats
  const leftLabels = ['A', 'B'] // Labels for the 2-seat group
  const rightLabels = ['C', 'D', 'E'] // Labels for the 3-seat group
  const endLabels = ['A', 'B', 'C', 'D', 'E', 'F'] // Labels for the 6 seats at the end

  const [selected, setSelected] = useState(initialSelected || [])
  useEffect(() => { if (onChange) onChange(selected) }, [selected])

  const toggle = (seatId) => {
    if (booked.includes(seatId)) return
    setSelected(prev => prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId])
  }

  const SeatButton = ({ seatId, rowNum }) => {
    const isBooked = booked.includes(seatId)
    const isSelected = selected.includes(seatId)
    const base = 'w-16 h-16 rounded-lg flex flex-col items-center justify-center text-sm font-semibold transition-transform relative cursor-pointer shadow-md border'
    const cls = isBooked
      ? 'bg-red-400 text-white cursor-not-allowed border-red-500'
      : isSelected
        ? 'bg-blue-500 text-white border-blue-600'
        : 'bg-green-200 text-green-800 border-green-300'
    return (
      <button
        onClick={() => toggle(seatId)}
        disabled={isBooked}
        aria-pressed={isSelected}
        className={`${base} ${cls}`}
      >
        <span className="text-xs text-gray-600">{rowNum}</span>
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
    <div className="relative mx-auto bg-gray-100 rounded-xl shadow-lg p-4 pb-8 border border-gray-200">

      {/* Bus interior - Main Seating (2+3 layout) */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-4 overflow-auto">
          {/* Horizontal layout: each original 'row' becomes a vertical column; columns flow left-to-right */}
            <div className="flex gap-6 items-start">
              {mainRows.map(r => (
                <div key={r.row} className="flex flex-col items-center gap-3">
                  {/* left two seats stacked */}
                  <div className="flex flex-col gap-2">
                    {r.left.map(id => (
                      <SeatButton key={id} seatId={id} rowNum={r.row} />
                    ))}
                  </div>

                  {/* aisle marker between left and right clusters */}
                  <div className="w-10 h-6 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">Aisle</div>

                  {/* right three seats stacked */}
                  <div className="flex flex-col gap-2">
                    {r.right.map(id => (
                      <SeatButton key={id} seatId={id} rowNum={r.row} />
                    ))}
                  </div>
                </div>
              ))}

              {/* Rear 6-seat block: single horizontal row, right-aligned and vertically centered */}
              <div className="flex flex-col items-center gap-0 self-center ml-auto">
                {endRowSeats.map(id => (
                  <SeatButton key={id} seatId={id} rowNum={ROWS + 1} />
                ))}
              </div>
            </div>
        </div>

      
      {/* Legend and totals */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-green-200 rounded-sm inline-block border border-green-300"></span> Available</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-blue-500 rounded-sm inline-block border border-blue-600"></span> Selected</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-red-400 rounded-sm inline-block border border-red-500"></span> Booked</div>
        </div>
        <div className="text-gray-700">Selected: {selected.join(', ') || '—'} • Total: {selected.length * price} XAF</div>
      </div>
    </div>
    )
}
