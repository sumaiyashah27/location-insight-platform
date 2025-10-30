type KPI = { key: string; label: string; value: number; unit?: string; delta?: number }
export default function KPIStats({ kpis }: { kpis: KPI[] }) {
  return (
    <div className="row" role="region" aria-label="Key performance indicators">
      {kpis.map(k => (
        <div key={k.key} className="col-4">
          <div className="card" aria-live="polite">
            <div style={{ fontSize: 12, color: '#9ca3af' }}>{k.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{k.value.toFixed(1)}{k.unit || ''}</div>
            {!!k.delta && <div style={{ fontSize: 12, color: '#9ca3af' }}>Δ {k.delta.toFixed(2)}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
