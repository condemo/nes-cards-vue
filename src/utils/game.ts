import type { Game, PlayerMove } from '@/types/game'

export function calculateDMG(game: Game, p1move: PlayerMove, p2move: PlayerMove): Game {
  if (game.p1stats.t2hp > 0) {
    p2move.damage.forEach((value) => {
      game.p1stats.t2hp -= value
    })
    game.p1stats.t2hp = (
      game.p1stats.t2hp < 0
        ? 0
        : game.p1stats.t2hp
    )
  } else if (game.p1stats.t1hp > 0) {
    p2move.damage.forEach((value) => {
      game.p1stats.t1hp -= value
    })
    game.p1stats.t1hp = (
      game.p1stats.t1hp < 0
        ? 0
        : game.p1stats.t1hp
    )
  } else {
    p2move.damage.forEach((value) => {
      game.p1stats.hp -= value
    })
    game.p1stats.hp = (
      game.p1stats.hp < 0
        ? 0
        : game.p1stats.hp
    )
  }

  if (game.p2stats.t2hp > 0) {
    p1move.damage.forEach((value) => {
      game.p2stats.t2hp -= value
    })
    game.p2stats.t2hp = (
      game.p2stats.t2hp < 0
        ? 0
        : game.p2stats.t2hp
    )
  } else if (game.p2stats.t1hp > 0) {
    p1move.damage.forEach((value) => {
      game.p2stats.t1hp -= value
    })

    game.p2stats.t1hp = (
      game.p2stats.t1hp < 0
        ? 0
        : game.p2stats.t1hp
    )
  } else {
    p1move.damage.forEach((value) => {
      game.p2stats.hp -= value
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
