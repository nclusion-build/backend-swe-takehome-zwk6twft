export type GameStatus = 'waiting' | 'active' | 'completed' | 'draw';

export interface Player {
  id: string;
  name: string;
  email: string;
  stats: PlayerStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlayerStats {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  gamesDrawn: number;
  totalMoves: number;
  averageMovesPerWin: number;
  winRate: number;
  efficiency: number;
}

export interface Game {
  id: string;
  name: string;
  status: GameStatus;
  board: GameBoard;
  players: Player[];
  currentPlayerId: string | null;
  winnerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  moves: Move[];
}

export type GameBoard = (string | null)[][];

export interface Move {
  id: string;
  gameId: string;
  playerId: string;
  row: number;
  col: number;
  timestamp: Date;
}

export interface CreateGameRequest {
  name?: string;
}

export interface JoinGameRequest {
  playerId: string;
}

export interface MakeMoveRequest {
  playerId: string;
  row: number;
  col: number;
}

