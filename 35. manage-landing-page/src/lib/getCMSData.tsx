export default async function getCMSData(query: string) {
	const res = await fetch(
		'https://api-eu-west-2.hygraph.com/v2/clidfzkt80e6x01t87wim9y87/master',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: query,
			}),
		}
	)
	const { data } = await res.json()
	return data
}
