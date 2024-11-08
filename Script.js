const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (event) => {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (boardState[index] !== '' || !gameActive) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    displayResult(`${currentPlayer} wins!`);
    gameActive = false;
  } else if (!boardState.includes('')) {
    displayResult(`It's a draw!`);
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
  }
};

const checkWin = () => {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
};

const displayResult = (message) => {
  resultMessage.textContent = message;
  resultScreen.style.display = 'flex';
};

const restartGame = () => {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
};

const newGame = () => {
  restartGame();
  resultScreen.style.display = 'none';
};

board.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', newGame);
statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
