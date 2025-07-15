


import './App.css';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Map } from './components/Map';
import { getRoutes } from './helpers/gpsData';
import type { Route } from './helpers/gpsData';
import { ProgressBar } from './components/ProgressBar';
import { ActionButton } from './components/ActionButton';
import { DetailsCard } from './components/DetailsCard';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Card, CardContent } from "@/components/ui/card";

import { RouteSelect } from './components/RouteSelect';


const routes = getRoutes();

function App() {
  const { t } = useTranslation();
  const [selectedRoute, setSelectedRoute] = useState<Route>(routes[0]);
  const [carIndex, setCarIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Animation interval based on speed
  useEffect(() => {
    if (!isPlaying) return;
    if (carIndex >= selectedRoute.points.length - 1) return;

    const speed = selectedRoute.speeds[carIndex] || 10;
    const interval = Math.max(100, 4000 / (speed || 1));

    const timer = setTimeout(() => {
      setCarIndex((i) => i + 1);
    }, interval);

    return () => clearTimeout(timer);
  }, [isPlaying, carIndex, selectedRoute]);

  const isAtEnd = carIndex >= selectedRoute.points.length - 1;
  const handleAction = () => {
    if (isAtEnd) {
      setCarIndex(0);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-2 py-8">
      <Card className="w-full max-w-xl shadow-lg rounded-xl p-6 relative">

<div className="flex items-center justify-between mb-4">
  <h1 className="text-3xl font-bold tracking-tight text-left flex-1">{t('title')}</h1>
  <div className="ml-4">
    <LanguageSwitcher />
  </div>
</div>
        <div className="mb-4">
          <RouteSelect
            routes={routes}
            selectedRoute={selectedRoute}
            onChange={(route: Route) => {
              setSelectedRoute(route);
              setCarIndex(0);
              setIsPlaying(false);
            }}
          />
        </div>
        <div className="rounded-lg overflow-hidden shadow mb-4">
          <Map
            route={selectedRoute.points}
            position={selectedRoute.points[carIndex]}
            direction={selectedRoute.directions[carIndex]}
          />
        </div>
        <div className="mb-4">
          <ProgressBar carIndex={carIndex} totalPoints={selectedRoute.points.length} duration={selectedRoute.duration} />
        </div>
        <div className="flex justify-center my-4">
          <ActionButton isAtEnd={isAtEnd} isPlaying={isPlaying} onClick={handleAction} />
        </div>
        <CardContent className="p-0 mt-4">
          <DetailsCard selectedRoute={selectedRoute} carIndex={carIndex} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
