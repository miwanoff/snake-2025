const canvas = document.getElementById("canvas");
const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];

class Block {
  constructor(canvas, col = 0, row = 0, blockSize = 10, colors = ["blue"]) {
    this.context = canvas.getContext("2d");
    this.col = col;
    this.row = row;
    this.colors = colors;
    this.blockSize = blockSize;
  }

  drawSquare = function (color = "blue") {
    const x = this.col * this.blockSize;
    const y = this.row * this.blockSize;
    this.context.fillStyle = color;
    this.context.fillRect(x, y, this.blockSize, this.blockSize);
  };

  circle = function (x, y, radius) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2, false);
    this.context.fill();
  };

  drawCircle = function (color = "Green") {
    const centerX = this.col * this.blockSize + this.blockSize / 2;
    const centerY = this.row * this.blockSize + this.blockSize / 2;
    this.context.fillStyle = color;
    this.circle(centerX, centerY, this.blockSize / 2);
  };

  equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
  };
}

class Apple {
  constructor(canvas) {
    this.block = new Block(canvas, 20, 30);
    this.color = "LimeGreen";
    this.canvas = canvas;
  }
  draw = function () {
    this.block.drawCircle(this.color);
  };

  move = function () {
    const widthInBlocks = this.canvas.width / this.block.blockSize;
    const heightInBlocks = this.canvas.height / this.block.blockSize;
    let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.block = new Block(this.canvas, randomCol, randomRow);
  };
}

class Snake {
  constructor(canvas) {
    this.segments = [new Block(canvas, 7, 5), new Block(canvas, 6, 5), new Block(canvas, 5, 5)];
    this.direction = "right";
    this.nextDirection = "right";
    this.color = "blue";
    this.canvas = canvas;
  }

  draw = function () {
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].drawSquare(this.color);
    }
  };
}

// const block = new Block(canvas, 20, 30);
// block.drawCircle();
// const apple = new Apple(canvas);
// apple.draw();
// console.log(apple.block.equal(block));
// apple.move();
// apple.draw();

const snake = new Snake(canvas);
snake.draw();
