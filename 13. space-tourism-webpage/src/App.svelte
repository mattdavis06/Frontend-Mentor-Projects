<script>
	import { Router, Route } from "svelte-navigator";
	import Header from './components/Header.svelte'
	import Home from './pages/home.svelte'
	import Destination from './pages/destination.svelte'
	import Crew from './pages/crew.svelte'
	import Technology from './pages/technology.svelte'
</script>

<Header />
<Router primary={false}>
	<main>
		<Route path="/"><Home /></Route>
		<Route path="destination"><Destination /></Route>
		<Route path="crew"><Crew /></Route>
    <Route path="technology"><Technology /></Route>
	</main>
</Router>
