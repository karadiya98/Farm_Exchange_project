import { Link } from 'react-router-dom';
import { adminOrderRows } from '../data';
import { statusMeta } from '../../data/orders';

export default function AdminOrders() {
  const rows = adminOrderRows();

  return (
    <section className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="m-0 text-[18px] font-black text-primary min-[640px]:text-[20px]">Orders</h2>
          <p className="m-0 mt-1 text-[13px] text-primary/55">All desk sheets · freight and payments</p>
        </div>
        <p className="m-0 text-[12px] font-extrabold uppercase text-primary/45">{rows.length} orders</p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-primary/10 text-[10px] font-extrabold uppercase tracking-[0.06em] text-primary/45">
              <th className="py-2 pr-3 font-extrabold">Order</th>
              <th className="px-2 py-2 font-extrabold">Machine</th>
              <th className="px-2 py-2 font-extrabold">Yard</th>
              <th className="px-2 py-2 font-extrabold">Status</th>
              <th className="px-2 py-2 text-right font-extrabold">Paid</th>
              <th className="py-2 pl-2 font-extrabold"> </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((order) => {
              const meta = statusMeta(order.status);
              return (
                <tr key={order.id} className="border-b border-primary/8 hover:bg-[#f6f9f7]">
                  <td className="py-3 pr-3 font-extrabold text-accent">{order.id}</td>
                  <td className="px-2 py-3">
                    <p className="m-0 font-bold text-primary">{order.title}</p>
                    <p className="m-0 mt-0.5 text-[11px] text-primary/50">{order.placed}</p>
                  </td>
                  <td className="px-2 py-3 font-semibold text-primary/75">{order.yard}</td>
                  <td className="px-2 py-3">
                    <span className={`inline-block px-2 py-1 text-[10px] font-extrabold uppercase ${meta.tone}`}>{meta.label}</span>
                  </td>
                  <td className="px-2 py-3 text-right font-black">{order.paidLabel}</td>
                  <td className="py-3 pl-2 text-right">
                    <Link to={`/orders/${order.id}`} className="text-[11px] font-extrabold uppercase text-primary no-underline hover:text-accent">
                      Open
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
