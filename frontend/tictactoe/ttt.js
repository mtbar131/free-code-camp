// Pregame view
const welcomeContainer = document.querySelector(".welcome-container");
const gameContainer = document.querySelector(".game-container");
const xBtn = document.getElementById("x-select");
const oBtn = document.getElementById("o-select");
var huPlayer;
var aiPlayer;

xBtn.addEventListener("click", () => {
  huPlayer = "X";
  aiPlayer = "O";
  startGame();
});
oBtn.addEventListener("click", () => {
  huPlayer = "O";
  aiPlayer = "X";
  startGame();
});

// Game view
var origBoard;
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];
const cells = document.querySelectorAll(".hook");

// Functions
function startGame() {
  welcomeContainer.style.display = "none";
  gameContainer.style.display = "inherit";
  resetGame();
}
function resetGame() {
  origBoard = Array.from(Array(9).keys());

  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].addEventListener("click", turnClick, false);
  }
}

function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
	}
}
function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}
function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
}
function emptySquares() {
  return origBoard.filter(s => typeof s == "number");
}
function minimax(newBoard, player) {
  // Make ai unbeatable
  // Copied from https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
  var availSpots = emptySquares(newBoard);

  if (checkWin(newBoard, player)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 20 };
  } else if (availSpots.length == 0) {
    return { score: 0 };
  }

  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == aiPlayer) {
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player == aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

function checkTie() {
  if (emptySquares().length == 0) {
    // Remove event listeners
    for (var i = 0; i < cells.length; i++) {
      cells[i].removeEventListener("click", turnClick, false);
    }

    declareWinner("Tied game!");
    return true;
  }

  return false;
}
function checkWin(board, player) {
  // Find owned spaces on board
  // Copied from https://youtu.be/P2TcQ3h0ipQ?t=21m59s
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}
function gameOver(gameWon) {
  declareWinner(gameWon.player == huPlayer ? "Player wins!" : "Computer wins");

  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
}
function declareWinner(message) {
  setTimeout(() => {
    alert(message);
    resetGame();
  }, 200);
}
