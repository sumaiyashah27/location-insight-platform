import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

type Point = { date: string; value: number; region?: string }
export default function LineChartSeries({ data }: { data: Point[] }) {
  // Split by region for separate lines
  const regions = Array.from(new Set(data.map(d => d.region || 'All')))
  const grouped: Record<string, Point[]> = {}
  for (const r of regions) grouped[r] = data.filter(d => (d.region || 'All') === r)

  return (
    <div style={{ width: '100%', height: 360 }} role="img" aria-label="Time series chart">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {regions.map((r, idx) => (
            <Line key={r} type="monotone" dataKey="value" data={grouped[r]} name={r} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
