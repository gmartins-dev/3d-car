import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ProgressBar } from './ProgressBar';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

const renderComponent = (props: React.ComponentProps<typeof ProgressBar>) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <ProgressBar {...props} />
    </I18nextProvider>
  );
};

describe('Component: ProgressBar', () => {
  // Set the language to English before each test to ensure consistent assertions.
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  it('should calculate and display remaining time correctly', () => {
    renderComponent({ carIndex: 0, totalPoints: 100, duration: 120 });
    // Duration: 120s. Progress: 0/100. Expected remaining time: ~120s = 2 min 00 sec
    expect(screen.getByText(/Remaining Time: 2 min 00 sec/i)).toBeInTheDocument();
  });

  it('should display "Arrived!" when at the end of the route', () => {
    renderComponent({ carIndex: 99, totalPoints: 100, duration: 120 });
    expect(screen.getByText(/Arrived!/i)).toBeInTheDocument();
  });

  it('should show "Arrived!" if carIndex exceeds totalPoints', () => {
    renderComponent({ carIndex: 100, totalPoints: 100, duration: 120 });
    expect(screen.getByText(/Arrived!/i)).toBeInTheDocument();
  });
});
