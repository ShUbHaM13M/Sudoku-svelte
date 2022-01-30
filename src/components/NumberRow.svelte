<script>
  export let onButtonClick = null;
</script>

<div>
  {#each [...Array(9).keys()] as number}
    <button on:click={() => onButtonClick(number + 1)}>
      {number + 1}
    </button>
  {/each}
</div>

<style>
  div {
    display: flex;
    outline: 1px solid var(--board-border-color);
    margin-bottom: 1em;
    justify-self: end;
  }
  button {
    margin: 0;
    padding: 0.8em;
    width: 100%;
    outline: none;
    border: none;
    border-radius: 0;
    font-weight: 600;
    font-size: 1.1rem;
  }
</style>
