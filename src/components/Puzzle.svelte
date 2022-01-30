<script>
  import Cell from "./Cell.svelte";
  export let grid = [];
  export let selectedCell;
  export let setSelectedCell;
  const SRN = 3;

  function onCellClick(activeCellX, activeCellY) {
    const activeCell = grid[activeCellX][activeCellY];
    setSelectedCell({
      x: activeCellX,
      y: activeCellY,
      isEditable: activeCell.editable,
    });
    const boxX = activeCellX - (activeCellX % SRN);
    const boxY = activeCellY - (activeCellY % SRN);

    grid.forEach((row, rIndex) => {
      row.forEach((cell, cIndex) => {
        if (activeCell.number != 0 && activeCell.number == cell.number)
          return highlightCell(rIndex, cIndex, "same-number");
        if (activeCellX == rIndex)
          return highlightCell(rIndex, cIndex, "default");
        if (activeCellY == cIndex)
          return highlightCell(rIndex, cIndex, "default");
        else {
          unHighlightCell(rIndex, cIndex);
        }
      });
    });

    for (let i = 0; i < SRN; i++) {
      for (let j = 0; j < SRN; j++) {
        let x = boxX + i;
        let y = boxY + j;
        highlightCell(x, y, "default");
      }
    }
  }

  function highlightCell(x, y, type) {
    const cell = grid[x][y];
    cell.highlight = type;
    grid[x].splice(y, 1, cell);
    grid = [...grid];
  }

  function unHighlightCell(x, y) {
    const cell = grid[x][y];
    cell.highlight = "none";
    grid[x].splice(y, 1, cell);
    grid = [...grid];
  }
</script>

<div class="grid">
  {#each grid as row, rowIndex}
    {#each row as cell, colIndex}
      <Cell
        {cell}
        on:click={() => onCellClick(rowIndex, colIndex)}
        isSelected={rowIndex === selectedCell?.x &&
          colIndex === selectedCell?.y}
      />
    {/each}
  {/each}
  <div class="border vertical" />
  <div class="border vertical" />
  <div class="border horizontal" />
  <div class="border horizontal" />
</div>

<style>
  .grid {
    --gridSize: 9;
    --outline-width: 2px;
    display: grid;
    grid-template-columns: repeat(var(--gridSize), 1fr);
    grid-template-rows: repeat(var(--gridSize), 1fr);
    outline: var(--outline-width) solid var(--board-border-color);
    position: relative;
  }
  .border {
    position: absolute;
    background-color: var(--board-border-color);
    --offset: calc(100% / 3);
    outline: 1px solid;
    outline-color: var(--board-border-color);
  }
  .border.vertical {
    height: 100%;
    width: 1px;
    left: var(--offset);
  }
  .vertical ~ .vertical {
    left: calc(var(--offset) * 2);
  }
  .border.horizontal {
    width: 100%;
    outline: 1.5px solid;
    top: var(--offset);
  }
  .horizontal ~ .horizontal {
    top: calc(var(--offset) * 2);
  }
</style>
