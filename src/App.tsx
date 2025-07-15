
import './App.css'
import { useState, useEffect } from 'react'
import { Map } from './components/Map'
import { getRoutes } from './helpers/gpsData'
import type { Route } from './helpers/gpsData'
import { Button } from './components/ui/button'

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


  // Dynamic action button logic
  const isAtEnd = carIndex >= selectedRoute.points.length - 1;
  const isAtStart = carIndex === 0;
  const handleAction = () => {
    if (isAtEnd) {
      setCarIndex(0);
      setIsPlaying(false);
    } else if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };
  let actionLabel = '';
  if (isAtEnd) actionLabel = 'Reiniciar';
  else if (isPlaying) actionLabel = 'Parar';
  else if (isAtStart) actionLabel = 'Começar';
  else actionLabel = 'Continuar';



  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Car Tracker</h1>
      <div className="mb-2">
        <label htmlFor="route-select" className="font-semibold">Selecione a rota:</label>
        <select
          id="route-select"
          value={selectedRoute.name}
          onChange={e => {
            const route = routes.find((r: Route) => r.name === e.target.value)
            if (route) {
              setSelectedRoute(route)
              setCarIndex(0)
              setIsPlaying(false)
            }
          }}
          className="w-full p-2 border rounded mb-2"
        >
          {routes.map((route: Route) => (
            <option key={route.name} value={route.name}>
              {route.name} ({route.startName} → {route.endName})
            </option>
          ))}
        </select>
        <div className="text-sm text-gray-600 mb-2">
          <strong>De:</strong> {selectedRoute.startName}<br />
          <strong>Para:</strong> {selectedRoute.endName}
        </div>
      </div>
      <Map
        route={selectedRoute.points}
        position={selectedRoute.points[carIndex]}
        direction={selectedRoute.directions[carIndex]}
      />
      <div className="flex justify-center my-4">
        <Button size="lg" className="w-full max-w-xs" onClick={handleAction} variant={isPlaying ? 'destructive' : 'default'}>
          {actionLabel}
        </Button>
      </div>
      <section className="details-card">
        <div><strong>De:</strong> {selectedRoute.startName}</div>
        <div><strong>Para:</strong> {selectedRoute.endName}</div>
        <div><strong>Duração:</strong> {selectedRoute.duration}s</div>
        <div><strong>Distância:</strong> {(selectedRoute.distance / 1000).toFixed(2)} km</div>
        <div><strong>Paradas:</strong> {selectedRoute.stops}</div>
        <div><strong>Velocidade atual:</strong> {selectedRoute.speeds[carIndex]?.toFixed(1)} km/h</div>
        <div><strong>Direção:</strong> {selectedRoute.directions[carIndex]?.toFixed(1)}°</div>
        <div><strong>Progresso:</strong> {carIndex + 1} / {selectedRoute.points.length}</div>
      </section>
    </div>
  )
}

export default App
