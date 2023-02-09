let gameOver = false;
let startButton = document.getElementById("startButton");

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

//create game board from table for snake to navigate
let gameBoard = [];
for (let i = 0; i < 14; i++) {
  gameBoard.push([]);
  for (let j = 0; j < 30; j++) {
    gameBoard[i].push(table.rows[i].cells[j]);
  }
}

//create a snake
let snake = {
  head: [0, 0],
  body: [],
  tail: [],
};

function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    gameBoard[snake[i]].classList.add("snake");
  }
  let snakeHead = snake[snake.length - 1];
}
// grow snake
function growSnake() {
  if (snakeHead[0] === food.x && snakeHead[1] === food.y) {
    snake.unshift(snake[0]);
    createFood();
  }
}

// create food
let food = {
  x: 0,
  y: 0,
};

function createFood() {
  food.x = Math.floor(Math.random() * 30);
  food.y = Math.floor(Math.random() * 14);
  gameBoard[food.y][food.x].classList.add("food");
}
//check collision if snake runs into boundary of the baord or own body
function checkCollision() {
  if (
    snakeHead[0] < 0 ||
    snakeHead[0] > 29 ||
    snakeHead[1] < 0 ||
    snakeHead[1] > 13
  ) {
    gameOver = true;
  }
  for (let i = 0; i < snake.length - 1; i++) {
    if (snakeHead[0] === snake[i][0] && snakeHead[1] === snake[i][1]) {
      gameOver = true;
    }
  }
}

//move snake
let inputDirection = { x: 1, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

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

//move snake
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

//start game
function startGame() {
  createSnake();
  createFood();
  let timer = setInterval(function () {
    moveSnake();
    growSnake();
    checkCollision();
    if (gameOver) {
      clearInterval(timer);
    }
  }, 100);
}

startButton.addEventListener("click", startGame);
