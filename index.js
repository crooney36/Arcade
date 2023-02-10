// Initialize variables for the game
let gameOver = false;
let startButton = document.getElementById("startButton");
let scoreText = document.getElementById("scoreID");
let highScoreText = document.getElementById("highScoreID");
const snakeColor = "forestgreen";
const foodColor = "red";
let score = 0;
let highScore = 0;
let speed = 100;

// Create game board
let table = document.getElementsByTagName("table")[0];
function makeRow() {
  const row = document.createElement("tr");
  for (let i = 0; i < 30; i++) {
    const td = document.createElement("td");
    row.appendChild(td);
  }
  table.appendChild(row);
}
for (let i = 0; i < 14; i++) {
  makeRow();
}

// Create game board array from table for snake to navigate (unfortunately o(n^2) complexity)
let gameBoard = [];
for (let i = 0; i < 14; i++) {
  gameBoard.push([]);
  for (let j = 0; j < 30; j++) {
    gameBoard[i].push(table.rows[i].cells[j]);
  }
}

// Create snake object
let snake = {
  head: [0, 0],
  body: [],
  tail: [],
  snakeColor: "forestgreen",
};

// Create snake array
function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    gameBoard[snake[i]].classList.add("snake");
  }
  let snakeHead = snake[snake.length - 1];
}
// Grow snake when snake head is on food coordinates
function growSnake() {
  if (snakeHead[0] === food.x && snakeHead[1] === food.y) {
    snake.unshift(snake[0]);
    createFood();
    score += 1;
    scoreText.innterText = score;
  }
}

// Create food object
let food = {
  x: 0,
  y: 0,
  foodColor: "red",
};

// Create food on random coordinates on the game board
function createFood() {
  food.x = Math.floor(Math.random() * 30);
  food.y = Math.floor(Math.random() * 14);
  gameBoard[food.y][food.x].classList.add("food");
}
// Check collision if snake runs into boundary of the baord or own body
function checkCollision() {
  // Check if snake head is outside of the game board
  if (
    snakeHead[0] < 0 ||
    snakeHead[0] > 29 ||
    snakeHead[1] < 0 ||
    snakeHead[1] > 13
  ) {
    gameOver = true;
    if (score > highScore) {
      highScore = score;
      highScoreText.innerText = highScore;
    }
  }
  // Check if snake head is on the same coordinates as snake body
  for (let i = 0; i < snake.length - 1; i++) {
    if (snakeHead[0] === snake[i][0] && snakeHead[1] === snake[i][1]) {
      gameOver = true;
      if (score > highScore) {
        highScore = score;
        highScoreText.innerText = highScore;
      }
    }
  }
}
// Add event listener to keydown event
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "Up":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case "Down":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case "Left":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case "Right":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
  }
});

// Move snake by adding new head and removing tail from snake array
function moveSnake() {
  let snakeHead = snake[snake.length - 1];
  let newHead = [
    snakeHead[0] + inputDirection.x,
    snakeHead[1] + inputDirection.y,
  ];
  snake.push(newHead);
  snake.shift();
  gameBoard[snakeHead[1]][snakeHead[0]].classList.remove("snake");
  gameBoard[newHead[1]][newHead[0]].classList.add("snake");
}

// Move snake with input from key board arrows
let inputDirection = { x: 1, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

// Start game with start button and set interval for snake to move.
// Parameter for speed/difficulty --- default is 100
function startGame(speed) {
  createSnake();
  createFood();
  let timer = setInterval(function () {
    moveSnake();
    growSnake();
    checkCollision();
    if (gameOver) {
      clearInterval(timer);
    }
  }, speed);
}

// Add event listener to start button
startButton.addEventListener("click", startGame);
