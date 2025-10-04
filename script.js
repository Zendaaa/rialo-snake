const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreBoard = document.getElementById("scoreBoard");
const playAgainBtn = document.getElementById("playAgain");
const quitBtn = document.getElementById("quit");

canvas.width = 600;
canvas.height = 400;
const box = 20;

// Gambar
const bgImg = new Image();
bgImg.src = "background.png";
const snakeImg = new Image();
snakeImg.src = "snake.png";
const foodImg = new Image();
foodImg.src = "food.png";

let bgReady = false, snakeReady = false, foodReady = false;
bgImg.onload = () => bgReady = true;
snakeImg.onload = () => snakeReady = true;
foodImg.onload = () => foodReady = true;

// Snake & food
let snake, direction, food, score, game;

function initGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = null;
  score = 0;
  food = {
    x: Math.floor(Math.random() * 29) * box,
    y: Math.floor(Math.random() * 19) * box
  };
  scoreBoard.textContent = "Score: " + score;
  if (game) clearInterval(game);
  game = setInterval(draw, 100);
}

document.addEventListener("keydown", event => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
  // Background
  if (bgReady) ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  else {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Snake
  for (let i = 0; i < snake.length; i++) {
    if (snakeReady) ctx.drawImage(snakeImg, snake[i].x, snake[i].y, box, box);
    else {
      ctx.fillStyle = i === 0 ? "lime" : "green";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
  }

  // Food
  if (foodReady) ctx.drawImage(foodImg, food.x, food.y, box, box);
  else {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
  }

  // Movement
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // Makan food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreBoard.textContent = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * 29) * box,
      y: Math.floor(Math.random() * 19) * box
    };
  } else {
    snake.pop();
  }

  // Kepala baru
  let newHead = { x: snakeX, y: snakeY };

  // Game over
  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX >= canvas.width || snakeY >= canvas.height ||
    snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)
  ) {
    clearInterval(game);
    alert("Game Over! Skor kamu: " + score);
  }

  snake.unshift(newHead);
}

// Tombol
playAgainBtn.addEventListener("click", () => {
  initGame();
});

quitBtn.addEventListener("click", () => {
  clearInterval(game);
  alert("Terima kasih sudah main Rialo Snake!");
});

// Mulai pertama kali
initGame();
