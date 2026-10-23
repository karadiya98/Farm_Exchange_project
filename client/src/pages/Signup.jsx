import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth';
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import fieldPhoto from '../public/Hero images/Golden Harvest Tractor Field.png';

const empty = { name: '', email: '', password: '', confirm: '' };

function safeNext(value) {
  if (!value || typeof value !== 'string') return '/';
  if (!value.startsWith('/') || value.startsWith('//')) return '/';
  return value;
}

function strengthOf(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

const strengthLabel = ['Too short', 'Fair', 'Good', 'Strong', 'Yard-ready'];

function Collapse({ open, children }) {
  return (
    <div
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
      aria-hidden={!open}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

export default function Signup() {
  const [searchParams] = useSearchParams();
  const nextPath = safeNext(searchParams.get('next'));
  const initialMode = searchParams.get('mode') === 'login' ? 'login' : 'signup';
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const { signup, login, user, ready } = useAuth();
  const navigate = useNavigate();

  const isSignup = mode === 'signup';
  const strength = useMemo(() => strengthOf(form.password), [form.password]);

  const destFor = (account) => (account?.role === 'admin' ? '/admin' : nextPath);

  // Only auto-leave when the session is already confirmed — not during a failed login bounce.
  useEffect(() => {
    if (!ready || !user) return;
    if (busy || sent) return;
    navigate(destFor(user), { replace: true });
  }, [ready, user, nextPath, navigate, busy, sent]);

  useEffect(() => {
    const requested = searchParams.get('mode') === 'login' ? 'login' : null;
    if (requested) setMode(requested);
  }, [searchParams]);

  const set = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSent(false);
  };

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
    setErrors({});
    setSent(false);
    setShowPassword(false);
  };

  const submit = async (event) => {
    event.preventDefault();
    const next = {};
    if (isSignup && form.name.trim().length < 2) next.name = 'Add the name the desk should use.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Use an email the desk can answer.';
    if (form.password.length < 8) next.password = 'Use at least 8 characters.';
    if (isSignup && form.confirm !== form.password) next.confirm = 'Those two passwords do not match.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    try {
      const account = isSignup
        ? await signup({ name: form.name.trim(), email: form.email.trim(), password: form.password })
        : await login({ email: form.email.trim(), password: form.password });
      setSent(true);
      navigate(destFor(account));
    } catch (error) {
      setErrors({ form: error.message });
    } finally {
      setBusy(false);
    }
  };

  const labelClass = 'mb-0.5 block text-[10px] font-bold uppercase tracking-[0.4px] text-primary';
  const fieldClass =
    'w-full rounded-md border border-primary/15 bg-white py-1.5 pl-8 pr-3 text-[15px] text-primary outline-none transition-colors duration-200 placeholder:text-primary/35 focus:border-primary min-[480px]:text-[14px] min-[1600px]:py-2 min-[1600px]:text-[15px]';
  const iconClass = 'pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-primary/60';

  return (
    <section className="relative isolate flex h-[calc(100svh-var(--header-h,180px))] min-h-0 w-full flex-col overflow-hidden bg-[#eef3f0] min-[993px]:flex-row">
      {/* Full viewport-height photo — right edge is a semi-circle into the form column */}
      <div className="relative z-[1] hidden h-full min-[993px]:block min-[993px]:w-[56%] min-[1440px]:w-[58%]">
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            borderTopRightRadius: '5.5rem',
            borderBottomRightRadius: '5.5rem',
          }}
        >
          <img
            src={fieldPhoto}
            alt=""
            className="h-full w-full object-cover object-[28%_center]"
          />
          <div className="absolute inset-0 bg-primary/15" />
        </div>
      </div>

      {/* Mobile / tablet photo band */}
      <div className="relative h-[34%] min-h-[160px] w-full shrink-0 overflow-hidden rounded-b-[1.75rem] min-[640px]:min-h-[180px] min-[993px]:hidden">
        <img src={fieldPhoto} alt="" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/25" />
      </div>

      <div className="relative z-10 flex h-full min-h-0 flex-1 items-center justify-center overflow-y-auto px-3 py-4 min-[480px]:px-5 min-[768px]:px-8 min-[993px]:px-6 min-[1440px]:px-10">
        <div className="w-full max-w-[340px] rounded-2xl border border-primary/10 bg-white px-3.5 py-3 shadow-[0_18px_40px_rgb(2_70_46/0.14)] transition-[box-shadow] duration-300 min-[480px]:max-w-[380px] min-[480px]:px-4 min-[480px]:py-3.5 min-[768px]:max-w-[400px] min-[993px]:max-w-[min(34vw,360px)] min-[1280px]:max-w-[min(30vw,400px)] min-[1600px]:max-w-[440px] min-[1600px]:px-5 min-[1600px]:py-4 min-[2200px]:max-w-[500px]">
          <div className="grid grid-cols-2 rounded-full bg-primary/10 p-1">
            {[
              ['signup', 'Create account'],
              ['login', 'Sign in'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => switchMode(id)}
                className={`rounded-full py-1.5 text-[11px] font-extrabold uppercase tracking-[0.4px] cursor-pointer transition-all duration-300 min-[1600px]:py-2 min-[1600px]:text-[12px] ${
                  mode === id ? 'bg-primary text-white shadow-[0_4px_12px_rgb(2_70_46/0.22)]' : 'bg-transparent text-primary/70 hover:text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="m-0 mt-2.5 section-kicker text-[10px] font-extrabold uppercase tracking-[1.2px]">Since 1999 · The desk</p>
          <h1 className="m-0 mt-0.5 text-[18px] font-black uppercase leading-tight min-[480px]:text-[20px] min-[768px]:text-[22px] min-[1600px]:text-[26px]">
            {isSignup ? 'Open your account' : 'Welcome back'}
          </h1>
          <div className="relative mt-0.5 min-h-[2.4em]">
            <p
              className={`m-0 text-[11px] leading-snug text-primary/65 transition-opacity duration-300 min-[1600px]:text-[13px] ${
                isSignup ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
              }`}
            >
              A yard number, a freight window, and a dealer price, saved to your name.
            </p>
            <p
              className={`m-0 text-[11px] leading-snug text-primary/65 transition-opacity duration-300 min-[1600px]:text-[13px] ${
                isSignup ? 'pointer-events-none absolute inset-0 opacity-0' : 'opacity-100'
              }`}
            >
              Sign in to pick up quotes, orders, and the lot already tagged for you.
            </p>
          </div>

          {sent ? (
            <div className="mt-3 rounded-xl border border-primary/15 bg-primary px-3 py-3">
              <p className="m-0 text-[14px] font-black text-primary">
                {isSignup ? 'The desk has your name.' : 'You are signed in.'}
              </p>
              <p className="m-0 mt-1 text-[12px] leading-snug text-white/75">
                {isSignup
                  ? 'We will write back at the email you gave.'
                  : 'Your quotes and the tagged lot are ready on the home desk.'}
              </p>
              <Link to="/" className="mt-2 inline-flex items-center gap-1 text-[12px] font-extrabold text-accent no-underline">
                Back to the lot <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-2.5 flex flex-col gap-1.5 min-[1600px]:mt-3 min-[1600px]:gap-2" noValidate>
              <Collapse open={isSignup}>
                <label className="mb-1.5 block min-[1600px]:mb-2">
                  <span className={labelClass}>Full name</span>
                  <span className="relative block">
                    <User size={14} className={iconClass} />
                    <input
                      value={form.name}
                      onChange={set('name')}
                      autoComplete="name"
                      placeholder="Jordan Hale"
                      tabIndex={isSignup ? 0 : -1}
                      disabled={!isSignup}
                      className={fieldClass}
                    />
                  </span>
                  {errors.name && <span className="mt-0.5 block text-[11px] font-semibold text-accent">{errors.name}</span>}
                </label>
              </Collapse>

              <label className="block">
                <span className={labelClass}>Email</span>
                <span className="relative block">
                  <Mail size={14} className={iconClass} />
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    autoComplete="email"
                    placeholder="you@farm.com"
                    className={fieldClass}
                  />
                </span>
                {errors.email && <span className="mt-0.5 block text-[11px] font-semibold text-accent">{errors.email}</span>}
              </label>

              <label className="block">
                <span className={labelClass}>Password</span>
                <span className="relative block">
                  <Lock size={14} className={iconClass} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={set('password')}
                    autoComplete={isSignup ? 'new-password' : 'current-password'}
                    placeholder="At least 8 characters"
                    className={`${fieldClass} pr-9`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 border-none bg-transparent p-0 text-primary/60 cursor-pointer hover:text-primary"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </span>
                {errors.password && <span className="mt-0.5 block text-[11px] font-semibold text-accent">{errors.password}</span>}
                <Collapse open={isSignup && Boolean(form.password)}>
                  <span className="mt-1 block">
                    <span className="flex gap-1">
                      {[0, 1, 2, 3].map((bar) => (
                        <span
                          key={bar}
                          className={`h-1 flex-1 rounded-full ${strength > bar ? 'bg-primary' : 'bg-primary/15'}`}
                        />
                      ))}
                    </span>
                    <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.4px] text-primary/60">
                      {strengthLabel[strength]}
                    </span>
                  </span>
                </Collapse>
              </label>

              <Collapse open={isSignup}>
                <label className="block">
                  <span className={labelClass}>Confirm password</span>
                  <span className="relative block">
                    <Lock size={14} className={iconClass} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.confirm}
                      onChange={set('confirm')}
                      autoComplete="new-password"
                      placeholder="Type it once more"
                      tabIndex={isSignup ? 0 : -1}
                      disabled={!isSignup}
                      className={fieldClass}
                    />
                  </span>
                  {errors.confirm && <span className="mt-0.5 block text-[11px] font-semibold text-accent">{errors.confirm}</span>}
                </label>
              </Collapse>

              {errors.form && <span className="text-[11px] font-semibold text-accent">{errors.form}</span>}

              <button
                type="submit"
                disabled={busy}
                className="mt-1 inline-flex w-full items-center justify-center gap-1.5 rounded-md border-none bg-accent py-2 text-[12px] font-extrabold uppercase tracking-[0.4px] text-white cursor-pointer transition-colors duration-300 hover:bg-accent-dark disabled:opacity-60 min-[1600px]:py-2.5 min-[1600px]:text-[13px]"
              >
                {busy ? 'Saving…' : isSignup ? 'Create my account' : 'Sign in'} <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
