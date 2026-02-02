// Small client to call the AI backend.
// Dev: localhost:3000 → backend on 3001
// Prod: uses REACT_APP_API_URL (Render backend)

const getApiBase = () => {
  if (typeof window !== 'undefined' && window.location) {
    // Dev environment: localhost:3000 → backend on 3001
    if (window.location.hostname === 'localhost' && window.location.port === '3000') {
      return 'http://localhost:3001';
    }
  }

  // Production: use environment variable
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL.replace(/\/$/, ''); // remove trailing slash if any
  }

  // Fallback to same origin (should never happen if env variable is set)
  if (typeof window !== 'undefined' && window.location) return window.location.origin;
  return '';
};

export async function generateWithBackend(prompt) {
  const base = getApiBase();
  const url = `${base}/api/generate`;

  try {
    console.debug('[aiBackendClient] POST', url);
    console.debug('[aiBackendClient] prompt preview:', prompt && prompt.slice(0, 120));

    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      // Try to parse backend error message
      const err = await res.json().catch(() => ({}));
      const backendMsg = err.error || err.message || `status ${res.status}`;
      throw new Error(`Backend generation failed: ${backendMsg}`);
    }

    const data = await res.json();
    return data.text || '';
  } catch (err) {
    console.error('generateWithBackend error:', err);
    throw err;
  }
}

// ✅ named default export (this fixes CI)
const aiBackendClient = {
  generateWithBackend,
};

export default aiBackendClient;
