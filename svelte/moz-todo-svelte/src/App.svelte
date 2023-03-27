<script>
  import { onMount } from "svelte";


	export let name;
	export let quotes;
	// https://medium.com/@TimvanBaarsen/how-to-connect-to-the-docker-host-from-inside-a-docker-container-112b4c71bc66
	const quotesApi = "http://host.docker.internal:3333/api/quotes"
	//const quotesApi = "http://192.168.65.2:3333/api/quotes"
	//const quotesApi = "http://localhost:3333/api/quotes"
	//const quotesApi = "http://localhost:3333/api/quotes"
	//const quotesApi = "/api/quotes"

	onMount(async () => {
		console.log("onMount: begin...")
		/* fetch(quotesApi)
  			.then(response => response.json())
			.then(data => {
					console.log(">>>>>>>"+data);
				data = data;
			}).catch(error => {
				console.log(error);
				//return [{"quoteID":"1", "text": "bla fasel blubb", "author": "erwin"}];
				data = [{"quoteID":"1", "text": "bla fasel blubb", "author": "erwin"}];
			}); */
		//response = await fetch('http://127.0.0.1:3333/api/quotes');
		const response = await fetch('/api/quotes');
		//const response = await fetch(quotesApi)
		//data = await fetch(quotesApi).then((x)=>x.json())
		quotes = await response.json()

	//.then(response => response.json())
	//.then(response => console.log(JSON.stringify(response, ' ', 2)))
		
		//console.log("onMount: response. " + JSON.stringify(response))
		//console.log("onMount: json: "+json != undefined ? JSON.stringify(json) : 'n/a')
		//console.log("onMount: response: "+response != undefined ? JSON.stringify(response) : 'n/a')

// svelte recipes https://github.com/svelte-society/recipes-mvp/blob/master/components.md#using-fetch-to-consume-apis-with-svelte
console.log("onMount: end")
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