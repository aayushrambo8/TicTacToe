"""
game.py
-------
Core game constants and board evaluation functions for Tic-Tac-Toe.
"""

EMPTY = " "
WIN_COMBOS = (
    (0, 1, 2), (3, 4, 5), (6, 7, 8),   # Rows
    (0, 3, 6), (1, 4, 7), (2, 5, 8),   # Columns
    (0, 4, 8), (2, 4, 6),              # Diagonals
)


def check_winner(board, player):
    """Returns True if the specified player has achieved a winning line on the board."""
    return any(all(board[i] == player for i in combo) for combo in WIN_COMBOS)


def available_moves(board):
    """Returns a list of indices corresponding to empty spots on the board."""
    return [i for i, spot in enumerate(board) if spot == EMPTY]
