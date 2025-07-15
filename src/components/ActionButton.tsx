
import React from 'react';
import { PlayIcon, RotateCcwIcon, CarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';


interface ActionButtonProps {
  isAtEnd: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ isAtEnd, isPlaying, onClick }) => {
  const { t } = useTranslation();
  let actionLabel = '';
  let ActionIcon = PlayIcon;
  if (isAtEnd) {
    actionLabel = t('restart');
    ActionIcon = RotateCcwIcon;
  } else if (isPlaying) {
    actionLabel = t('on_the_way');
    ActionIcon = CarIcon;
  } else {
    actionLabel = t('start');
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
