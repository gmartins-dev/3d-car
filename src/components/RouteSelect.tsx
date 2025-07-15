
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Route } from '../helpers/gpsData';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectGroup
} from './ui/select';
import { MapPinIcon } from 'lucide-react';

interface RouteSelectProps {
  routes: Route[];
  selectedRoute: Route;
  onChange: (route: Route) => void;
}

export const RouteSelect: React.FC<RouteSelectProps> = ({ routes, selectedRoute, onChange }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-2 w-full">
      <Select
        value={selectedRoute.name}
        onValueChange={val => {
          const route = routes.find((r: Route) => r.name === val);
          if (route) onChange(route);
        }}
      >
        <SelectTrigger className="w-full flex items-center gap-2">
          <MapPinIcon className="size-4 text-muted-foreground mr-1" />
          <SelectValue placeholder={t('select_route')} />
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup>
            <SelectLabel>{t('select_route')}</SelectLabel>
            {routes.map((route: Route, idx: number) => (
              <SelectItem key={route.name} value={route.name}>
                {`${t('route')} ${idx + 1}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="text-sm text-gray-600 mb-2 mt-2">
        <strong>{t('from')}</strong> {selectedRoute.startName}<br />
        <strong>{t('to')}</strong> {selectedRoute.endName}
      </div>
    </div>
  );
};
