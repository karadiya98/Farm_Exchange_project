import { adminCustomers, formatMoney } from '../data';

export default function AdminCustomers() {
  return (
    <section className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="m-0 text-[18px] font-black text-primary min-[640px]:text-[20px]">Customers</h2>
          <p className="m-0 mt-1 text-[13px] text-primary/55">Buyers and dealer contacts on the desk</p>
        </div>
        <p className="m-0 text-[12px] font-extrabold uppercase text-primary/45">{adminCustomers.length} accounts</p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-primary/10 text-[10px] font-extrabold uppercase tracking-[0.06em] text-primary/45">
              <th className="py-2 pr-3 font-extrabold">Customer</th>
              <th className="px-2 py-2 font-extrabold">State</th>
              <th className="px-2 py-2 font-extrabold">Orders</th>
              <th className="px-2 py-2 text-right font-extrabold">Spent</th>
              <th className="py-2 pl-2 font-extrabold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {adminCustomers.map((row) => (
              <tr key={row.id} className="border-b border-primary/8 hover:bg-[#f6f9f7]">
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-[10px] font-black text-white">
                      {row.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <p className="m-0 font-bold text-primary">{row.name}</p>
                      <p className="m-0 text-[11px] text-primary/50">{row.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 font-semibold">{row.state}</td>
                <td className="px-2 py-3 font-semibold">{row.orders}</td>
                <td className="px-2 py-3 text-right font-black">{formatMoney(row.spent)}</td>
                <td className="py-3 pl-2 text-primary/65">{row.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
