export type Player = {
  id?: number
  name: string
}

export type PlayerStats = {
  id: number
  gameID: number
  playerID: number
  hp: number
  t1hp: number
  t2hp: number
  strength: number
  intanglibe: number
  confusion: number
}

export type GameSetup = {
  player1: Player | undefined
  player2: Player | undefined
  playerHP: number | undefined
  towerHP: number | undefined
}

export type Game = {
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
