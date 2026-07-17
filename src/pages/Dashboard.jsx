import { useMemo, useState } from "react";
import { dashboardConfig } from "../data/dashboardConfig";
import { useDashboardData } from "../data/useDashboardData";
import MapView from "../components/MapView";
import ParameterChart from "../components/ParameterChart";
import ShorelineBarChart from "../components/ShorelineBarChart";

const ACCENT_HEX = { cyan: "#35d6e8", teal: "#17c3a2", amber: "#f0a93d", coral: "#ff6b5c" };

export default function Dashboard() {
  const { boundary, transects, timeseries, loading, error } = useDashboardData();
  const [activePanelId, setActivePanelId] = useState(dashboardConfig[0].id);
  const [activeParamId, setActiveParamId] = useState(dashboardConfig[0].parameters[0].id);
  const [selectedTransect, setSelectedTransect] = useState(null);

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

  return (
    <section className="dash">
      <div className="container dash-head">
        <div className="dash-head-row">
          <div>
            <div className="eyebrow">Data &amp; Analytics Dashboard — Chilika</div>
            <h1 className="page-title" style={{ fontSize: "1.9rem" }}>Index &amp; classification panels</h1>
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
