import type { Game } from '@/types/game'
import { PlayerMove } from '@/game/game'

export function calculateDMG(game: Game, p1move: PlayerMove, p2move: PlayerMove): Game {
  const p1strength = game.p1stats.strength
  const p2strength = game.p2stats.strength

  if (game.p1stats.t2hp > 0) {
    p2move.damage.forEach((value) => {
      game.p1stats.t2hp -= value + p2strength
    })
    game.p1stats.t2hp = (
      game.p1stats.t2hp < 0
        ? 0
        : game.p1stats.t2hp
    )
  } else if (game.p1stats.t1hp > 0) {
    p2move.damage.forEach((value) => {
      game.p1stats.t1hp -= value + p2strength
    })
    game.p1stats.t1hp = (
      game.p1stats.t1hp < 0
        ? 0
        : game.p1stats.t1hp
    )
  } else {
    p2move.damage.forEach((value) => {
      game.p1stats.hp -= value + p2strength
    })
    game.p1stats.hp = (
      game.p1stats.hp < 0
        ? 0
        : game.p1stats.hp
    )
  }

  if (game.p2stats.t2hp > 0) {
    p1move.damage.forEach((value) => {
      game.p2stats.t2hp -= value + p1strength
    })
    game.p2stats.t2hp = (
      game.p2stats.t2hp < 0
        ? 0
        : game.p2stats.t2hp
    )
  } else if (game.p2stats.t1hp > 0) {
    p1move.damage.forEach((value) => {
      game.p2stats.t1hp -= value + p1strength
    })

    game.p2stats.t1hp = (
      game.p2stats.t1hp < 0
        ? 0
        : game.p2stats.t1hp
    )
  } else {
    p1move.damage.forEach((value) => {
      game.p2stats.hp -= value + p1strength
    })
    game.p2stats.hp = (
      game.p2stats.hp < 0
        ? 0
        : game.p2stats.hp
    )
  }

  if (p1move.poison > 0 && game.p2stats.intangible === 0) {
    game.p2stats.hp -= p1move.poison
  }
  if (p2move.poison > 0 && game.p1stats.intangible === 0) {
    game.p1stats.hp -= p2move.poison
  }

  return game
}
