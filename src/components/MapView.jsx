<<<<<<< HEAD
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip, ScaleControl, useMapEvents } from "react-leaflet";
=======
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip } from "react-leaflet";
>>>>>>> 0475554f6f7af24fca3f1c510d8c6ecea70b5405
import "leaflet/dist/leaflet.css";

const TREND_COLOR = {
  erosion: "#ff6b5c",
  accretion: "#17c3a2",
};

const boundaryStyle = {
  color: "#35d6e8",
  weight: 1.6,
  fillColor: "#35d6e8",
  fillOpacity: 0.08,
};

<<<<<<< HEAD
function CoordsTracker({ onMove }) {
  useMapEvents({
    mousemove(e) {
      onMove?.(e.latlng);
    },
  });
  return null;
}

export default function MapView({ boundary, transects, showTransects, selectedId, onSelectTransect, onCoordsChange }) {
=======
export default function MapView({ boundary, transects, showTransects, selectedId, onSelectTransect }) {
>>>>>>> 0475554f6f7af24fca3f1c510d8c6ecea70b5405
  const center = [19.7, 85.32];

  return (
    <div className="map-shell">
      <MapContainer center={center} zoom={10} scrollWheelZoom={false} className="map-container" attributionControl={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />
<<<<<<< HEAD
        <ScaleControl position="bottomright" imperial={false} />
        {onCoordsChange && <CoordsTracker onMove={onCoordsChange} />}
=======
>>>>>>> 0475554f6f7af24fca3f1c510d8c6ecea70b5405
        {boundary && <GeoJSON data={boundary} style={boundaryStyle} />}
        {showTransects && transects && transects.features.map((f) => {
          const [lon, lat] = f.geometry.coordinates;
          const isSelected = selectedId === f.properties.id;
          return (
            <CircleMarker
              key={f.properties.id}
              center={[lat, lon]}
              radius={isSelected ? 9 : 6}
              pathOptions={{
                color: TREND_COLOR[f.properties.trend],
                fillColor: TREND_COLOR[f.properties.trend],
                fillOpacity: isSelected ? 0.9 : 0.6,
                weight: isSelected ? 2.5 : 1,
              }}
              eventHandlers={{ click: () => onSelectTransect?.(f.properties.id) }}
            >
              <Tooltip direction="top" offset={[0, -6]}>
                <span className="mono" style={{ fontSize: "0.72rem" }}>
                  {f.properties.id} · {f.properties.rate_m_per_yr} m/yr
                </span>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
      <div className="map-legend mono">
        {showTransects ? (
          <>
            <span><i style={{ background: TREND_COLOR.erosion }} /> Erosion</span>
            <span><i style={{ background: TREND_COLOR.accretion }} /> Accretion</span>
          </>
        ) : (
          <span><i style={{ background: "#35d6e8" }} /> Lagoon boundary (schematic)</span>
        )}
      </div>
    </div>
  );
}
