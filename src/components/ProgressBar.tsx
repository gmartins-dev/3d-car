
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SmileIcon } from 'lucide-react';

interface ProgressBarProps {
  carIndex: number;
  totalPoints: number;
  duration: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ carIndex, totalPoints, duration }) => {
  const { t } = useTranslation();
  const isFinished = carIndex >= totalPoints - 1;
  const elapsed = Math.round((carIndex / totalPoints) * duration);
  const remaining = Math.max(0, duration - elapsed);
  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;
  const percent = ((carIndex + 1) / totalPoints) * 100;

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="progress-bar" style={{ flex: 1 }}>
        <div
          className="progress-bar-inner"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span style={{ fontSize: 14, color: '#0ea5e9', fontWeight: 600 }}>
        {isFinished ? (
          <span className="flex items-center gap-2"><strong>{t('arrived')}</strong> <SmileIcon size={18} color="#0ea5e9" /></span>
        ) : (
          <span>{t('remaining_time')}: {`${min}:${sec.toString().padStart(2, '0')}`}</span>
        )}
      </span>
    </div>
  );
};
