export interface Defense {
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
  distract(n: number): void
  undistract(): void
}

export class PlayerMove {
  damage: number[]
  defense: DefenseData
  distract: number
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
      distract(n) {
        if (this.size() >= n) {
          for (let i = 0; i < n; i++) {
            this.defenseList[this.size() - 1 - i].active = false
          }
        }
      },
      undistract() {
        this.defenseList.forEach((value) => {
          if (value.active === false) { value.active = true }
        })
      }
    }

    this.poison = 0
    this.distract = 0
  }

  loadDefenses(defs?: string): void {
    if (defs) {
      defs.split(",").map(Number).forEach((value) => {
        this.defense.push(value)
      })
    }
  }

  getDefValue(): number[] {
    let defValues: number[] = []

    this.defense.defenseList.forEach((value) => {
      defValues.push(value.def)
    })

    return defValues
  }

  getCurrentDefenses(): Defense[] {
    return [...this.defense.defenseList]
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

  applyDistract(n: number) {
    this.defense.distract(n)
  }

  reset() {
    this.damage.splice(0)
    this.poison = 0
    this.distract = 0
    this.defense.undistract()
  }

  fullReset() {
    this.reset()
    this.defense.defenseList.splice(0)
  }
}
