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

let tableArray = Array.from(table.children);

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

// grow snake
function growSnake() {
  if (snakeHead[0] === food.x && snakeHead[1] === food.y) {
    snake.unshift(snake[0]);
    createFood();
  }
}

let state;

function buildInitialState() {}

// render
function renderState() {}

// maybe a dozen or so helper functions for tiny pieces of the interface

// listeners
function onBoardClick() {
  // update state, maybe with another dozen or so helper functions...

  renderState(); // show the user the new state
}

// add to above
function tick() {
  // this is an incremental change that happens to the state every time you update...

  renderState();
}

setInterval(tick, 1000 / 30); // as close to 30 frames per second as possible

// now you might have things like
document.addEventListener("keydown", function (event) {
  // here you might read which key was pressed and update the state accordingly
});
