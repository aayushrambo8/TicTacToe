"""
main.py
-------
Pure Python CLI interface for Tic-Tac-Toe Minimax AI.
"""

from game import EMPTY, check_winner, available_moves
from ai import get_ai_move


def print_board(board):
    print("\n")
    for row in range(3):
        spots = [board[row * 3 + col] if board[row * 3 + col] != EMPTY else str(row * 3 + col + 1) for col in range(3)]
        print(f" {spots[0]} | {spots[1]} | {spots[2]} ")
        if row < 2:
            print("-----------")
    print("\n")


def play_game():
    board = [EMPTY] * 9
    print("==========================================")
    print("  Tic-Tac-Toe — Pure Python Minimax AI")
    print("==========================================")

    symbol_choice = input("Play as (X/O) [default X]: ").strip().upper()
    human_symbol = "O" if symbol_choice == "O" else "X"
    ai_symbol = "O" if human_symbol == "X" else "X"

    first_choice = input("Who goes first? (1: You, 2: AI) [default 1]: ").strip()
    human_turn = first_choice != "2"

    while True:
        print_board(board)

        if check_winner(board, human_symbol):
            print("🎉 Congratulations! You won!")
            break
        if check_winner(board, ai_symbol):
            print("🤖 AI wins! (Minimax optimal play)")
            break
        if not available_moves(board):
            print("🤝 It's a draw!")
            break

        if human_turn:
            moves = available_moves(board)
            try:
                move_str = input(f"Your move ({human_symbol}) [1-9]: ").strip()
                move = int(move_str) - 1
                if move not in moves:
                    print("Invalid move! Try again.")
                    continue
                board[move] = human_symbol
                human_turn = False
            except ValueError:
                print("Please enter a valid number (1-9).")
                continue
        else:
            print("AI is computing move...")
            ai_move = get_ai_move(board, ai_symbol, human_symbol)
            board[ai_move] = ai_symbol
            print(f"AI chose position {ai_move + 1}")
            human_turn = True


if __name__ == "__main__":
    play_game()
