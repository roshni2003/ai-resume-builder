// Small client to call the local AI backend.
// Uses the dev backend directly when running on localhost:3000 to avoid
// relying on react-scripts proxy. In production, leaves paths as same-origin.
const getApiBase = () => {
	try {
		if (typeof window !== 'undefined' && window.location) {
			// If running from the React dev server (default port 3000), target backend on 3001
			if (window.location.hostname === 'localhost' && window.location.port === '3000') {
				return 'http://localhost:3001';
			}
		}
	} catch (e) {
		// ignore
	}
	// default: same origin
	return '';
};

export async function generateWithBackend(prompt) {
	const base = getApiBase();
	const url = `${base}/api/generate`;

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prompt }),
		});

		if (!res.ok) {
			const err = await res.json().catch(() => ({}));
			throw new Error(err.error || 'Backend generation failed');
		}

		const data = await res.json();
		return data.text || '';
	} catch (err) {
		console.error('generateWithBackend error:', err);
		throw err;
	}
}

export default { generateWithBackend };
