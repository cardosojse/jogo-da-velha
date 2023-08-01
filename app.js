const boardItems = document.querySelectorAll("[data-items]");
const board = document.querySelector("[data-board]");
const winMsg = document.querySelector(".win-msg");
const winMsgText = document.querySelector(".win-msg-text");
const restartButton = document.querySelector(".win-msg-button");

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    isCircleTurn = false;
    for (const item of boardItems){
        item.classList.remove('circle');
        item.classList.remove('x');
        item.removeEventListener("click", handleClick);
        item.addEventListener("click", handleClick, { once: true});
    }
    setBoard();
    winMsg.classList.remove("show-win-msg");
}

const endGame = (isDraw) => {
    if (isDraw){
        winMsgText.innerText = 'Empate!';
    } else {
        winMsgText.innerText = isCircleTurn ? 'Bola venceu!' : 'X venceu!';
    }
    winMsg.classList.add("show-win-msg");
}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return boardItems[index].classList.contains(currentPlayer);
        });
    });
}

const checkForDraw = () => {
    return [... boardItems].every(item => {
        return item.classList.contains('x') || item.classList.contains('circle');
    });
}

const setBoard = () => {
    board.classList.remove("circle");
    board.classList.remove("x");
    if (isCircleTurn){
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
}
const placeMark = (item, classToAdd) => {
    item.classList.add(classToAdd);
}

const swapTurn = () => {
    isCircleTurn = !isCircleTurn;
    setBoard();
}

const handleClick = (e) => {
    const item = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';
    placeMark(item, classToAdd);
    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw();
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        swapTurn();
    }
}
startGame();
restartButton.addEventListener("click", startGame);