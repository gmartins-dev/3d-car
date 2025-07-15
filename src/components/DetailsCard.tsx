import React from 'react';
import type { Route } from '../helpers/gpsData';

interface DetailsCardProps {
  selectedRoute: Route;
  carIndex: number;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({ selectedRoute, carIndex }) => (
  <section className="details-card">
    <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Detalhes da Rota: </h2>
    <div><strong>De:</strong> {selectedRoute.startName}</div>
    <div><strong>Para:</strong> {selectedRoute.endName}</div>
    <div><strong>Duração:</strong> {selectedRoute.duration}s</div>
    <div><strong>Distância:</strong> {(selectedRoute.distance / 1000).toFixed(2)} km</div>
    <div><strong>Paradas:</strong> {selectedRoute.stops}</div>
    <div><strong>Velocidade atual:</strong> {selectedRoute.speeds[carIndex]?.toFixed(1)} km/h</div>
    <div><strong>Direção:</strong> {selectedRoute.directions[carIndex]?.toFixed(1)}°</div>
    <div><strong>Progresso:</strong> {carIndex + 1} / {selectedRoute.points.length}</div>
  </section>
);
