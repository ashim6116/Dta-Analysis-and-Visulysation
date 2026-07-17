import { useEffect, useState } from "react";

// Simulated telemetry readout: cycles through coordinate + index values to give
// the hero an "instrument" feel. Values are illustrative, not live sensor data.
const READINGS = [
  { label: "LAT", value: "19.7002° N" },
  { label: "LON", value: "85.3200° E" },
  { label: "MNDWI", value: "+0.352" },
  { label: "SALINITY", value: "5.9 ppt" },
  { label: "LST", value: "31.4°C" },
];

export default function CoordinateReadout() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="readout mono" role="status" aria-label="Sample telemetry readout">
      {READINGS.map((r, i) => (
        <div key={r.label} className={"readout-item" + (i === tick % READINGS.length ? " live" : "")}>
          <span className="readout-label">{r.label}</span>
          <span className="readout-value">{r.value}</span>
        </div>
      ))}
    </div>
  );
}
