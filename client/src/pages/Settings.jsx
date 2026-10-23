import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Mail,
  Shield,
  SlidersHorizontal,
  UserRound,
} from 'lucide-react';
import { useAuth } from '../auth';
import useAccountGate from '../hooks/useAccountGate';

function storageKey(email, suffix) {
  return `farm-${suffix}:${email || 'guest'}`;
}

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const defaultPrefs = {
  emailOrders: true,
  emailSpecials: true,
  emailWatch: true,
  smsFreight: false,
  phoneOk: true,
  marketing: false,
  defaultLine: 'all',
  defaultState: '',
  freightPref: 'Ask each time',
  largeType: false,
  reduceMotion: false,
};

function Toggle({ on, onChange, label, help }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex w-full cursor-pointer items-start justify-between gap-4 border border-primary/10 bg-white px-4 py-4 text-left transition-colors duration-300 hover:border-primary/30 hover:bg-[#f4f7f5]"
    >
      <span>
        <span className="block text-[15px] font-bold text-primary">{label}</span>
        {help && <span className="mt-1 block text-[13px] leading-[1.55] text-primary/65">{help}</span>}
      </span>
      <span className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors ${on ? 'bg-accent' : 'bg-primary/20'}`}>
        <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${on ? 'left-5' : 'left-0.5'}`} />
      </span>
    </button>
  );
}

function SectionCard({ id, icon: Icon, kicker, title, children }) {
  return (
    <article id={id} className="scroll-mt-[calc(var(--header-h,180px)+12px)] overflow-hidden border border-primary/15 bg-white">
      <div className="border-b border-white/10 bg-primary px-5 py-4 text-white">
        <p className="m-0 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[1px] text-yellow">
          <Icon size={14} /> {kicker}
        </p>
        <h2 className="m-0 mt-1 text-[20px] font-black uppercase text-white">{title}</h2>
      </div>
      <div className="p-5 min-[768px]:p-6">{children}</div>
    </article>
  );
}

export default function Settings() {
  const { user, updateName, logout, ensureAccount, apiJson } = useAuth();
  const navigate = useNavigate();
  const { gateOk, gateError } = useAccountGate('/api/account/gate', '/settings');
  const [name, setName] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [savingName, setSavingName] = useState(false);

  const [password, setPassword] = useState({ current: '', next: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [passMessage, setPassMessage] = useState('');
  const [passError, setPassError] = useState('');

  const [prefs, setPrefs] = useState(defaultPrefs);
  const [prefsSaved, setPrefsSaved] = useState(false);

  useEffect(() => {
    if (!gateOk || !user?.email) return;
    let alive = true;
    (async () => {
      try {
        const data = await ensureAccount('/api/account/settings');
        if (!alive) return;
        setName(user.name || '');
        setPrefs({ ...defaultPrefs, ...(data.settings || readJson(storageKey(user.email, 'settings'), defaultPrefs)) });
      } catch {
        if (!alive) return;
        setName(user.name || '');
        setPrefs(readJson(storageKey(user.email, 'settings'), defaultPrefs));
      }
    })();
    return () => {
      alive = false;
    };
  }, [gateOk, ensureAccount, user.email, user.name]);

  useEffect(() => {
    if (!gateOk) return;
    document.documentElement.classList.toggle('farm-large-type', Boolean(prefs.largeType));
    document.documentElement.classList.toggle('farm-reduce-motion', Boolean(prefs.reduceMotion));
  }, [prefs.largeType, prefs.reduceMotion, gateOk]);

  const saveName = async (event) => {
    event.preventDefault();
    setNameMessage('');
    setNameError('');
    setSavingName(true);
    try {
      await updateName(name.trim());
      setNameMessage('The desk has the new name.');
    } catch (err) {
      setNameError(err.message);
    } finally {
      setSavingName(false);
    }
  };

  const savePassword = (event) => {
    event.preventDefault();
    setPassMessage('');
    setPassError('');
    if (password.next.length < 8) {
      setPassError('Use at least 8 characters for the new password.');
      return;
    }
    if (password.next !== password.confirm) {
      setPassError('The new password and the confirm line do not match.');
      return;
    }
    if (!password.current) {
      setPassError('Enter your current password first.');
      return;
    }
    setPassMessage('Password change is noted for this browser session. Call the desk if you also need the yard account reset.');
    setPassword({ current: '', next: '', confirm: '' });
  };

  const savePrefs = async (next) => {
    setPrefs(next);
    if (user?.email) writeJson(storageKey(user.email, 'settings'), next);
    setPrefsSaved(true);
    window.setTimeout(() => setPrefsSaved(false), 2000);
    try {
      await apiJson('/api/account/settings', { method: 'PATCH', body: JSON.stringify({ settings: next }) });
    } catch {
      navigate(`/signup?mode=login&next=${encodeURIComponent('/settings')}`, { replace: true });
    }
  };

  const patchPrefs = (key, value) => {
    savePrefs({ ...prefs, [key]: value });
  };

  const signOut = async () => {
    await logout();
    navigate('/');
  };

  const clearLocal = () => {
    if (!user?.email) return;
    ['farm', 'orders', 'watch', 'activity', 'settings'].forEach((suffix) => {
      localStorage.removeItem(storageKey(user.email, suffix));
    });
    setPrefs(defaultPrefs);
    setPrefsSaved(true);
  };

  const fieldClass =
    'w-full border border-primary/15 bg-white px-3 py-3 text-[14px] text-primary outline-none transition-colors focus:border-primary';

  const navItems = [
    ['#account-name', 'Display name'],
    ['#password', 'Password'],
    ['#notices', 'Notices'],
    ['#browse', 'Browse defaults'],
    ['#display', 'Display'],
    ['#privacy', 'Privacy'],
    ['#signout', 'Sign out'],
  ];

  return (
    <div className="bg-white text-primary">
      <section className="bg-primary text-white">
        <div className="content-wrap py-8 min-[640px]:py-10 min-[993px]:py-14">
          <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">Account controls</p>
          <h1 className="heading-fit m-0 mt-2 text-[clamp(1.6rem,4vw,2.875rem)] font-black uppercase leading-tight text-white">
            Settings
          </h1>
          <p className="prose-rail prose-rail-on-dark m-0 mt-3 max-w-[720px] text-[16px] leading-[1.75]">
            Change how you sign in, how we reach you, and how the site reads. Order tracking and farm notes stay on your Profile page.
          </p>
          {!gateOk && (
            <div className="mt-6">
              <p className="m-0 text-[15px] text-white/75">{gateError || 'Checking the desk…'}</p>
              {gateError && (
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="cta-box mt-4 px-4 py-2 text-[12px]"
                >
                  Try again
                </button>
              )}
            </div>
          )}
          {gateOk && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 border border-white px-4 py-2 text-[12px] font-extrabold uppercase text-white no-underline transition-colors duration-300 hover:border-yellow hover:bg-yellow hover:text-primary"
              >
                <UserRound size={14} /> Back to profile
              </Link>
              {prefsSaved && <p className="m-0 text-[13px] font-semibold text-yellow">Preference saved.</p>}
            </div>
          )}
        </div>
      </section>

      {gateOk && (
        <section className="content-wrap py-12 min-[993px]:py-16">
          <div className="grid gap-10 min-[1100px]:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="hidden min-[1100px]:block">
              <nav className="sticky top-[calc(var(--header-h,180px)+16px)] flex flex-col gap-1 border border-primary/15 bg-primary p-3">
                {navItems.map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    className="px-3 py-2 text-[13px] font-bold text-white/85 no-underline transition-colors duration-200 hover:bg-[#034a32] hover:text-yellow"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </aside>

            <div className="flex flex-col gap-8">
              <SectionCard id="account-name" icon={UserRound} kicker="Display name" title="What the desk calls you">
                <form onSubmit={saveName} className="grid gap-3">
                  <p className="m-0 text-[14px] leading-[1.65] text-primary/75">
                    Email stays <strong>{user.email}</strong>. To change the email on the account, call 1-800-224-8005 so the yard sheet stays matched.
                  </p>
                  <label className="block max-w-md">
                    <span className="mb-1 block text-[12px] font-bold uppercase text-primary">Full name</span>
                    <input className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} required />
                  </label>
                  {nameError && <p className="m-0 text-[13px] font-semibold text-accent">{nameError}</p>}
                  {nameMessage && <p className="m-0 text-[13px] font-semibold text-primary">{nameMessage}</p>}
                  <button
                    type="submit"
                    disabled={savingName}
                    className="cta-box w-fit cursor-pointer border-none px-5 py-3 text-[13px] disabled:opacity-60"
                  >
                    {savingName ? 'Saving…' : 'Save name'}
                  </button>
                </form>
              </SectionCard>

              <SectionCard id="password" icon={Lock} kicker="Password" title="Keep the login hard to guess">
                <form onSubmit={savePassword} className="grid max-w-md gap-3">
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-bold uppercase text-primary">Current password</span>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        className={`${fieldClass} pr-11`}
                        value={password.current}
                        onChange={(e) => setPassword({ ...password, current: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((value) => !value)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent text-primary/60"
                        aria-label={showPass ? 'Hide password' : 'Show password'}
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-bold uppercase text-primary">New password</span>
                    <input
                      type={showPass ? 'text' : 'password'}
                      className={fieldClass}
                      value={password.next}
                      onChange={(e) => setPassword({ ...password, next: e.target.value })}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-bold uppercase text-primary">Confirm new password</span>
                    <input
                      type={showPass ? 'text' : 'password'}
                      className={fieldClass}
                      value={password.confirm}
                      onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                    />
                  </label>
                  {passError && <p className="m-0 text-[13px] font-semibold text-accent">{passError}</p>}
                  {passMessage && <p className="m-0 text-[13px] font-semibold text-primary">{passMessage}</p>}
                  <button type="submit" className="cta-box w-fit cursor-pointer border-none px-5 py-3 text-[13px]">
                    Update password
                  </button>
                </form>
              </SectionCard>

              <SectionCard id="notices" icon={Bell} kicker="Notices" title="How we reach you">
                <div className="grid gap-2">
                  <p className="m-0 mb-2 text-[14px] leading-[1.65] text-primary/75">
                    These switches control messages about your account. They do not change order history on the Profile page.
                  </p>
                  <Toggle
                    on={prefs.emailOrders}
                    onChange={(value) => patchPrefs('emailOrders', value)}
                    label="Email order and freight updates"
                    help="When a truck is booked or a delivery day changes."
                  />
                  <Toggle
                    on={prefs.emailWatch}
                    onChange={(value) => patchPrefs('emailWatch', value)}
                    label="Email when a watched machine changes"
                    help="Price or availability notes on units you saved."
                  />
                  <Toggle
                    on={prefs.emailSpecials}
                    onChange={(value) => patchPrefs('emailSpecials', value)}
                    label="Email specials in your lines"
                    help="Occasional mark-downs on shelters, pumps, and iron you look at."
                  />
                  <Toggle
                    on={prefs.smsFreight}
                    onChange={(value) => patchPrefs('smsFreight', value)}
                    label="Text freight day reminders"
                    help="Short texts when the driver is due. Uses the phone on your Profile notes."
                  />
                  <Toggle
                    on={prefs.phoneOk}
                    onChange={(value) => patchPrefs('phoneOk', value)}
                    label="Desk may call this account"
                    help="Allow 1-800-224-8005 to reach you about an open order."
                  />
                  <Toggle
                    on={prefs.marketing}
                    onChange={(value) => patchPrefs('marketing', value)}
                    label="Season tips and dealer news"
                    help="Optional. Off by default."
                  />
                </div>
              </SectionCard>

              <SectionCard id="browse" icon={SlidersHorizontal} kicker="Browse defaults" title="How the lot opens for you">
                <div className="grid max-w-xl gap-3">
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-bold uppercase text-primary">Preferred equipment line</span>
                    <select className={fieldClass} value={prefs.defaultLine} onChange={(e) => patchPrefs('defaultLine', e.target.value)}>
                      <option value="all">All equipment</option>
                      <option value="shelters">Shelters</option>
                      <option value="sheds">Sheds</option>
                      <option value="tractors">Tractors</option>
                      <option value="skid">Skid</option>
                      <option value="greenhouse">Greenhouse</option>
                      <option value="irrigation">Irrigation</option>
                      <option value="parts">Parts</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-bold uppercase text-primary">Home state filter</span>
                    <input
                      className={fieldClass}
                      value={prefs.defaultState}
                      onChange={(e) => patchPrefs('defaultState', e.target.value)}
                      placeholder="e.g. Texas"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-bold uppercase text-primary">Freight preference</span>
                    <select className={fieldClass} value={prefs.freightPref} onChange={(e) => patchPrefs('freightPref', e.target.value)}>
                      <option>Ask each time</option>
                      <option>Prefer liftgate</option>
                      <option>Prefer flatbed</option>
                      <option>Dealer pickup</option>
                    </select>
                  </label>
                  <Link
                    to={prefs.defaultLine === 'all' ? '/equipment' : `/equipment?line=${prefs.defaultLine}`}
                    className="mt-1 w-fit text-[13px] font-extrabold uppercase text-accent no-underline hover:underline"
                  >
                    Open equipment with these defaults
                  </Link>
                </div>
              </SectionCard>

              <SectionCard id="display" icon={Eye} kicker="Display" title="Easier reading on this device">
                <div className="grid gap-2">
                  <Toggle
                    on={prefs.largeType}
                    onChange={(value) => patchPrefs('largeType', value)}
                    label="Larger type on this browser"
                    help="Bumps body text size for easier reading."
                  />
                  <Toggle
                    on={prefs.reduceMotion}
                    onChange={(value) => patchPrefs('reduceMotion', value)}
                    label="Reduce motion"
                    help="Asks the site to ease off animated fades when it can."
                  />
                </div>
              </SectionCard>

              <SectionCard id="privacy" icon={Shield} kicker="Privacy on this device" title="Notes stored in this browser">
                <div className="grid gap-4">
                  <p className="m-0 text-[14px] leading-[1.7] text-primary/80">
                    Farm notes, watch list, demo orders, and these settings are saved on this device under your email so the Profile page can reload them. Clearing them does not delete your login at the desk. Call if you need the server account closed.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={clearLocal}
                      className="cursor-pointer border border-accent bg-white px-4 py-3 text-[13px] font-extrabold uppercase text-accent transition-colors hover:bg-accent hover:text-white"
                    >
                      Clear local profile data
                    </button>
                    <a
                      href="mailto:welcome@farmexchange.com"
                      className="inline-flex items-center gap-2 border border-primary px-4 py-3 text-[13px] font-extrabold uppercase text-primary no-underline transition-colors hover:border-yellow hover:bg-yellow"
                    >
                      <Mail size={14} /> Ask the desk about privacy
                    </a>
                  </div>
                </div>
              </SectionCard>

              <article id="signout" className="scroll-mt-[calc(var(--header-h,180px)+12px)] overflow-hidden border border-accent/30 bg-white">
                <div className="border-b border-accent/20 bg-accent px-5 py-4 text-white">
                  <p className="m-0 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[1px] text-white/90">
                    <LogOut size={14} /> Session
                  </p>
                  <h2 className="m-0 mt-1 text-[20px] font-black uppercase text-white">Sign out of this browser</h2>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 min-[768px]:p-6">
                  <p className="m-0 max-w-[520px] text-[14px] leading-[1.7] text-primary/80">
                    Ends the signed-in session on this device and returns you to the home page. Your Profile orders and notes stay in local storage until you clear them above.
                  </p>
                  <button
                    type="button"
                    onClick={signOut}
                    className="cursor-pointer border-none bg-primary px-5 py-3 text-[13px] font-extrabold uppercase text-white transition-colors hover:bg-[#034a32]"
                  >
                    Sign out
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
