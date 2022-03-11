<script>
	import { onMount } from 'svelte';
	import { windowSize } from './stores/store';
	import Header from "./components/header.svelte";
	import SectionOne from './components/sectionOne.svelte'
	import MobileSection from './components/mobileSection.svelte'
	import SectionTwo from './components/sectionTwo.svelte'
	import Footer from './components/footer.svelte'

	let innerWidth

	function windowWidth() {
			if (innerWidth > 900) {
			windowSize.update(() => true);
		} else {
			windowSize.update(() => false);
		}
	}

	onMount(() => {
		windowWidth()
	})
</script>

<svelte:window 
  bind:innerWidth={innerWidth}
	on:resize={windowWidth}
/>

<Header />
<main>
	<SectionOne />
	<MobileSection />
	<SectionTwo />
</main>
<Footer />

