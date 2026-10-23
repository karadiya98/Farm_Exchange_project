import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Package, Search, Truck } from 'lucide-react';
import useAccountGate from '../hooks/useAccountGate';
import { useAuth } from '../auth';
import {
  demoOrders,
  downloadInvoice,
  formatMoney,
  orderGrandTotal,
  statusMeta,
} from '../data/orders';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'canceled', label: 'Canceled' },
];

function isOpen(status) {
  return status !== 'delivered' && status !== 'canceled';
}

export default function Orders() {
  const { user } = useAuth();
  const { gateOk, gateError } = useAccountGate('/api/account/gate', '/orders');
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    const q = query.trim().toUpperCase();
    return demoOrders.filter((order) => {
      if (filter === 'open' && !isOpen(order.status)) return false;
      if (filter === 'delivered' && order.status !== 'delivered') return false;
      if (filter === 'canceled' && order.status !== 'canceled') return false;
      if (!q) return true;
      return (
        order.id.toUpperCase().includes(q) ||
        order.title.toUpperCase().includes(q) ||
        order.serial.toUpperCase().includes(q) ||
        order.yard.toUpperCase().includes(q)
      );
    });
  }, [filter, query]);

  if (!gateOk) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 bg-white px-4 py-16 text-primary">
        <p className="m-0 text-[15px] font-semibold text-primary/70">{gateError || 'Checking the desk…'}</p>
        {gateError && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="cursor-pointer border border-primary bg-white px-4 py-2 text-[12px] font-extrabold uppercase text-primary"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white text-primary">
      <section className="bg-primary text-white">
        <div className="content-wrap py-8 min-[640px]:py-10 min-[993px]:py-14">
          <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">Account · Orders</p>
          <h1 className="heading-fit m-0 mt-2 text-[clamp(1.5rem,4vw,2.75rem)] font-black uppercase leading-tight text-white">
            Track your orders
          </h1>
          <p className="prose-rail prose-rail-on-dark m-0 mt-3 max-w-[720px] text-[15px] leading-[1.7] min-[640px]:text-[16px]">
            Open freight, delivered sheets, payments, and invoices for {user?.name || 'your account'}. Sample order sheets are shown here for layout; call the desk with your yard number for a live order status.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 border border-white px-4 py-2 text-[12px] font-extrabold uppercase text-white no-underline transition-colors hover:border-yellow hover:bg-yellow hover:text-primary"
            >
              Back to profile
            </Link>
            <a href="tel:18002248005" className="cta-box px-4 py-2 text-[12px]">
              Call the desk
            </a>
          </div>
        </div>
      </section>

      <section className="content-wrap py-8 min-[640px]:py-10 min-[993px]:py-14">
        <div className="flex flex-col gap-4 min-[768px]:flex-row min-[768px]:items-end min-[768px]:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`cursor-pointer border px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.06em] transition-colors min-[640px]:px-4 min-[640px]:text-[12px] ${
                  filter === item.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-primary/20 bg-white text-primary hover:border-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <label className="relative block w-full min-[768px]:max-w-[320px]">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary/45" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Order #, serial, yard…"
              className="w-full border border-primary/15 bg-white py-3 pl-10 pr-3 text-[14px] text-primary outline-none focus:border-primary"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-4 min-[1100px]:gap-5">
          {list.map((order) => {
            const meta = statusMeta(order.status);
            const grand = orderGrandTotal(order);
            return (
              <article
                key={order.id}
                className="border border-primary/15 bg-white transition-colors hover:border-primary/40"
              >
                <div className="grid gap-4 p-4 min-[640px]:p-5 min-[993px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] min-[993px]:items-center min-[993px]:gap-6 min-[993px]:p-6">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="m-0 section-kicker text-[12px] font-extrabold uppercase tracking-[0.08em]">{order.id}</p>
                      <span className={`px-2 py-1 text-[10px] font-extrabold uppercase ${meta.tone}`}>{meta.label}</span>
                    </div>
                    <h2 className="m-0 mt-1.5 text-[18px] font-black leading-tight min-[640px]:text-[22px] min-[1600px]:text-[24px]">
                      {order.title}
                    </h2>
                    <p className="m-0 mt-1.5 text-[13px] text-primary/65 min-[640px]:text-[14px]">
                      {order.type} · Serial {order.serial} · {order.yard}
                    </p>
                    <p className="m-0 mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-semibold text-primary/80">
                      <span className="inline-flex items-center gap-1.5">
                        <Package size={14} className="text-primary" /> Placed {order.placed}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Truck size={14} className="text-accent" /> {order.eta}
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 border border-primary/10 bg-[#f4f7f5] p-3 min-[640px]:p-4">
                    <div>
                      <p className="m-0 text-[10px] font-extrabold uppercase tracking-[0.06em] text-primary/50">Paid</p>
                      <p className="m-0 mt-1 text-[16px] font-black text-primary min-[640px]:text-[18px]">{formatMoney(grand)}</p>
                    </div>
                    <div>
                      <p className="m-0 text-[10px] font-extrabold uppercase tracking-[0.06em] text-primary/50">Transactions</p>
                      <p className="m-0 mt-1 text-[16px] font-black text-primary min-[640px]:text-[18px]">
                        {(order.transactions || []).length}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="m-0 text-[10px] font-extrabold uppercase tracking-[0.06em] text-primary/50">Carrier</p>
                      <p className="m-0 mt-1 text-[13px] font-semibold text-primary/85">{order.carrier}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 min-[640px]:flex-row min-[993px]:flex-col">
                    <Link
                      to={`/orders/${order.id}`}
                      className="cta-box justify-center px-4 py-2.5 text-[12px] no-underline"
                    >
                      Track order <ArrowRight size={14} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => downloadInvoice(order, user?.name, user?.email)}
                      className="inline-flex cursor-pointer items-center justify-center gap-2 border border-primary bg-white px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.06em] text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      <Download size={14} /> Invoice
                    </button>
                  </div>
                </div>

                <div className="border-t border-primary/10 px-4 py-3 min-[640px]:px-5 min-[993px]:px-6">
                  <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {(order.steps || []).map((step, index) => {
                      const done = index <= (order.stepIndex ?? 0);
                      return (
                        <span
                          key={step}
                          className={`shrink-0 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.04em] min-[640px]:text-[11px] ${
                            done ? 'bg-accent text-white' : 'bg-primary/5 text-primary/45'
                          }`}
                        >
                          {step}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}

          {list.length === 0 && (
            <p className="m-0 border border-primary/15 bg-[#f4f7f5] p-6 text-[15px] text-primary/75">
              No orders match that filter. Clear the search or call the desk with your yard number.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
