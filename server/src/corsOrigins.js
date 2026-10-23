/**
 * Production frontends that may call this API with credentials.
 * CLIENT_ORIGIN can still add more (comma-separated).
 */
const BUILTIN_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'https://farm-exchange-3ovw.onrender.com',
  'https://agro-foundaries.onrender.com',
];

function fromEnv() {
  return String(process.env.CLIENT_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function allowedOrigins() {
  return [...new Set([...BUILTIN_ORIGINS, ...fromEnv()])];
}

function trustedDeployHost(hostname) {
  const named =
    hostname.includes('farm-exchange') ||
    hostname.includes('farmexchange') ||
    hostname.includes('agro-found') ||
    hostname.includes('agrofound');

  if (hostname.endsWith('.onrender.com') && named) return true;
  if (hostname.endsWith('.vercel.app')) return true;
  return false;
}

export function isOriginAllowed(origin) {
  // Non-browser tools / same-host health checks send no Origin.
  if (!origin) return true;
  if (allowedOrigins().includes(origin)) return true;
  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== 'http:' && protocol !== 'https:') return false;
    if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
    if (trustedDeployHost(hostname)) return true;
  } catch {
    return false;
  }
  return false;
}
