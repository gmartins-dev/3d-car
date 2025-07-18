import './App.css';
import { useState } from 'react';
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
import { ThemeProvider } from './components/ThemeProvider';
import { ModeToggle } from './components/ModeToggle';
import { useCarAnimation } from './hooks/useCarAnimation';

const routes = getRoutes();

function App() {
  const { t } = useTranslation();
  const [selectedRoute, setSelectedRoute] = useState<Route>(routes[0]);

  const { carIndex, isPlaying, isAtEnd, handleAction } = useCarAnimation(selectedRoute);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center bg-muted px-2 py-8">
        <Card className="w-full max-w-xl shadow-lg rounded-xl p-6 relative text-slate-900 dark:text-slate-50">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold tracking-tight text-left flex-1 text-slate-900 dark:text-slate-50">{t('title')}</h1>
            <div className="flex items-center gap-2 ml-4">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
          </div>

          <RouteSelect
            routes={routes}
            selectedRoute={selectedRoute}
            onChange={setSelectedRoute}
          />

          <div className="rounded-lg overflow-hidden shadow mb-4">
            <Map
              route={selectedRoute.points}
              position={selectedRoute.points[carIndex]}
              direction={selectedRoute.directions[carIndex]}
            />
          </div>

          <div className="mt-[-36px] mb-[-16px]">
            <ProgressBar
              carIndex={carIndex}
              totalPoints={selectedRoute.points.length}
              duration={selectedRoute.duration}
            />
          </div>

          <div className="flex justify-center">
            <ActionButton
              isAtEnd={isAtEnd}
              isPlaying={isPlaying}
              onClick={handleAction}
            />
          </div>

          <CardContent className="p-0 mt-[-16px]">
            <DetailsCard
              selectedRoute={selectedRoute}
              carIndex={carIndex}
            />
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default App;
