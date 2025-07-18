import { useState, useEffect, useCallback } from 'react';
import type { Route } from '../helpers/gpsData';

export const useCarAnimation = (selectedRoute: Route) => {
  const [carIndex, setCarIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const isAtEnd = carIndex >= selectedRoute.points.length - 1;

  useEffect(() => {
    setCarIndex(0);
    setIsPlaying(false);
  }, [selectedRoute]);

  useEffect(() => {
    if (!isPlaying || isAtEnd) {
      return;
    }

    const speed = selectedRoute.speeds[carIndex] || 10;
    const interval = Math.max(100, 4000 / (speed || 1));

    const timer = setTimeout(() => {
      setCarIndex((i) => i + 1);
    }, interval);

    return () => clearTimeout(timer);
  }, [isPlaying, carIndex, selectedRoute, isAtEnd]);

  const handleAction = useCallback(() => {
    if (isAtEnd) {
      setCarIndex(0);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }, [isAtEnd]);

  return { carIndex, isPlaying, isAtEnd, handleAction };
};
