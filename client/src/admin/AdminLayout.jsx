import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Boxes,
  ChevronDown,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Package,
  Settings,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { useAuth } from '../auth';
import { adminYards } from './data';

const navGroups = [
  {
    label: 'Desk',
    items: [
      { to: '/admin', end: true, label: 'Overview', icon: LayoutDashboard },
      { to: '/admin/finances', label: 'Finances', icon: Wallet },
      { to: '/admin/orders', label: 'Orders', icon: Package },
      { to: '/admin/listings', label: 'Listings', icon: Boxes },
    ],
  },
  {
    label: 'Grow',
    items: [
      { to: '/admin/customers', label: 'Customers', icon: Users },
      { to: '/admin/ads', label: 'Side-rail ads', icon: Megaphone },
      { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors ${
    isActive
      ? 'bg-white/15 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]'
      : 'text-white/70 hover:bg-white/8 hover:text-white'
  }`;

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [yardId, setYardId] = useState(adminYards[0].id);
  const yard = adminYards.find((y) => y.id === yardId) || adminYards[0];
  const signOut = async () => {
    await logout();
    navigate('/');
  };

  const Sidebar = (
    <div className="flex h-full min-h-0 flex-col bg-[linear-gradient(180deg,#02462e_0%,#013524_55%,#012a1d_100%)] text-white">
      <div className="shrink-0 border-b border-white/10 px-4 py-4">
        <Link
          to="/admin"
          className="block text-[17px] font-black uppercase tracking-[0.06em] text-white no-underline"
          onClick={() => setOpen(false)}
        >
          Farm Exchange
        </Link>
        <p className="m-0 mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f0c419]">Admin desk</p>
        <label className="mt-3 block">
          <span className="sr-only">Yard</span>
          <div className="relative">
            <select
              value={yardId}
              onChange={(e) => setYardId(e.target.value)}
              className="w-full appearance-none rounded-lg border border-white/15 bg-white/8 py-2 pl-3 pr-8 text-[12px] font-semibold text-white outline-none focus:border-white/35"
            >
              {adminYards.map((item) => (
                <option key={item.id} value={item.id} className="bg-[#02462e] text-white">
                  {item.name}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50" />
          </div>
          <span className="mt-1 block truncate text-[11px] text-white/45">{yard.email}</span>
        </label>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-3">
            <p className="m-0 px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white/35">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink key={item.to} to={item.to} end={item.end} className={linkClass} onClick={() => setOpen(false)}>
                    <Icon size={16} strokeWidth={2.25} />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
        <NavLink to="/admin/settings" className={linkClass} onClick={() => setOpen(false)}>
          <Settings size={16} strokeWidth={2.25} />
          Settings
        </NavLink>
      </nav>

      <div className="shrink-0 border-t border-white/10 p-3">
        <div className="rounded-xl border border-white/10 bg-white/6 p-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f0c419] text-[12px] font-black text-[#02462e]">
              {(user?.name || 'AD').slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="m-0 truncate text-[13px] font-bold text-white">{user?.name || 'Admin'}</p>
              <p className="m-0 truncate text-[11px] text-white/45">{user?.email || '—'}</p>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-0.5">
            <Link
              to="/profile"
              className="rounded-md px-2 py-1.5 text-[12px] font-semibold text-white/65 no-underline hover:bg-white/8 hover:text-white"
              onClick={() => setOpen(false)}
            >
              Your profile
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="flex cursor-pointer items-center gap-2 rounded-md border-none bg-transparent px-2 py-1.5 text-left text-[12px] font-semibold text-[#ff8a7a] hover:bg-white/8"
            >
              <LogOut size={13} /> Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-svh bg-[linear-gradient(160deg,#e8f0eb_0%,#f4f7f5_40%,#eef2ef_100%)] text-primary">
      {/* Fixed desktop sidebar — stays put while main content scrolls */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[248px] overflow-hidden shadow-[4px_0_24px_rgb(2_70_46/0.12)] min-[993px]:block min-[1600px]:w-[268px]">
        {Sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-[80] min-[993px]:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 border-none bg-[#012a1d]/55" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[min(86vw,288px)] overflow-hidden shadow-[8px_0_32px_rgb(1_42_29/0.35)]">
            <div className="absolute right-2 top-2 z-10">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg border-none bg-white/10 text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="h-full overflow-hidden">{Sidebar}</div>
          </aside>
        </div>
      )}

      <div className="flex min-h-svh min-w-0 flex-col min-[993px]:ml-[248px] min-[1600px]:ml-[268px]">
        <header className="sticky top-0 z-40 border-b border-primary/8 bg-[#f4f7f5]/90 px-3 py-3.5 backdrop-blur-md min-[640px]:px-5 min-[993px]:px-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl border border-primary/12 bg-white text-primary shadow-sm min-[993px]:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open admin menu"
              >
                <Menu size={18} />
              </button>
              <div className="min-w-0">
                <p className="m-0 text-[10px] font-extrabold uppercase tracking-[0.14em] text-accent">Yard desk</p>
                <h1 className="m-0 truncate text-[22px] font-black tracking-tight text-primary min-[640px]:text-[26px]">
                  Hello, Admin
                </h1>
              </div>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white no-underline shadow-[0_8px_20px_rgb(2_70_46/0.22)] transition-colors hover:bg-[#034a32]"
            >
              <ExternalLink size={14} /> Open site
            </a>
          </div>
        </header>

        <div className="min-w-0 flex-1 px-3 py-4 min-[640px]:px-5 min-[640px]:py-5 min-[993px]:px-7 min-[993px]:py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
