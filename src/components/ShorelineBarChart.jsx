import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ReferenceLine } from "recharts";

export default function ShorelineBarChart({ transects, selectedId, onSelectBar }) {
  const data = transects.features.map((f) => ({
    id: f.properties.id,
    sector: f.properties.sector,
    rate: f.properties.rate_m_per_yr,
    trend: f.properties.trend,
  }));

  return (
    <div className="chart-shell">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="#1c3049" vertical={false} />
          <XAxis dataKey="id" stroke="#4c617d" tick={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
          <YAxis stroke="#4c617d" tick={{ fontFamily: "JetBrains Mono", fontSize: 11 }} width={44} unit=" m/yr" />
          <ReferenceLine y={0} stroke="#2a4a68" />
          <Tooltip
            contentStyle={{ background: "#0a1626", border: "1px solid #1c3049", borderRadius: 4, fontFamily: "JetBrains Mono", fontSize: 12 }}
            labelStyle={{ color: "#7f97b5" }}
            formatter={(v, _n, props) => [`${v} m/yr`, props.payload.sector]}
          />
          <Bar
            dataKey="rate"
            radius={[2, 2, 0, 0]}
            onClick={(entry) => onSelectBar?.(entry.id)}
            cursor="pointer"
          >
            {data.map((d) => (
              <Cell
                key={d.id}
                fill={d.trend === "erosion" ? "#ff6b5c" : "#17c3a2"}
                opacity={selectedId && selectedId !== d.id ? 0.45 : 1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
