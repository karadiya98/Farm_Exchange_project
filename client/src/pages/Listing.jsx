import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import CardRail, { slideClass } from '../components/CardRail';
import ListingCard from '../components/ListingCard';
import CartQtyControl from '../components/CartQtyControl';
import { catalogLines, products } from '../data/catalog';

const specs = [
  ['Condition', 'condition'],
  ['Hours', 'hours'],
  ['Drive', 'drive'],
  ['Horsepower', 'horsepower'],
  ['ROPS', 'rops'],
  ['Load', 'load'],
  ['Serial', 'serial'],
  ['Updated', 'updated'],
];

export default function Listing() {
  const { id } = useParams();
  const product = products.find((item) => String(item.id) === id);
  const [photo, setPhoto] = useState(0);
  const [paused, setPaused] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    setPhoto(0);
  }, [id]);

  useEffect(() => {
    if (!product?.photos || product.photos.length < 2 || paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => {
      setPhoto((current) => (current + 1) % product.photos.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [product, paused]);

  if (!product) {
    return (
      <section className="content-wrap bg-white py-16 text-primary">
        <h1 className="m-0 text-[32px] font-black uppercase">This unit is off the lot</h1>
        <p className="mt-3 max-w-[520px] text-[15px] leading-[1.7] text-primary/75">
          The yard number is no longer on the board. The rest of the equipment is still tagged and ready.
        </p>
        <Link to="/equipment" className="cta-box mt-6 px-5 py-3 text-[13px]">
          Back to equipment
        </Link>
      </section>
    );
  }

  const line = catalogLines.find((item) => item.id === product.line);
  const related = products.filter((item) => item.line === product.line && item.id !== product.id).slice(0, 4);

  return (
    <section className="section-y bg-white text-primary">
      <div className="content-wrap">
        <p className="m-0 text-[12px] font-bold text-primary/70">
          <Link to="/equipment" className="text-primary no-underline hover:text-accent">Equipment</Link>
          <span className="px-2">/</span>
          <Link to={`/equipment?line=${product.line}`} className="text-primary no-underline hover:text-accent">{line?.label || product.type}</Link>
        </p>
        <div className="mt-4 grid gap-6 min-[640px]:mt-5 min-[640px]:gap-8 min-[993px]:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)]">
          <div
            className="min-w-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <img src={product.photos[photo]} alt={`${product.year} ${product.name}`} className="h-[200px] w-full object-cover min-[480px]:h-[260px] min-[768px]:h-[420px] min-[1600px]:h-[520px] min-[2200px]:h-[640px]" />
            <div className="scroll-x mt-3 flex gap-2 pb-1">
              {product.photos.map((src, index) => (
                <button key={`${product.id}-${index}`} type="button" onClick={() => setPhoto(index)} className={`h-14 w-16 shrink-0 cursor-pointer border-2 bg-white p-0 min-[480px]:h-16 min-[480px]:w-20 ${index === photo ? 'border-accent' : 'border-primary/15'}`}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <p className="m-0 section-kicker text-[12px] font-extrabold uppercase tracking-[0.08em]">{product.special ? 'Special' : 'Premium listing'}</p>
            <h1 className="heading-fit m-0 mt-2 text-[clamp(1.35rem,3.5vw,3.5rem)] font-black uppercase leading-tight">{product.year} {product.name}</h1>
            <p className="m-0 mt-2 text-[14px] font-semibold text-primary/70">{product.type} · {product.location}</p>
            <p className="m-0 mt-5 text-[24px] font-black min-[640px]:text-[28px] min-[1920px]:text-[36px] min-[2400px]:text-[44px]">USD ${product.price}</p>
            <p className="m-0 mt-1 text-[13px] font-semibold text-primary/75">Est. payment USD ${product.payment}* — confirm with the desk</p>
            <p className="m-0 mt-4 text-[15px] leading-[1.7] text-primary/80">{product.description}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <CartQtyControl productId={product.id} />
              <button type="button" onClick={() => setRequested(true)} className="cursor-pointer border border-primary bg-white px-3 py-3 text-[13px] font-extrabold text-primary hover:bg-primary/5">
                Pay now
              </button>
            </div>
            {requested && (
              <p className="m-0 mt-3 border border-primary/15 bg-primary px-4 py-3 text-[13px] leading-[1.6]">
                The desk has this unit held under serial {product.serial}. Call 1-800-224-8005 to finish payment and name the farm gate.
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-4 border-t border-primary/15 pt-4 text-[13px] font-bold">
              <a href="mailto:welcome@farmexchange.com" className="inline-flex items-center gap-1.5 text-primary no-underline hover:text-accent"><Mail size={15} /> Email seller</a>
              <a href="tel:18002248005" className="inline-flex items-center gap-1.5 text-primary no-underline hover:text-accent"><Phone size={15} /> (800) 224-8005</a>
            </div>
            <p className="m-0 mt-2 text-[13px] font-semibold text-primary/75">Seller: {product.seller}</p>
          </div>
        </div>

        <dl className="mt-10 grid gap-px border border-primary/15 bg-primary/15 min-[768px]:grid-cols-2 min-[1100px]:grid-cols-4">
          {specs.map(([label, key]) => (
            <div key={key} className="bg-white px-4 py-3">
              <dt className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-primary/60">{label}</dt>
              <dd className="m-0 mt-1 text-[14px] font-bold">{product[key]}</dd>
            </div>
          ))}
        </dl>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="m-0 text-[22px] font-black uppercase">More in this line</h2>
            <CardRail className="mt-5">
              {related.map((item) => (
                <div key={item.id} className={slideClass}>
                  <ListingCard product={item} />
                </div>
              ))}
            </CardRail>
          </div>
        )}
      </div>
    </section>
  );
}
