// Define the currentPlayer variable outside the function
let currentPlayer: string = 'X';

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
    showWinner();
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