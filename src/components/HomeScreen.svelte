<script>
  export let startGame;
  export let setDificulty;
</script>

<h1>Sudoku</h1>
<label for="difficulty">Choose difficulty: </label>
<select
  name="difficulty"
  id="difficulty"
  on:change={(e) => setDificulty(e.target.value)}
>
  <option value="easy">Easy 👶</option>
  <option value="medium">Medium</option>
  <option value="hard">Hard</option>
  <option value="expert">Expert 😎</option>
</select>
<button on:click={startGame}>Start Game</button>

<style>
  select {
    border: 4px solid var(--border-color-light);
    background-color: var(--blue);
    color: white;
  }
</style>
