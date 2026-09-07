'use client';

import React from 'react';
import { Volume2, VolumeX, Cpu, Settings } from 'lucide-react';
import { Difficulty } from '../logic/minimax';

interface HeaderProps {
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  difficulty: Difficulty;
  isVsAI: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  onToggleSound,
  onOpenSettings,
  difficulty,
  isVsAI,
}) => {
  return (
    <header className="w-full max-w-lg mx-auto flex flex-col items-center mb-6">
      <div className="w-full flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2">
          <span className="badge-brutalist bg-[#1B3FBF] text-[#FFFDF5]">
            NEXT.JS + TS
          </span>
          {isVsAI ? (
            <span className="badge-brutalist bg-[#D42B2B] text-[#FFFDF5] flex items-center gap-1">
              <Cpu className="w-3 h-3 inline" /> {difficulty}
            </span>
          ) : (
            <span className="badge-brutalist bg-[#F0C030] text-[#1A1209]">
              2 PLAYERS LOCAL
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            className="p-2 border-2 border-[#1A1209] bg-[#FFFDF5] hover:bg-[#E8E2D5] shadow-[2px_2px_0_#1A1209] active:translate-x-[1px] active:translate-y-[1px]"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onOpenSettings}
            className="p-2 border-2 border-[#1A1209] bg-[#FFFDF5] hover:bg-[#E8E2D5] shadow-[2px_2px_0_#1A1209] active:translate-x-[1px] active:translate-y-[1px]"
            title="Game Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center">
        <h1 className="font-display font-black text-5xl sm:text-6xl tracking-wider uppercase text-[#1A1209] drop-shadow-[3px_3px_0_#D42B2B]">
          TIC-TAC-TOE
        </h1>
        <p className="font-mono text-xs uppercase tracking-widest text-[#1A1209]/80 font-bold mt-1">
          Adversarial Search • Minimax + Alpha-Beta Pruning
        </p>
      </div>
    </header>
  );
};
