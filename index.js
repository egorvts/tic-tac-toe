const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let FIELD = [];
let dimension = 3;
let turn;
let movesCount;
let gameOver = false;

startGame();
addResetListener();

function startGame() {
    let input = prompt('Введите размер поля (например 3)', 3);
    dimension = Number(input);

    if (!dimension || dimension < 2) {
        dimension = 3;
    }

    FIELD = createField(dimension);
    movesCount = dimension * dimension;
    turn = CROSS;
    gameOver = false;

    renderGrid(dimension);
}

function createField(dimension) {
    let field = [];

    for (let i = 0; i < dimension; i++) {
        field.push(Array(dimension).fill(EMPTY));
    }

    return field;
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {

    if (gameOver) return;

    if (FIELD[row][col] !== EMPTY) return;

    FIELD[row][col] = turn;
    renderSymbolInCell(turn, row, col);
    movesCount--;

    const winnerData = findWinner();

    if (winnerData) {
        const { winner, cells } = winnerData;

        cells.forEach(([r, c]) => {
            renderSymbolInCell(FIELD[r][c], r, c, 'red');
        });

        alert(`Победил ${winner}`);
        gameOver = true;
        return;
    }

    if (movesCount === 0) {
        alert('Победила дружба');
        gameOver = true;
        return;
    }

    turn = turn === CROSS ? ZERO : CROSS;
}

function findWinner() {

    const size = FIELD.length;

    // Проверка строк
    for (let i = 0; i < size; i++) {
        if (
            FIELD[i][0] !== EMPTY &&
            FIELD[i].every(cell => cell === FIELD[i][0])
        ) {
            return {
                winner: FIELD[i][0],
                cells: FIELD[i].map((_, index) => [i, index])
            };
        }
    }

    for (let i = 0; i < size; i++) {
        const column = FIELD.map(row => row[i]);

        if (column[0] !== EMPTY && column.every(cell => cell === column[0])) {
            return {
                winner: column[0],
                cells: column.map((_, index) => [index, i])
            };
        }
    }

    let mainDiagonal = [];
    for (let i = 0; i < size; i++) {
        mainDiagonal.push(FIELD[i][i]);
    }

    if (mainDiagonal[0] !== EMPTY && mainDiagonal.every(cell => cell === mainDiagonal[0])) {
        return {
            winner: mainDiagonal[0],
            cells: mainDiagonal.map((_, index) => [index, index])
        };
    }

    let otherDiagonal = [];
    for (let i = 0; i < size; i++) {
        otherDiagonal.push(FIELD[i][size - i - 1]);
    }

    if (otherDiagonal[0] !== EMPTY && otherDiagonal.every(cell => cell === otherDiagonal[0])) {
        return {
            winner: otherDiagonal[0],
            cells: otherDiagonal.map((_, index) => [index, size - index - 1])
        };
    }

    return null;
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);
    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    startGame();
}