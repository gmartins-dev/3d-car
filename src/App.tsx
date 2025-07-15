
import './App.css'
import { useState, useEffect } from 'react'
import { Map } from './components/Map'
import { getRoutes } from './helpers/gpsData'
import type { Route } from './helpers/gpsData'
import { ProgressBar } from './components/ProgressBar'
import { ActionButton } from './components/ActionButton'
import { DetailsCard } from './components/DetailsCard'
import { RouteSelect } from './components/RouteSelect'

const routes = getRoutes()

function App() {
  const [selectedRoute, setSelectedRoute] = useState<Route>(routes[0])
  const [carIndex, setCarIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Animation interval based on speed
  useEffect(() => {
    if (!isPlaying) return
    if (carIndex >= selectedRoute.points.length - 1) return

    const speed = selectedRoute.speeds[carIndex] || 10
    // Interval: quanto maior a velocidade, menor o tempo
    const interval = Math.max(100, 4000 / (speed || 1))

    const timer = setTimeout(() => {
      setCarIndex((i) => i + 1)
    }, interval)

    return () => clearTimeout(timer)
  }, [isPlaying, carIndex, selectedRoute])


  const isAtEnd = carIndex >= selectedRoute.points.length - 1;
  const handleAction = () => {
    if (isAtEnd) {
      setCarIndex(0);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };
  // Removido: lógica de actionLabel e ActionIcon, agora no ActionButton



  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Car Tracker</h1>
      <RouteSelect
        routes={routes}
        selectedRoute={selectedRoute}
        onChange={route => {
          setSelectedRoute(route);
          setCarIndex(0);
          setIsPlaying(false);
        }}
      />
      <Map
        route={selectedRoute.points}
        position={selectedRoute.points[carIndex]}
        direction={selectedRoute.directions[carIndex]}
      />
      <ProgressBar carIndex={carIndex} totalPoints={selectedRoute.points.length} duration={selectedRoute.duration} />
      <div className="flex justify-center my-4">
        <ActionButton isAtEnd={isAtEnd} isPlaying={isPlaying} onClick={handleAction} />
      </div>
      <DetailsCard selectedRoute={selectedRoute} carIndex={carIndex} />
    </div>
  )
}

export default App
