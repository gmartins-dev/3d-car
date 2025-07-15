
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Route } from '../helpers/gpsData';


interface DetailsCardProps {
  selectedRoute: Route;
  carIndex: number;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({ selectedRoute, carIndex }) => {
  const { t } = useTranslation();
  return (
    <section className="details-card">
      <h2 className="font-bold text-lg mb-2">{t('details')}</h2>
      <div><strong>{t('from')}</strong> {selectedRoute.startName}</div>
      <div><strong>{t('to')}</strong> {selectedRoute.endName}</div>
      <div><strong>{t('duration')}</strong> {selectedRoute.duration}s</div>
      <div><strong>{t('distance')}</strong> {(selectedRoute.distance / 1000).toFixed(2)} km</div>
      <div><strong>{t('stops')}</strong> {selectedRoute.stops}</div>
      <div><strong>{t('current_speed')}</strong> {selectedRoute.speeds[carIndex]?.toFixed(1)} km/h</div>
      <div><strong>{t('direction')}</strong> {selectedRoute.directions[carIndex]?.toFixed(1)}°</div>
      <div><strong>{t('progress')}</strong> {carIndex + 1} / {selectedRoute.points.length}</div>
    </section>
  );
};
