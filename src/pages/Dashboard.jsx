import { useMemo, useState } from "react";
import { dashboardConfig } from "../data/dashboardConfig";
import { useDashboardData } from "../data/useDashboardData";
<<<<<<< HEAD
import { downloadCSV } from "../data/downloadCSV";
import MapView from "../components/MapView";
import ParameterChart from "../components/ParameterChart";
import ShorelineBarChart from "../components/ShorelineBarChart";
import KpiHeader from "../components/KpiHeader";
import DataTable from "../components/DataTable";
=======
import MapView from "../components/MapView";
import ParameterChart from "../components/ParameterChart";
import ShorelineBarChart from "../components/ShorelineBarChart";
>>>>>>> 0475554f6f7af24fca3f1c510d8c6ecea70b5405

const ACCENT_HEX = { cyan: "#35d6e8", teal: "#17c3a2", amber: "#f0a93d", coral: "#ff6b5c" };

export default function Dashboard() {
  const { boundary, transects, timeseries, loading, error } = useDashboardData();
  const [activePanelId, setActivePanelId] = useState(dashboardConfig[0].id);
  const [activeParamId, setActiveParamId] = useState(dashboardConfig[0].parameters[0].id);
  const [selectedTransect, setSelectedTransect] = useState(null);
<<<<<<< HEAD
  const [coords, setCoords] = useState(null);
  const [shareMsg, setShareMsg] = useState("");
=======
>>>>>>> 0475554f6f7af24fca3f1c510d8c6ecea70b5405

  const activePanel = useMemo(
    () => dashboardConfig.find((p) => p.id === activePanelId),
    [activePanelId]
  );
  const activeParam = useMemo(
    () => activePanel?.parameters.find((p) => p.id === activeParamId),
    [activePanel, activeParamId]
  );

  function selectPanel(panel) {
    setActivePanelId(panel.id);
    setActiveParamId(panel.parameters[0].id);
    setSelectedTransect(null);
  }

<<<<<<< HEAD
  function handleExport() {
    if (activePanel?.isMapDriven) {
      downloadCSV(
        "chilika_shoreline_transects.csv",
        [
          { key: "id", label: "Transect ID" },
          { key: "sector", label: "Sector" },
          { key: "rate", label: "Rate (m/yr)" },
          { key: "trend", label: "Trend" },
        ],
        transects.features.map((f) => ({
          id: f.properties.id,
          sector: f.properties.sector,
          rate: f.properties.rate_m_per_yr,
          trend: f.properties.trend,
        }))
      );
    } else if (activeParam?.seriesKey) {
      downloadCSV(
        `chilika_${activeParam.seriesKey}.csv`,
        [{ key: "year", label: "Year" }, { key: "value", label: activeParam.name }],
        timeseries.years.map((y, i) => ({ year: y, value: timeseries.series[activeParam.seriesKey][i] }))
      );
    }
  }

  function handleShare() {
    navigator.clipboard?.writeText(window.location.href);
    setShareMsg("Link copied");
    setTimeout(() => setShareMsg(""), 1800);
  }

  function handlePrint() {
    window.print();
  }

=======
>>>>>>> 0475554f6f7af24fca3f1c510d8c6ecea70b5405
  if (loading) {
    return (
      <div className="container dash-loading">
        <p className="mono">Loading lagoon datasets…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container dash-loading">
        <p className="mono">Could not load dashboard data: {error}</p>
      </div>
    );
  }

  const selectedTransectData = selectedTransect
    ? transects.features.find((f) => f.properties.id === selectedTransect)
    : null;

<<<<<<< HEAD
  const tableColumns = activePanel.isMapDriven
    ? [
        { key: "id", label: "Transect" },
        { key: "sector", label: "Sector" },
        { key: "rate", label: "Rate (m/yr)", mono: true },
        { key: "trend", label: "Trend" },
      ]
    : [
        { key: "year", label: "Year", mono: true },
        { key: "value", label: `${activeParam?.name} (${timeseries.units[activeParam?.seriesKey] || ""})`, mono: true },
      ];

  const tableRows = activePanel.isMapDriven
    ? transects.features.map((f) => ({
        id: f.properties.id,
        sector: f.properties.sector,
        rate: f.properties.rate_m_per_yr,
        trend: f.properties.trend,
      }))
    : activeParam?.seriesKey
    ? timeseries.years.map((y, i) => ({ year: y, value: timeseries.series[activeParam.seriesKey][i] }))
    : [];

  return (
    <section className="dash">
      <div className="container">
        <div className="dash-head-row">
          <div>
            <div className="eyebrow">Data &amp; Analytics Dashboard — Chilika</div>
            <h1 className="page-title" style={{ fontSize: "1.7rem" }}>GIS &amp; Remote Sensing Command View</h1>
=======
  return (
    <section className="dash">
      <div className="container dash-head">
        <div className="dash-head-row">
          <div>
            <div className="eyebrow">Data &amp; Analytics Dashboard — Chilika</div>
            <h1 className="page-title" style={{ fontSize: "1.9rem" }}>Index &amp; classification panels</h1>
>>>>>>> 0475554f6f7af24fca3f1c510d8c6ecea70b5405
          </div>
          <a
            href="https://code.earthengine.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn gee-link"
          >
            Open GEE Code Editor ↗
          </a>
        </div>
<<<<<<< HEAD

        <KpiHeader />

        <div className="dash-grid-3col">
          <aside className="dash-sidebar panel">
            <div className="sidebar-heading mono">Layer Panel</div>
            {dashboardConfig.map((panel) => (
              <div key={panel.id} className="sidebar-group">
                <button
                  className={"sidebar-panel-btn" + (panel.id === activePanelId ? " active" : "")}
                  style={{ "--accent": ACCENT_HEX[panel.accent] }}
                  onClick={() => selectPanel(panel)}
                >
                  {panel.title}
                </button>
                {panel.id === activePanelId && (
                  <div className="sidebar-params">
                    {panel.parameters.map((param) => (
                      <button
                        key={param.id}
                        className={"sidebar-param-btn" + (param.id === activeParamId ? " active" : "")}
                        onClick={() => setActiveParamId(param.id)}
                      >
                        {param.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </aside>

          <div className="dash-map-col">
            {activePanel.isModelPanel ? (
              <div className="panel ml-inline">
                <p className="hint-text">
                  ML classification panels are model outputs, not raster layers — see the
                  cards below the layer panel selection.
                </p>
              </div>
            ) : (
              <MapView
                boundary={boundary}
                transects={transects}
                showTransects={!!activePanel.isMapDriven}
                selectedId={selectedTransect}
                onSelectTransect={setSelectedTransect}
                onCoordsChange={setCoords}
              />
            )}
            <div className="map-toolbar mono">
              <span>Legend: <i className="legend-dot" style={{ background: ACCENT_HEX[activePanel.accent] }} /> {activePanel.title}</span>
              <span>Coords: {coords ? `${coords.lat.toFixed(3)}°, ${coords.lng.toFixed(3)}°` : "— hover map —"}</span>
              <button className="toolbar-btn" onClick={handleExport}>Export CSV</button>
              <button className="toolbar-btn" onClick={handlePrint}>Print</button>
              <button className="toolbar-btn" onClick={handleShare}>{shareMsg || "Share"}</button>
            </div>
          </div>

          <aside className="dash-info-panel panel">
            <div className="sidebar-heading mono">Information Panel</div>
            {activePanel.isMapDriven && selectedTransectData ? (
              <div className="info-rows">
                <InfoRow label="Feature" value={selectedTransectData.properties.id} />
                <InfoRow label="Sector" value={selectedTransectData.properties.sector} />
                <InfoRow label="Rate" value={`${selectedTransectData.properties.rate_m_per_yr} m/yr`} />
                <InfoRow label="Trend" value={selectedTransectData.properties.trend} />
              </div>
            ) : activePanel.isModelPanel ? (
              <div className="info-rows">
                <InfoRow label="Panel" value={activePanel.title} />
                <InfoRow label="Models" value={String(activePanel.parameters.length)} />
              </div>
            ) : (
              <div className="info-rows">
                <InfoRow label="Parameter" value={activeParam?.fullName} />
                <InfoRow label="Purpose" value={activeParam?.purpose} />
                <InfoRow label="Unit" value={timeseries.units[activeParam?.seriesKey] || "—"} />
                <InfoRow
                  label="Latest value"
                  value={
                    activeParam?.seriesKey
                      ? String(timeseries.series[activeParam.seriesKey].at(-1))
                      : "—"
                  }
                />
              </div>
            )}
          </aside>
        </div>

        <div className="dash-bottom-row">
          <div className="panel dash-chart-panel">
            <div className="sidebar-heading mono">Charts &amp; Graphs</div>
            {activePanel.isMapDriven ? (
              <ShorelineBarChart transects={transects} selectedId={selectedTransect} onSelectBar={setSelectedTransect} />
            ) : activePanel.isModelPanel ? (
              <div className="ml-grid">
                {activePanel.parameters.map((m) => (
                  <div className="panel ml-card" key={m.id}>
                    <div className="ml-card-head">
                      <div className="ml-card-name">{m.name}</div>
                      <div className="ml-card-acc mono">{Math.round(m.accuracy * 100)}%</div>
                    </div>
                    <div className="ml-bar-track">
                      <div className="ml-bar-fill" style={{ width: `${m.accuracy * 100}%` }} />
                    </div>
                    <p className="ml-purpose">{m.purpose}</p>
                  </div>
                ))}
              </div>
            ) : (
              <ParameterChart
                years={timeseries.years}
                values={timeseries.series[activeParam.seriesKey]}
                unit={timeseries.units[activeParam.seriesKey]}
                color={ACCENT_HEX[activePanel.accent]}
              />
            )}
          </div>

          {!activePanel.isModelPanel && (
            <div className="panel dash-table-panel">
              <div className="sidebar-heading mono">Data Table</div>
              <DataTable columns={tableColumns} rows={tableRows} />
=======
        <p className="page-lede">
          Select a panel to view its index layer on the map and its trend over time.
          Panels and parameters are config-driven — adding a new index means adding one
          entry to the dashboard config, not rebuilding the interface. Index layers here
          are computed and exported from the Earth Engine Code Editor.
        </p>
      </div>

      <div className="container dash-grid">
        <aside className="dash-sidebar">
          {dashboardConfig.map((panel) => (
            <div key={panel.id} className="sidebar-group">
              <button
                className={"sidebar-panel-btn" + (panel.id === activePanelId ? " active" : "")}
                style={{ "--accent": ACCENT_HEX[panel.accent] }}
                onClick={() => selectPanel(panel)}
              >
                {panel.title}
              </button>
              {panel.id === activePanelId && (
                <div className="sidebar-params">
                  {panel.parameters.map((param) => (
                    <button
                      key={param.id}
                      className={"sidebar-param-btn" + (param.id === activeParamId ? " active" : "")}
                      onClick={() => setActiveParamId(param.id)}
                    >
                      {param.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        <div className="dash-main">
          <div className="panel dash-info-bar">
            <div>
              <div className="dash-info-name">{activeParam?.fullName}</div>
              <div className="dash-info-purpose">{activeParam?.purpose}</div>
            </div>
            {activePanel.description && (
              <div className="dash-info-desc">{activePanel.description}</div>
            )}
          </div>

          {activePanel.isMapDriven && (
            <div className="dash-panel-grid">
              <MapView
                boundary={boundary}
                transects={transects}
                showTransects
                selectedId={selectedTransect}
                onSelectTransect={setSelectedTransect}
              />
              <div className="panel dash-chart-panel">
                <ShorelineBarChart
                  transects={transects}
                  selectedId={selectedTransect}
                  onSelectBar={setSelectedTransect}
                />
                {selectedTransectData ? (
                  <div className="transect-detail mono">
                    <span>{selectedTransectData.properties.id}</span>
                    <span>{selectedTransectData.properties.sector}</span>
                    <span style={{ color: selectedTransectData.properties.trend === "erosion" ? "#ff6b5c" : "#17c3a2" }}>
                      {selectedTransectData.properties.rate_m_per_yr} m/yr — {selectedTransectData.properties.trend}
                    </span>
                  </div>
                ) : (
                  <p className="hint-text">Click a transect on the map or a bar in the chart to see sector detail.</p>
                )}
              </div>
            </div>
          )}

          {activePanel.isModelPanel && (
            <div className="ml-grid">
              {activePanel.parameters.map((m) => (
                <div className="panel ml-card" key={m.id}>
                  <div className="ml-card-head">
                    <div className="ml-card-name">{m.name}</div>
                    <div className="ml-card-acc mono">{Math.round(m.accuracy * 100)}%</div>
                  </div>
                  <div className="ml-bar-track">
                    <div className="ml-bar-fill" style={{ width: `${m.accuracy * 100}%` }} />
                  </div>
                  <p className="ml-purpose">{m.purpose}</p>
                </div>
              ))}
              <p className="hint-text ml-note">
                Accuracy figures are illustrative placeholders — replace with real validation
                metrics once models are trained on labeled Chilika ground-truth data.
              </p>
            </div>
          )}

          {!activePanel.isMapDriven && !activePanel.isModelPanel && (
            <div className="dash-panel-grid">
              <MapView boundary={boundary} showTransects={false} />
              <div className="panel dash-chart-panel">
                <ParameterChart
                  years={timeseries.years}
                  values={timeseries.series[activeParam.seriesKey]}
                  unit={timeseries.units[activeParam.seriesKey]}
                  color={ACCENT_HEX[activePanel.accent]}
                />
              </div>
>>>>>>> 0475554f6f7af24fca3f1c510d8c6ecea70b5405
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
<<<<<<< HEAD

function InfoRow({ label, value }) {
  return (
    <div className="info-row">
      <span className="info-row-label">{label}</span>
      <span className="info-row-value">{value}</span>
    </div>
  );
}
=======
>>>>>>> 0475554f6f7af24fca3f1c510d8c6ecea70b5405
