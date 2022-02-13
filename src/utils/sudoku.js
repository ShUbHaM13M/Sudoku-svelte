import { getSudoku } from "sudoku-gen";

const sudoku = getSudoku("easy");
let puzzle = sudoku.puzzle.replaceAll("-", "0").split("");
const solvedPuzzle = sudoku.solution;
let grid = [];

function checkIfCorrect(x, y, grid, number) {
  let wrong = false;
  const index = x * 9 + y;
  const cell = grid[x][y];
  if (number == solvedPuzzle[index]) {
    cell.correct = true;
    cell.wrong = false;
  } else {
    cell.wrong = true;
    wrong = true;
    cell.correct = false;
  }

  grid[x].splice(y, 1, cell);
  return { grid, wrong };
}

function generateNewPuzzle(difficulty = "easy") {
  const sudoku = getSudoku(difficulty);
  let puzzle = sudoku.puzzle.replaceAll("-", "0").split("");
  const solvedPuzzle = sudoku.solution;
  let grid = [];
  for (let i = 0; i < puzzle.length / 9; i++) {
    const start = i * 9;
    const end = i * 9 + 9;
    grid.push(puzzle.slice(start, end));
  }
  grid = grid.map((row) =>
    row.map((number) => ({
      number,
      highlight: "none",
      editable: number == 0 ? true : false,
    }))
  );

  return { grid, solvedPuzzle };
}

export { generateNewPuzzle, checkIfCorrect };
