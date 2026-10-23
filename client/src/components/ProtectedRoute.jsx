import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, ready } = useAuth();
  const location = useLocation();
  const next = `${location.pathname}${location.search}`;
  const loginTo = `/signup?mode=login&next=${encodeURIComponent(next)}`;

  // Hold a blank screen while the session is checked — never mount the protected page.
  if (!ready) {
    return <div className="min-h-[40vh] bg-white" aria-busy="true" />;
  }

  if (!user) {
    return <Navigate to={loginTo} replace state={{ from: next }} />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
