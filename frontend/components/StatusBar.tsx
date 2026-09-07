'use client';

import React from 'react';
import { Player } from '../logic/minimax';

interface StatusBarProps {
  statusText: string;
  gameWinner: Player | 'draw' | null;
  humanSymbol: Player;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  statusText,
  gameWinner,
  humanSymbol,
}) => {
  let bgClass = 'bg-[#FFFDF5] text-[#1A1209]';
  if (gameWinner) {
    if (gameWinner === 'draw') {
      bgClass = 'bg-[#E8E2D5] text-[#1A1209]';
    } else if (gameWinner === humanSymbol) {
      bgClass = 'bg-[#F0C030] text-[#1A1209]';
    } else {
      bgClass = 'bg-[#D42B2B] text-[#FFFDF5]';
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className={`status-bar ${bgClass} transition-colors duration-200`}>
        {statusText}
      </div>
    </div>
  );
};
