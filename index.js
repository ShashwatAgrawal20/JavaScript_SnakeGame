const foodSound = new Audio("Public/music/food.mp3");
const gameOverSound = new Audio("Public/music/gameover.mp3");
const move = new Audio("Public/music/move.mp3");
const music = new Audio("Public/music/music.mp3");
const speed = 18;
let snakeMoveDir = { x: 0, y: 0 };
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = {
  x: 3,
  y: 10,
};
let score = 0;

// Game Methods

const main = (ctime) => {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
};

const snakeIsCollide = (snake) => {
  // Snake collide himself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // Snake collide with wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
};

const gameEngine = () => {
  music.play();
  // updating the snake array & food

  if (snakeIsCollide(snakeArr)) {
    gameOverSound.play();
    music.pause();
    snakeMoveDir = { x: 0, y: 0 };
    alert("You Scored : " + score + " Press Enter key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    // music.play();
    score = 0;
    userScore.innerHTML = "Score: " + score;
  }

  // If food is eaten then increment the score and regenerate the score
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score++;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", JSON.stringify(score));
      userHighScore.innerHTML = "HighScore : " + highScore;
    }
    userScore.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + snakeMoveDir.x,
      y: snakeArr[0].y + snakeMoveDir.y,
    });

    // Formula to generate the random number between 2 and 16
    const a = 2;
    const b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += snakeMoveDir.x;
  snakeArr[0].y += snakeMoveDir.y;

  // Displaying the snake
  board.innerHTML = "";
  snakeArr.forEach((e, i) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (i === 0) {
      snakeElement.classList.add("snakeHead");
    } else {
      snakeElement.classList.add("snakeBody");
    }
    board.appendChild(snakeElement);
  });

  // Displaying the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;

  foodElement.classList.add("food");
  board.appendChild(foodElement);
};

// Main Logic
// music.play();
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
  let highScoreVal = 0;
  localStorage.setItem("highScore", JSON.stringify(highScoreVal));
} else {
  highScoreVal = JSON.parse(highScore);
  userHighScore.innerHTML = "HighScore : " + highScore;
}

// requestAnimationFrame produces higher quality animation completely eliminating flicker and shear that can happen when using setTimeout or setInterval, and reduce or completely remove frame skips.
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  // snakeMoveDir = { x: 0, y: 1 }; // Start Game
  // move.play();
  switch (e.key) {
    case "ArrowUp":
      // console.log("ArrowUp");
      snakeMoveDir.x = 0;
      snakeMoveDir.y = -1;
      break;
    case "ArrowDown":
      // console.log("ArrowDown");
      snakeMoveDir.x = 0;
      snakeMoveDir.y = 1;
      break;
    case "ArrowLeft":
      // console.log("ArrowLeft");
      snakeMoveDir.x = -1;
      snakeMoveDir.y = 0;
      break;
    case "ArrowRight":
      // console.log("ArrowRight");
      snakeMoveDir.x = 1;
      snakeMoveDir.y = 0;
      break;

    default:
      music.pause();
      break;
  }
});
