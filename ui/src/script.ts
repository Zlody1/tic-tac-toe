// Define the currentPlayer variable outside the function
let currentPlayer: string = 'X';
let scoreX = 0;
let scoreO = 0;

// Define the function to handle the click event
function handleCellClick(event: MouseEvent): void {
    let winner = checkWinner();

    if (winner) {

        return; // If there's already a winner, do nothing
    }


    const cell = event.target as HTMLDivElement;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Update currentPlayer for the next activation
    }
    winner = checkWinner();
    if (winner) {
        if (winner === 'X') {
            scoreX++;
        } else {
            scoreO++;
        }
        console.log(`Winner: ${winner}`, scoreX, scoreO);
        updateScoreboard(scoreX, scoreO);
        showWinner();
        // Add to game history after winner is determined
        addGameHistoryRow(winner, new Date().toLocaleString());
    }

}

// Attach the event listener to all cells
const cells: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-cell]');
cells.forEach((cell: HTMLDivElement) => {
    cell.addEventListener('click', handleCellClick);
});

// Add functionality to reset the game
const resetButton: HTMLButtonElement = document.getElementById('reset-button') as HTMLButtonElement;
resetButton.addEventListener('click', () => {
    hideWinner();
    cells.forEach((cell: HTMLDivElement) => {
        cell.textContent = ''; // Clear the content of each cell
        delete cell.dataset.currentPlayer; // Remove any stored data
    });
    currentPlayer = 'X'; // Reset the currentPlayer to 'X'
});

function cellState(index: number): string {
    const cell = cells[index];
    return cell.textContent || '';
}
// returns X or O or when someone wins and empty string when no winners
function checkWinner(): string | null {
    const winningCombinations: number[][] = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal \
        [2, 4, 6]  // Diagonal /
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cellState(a) && cellState(a) === cellState(b) && cellState(a) === cellState(c)) {
            return cellState(a); // Return the winner ('X' or 'O')
        }
    }
    return ""; // No winner yet
}

function showWinner(): void {
    const message = document.getElementById('message') as HTMLDivElement;
    message.removeAttribute('hidden');

}

function hideWinner(): void {
    const message = document.getElementById('message') as HTMLDivElement;
    message.setAttribute('hidden', 'true');
}

function updateScoreboard(scoreX: number, scoreO: number): void {
    const scoreXElement = document.getElementById('score-x') as HTMLTableCellElement;
    const scoreOElement = document.getElementById('score-o') as HTMLTableCellElement;

    scoreXElement.textContent = scoreX.toString();
    scoreOElement.textContent = scoreO.toString();
}

/**
 * Appends a new row with two fields to the Game History table.
 * @param {string} field1 - The first field (e.g., player or description)
 * @param {string} field2 - The second field (e.g., result or timestamp)
 */
function addGameHistoryRow(field1: string, field2: string): void {
    const historyTable = document.querySelector('#game-history');
    if (!historyTable) return;

    // If this is the first entry, clear the placeholder text
    if (historyTable.textContent === 'No games played yet.') {
        historyTable.textContent = '';
    }

    // Create a new row with two columns
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    td1.textContent = field1;
    td2.textContent = field2;
    tr.appendChild(td1);
    tr.appendChild(td2);

    // If #game-history is a td, append the row to its parent table
    const parentTable = historyTable.closest('table');
    if (parentTable) {
        parentTable.appendChild(tr);
    }
}
/**
 * this function starts a local game by resetting the game state
 */
const startLocalGame: HTMLButtonElement = document.getElementById('start-game-button') as HTMLButtonElement;
startLocalGame.addEventListener('click', () => {
    // log something to the console
    console.log('Starting a new local game...');

});

const startOnlineGame: HTMLButtonElement = document.getElementById('start-online-game-button') as HTMLButtonElement;
startOnlineGame.addEventListener('click', () => {
    // log something to the console
    console.log('Starting a new online game...');
    fetchGreeting()

});

async function fetchGreeting(): Promise<string> {
    const response = await fetch('/');
    if (!response.ok) {
        throw new Error('Failed to fetch greeting');
    }
    const data = await response.json();
    return data; // Assumes server responds with { greeting: "Hello" }
}