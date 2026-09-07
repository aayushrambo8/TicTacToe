# Tic-Tac-Toe AI: Minimax Algorithm with Alpha-Beta Pruning

**Course**: Artificial Intelligence Laboratory (Semester 5)  
**Domain**: Adversarial Search & Game Theory  
**Stack**: Next.js 15 (TypeScript + Tailwind CSS) & Pure Python 3.x  

---

## 1. Abstract

This repository presents an implementation of an optimal decision-making agent for the game of Tic-Tac-Toe. The agent utilizes the **Minimax adversarial search algorithm** enhanced with **Alpha-Beta Pruning** to evaluate game trees and select optimal moves. In a two-player, zero-sum, perfect-information game setting, this theoretical foundation guarantees that the AI agent plays deterministically optimal moves, ensuring it can never be defeated.

The repository is structured into two decoupled tiers:
- **`frontend/`**: Web application built exclusively with **Next.js (App Router)**, **TypeScript**, Tailwind CSS, and Web Audio API synthesis.
- **`backend/`**: Pure **Python** AI engine and CLI (`game.py`, `ai.py`, `main.py`).

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

## 3. Project Architecture

```
TicTacToe Ai Project/
├── frontend/                     # Next.js 15 + TypeScript Web Frontend
│   ├── app/                      # App Router (layout.tsx, page.tsx, globals.css)
│   ├── components/               # Neo-Brutalist UI Components (Header, Board, Status, Score, Modal)
│   ├── logic/                    # Minimax AI Engine (minimax.ts)
│   ├── utils/                    # Web Audio API Sound Synthesizer (sound.ts)
│   ├── package.json              # Next.js dependencies
│   └── tsconfig.json             # TypeScript configuration
│
├── backend/                      # Pure Python AI Engine & CLI
│   ├── game.py                   # Game rules & winner checks
│   ├── ai.py                     # Recursive Minimax with Alpha-Beta Pruning
│   └── main.py                   # Interactive Python CLI game interface
│
└── README.md                     # Project documentation
```

### 3.1 Key Modules

#### Frontend (`frontend/`)
- **[`frontend/app/page.tsx`](file:///d:/Programming/CS%20Projects/TicTacToe%20Ai%20Project/frontend/app/page.tsx)**: Main Next.js page assembling turn state, coin flip, scoreboard, and settings.
- **[`frontend/logic/minimax.ts`](file:///d:/Programming/CS%20Projects/TicTacToe%20Ai%20Project/frontend/logic/minimax.ts)**: Client-side Minimax AI decision tree engine supporting Unbeatable, Tactical, and Casual modes.
- **[`frontend/utils/sound.ts`](file:///d:/Programming/CS%20Projects/TicTacToe%20Ai%20Project/frontend/utils/sound.ts)**: Zero-dependency Web Audio API sound synthesizer for tactile pop, stamp, win, and draw effects.

#### Backend (`backend/`)
- **[`backend/game.py`](file:///d:/Programming/CS%20Projects/TicTacToe%20Ai%20Project/backend/game.py)**: Core constants (`EMPTY`, `WIN_COMBOS`) and evaluation helpers (`check_winner`, `available_moves`).
- **[`backend/ai.py`](file:///d:/Programming/CS%20Projects/TicTacToe%20Ai%20Project/backend/ai.py)**: Recursive Minimax with Alpha-Beta pruning algorithm.
- **[`backend/main.py`](file:///d:/Programming/CS%20Projects/TicTacToe%20Ai%20Project/backend/main.py)**: Interactive command-line terminal interface for playing against the Python AI agent.

---

## 4. Operational Instructions

### 4.1 Next.js Web Frontend Execution

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Launch the Next.js development server:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

4. Build production bundle:
   ```bash
   npm run build
   ```

---

### 4.2 Pure Python Backend Execution

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Execute the CLI game loop:
   ```bash
   python main.py
   ```

---

### 4.3 Vercel Deployment

Since the Next.js web application resides in the `frontend/` directory, Vercel requires the **Root Directory** setting to be configured to `frontend`.

1. **Vercel Dashboard (GitHub Integration)**
   - Import your repository on [Vercel Dashboard](https://vercel.com/new).
   - Go to **Project Settings** -> **General** -> **Root Directory**.
   - Set **Root Directory** to `frontend`.
   - Vercel will automatically detect **Next.js**, set `npm install` and `npm run build`, and deploy successfully.
   - If a build previously failed with *"No Next.js version detected"*, go to **Deployments** -> select the latest deployment -> click **Redeploy**.

2. **Vercel CLI**
   - Run deployment directly from `frontend/`:
     ```bash
     cd frontend
     npx vercel
     ```

---

## 5. Verification and Results

### 5.1 Game Outcome Properties
Due to the game-theoretic optimality of the Minimax decision rule:
1. **Against an optimal opponent**: The game guarantees an outcome of a draw (`0` utility).
2. **Against a suboptimal opponent**: The AI exploits suboptimal player decisions to secure a win (`+10 - d` utility).

### 5.2 Efficiency Verification
Alpha-Beta Pruning significantly decreases the number of evaluated nodes compared to unpruned Minimax, resulting in instant response times for move selection during runtime execution.

---

## 6. References

1. Russell, S., & Norvig, P. (2020). *Artificial Intelligence: A Modern Approach* (4th ed.). Pearson. (Chapter 5: Adversarial Search and Games).
2. Nilsson, N. J. (2014). *Principles of Artificial Intelligence*. Morgan Kaufmann.