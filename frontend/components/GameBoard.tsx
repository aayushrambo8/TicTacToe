'use client';

import React from 'react';
import { Board, Player } from '../logic/minimax';

interface GameBoardProps {
  board: Board;
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  disabled: boolean;
}

export const XMark: React.FC = () => (
  <svg
    viewBox="0 0 60 60"
    className="w-3/4 h-3/4 animate-in zoom-in-50 duration-150"
    fill="none"
    stroke="#D42B2B"
    strokeWidth="8"
    strokeLinecap="square"
  >
    <line x1="12" y1="12" x2="48" y2="48" />
    <line x1="48" y1="12" x2="12" y2="48" />
  </svg>
);

export const OMark: React.FC = () => (
  <svg
    viewBox="0 0 60 60"
    className="w-3/4 h-3/4 animate-in zoom-in-50 duration-150"
    fill="none"
    stroke="#1B3FBF"
    strokeWidth="8"
    strokeLinecap="square"
  >
    <circle cx="30" cy="30" r="18" />
  </svg>
);

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  winningLine,
  disabled,
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 brutalist-card mb-6">
      <div className="grid grid-cols-3 gap-3 bg-[#1A1209] p-3 border-2 border-[#1A1209]">
        {board.map((cellValue: Player | null, index: number) => {
          const isTaken = cellValue !== null;
          const isWinning = winningLine !== null && winningLine.includes(index);

          return (
            <button
              key={index}
              onClick={() => onCellClick(index)}
              disabled={disabled || isTaken}
              aria-label={`Grid cell ${index + 1}`}
              className={`cell ${isTaken ? 'taken' : ''} ${isWinning ? 'winning' : ''}`}
            >
              <span className="absolute top-1 left-1.5 font-mono text-[9px] text-[#1A1209]/40 font-bold">
                {index + 1}
              </span>

              {cellValue === 'X' && <XMark />}
              {cellValue === 'O' && <OMark />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
