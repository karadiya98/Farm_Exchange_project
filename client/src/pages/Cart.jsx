import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import CardRail, { slideClass } from '../components/CardRail';
import ListingCard from '../components/ListingCard';
import { formatMoney, useCart } from '../cart';
import { products } from '../data/catalog';
import useAccountGate from '../hooks/useAccountGate';

export default function Cart() {
  const { lines, count, subtotal, setQty, removeItem, clearCart } = useCart();
  const { gateOk, gateError } = useAccountGate('/api/account/cart', '/cart');
  const [payReady, setPayReady] = useState(false);

  const cartIds = useMemo(() => new Set(lines.map((row) => row.id)), [lines]);

  const recommended = useMemo(() => {
    const pool = products.filter((item) => !cartIds.has(item.id));
    const specials = pool.filter((item) => item.special);
    const featured = pool.filter((item) => item.featured && !item.special);
    const rest = pool.filter((item) => !item.special && !item.featured);
    return [...specials, ...featured, ...rest].slice(0, 3);
  }, [cartIds]);

  const yardTags = lines.map((row) => row.product.serial).join(', ');

  if (!gateOk) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 bg-white px-4 py-16 text-primary">
        <p className="m-0 text-[15px] font-semibold text-primary/70">
          {gateError || 'Checking the desk…'}
        </p>
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
          <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">Your cart</p>
          <h1 className="heading-fit m-0 mt-2 text-[clamp(1.5rem,4vw,2.25rem)] font-black uppercase leading-tight text-white">
            Ready for the desk
          </h1>
          <p className="prose-rail prose-rail-on-dark m-0 mt-3 max-w-[680px] text-[16px] leading-[1.75]">
            Units you add stay on this device until you clear them. Freight is still named when you call or write the desk with the yard numbers below.
          </p>
        </div>
      </section>

      <section className="content-wrap py-10 min-[993px]:py-14">
        {lines.length === 0 ? (
          <div className="border border-primary/15 bg-[#f4f7f5] p-8 text-center min-[640px]:p-12">
            <ShoppingCart size={36} className="mx-auto text-primary/40" />
            <h2 className="m-0 mt-4 text-[22px] font-black uppercase">Your cart is empty</h2>
            <p className="m-0 mx-auto mt-3 max-w-[420px] text-[15px] leading-[1.7] text-primary/75">
              Open the equipment list and add a tagged unit. The cart count in the header updates as you go.
            </p>
            <Link to="/equipment" className="cta-box mt-6 inline-flex px-5 py-3 text-[13px]">
              Browse equipment
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 min-[993px]:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.75fr)] min-[993px]:items-start">
            <div className="flex min-w-0 flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="m-0 text-[14px] font-semibold text-primary/70">
                  {count} {count === 1 ? 'unit' : 'units'} in the cart
                </p>
                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    setPayReady(false);
                  }}
                  className="cursor-pointer border-none bg-transparent p-0 text-[12px] font-extrabold uppercase text-accent underline-offset-2 hover:underline"
                >
                  Clear cart
                </button>
              </div>

              {lines.map(({ id, qty, product, unit, lineTotal }) => (
                <article
                  key={id}
                  className="grid gap-4 border border-primary/15 bg-white p-4 transition-colors hover:border-primary/30 min-[640px]:grid-cols-[120px_minmax(0,1fr)_auto] min-[640px]:items-center min-[640px]:p-5"
                >
                  <Link to={`/listing/${id}`} className="block overflow-hidden">
                    <img
                      src={product.photos[0]}
                      alt={`${product.year} ${product.name}`}
                      className="h-[100px] w-full object-cover min-[640px]:h-[110px]"
                    />
                  </Link>
                  <div className="min-w-0">
                    <p className="section-kicker m-0 text-[11px] font-extrabold uppercase tracking-[0.06em]">
                      {product.special ? 'Special' : 'Premium listing'}
                    </p>
                    <Link
                      to={`/listing/${id}`}
                      className="mt-1 block text-[16px] font-black uppercase leading-tight text-primary no-underline hover:text-accent"
                    >
                      {product.year} {product.name}
                    </Link>
                    <p className="m-0 mt-1 text-[13px] text-primary/70">
                      {product.type} · {product.location}
                    </p>
                    <p className="m-0 mt-1 text-[12px] font-semibold text-primary/60">Serial {product.serial}</p>
                    <p className="m-0 mt-2 text-[15px] font-black text-primary">
                      USD ${formatMoney(unit)}
                      <span className="ml-2 text-[12px] font-semibold text-primary/55">each</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-stretch gap-3 min-[640px]:items-end">
                    <div className="inline-grid grid-cols-[36px_44px_36px] border border-primary">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(id, qty - 1)}
                        className="grid place-items-center border-none bg-primary py-2 text-white cursor-pointer hover:bg-primary/90"
                      >
                        <Minus size={14} strokeWidth={2.5} />
                      </button>
                      <span className="grid place-items-center bg-white text-[14px] font-black tabular-nums text-primary">
                        {qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty(id, qty + 1)}
                        className="grid place-items-center border-none bg-primary py-2 text-white cursor-pointer hover:bg-primary/90"
                      >
                        <Plus size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                    <p className="m-0 text-right text-[16px] font-black text-accent">USD ${formatMoney(lineTotal)}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(id)}
                      className="inline-flex cursor-pointer items-center justify-end gap-1.5 border-none bg-transparent p-0 text-[12px] font-extrabold uppercase text-primary/60 hover:text-accent"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                </article>
              ))}

              {recommended.length > 0 && (
                <div className="mt-6 border-t border-primary/10 pt-8">
                  <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Also on the lot</p>
                  <h2 className="heading-fit m-0 mt-2 text-[clamp(1.25rem,2.5vw,1.75rem)] font-black uppercase leading-tight">
                    Recommended with your cart
                  </h2>
                  <p className="m-0 mt-2 max-w-[560px] text-[14px] leading-[1.65] text-primary/70">
                    Tagged units that often ship with the same freight window. Add one if it fits the job, or open the card to read the yard number.
                  </p>
                  <CardRail className="mt-5" columns={3}>
                    {recommended.map((product) => (
                      <div key={product.id} className={slideClass}>
                        <ListingCard product={product} />
                      </div>
                    ))}
                  </CardRail>
                </div>
              )}
            </div>

            <aside className="border border-primary/15 bg-primary p-5 text-white min-[640px]:p-6 min-[993px]:sticky min-[993px]:top-[calc(var(--header-h,180px)+16px)]">
              <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">Order summary</p>
              <h2 className="m-0 mt-2 text-[20px] font-black uppercase text-white">Before freight</h2>
              <div className="mt-5 space-y-3 border-t border-white/15 pt-5 text-[14px]">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/75">Units</span>
                  <span className="font-bold text-white">{count}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/75">Subtotal</span>
                  <span className="font-black text-white">USD ${formatMoney(subtotal)}</span>
                </div>
                <p className="prose-rail prose-rail-on-dark m-0 text-[13px] leading-[1.65]">
                  Freight is named to your lane when you call. Liftgate or flatbed is not in this subtotal.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPayReady(true)}
                className="cta-box mt-6 w-full justify-center border-none px-5 py-3 text-[13px]"
              >
                <CreditCard size={15} /> Pay now
              </button>
              <a
                href="tel:18002248005"
                className="mt-3 inline-flex w-full items-center justify-center border border-white px-5 py-3 text-[13px] font-extrabold uppercase text-white no-underline transition-colors hover:border-yellow hover:bg-yellow hover:text-primary"
              >
                Call to finish · 1-800-224-8005
              </a>
              <Link
                to="/contact"
                className="mt-3 inline-flex w-full items-center justify-center border border-white/40 px-5 py-3 text-[13px] font-extrabold uppercase text-white no-underline transition-colors hover:border-yellow hover:bg-yellow hover:text-primary"
              >
                Write the desk
              </Link>
              <Link
                to="/equipment"
                className="mt-3 inline-flex w-full items-center justify-center text-[12px] font-extrabold uppercase text-yellow no-underline hover:underline"
              >
                Keep browsing
              </Link>
              {payReady && (
                <p className="m-0 mt-5 border border-yellow/40 bg-[#034a32] px-4 py-3 text-[13px] leading-[1.65] text-white/90">
                  The desk has this cart held for pay now. Serials: {yardTags}. Call{' '}
                  <a href="tel:18002248005" className="font-extrabold text-yellow no-underline hover:underline">
                    1-800-224-8005
                  </a>{' '}
                  to finish payment and name the farm gate. Freight is written before the truck is booked.
                </p>
              )}
            </aside>
          </div>
        )}

        {lines.length === 0 && recommended.length > 0 && (
          <div className="mt-12">
            <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Start here</p>
            <h2 className="heading-fit m-0 mt-2 text-[clamp(1.25rem,2.5vw,1.75rem)] font-black uppercase">
              Recommended from the lot
            </h2>
            <CardRail className="mt-5" columns={3}>
              {recommended.map((product) => (
                <div key={product.id} className={slideClass}>
                  <ListingCard product={product} />
                </div>
              ))}
            </CardRail>
          </div>
        )}
      </section>
    </div>
  );
}
