function draw() {
  // Gambar background dulu
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // Gambar ular
  for (let i = 0; i < snake.length; i++) {
    ctx.drawImage(snakeImg, snake[i].x, snake[i].y, box, box);
  }

  // Gambar makanan (pastikan selalu muncul di atas background)
  ctx.drawImage(foodImg, food.x, food.y, box, box);

  // Update posisi ular
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "LEFT") snakeX -= box;
  if (direction == "UP") snakeY -= box;
  if (direction == "RIGHT") snakeX += box;
  if (direction == "DOWN") snakeY += box;

  // Cek kalau makan makanan
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  // Game over kalau nabrak diri sendiri
  for (let i = 0; i < snake.length; i++) {
    if (snakeX == snake[i].x && snakeY == snake[i].y) {
      clearInterval(game);
    }
  }

  snake.unshift(newHead);

  // Gambar skor
  ctx.fillStyle = "#000";
  ctx.font = "20px Poppins";
  ctx.fillText("Score: " + score, box, box);
}
