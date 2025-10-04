const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const box = 20;

// Load gambar
const bgImg = new Image();
bgImg.src = "background.png";

const snakeImg = new Image();
snakeImg.src = "snake.png";

const foodImg = new Image();
foodImg.src = "food.png";

// Flag kalau gambar berhasil load
let bgReady = false;
let snakeReady = false;
let foodReady = false;

bgImg.onload = () => bgReady = true;
snakeImg.onload = () => snakeReady = true;
foodImg.onload = () => foodReady = true;

// Kalau gagal load, kasih fallback warna
bgImg.onerror = () => console.warn("Background tidak ditemukan, pakai hitam");
snakeImg.onerror = () => console.warn("Snake tidak ditemukan, pakai kotak hijau");
foodImg.onerror = () => console.warn("Food tidak ditemukan, pakai kotak merah");

// Snake & food
let snake = [{ x: 9 * box, y: 10 * box }];
let direction;
let food = {
  x: Math.floor(Math.random() * 29) * box,
  y: Math.floor(Math.random() * 19) * box
};
let score = 0;

document.addEventListener("keydown", event => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
  // Background
  if (bgReady) {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    if (snakeReady) {
      ctx.drawImage(snakeImg, snake[i].x, snake[i].y, box, box);
    } else {
      ctx.fillStyle = i === 0 ? "lime" : "green";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
  }

  // Draw food
  if (foodReady) {
    ctx.drawImage(foodImg, food.x, food.y, box, box);
  } else {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
  }

  // Old head
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // Snake makan food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 29) * box,
      y: Math.floor(Math.random() * 19) * box
    };
  } else {
    snake.pop();
  }

  // Tambahkan kepala baru
  let newHead = { x: snakeX, y: snakeY };

  // Game over
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)
  ) {
    clearInterval(game);
    alert("Game Over! Rialo Snake Score: " + score);
  }

  snake.unshift(newHead);

  // Tulis score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Rialo Snake Score: " + score, 10, 20);
}

let game = setInterval(draw, 100);
