<script>
  import Puzzle from "./components/Puzzle.svelte";
  import NumberRow from "./components/NumberRow.svelte";
  import { getSudoku } from "sudoku-gen";

  const sudoku = getSudoku("easy");
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

  let selectedCell = null;
  const setSelectedCell = (cell) => (selectedCell = cell);

  function checkIfCorrect(x, y, number) {
    const index = x * 9 + y;
    const cell = grid[x][y];
    if (number == solvedPuzzle[index]) {
      cell.correct = true;
      cell.wrong = false;
    } else {
      cell.wrong = true;
    }

    grid[x].splice(y, 1, cell);
    grid = [...grid];
  }

  function onButtonClick(number) {
    if (selectedCell && selectedCell.isEditable) {
      const { x, y } = selectedCell;
      const cell = grid[x][y];
      cell.number = number;
      grid[x].splice(y, 1, cell);
      grid = [...grid];
      checkIfCorrect(x, y, number);
    }
  }

  console.log(sudoku.solution);
</script>

<Puzzle {grid} {selectedCell} {setSelectedCell} />
<NumberRow {onButtonClick} />

<style>
  :global(:root) {
    --color-white: #fff;
    --color-dark: #111419;
    --color-error: rgb(255, 62, 62);
    --blue: #0084a5;
    --gray0: #f8f8f8;
    --gray5: #24282f;
    --gray6: #12181b;
    --purple: #d8a4eb;
    --border-color-light: rgb(214, 214, 214);

    --color-primary: #6666bb;
    --color-white: #fff;
    --board-border-color: var(--color-dark);
    --highlight-color: #b3b3ff;
    --same-number-highlight-color: #d6d6fd;
  }
  :global(body) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    transition-property: background-color, color;
    transition-duration: 350ms;
    transition-timing-function: ease-in;
  }
  :global(body.light) {
    background-color: var(--blue);
  }
  :global(body.dark) {
    background-color: var(--gray6);
  }
</style>
