import { useQuery } from '@apollo/client'
import { ANALYTICS } from '../api/graphql/queries'
import LineChartSeries from '../components/charts/LineChartSeries'
import { useState } from 'react'

export default function Analytics() {
  const [region, setRegion] = useState<string | undefined>(undefined)
  const { data, loading, error, refetch } = useQuery(ANALYTICS, { variables: { filter: {} }})

  if (loading) return <div className="card">Loading analytics…</div>
  if (error) return <div className="card">Error: {error.message}</div>

  const onFilter = (r?: string) => {
    setRegion(r)
    refetch({ filter: { region: r || null } })
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="header">
            <h2 style={{ margin: 0 }}>Analytics</h2>
            <div>
              <label className="sr-only" htmlFor="region">Region</label>
              <select id="region" onChange={(e)=>onFilter(e.target.value || undefined)} value={region || ''} aria-label="Select a region">
                <option value="">All regions</option>
                <option value="North">North</option>
                <option value="South">South</option>
              </select>
            </div>
          </div>
          <LineChartSeries data={data.analytics.timeseries} />
        </div>
      </div>
    </div>
  )
}
