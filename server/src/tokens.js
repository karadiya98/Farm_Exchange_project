import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const accessMs = 15 * 60 * 1000;
const refreshMs = 7 * 24 * 60 * 60 * 1000;

/**
 * Cross-site cookies are required when the SPA and API are on different hosts
 * (e.g. farm-exchange-*.onrender.com → agro-foundaries-api.onrender.com).
 */
function useCrossSiteCookies() {
  if (process.env.COOKIE_CROSS_SITE === 'false') return false;
  if (process.env.COOKIE_CROSS_SITE === 'true') return true;
  if (process.env.NODE_ENV === 'production') return true;
  const client = String(process.env.CLIENT_ORIGIN || '');
  return client.includes('https://') && !client.includes('localhost');
}

function cookieBase() {
  const crossSite = useCrossSiteCookies();
  return {
    httpOnly: true,
    secure: crossSite,
    sameSite: crossSite ? 'none' : 'lax',
  };
}

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function signAccess(user) {
  return jwt.sign(
    { sub: user._id.toString(), name: user.name },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );
}

export function signRefresh(user) {
  const jti = crypto.randomBytes(16).toString('hex');
  return jwt.sign(
    { sub: user._id.toString(), jti },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyAccess(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

export function verifyRefresh(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

export function setAuthCookies(res, accessToken, refreshToken) {
  const base = cookieBase();
  res.cookie('accessToken', accessToken, { ...base, maxAge: accessMs, path: '/' });
  res.cookie('refreshToken', refreshToken, { ...base, maxAge: refreshMs, path: '/' });
}

export function clearAuthCookies(res) {
  const base = cookieBase();
  res.clearCookie('accessToken', { ...base, path: '/' });
  res.clearCookie('refreshToken', { ...base, path: '/' });
  res.clearCookie('refreshToken', { ...base, path: '/api/auth' });
}

export function publicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role === 'admin' ? 'admin' : 'user',
  };
}
