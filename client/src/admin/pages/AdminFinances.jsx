import { adminOrderRows, financeSummary, formatMoney, totalRevenue } from '../data';
import RevenueChart from '../RevenueChart';

export default function AdminFinances() {
  const summary = financeSummary();
  const rows = adminOrderRows();

  return (
    <div className="flex flex-col gap-3 min-[640px]:gap-4">
      <div className="grid grid-cols-2 gap-2.5 min-[768px]:grid-cols-4 min-[768px]:gap-3">
        {[
          ['Captured', summary.capturedLabel],
          ['Freight collected', summary.freightLabel],
          ['Open orders', String(summary.open)],
          ['Invoices', String(summary.invoices)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-4">
            <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.06em] text-primary/45">{label}</p>
            <p className="m-0 mt-1 text-[20px] font-black text-primary min-[640px]:text-[22px]">{value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="m-0 text-[16px] font-black text-primary">Yard revenue</h2>
            <p className="m-0 mt-1 text-[12px] text-primary/50">Demo annual curve · {formatMoney(totalRevenue)}</p>
          </div>
        </div>
        <div className="mt-2">
          <RevenueChart />
        </div>
      </section>

      <section className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-5">
        <h2 className="m-0 text-[16px] font-black text-primary">Recent payments</h2>
        <div className="mt-3 flex flex-col gap-2">
          {rows.flatMap((order) =>
            (order.transactions || []).map((tx) => (
              <div key={tx.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-primary/8 bg-[#f6f9f7] px-3 py-2.5">
                <div>
                  <p className="m-0 text-[12px] font-extrabold uppercase text-accent">{tx.id}</p>
                  <p className="m-0 mt-0.5 text-[13px] font-bold text-primary">
                    {order.id} · {tx.type}
                  </p>
                  <p className="m-0 text-[11px] text-primary/50">{tx.when} · {tx.method}</p>
                </div>
                <div className="text-right">
                  <p className="m-0 text-[15px] font-black text-primary">{formatMoney(tx.amount)}</p>
                  <p className="m-0 text-[10px] font-extrabold uppercase text-primary/45">{tx.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
