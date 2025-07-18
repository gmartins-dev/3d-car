import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ActionButton } from './ActionButton';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

// Helper function to render the component wrapped in the i18n provider.
const renderComponent = (props: React.ComponentProps<typeof ActionButton>) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <ActionButton {...props} />
    </I18nextProvider>
  );
};

describe('Component: ActionButton', () => {
  // Set the language to English before each test to ensure consistent assertions.
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  it('should display "Start" when not playing and not at the end', () => {
    renderComponent({ isPlaying: false, isAtEnd: false, onClick: () => { } });
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  it('should display "On the way" when playing', () => {
    renderComponent({ isPlaying: true, isAtEnd: false, onClick: () => { } });
    expect(screen.getByRole('button', { name: /on the way/i })).toBeInTheDocument();
  });

  it('should display "Restart" when at the end', () => {
    renderComponent({ isPlaying: false, isAtEnd: true, onClick: () => { } });
    expect(screen.getByRole('button', { name: /restart/i })).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    renderComponent({ isPlaying: false, isAtEnd: false, onClick: handleClick });

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
