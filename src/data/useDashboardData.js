import { useEffect, useState } from "react";

const BASE = import.meta.env.BASE_URL;

export function useDashboardData() {
  const [data, setData] = useState({
    boundary: null,
    transects: null,
    timeseries: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`${BASE}data/chilika_boundary.geojson`).then((r) => r.json()),
      fetch(`${BASE}data/shoreline_transects.geojson`).then((r) => r.json()),
      fetch(`${BASE}data/timeseries.json`).then((r) => r.json()),
    ])
      .then(([boundary, transects, timeseries]) => {
        if (cancelled) return;
        setData({ boundary, transects, timeseries, loading: false, error: null });
      })
      .catch((error) => {
        if (cancelled) return;
        setData((d) => ({ ...d, loading: false, error: String(error) }));
      });
    return () => { cancelled = true; };
  }, []);

  return data;
}
