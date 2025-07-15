import gpsData from '../api/frontend_data_gps.json'

export type GpsPoint = {
  latitude: number;
  longitude: number;
  speed?: number;
  direction?: number;
  address?: string;
};

export type Route = {
  name: string;
  points: Array<[number, number]>;
  speeds: number[];
  directions: number[];
  startName: string;
  endName: string;
  duration: number;
  distance: number;
  startTime: string;
  endTime: string;
  stops: number;
  startAddress?: string;
  endAddress?: string;
};

export function getRoutes(): Route[] {
  return gpsData.courses.map((course: any, idx: number) => {
    const gps = course.gps as GpsPoint[];
    const start = gps[0];
    const end = gps[gps.length - 1];
    return {
      name: `Rota ${idx + 1}`,
      points: gps.map((p) => [p.latitude, p.longitude]),
      speeds: gps.map((p) => p.speed ?? 0),
      directions: gps.map((p) => p.direction ?? 0),
      startName: start.address ?? `${start.latitude},${start.longitude}`,
      endName: end.address ?? `${end.latitude},${end.longitude}`,
      duration: course.duration,
      distance: course.distance,
      startTime: course.start_at,
      endTime: course.end_at,
      stops: course.stops,
      startAddress: start.address,
      endAddress: end.address,
    };
  });
}
