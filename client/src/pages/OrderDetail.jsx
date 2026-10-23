import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CreditCard,
  Download,
  MapPin,
  Package,
  Phone,
  Receipt,
  Truck,
} from 'lucide-react';
import useAccountGate from '../hooks/useAccountGate';
import { useAuth } from '../auth';
import {
  downloadInvoice,
  formatMoney,
  getOrderById,
  orderGrandTotal,
  statusMeta,
} from '../data/orders';

export default function OrderDetail() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const { gateOk, gateError } = useAccountGate('/api/account/gate', `/orders/${orderId || ''}`);
  const order = getOrderById(orderId);
  const meta = order ? statusMeta(order.status) : null;
  const grand = order ? orderGrandTotal(order) : 0;

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

  if (!order) {
    return (
      <div className="content-wrap py-16 text-primary">
        <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Order not found</p>
        <h1 className="m-0 mt-2 text-[28px] font-black uppercase">No sheet for that number</h1>
        <p className="m-0 mt-3 max-w-[480px] text-[15px] text-primary/70">
          Check the orders list or call the desk with the yard tag.
        </p>
        <Link to="/orders" className="cta-box mt-6 px-5 py-3 text-[13px] no-underline">
          <ArrowLeft size={15} /> All orders
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-primary">
      <section className="bg-primary text-white">
        <div className="content-wrap py-8 min-[640px]:py-10 min-[993px]:py-14">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.06em] text-yellow no-underline hover:text-white"
          >
            <ArrowLeft size={14} /> All orders
          </Link>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">{order.id}</p>
              <h1 className="heading-fit m-0 mt-2 text-[clamp(1.4rem,3.8vw,2.5rem)] font-black uppercase leading-tight text-white">
                {order.title}
              </h1>
              <p className="m-0 mt-2 text-[14px] text-white/75 min-[640px]:text-[15px]">
                {order.type} · Serial {order.serial} · Placed {order.placed}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1.5 text-[11px] font-extrabold uppercase ${meta.darkTone}`}>{meta.label}</span>
              <button
                type="button"
                onClick={() => downloadInvoice(order, user?.name, user?.email)}
                className="inline-flex cursor-pointer items-center gap-2 border border-yellow bg-yellow px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.06em] text-primary"
              >
                <Download size={14} /> Download invoice
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="content-wrap py-8 min-[640px]:py-10 min-[993px]:py-14">
        <div className="grid gap-2 min-[640px]:grid-cols-3 min-[993px]:grid-cols-5">
          {(order.steps || []).map((step, index) => {
            const done = index <= (order.stepIndex ?? 0);
            const current = index === (order.stepIndex ?? 0);
            return (
              <div
                key={step}
                className={`border px-3 py-3 min-[640px]:px-4 min-[640px]:py-4 ${
                  done ? 'border-accent bg-accent/5' : 'border-primary/10 bg-[#f4f7f5]'
                } ${current ? 'ring-2 ring-accent/40' : ''}`}
              >
                <p className={`m-0 text-[10px] font-extrabold uppercase min-[640px]:text-[11px] ${done ? 'text-accent' : 'text-primary/40'}`}>
                  Step {index + 1}
                </p>
                <p className={`m-0 mt-1 text-[13px] font-bold min-[640px]:text-[14px] ${done ? 'text-primary' : 'text-primary/45'}`}>
                  {step}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 min-[993px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] min-[993px]:gap-8">
          <div className="flex flex-col gap-6">
            <article className="border border-primary/15 bg-white p-4 min-[640px]:p-6">
              <p className="m-0 flex items-center gap-2 section-kicker text-xs font-extrabold uppercase tracking-[1px]">
                <Truck size={14} /> Freight
              </p>
              <h2 className="m-0 mt-2 text-[20px] font-black uppercase min-[640px]:text-[22px]">Where the truck stands</h2>
              <div className="mt-5 grid gap-4 min-[640px]:grid-cols-2">
                <div className="border border-primary/10 bg-[#f4f7f5] p-4">
                  <p className="m-0 text-[10px] font-extrabold uppercase text-primary/50">ETA</p>
                  <p className="m-0 mt-1 text-[16px] font-black">{order.eta}</p>
                </div>
                <div className="border border-primary/10 bg-[#f4f7f5] p-4">
                  <p className="m-0 text-[10px] font-extrabold uppercase text-primary/50">Tracking</p>
                  <p className="m-0 mt-1 text-[16px] font-black">{order.tracking}</p>
                </div>
                <div className="border border-primary/10 bg-[#f4f7f5] p-4">
                  <p className="m-0 text-[10px] font-extrabold uppercase text-primary/50">Carrier</p>
                  <p className="m-0 mt-1 text-[14px] font-bold">{order.carrier}</p>
                </div>
                <div className="border border-primary/10 bg-[#f4f7f5] p-4">
                  <p className="m-0 text-[10px] font-extrabold uppercase text-primary/50">Yard</p>
                  <p className="m-0 mt-1 flex items-center gap-1.5 text-[14px] font-bold">
                    <MapPin size={14} className="text-accent" /> {order.yard}
                  </p>
                </div>
              </div>
              <p className="m-0 mt-4 text-[14px] leading-[1.6] text-primary/75">
                Gate notes: {order.gate}
              </p>
            </article>

            <article className="border border-primary/15 bg-white p-4 min-[640px]:p-6">
              <p className="m-0 flex items-center gap-2 section-kicker text-xs font-extrabold uppercase tracking-[1px]">
                <Package size={14} /> Line items
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse text-left text-[13px] min-[640px]:text-[14px]">
                  <thead>
                    <tr className="border-b border-primary/15 text-[11px] font-extrabold uppercase tracking-[0.06em] text-primary/50">
                      <th className="py-2 pr-3 font-extrabold">Item</th>
                      <th className="px-2 py-2 font-extrabold">Qty</th>
                      <th className="px-2 py-2 text-right font-extrabold">Unit</th>
                      <th className="py-2 pl-2 text-right font-extrabold">Line</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(order.items || []).map((item) => (
                      <tr key={item.serial || item.name} className="border-b border-primary/10">
                        <td className="py-3 pr-3">
                          <p className="m-0 font-bold text-primary">{item.name}</p>
                          <p className="m-0 mt-0.5 text-[12px] text-primary/55">Serial {item.serial}</p>
                        </td>
                        <td className="px-2 py-3 font-semibold">{item.qty}</td>
                        <td className="px-2 py-3 text-right font-semibold">{formatMoney(item.unit)}</td>
                        <td className="py-3 pl-2 text-right font-black">{formatMoney(item.unit * item.qty)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="border border-primary/15 bg-white p-4 min-[640px]:p-6">
              <p className="m-0 flex items-center gap-2 section-kicker text-xs font-extrabold uppercase tracking-[1px]">
                <CreditCard size={14} /> Transactions
              </p>
              <h2 className="m-0 mt-2 text-[20px] font-black uppercase min-[640px]:text-[22px]">Payment trail</h2>
              <div className="mt-5 flex flex-col gap-3">
                {(order.transactions || []).map((tx) => (
                  <div
                    key={tx.id}
                    className="grid gap-2 border border-primary/10 bg-[#f4f7f5] p-4 min-[640px]:grid-cols-[1fr_auto] min-[640px]:items-center"
                  >
                    <div>
                      <p className="m-0 text-[12px] font-extrabold uppercase tracking-[0.06em] text-accent">{tx.id}</p>
                      <p className="m-0 mt-1 text-[15px] font-black text-primary">{tx.type}</p>
                      <p className="m-0 mt-1 text-[13px] text-primary/65">
                        {tx.when} · {tx.method}
                      </p>
                    </div>
                    <div className="text-left min-[640px]:text-right">
                      <p className="m-0 text-[18px] font-black text-primary">{formatMoney(tx.amount)}</p>
                      <p className="m-0 mt-1 text-[11px] font-extrabold uppercase text-primary/55">{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="border border-primary/15 bg-primary p-4 text-white min-[640px]:p-6">
              <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">Timeline</p>
              <ol className="m-0 mt-4 list-none space-y-4 p-0">
                {(order.timeline || []).map((row) => (
                  <li key={`${row.when}-${row.text}`} className="flex gap-4 border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                    <span className="w-16 shrink-0 text-[12px] font-extrabold uppercase text-yellow">{row.when}</span>
                    <span className="text-[14px] leading-[1.55] text-white/85">{row.text}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>

          <aside className="flex flex-col gap-5">
            <article className="border border-primary/15 bg-white p-4 min-[640px]:p-6">
              <p className="m-0 flex items-center gap-2 section-kicker text-xs font-extrabold uppercase tracking-[1px]">
                <Receipt size={14} /> Invoice summary
              </p>
              <div className="mt-4 space-y-2 text-[14px]">
                <div className="flex justify-between gap-3">
                  <span className="text-primary/65">Subtotal</span>
                  <span className="font-bold">{formatMoney(order.subtotal)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-primary/65">Freight</span>
                  <span className="font-bold">{formatMoney(order.freight)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-primary/65">Tax</span>
                  <span className="font-bold">{formatMoney(order.tax)}</span>
                </div>
                <div className="flex justify-between gap-3 border-t border-primary/15 pt-3 text-[17px] font-black">
                  <span>Total paid</span>
                  <span className="text-accent">{formatMoney(grand)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => downloadInvoice(order, user?.name, user?.email)}
                className="cta-box mt-5 w-full justify-center border-none px-4 py-3 text-[12px]"
              >
                <Download size={15} /> Download invoice
              </button>
            </article>

            <article className="border border-primary/15 bg-[#f4f7f5] p-4 min-[640px]:p-6">
              <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Ship to</p>
              <p className="m-0 mt-2 text-[16px] font-black">{user?.name || order.shipTo?.name}</p>
              <p className="m-0 mt-1 text-[14px] leading-[1.55] text-primary/75">
                {order.shipTo?.line1}
                <br />
                {order.shipTo?.city}, {order.shipTo?.state} {order.shipTo?.zip}
              </p>
            </article>

            <article className="border border-primary/15 bg-primary p-4 text-white min-[640px]:p-6">
              <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">Need the desk?</p>
              <p className="m-0 mt-2 text-[14px] leading-[1.6] text-white/85">
                Call with {order.id} or tracking {order.tracking}. Same people who tagged the unit.
              </p>
              <a href="tel:18002248005" className="cta-box mt-4 w-fit px-4 py-2.5 text-[12px]">
                <Phone size={14} /> 1-800-224-8005
              </a>
            </article>
          </aside>
        </div>
      </section>
    </div>
  );
}
