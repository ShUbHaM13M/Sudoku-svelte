<script>
  import GameScreen from "./components/GameScreen.svelte";
  import HomeScreen from "./components/HomeScreen.svelte";

  let start = false;
  let selectedDificulty;

  function startGame() {
    start = true;
  }

  function setDificulty(difficulty) {
    selectedDificulty = difficulty;
  }
</script>

{#if start}
  <GameScreen difficulty={selectedDificulty} />
{:else}
  <HomeScreen {setDificulty} {startGame} />
{/if}

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
