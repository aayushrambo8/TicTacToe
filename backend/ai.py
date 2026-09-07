"""
ai.py
-----
Minimax search algorithm with Alpha-Beta Pruning for Tic-Tac-Toe AI.
"""

import math
from game import EMPTY, check_winner, available_moves


def minimax(board, depth, is_maximizing, ai_symbol, human_symbol,
            alpha=-math.inf, beta=math.inf):
    """Recursive alpha-beta search algorithm to determine the optimal move score."""
    if check_winner(board, ai_symbol):
        return 10 - depth, None
    if check_winner(board, human_symbol):
        return depth - 10, None

    moves = available_moves(board)
    if not moves:
        return 0, None

    player = ai_symbol if is_maximizing else human_symbol
    best_score = -math.inf if is_maximizing else math.inf
    best_move = moves[0]

    for move in moves:
        board[move] = player
        score, _ = minimax(board, depth + 1, not is_maximizing,
                            ai_symbol, human_symbol, alpha, beta)
        board[move] = EMPTY

        if is_maximizing and score > best_score:
            best_score, best_move = score, move
            alpha = max(alpha, best_score)
        elif not is_maximizing and score < best_score:
            best_score, best_move = score, move
            beta = min(beta, best_score)

        if beta <= alpha:
            break  # Prune branch

    return best_score, best_move


def get_ai_move(board, ai_symbol, human_symbol):
    """Calculates and returns the best move for the AI using Minimax with Alpha-Beta pruning."""
    _, move = minimax(board, 0, True, ai_symbol, human_symbol)
    return move
