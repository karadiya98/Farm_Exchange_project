import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronLeft, ChevronRight, Heart, Mail, Phone, Search, Share2 } from 'lucide-react';
import { useCardExpand } from './CardRail';
import CartQtyControl from './CartQtyControl';

const hit = 'relative z-10';

export default function ListingCard({ product }) {
  const [saved, setSaved] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [shared, setShared] = useState(false);
  const [photo, setPhoto] = useState(0);
  const [paused, setPaused] = useState(false);
  const [localOpen, setLocalOpen] = useState(false);
  const expand = useCardExpand();
  const specsOpen = expand ? expand.expanded : localOpen;
  const listingPath = `/listing/${product.id}`;
  const toggleSpecs = () => {
    if (expand) expand.toggle();
    else setLocalOpen((open) => !open);
  };
  const photos = product.photos;
  const showPhoto = (step) => setPhoto((current) => (current + step + photos.length) % photos.length);

  const shareListing = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const url = `${window.location.origin}${listingPath}`;
    const title = `${product.year} ${product.name}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text: `${title} on Farm Exchange`, url });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
    } catch {
      /* user cancelled share */
    }
  };

  useEffect(() => {
    if (!photos?.length || photos.length < 2 || paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => {
      setPhoto((current) => (current + 1) % photos.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [photos, paused]);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-primary/25 bg-white text-primary transition duration-200 hover:border-accent hover:shadow-[0_14px_28px_rgb(2_70_46/0.12)]">
      <Link
        to={listingPath}
        aria-label={`View ${product.year} ${product.name}`}
        className="absolute inset-0 z-0"
      />

      <div className={`relative flex items-start justify-between gap-2 px-3.5 pt-2.5 pb-0 ${optionsOpen ? 'z-30' : 'z-10'}`}>
        <div className="min-w-0">
          <h3 className="m-0 truncate text-[13px] font-black uppercase leading-tight text-accent min-[1600px]:text-[15px] min-[2200px]:text-[17px]">
            {product.year} {product.name}
          </h3>
          <p className="m-0 mt-0.5 truncate text-[11px] font-semibold text-accent/80 min-[1600px]:text-[12px] min-[2200px]:text-[14px]">{product.type}</p>
        </div>
        <div
          className={`${hit} shrink-0`}
          onMouseEnter={() => setOptionsOpen(true)}
          onMouseLeave={() => setOptionsOpen(false)}
        >
          <button
            type="button"
            aria-expanded={optionsOpen}
            className="border-none bg-transparent p-0 text-[10px] font-bold text-accent cursor-pointer underline-offset-2 transition-colors duration-200 hover:text-accent-dark hover:underline"
          >
            Options
          </button>
          {optionsOpen && (
            <div className="absolute right-0 top-full z-40 w-36 border border-accent/25 bg-white py-1 shadow-[0_10px_24px_rgb(200_36_37/0.18)]">
              {['Watch this lot', 'Price alert', 'Compare'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setOptionsOpen(false)}
                  className="block w-full border-none bg-transparent px-2.5 py-1.5 text-left text-[11px] font-bold text-accent cursor-pointer hover:bg-accent/5"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="relative z-[1] mx-3.5 mt-1.5 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <span className="pointer-events-none absolute left-1.5 top-1.5 z-10 bg-yellow px-1.5 py-0.5 text-[8px] font-black uppercase tracking-[0.3px] text-primary">
          {product.special ? 'Special' : 'Premium Listing'}
        </span>
        <button
          type="button"
          aria-label={saved ? 'Remove from saved' : 'Save listing'}
          onClick={() => setSaved((current) => !current)}
          className="absolute top-1.5 right-1.5 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-primary/15 bg-white cursor-pointer"
        >
          <Heart size={13} className={saved ? 'fill-accent text-accent' : 'text-primary'} />
        </button>
        <img src={photos[photo]} alt={`${product.year} ${product.name}`} className="block h-[188px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] min-[640px]:h-[168px] min-[1600px]:h-[210px] min-[2200px]:h-[260px]" />
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => showPhoto(-1)}
          className="absolute left-1 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-none bg-white/90 text-primary shadow cursor-pointer hover:bg-white"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => showPhoto(1)}
          className="absolute right-1 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-none bg-white/90 text-primary shadow cursor-pointer hover:bg-white"
        >
          <ChevronRight size={16} />
        </button>
        <span className="pointer-events-none absolute bottom-1.5 left-0 right-0 z-10 flex justify-center gap-1">
          {photos.map((src, dot) => (
            <span key={`${product.id}-${dot}`} className={`h-1.5 w-1.5 rounded-full ${dot === photo ? 'bg-white' : 'bg-white/55'}`} />
          ))}
        </span>
      </div>

      <p className="relative z-10 m-0 mt-2 px-3.5 text-[18px] font-black leading-none text-accent transition-colors duration-200 group-hover:text-accent-dark min-[1600px]:text-[22px] min-[2200px]:text-[26px]">USD ${product.price}</p>
      <div className="mt-1.5 flex items-center justify-between gap-2 px-3.5">
        <p className="m-0 min-w-0 text-[11px] font-semibold leading-tight text-primary min-[1600px]:text-[13px] min-[2200px]:text-[15px]">
          Est. payment USD ${product.payment}*
        </p>
        <button
          type="button"
          onClick={shareListing}
          aria-label="Share listing"
          className={`${hit} inline-flex shrink-0 items-center gap-1 border-none bg-transparent p-0 text-[10px] font-bold text-accent cursor-pointer transition-colors duration-200 hover:text-accent-dark`}
        >
          <Share2 size={12} />
          {shared ? 'Copied' : 'Share'}
        </button>
      </div>

      <div className={`${hit} mt-3 grid grid-cols-2 gap-1.5 px-3.5`}>
        <CartQtyControl productId={product.id} size="sm" stopLink />
        <Link to={listingPath} className="border border-primary bg-white px-1 py-2 text-center text-[11px] font-extrabold text-primary no-underline transition-colors duration-200 hover:border-accent hover:text-accent min-[1600px]:py-2.5 min-[1600px]:text-[12px] min-[2200px]:text-[14px]">
          Pay now
        </Link>
      </div>

      <Link to={listingPath} className={`${hit} mx-3.5 mt-2.5 flex items-center justify-center gap-1 bg-accent py-2 text-[12px] font-extrabold text-white no-underline hover:bg-accent-dark min-[1600px]:py-2.5 min-[1600px]:text-[13px] min-[2200px]:text-[15px]`}>
        <Search size={12} /> View Details
      </Link>

      <div className={`${hit} mt-2.5 px-3.5`}>
        <button
          type="button"
          aria-label={specsOpen ? 'Hide listing details' : 'Show listing details'}
          aria-expanded={specsOpen}
          onClick={toggleSpecs}
          className="flex h-8 w-full cursor-pointer items-center justify-center border border-primary/15 bg-primary/[0.03] text-primary transition-colors duration-200 hover:border-primary/30 hover:bg-primary/5"
        >
          <ChevronDown
            size={18}
            strokeWidth={2.5}
            className={`transition-transform duration-300 ${specsOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          specsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-3.5 mt-2.5 flex flex-col gap-1.5 text-[11px] font-semibold leading-[1.45] text-primary min-[1600px]:text-[12px] min-[2200px]:text-[14px]">
            <p className="m-0"><span className="font-black">Hours:</span> {product.hours}</p>
            <p className="m-0"><span className="font-black">Drive:</span> {product.drive}</p>
            <p className="m-0"><span className="font-black">Horsepower:</span> {product.horsepower}</p>
            <p className="m-0"><span className="font-black">ROPS:</span> {product.rops}</p>
            <p className="m-0"><span className="font-black">Load Capacity:</span> {product.load}</p>
            <p className="m-0"><span className="font-black">Serial Number:</span> {product.serial}</p>
            <p className="m-0"><span className="font-black">Description:</span> {product.description}</p>
            <p className="m-0 mt-1"><span className="font-black">Updated:</span> {product.updated}</p>
            <p className="m-0"><span className="font-black">Location:</span> {product.location}</p>
          </div>
        </div>
      </div>

      <div className={`${hit} mt-3 flex items-center justify-between gap-1 border-t border-primary/15 px-3.5 py-2.5 text-[11px] font-bold text-primary min-[1600px]:text-[12px] min-[2200px]:text-[14px]`}>
        <button
          type="button"
          className="inline-flex items-center gap-1 border-none bg-transparent p-0 font-bold text-accent cursor-pointer underline-offset-2 transition-colors duration-200 hover:underline"
        >
          <Mail size={12} /> Email Seller
        </button>
        <a href={`tel:${product.phone.replace(/[^\d]/g, '')}`} className="inline-flex items-center gap-1 text-primary no-underline underline-offset-2 transition-colors duration-200 hover:text-accent hover:underline">
          <Phone size={12} /> {product.phone}
        </a>
      </div>
      <p className="m-0 px-3.5 pb-3 text-[10px] font-semibold text-primary/80">Seller: {product.seller}</p>
    </article>
  );
}
