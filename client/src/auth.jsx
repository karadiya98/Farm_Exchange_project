import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const AuthContext = createContext(null);
const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const USER_KEY = 'farm-user';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function readStoredUser() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(USER_KEY) || 'null');
    if (stored?.name) return stored;
  } catch {
    /* A bad saved value just means the header starts signed out. */
  }
  return null;
}

function remember(next) {
  if (next?.name) {
    sessionStorage.setItem(
      USER_KEY,
      JSON.stringify({ id: next.id, name: next.name, email: next.email, role: next.role || 'user' }),
    );
  } else sessionStorage.removeItem(USER_KEY);
}

/** Wake a sleeping Render free-tier API before auth calls. */
async function wakeApi(attempts = 5) {
  if (!API) return true;
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(`${API}/health`, { credentials: 'omit', cache: 'no-store' });
      if (response.ok) return true;
    } catch {
      /* cold start / network */
    }
    await sleep(1200 * (i + 1));
  }
  return false;
}

async function fetchOnce(path, options = {}) {
  const headers = options.body ? { 'Content-Type': 'application/json' } : {};
  const response = await fetch(`${API}${path}`, {
    credentials: 'include',
    ...options,
    headers: { ...headers, ...options.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const fallback =
      response.status === 502 || response.status === 503 || response.status === 504
        ? 'The desk is waking up. Wait a few seconds and try again.'
        : 'The desk could not finish that request.';
    const error = new Error(data.message || fallback);
    error.status = response.status;
    throw error;
  }
  return data;
}

async function readJson(path, options = {}) {
  const retryable = (status) => status === 0 || status === 502 || status === 503 || status === 504;
  let lastError;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      if (attempt > 0 || path.includes('/auth/')) {
        await wakeApi(attempt === 0 ? 3 : 2);
      }
      return await fetchOnce(path, options);
    } catch (error) {
      lastError = error;
      const status = error.status ?? 0;
      if (!retryable(status) && attempt === 0 && status !== 0) throw error;
      if (!retryable(status) && status !== 0) throw error;
      await sleep(900 * (attempt + 1));
    }
  }

  if (lastError?.status === 0 || !lastError?.status) {
    const error = new Error(
      API
        ? 'The desk API is sleeping or unreachable. Wait 20 seconds and try sign-in again.'
        : 'The desk is not reachable. Start the server and try again.'
    );
    error.status = 0;
    throw error;
  }
  throw lastError;
}

async function readUser(path, options = {}) {
  const data = await readJson(path, options);
  if (!data.user?.name) {
    const error = new Error('The account desk did not return a name. Sign in again.');
    error.status = 200;
    throw error;
  }
  return data.user;
}

export function AuthProvider({ children }) {
  // Never trust sessionStorage for route access — only the cookie session after /me.
  // Starting from null avoids a flash of protected pages before redirect to sign-in.
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const session = useRef(0);

  const applyUser = useCallback((next, ticket) => {
    if (ticket !== session.current) return next;
    remember(next);
    setUser(next);
    return next;
  }, []);

  const refreshSession = useCallback(async () => {
    const ticket = ++session.current;
    try {
      await wakeApi(2);
      const current = await readJson('/api/auth/me');
      if (current.user?.name) return applyUser(current.user, ticket);
      if (!current.stale) {
        if (ticket === session.current) applyUser(null, ticket);
        return null;
      }
      const renewed = await readJson('/api/auth/refresh', { method: 'POST' });
      return applyUser(renewed.user?.name ? renewed.user : null, ticket);
    } catch {
      if (ticket === session.current) applyUser(null, ticket);
      return null;
    }
  }, [applyUser]);

  useEffect(() => {
    refreshSession().finally(() => setReady(true));
  }, [refreshSession]);

  // Keep the Render API warm while the site is open (free tier sleeps otherwise).
  useEffect(() => {
    if (!API) return undefined;
    const ping = () => {
      fetch(`${API}/health`, { credentials: 'omit', cache: 'no-store' }).catch(() => {});
    };
    ping();
    const id = window.setInterval(ping, 4 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  const signup = useCallback(async (body) => {
    await wakeApi(5);
    const ticket = ++session.current;
    return applyUser(await readUser('/api/auth/signup', { method: 'POST', body: JSON.stringify(body) }), ticket);
  }, [applyUser]);

  const login = useCallback(async (body) => {
    await wakeApi(5);
    const ticket = ++session.current;
    return applyUser(await readUser('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }), ticket);
  }, [applyUser]);

  const logout = useCallback(async () => {
    const ticket = ++session.current;
    try {
      await fetch(`${API}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch {
      /* still clear local session */
    }
    if (ticket === session.current) applyUser(null, ticket);
  }, [applyUser]);

  const updateName = useCallback(async (name) => {
    const ticket = ++session.current;
    return applyUser(await readUser('/api/auth/profile', { method: 'PATCH', body: JSON.stringify({ name }) }), ticket);
  }, [applyUser]);

  const ensureAccount = useCallback(async (path = '/api/account/gate') => {
    try {
      return await readJson(path);
    } catch (error) {
      if (error.status !== 401) throw error;
      const renewed = await refreshSession();
      if (!renewed) {
        applyUser(null, session.current);
        const denied = new Error('Sign in to continue.');
        denied.status = 401;
        throw denied;
      }
      return readJson(path);
    }
  }, [applyUser, refreshSession]);

  const apiJson = useCallback(async (path, options = {}) => {
    try {
      return await readJson(path, options);
    } catch (error) {
      if (error.status !== 401) throw error;
      const renewed = await refreshSession();
      if (!renewed) {
        applyUser(null, session.current);
        throw error;
      }
      return readJson(path, options);
    }
  }, [applyUser, refreshSession]);

  const value = useMemo(
    () => ({ user, ready, signup, login, logout, updateName, ensureAccount, apiJson }),
    [user, ready, signup, login, logout, updateName, ensureAccount, apiJson]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
