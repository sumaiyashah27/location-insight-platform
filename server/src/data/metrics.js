// Simple mocked data: daily values across two regions
const days = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return d.toISOString().slice(0,10);
});

export const mockTimeSeries = [
  ...days.map((d, idx) => ({ date: d, value: 100 + (idx % 7) * 10 + (idx % 3) * 5, region: 'North' })),
  ...days.map((d, idx) => ({ date: d, value: 90 + (idx % 5) * 12 + (idx % 4) * 3, region: 'South' }))
];

export const mockKPIs = (performance=90, accessibility=85, reliability=92) => ([
  { key: 'perf', label: 'Performance', value: performance, unit: '%', delta: 1.2 },
  { key: 'a11y', label: 'Accessibility', value: accessibility, unit: '%', delta: 0.8 },
  { key: 'reliability', label: 'Reliability', value: reliability, unit: '%', delta: 1.0 }
]);
