import './App.css'
// import { Button } from './components/ui/button'
import { useState, useEffect } from 'react'
import { Map } from './components/Map'
import { getRoutes } from './helpers/gpsData'
import type { Route } from './helpers/gpsData'

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

  const handleStart = () => setIsPlaying(true)
  const handleStop = () => setIsPlaying(false)
  const handleEnd = () => {
    setIsPlaying(false)
    setCarIndex(selectedRoute.points.length - 1)
  }



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
      <div className="controls">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleStart}>Começar</button>
        <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={handleStop}>Parar</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleEnd}>Final</button>
      </div>
      <div className="info-panel">
        <strong>De:</strong> {selectedRoute.startName}<br />
        <strong>Para:</strong> {selectedRoute.endName}<br />
        <strong>Duração:</strong> {selectedRoute.duration}s<br />
        <strong>Distância:</strong> {(selectedRoute.distance / 1000).toFixed(2)} km<br />
        <strong>Paradas:</strong> {selectedRoute.stops}<br />
        <strong>Velocidade atual:</strong> {selectedRoute.speeds[carIndex]?.toFixed(1)} km/h<br />
        <strong>Direção:</strong> {selectedRoute.directions[carIndex]?.toFixed(1)}°<br />
        <strong>Progresso:</strong> {carIndex + 1} / {selectedRoute.points.length}
      </div>
    </div>
  )
}

export default App
