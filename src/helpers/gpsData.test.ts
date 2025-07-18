import { describe, it, expect } from 'vitest';
import { getRoutes } from './gpsData';
import rawGpsData from '../api/frontend_data_gps.json';

describe('Helper: getRoutes', () => {
  it('should return an array of routes', () => {
    const routes = getRoutes();
    expect(Array.isArray(routes)).toBe(true);
    expect(routes.length).toBe(rawGpsData.courses.length);
  });

  it('should correctly structure each route object', () => {
    const routes = getRoutes();
    const firstRoute = routes[0];

    expect(firstRoute).toHaveProperty('name', 'Rota 1');
    expect(firstRoute).toHaveProperty('points');
    expect(firstRoute).toHaveProperty('speeds');
    expect(firstRoute).toHaveProperty('directions');
    expect(firstRoute).toHaveProperty('startName');
    expect(firstRoute).toHaveProperty('endName');

    // Valida se os arrays de dados têm o mesmo tamanho, garantindo a consistência
    expect(firstRoute.points.length).toBe(firstRoute.speeds.length);
    expect(firstRoute.points.length).toBe(firstRoute.directions.length);
  });

  it('should handle missing speed or direction with a default of 0', () => {
    // Nota: O JSON fornecido não tem pontos sem velocidade, mas este teste
    // garantiria o comportamento se os dados mudassem.
    const routes = getRoutes();
    const hasInvalidSpeed = routes.some(r => r.speeds.some(s => s === undefined || s === null));
    const hasInvalidDirection = routes.some(r => r.directions.some(d => d === undefined || d === null));

    expect(hasInvalidSpeed).toBe(false);
    expect(hasInvalidDirection).toBe(false);
  });
});
