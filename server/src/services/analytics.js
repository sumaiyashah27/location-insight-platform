import { mockTimeSeries, mockKPIs } from '../data/metrics.js';

export function buildAnalytics(filter) {
  // Dumb filter by region and date range to keep example simple
  const { region, from, to } = filter || {};
  let series = mockTimeSeries;
  if (region) series = series.filter(p => p.region === region);
  if (from) series = series.filter(p => p.date >= from);
  if (to) series = series.filter(p => p.date <= to);

  // KPIs recomputed based on filtered series
  const values = series.map(s => s.value);
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = values.length ? sum / values.length : 0;
  const perf = Math.max(75, Math.min(98, 80 + (avg % 10))); // mock stability
  const access = Math.max(80, Math.min(95, 82 + (avg % 8)));
  const reliability = Math.max(85, Math.min(97, 88 + (avg % 6)));

  return {
    kpis: mockKPIs(perf, access, reliability),
    timeseries: series,
    reliability,
    accessibility: access,
    performance: perf
  };
}
