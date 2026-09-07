export type Player = "X" | "O";
export type Board = (Player | null)[];
export type Difficulty = "unbeatable" | "tactical" | "casual";

export const WIN_COMBOS: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6],             // Diagonals
];

export function checkWinner(board: Board): { winner: Player; line: number[] } | null {
  for (const combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: combo };
    }
  }
  return null;
}

export function availableMoves(board: Board): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  aiSymbol: Player,
  humanSymbol: Player,
  alpha = -Infinity,
  beta = Infinity
): { score: number; move: number | null } {
  const winnerRes = checkWinner(board);
  if (winnerRes) {
    if (winnerRes.winner === aiSymbol) {
      return { score: 10 - depth, move: null };
    } else {
      return { score: depth - 10, move: null };
    }
  }

  const moves = availableMoves(board);
  if (moves.length === 0) {
    return { score: 0, move: null };
  }

  const player = isMaximizing ? aiSymbol : humanSymbol;
  let bestScore = isMaximizing ? -Infinity : Infinity;
  let bestMove = moves[0];

  for (const move of moves) {
    board[move] = player;
    const result = minimax(
      board,
      depth + 1,
      !isMaximizing,
      aiSymbol,
      humanSymbol,
      alpha,
      beta
    );
    board[move] = null;

    if (isMaximizing) {
      if (result.score > bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
      alpha = Math.max(alpha, bestScore);
    } else {
      if (result.score < bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
      beta = Math.min(beta, bestScore);
    }

    if (beta <= alpha) {
      break; // Alpha-beta pruning
    }
  }

  return { score: bestScore, move: bestMove };
}

export function getAIMove(
  board: Board,
  aiSymbol: Player,
  humanSymbol: Player,
  difficulty: Difficulty = "unbeatable"
): number {
  const moves = availableMoves(board);
  if (moves.length === 0) return -1;

  if (difficulty === "casual") {
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  }

  if (difficulty === "tactical") {
    if (Math.random() > 0.7) {
      const randomIndex = Math.floor(Math.random() * moves.length);
      return moves[randomIndex];
    }
  }

  const { move } = minimax(board, 0, true, aiSymbol, humanSymbol);
  return move !== null ? move : moves[0];
}
