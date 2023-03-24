import App from './App.svelte';

const quotes = [{"author":"aldnlnk", "text":"fö,väöf"},{"author":"aldnlnk", "text":"fö,väöf"},{"author":"aldnlnk", "text":"fö,väöf"}]
const app = new App({
	target: document.body,
	props: {
		name: 'stranger',
		quotes: quotes
	}
});

export default app;