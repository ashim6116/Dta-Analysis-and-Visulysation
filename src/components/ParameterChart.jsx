import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function ParameterChart({ years, values, unit, color = "#35d6e8" }) {
  const data = years.map((y, i) => ({ year: y, value: values[i] }));

  return (
    <div className="chart-shell">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="#1c3049" vertical={false} />
          <XAxis dataKey="year" stroke="#4c617d" tick={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
          <YAxis stroke="#4c617d" tick={{ fontFamily: "JetBrains Mono", fontSize: 11 }} width={54} />
          <Tooltip
            contentStyle={{ background: "#0a1626", border: "1px solid #1c3049", borderRadius: 4, fontFamily: "JetBrains Mono", fontSize: 12 }}
            labelStyle={{ color: "#7f97b5" }}
            formatter={(v) => [`${v} ${unit}`, "value"]}
          />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
