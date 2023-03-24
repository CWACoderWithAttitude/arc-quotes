<script>
  import { onMount } from "svelte";


	export let name;
	export let data;
	//let quotesApi = "httpS://127.0.0.1:3333/api/quoteSs"
	const quotesApi = "/api/quotes"

	onMount(async () => {
		console.log("onMount: begin...")
		//response = await fetch(quotesApi);
		const response = await fetch(quotesApi)
		//data = await fetch(quotesApi).then((x)=>x.json())
		data = await response.json()
	//.then(response => response.json())
	//.then(response => console.log(JSON.stringify(response, ' ', 2)))
		
		//console.log("onMount: response. " + JSON.stringify(response))
		//console.log("onMount: json: "+json != undefined ? JSON.stringify(json) : 'n/a')
		//console.log("onMount: response: "+response != undefined ? JSON.stringify(response) : 'n/a')

// svelte recipes https://github.com/svelte-society/recipes-mvp/blob/master/components.md#using-fetch-to-consume-apis-with-svelte
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
{data}
zzz
	{#await data}
	aaa
		
	{/await}

	{#if data}
		Daten
		{#each data as x}
			<div>
				<div>{x.author}</div>
				<div>{x.text}</div>
			</div>
		{/each}
	{:else}
	  Bitte warte, ich lese Daten...
	{/if}
</pre>

	<button on:click="{toggleName}">Toggle name</button>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	
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