'use client';

import React from 'react';
import { Player } from '../logic/minimax';

interface ScoreBoardProps {
  humanSymbol: Player;
  scores: {
    human: number;
    ai: number;
    draws: number;
    streak: number;
  };
  isVsAI: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  humanSymbol,
  scores,
  isVsAI,
}) => {
  const playerLabel = isVsAI ? `YOU (${humanSymbol})` : `PLAYER 1 (${humanSymbol})`;
  const opponentLabel = isVsAI
    ? `AI (${humanSymbol === 'X' ? 'O' : 'X'})`
    : `PLAYER 2 (${humanSymbol === 'X' ? 'O' : 'X'})`;

  return (
    <div className="w-full max-w-md mx-auto grid grid-cols-3 gap-2 mb-6">
      <div className="brutalist-card p-2 text-center bg-[#FFFDF5]">
        <div className="font-mono text-[10px] font-bold uppercase text-[#D42B2B]">
          {playerLabel}
        </div>
        <div className="font-display font-black text-3xl text-[#1A1209]">
          {scores.human}
        </div>
      </div>

      <div className="brutalist-card p-2 text-center bg-[#FFFDF5]">
        <div className="font-mono text-[10px] font-bold uppercase text-[#1A1209]/60">
          DRAWS
        </div>
        <div className="font-display font-black text-3xl text-[#1A1209]">
          {scores.draws}
        </div>
      </div>

      <div className="brutalist-card p-2 text-center bg-[#FFFDF5]">
        <div className="font-mono text-[10px] font-bold uppercase text-[#1B3FBF]">
          {opponentLabel}
        </div>
        <div className="font-display font-black text-3xl text-[#1A1209]">
          {scores.ai}
        </div>
      </div>
    </div>
  );
};
