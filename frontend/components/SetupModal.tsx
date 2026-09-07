'use client';

import React from 'react';
import { Player, Difficulty } from '../logic/minimax';
import { X, Dices, User, Bot, Layers } from 'lucide-react';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  humanSymbol: Player;
  onSelectSymbol: (symbol: Player) => void;
  isVsAI: boolean;
  onToggleVsAI: (vsAI: boolean) => void;
  firstMover: 'coinflip' | 'human' | 'ai';
  onSelectFirstMover: (order: 'coinflip' | 'human' | 'ai') => void;
  difficulty: Difficulty;
  onSelectDifficulty: (diff: Difficulty) => void;
  onStartGame: () => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({
  isOpen,
  onClose,
  humanSymbol,
  onSelectSymbol,
  isVsAI,
  onToggleVsAI,
  firstMover,
  onSelectFirstMover,
  difficulty,
  onSelectDifficulty,
  onStartGame,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1209]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md brutalist-card bg-[#FFFDF5] p-6 relative animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 border-2 border-[#1A1209] bg-[#FFFDF5] hover:bg-[#E8E2D5] active:translate-x-[1px] active:translate-y-[1px]"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-display font-black text-3xl text-[#1A1209] uppercase tracking-wide mb-4 border-b-3 border-[#1A1209] pb-2">
          GAME SETTINGS
        </h2>

        <div className="space-y-5">
          {/* Game Mode */}
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1A1209] mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#D42B2B]" /> Game Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onToggleVsAI(true)}
                className={`py-2 px-3 border-2 border-[#1A1209] font-mono text-sm font-bold uppercase ${
                  isVsAI
                    ? 'bg-[#D42B2B] text-[#FFFDF5] shadow-[2px_2px_0_#1A1209]'
                    : 'bg-[#FFFDF5] text-[#1A1209] hover:bg-[#E8E2D5]'
                }`}
              >
                VS Minimax AI
              </button>
              <button
                type="button"
                onClick={() => onToggleVsAI(false)}
                className={`py-2 px-3 border-2 border-[#1A1209] font-mono text-sm font-bold uppercase ${
                  !isVsAI
                    ? 'bg-[#1B3FBF] text-[#FFFDF5] shadow-[2px_2px_0_#1A1209]'
                    : 'bg-[#FFFDF5] text-[#1A1209] hover:bg-[#E8E2D5]'
                }`}
              >
                2 Player Local
              </button>
            </div>
          </div>

          {/* Symbol Selection */}
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1A1209] mb-2 flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#1B3FBF]" /> Your Symbol
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onSelectSymbol('X')}
                className={`py-2.5 border-2 border-[#1A1209] font-display font-black text-2xl uppercase ${
                  humanSymbol === 'X'
                    ? 'bg-[#D42B2B] text-[#FFFDF5] shadow-[2px_2px_0_#1A1209]'
                    : 'bg-[#FFFDF5] text-[#1A1209] hover:bg-[#E8E2D5]'
                }`}
              >
                X (P1)
              </button>
              <button
                type="button"
                onClick={() => onSelectSymbol('O')}
                className={`py-2.5 border-2 border-[#1A1209] font-display font-black text-2xl uppercase ${
                  humanSymbol === 'O'
                    ? 'bg-[#1B3FBF] text-[#FFFDF5] shadow-[2px_2px_0_#1A1209]'
                    : 'bg-[#FFFDF5] text-[#1A1209] hover:bg-[#E8E2D5]'
                }`}
              >
                O (P2)
              </button>
            </div>
          </div>

          {/* First Mover Strategy */}
          {isVsAI && (
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1A1209] mb-2 flex items-center gap-1.5">
                <Dices className="w-4 h-4 text-[#F0C030]" /> First Move Order
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => onSelectFirstMover('coinflip')}
                  className={`py-2 px-1 border-2 border-[#1A1209] font-mono text-[11px] font-bold uppercase ${
                    firstMover === 'coinflip'
                      ? 'bg-[#F0C030] text-[#1A1209] shadow-[2px_2px_0_#1A1209]'
                      : 'bg-[#FFFDF5] text-[#1A1209] hover:bg-[#E8E2D5]'
                  }`}
                >
                  🪙 Coin Flip
                </button>
                <button
                  type="button"
                  onClick={() => onSelectFirstMover('human')}
                  className={`py-2 px-1 border-2 border-[#1A1209] font-mono text-[11px] font-bold uppercase ${
                    firstMover === 'human'
                      ? 'bg-[#D42B2B] text-[#FFFDF5] shadow-[2px_2px_0_#1A1209]'
                      : 'bg-[#FFFDF5] text-[#1A1209] hover:bg-[#E8E2D5]'
                  }`}
                >
                  You First
                </button>
                <button
                  type="button"
                  onClick={() => onSelectFirstMover('ai')}
                  className={`py-2 px-1 border-2 border-[#1A1209] font-mono text-[11px] font-bold uppercase ${
                    firstMover === 'ai'
                      ? 'bg-[#1B3FBF] text-[#FFFDF5] shadow-[2px_2px_0_#1A1209]'
                      : 'bg-[#FFFDF5] text-[#1A1209] hover:bg-[#E8E2D5]'
                  }`}
                >
                  AI First
                </button>
              </div>
            </div>
          )}

          {/* AI Difficulty */}
          {isVsAI && (
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1A1209] mb-2 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-[#D42B2B]" /> AI Engine Difficulty
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => onSelectDifficulty('unbeatable')}
                  className={`py-2 px-1 border-2 border-[#1A1209] font-mono text-[11px] font-bold uppercase ${
                    difficulty === 'unbeatable'
                      ? 'bg-[#D42B2B] text-[#FFFDF5] shadow-[2px_2px_0_#1A1209]'
                      : 'bg-[#FFFDF5] text-[#1A1209] hover:bg-[#E8E2D5]'
                  }`}
                >
                  🔥 Unbeatable
                </button>
                <button
                  type="button"
                  onClick={() => onSelectDifficulty('tactical')}
                  className={`py-2 px-1 border-2 border-[#1A1209] font-mono text-[11px] font-bold uppercase ${
                    difficulty === 'tactical'
                      ? 'bg-[#F0C030] text-[#1A1209] shadow-[2px_2px_0_#1A1209]'
                      : 'bg-[#FFFDF5] text-[#1A1209] hover:bg-[#E8E2D5]'
                  }`}
                >
                  ⚡ Tactical
                </button>
                <button
                  type="button"
                  onClick={() => onSelectDifficulty('casual')}
                  className={`py-2 px-1 border-2 border-[#1A1209] font-mono text-[11px] font-bold uppercase ${
                    difficulty === 'casual'
                      ? 'bg-[#1B3FBF] text-[#FFFDF5] shadow-[2px_2px_0_#1A1209]'
                      : 'bg-[#FFFDF5] text-[#1A1209] hover:bg-[#E8E2D5]'
                  }`}
                >
                  🌱 Casual
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              onStartGame();
              onClose();
            }}
            className="w-full stamp-btn mt-4"
          >
            Apply & Start Game
          </button>
        </div>
      </div>
    </div>
  );
};
