const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const cellSize = 20;
let snake, food, dx, dy, score, gameLoop;

// Load gambar
const bgImg = new Image();
bgImg.src = "background.png";

const snakeImg = new Image();
snakeImg.src = "snake.png";

const foodImg = new Image();
foodImg.src = "food.png";

function initGame() {
  snake = [{ x: 100, y: 100 }];
  dx = cellSize;
  dy = 0;
  score = 0;
  placeFood();
  if (gameLoop) clearInterval(gameLoop);
  gameLoop = setInterval(update, 100);
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize,
    y: Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize,
  };
}

function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Cek tabrakan (Game Over)
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some(part => part.x === head.x && part.y === head.y)
  ) {
    clearInterval(gameLoop);
    alert("Game Over! Score: " + score);
    return;
  }

  snake.unshift(head);

  // Kalau makan makanan
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  // Gambar background
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  // Gambar ular
  snake.forEach(part => {
    ctx.drawImage(snakeImg, part.x, part.y, cellSize, cellSize);
  });

  // Gambar makanan
  ctx.drawImage(foodImg, food.x, food.y, cellSize, cellSize);

  // Score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

// Kontrol arah
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -cellSize;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0; dy = cellSize;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -cellSize; dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = cellSize; dy = 0;
  }
});

// Tombol
document.getElementById("restartBtn").addEventListener("click", initGame);
document.getElementById("quitBtn").addEventListener("click", () => {
  clearInterval(gameLoop);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText("Thanks for playing!", 180, 200);
});

initGame();
