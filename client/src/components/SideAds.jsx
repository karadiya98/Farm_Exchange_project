import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import heroTractor from '../public/Hero images/hero-tractor.jpg';
import tillTractor from '../public/Hero images/Mud-Covered Tractor Tilling Cornfield.png';
import cultTractor from '../public/Hero images/Tractor Cultivating Green Crop Rows.png';
import plantTractor from '../public/Hero images/Modern Tractor Planting Corn Rows.png';
import harvestTractor from '../public/Hero images/Golden Harvest Tractor Field.png';
import lushTractor from '../public/Hero images/Golden-Hour Tractor Among Lush Crops.png';
import harvestCard from '../public/Hero images/Golden Harvest_ Tractor and Cornfield.png';
import brushCutter from '../public/machinery/brush.jpg';
import dieselPump from '../public/machinery/pump.jpg';
import greenhouse from '../public/machinery/greenhouse.jpg';
import shelterDome from '../public/machinery/shelter-dome.jpg';
import shelterSpan from '../public/machinery/span.jpg';
import rowTractor from '../public/dealers/row-tractor.jpg';
import fieldSprayer from '../public/dealers/sprayer.jpg';
import seedDrill from '../public/dealers/seed-drill.jpg';
import pivotIdaho from '../public/irrigation/pivot-idaho.jpg';
import farmSprinkler from '../public/irrigation/farm-sprinkler.jpg';
import heroIrrigation from '../public/Hero images/hero-irrigation.jpg';
import yardWorkshop from '../public/about-extra/yard-workshop.jpg';
import partsBay from '../public/about-extra/parts-bay.jpg';
import sellLot from '../public/deal-paths/sell-lot.jpg';
import repairShop from '../public/deal-paths/repair-shop.jpg';
import barterPair from '../public/deal-paths/barter-pair.jpg';
import partsShelf from '../public/deal-paths/parts-shelf.jpg';
import fieldTractor from '../public/field.jpg';
import classicTractor from '../public/classic.jpg';
import yardTractor from '../public/yard.jpg';
import shopTractors from '../public/shop.jpg';

const AGRO_SITE = 'https://www.agrofoundries.com/';
const AGRO_VIDEO = '/ads/agrofoundries.mp4';
const FARM_VIDEO = encodeURI('/ads/WhatsApp Video 2026-10-21 at 10.23.43 PM.mp4');

const agroVideoAd = {
  type: 'video',
  href: AGRO_SITE,
  video: AGRO_VIDEO,
  alt: 'Agro Foundries — grow smart, farm better',
  external: true,
};

const farmVideoAd = {
  type: 'video',
  href: '/equipment',
  video: FARM_VIDEO,
  alt: 'Farm Exchange lot video',
  external: false,
};

const leftAdsBase = [
  { href: '/equipment?line=tractors', image: heroTractor, alt: 'Farm tractor ready for field work' },
  { href: '/equipment?line=tractors', image: tillTractor, alt: 'Tractor tilling a cornfield' },
  { href: '/equipment?line=skid', image: brushCutter, alt: 'Brush cutter for a skid steer' },
  { href: '/equipment?line=shelters', image: shelterDome, alt: 'Container shelter frame on the lot' },
  { href: '/equipment?line=shelters', image: shelterSpan, alt: 'Span shelter bay' },
  { href: '/equipment?line=sheds', image: yardWorkshop, alt: 'Workshop bay with farm iron' },
  { href: '/equipment?line=greenhouse', image: greenhouse, alt: 'Greenhouse structure on the yard' },
  { href: '/equipment?line=tractors', image: rowTractor, alt: 'Row tractor on a dealer yard' },
  { href: '/specials', image: sellLot, alt: 'Equipment on the Farm Exchange lot' },
  { href: '/equipment?line=tractors', image: fieldTractor, alt: 'Field tractor facing open ground' },
  { href: '/equipment?line=tractors', image: classicTractor, alt: 'Classic tractor on the lot' },
  { href: '/equipment?line=tractors', image: yardTractor, alt: 'Yard tractor ready for chores' },
  { href: '/equipment?line=tractors', image: shopTractors, alt: 'Tractors staged in the shop' },
  { href: '/equipment?line=parts', image: partsBay, alt: 'Parts bay with tagged iron' },
  { href: '/equipment?line=irrigation', image: heroIrrigation, alt: 'Pivot irrigation over a tagged acre' },
];

const rightAdsBase = [
  { href: '/equipment?line=irrigation', image: dieselPump, alt: 'Diesel irrigation pump' },
  { href: '/equipment?line=irrigation', image: pivotIdaho, alt: 'Irrigation pivot machine in a field' },
  { href: '/equipment?line=irrigation', image: farmSprinkler, alt: 'Farm sprinkler equipment' },
  { href: '/equipment?line=tractors', image: cultTractor, alt: 'Tractor cultivating crop rows' },
  { href: '/equipment?line=tractors', image: plantTractor, alt: 'Tractor planting corn rows' },
  { href: '/equipment?line=parts', image: seedDrill, alt: 'Seed drill implement on the yard' },
  { href: '/equipment?line=skid', image: fieldSprayer, alt: 'Field sprayer ready for work' },
  { href: '/specials', image: harvestTractor, alt: 'Harvest tractor in open fields' },
  { href: '/equipment?line=tractors', image: lushTractor, alt: 'Tractor among lush crops' },
  { href: '/equipment?line=parts', image: repairShop, alt: 'Repair bay with machine tools' },
  { href: '/equipment?line=parts', image: partsShelf, alt: 'Parts shelf for farm machines' },
  { href: '/equipment?line=tractors', image: harvestCard, alt: 'Harvest tractor and cornfield iron' },
  { href: '/equipment?line=tractors', image: barterPair, alt: 'Machines staged for trade' },
  { href: '/equipment?line=greenhouse', image: greenhouse, alt: 'Greenhouse on the yard' },
  { href: '/equipment?line=shelters', image: shelterDome, alt: 'Shelter frame on the lot' },
];

/** Insert video ads at fixed slots so rails stay stable across renders */
function withVideoAds(ads, videos, positions) {
  const next = ads.map((ad) => ({ ...ad, type: ad.type || 'image' }));
  [...positions]
    .sort((a, b) => b - a)
    .forEach((index, i) => {
      const at = Math.max(0, Math.min(index, next.length));
      const video = videos[(positions.length - 1 - i) % videos.length];
      next.splice(at, 0, { ...video });
    });
  return next;
}

const leftAds = withVideoAds(leftAdsBase, [agroVideoAd, farmVideoAd], [1, 4, 8, 12]);
const rightAds = withVideoAds(rightAdsBase, [farmVideoAd, agroVideoAd], [2, 6, 10]);

/** Slim CTAs sit under the media so the full ad image/video stays visible */
function AdActions({ visitHref = AGRO_SITE }) {
  return (
    <div className="grid grid-cols-2 gap-0.5 bg-primary p-0.5">
      <a
        href={visitHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-[2px] bg-accent px-0.5 py-1 text-center text-[8px] font-extrabold uppercase leading-none tracking-[0.02em] text-white no-underline transition-colors hover:bg-accent-dark min-[1440px]:text-[9px] min-[1920px]:py-1.5"
      >
        Visit site
      </a>
      <Link
        to="/upload-ad"
        className="rounded-[2px] bg-white/15 px-0.5 py-1 text-center text-[8px] font-extrabold uppercase leading-none tracking-[0.02em] text-white no-underline transition-colors hover:bg-yellow hover:text-primary min-[1440px]:text-[9px] min-[1920px]:py-1.5"
      >
        Advertise
      </Link>
    </div>
  );
}

function VideoAdSlot({ ad }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const media = (
    <video
      ref={videoRef}
      src={ad.video}
      className="absolute inset-0 h-full w-full object-contain bg-black"
      muted
      loop
      playsInline
      preload="metadata"
      controls={false}
    />
  );

  const frameClass = 'relative block aspect-[848/478] w-full no-underline';

  return (
    <div className="group/ad pointer-events-auto w-full shrink-0 overflow-hidden border border-white/10 bg-black">
      <div className="relative">
        {ad.external ? (
          <a href={ad.href} target="_blank" rel="noopener noreferrer" className={frameClass} aria-label={ad.alt}>
            {media}
          </a>
        ) : (
          <Link to={ad.href || '/equipment'} className={frameClass} aria-label={ad.alt}>
            {media}
          </Link>
        )}
        <span className="pointer-events-none absolute left-1 top-1 z-10 rounded-[2px] bg-primary/90 px-1 py-0.5 text-[8px] font-extrabold uppercase leading-none tracking-[0.04em] text-white">
          Ad
        </span>
      </div>
      <AdActions visitHref={ad.external ? ad.href : AGRO_SITE} />
    </div>
  );
}

function ImageAdSlot({ ad }) {
  return (
    <div className="group/ad pointer-events-auto w-full shrink-0 overflow-hidden border border-white/10 bg-black">
      <div className="relative h-[128px] min-[1440px]:h-[140px] min-[1920px]:h-[156px] min-[2400px]:h-[176px]">
        <Link to={ad.href} className="absolute inset-0 block no-underline">
          <img
            src={ad.image}
            alt={ad.alt}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/ad:scale-[1.03]"
            loading="lazy"
          />
        </Link>
        <span className="pointer-events-none absolute left-1 top-1 z-10 rounded-[2px] bg-primary/90 px-1 py-0.5 text-[8px] font-extrabold uppercase leading-none tracking-[0.04em] text-white">
          Ad
        </span>
      </div>
      <AdActions visitHref={AGRO_SITE} />
    </div>
  );
}

function AdSlot({ ad }) {
  if (ad.type === 'video') return <VideoAdSlot ad={ad} />;
  return <ImageAdSlot ad={ad} />;
}

function Rail({ side, ads, shown, scrollRef }) {
  const place = side === 'left' ? 'left-2 min-[1920px]:left-4 min-[2400px]:left-6' : 'right-2 min-[1920px]:right-4 min-[2400px]:right-6';

  return (
    <aside
      ref={scrollRef}
      aria-label={side === 'left' ? 'Advertisements' : undefined}
      className={`pointer-events-none fixed z-[800] w-[150px] overflow-y-auto overflow-x-hidden bg-transparent [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden transition-opacity duration-300 min-[1440px]:w-[168px] min-[1920px]:w-[200px] min-[2400px]:w-[230px] ${place} ${
        shown ? 'hidden min-[1280px]:block' : 'hidden'
      }`}
      style={{
        top: 'calc(var(--header-h, 200px) + 12px)',
        bottom: '12px',
      }}
    >
      <div className="pointer-events-none flex flex-col gap-2 pb-1">
        {ads.map((ad, index) => (
          <AdSlot key={`${side}-${index}-${ad.type}-${ad.alt}`} ad={ad} />
        ))}
      </div>
    </aside>
  );
}

export default function SideAds() {
  const { pathname } = useLocation();
  const [pastHero, setPastHero] = useState(false);
  const [aboveFooter, setAboveFooter] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [footerPad, setFooterPad] = useState(12);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const hero = document.getElementById('site-hero');
    const footer = document.querySelector('footer');
    const browser = document.getElementById('product-browser');
    let uiFrame = 0;
    let easeFrame = 0;
    let leftPos = 0;
    let rightPos = 0;
    let leftTarget = 0;
    let rightTarget = 0;
    const EASE = 0.045;
    const LEFT_RATE = 0.42;
    const RIGHT_RATE = 0.34;

    const readTargets = () => {
      const maxDoc = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxDoc));
      const left = leftRef.current;
      const right = rightRef.current;
      if (left) {
        const span = Math.max(0, left.scrollHeight - left.clientHeight);
        leftTarget = progress * span * LEFT_RATE;
      }
      if (right) {
        const span = Math.max(0, right.scrollHeight - right.clientHeight);
        rightTarget = progress * span * RIGHT_RATE;
      }
    };

    const tickEase = () => {
      readTargets();
      const left = leftRef.current;
      const right = rightRef.current;
      let moving = false;

      if (left) {
        leftPos += (leftTarget - leftPos) * EASE;
        if (Math.abs(leftTarget - leftPos) > 0.25) moving = true;
        else leftPos = leftTarget;
        left.scrollTop = leftPos;
      }
      if (right) {
        rightPos += (rightTarget - rightPos) * EASE;
        if (Math.abs(rightTarget - rightPos) > 0.25) moving = true;
        else rightPos = rightTarget;
        right.scrollTop = rightPos;
      }

      easeFrame = moving ? window.requestAnimationFrame(tickEase) : 0;
    };

    const startEase = () => {
      if (!easeFrame) easeFrame = window.requestAnimationFrame(tickEase);
    };

    const updateUi = () => {
      if (hero) setPastHero(hero.getBoundingClientRect().bottom <= 8);
      else setPastHero(true);

      if (footer) {
        const top = footer.getBoundingClientRect().top;
        const overlap = Math.max(0, window.innerHeight - top + 8);
        setFooterPad(Math.max(12, overlap));
        setAboveFooter(top > 120);
      } else {
        setFooterPad(12);
        setAboveFooter(true);
      }

      if (browser) {
        const rect = browser.getBoundingClientRect();
        const headerH =
          Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 180;
        setFilterOpen(rect.bottom > headerH + 24 && rect.top < window.innerHeight);
      } else {
        setFilterOpen(false);
      }

      readTargets();
      startEase();
    };

    const onScroll = () => {
      if (uiFrame) return;
      uiFrame = window.requestAnimationFrame(() => {
        uiFrame = 0;
        updateUi();
      });
    };

    updateUi();
    leftPos = leftTarget;
    rightPos = rightTarget;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateUi);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateUi);
      if (uiFrame) window.cancelAnimationFrame(uiFrame);
      if (easeFrame) window.cancelAnimationFrame(easeFrame);
    };
  }, [pathname]);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (left) left.style.bottom = `${footerPad}px`;
    if (right) right.style.bottom = `${footerPad}px`;
  }, [footerPad]);

  const baseShown = pastHero && aboveFooter && pathname !== '/upload-ad' && pathname !== '/signup';

  return (
    <>
      <Rail side="left" ads={leftAds} shown={baseShown && !filterOpen} scrollRef={leftRef} />
      <Rail side="right" ads={rightAds} shown={baseShown} scrollRef={rightRef} />
    </>
  );
}
