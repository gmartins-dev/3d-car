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
    <section className="pt-5">
      <h2 className="font-bold text-lg mb-2">{t('details')}</h2>
      <div className="space-y-1 text-sm">
        <div>
          <strong className="font-semibold text-slate-700 dark:text-slate-300">{t('from')} </strong>
          {selectedRoute.startName}
        </div>
        <div>
          <strong className="font-semibold text-slate-700 dark:text-slate-300">{t('to')} </strong>
          {selectedRoute.endName}
        </div>
        <div>
          <strong className="font-semibold text-slate-700 dark:text-slate-300">{t('duration')}: </strong>
          {selectedRoute.duration}s
        </div>
        <div>
          <strong className="font-semibold text-slate-700 dark:text-slate-300">{t('distance')}: </strong>
          {(selectedRoute.distance / 1000).toFixed(2)} km
        </div>
        <div>
          <strong className="font-semibold text-slate-700 dark:text-slate-300">{t('stops')}: </strong>
          {selectedRoute.stops}
        </div>
        <div>
          <strong className="font-semibold text-slate-700 dark:text-slate-300">{t('current_speed')}: </strong>
          {selectedRoute.speeds[carIndex]?.toFixed(1) ?? '0.0'} km/h
        </div>
        <div>
          <strong className="font-semibold text-slate-700 dark:text-slate-300">{t('direction')}: </strong>
          {selectedRoute.directions[carIndex]?.toFixed(1) ?? '0.0'}°
        </div>
        <div>
          <strong className="font-semibold text-slate-700 dark:text-slate-300">{t('progress')}: </strong>
          {carIndex + 1} / {selectedRoute.points.length}
        </div>
      </div>
    </section>
  );
};
