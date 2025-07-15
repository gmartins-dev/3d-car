import React from 'react';
import type { Route } from '../helpers/gpsData';

interface RouteSelectProps {
  routes: Route[];
  selectedRoute: Route;
  onChange: (route: Route) => void;
}

export const RouteSelect: React.FC<RouteSelectProps> = ({ routes, selectedRoute, onChange }) => (
  <div className="mb-2">
    <label htmlFor="route-select" className="font-semibold">Selecione a rota: </label>
    <select
      id="route-select"
      value={selectedRoute.name}
      onChange={e => {
        const route = routes.find((r: Route) => r.name === e.target.value);
        if (route) onChange(route);
      }}
      className="select-responsive p-2 border rounded mb-2"
    >
      {routes.map((route: Route, idx: number) => (
        <option key={route.name} value={route.name}>
          {`Rota ${idx + 1}`}
        </option>
      ))}
    </select>
    <div className="text-sm text-gray-600 mb-2">
      <strong>De:</strong> {selectedRoute.startName}<br />
      <strong>Para:</strong> {selectedRoute.endName}
    </div>
  </div>
);
