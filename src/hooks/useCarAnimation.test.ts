import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCarAnimation } from './useCarAnimation';
import { getRoutes } from '../helpers/gpsData';

const mockRoute = getRoutes()[0];

describe('Hook: useCarAnimation', () => {
  beforeEach(() => {
    // Enable fake timers to control setTimeout and other timer-based functions.
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Restore real timers after each test to prevent side effects.
    vi.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCarAnimation(mockRoute));

    expect(result.current.carIndex).toBe(0);
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.isAtEnd).toBe(false);
  });

  it('should start playing when handleAction is called', () => {
    const { result } = renderHook(() => useCarAnimation(mockRoute));

    act(() => {
      result.current.handleAction();
    });

    expect(result.current.isPlaying).toBe(true);
  });

  it('should advance carIndex after a timeout when playing', () => {
    const { result } = renderHook(() => useCarAnimation(mockRoute));

    act(() => {
      result.current.handleAction();
    });

    expect(result.current.carIndex).toBe(0);

    // Advance time to trigger the next setTimeout
    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(result.current.carIndex).toBe(1);
  });

  it('should reset animation when handleAction is called at the end', () => {
    // Use a short, predictable route to simplify the test.
    const shortRoute = { ...mockRoute, points: [[1, 1], [2, 2], [3, 3]], speeds: [10, 10, 10], directions: [0, 0, 0] };
    const { result } = renderHook(() => useCarAnimation(shortRoute));

    // Start the animation
    act(() => {
      result.current.handleAction();
    });

    // Advance timers step-by-step to the end of the route
    act(() => {
      vi.runOnlyPendingTimers(); // Moves to index 1
    });
    act(() => {
      vi.runOnlyPendingTimers(); // Moves to index 2 (the end)
    });

    // Verify that the animation has reached the end
    expect(result.current.isAtEnd).toBe(true);

    // Call the reset action
    act(() => {
      result.current.handleAction();
    });

    // Verify that the state has been reset
    expect(result.current.carIndex).toBe(0);
    expect(result.current.isPlaying).toBe(false);
  });
});
