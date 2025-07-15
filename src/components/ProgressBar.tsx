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
  let friendlyTime = '';
  if (min > 0) {
    friendlyTime = `${min} ${t('min')} ${sec.toString().padStart(2, '0')} ${t('sec')}`;
  } else {
    friendlyTime = `${sec} ${t('sec')}`;
  }
  const percent = ((carIndex + 1) / totalPoints) * 100;

  return (
    <div className="flex items-center gap-2">
      <div className="progress-bar flex-1">
        <div
          className="progress-bar-inner"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-[14px] text-sky-500 font-semibold pb-3">
        {isFinished ? (
          <span className="flex items-center gap-2">
            <strong>{t('arrived')}</strong>
            <SmileIcon size={18} color="#0ea5e9" />
          </span>
        ) : (
          <span>
            {t('remaining_time')}: {friendlyTime}
          </span>
        )}
      </span>
    </div>
  );
};
