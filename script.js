let btn = document.getElementById("btn");
let input = document.getElementById("input");
btn.addEventListener("click", () => {
    if (input.value === "") {
        alert("Enter the number of queens first!");
    } else if (parseInt(input.value) <= 3) { // Parse input value as an integer
        alert("Number of queens is too low.");
    } else {
        solveNQueens(parseInt(input.value)); // Parse input value as an integer
    }
})


function solveNQueens(n) {
    let table = document.getElementById("table");
    table.innerHTML = "";

    // Create an empty chessboard represented by a 2D array
    let chessboard = new Array(n);
    for (let i = 0; i < n; i++) {
        chessboard[i] = new Array(n).fill('.');
    }

    // Call the solve function to place queens on the chessboard
    solve(chessboard, 0, n);


    for (let i = 0; i < n; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < n; j++) {
            let cell = document.createElement("td");
            if(chessboard[i][j] === "Q"){
                    let i = document.createElement("i");
                    i.className = "icon-queen";
                    cell.appendChild(i);
                    cell.style.border =" 2px solid #f4e4be";

            }else {
                cell.textContent = "";
            }

            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function solve(chessboard, row, n) {
    // Base case: If all queens are placed, return true
    if (row === n) {
        return true;
    }

    for (let col = 0; col < n; col++) {
        // Check if it's safe to place a queen in this cell
        if (isValidMove(chessboard, row, col, n)) {
            // Place the queen in this cell
            chessboard[row][col] = 'Q';
            // Recursively try to place queens in the next row
            if (solve(chessboard, row + 1, n, table)) {
                return true;
            }

            chessboard[row][col] = '.';

        }
    }
    return false;
}




function isValidMove(chessboard, row, col, n) {
    // Check if there is a queen in the same column
    for (let i = 0; i < row; i++) {
        if (chessboard[i][col] === 'Q') {
            return false;
        }
    }

    // Check the upper-left diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (chessboard[i][j] === 'Q') {
            return false;
        }
    }

    // Check the upper-right diagonal
    for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (chessboard[i][j] === 'Q') {
            return false;
        }
    }

    return true;
}
