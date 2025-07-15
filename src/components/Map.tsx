
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useMemo } from 'react';

type Props = {
  route: Array<[number, number]>;
  position: [number, number];
  direction?: number;
};

function getCarIcon(direction: number) {
  const adjusted = direction - 90;
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(${adjusted}deg);transition:transform 0.2s;display:block;margin:auto;" class="lucide lucide-car-icon lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`;
  return new L.DivIcon({
    className: 'car-marker',
    html: svgString,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

export function Map({ route, position, direction = 0 }: Props) {
  const carIcon = useMemo(() => getCarIcon(direction), [direction]);
  const FitBounds = () => {
    const map = useMap();
    if (route && route.length > 1) {
      const bounds = route.map((point: [number, number]) => [point[0], point[1]]);
      map.fitBounds(bounds as any);
    }
    return null;
  };
  return (
    <MapContainer center={route[0]} zoom={15} className="map-container" style={{ height: '50vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={route} pathOptions={{ color: 'blue', weight: 4 }} />
      <Marker position={position} icon={carIcon} />
      <FitBounds />
    </MapContainer>
  );
}
