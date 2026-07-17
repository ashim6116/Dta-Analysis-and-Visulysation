const KPIS = [
  { label: "Satellite Images", value: "25,480" },
  { label: "GIS Layers", value: "320" },
  { label: "Projects", value: "86" },
  { label: "Reports", value: "125" },
  { label: "Datasets", value: "3.4 TB" },
  { label: "Active Users", value: "182" },
];

export default function KpiHeader() {
  return (
    <div className="kpi-row">
      {KPIS.map((k) => (
        <div className="kpi-card panel" key={k.label}>
          <div className="kpi-value mono">{k.value}</div>
          <div className="kpi-label">{k.label}</div>
        </div>
      ))}
    </div>
  );
}
