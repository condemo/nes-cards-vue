interface Defense {
  def: number
  active: boolean
}

interface DefenseData extends DefenseStack {
  defenseList: Defense[]
}

interface DefenseStack {
  push(item: number): void
  pop(): Defense | undefined
  peek(): Defense | undefined
  size(): number
  updatePeek(n: number): void
  distract(): void
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
      },
      distract() {
        let current = this.peek()
        if (current) {
          current.active = false
        }
      },
    }
    this.strength = 0
    this.intangible = 0
    this.confusion = 0
    this.poison = 0
  }

  applyDefense(dmg: number[], str: number): number[] {
    let dmgCopy = [...dmg]
    let disabledDefs: Defense[] = []

    dmg.some((value, index, array) => {
      let lastDef = this.defense.peek()
      if (lastDef) {
        if (!lastDef.active) {
          disabledDefs.push(lastDef)
          this.defense.pop()
          lastDef = this.defense.peek()
        }
        if (lastDef) {
          let defRest = lastDef.def - (value + str)
          let dmgRest = -defRest
          if (defRest <= 0) {
            this.defense.pop()
            dmgCopy.shift()
          } else {
            if (dmgRest <= 0) {
              dmgCopy.shift()
            }
            if (index !== array.length - 1) {
              this.defense.updatePeek(defRest)
            }
          }
        }
      } else { return true }
    })

    // foward removed distracted defs
    disabledDefs.reverse()
    disabledDefs.forEach((value) => {
      this.defense.push(value.def)
    })

    return dmgCopy
  }

  distract() {
    this.defense.distract()
  }

  reset() {
    this.damage.splice(0)
    this.strength = 0
    this.intangible = 0
    this.confusion = 0
    this.poison = 0
  }
}
