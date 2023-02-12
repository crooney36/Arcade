// Initialize variables for the game
let gameOver = false;
let startButton = document.getElementById("startButton");
let scoreText = document.getElementById("scoreID");
let highScoreText = document.getElementById("highScoreID");
let score = 0;
let highScore = 0;

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
  body: [
    [2, 0],
    [1, 0],
    [0, 0],
  ],
};

let snakeHead = snake.body[0];

// Create snake on the game board
function createSnake() {
  for (let i = 0; i < snake.body.length; i++) {
    table.rows[snake.body[i][1]].cells[snake.body[i][0]].classList.add("snake");
  }
}

// Grow snake when snake head is on food coordinates
function growSnake() {
  if (snake.body[0][0] === food.x && snake.body[0][1] === food.y) {
    snake.body.unshift([food.x, food.y]);
    table.rows[food.y].cells[food.x].classList.remove("food");
    table.rows[food.y].cells[food.x].classList.add("snake");
    createFood();
    score += 1;
    scoreText.innerText = score;
  }
}

// Direction for snake to move
let inputDirection = { x: 1, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

// Add event listener to keydown events
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      console.log("up");
      break;
    case "ArrowDown":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      console.log("down");
      break;
    case "ArrowLeft":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      console.log("left");
      break;
    case "ArrowRight":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      console.log("right");
      break;
  }
});

// Move snake by moving head by the input direction from keyboard input
function moveSnake() {
  let newHead = [
    snakeHead[0] + inputDirection.x,
    snakeHead[1] + inputDirection.y,
  ];
  snake.body.unshift(newHead);
  let tail = snake.body.pop();
  snakeHead = snake.body[0];
  try {
    table.rows[snakeHead[1]].cells[snakeHead[0]].classList.add("snake");
    table.rows[tail[1]].cells[tail[0]].classList.remove("snake");
  } catch (e) {
    console.debug(e);
  }
}

// Check collision if snake runs into boundary of the baord or own body
function checkCollision() {
  // Check if snake head is outside of the game board
  if (
    snake.body[0][0] < 0 ||
    snake.body[0][0] > 30 ||
    snake.body[0][1] < 0 ||
    snake.body[0][1] > 14
  ) {
    if (score > highScore) {
      highScore = score;
      highScoreText.innerText = highScore;
    }
    gameOver = true;
  }
  // Check if snake head is on the same coordinates as snake body
  // if (
  //   snake.body[0][0] === snake.body[1][0] &&
  //   snake.body[0][1] === snake.body[1][1]
  // ) {
  //   if (score > highScore) {
  //     highScore = score;
  //     highScoreText.innerText = highScore;
  //   }
  //   gameOver = true;
  // }
  // for (let i = 0; i < snake.length - 1; i++) {
  //   if (
  //     snakeHead[0] === snake.body[i][0] &&
  //     snakeHead[1] === snake.body[i][1]
  //   ) {
  //     if (score > highScore) {
  //       highScore = score;
  //       highScoreText.innerText = highScore;
  //     }
  //     gameOver = true;
  //   }
  // }
}

// Render snake and food on the game board
function render() {
  // Clear game board if gameOver is triggered
  if (gameOver) {
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 30; j++) {
        gameBoard[i][j].classList.remove("snake");
        gameBoard[i][j].classList.remove("food");
      }
    }
  } else if (!gameOver) {
    // Render snake
    for (let i = 0; i < snake.length; i++) {
      gameBoard[snake[i][1]][snake[i][0]].classList.add("snake");
      table.rows[snake[i][1]].cells[snake[i][0]];
    }
    // Render food
    table.rows[food.y].cells[food.x].classList.add("food");
  }
}

// Create food object
let food = {
  x: 0,
  y: 0,
};

// Create food on random coordinates on the game board
function createFood() {
  food.x = Math.floor(Math.random() * 29);
  food.y = Math.floor(Math.random() * 13);
}

function reset() {
  gameOver = false;
  score = 0;
  scoreText.innerText = score;
  snake = {
    body: [
      [2, 0],
      [1, 0],
      [0, 0],
    ],
  };
  snakeHead = snake.body[0];
  inputDirection = { x: 1, y: 0 };
  lastInputDirection = { x: 0, y: 0 };
}
// Start game with start button and set interval for snake to move.
function startGame() {
  reset();
  createSnake();
  createFood();
  let timer = setInterval(function () {
    if (gameOver) {
      clearInterval(timer);
    }
    checkCollision();
    moveSnake();
    growSnake();
    render();
  }, 300);
}

// Add event listener to start button
startButton.addEventListener("click", startGame);

console.log(gameBoard);
