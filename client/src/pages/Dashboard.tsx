import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ANALYTICS } from '../api/graphql/queries'
import KPIStats from '../components/charts/KPIStats'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// --- Region Filter ---
const RegionFilter = ({ region, setRegion }: { region: string; setRegion: (r: string) => void }) => {
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'North', name: 'North' },
    { id: 'South', name: 'South' },
  ]

  return (
    <div className="flex bg-gray-100/70 p-1 rounded-xl backdrop-blur-sm border border-gray-200 shadow-sm">
      {regions.map((r) => (
        <button
          key={r.id}
          onClick={() => setRegion(r.id)}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 flex-1 text-center ${
            region === r.id
              ? 'bg-white text-blue-700 shadow-sm border border-blue-100'
              : 'text-gray-600 hover:text-blue-700 hover:bg-white/70'
          }`}
        >
          {r.name}
        </button>
      ))}
    </div>
  )
}

// --- Line Chart ---
const LineChartSeries = ({ data }: { data: any[] }) => {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-64 text-gray-400">No data available</div>
  }

  return (
    <div className="w-full h-80 sm:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6b7280' }} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              backdropFilter: 'blur(6px)',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// --- Main Dashboard ---
export default function Dashboard() {
  const [region, setRegion] = useState('all')
  const { data, loading, error } = useQuery(ANALYTICS, {
    variables: { filter: { region: region === 'all' ? null : region } },
  })

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-600">
        <svg
          className="animate-spin h-8 w-8 text-blue-600 mb-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
        <p className="text-sm font-medium">Loading dashboard…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="bg-white border border-red-200 p-8 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-red-700">Error Loading Dashboard</h2>
          <p className="text-gray-600 text-sm mt-2">{error.message}</p>
        </div>
      </div>
    )
  }

  const a = data?.analytics
  if (!a) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <p>No analytics data available</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50 p-4 sm:p-8 md:p-12 font-sans">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 space-y-3 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back 👋 — here’s your latest performance overview.</p>
        </div>
        <RegionFilter region={region} setRegion={setRegion} />
      </header>

      {/* KPI Section */}
      <section className="mb-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300">
          <KPIStats kpis={a.kpis} />
        </div>
      </section>

      {/* 30-Day Trend */}
      <section>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
            <h3 className="text-2xl font-semibold text-blue-900">30-Day Performance Trend</h3>
            <span className="text-sm text-gray-500 italic">Updated daily</span>
          </div>
          <LineChartSeries data={a.timeseries} />
        </div>
      </section>
    </div>
  )
}
