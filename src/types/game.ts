export interface Player {
  id: number
  name: string
}

export interface PlayerStats {
  id: number
  gameID: number
  playerID: number
  hp: number
  t1hp: number
  t2hp: number
  strength: number
  intangible: number
  confusion: number
}

export interface GameSetup {
  player1: Player | undefined
  player2: Player | undefined
  playerHP: number | undefined
  towerHP: number | undefined
}

export interface Game {
  id: number
  p1id: number
  p2id: number
  player1: Player
  player2: Player
  p1stats: PlayerStats
  p2stats: PlayerStats
  winner: string
  createdAt: string
}

export enum UpdateMode {
  Damage = "Damage",
  AlteredEffect = "Altered Effect",
  Defense = "Defense"
}

export enum PlayerTurn {
  Player1 = 0,
  Player2
}

export enum TurnMode {
  Attack = 0,
  Defense
}
