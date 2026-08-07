// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');
const readlineSync = require('readline-sync');

function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join('  '));
    }
}

function readMatrix(rows, cols) {
    const matrix = [];
    for (let i = 1; i <= rows; i++) {
        while (true) {
            const input = readlineSync.question(`Enter row ${i}: `).trim();
            const row = input.split(/\s+/).map(Number);
            if (row.length === cols && !row.some(isNaN)) {
                matrix.push(row);
                break;
            }
            console.log(`Error: Please enter exactly ${cols} numbers separated by spaces.`);
        }
    }
    return matrix;
}

function transposeMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const transposed = [];

    for (let j = 0; j < cols; j++) {
        const newRow = [];
        for (let i = 0; i < rows; i++) {
            newRow.push(matrix[i][j]);
        }
        transposed.push(newRow);
    }
    return transposed;
}

function addMatrices(matrixA, matrixB) {
    const rows = matrixA.length;
    const cols = matrixA[0].length;
    const result = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(matrixA[i][j] + matrixB[i][j]);
        }
        result.push(row);
    }
    return result;
}

function multiplyMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const colsB = matrixB[0].length;
    const result = [];

    for (let i = 0; i < rowsA; i++) {
        const row = [];
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            row.push(sum);
        }
        result.push(row);
    }
    return result;
}

function main() {
    // --- PART A ---
    console.log("--- PART A: Transpose a Matrix ---");
    const rowsA = readlineSync.questionInt("Enter number of rows: ");
    const colsA = readlineSync.questionInt("Enter number of columns: ");
    
    const matA = readMatrix(rowsA, colsA);
    
    console.log("\nOriginal Matrix:");
    printMatrix(matA);
    
    console.log("\nTransposed Matrix:");
    printMatrix(transposeMatrix(matA));
    console.log();

    // --- PART B ---
    console.log("--- PART B: Add Two Matrices ---");
    const rowsB = readlineSync.questionInt("Enter number of rows: ");
    const colsB = readlineSync.questionInt("Enter number of columns: ");
    
    console.log("Enter Matrix A:");
    const matB1 = readMatrix(rowsB, colsB);
    
    console.log("Enter Matrix B:");
    const matB2 = readMatrix(rowsB, colsB);
    
    console.log("\nSum of Matrices:");
    printMatrix(addMatrices(matB1, matB2));
    console.log();

    // --- PART C ---
    console.log("--- PART C: Multiply Two Matrices ---");
    const m = readlineSync.questionInt("Enter number of rows for Matrix A (m): ");
    const n = readlineSync.questionInt("Enter number of columns for Matrix A / rows for Matrix B (n): ");
    const p = readlineSync.questionInt("Enter number of columns for Matrix B (p): ");
    
    console.log("Enter Matrix A:");
    const matC1 = readMatrix(m, n);
    
    console.log("Enter Matrix B:");
    const matC2 = readMatrix(n, p);
    
    console.log("\nProduct of Matrices (A x B):");
    printMatrix(multiplyMatrices(matC1, matC2));
}

main();
