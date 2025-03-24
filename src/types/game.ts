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

interface Defense {
  def: number
  active: boolean
}

interface DefenseData extends DefenseStack {
  defenseList: Defense[]
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

interface DefenseStack {
  push(item: number): void
  pop(): Defense | undefined
  peek(): Defense | undefined
  size(): number
  updatePeek(n: number): void
}

export class PlayerMove {
  damage: number[]
  defense: DefenseData
  strength: number
  intangible: number
  confusion: number
  poison: number

  constructor() {
    this.damage = []
    this.defense = {
      defenseList: [],
      push(def) {
        this.defenseList.push({ def: def, active: true })
      },
      pop(): Defense | undefined {
        return this.defenseList.pop()
      },
      peek() {
        return this.defenseList[this.size() - 1]
      },
      size(): number {
        return this.defenseList.length
      },
      updatePeek(n) {
        if (this.defenseList.length > 0) {
          this.defenseList[this.size() - 1].def = n
        }
      }
    }
    this.strength = 0
    this.intangible = 0
    this.confusion = 0
    this.poison = 0
  }

  // attack(defense: number) {
  //   this.damage -= defense
  //   if (this.damage < 0) {
  //     this.damage = 0
  //   }
  // }
  applyDefense(dmg: number[]): number[] {
    console.log('initial dmg ->', dmg)
    this.defense.defenseList.forEach((value, index) => {
      console.log(index, value.def)
    })
    let dmgCopy = [...dmg]

    dmg.some((value, index, array) => {
      console.log(`iteration n-${index + 1}`)
      let lastDef = this.defense.peek()
      console.log('current def ->', lastDef)
      console.log('current dmg ->', value)
      if (lastDef) {
        let defRest = lastDef.def - value
        let dmgRest = -defRest
        console.log('dmgRest', dmgRest)
        console.log("defRest", defRest)
        if (defRest <= 0) {
          this.defense.pop()
          dmgCopy.shift()
          console.log('dmg after remove', dmgCopy)
          console.log('def after', this.defense.peek()?.def)
          console.log('def size left', this.defense.size())
        } else {
          if (dmgRest <= 0) {
            dmgCopy.shift()
          }
          if (index !== array.length - 1) {
            console.log('def updated to', defRest, 'def size', this.defense.size())
            this.defense.updatePeek(defRest)
          }
          console.log('defense after rest', this.defense.peek()?.def)
          console.log('dmg after rest', dmgCopy)
        }
      } else { return true }
      console.log("---=-=-=-=-=-=-")
    })
    // console.log("end defenseList", this.defense.defenseList)
    this.defense.defenseList.forEach((value) => { console.log(`rest defense value ${value.def}`) })
    // console.log("end damage", dmg)
    console.log("damage copy", dmgCopy)
    console.log("----------------------------------------------------------")
    return dmgCopy
  }

  reset() {
    this.damage.splice(0)
    this.strength = 0
    this.intangible = 0
    this.confusion = 0
    this.poison = 0
  }
}
