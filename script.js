// Настройка элемента холста canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Ширина и высота canvas
let width = canvas.width;
let height = canvas.height;

// Устанавливаем счет по умолчанию = 0
let score = 0;

// Вычисляем ширину и высоту в ячейках
let blockSize = 10;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;

// Функция для рисования рамки
let drawBorder = function () {
  ctx.fillStyle = "Gray";
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0, blockSize, height);
};

drawBorder();
