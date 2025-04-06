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
    this.segments = [
      new Block(canvas, 7, 5),
      new Block(canvas, 6, 5),
      new Block(canvas, 5, 5),
    ];
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

  checkCollision = function (head) {
    const widthInBlocks = this.canvas.width / this.segments[0].blockSize;
    const heightInBlocks = this.canvas.height / this.segments[0].blockSize;
    const leftCollision = head.col === 0;
    const topCollision = head.row === 0;
    const rightCollision = head.col === widthInBlocks - 1;
    const bottomCollision = head.row === heightInBlocks - 1;
    const wallCollision =
      leftCollision || topCollision || rightCollision || bottomCollision;
    let selfCollision = false;
    for (let i = 0; i < this.segments.length; i++) {
      if (head.equal(this.segments[i])) {
        selfCollision = true;
      }
    }
    return wallCollision || selfCollision;
  };

  move = function (apple, game) {
    const head = this.segments[0];
    let newHead;
    this.direction = this.nextDirection;
    if (this.direction === "right") {
      newHead = new Block(this.canvas, head.col + 1, head.row);
    } else if (this.direction === "down") {
      newHead = new Block(this.canvas, head.col, head.row + 1);
    } else if (this.direction === "left") {
      newHead = new Block(this.canvas, head.col - 1, head.row);
    } else if (this.direction === "up") {
      newHead = new Block(this.canvas, head.col, head.row - 1);
    }
    if (this.checkCollision(newHead)) {
      game.gameOver();
      return;
    }
    this.segments.unshift(newHead);
    if (newHead.equal(apple.block)) {
      game.score++;
      // to do: Change snake color
      apple.move();
    } else {
      this.segments.pop();
    }
  };

  setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
      return;
    } else if (this.direction === "right" && newDirection === "left") {
      return;
    } else if (this.direction === "down" && newDirection === "up") {
      return;
    } else if (this.direction === "left" && newDirection === "right") {
      return;
    }
    this.nextDirection = newDirection;
  };
}

class Game {
  intervalId;
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.score = 0;
    this.directions = {
      37: "left",
      38: "up",
      39: "right",
      40: "down",
    };
    this.apple = new Apple(canvas);
    this.snake = new Snake(canvas);
    this.blockSize = 10;
  }

  drawBorder = function (blockSize = 10) {
    this.context.fillStyle = "Gray";
    this.context.fillRect(0, 0, this.canvas.width, blockSize);
    this.context.fillRect(0, this.canvas.height - blockSize, this.canvas.width, blockSize);
    this.context.fillRect(0, 0, blockSize, this.canvas.height);
    this.context.fillRect(
      this.canvas.width - blockSize,
      0,
      blockSize,
      this.canvas.height
    );
  };

  drawScore = function (blockSize = 10) {
    this.context.font = "20px Courier";
    this.context.fillStyle = "Black";
    this.context.textAlign = "left";
    this.context.textBaseline = "top";
    this.context.fillText("score: " + this.score, blockSize, blockSize);
  };

  gameOver = function () {
    clearInterval(this.intervalId);
    this.context.font = "60px Courier";
    this.context.fillStyle = "Black";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(
      "game Over ",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
  };

  go = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawScore();
    this.snake.move(this.apple, this);
    this.snake.draw();
    this.apple.draw();
    this.drawBorder();
  };

  start = function () {
    this.intervalId = setInterval(this.go.bind(this), 200);
    addEventListener("keydown", (event) => {
      const newDirection = this.directions[event.keyCode];
      if (newDirection !== undefined) {
        this.snake.setDirection(newDirection);
      }
    });
  };
}

// const block = new Block(canvas, 20, 30);
// block.drawCircle();
// const apple = new Apple(canvas);
// apple.draw();
// console.log(apple.block.equal(block));
// apple.move();
// apple.draw();

// const snake = new Snake(canvas);
// snake.draw();

const game = new Game(canvas)
game.start();
