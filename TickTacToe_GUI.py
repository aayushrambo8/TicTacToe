"""
Tic-Tac-Toe — Minimax + Alpha-Beta Pruning (GUI Edition)
----------------------------------------------------------
Extends the original console version with:
  - Tkinter graphical interface (click to play)
  - Choice of your symbol (X or O)
  - Who moves first is decided by a random coin flip — 1 means the
    human moves first, 0 means the computer does. Neither player is
    assumed to have the first move.
  - The AI always maximizes: it plays the full alpha-beta-pruned
    minimax move every turn, with no randomness in its play.

Core search logic (minimax + alpha-beta) is unchanged in spirit from
the original TickTacToe.py — only generalized so either player can be
AI's symbol and human's symbol, since GUI lets you pick.
"""

import math
import random
import tkinter as tk
from tkinter import messagebox

EMPTY = " "
WIN_COMBOS = (
    (0, 1, 2), (3, 4, 5), (6, 7, 8),   # Rows
    (0, 3, 6), (1, 4, 7), (2, 5, 8),   # Columns
    (0, 4, 8), (2, 4, 6),              # Diagonals
)


def check_winner(board, player):
    return any(all(board[i] == player for i in combo) for combo in WIN_COMBOS)


def available_moves(board):
    return [i for i, spot in enumerate(board) if spot == EMPTY]


def minimax(board, depth, is_maximizing, ai_symbol, human_symbol,
            alpha=-math.inf, beta=math.inf):
    """Same recursive alpha-beta search as the original, generalized
    so ai_symbol/human_symbol aren't hardcoded to 'O'/'X'."""
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
            break  # Prune

    return best_score, best_move


def get_ai_move(board, ai_symbol, human_symbol):
    """AI always maximizes: full minimax with alpha-beta pruning,
    no randomness — the computer never plays a suboptimal move."""
    _, move = minimax(board, 0, True, ai_symbol, human_symbol)
    return move


class TicTacToeGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Tic-Tac-Toe — Minimax AI")
        self.root.resizable(False, False)
        self.build_setup_screen()

    # ---------------- Setup screen ----------------
    def build_setup_screen(self):
        self.setup_frame = tk.Frame(self.root, padx=24, pady=24)
        self.setup_frame.pack()

        tk.Label(self.setup_frame, text="Tic-Tac-Toe",
                 font=("Helvetica", 20, "bold")).grid(
            row=0, column=0, columnspan=2, pady=(0, 15))

        tk.Label(self.setup_frame, text="Play as:",
                 font=("Helvetica", 12)).grid(row=1, column=0, sticky="w")
        self.symbol_var = tk.StringVar(value="X")
        tk.OptionMenu(self.setup_frame, self.symbol_var, "X", "O").grid(
            row=1, column=1, sticky="ew")

        tk.Label(self.setup_frame, text="Who goes first is decided by a coin flip\n"
                                         "(no one is assumed to move first).",
                 font=("Helvetica", 10), fg="gray30", justify="center").grid(
            row=2, column=0, columnspan=2, pady=(4, 4))

        tk.Button(self.setup_frame, text="Start Game", font=("Helvetica", 12, "bold"),
                  command=self.start_game).grid(row=3, column=0, columnspan=2, pady=(14, 0))

    def start_game(self):
        self.human_symbol = self.symbol_var.get()
        self.ai_symbol = "O" if self.human_symbol == "X" else "X"

        # 1 -> human moves first, 0 -> computer moves first. Neither side
        # is assumed to go first; it's decided fresh by a random draw.
        first_mover = random.randint(0, 1)
        self.human_turn = (first_mover == 1)

        self.setup_frame.destroy()
        self.build_game_screen()

        if not self.human_turn:
            self.root.after(400, self.ai_move)

    # ---------------- Game screen ----------------
    def build_game_screen(self):
        self.board = [EMPTY] * 9
        self.game_over = False

        self.status_var = tk.StringVar()
        tk.Label(self.root, textvariable=self.status_var,
                 font=("Helvetica", 13)).pack(pady=(10, 0))
        self.update_status()

        grid_frame = tk.Frame(self.root, padx=10, pady=10)
        grid_frame.pack()

        self.buttons = []
        for i in range(9):
            btn = tk.Button(grid_frame, text=EMPTY, font=("Helvetica", 24, "bold"),
                             width=4, height=2, command=lambda i=i: self.human_move(i))
            btn.grid(row=i // 3, column=i % 3)
            self.buttons.append(btn)

        tk.Button(self.root, text="Restart", font=("Helvetica", 11),
                  command=self.restart).pack(pady=10)

    def update_status(self):
        if self.game_over:
            return
        turn = "Your" if self.human_turn else "AI's"
        self.status_var.set(f"{turn} turn")

    def human_move(self, i):
        if self.game_over or not self.human_turn or self.board[i] != EMPTY:
            return
        self.place(i, self.human_symbol)
        if self.finish_if_over(self.human_symbol):
            return
        self.human_turn = False
        self.update_status()
        self.root.after(400, self.ai_move)

    def ai_move(self):
        if self.game_over:
            return
        move = get_ai_move(self.board, self.ai_symbol, self.human_symbol)
        self.place(move, self.ai_symbol)
        if self.finish_if_over(self.ai_symbol):
            return
        self.human_turn = True
        self.update_status()

    def place(self, i, symbol):
        self.board[i] = symbol
        self.buttons[i].config(text=symbol)

    def finish_if_over(self, last_player):
        if check_winner(self.board, last_player):
            self.game_over = True
            winner = "You" if last_player == self.human_symbol else "AI"
            msg = f"{winner} win{'s' if winner == 'AI' else ''}!"
            self.status_var.set(msg)
            self.disable_all()
            messagebox.showinfo("Game Over", msg)
            return True
        if not available_moves(self.board):
            self.game_over = True
            self.status_var.set("It's a draw!")
            self.disable_all()
            messagebox.showinfo("Game Over", "It's a draw!")
            return True
        return False

    def disable_all(self):
        for btn in self.buttons:
            btn.config(state="disabled")

    def restart(self):
        for widget in self.root.winfo_children():
            widget.destroy()
        self.__init__(self.root)


if __name__ == "__main__":
    root = tk.Tk()
    TicTacToeGUI(root)
    root.mainloop()
