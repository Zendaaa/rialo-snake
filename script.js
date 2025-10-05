// --- Rialo Snake Game ---
// Pastikan kamu punya: background.png, snake.png, food.png di folder yang sama

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Ukuran tiap kotak
const box = 20;

// Gambar aset
const bg = new Image();
bg.src = "background.png";

const snakeImg = new Image();
snakeImg.src = "snake.png";

const foodImg = new Image();
foodImg.src = "food.png";

// Posisi awal ular dan makanan
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 29 + 1) * box,
  y: Math.floor(Math.random() * 19 + 3) * box
};

let score = 0;
let d;

// Kontrol
document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode === 37 && d !== "RIGHT") d = "LEFT";
  else if (event.keyCode === 38 && d !== "DOWN") d = "UP";
  else if (event.keyCode === 39 && d !== "LEFT") d = "RIGHT";
  else if (event.keyCode === 40 && d !== "UP") d = "DOWN";
}

// Deteksi tabrakan
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

// Gambar game
function draw() {
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.drawImage(snakeImg, snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y, box, box);

  // Posisi kepala ular
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d === "LEFT") snakeX -= box;
  if (d === "UP") snakeY -= box;
  if (d === "RIGHT") snakeX += box;
  if (d === "DOWN") snakeY += box;

  // Ular makan
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 29 + 1) * box,
      y: Math.floor(Math.random() * 19 + 3) * box
    };
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

  // Game over
  if (
    snakeX < 0 ||
    snakeX >= canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    showGameOver();
  }

  snake.unshift(newHead);

  // Skor
  ctx.fillStyle = "#000";
  ctx.font = "20px Poppins";
  ctx.fillText("Score: " + score, box, 1.5 * box);
}

// Tampilan Game Over
function showGameOver() {
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0, 0, 0, 0.6)";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.color = "#fff";
  overlay.style.fontFamily = "Poppins, sans-serif";
  overlay.innerHTML = `
    <h1 style="margin-bottom: 20px;">Game Over</h1>
    <button id="playAgain" style="padding:10px 20px;margin:5px;font-size:16px;border:none;border-radius:8px;background:#a9ddd3;cursor:pointer;">Play Again</button>
  `;
  document.body.appendChild(overlay);

  document.getElementById("playAgain").onclick = () => {
    document.body.removeChild(overlay);
    resetGame();
  };
}

// Reset game
function resetGame() {
  score = 0;
  snake = [{ x: 9 * box, y: 10 * box }];
  food = {
    x: Math.floor(Math.random() * 29 + 1) * box,
    y: Math.floor(Math.random() * 19 + 3) * box
  };
  d = undefined;
  game = setInterval(draw, 120);
}

let game = setInterval(draw, 120);
