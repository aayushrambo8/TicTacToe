# Tic-Tac-Toe AI: Minimax Algorithm with Alpha-Beta Pruning

**Course**: Artificial Intelligence Laboratory (Semester 5)  
**Domain**: Adversarial Search & Game Theory  
**Implementation**: Python 3.x  

---

## 1. Abstract

This repository presents an implementation of an optimal decision-making agent for the game of Tic-Tac-Toe. The agent utilizes the **Minimax adversarial search algorithm** enhanced with **Alpha-Beta Pruning** to evaluate game trees and select optimal moves. In a two-player, zero-sum, perfect-information game setting, this theoretical foundation guarantees that the AI agent plays deterministically optimal moves, ensuring it can never be defeated.

---

## 2. Theoretical Background

### 2.1 Adversarial Search in Zero-Sum Games
Tic-Tac-Toe is modeled as a deterministic, fully observable, two-player, zero-sum game played on a $3 \times 3$ grid:
- **Players**: $\text{MAX}$ (AI Player, `O`) and $\text{MIN}$ (Human Player, `X`).
- **Zero-Sum Property**: A gain in utility for $\text{MAX}$ directly corresponds to an equivalent loss of utility for $\text{MIN}$.

### 2.2 Minimax Decision Rule
The Minimax value of a state $s$, denoted $V(s)$, is defined recursively as:

$$
V(s) = 
\begin{cases} 
\text{Utility}(s) & \text{if } s \text{ is a terminal state} \\
\max_{a \in \text{Actions}(s)} V(\text{Result}(s, a)) & \text{if Player}(s) = \text{MAX} \\
\min_{a \in \text{Actions}(s)} V(\text{Result}(s, a)) & \text{if Player}(s) = \text{MIN}
\end{cases}
$$

To incentivize the algorithm to select shorter paths to victory and prolong losses, a depth penalty is incorporated into the terminal utility function:
- **$\text{MAX}$ Win (`O`)**: $\text{Score} = +10 - d$
- **$\text{MIN}$ Win (`X`)**: $\text{Score} = d - 10$
- **Draw**: $\text{Score} = 0$

where $d$ represents the search tree depth at which the terminal state is encountered.

### 2.3 Alpha-Beta $(\alpha, \beta)$ Pruning
Alpha-Beta Pruning is an optimization technique applied to the standard Minimax algorithm. It eliminates branches of the search tree that cannot influence the final decision:
- **$\alpha$ (Alpha)**: The highest-value choice found so far along the path for $\text{MAX}$.
- **$\beta$ (Beta)**: The lowest-value choice found so far along the path for $\text{MIN}$.

During depth-first traversal, if at any node $\beta \le \alpha$, the subtree below that node is pruned, reducing the effective branching factor from $b$ to approximately $\sqrt{b}$ in optimal move ordering.

---

## 3. System Architecture and Implementation

### 3.1 Board Indexing and State Representation
The $3 \times 3$ game board is represented internally as a 1D list of length 9 containing character values (`'X'`, `'O'`, or `' '`). The command-line user interface maps user inputs (1 through 9) to array indices (0 through 8) matching standard numeric keypad indexing:

```
 1 | 2 | 3
-----------
 4 | 5 | 6
-----------
 7 | 8 | 9
```

### 3.2 Key Modules and Functions

The implementation in [`TickTacToe.py`](file:///d:/College%20Material/AI%20Lab%20Sem%205/Project/TickTacToe.py) is modularized into several core routines:

- **[`minimax(board, depth, is_ai, alpha, beta)`](file:///d:/College%20Material/AI%20Lab%20Sem%205/Project/TickTacToe.py#L28-L56)**  
  Executes recursive game-tree traversal with alpha-beta bounds tracking, returning a tuple of `(best_score, best_move)`.
  
- **[`check_winner(board, player)`](file:///d:/College%20Material/AI%20Lab%20Sem%205/Project/TickTacToe.py#L20-L21)**  
  Evaluates 8 terminal win conditions (3 horizontal rows, 3 vertical columns, and 2 diagonals) using the global `WIN_COMBOS` tuple.

- **[`available_moves(board)`](file:///d:/College%20Material/AI%20Lab%20Sem%205/Project/TickTacToe.py#L24-L25)**  
  Returns a list of unassigned array indices representing permissible state transitions.

- **[`print_board(board)`](file:///d:/College%20Material/AI%20Lab%20Sem%205/Project/TickTacToe.py#L11-L17)**  
  Formats and outputs the 3x3 game grid to stdout.

- **[`get_human_move(board)`](file:///d:/College%20Material/AI%20Lab%20Sem%205/Project/TickTacToe.py#L59-L67)**  
  Handles terminal input parsing, type checking, bounds validation, and conflict checking against occupied positions.

- **[`play_game()`](file:///d:/College%20Material/AI%20Lab%20Sem%205/Project/TickTacToe.py#L70-L106)**  
  Main game execution loop managing turn swaps and game end conditions.

---

## 4. Operational Instructions

### 4.1 Prerequisites
- Python 3.6 or higher environment.

### 4.2 Execution Steps

1. Launch the terminal and navigate to the project directory:
   ```bash
   cd "Project"
   ```

2. Execute the Python module:
   ```bash
   python TickTacToe.py
   ```

---

## 5. Verification and Results

### 5.1 Game Outcome Properties
Due to the game-theoretic optimality of the Minimax decision rule:
1. **Against an optimal opponent**: The game guarantees a outcome of a draw (`0` utility).
2. **Against a suboptimal opponent**: The AI exploits suboptimal player decisions to secure a win (`+10 - d` utility).

### 5.2 Efficiency Verification
Alpha-Beta Pruning significantly decreases the number of evaluated nodes compared to unpruned Minimax, resulting in instant response times for move selection during runtime execution.

---

## 6. References

1. Russell, S., & Norvig, P. (2020). *Artificial Intelligence: A Modern Approach* (4th ed.). Pearson. (Chapter 5: Adversarial Search and Games).
2. Nilsson, N. J. (2014). *Principles of Artificial Intelligence*. Morgan Kaufmann.
# TicTacToe
