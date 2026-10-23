import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Clock3,
  Download,
  Package,
  Phone,
  Settings as SettingsIcon,
  ShieldCheck,
  Truck,
  UserRound,
} from 'lucide-react';
import { useAuth } from '../auth';
import useAccountGate from '../hooks/useAccountGate';
import {
  demoOrders,
  downloadInvoice,
  formatMoney,
  getRecentOrders,
  orderGrandTotal,
  statusMeta,
} from '../data/orders';

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

function defaultWatch() {
  return [
    { id: 6, name: '2021 Row Tractor', line: 'Tractors', price: '$46,800', yard: 'Temple, Texas' },
    { id: 5, name: '2026 40ft Span Shelter', line: 'Shelters', price: '$4,599', yard: 'SHERIDAN, WY' },
    { id: 13, name: 'Gothic House 20x48', line: 'Greenhouse', price: '$3,480', yard: 'Yuma, Arizona' },
  ];
}

function defaultActivity() {
  return [
    { when: 'Today', text: 'Freight update for order FX-24018: truck left the Sheridan yard.' },
    { when: 'Yesterday', text: 'You saved Gothic House 20x48 to your watch list.' },
    { when: 'Oct 8', text: 'Payment recorded for FX 30x40 Shelter. Written sheet emailed.' },
    { when: 'Sep 29', text: 'Diesel pump marked delivered at the farm lane.' },
    { when: 'Sep 22', text: 'Account opened at the Farm Exchange desk.' },
  ];
}

const emptyFarm = {
  phone: '',
  farm: '',
  state: '',
  city: '',
  gate: 'Liftgate OK',
  notes: '',
};

export default function Profile() {
  const { user, ensureAccount, apiJson } = useAuth();
  const navigate = useNavigate();
  const { gateOk, gateError } = useAccountGate('/api/account/gate', '/profile');
  const [farm, setFarm] = useState(emptyFarm);
  const [savedFarm, setSavedFarm] = useState(false);
  const [watch, setWatch] = useState([]);
  const [activity, setActivity] = useState([]);

  const orders = demoOrders;
  const recentOrders = useMemo(() => getRecentOrders(3), []);
  const activeCount = useMemo(
    () => orders.filter((order) => order.status !== 'delivered' && order.status !== 'canceled').length,
    [orders],
  );
  const deliveredCount = useMemo(
    () => orders.filter((order) => order.status === 'delivered').length,
    [orders],
  );

  useEffect(() => {
    if (!gateOk || !user?.email) return;
    let alive = true;
    (async () => {
      try {
        const data = await ensureAccount('/api/account/profile');
        if (!alive) return;
        if (data.farm) setFarm({ ...emptyFarm, ...data.farm });
        else setFarm(readJson(storageKey(user.email, 'farm'), emptyFarm));
      } catch {
        if (alive) setFarm(readJson(storageKey(user.email, 'farm'), emptyFarm));
      }
      if (!alive) return;
      setWatch(readJson(storageKey(user.email, 'watch'), defaultWatch()));
      setActivity(readJson(storageKey(user.email, 'activity'), defaultActivity()));
    })();
    return () => {
      alive = false;
    };
  }, [gateOk, ensureAccount, user.email, user.name]);

  const saveFarm = async (event) => {
    event.preventDefault();
    if (!user?.email) return;
    try {
      await apiJson('/api/account/profile', { method: 'PATCH', body: JSON.stringify(farm) });
      writeJson(storageKey(user.email, 'farm'), farm);
      setSavedFarm(true);
      const nextActivity = [{ when: 'Just now', text: 'Farm and gate notes updated on the profile.' }, ...activity].slice(0, 8);
      setActivity(nextActivity);
      writeJson(storageKey(user.email, 'activity'), nextActivity);
      window.setTimeout(() => setSavedFarm(false), 2500);
    } catch {
      navigate(`/signup?mode=login&next=${encodeURIComponent('/profile')}`, { replace: true });
    }
  };

  const removeWatch = (id) => {
    const next = watch.filter((item) => item.id !== id);
    setWatch(next);
    if (user?.email) writeJson(storageKey(user.email, 'watch'), next);
  };

  const fieldClass =
    'w-full border border-primary/15 bg-white px-3 py-3 text-[14px] text-primary outline-none transition-colors focus:border-primary';

  return (
    <div className="bg-white text-primary">
      <section className="bg-primary text-white">
        <div className="content-wrap py-8 min-[640px]:py-10 min-[993px]:py-14">
          <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">Your account</p>
          <h1 className="heading-fit m-0 mt-2 text-[clamp(1.6rem,4vw,2.875rem)] font-black uppercase leading-tight text-white">
            Profile
          </h1>
          <p className="prose-rail prose-rail-on-dark m-0 mt-3 max-w-[720px] text-[16px] leading-[1.75]">
            See who is on the account, track freight, read order history, and keep farm notes the desk can use. Name and password changes live under Settings.
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
            <div className="mt-8 grid gap-4 min-[768px]:grid-cols-2 min-[768px]:items-stretch">
              <article className="flex h-full flex-col border border-white/15 bg-white p-5 text-primary min-[768px]:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center bg-primary text-white">
                      <UserRound size={28} />
                    </span>
                    <div>
                      <p className="m-0 section-kicker text-[12px] font-extrabold uppercase tracking-[0.08em]">Signed in</p>
                      <h2 className="m-0 mt-1 text-[24px] font-black leading-tight">{user.name}</h2>
                      <p className="m-0 mt-1 text-[15px] text-primary/75">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/settings"
                    className="inline-flex items-center gap-2 border border-primary px-4 py-2 text-[12px] font-extrabold uppercase text-primary no-underline transition-colors duration-300 hover:border-yellow hover:bg-yellow"
                  >
                    <SettingsIcon size={14} /> Account settings
                  </Link>
                </div>
                <div className="mt-auto grid gap-3 pt-6 min-[640px]:grid-cols-3">
                  {[
                    ['Active orders', String(activeCount)],
                    ['Delivered', String(deliveredCount)],
                    ['Watching', String(watch.length)],
                  ].map(([label, value]) => (
                    <div key={label} className="border border-primary/15 bg-primary px-4 py-3 text-white">
                      <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.06em] text-yellow">{label}</p>
                      <p className="m-0 mt-1 text-[22px] font-black text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </article>
              <article className="flex h-full flex-col border border-white/15 bg-[#034a32] p-5 text-white min-[768px]:p-7">
                <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">Desk line</p>
                <h2 className="m-0 mt-2 text-[22px] font-black uppercase leading-tight text-white">Need the yard on a unit?</h2>
                <p className="prose-rail prose-rail-on-dark m-0 mt-3 text-[15px] leading-[1.7]">
                  Call with your order number or yard tag. The same people who sold the iron can read the freight window back to you.
                </p>
                <a href="tel:18002248005" className="cta-box mt-5 w-fit px-5 py-3 text-[13px] min-[768px]:mt-auto min-[768px]:pt-5">
                  <Phone size={15} /> 1-800-224-8005
                </a>
              </article>
            </div>
          )}
        </div>
      </section>

      {gateOk && (
        <>
          <section className="content-wrap py-12 min-[993px]:py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Recent orders</p>
                <h2 className="m-0 mt-2 text-[24px] font-black uppercase leading-tight min-[640px]:text-[30px]">
                  Last 3 on the account
                </h2>
                <p className="m-0 mt-2 max-w-[560px] text-[14px] leading-[1.65] text-primary/70 min-[640px]:text-[15px]">
                  Track freight, read payments, and download invoices. Open the full list for every sheet.
                </p>
              </div>
              <Link
                to="/orders"
                className="cta-box px-4 py-2.5 text-[12px] no-underline"
              >
                View all orders <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-6 grid gap-4">
              {recentOrders.map((order) => {
                const meta = statusMeta(order.status);
                const grand = orderGrandTotal(order);
                return (
                  <article
                    key={order.id}
                    className="border border-primary/15 bg-white p-4 transition-colors hover:border-primary/35 min-[640px]:p-5 min-[993px]:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="m-0 section-kicker text-[12px] font-extrabold uppercase tracking-[0.08em]">{order.id}</p>
                          <span className={`px-2 py-1 text-[10px] font-extrabold uppercase ${meta.tone}`}>{meta.label}</span>
                        </div>
                        <h3 className="m-0 mt-1.5 text-[17px] font-black leading-tight min-[640px]:text-[20px]">
                          {order.title}
                        </h3>
                        <p className="m-0 mt-1.5 text-[13px] text-primary/65">
                          {order.yard} · Placed {order.placed} · {formatMoney(grand)}
                        </p>
                        <p className="m-0 mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-semibold text-primary/80">
                          <span className="inline-flex items-center gap-1.5">
                            <Truck size={14} className="text-accent" /> {order.eta}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Package size={14} /> {(order.transactions || []).length} transaction{(order.transactions || []).length === 1 ? '' : 's'}
                          </span>
                        </p>
                      </div>
                      <div className="flex w-full flex-col gap-2 min-[480px]:w-auto min-[480px]:flex-row min-[993px]:flex-col">
                        <Link
                          to={`/orders/${order.id}`}
                          className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white no-underline transition-colors hover:bg-accent"
                        >
                          Track order
                        </Link>
                        <button
                          type="button"
                          onClick={() => downloadInvoice(order, user?.name, user?.email)}
                          className="inline-flex cursor-pointer items-center justify-center gap-2 border border-primary bg-white px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.06em] text-primary transition-colors hover:bg-yellow"
                        >
                          <Download size={14} /> Invoice
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {(order.steps || []).map((step, index) => {
                        const done = index <= (order.stepIndex ?? 0);
                        return (
                          <span
                            key={step}
                            className={`shrink-0 px-2.5 py-1 text-[10px] font-extrabold uppercase ${
                              done ? 'bg-accent text-white' : 'bg-primary/5 text-primary/40'
                            }`}
                          >
                            {step}
                          </span>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-primary/15 bg-[#f4f7f5] px-4 py-4 min-[640px]:px-5">
              <p className="m-0 text-[14px] font-semibold text-primary/80">
                {orders.length} orders on this account · {activeCount} open
              </p>
              <Link
                to="/orders"
                className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.06em] text-accent no-underline hover:text-primary"
              >
                View all orders <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          <section className="content-wrap py-12 min-[993px]:py-16">
            <div className="grid gap-10 min-[993px]:grid-cols-2">
              <div>
                <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Farm notes</p>
                <h2 className="m-0 mt-2 text-[24px] font-black uppercase leading-tight">Gate and place for the desk</h2>
                <p className="m-0 mt-3 text-[15px] leading-[1.7] text-primary/75">
                  These notes help freight. They are not your login. Change your display name under Settings.
                </p>
                <form onSubmit={saveFarm} className="mt-6 grid gap-3 border border-primary/15 bg-white p-5 min-[768px]:p-6">
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-bold uppercase text-primary">Phone</span>
                    <input className={fieldClass} value={farm.phone} onChange={(e) => setFarm({ ...farm, phone: e.target.value })} placeholder="(555) 000-0000" />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-bold uppercase text-primary">Farm or company</span>
                    <input className={fieldClass} value={farm.farm} onChange={(e) => setFarm({ ...farm, farm: e.target.value })} placeholder="Hale Family Farm" />
                  </label>
                  <div className="grid gap-3 min-[640px]:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-[12px] font-bold uppercase text-primary">City</span>
                      <input className={fieldClass} value={farm.city} onChange={(e) => setFarm({ ...farm, city: e.target.value })} />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[12px] font-bold uppercase text-primary">State</span>
                      <input className={fieldClass} value={farm.state} onChange={(e) => setFarm({ ...farm, state: e.target.value })} placeholder="Texas" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-bold uppercase text-primary">Gate</span>
                    <select className={fieldClass} value={farm.gate} onChange={(e) => setFarm({ ...farm, gate: e.target.value })}>
                      <option>Liftgate OK</option>
                      <option>Flatbed only</option>
                      <option>Call before turn-in</option>
                      <option>Soft lane after rain</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[12px] font-bold uppercase text-primary">Notes for the driver</span>
                    <textarea
                      className={`${fieldClass} min-h-[110px] resize-y`}
                      value={farm.notes}
                      onChange={(e) => setFarm({ ...farm, notes: e.target.value })}
                      placeholder="Second gate on the west side. Do not block the feed alley."
                    />
                  </label>
                  {savedFarm && <p className="m-0 text-[13px] font-semibold text-primary">Farm notes saved on this device.</p>}
                  <button type="submit" className="cta-box w-fit cursor-pointer border-none px-5 py-3 text-[13px]">
                    Save farm notes
                  </button>
                </form>
              </div>

              <div>
                <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Watch list</p>
                <h2 className="m-0 mt-2 text-[24px] font-black uppercase leading-tight">Machines you are watching</h2>
                <p className="m-0 mt-3 text-[15px] leading-[1.7] text-primary/75">
                  Units you want the desk to remember. Open the card or remove it when you are done looking.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  {watch.map((item) => (
                    <article
                      key={item.id}
                      className="group border border-primary/15 bg-white p-4 transition-colors duration-300 hover:border-primary hover:bg-primary"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="section-kicker m-0 text-[11px] font-extrabold uppercase transition-colors group-hover:text-yellow">{item.line}</p>
                          <h3 className="m-0 mt-1 text-[16px] font-black transition-colors group-hover:text-white">{item.name}</h3>
                          <p className="m-0 mt-1 text-[13px] text-primary/70 transition-colors group-hover:text-white/80">
                            {item.yard} · {item.price}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to={`/listing/${item.id}`}
                            className="border border-primary px-3 py-2 text-[11px] font-extrabold uppercase text-primary no-underline transition-colors group-hover:border-yellow group-hover:bg-yellow group-hover:text-primary"
                          >
                            View
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeWatch(item.id)}
                            className="cursor-pointer border border-accent/40 bg-white px-3 py-2 text-[11px] font-extrabold uppercase text-accent transition-colors hover:bg-accent hover:text-white group-hover:border-white/40 group-hover:bg-transparent group-hover:text-white"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                  {watch.length === 0 && (
                    <p className="m-0 border border-primary/15 bg-[#f4f7f5] p-4 text-[14px] text-primary/75">
                      Your watch list is empty.{' '}
                      <Link to="/equipment" className="font-extrabold text-accent no-underline">
                        Browse equipment
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary text-white">
            <div className="content-wrap py-12 min-[993px]:py-16">
              <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">Recent activity</p>
              <h2 className="m-0 mt-2 text-[24px] font-black uppercase leading-tight text-white">What happened on this account</h2>
              <ol className="m-0 mt-8 list-none p-0">
                {activity.map((item) => (
                  <li key={`${item.when}-${item.text}`} className="flex gap-4 border-t border-white/10 py-4 first:border-t-0 first:pt-0">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center bg-[#034a32] text-yellow">
                      <Clock3 size={16} />
                    </span>
                    <div>
                      <p className="m-0 text-[12px] font-extrabold uppercase text-yellow">{item.when}</p>
                      <p className="m-0 mt-1 text-[15px] leading-[1.65] text-white/85">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="content-wrap py-12 min-[993px]:py-16">
            <div className="grid gap-4 min-[768px]:grid-cols-3">
              {[
                { to: '/equipment', icon: Package, title: 'Browse equipment', body: 'Open tagged units on the lot.' },
                { to: '/specials', icon: ShieldCheck, title: 'See specials', body: 'Mark-downs with the same yard facts.' },
                { to: '/contact', icon: Phone, title: 'Write the desk', body: 'Send a note about freight or a want list.' },
              ].map(({ to, icon: Icon, title, body }) => (
                <Link
                  key={to}
                  to={to}
                  className="group border border-primary/15 bg-white p-5 no-underline transition-colors duration-300 hover:border-primary hover:bg-primary"
                >
                  <Icon size={22} className="text-accent transition-colors group-hover:text-yellow" />
                  <h3 className="m-0 mt-3 text-[16px] font-black uppercase transition-colors group-hover:text-white">{title}</h3>
                  <p className="m-0 mt-2 text-[14px] leading-[1.6] text-primary/75 transition-colors group-hover:text-white/85">{body}</p>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
