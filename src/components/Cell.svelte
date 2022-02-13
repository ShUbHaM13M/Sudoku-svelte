<script>
  export let cell;
  export let isSelected = false;
</script>

<div
  class:highlightSameNumber={cell.highlight === "same-number"}
  class:highlight={cell.highlight == "default"}
  class:selected={isSelected}
  class:wrong={cell.wrong}
  class:correct={cell.correct}
  on:click|stopPropagation
>
  {#if cell.number != 0}
    <p>{cell.number}</p>
  {/if}
</div>

<style>
  div {
    font-weight: 600;
    display: flex;
    justify-content: center;
    background-color: white;
    outline: 1px solid var(--border-color-light);
  }
  p {
    margin: 0;
    font-size: 1.1rem;
    padding: 0.5em 0.8em;
    font-weight: bold;
    text-align: center;
    user-select: none;
  }
  .highlightSameNumber {
    background-color: var(--same-number-highlight-color);
    color: var(--color-primary);
  }
  .highlight {
    background-color: var(--highlight-color);
  }
  .selected {
    background-color: var(--color-primary);
    color: white;
  }
  .wrong {
    color: var(--color-error);
  }
  .correct {
    color: var(--color-primary);
  }
  .correct.selected {
    background-color: white;
  }
</style>
