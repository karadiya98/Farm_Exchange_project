import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

/**
 * Confirms the backend session for a protected page.
 * Redirects to sign-in only on 401 — not on 502/network blips.
 */
export default function useAccountGate(path, nextPath) {
  const { ensureAccount } = useAuth();
  const navigate = useNavigate();
  const [gateOk, setGateOk] = useState(false);
  const [gateError, setGateError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        await ensureAccount(path);
        if (!alive) return;
        setGateError('');
        setGateOk(true);
      } catch (error) {
        if (!alive) return;
        if (error.status === 401) {
          navigate(`/signup?mode=login&next=${encodeURIComponent(nextPath)}`, { replace: true });
          return;
        }
        setGateError(error.message || 'The desk is not reachable. Try again in a moment.');
      }
    })();
    return () => {
      alive = false;
    };
  }, [ensureAccount, navigate, path, nextPath]);

  return { gateOk, gateError };
}
