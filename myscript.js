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
    for (let i = 0; i < n; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < n; j++) {
            let cell = document.createElement("td");
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    solve(chessboard, 0, n, table);

}

async function solve(chessboard, row, n, table) {
    // Base case: If all queens are placed, return true
    if (row === n) {
        return true;
    }

    for (let col = 0; col < n; col++) {
        // Check if it's safe to place a queen in this cell
        if (isValidMove(chessboard, row, col, n)) {
            // Place the queen in this cell
            chessboard[row][col] = 'Q';
            // table.children[row].children[col].innerText = 'Q';
            // let i = document.createElement("i");
            // i.className = "icon-queen";
            // cell.style.border = " 2px solid #f4e4be";
            table.children[row].children[col].innerHTML = "<i class='icon-queen'></i>";
            table.children[row].children[col].style.border ='2px solid #f4e4be'
            // Use await to introduce a delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Recursively try to place queens in the next row
            if (await solve(chessboard, row + 1, n, table)) {
                return true;
            }

            // If placing a queen in this cell didn't lead to a solution,
            // backtrack by removing the queen from this cell
            chessboard[row][col] = '.';
            table.children[row].children[col].innerHTML = "";
            table.children[row].children[col].style.border ='1px solid rgba(255,255,255,0.45)';

        }
    }

    return false;
}


function isValidMove(chessboard, row, col, n,table) {
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
