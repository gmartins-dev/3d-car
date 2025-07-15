
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useMemo } from 'react'

type Props = {
  route: Array<[number, number]>;
  position: [number, number];
  direction?: number;
};

function getCarIcon(rotation: number) {
  return new L.DivIcon({
    className: 'car-marker',
    html: `<img src='/cars.png' style='width:32px;height:32px;transform:rotate(${rotation}deg);transition:transform 0.2s;' />`,
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

