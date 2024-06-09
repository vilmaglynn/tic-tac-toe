let tictactoe = document.querySelector(".tic-tac-toe");
let reset = document.querySelector(".reset");
let boxes = document.querySelectorAll(".box");
let winnerMessage = document.querySelector(".winner-message");
let isPlayerX = true; // This will alternate between X and O
let counterX = 0;
let counterO = 0;

// Elements to display win counts
let xWinsDisplay = document.getElementById("x-wins");
let oWinsDisplay = document.getElementById("o-wins");

// Function to check for a win
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6] // Diagonal from top-right to bottom-left
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[a].textContent === boxes[c].textContent
    ) {
      console.log(`Player ${boxes[a].textContent} wins!`);

      // Highlight the winning combination
      combination.forEach((index) => {
        if (boxes[a].textContent === "X") {
          boxes[index].classList.add("winnerX");
        } else if (boxes[a].textContent === "O") {
          boxes[index].classList.add("winnerO");
        }
      });

      // Update winner message
      winnerMessage.textContent = `Player ${boxes[a].textContent} wins!`;

      // Update win counters
      if (boxes[a].textContent === "X") {
        counterX++;
        xWinsDisplay.textContent = counterX; // Update display for X wins
      } else if (boxes[a].textContent === "O") {
        counterO++;
        oWinsDisplay.textContent = counterO; // Update display for O wins
      }

      return boxes[a].textContent;
    }
  }

  const isTie = [...boxes].every((box) => box.textContent !== "");
  if (isTie) {
    console.log("It's a tie!");
    winnerMessage.textContent = "It's a tie!";
    return "Tie";
  }

  return null;
}

// Function to handle box clicks
function clickBox(event) {
  if (
    event.target.classList.contains("box") &&
    event.target.textContent === ""
  ) {
    let currentPlayer = isPlayerX ? "X" : "O";
    let currentClass = isPlayerX ? "x" : "o";

    event.target.textContent = currentPlayer;
    event.target.classList.add(currentClass);

    const winner = checkWinner();
    if (winner) {
      console.log(`Winner is: ${winner}`);
      // Optionally, you can disable further clicks here if needed
      tictactoe.removeEventListener("click", clickBox);
      return;
    }

    isPlayerX = !isPlayerX;
  }
}

// Add the event listener to the tic-tac-toe container
tictactoe.addEventListener("click", clickBox);

// Reset button event listener
reset.addEventListener("click", function resetGame() {
  console.log("reset button clicked");

  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("x", "o", "winnerX", "winnerO"); // Remove any player and winning classes
  });

  winnerMessage.textContent = "No winner yet";

  isPlayerX = true;

  // Re-enable the click listener for the game board
  tictactoe.addEventListener("click", clickBox);
});
