import React from 'react';
import { PlayIcon, RotateCcwIcon, CarIcon } from 'lucide-react';
import { Button } from './ui/button';

interface ActionButtonProps {
  isAtEnd: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ isAtEnd, isPlaying, onClick }) => {
  let actionLabel = '';
  let ActionIcon = PlayIcon;
  if (isAtEnd) {
    actionLabel = 'Reiniciar';
    ActionIcon = RotateCcwIcon;
  } else if (isPlaying) {
    actionLabel = 'A Caminho';
    ActionIcon = CarIcon;
  } else {
    actionLabel = 'Começar';
    ActionIcon = PlayIcon;
  }

  return (
    <Button
      size="lg"
      className={`w-full max-w-xs flex items-center justify-center gap-2 ${isAtEnd ? 'bg-red-600 hover:bg-red-700 text-white' : isPlaying ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
      onClick={onClick}
      variant="default"
      aria-label={actionLabel}
    >
      <ActionIcon size={22} />
      {actionLabel}
    </Button>
  );
};
