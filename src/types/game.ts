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
  defenses: string
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
  round: number
  playerTurn: PlayerTurn
  turnMode: TurnMode
  createdAt: string
}

export enum UpdateMode {
  Damage = "Damage",
  Stats = "Stats",
  Misc = "Misc",
  Defense = "Defense",
  Rival = "Rival"
}

export enum PlayerTurn {
  Player1 = 0,
  Player2
}

export enum TurnMode {
  Attack = 0,
  Defense
}
