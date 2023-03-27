<script>
  import { onMount } from "svelte";

  export let name;
  export let quotes;
  // https://medium.com/@TimvanBaarsen/how-to-connect-to-the-docker-host-from-inside-a-docker-container-112b4c71bc66
  const quotesApi = "/api/quotes";

  onMount(async () => {
    console.log("onMount: begin...");
    const response = await fetch(quotesApi);
    quotes = await response.json();

    console.log("onMount: end");
  });
  function toggleName() {
    if (name === "world") {
      name = "Svelte";
    } else {
      name = "world";
    }
  }
</script>

<main>
  <h1>Hello {name} from Outer Space!</h1>
  <pre>
	
abc
{quotes}
zzz
	{#await quotes}
      aaa
    {/await}

	{#if quotes}
      Daten
		{#each quotes as x}
        <div>
				<div>{x.author}</div>
				<div>{x.text}</div>
			</div>
      {/each}
    {:else}
      Bitte warte, ich lese Daten...
    {/if}
</pre>

  <button on:click={toggleName}>Toggle name</button>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
