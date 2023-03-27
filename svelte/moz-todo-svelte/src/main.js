import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'stranger',
		quotes: undefined
	}
});

export default app;