'use client';

import { useState, useEffect, useCallback } from 'react';
import { Board, Player, Difficulty, checkWinner, availableMoves, getAIMove } from '../logic/minimax';
import { sounds } from '../utils/sound';
import { Header } from '../components/Header';
import { GameBoard } from '../components/GameBoard';
import { StatusBar } from '../components/StatusBar';
import { ScoreBoard } from '../components/ScoreBoard';
import { SetupModal } from '../components/SetupModal';
import { RotateCcw, Undo2, Play } from 'lucide-react';

const EMPTY_BOARD: Board = Array(9).fill(null);

export default function Home() {
  // Game Configuration State
  const [humanSymbol, setHumanSymbol] = useState<Player>('X');
  const aiSymbol: Player = humanSymbol === 'X' ? 'O' : 'X';
  const [isVsAI, setIsVsAI] = useState<boolean>(true);
  const [firstMover, setFirstMover] = useState<'coinflip' | 'human' | 'ai'>('coinflip');
  const [difficulty, setDifficulty] = useState<Difficulty>('unbeatable');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Game Runtime State
  const [board, setBoard] = useState<Board>(EMPTY_BOARD);
  const [boardHistory, setBoardHistory] = useState<Board[]>([EMPTY_BOARD]);
  const [currentTurn, setCurrentTurn] = useState<Player>('X');
  const [isAIThinking, setIsAIThinking] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<Player | 'draw' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  // Scoreboard State
  const [scores, setScores] = useState({
    human: 0,
    ai: 0,
    draws: 0,
    streak: 0,
  });

  // Start / Reset a New Game
  const startNewGame = useCallback(() => {
    let startingPlayer: Player = 'X';

    if (isVsAI) {
      if (firstMover === 'coinflip') {
        const coinFlip = Math.random() < 0.5;
        startingPlayer = coinFlip ? humanSymbol : aiSymbol;
        sounds.playCoinFlip();
      } else if (firstMover === 'human') {
        startingPlayer = humanSymbol;
      } else {
        startingPlayer = aiSymbol;
      }
    } else {
      startingPlayer = 'X';
    }

    setBoard(EMPTY_BOARD);
    setBoardHistory([EMPTY_BOARD]);
    setCurrentTurn(startingPlayer);
    setGameWinner(null);
    setWinningLine(null);
    setIsAIThinking(false);
  }, [isVsAI, firstMover, humanSymbol, aiSymbol]);

  // Initial Game Launch
  useEffect(() => {
    startNewGame();
  }, []);

  // Handle Turn End and Winner Evaluation
  const evaluateBoardState = (newBoard: Board): boolean => {
    const winResult = checkWinner(newBoard);
    if (winResult) {
      setGameWinner(winResult.winner);
      setWinningLine(winResult.line);

      if (winResult.winner === humanSymbol) {
        sounds.playWin();
        setScores((s) => ({ ...s, human: s.human + 1, streak: s.streak + 1 }));
      } else {
        sounds.playWin();
        setScores((s) => ({ ...s, ai: s.ai + 1, streak: 0 }));
      }
      return true;
    }

    if (availableMoves(newBoard).length === 0) {
      setGameWinner('draw');
      sounds.playDraw();
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
      return true;
    }

    return false;
  };

  // Human Move Click Handler
  const handleCellClick = (index: number) => {
    if (gameWinner || isAIThinking || board[index] !== null) return;

    if (isVsAI && currentTurn !== humanSymbol) return;

    sounds.playStamp();
    const newBoard = [...board];
    newBoard[index] = currentTurn;

    setBoard(newBoard);
    setBoardHistory((prev) => [...prev, newBoard]);

    const isFinished = evaluateBoardState(newBoard);
    if (!isFinished) {
      const nextTurn = currentTurn === 'X' ? 'O' : 'X';
      setCurrentTurn(nextTurn);
    }
  };

  // AI Turn Effect Trigger
  useEffect(() => {
    if (!isVsAI || gameWinner || currentTurn !== aiSymbol) return;

    setIsAIThinking(true);

    const timer = setTimeout(() => {
      const bestMove = getAIMove(board, aiSymbol, humanSymbol, difficulty);
      if (bestMove !== -1) {
        sounds.playStamp();
        const newBoard = [...board];
        newBoard[bestMove] = aiSymbol;

        setBoard(newBoard);
        setBoardHistory((prev) => [...prev, newBoard]);

        const isFinished = evaluateBoardState(newBoard);
        if (!isFinished) {
          setCurrentTurn(humanSymbol);
        }
      }
      setIsAIThinking(false);
    }, 450); // Realistic slight delay for AI turn feel

    return () => clearTimeout(timer);
  }, [board, currentTurn, isVsAI, gameWinner, aiSymbol, humanSymbol, difficulty]);

  // Undo Move (Restores previous turn)
  const handleUndo = () => {
    if (boardHistory.length <= 1 || gameWinner || isAIThinking) return;

    // In VS AI mode, undo 2 moves (AI move + Human move)
    const stepBack = isVsAI && boardHistory.length >= 3 ? 2 : 1;
    const newHistory = boardHistory.slice(0, boardHistory.length - stepBack);
    const prevBoard = newHistory[newHistory.length - 1];

    setBoard(prevBoard);
    setBoardHistory(newHistory);

    if (!isVsAI) {
      setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');
    } else {
      setCurrentTurn(humanSymbol);
    }

    setGameWinner(null);
    setWinningLine(null);
    sounds.playStamp();
  };

  // Reset Scores
  const handleResetScores = () => {
    setScores({ human: 0, ai: 0, draws: 0, streak: 0 });
    startNewGame();
  };

  // Determine Status Bar Text
  let statusText = '';
  if (gameWinner === 'draw') {
    statusText = "IT'S A DRAW!";
  } else if (gameWinner) {
    if (isVsAI) {
      statusText = gameWinner === humanSymbol ? 'YOU WIN!' : 'AI WINS!';
    } else {
      statusText = `PLAYER (${gameWinner}) WINS!`;
    }
  } else if (isAIThinking) {
    statusText = 'AI IS COMPUTING MINIMAX...';
  } else {
    if (isVsAI) {
      statusText = currentTurn === humanSymbol ? 'YOUR TURN' : "AI'S TURN";
    } else {
      statusText = `PLAYER (${currentTurn}) TURN`;
    }
  }

  return (
    <div className="min-h-screen bg-[#F4EFE4] text-[#1A1209] flex flex-col justify-between p-4 sm:p-6 select-none">
      <main className="w-full max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center">
        {/* Header Branding */}
        <Header
          isMuted={isMuted}
          onToggleSound={() => setIsMuted(sounds.toggleMute())}
          onOpenSettings={() => setIsSettingsOpen(true)}
          difficulty={difficulty}
          isVsAI={isVsAI}
        />

        {/* Score Board */}
        <ScoreBoard humanSymbol={humanSymbol} scores={scores} isVsAI={isVsAI} />

        {/* Status Announcement Bar */}
        <StatusBar
          statusText={statusText}
          gameWinner={gameWinner}
          humanSymbol={humanSymbol}
        />

        {/* 3x3 Game Board Grid */}
        <GameBoard
          board={board}
          onCellClick={handleCellClick}
          winningLine={winningLine}
          disabled={gameWinner !== null || isAIThinking}
        />

        {/* Action Button Controls */}
        <div className="w-full max-w-md mx-auto flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            onClick={startNewGame}
            className="stamp-btn flex-1 min-w-[130px]"
          >
            <Play className="w-4 h-4" /> New Game
          </button>

          <button
            onClick={handleUndo}
            disabled={boardHistory.length <= 1 || gameWinner !== null || isAIThinking}
            className="stamp-btn stamp-btn-secondary flex-1 min-w-[110px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Undo2 className="w-4 h-4" /> Undo
          </button>

          <button
            onClick={handleResetScores}
            className="stamp-btn stamp-btn-neutral px-3"
            title="Reset Scoreboard"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer credits */}
      <footer className="w-full max-w-md mx-auto text-center font-mono text-xs text-[#1A1209]/60 border-t-2 border-[#1A1209]/20 pt-3 mt-4">
        Next.js App Router • Deterministically Optimal Minimax Algorithm
      </footer>

      {/* Game Setup Modal */}
      <SetupModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        humanSymbol={humanSymbol}
        onSelectSymbol={setHumanSymbol}
        isVsAI={isVsAI}
        onToggleVsAI={setIsVsAI}
        firstMover={firstMover}
        onSelectFirstMover={setFirstMover}
        difficulty={difficulty}
        onSelectDifficulty={setDifficulty}
        onStartGame={startNewGame}
      />
    </div>
  );
}
