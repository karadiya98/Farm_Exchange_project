import { useState } from 'react';
import { performanceByRange, recentActivities } from '../data';

export default function AdminAnalytics() {
  const [range, setRange] = useState('month');
  const stats = performanceByRange[range];

  return (
    <div className="flex flex-col gap-3 min-[640px]:gap-4">
      <section className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="m-0 text-[18px] font-black text-primary">Analytics</h2>
            <p className="m-0 mt-1 text-[13px] text-primary/55">Views, visits, and conversion on the lot</p>
          </div>
          <div className="flex rounded-full bg-[#eef3f0] p-0.5">
            {['day', 'week', 'month', 'year'].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setRange(id)}
                className={`cursor-pointer rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase ${
                  range === id ? 'bg-primary text-white' : 'border-none bg-transparent text-primary/55'
                }`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5 min-[768px]:grid-cols-4">
          {[
            ['Views', stats.views],
            ['Visits', stats.visits],
            ['Orders', stats.orders],
            ['Conversion', stats.conversion],
          ].map(([label, row]) => (
            <div key={label} className="rounded-xl border border-primary/10 bg-[#f6f9f7] p-3.5">
              <p className="m-0 text-[11px] font-extrabold uppercase text-primary/45">{label}</p>
              <p className="m-0 mt-1 text-[22px] font-black text-primary">{row.value}</p>
              <p className="m-0 mt-1 text-[11px] font-semibold text-primary/55">
                <span className={row.delta >= 0 ? 'text-primary' : 'text-accent'}>
                  {row.delta >= 0 ? '+' : ''}
                  {row.delta}%
                </span>{' '}
                {row.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-5">
        <h2 className="m-0 text-[16px] font-black text-primary">Activity stream</h2>
        <ul className="m-0 mt-3 list-none divide-y divide-primary/8 p-0">
          {recentActivities.map((row) => (
            <li key={row.id} className="flex items-center justify-between gap-3 py-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-black text-primary">
                  {row.who.slice(0, 2).toUpperCase()}
                </span>
                <p className="m-0 truncate text-[13px] text-primary">
                  <strong>{row.who}</strong> {row.action}
                </p>
              </div>
              <span className="shrink-0 text-[11px] font-semibold text-primary/45">{row.when}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
