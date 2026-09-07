import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tic-Tac-Toe — Unbeatable Minimax AI | Next.js Edition",
  description: "Play Tic-Tac-Toe against an optimal, unbeatable Minimax AI agent with Alpha-Beta pruning in a Next.js Neo-Brutalist web application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
