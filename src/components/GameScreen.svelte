<script>
  import Puzzle from "./Puzzle.svelte";
  import NumberRow from "./NumberRow.svelte";
  import { checkIfCorrect, generateNewPuzzle } from "../utils/sudoku";
  export let difficulty = "easy";

  let noOfMistakes = 0;

  let { grid, solvedPuzzle } = generateNewPuzzle(difficulty);

  let selectedCell = null;
  const setSelectedCell = (cell) => (selectedCell = cell);

  function onButtonClick(number) {
    if (selectedCell && selectedCell.isEditable) {
      const { x, y } = selectedCell;
      const cell = grid[x][y];
      cell.number = number;
      grid[x].splice(y, 1, cell);
      const temp = checkIfCorrect(x, y, grid, number);
      grid = temp.grid;
      noOfMistakes += temp.wrong ? 1 : 0;
    }
  }

  console.log(solvedPuzzle);
</script>

{#if noOfMistakes < 3}
  <Puzzle {grid} {selectedCell} {setSelectedCell} />
  <NumberRow {onButtonClick} />
{:else}
  <p>O Sheise You lost</p>
  <button on:click={() => window.location.reload()}>Restart</button>
{/if}
