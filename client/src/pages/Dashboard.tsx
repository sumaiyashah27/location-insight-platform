import { useQuery } from '@apollo/client'
import { ANALYTICS } from '../api/graphql/queries'
import KPIStats from '../components/charts/KPIStats'
import LineChartSeries from '../components/charts/LineChartSeries'

export default function Dashboard() {
  const { data, loading, error } = useQuery(ANALYTICS, { variables: { filter: {} }})

  if (loading) return <div className="card">Loading dashboard…</div>
  if (error) return <div className="card">Error: {error.message}</div>

  const a = data.analytics

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <KPIStats kpis={a.kpis} />
        </div>
      </div>
      <div className="col-12">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>30-day Trend</h3>
          <LineChartSeries data={a.timeseries} />
        </div>
      </div>
    </div>
  )
}
