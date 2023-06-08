export default async function getCMSData(query: string) {
	const res = await fetch(import.meta.env.VITE_API_URI, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: query,
		}),
	})
	const { data } = await res.json()
	return data
}
