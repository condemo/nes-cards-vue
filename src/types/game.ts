import { useGameDataStore } from "@/stores/gameData"
import { storeToRefs, type Store } from "pinia"
import type { Ref } from "vue"

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
  intanglibe: number
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

export class PlayerMove {
  damage: number
  defense: number
  strength: number
  intangible: number
  confusion: number
  poison: number

  constructor() {
    this.damage = 0
    this.defense = 0
    this.strength = 0
    this.intangible = 0
    this.confusion = 0
    this.poison = 0
  }

  attack(defense: number) {
    this.damage -= defense
    if (this.damage < 0) {
      this.damage = 0
    }
  }

  reset() {
    this.damage = 0
    this.defense = 0
    this.strength = 0
    this.intangible = 0
    this.confusion = 0
    this.poison = 0
  }
}
