import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "./EarthMap.css";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface EarthMapProps {
  lat: number;
  lon: number;
  onLocationChange: (lat: number, lon: number) => void;
}

export const EarthMap: React.FC<EarthMapProps> = ({
  lat,
  lon,
  onLocationChange,
}) => {
  const position: LatLngExpression = [lat, lon];

  function LocationMarker() {
    useMapEvents({
      click(e) {
        onLocationChange(e.latlng.lat, e.latlng.lng);
      },
    });
    return <Marker position={position} icon={defaultIcon}></Marker>;
  }

  return (
    <div className="earth-map-container">
      <MapContainer
        center={position}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};
