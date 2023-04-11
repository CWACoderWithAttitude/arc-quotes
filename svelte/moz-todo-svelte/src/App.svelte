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
    if (quotes != undefined) {
      console.debug(`onMount: fetched ${quotes.length} quaotes`);
    }
    console.log("onMount: end");
  });
  function toggleName() {
    if (name === "world") {
      name = "Svelte";
    } else {
      name = "world";
    }
  }

  async function onClick(e) {
    console.log("onClick: 1");
  }
  async function onSubmit(e) {
    const formData = new FormData(e.target);

    console.log("onSubmit: formData: " + formData);
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    console.log(data);
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch(quotesApi, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
  }
  // https://stackoverflow.com/questions/58262380/how-to-pass-parameters-to-onclick-in-svelte
  // https://jasonwatmore.com/post/2021/09/21/fetch-http-delete-request-examples
  async function onDelete(id) {
    console.log("onDelete: id:" + JSON.stringify(id));
    const response = await fetch(`${quotesApi}/${id}`, { method: "DELETE" });
    console.debug("delete-Response: " + JSON.stringify(response, " ", 2));
  }
</script>

<main>
  <h1>Hello {name} from Outer Space!</h1>
  <div>
    <!-- https://www.thisdot.co/blog/handling-forms-in-svelte -->
    <form on:submit|preventDefault={onSubmit}>
      <div>
        <label for="author">Author</label>
        <input type="text" id="author" name="author" value="author" enterkeyhint="hint" />
      </div>
      <div>
        <label for="text">Text</label>
        <input type="text" id="text" name="text" value="text" />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
  <div>
    {#if quotes}
      <table>
        <tr>
          <th>ID</th>
          <th>Author</th>
          <th>Quote</th>
        </tr>
        {#each quotes as x}
          <tr on:click={onClick(x)}>
            <td>{x.quoteID}</td>
            <td>{x.author}</td>
            <td>{x.text}</td>
            <td
              ><input
                type="button"
                value="Delete"
                on:click={() => onDelete(x.quoteID)}
              /></td
            >
          </tr>
        {/each}
      </table>
    {:else}
      Bitte warte, ich lese Daten...
    {/if}
  </div>

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
  * {
    box-sizing: border-box;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
  }

  form > div {
    display: flex;
    justify-content: space-between;
  }

  form > div + * {
    margin-top: 10px;
  }
</style>
