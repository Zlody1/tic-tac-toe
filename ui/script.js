// Define the currentPlayer variable outside the function
let currentPlayer = 'X';

// Define the function to handle the click event
function handleCellClick(event) {
    const cell = event.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Update currentPlayer for the next activation
    }
}

// Attach the event listener to all cells
const cells = document.querySelectorAll('[data-cell]');
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Add functionality to reset the game
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = ''; // Clear the content of each cell
        delete cell.dataset.currentPlayer; // Remove any stored data
    });
    currentPlayer = 'X'; // Reset the currentPlayer to 'X'
});