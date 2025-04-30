import type { Game } from '@/types/game'
import { PlayerMove } from '@/game/game'

function checkHP(hp: number): number {
  return hp < 0
    ? 0
    : hp
}

export function calculateDMG(game: Game, p1move: PlayerMove, p2move: PlayerMove): Game {
  const p1strength = game.p1stats.strength
  const p2strength = game.p2stats.strength
  let p1Damage = p1move.damage
  let p2Damage = p2move.damage

  // Player1 Damages
  if (p1Damage.length > 0) {
    p1Damage.forEach((value) => {
      if (game.p2stats.t2hp > 0) {
        game.p2stats.t2hp -= value + p1strength
      } else if (game.p2stats.t1hp > 0) {
        game.p2stats.t1hp -= value + p1strength
      } else {
        game.p2stats.hp -= value + p1strength
      }
    })
  }

  // Player2 Damages
  if (p2Damage.length > 0) {
    p2Damage.forEach((value) => {
      if (game.p1stats.t2hp > 0) {
        game.p1stats.t2hp -= value + p2strength
      } else if (game.p1stats.t1hp > 0) {
        game.p1stats.t1hp -= value + p2strength
      } else {
        game.p1stats.hp -= value + p2strength
      }
    })
  }

  // P1 HPs set to 0 in case of negative hp
  game.p1stats.t2hp = checkHP(game.p1stats.t2hp)
  game.p1stats.t1hp = checkHP(game.p1stats.t1hp)
  game.p1stats.hp = checkHP(game.p1stats.hp)

  // P2 HPs set to 0 in case of negative hp
  game.p2stats.t2hp = checkHP(game.p2stats.t2hp)
  game.p2stats.t1hp = checkHP(game.p2stats.t1hp)
  game.p2stats.hp = checkHP(game.p2stats.hp)

  if (p1move.poison > 0 && game.p2stats.intangible === 0) {
    game.p2stats.hp -= p1move.poison
  }
  if (p2move.poison > 0 && game.p1stats.intangible === 0) {
    game.p1stats.hp -= p2move.poison
  }

  return game
}
