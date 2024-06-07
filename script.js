// Declare the array to store clicked box indices
let boxesClicked = [];
let isPlayerX = true; // This will alternate between X and O

// Function to handle box clicks
function clickBox(event) {
  // Check if the clicked element is a box and is empty
  if (
    event.target.classList.contains("box") &&
    event.target.textContent === ""
  ) {
    // Determine current player
    let currentPlayer = isPlayerX ? "X" : "O";
    let currentClass = isPlayerX ? "x" : "o"; // Class based on player

    // Get the index of the clicked box
    const index = event.target.getAttribute("data-index");

    // Push the index to the array
    boxesClicked.push(index);

    // Set the box content to the current player and add class
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentClass); // Add class to the box

    // Log the clicked box index and player
    console.log(`Box ${index} clicked by player ${currentPlayer}`);

    // Toggle the player
    isPlayerX = !isPlayerX;

    // Log the current array of clicked box indices
    console.log("Boxes clicked so far:", boxesClicked);
  }
}

// Add the event listener to the tic-tac-toe container
document.querySelector(".tic-tac-toe").addEventListener("click", clickBox);

function reset() {}
