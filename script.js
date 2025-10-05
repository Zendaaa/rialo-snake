window.onload = () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const box = 32;

  const bg = new Image();
  bg.src = "background.png";

  const snakeImg = new Image();
  snakeImg.src = "snake.png";

  const foodImg = new Image();
  foodImg.src = "food.png";

  let snake = [];
  snake[0] = { x: 9 * box, y: 10 * box };

  let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
  };

  let score = 0;
  let direction;

  document.addEventListener("keydown", directionControl);

  function directionControl(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  }

  function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
      if (head.x === array[i].x && head.y === array[i].y) {
        return true;
      }
    }
    return false;
  }

  function draw() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
      ctx.drawImage(snakeImg, snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Makan makanan
    if (snakeX === food.x && snakeY === food.y) {
      score++;
      food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
      };
    } else {
      snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    // Game over
    if (
      snakeX < box ||
      snakeX > 17 * box ||
      snakeY < 3 * box ||
      snakeY > 17 * box ||
      collision(newHead, snake)
    ) {
      clearInterval(game);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "#000";
    ctx.font = "20px Poppins";
    ctx.fillText("Score: " + score, box, box);
  }

  const game = setInterval(draw, 120);
};
