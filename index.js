const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

const FIELD = createField()

let dimension = 3;
let turn = CROSS;
let movesCount = dimension * dimension;

startGame();
addResetListener();

function startGame() {
    dimension = prompt('Введите размер поля. (Например, 3 для поля 3х3)', 3);
    renderGrid(dimension);
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

function createField(dimension = 3) {
    let field = []

    for (let i = 0; i < dimension; i++) {
        field.push(Array(dimension).fill(EMPTY));
    }

    return field;
}

function cellClickHandler(row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (FIELD[row][col] !== EMPTY)
        return;

    FIELD[row][col] = turn;
    renderSymbolInCell(turn, row, col);
    turn = turn === CROSS ? ZERO : CROSS;
    movesCount--;

    const winner = findWinner(row, col);
    if (winner) {
        return;
    }

    if (movesCount) {
        alert('Победила дружба');
        return;
    }
}

function findWinner() {
    for (let i = 0; i < FIELD.length; i++) {
        if (FIELD[i][0] !== EMPTY && FIELD[i].every(x => x === FIELD[i][0])) {
            for (let j = 0; j < FIELD[0].length; j++){
                renderSymbolInCell(FIELD[i][j], i, j, '#F00')
            }
            return FIELD[i];
        }
    }

    for (let i = 0; i < FIELD.length; i++) {
        if (FIELD[0][i] && FIELD.map(arr => arr[i]).every(x => x === FIELD[0][i])) {
            for (let j = 0; j < FIELD.length; j++){
                renderSymbolInCell(FIELD[j][i], j, i, '#F00')
            }
            return FIELD.map(arr => arr[i]);
        }
    }

    let mainDiagonal = [];
    let otherDiagonal = [];

    for (let i = 0; i < FIELD.length; i++) {
        diagonal.push(FIELD[i][i])
        diagonal.push(FIELD[i][FIELD[0].length - i - 1])
    }

    if (mainDiagonal.every(x => x === diagonal[0])) {
        for (let i = 0; i < FIELDlength; i++){
            renderSymbolInCell(FIELD[i][i], i, i, '#F00')
        }
        return mainDiagonal;
    }
    else if (otherDiagonal.every(x => x === diagonal[0])) {
        for (let i = 0; i < FIELDlength; i++){
            renderSymbolInCell(FIELD[i][FIELD.length - i - 1], i, FIELD.length - i - 1, '#F00')
        }
        return otherDiagonal;
    }

    return false;
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
    console.log('reset!');
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
