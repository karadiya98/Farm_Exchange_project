import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, TrendingDown, TrendingUp, X } from 'lucide-react';
import RevenueChart from '../RevenueChart';
import {
  deskTips,
  formatMoney,
  listingStats,
  performanceByRange,
  recentActivities,
  totalRevenue,
} from '../data';

const ranges = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

function MetricCard({ label, value, note, delta }) {
  const up = delta >= 0;
  return (
    <div className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_8px_24px_rgb(2_70_46/0.04)] min-[640px]:p-4">
      <p className="m-0 text-[12px] font-semibold text-primary/55">{label}</p>
      <div className="mt-1.5 flex flex-wrap items-end justify-between gap-2">
        <p className="m-0 text-[22px] font-black tracking-tight text-primary min-[640px]:text-[26px] min-[1600px]:text-[28px]">{value}</p>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-extrabold ${
            up ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
          }`}
        >
          {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {up ? '+' : ''}
          {delta}%
        </span>
      </div>
      <p className="m-0 mt-1 text-[11px] text-primary/45">{note}</p>
    </div>
  );
}

export default function Dashboard() {
  const [range, setRange] = useState('month');
  const [banner, setBanner] = useState(true);
  const stats = performanceByRange[range];
  const tip = deskTips[0];

  return (
    <div className="flex flex-col gap-3 min-[640px]:gap-4">
      {banner && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-yellow/40 bg-yellow/25 px-3.5 py-2.5 min-[640px]:px-4">
          <p className="m-0 text-[12px] font-semibold text-primary min-[640px]:text-[13px]">
            Freight windows are filling for October — review open orders before the weekend trucks leave.
          </p>
          <div className="flex items-center gap-2">
            <Link to="/admin/orders" className="rounded-lg bg-primary px-3 py-1.5 text-[11px] font-extrabold uppercase text-white no-underline">
              Review orders
            </Link>
            <button type="button" aria-label="Dismiss" onClick={() => setBanner(false)} className="grid h-8 w-8 place-items-center border-none bg-transparent text-primary/60">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-3 min-[1100px]:grid-cols-[minmax(0,1.55fr)_minmax(260px,0.85fr)] min-[1100px]:gap-4">
        <div className="flex flex-col gap-3 min-[640px]:gap-4">
          <section className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="m-0 text-[15px] font-black text-primary min-[640px]:text-[16px]">Lot performance</h2>
              <div className="flex rounded-full bg-[#eef3f0] p-0.5">
                {ranges.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRange(item.id)}
                    className={`cursor-pointer rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.04em] transition-colors ${
                      range === item.id ? 'bg-primary text-white' : 'border-none bg-transparent text-primary/55 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2.5 min-[640px]:gap-3">
              <MetricCard label="Total views" value={stats.views.value} note={stats.views.note} delta={stats.views.delta} />
              <MetricCard label="Visits" value={stats.visits.value} note={stats.visits.note} delta={stats.visits.delta} />
              <MetricCard label="Orders" value={stats.orders.value} note={stats.orders.note} delta={stats.orders.delta} />
              <MetricCard label="Conversion rate" value={stats.conversion.value} note={stats.conversion.note} delta={stats.conversion.delta} />
            </div>
          </section>

          <section className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="m-0 text-[15px] font-black text-primary min-[640px]:text-[16px]">Revenue</h2>
                <p className="m-0 mt-1 text-[11px] font-semibold text-primary/45">Last year · demo yard totals</p>
              </div>
              <div className="text-right">
                <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.06em] text-primary/45">Total revenue</p>
                <p className="m-0 text-[22px] font-black text-primary min-[640px]:text-[26px]">{formatMoney(totalRevenue)}</p>
                <p className="m-0 text-[11px] font-semibold text-primary">
                  <span className="text-accent">+8.4%</span> vs prior year
                </p>
              </div>
            </div>
            <div className="mt-2">
              <RevenueChart />
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-3 min-[640px]:gap-4">
          <section className="rounded-2xl border border-primary/10 bg-[linear-gradient(160deg,#02462e_0%,#013524_100%)] p-3.5 text-white shadow-[0_12px_32px_rgb(2_70_46/0.25)] min-[640px]:p-5">
            <p className="m-0 text-[10px] font-extrabold uppercase tracking-[0.1em] text-yellow">Yard advisor</p>
            <h3 className="m-0 mt-1.5 text-[16px] font-black leading-snug">{tip.title}</h3>
            <p className="m-0 mt-1.5 text-[13px] leading-[1.5] text-white/80">{tip.body}</p>
            <Link to={tip.href} className="mt-3 inline-flex items-center gap-1 text-[12px] font-extrabold uppercase text-yellow no-underline hover:text-white">
              Open <ArrowUpRight size={14} />
            </Link>
          </section>

          <section className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-5">
            <h2 className="m-0 text-[15px] font-black text-primary">Listings</h2>
            <ul className="m-0 mt-3 list-none space-y-2.5 p-0">
              {[
                ['Active on the lot', listingStats.active],
                ['Specials', listingStats.specials],
                ['Featured', listingStats.featured],
                ['Ads pending review', listingStats.pendingAds],
              ].map(([label, value]) => (
                <li key={label} className="flex items-center justify-between gap-3 text-[13px]">
                  <span className="font-semibold text-primary/65">{label}</span>
                  <span className="font-black text-primary">{value}</span>
                </li>
              ))}
            </ul>
            <Link to="/admin/listings" className="mt-3 inline-flex text-[12px] font-extrabold uppercase text-accent no-underline hover:text-primary">
              Manage listings
            </Link>
          </section>

          <section className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="m-0 text-[15px] font-black text-primary">Recent activity</h2>
              <Link to="/admin/orders" className="text-[11px] font-extrabold uppercase text-primary/45 no-underline hover:text-accent">
                View
              </Link>
            </div>
            <ul className="m-0 mt-3 list-none space-y-3 p-0">
              {recentActivities.slice(0, 5).map((row) => (
                <li key={row.id} className="flex gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-black text-primary">
                    {row.who.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="m-0 text-[12px] leading-snug text-primary">
                      <strong className="font-bold">{row.who}</strong> {row.action}
                    </p>
                    <p className="m-0 mt-0.5 text-[11px] text-primary/45">{row.when}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
