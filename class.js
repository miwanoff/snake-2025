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
}

class Apple {
  constructor(canvas) {
    this.block = new Block(canvas, 10, 20);
    this.color = "LimeGreen";
    // this.canvas = canvas;    
  }
  draw = function () {
    this.block.drawCircle(this.color);
  };

}
// const block = new Block(canvas, 10, 20);
// block.drawCircle();
// const apple = new Apple(canvas);
// apple.draw();
