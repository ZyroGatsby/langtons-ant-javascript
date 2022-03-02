window.onload = function () {
  const canvas = document.getElementById('grid')
  window.ctx = canvas.getContext('2d')
  const grid = new Grid(canvas.width, canvas.height)
  grid.init()
  setInterval(moveAnt, 1000 / 13, grid)
}

const UP = 0
const RIGHT = 1
const DOWN = 2
const LEFT = 3

class Ant {
  constructor (x, y, direction) {
    this.x = 0
    this.y = 0

    this.direction = UP
  }

  moveForward (width, height) {
    switch (this.direction) {
      case UP:
        this.x = (this.x - 1 + width) % width
        break
      case RIGHT:
        this.y = (this.y + 1 + height) % height
        break
      case DOWN:
        this.x = (this.x + 1 + width) % width
        break
      case LEFT:
        this.y = (this.y - 1 + height) % height
        break
    }
  }

  rotateRight () {
    this.direction = (this.direction + 1 + (LEFT + 1)) % (LEFT + 1)
  }

  rotateLeft () {
    this.direction = (this.direction - 1 + (LEFT + 1)) % (LEFT + 1)
  }
}

class Cell {
  constructor (alive) {
    this.alive = false
  }

  setAlive (alive) {
    this.alive = alive
  }

  get isAlive () {
    return this.alive
  }
}

class Grid {
  constructor (height, width, cells, ant, moves) {
    this.height = height
    this.width = width
    this.cells = []
    this.ant = new Ant()
    this.moves = 0
  }

  init () {
    for (let x = 0; x < this.width; x++) {
      this.cells[x] = []
      for (let y = 0; y < this.height; y++) {
        const cell = new Cell()
        this.cells[x][y] = cell
      }
    }
    this.ant = new Ant()
    this.ant.x = this.width / 2
    this.ant.y = this.height / 2
  }

  move () {
    for (let i = 0; i < 100; i++) {
      const cell = this.cells[this.ant.x][this.ant.y]
      if (cell.isAlive) {
        cell.alive = false
        window.ctx.fillStyle = 'white'
        window.ctx.fillRect(this.ant.x, this.ant.y, 1, 1)
        this.ant.rotateRight()
        this.ant.moveForward(this.width, this.height)
      } else {
        cell.alive = true
        window.ctx.fillStyle = 'black'
        window.ctx.fillRect(this.ant.x, this.ant.y, 1, 1)
        this.ant.rotateLeft()
        this.ant.moveForward(this.width, this.height)
      }
      window.ctx.fillStyle = 'red'
      window.ctx.fillRect(this.ant.x, this.ant.y, 1, 1)
      this.moves++
    }
  }
}

function moveAnt (grid) {
  grid.move()
  window.ctx.stroke()
  const moves = document.getElementById('moves')
  moves.innerHTML = grid.moves
}
