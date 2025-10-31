import React from 'react'

type KPI = {
  key: string
  label: string
  value: number
  unit?: string
  delta?: number
}

export default function KPIStats({ kpis }: { kpis: KPI[] }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      role="region"
      aria-label="Key performance indicators"
    >
      {kpis.map((k) => {
        const isPositive = (k.delta ?? 0) > 0
        const deltaColor = isPositive ? 'text-green-600' : 'text-red-600'
        const deltaSymbol = isPositive ? '+' : ''

        return (
          <div
            key={k.key}
            className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            aria-live="polite"
          >
            <div className="flex flex-col space-y-1">
              {/* Label */}
              <div className="text-sm font-medium text-gray-500 tracking-wide">
                {k.label}
              </div>

              {/* Value */}
              <div className="text-4xl font-bold text-blue-900 tracking-tight flex items-baseline space-x-1">
                <span>{k.value.toFixed(1)}</span>
                {k.unit && (
                  <span className="text-lg font-semibold text-gray-400">
                    {k.unit}
                  </span>
                )}
              </div>

              {/* Delta */}
              {k.delta !== undefined && (
                <div className="flex items-center text-sm mt-1">
                  <span className={`${deltaColor} font-medium`}>
                    Δ {deltaSymbol}{k.delta.toFixed(2)}
                  </span>
                  <span className="text-gray-400 ml-1">vs last period</span>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
