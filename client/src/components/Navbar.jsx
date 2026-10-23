import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { ShoppingCart, Menu, X, ChevronDown, ChevronRight, PhoneCall, ShieldCheck, Layers, CircleHelp, Upload, FileQuestion, UserRound, Package } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import { lineBySlug } from '../data/catalog';
import { formatMoney, useCart } from '../cart';
import { useAuth } from '../auth';

const helpMenuLinks = [
  { title: 'Upload an ad', path: '/upload-ad', icon: Upload },
  { title: 'Your orders', path: '/orders', icon: Package },
  { title: 'FAQs', path: '/#how-it-works', icon: FileQuestion },
  { title: 'Your profile', path: '/profile', icon: UserRound },
  { title: 'Call the desk', path: 'tel:18002248005', icon: PhoneCall, external: true },
];
import shelterDome from '../public/machinery/shelter-dome.jpg';
import shelterSpan from '../public/machinery/span.jpg';
import brushCutter from '../public/machinery/brush.jpg';
import greenhouseHouse from '../public/machinery/greenhouse.jpg';
import dieselPump from '../public/machinery/pump.jpg';
import seedDrill from '../public/dealers/seed-drill.jpg';
import fieldSprayer from '../public/dealers/sprayer.jpg';
import farmSprinkler from '../public/irrigation/farm-sprinkler.jpg';
import pivotIdaho from '../public/irrigation/pivot-idaho.jpg';
import yardWorkshop from '../public/about-extra/yard-workshop.jpg';
import plainsYard from '../public/about-extra/plains-yard.jpg';
import partsBay from '../public/about-extra/parts-bay.jpg';
import tillTractor from '../public/Hero images/Mud-Covered Tractor Tilling Cornfield.png';
import cultTractor from '../public/Hero images/Tractor Cultivating Green Crop Rows.png';
import heroTractor from '../public/Hero images/hero-tractor.jpg';
import sellLot from '../public/deal-paths/sell-lot.jpg';

const brandWords = ['borrow', 'appraise', 'certify'];

function BrandMark({ compact }) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let hideTimer;
    const timer = setInterval(() => {
      setShown(false);
      hideTimer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % brandWords.length);
        setShown(true);
      }, 300);
    }, 2600);

    return () => {
      clearInterval(timer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

  // Fixed slot sized for "appraise" so layout never shifts between words.
  return (
    <span
      className={`relative flex shrink-0 items-center overflow-visible ${
        compact
          ? 'h-8 w-[7.5rem] min-[480px]:h-8 min-[480px]:w-[8.25rem] min-[768px]:h-10 min-[768px]:w-[11rem] min-[1100px]:w-[11.5rem] min-[1280px]:h-11 min-[1280px]:w-[12.5rem] min-[1600px]:h-12 min-[1600px]:w-[14rem] min-[2200px]:h-14 min-[2200px]:w-[16rem]'
          : 'h-8 w-[7.75rem] min-[480px]:h-9 min-[480px]:w-[8.5rem] min-[768px]:h-10 min-[768px]:w-[11.5rem] min-[1100px]:h-11 min-[1100px]:w-[12.5rem] min-[1280px]:h-12 min-[1280px]:w-[14rem] min-[1600px]:h-[52px] min-[1600px]:w-[15.5rem] min-[2200px]:h-16 min-[2200px]:w-[18rem]'
      }`}
      aria-hidden="true"
    >
      <span
        className={`brand-action-word uppercase transition-opacity duration-300 ease-in-out min-[768px]:-translate-y-1 ${
          shown ? 'opacity-100' : 'opacity-0'
        } ${
          compact
            ? 'text-[17px] min-[480px]:text-[19px] min-[768px]:text-[26px] min-[1100px]:text-[28px] min-[1280px]:text-[30px] min-[1600px]:text-[34px] min-[2200px]:text-[40px]'
            : 'text-[18px] min-[480px]:text-[20px] min-[768px]:text-[28px] min-[1100px]:text-[32px] min-[1280px]:text-[36px] min-[1600px]:text-[40px] min-[2200px]:text-[48px]'
        }`}
      >
        {brandWords[index]}
      </span>
    </span>
  );
}

const categoryMenu = [
  {
    title: 'Container Shelters',
    slug: 'container-shelters',
    groups: [
      { title: 'Span shelters', image: shelterSpan, items: ['20ft single truss', '30ft commercial bay', '40ft container shelter'] },
      { title: 'Covers and frames', image: shelterDome, items: ['32oz vinyl cover', 'Galvanized arch', 'Wind-rated frame'] },
      { title: 'On the lot', image: sellLot, items: ['Tagged yard bays', 'Liftgate freight', 'Farm-lane delivery'] },
    ],
  },
  {
    title: 'Metal Sheds',
    slug: 'metal-sheds',
    groups: [
      { title: 'Storage bays', image: yardWorkshop, items: ['Tool bay', 'Hay bay', 'Skid-steer bay'] },
      { title: 'Shed builds', image: plainsYard, items: ['Heavy metal shed', 'Lean-to shed', 'Double-door bay'] },
    ],
  },
  {
    title: 'Tractors & Mowers',
    slug: 'tractors-mowers',
    groups: [
      { title: 'Tractors', image: heroTractor, items: ['Compact tractor', 'Utility tractor', 'Field tractor'] },
      { title: 'Mowers', image: fieldSprayer, items: ['Finish mower', 'Rotary cutter', 'Flail mower'] },
    ],
  },
  {
    title: 'Skid Steer Attachments',
    slug: 'skid-steer-attachments',
    groups: [
      { title: 'Cutting', image: brushCutter, items: ['Brush cutter', 'Rotary cutter', 'Tree shear'] },
      { title: 'Earth', image: tillTractor, items: ['Auger', 'Bucket', 'Pallet forks'] },
      { title: 'Yard', image: partsBay, items: ['Grapple', 'Bale spear', 'Snow pusher'] },
    ],
  },
  {
    title: 'Greenhouses',
    slug: 'greenhouses',
    groups: [
      { title: 'Houses', image: greenhouseHouse, items: ['Polycarbonate house', 'Tunnel house', 'Gothic house'] },
      { title: 'House parts', image: partsBay, items: ['Twin-wall panel', 'Vent kit', 'Bench frame'] },
    ],
  },
  {
    title: 'Soil Compactors',
    slug: 'soil-compactors',
    groups: [
      { title: 'Compaction', image: cultTractor, items: ['Plate compactor', 'Rammer', 'Ride-on roller'] },
      { title: 'Ground work', image: tillTractor, items: ['Tiller', 'Soil pulverizer', 'Walk-behind packer'] },
    ],
  },
  {
    title: 'Irrigation & Pumps',
    slug: 'irrigation-pumps',
    groups: [
      { title: 'Pumps', image: dieselPump, items: ['Centrifugal pump', 'Booster pump', 'Transfer pump'] },
      { title: 'Lines', image: farmSprinkler, items: ['Layflat hose', 'Sprinkler set', 'Filter station'] },
      { title: 'Field water', image: pivotIdaho, items: ['Pivot span', 'End gun set', 'Pump house kit'] },
    ],
  },
  {
    title: 'Farm Implements',
    slug: 'farm-implements',
    groups: [
      { title: 'Hitch tools', image: seedDrill, items: ['Box blade', 'Disc harrow', 'Cultivator'] },
      { title: 'Hay tools', image: cultTractor, items: ['Rake', 'Tedder', 'Bale spear'] },
    ],
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [barHeight, setBarHeight] = useState(0);
  const { count, subtotal } = useCart();
  const { user, ready } = useAuth();
  const cartHref =
    ready && !user ? `/signup?mode=login&next=${encodeURIComponent('/cart')}` : '/cart';

  const headerRef = useRef(null);
  const closeMenuTimer = useRef(null);
  const helpTimer = useRef(null);
  const location = useLocation();

  const openCategories = () => {
    if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    setCategoryDropdownOpen(true);
  };

  const closeCategories = () => {
    closeMenuTimer.current = setTimeout(() => setCategoryDropdownOpen(false), 140);
  };

  const openHelp = () => {
    if (helpTimer.current) clearTimeout(helpTimer.current);
    setHelpOpen(true);
  };

  const closeHelp = () => {
    helpTimer.current = setTimeout(() => setHelpOpen(false), 140);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setHelpOpen(false);
    setCategoryDropdownOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = () => {
      const height = header.getBoundingClientRect().height;
      setBarHeight(height);
      document.documentElement.style.setProperty('--header-h', `${Math.ceil(height)}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const mainNavLinks = [
    { title: "Home", path: "/" },
    { title: "Equipment", path: "/equipment" },
    { title: "Specials", path: "/specials" },
    { title: "Dealers", path: "/dealers" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Sell", path: "/upload-ad" },
  ];

  const quickLinks = [
    { title: "Shelters", path: "/equipment?line=shelters" },
    { title: "Sheds", path: "/equipment?line=sheds" },
    { title: "Tractors", path: "/equipment?line=tractors" },
    { title: "Skid", path: "/equipment?line=skid" },
    { title: "Greenhouse", path: "/equipment?line=greenhouse" },
    { title: "Irrigation", path: "/equipment?line=irrigation" },
    { title: "Parts", path: "/equipment?line=parts" },
    { title: "Mowers", path: "/equipment?line=mowers" },
    { title: "Pumps", path: "/equipment?line=pumps" },
  ];

  const linePath = (slug) => {
    const line = lineBySlug[slug];
    return line ? `/equipment?line=${line}` : '/equipment';
  };

  const linkActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname === path);
  const activeLine = new URLSearchParams(location.search).get('line');
  const quickLinkActive = (path) => {
    const line = new URLSearchParams(path.split('?')[1] || '').get('line');
    if (!line || location.pathname !== '/equipment') return false;
    return activeLine === line;
  };
  const quickLinkClass = (active) =>
    `no-underline text-[10px] font-bold uppercase py-1.5 px-2 inline-flex items-center gap-1 tracking-wide whitespace-nowrap transition-colors duration-300 ease-out min-[768px]:text-[11px] min-[1441px]:py-2 min-[1800px]:text-[13px] min-[2400px]:px-3 min-[2400px]:text-[16px] ${
      active
        ? 'bg-yellow text-primary hover:bg-[#e6b400]'
        : 'bg-transparent text-white hover:bg-transparent hover:text-yellow'
    }`;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[1000] w-full font-sans m-0 p-0 border-t-4 border-accent transition-all duration-300 ease-in-out ${
          isScrolled ? 'shadow-xl' : 'shadow-none'
        }`}
      >
        {/* 1. Top Announcement Bar */}
        <div
          className={`grid bg-white transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
            isScrolled ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100 border-b border-[#02462E]/10'
          }`}
        >
          <div className="overflow-hidden bg-deep text-white text-xs font-medium">
            <div className="site-wrap flex items-center justify-between gap-3 py-1.5 min-[1100px]:gap-6 min-[1441px]:py-2">
              <div className="flex min-w-0 items-center gap-2">
                <ShieldCheck size={16} className="shrink-0 text-white" />
                <span className="truncate font-semibold text-white sm:hidden">
                  Official USA Distributor
                </span>
                <span className="hidden truncate font-semibold text-white sm:inline">
                  Official USA Agricultural Equipment Distributor
                </span>
                <span className="mx-2 hidden text-white/50 min-[1100px]:inline">|</span>
                <span className="hidden shrink-0 text-white/85 min-[1100px]:inline">
                  Certified Heavy-Duty Warranty Included
                </span>
              </div>

              <div className="hidden min-w-0 flex-1 items-center justify-center gap-x-4 gap-y-1 px-2 text-center text-white/85 min-[1280px]:flex">
                <span className="whitespace-nowrap">Same-day written price</span>
                <span className="text-white/40" aria-hidden="true">·</span>
                <span className="whitespace-nowrap">Freight named to your gate</span>
                <span className="hidden text-white/40 min-[1600px]:inline" aria-hidden="true">·</span>
                <span className="hidden whitespace-nowrap min-[1600px]:inline">Parts stay on the shelf after the truck</span>
              </div>

              <div className="flex shrink-0 items-center gap-3 min-[1280px]:gap-4">
                <span className="hidden whitespace-nowrap text-white/80 min-[993px]:inline min-[1280px]:hidden">
                  Same-day quote · Gate freight
                </span>
                <span className="hidden items-center gap-1.5 text-white min-[993px]:flex">
                  <PhoneCall size={13} className="text-yellow" />
                  <a href="tel:18002248005" className="text-white no-underline transition-colors hover:text-yellow">
                    Toll free:{' '}
                    <strong className="font-semibold tracking-wide text-yellow">1-800-224-8005</strong>
                  </a>
                  <span className="mx-1 text-white/40">|</span>
                  <a href="tel:18556863276" className="text-white no-underline transition-colors hover:text-yellow">
                    <strong className="font-semibold tracking-wide text-yellow">855-686-FARM</strong>
                  </a>
                  <span className="mx-1 hidden text-white/40 min-[1600px]:inline">|</span>
                  <a href="tel:15162528000" className="hidden text-white no-underline transition-colors hover:text-yellow min-[1600px]:inline">
                    Long Island:{' '}
                    <strong className="font-semibold tracking-wide text-yellow">516-252-8000</strong>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Main Header (Logo + Nav Links + Account/Cart) */}
        <div
          className={`bg-white text-white border-b border-[#02462E]/10 transition-all duration-300 ${
            isScrolled ? 'py-1.5 min-[993px]:py-2 min-[1600px]:py-2.5' : 'py-2 min-[640px]:py-2.5 min-[993px]:py-3 min-[1440px]:py-3.5 min-[2200px]:py-4'
          }`}
        >
          <div className="site-wrap grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 min-[1100px]:grid-cols-[auto_minmax(0,1fr)_auto] min-[1100px]:gap-x-4 min-[1440px]:gap-x-6 min-[1800px]:gap-x-8">
            <div className="flex min-w-0 max-w-full items-center gap-1.5 justify-self-start min-[480px]:gap-2 min-[768px]:gap-2.5 min-[1100px]:overflow-hidden min-[1100px]:pr-1">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex shrink-0 cursor-pointer items-center border-none bg-transparent p-1 text-primary transition-colors hover:text-accent min-[1100px]:hidden"
                aria-label="Toggle Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={22} strokeWidth={2.25} /> : <Menu size={22} strokeWidth={2.25} />}
              </button>
              {mobileMenuOpen ? (
                <span className="min-[1100px]:hidden text-[15px] font-black uppercase tracking-[0.04em] text-primary">
                  Menu
                </span>
              ) : (
                <Link to="/" aria-label="Farm Exchange" className="flex items-center no-underline shrink-0">
                  <BrandMark compact={isScrolled} />
                </Link>
              )}
              {/* Farm Exchange name — tablet/desktop only */}
              <Link
                to="/"
                className="hidden min-w-0 no-underline min-[768px]:block min-[768px]:max-w-[14rem] min-[1100px]:max-w-[16rem] min-[1280px]:max-w-none"
              >
                <span
                  className={`block truncate font-black leading-none tracking-tight text-primary ${
                    isScrolled
                      ? 'text-[15px] min-[1100px]:text-[16px] min-[1600px]:text-[19px]'
                      : 'text-[16px] min-[1100px]:text-[17px] min-[1440px]:text-[20px] min-[2200px]:text-[24px]'
                  }`}
                >
                  Farm Exchange
                </span>
                <span
                  className={`mt-0.5 hidden truncate font-extrabold leading-none text-accent min-[1280px]:block ${
                    isScrolled
                      ? 'text-[9px] min-[1600px]:text-[10px]'
                      : 'text-[10px] min-[1440px]:text-[12px] min-[2200px]:text-[14px]'
                  }`}
                >
                  America's Farm Families
                </span>
              </Link>
            </div>

            <nav className="hidden min-w-0 w-full min-[1100px]:flex flex-nowrap items-center justify-between gap-1 min-[1440px]:gap-2 min-[1800px]:gap-3">
              {mainNavLinks.map((link, idx) => {
                const isActive = linkActive(link.path);
                return (
                  <Link
                    key={idx}
                    to={link.path}
                    className={`relative overflow-hidden whitespace-nowrap font-extrabold tracking-wide rounded-lg transition-all duration-200 px-1 py-1.5 text-[11px] min-[1200px]:px-1.5 min-[1200px]:py-2 min-[1200px]:text-[12px] min-[1280px]:px-2 min-[1280px]:text-[13px] min-[1600px]:px-2.5 min-[1800px]:px-3 min-[1800px]:text-[15px] min-[2400px]:px-4 min-[2400px]:text-[17px] ${
                      isScrolled ? 'min-[1280px]:text-xs' : ''
                    } ${
                      isActive
                        ? 'text-white bg-primary shadow-sm font-black'
                        : 'text-primary/85 hover:text-primary hover:bg-primary/10'
                    }`}
                  >
                    {link.title}
                    {isActive && (
                      <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow" />
                    )}
                  </Link>
                );
              })}

              <div
                className="relative z-[130] shrink-0"
                onMouseEnter={openHelp}
                onMouseLeave={closeHelp}
              >
                <button
                  type="button"
                  onClick={() => setHelpOpen((open) => !open)}
                  aria-expanded={helpOpen}
                  aria-haspopup="menu"
                  className={`group/help inline-flex items-center gap-1 rounded-lg border-none px-1 py-1.5 text-[11px] font-extrabold uppercase tracking-wide cursor-pointer transition-all duration-200 min-[1200px]:gap-1.5 min-[1200px]:px-1.5 min-[1200px]:text-[12px] min-[1280px]:px-2 min-[1280px]:text-[13px] min-[1600px]:px-2.5 min-[1800px]:px-3 min-[1800px]:text-[15px] ${
                    helpOpen
                      ? 'bg-primary text-white'
                      : 'bg-transparent text-primary/85 hover:bg-primary hover:text-white'
                  }`}
                >
                  <CircleHelp
                    size={14}
                    className={`shrink-0 transition-colors ${helpOpen ? 'text-yellow' : 'text-accent group-hover/help:text-yellow'}`}
                  />
                  <span>Help</span>
                  <ChevronDown
                    size={13}
                    className={`shrink-0 transition-transform duration-200 ${helpOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`absolute right-0 top-full z-[140] w-[min(15.5rem,calc(100vw-1.5rem))] pt-2 min-[1600px]:left-1/2 min-[1600px]:right-auto min-[1600px]:-translate-x-1/2 ${
                    helpOpen ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                >
                  <div
                    role="menu"
                    className={`origin-top overflow-hidden rounded-xl border border-white/15 bg-primary py-1.5 shadow-[0_16px_40px_rgb(2_70_46/0.35)] transition-[opacity,transform] duration-150 ${
                      helpOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
                    }`}
                  >
                    {helpMenuLinks.map((item) => {
                      const Icon = item.icon;
                      const itemClass =
                        'flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] font-bold text-white no-underline transition-colors hover:bg-white/10';
                      if (item.external) {
                        return (
                          <a key={item.title} href={item.path} role="menuitem" className={itemClass} onClick={() => setHelpOpen(false)}>
                            <Icon size={15} className="shrink-0 text-yellow" />
                            {item.title}
                          </a>
                        );
                      }
                      return (
                        <Link key={item.title} to={item.path} role="menuitem" className={itemClass} onClick={() => setHelpOpen(false)}>
                          <Icon size={15} className="shrink-0 text-yellow" />
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </nav>

            <div className="flex items-center justify-self-end gap-1.5 min-[480px]:gap-2 min-[1280px]:gap-3 min-[1600px]:gap-4 shrink-0">
              <AccountMenu />

              <Link
                to={cartHref}
                aria-label={count ? `Cart, ${count} items` : 'Cart'}
                aria-current={location.pathname === '/cart' ? 'page' : undefined}
                className={`relative flex items-center gap-2 rounded-lg border-2 p-1.5 no-underline transition-colors duration-200 min-[480px]:p-2 min-[480px]:px-2.5 min-[1280px]:gap-2.5 min-[1280px]:px-3.5 min-[1280px]:py-1.5 ${
                  location.pathname === '/cart'
                    ? 'border-accent bg-accent text-white'
                    : 'border-accent bg-white text-accent hover:bg-accent/5'
                }`}
              >
                <span className="relative">
                  <ShoppingCart size={16} className={`min-[480px]:hidden ${location.pathname === '/cart' ? 'text-white' : 'text-accent'}`} />
                  <ShoppingCart size={18} className={`hidden min-[480px]:block ${location.pathname === '/cart' ? 'text-white' : 'text-accent'}`} />
                  {count > 0 && (
                    <span className={`absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center px-1 text-[9px] font-black ${
                      location.pathname === '/cart' ? 'bg-white text-accent' : 'bg-accent text-white'
                    }`}>
                      {count > 99 ? '99+' : count}
                    </span>
                  )}
                </span>
                <div className="hidden min-[1280px]:flex flex-col text-left">
                  <span className={`text-[9px] uppercase font-black leading-tight ${location.pathname === '/cart' ? 'text-white' : 'text-accent'}`}>Cart</span>
                  <span className={`text-xs font-black leading-tight ${location.pathname === '/cart' ? 'text-white' : 'text-accent'}`}>
                    ${formatMoney(subtotal)}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Categories & Farmer Specials Bar */}
        <div className="relative z-[110] hidden min-[1100px]:block bg-primary text-white">
          <div className="site-wrap border-t border-white/15 py-1 min-[1440px]:py-2 min-[1800px]:py-2.5 min-[2400px]:py-3">
            <div className="scroll-x relative flex flex-nowrap items-center gap-1.5 min-[1280px]:overflow-visible min-[1440px]:gap-3">
              <button
                type="button"
                onMouseEnter={openCategories}
                onMouseLeave={closeCategories}
                aria-expanded={categoryDropdownOpen}
                className="border border-yellow bg-yellow text-primary py-1.5 px-2.5 text-[10px] font-black uppercase cursor-pointer flex items-center gap-1.5 tracking-wide whitespace-nowrap shrink-0 hover:bg-[#e6b400] transition-colors shadow-sm min-[768px]:px-3 min-[768px]:text-[11px] min-[1441px]:py-2.5 min-[1800px]:px-5 min-[1800px]:py-3 min-[1800px]:text-[13px] min-[2400px]:px-6 min-[2400px]:text-[16px]"
              >
                <Layers size={14} />
                <span>View Categories</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </button>

              <nav className="flex min-w-0 flex-1 flex-nowrap items-center justify-between gap-0.5 px-1 min-[1440px]:gap-1 min-[1800px]:gap-2">
                {quickLinks.map((link) => {
                  const isActive = quickLinkActive(link.path);
                  return (
                    <Link
                      key={`${link.title}-${link.path}`}
                      to={link.path}
                      aria-current={isActive ? 'page' : undefined}
                      className={quickLinkClass(isActive)}
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </nav>

              <Link
                to="/specials"
                className="bg-accent text-white py-1.5 px-2.5 rounded text-[11px] font-black uppercase no-underline tracking-wide whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-accent-dark shadow-sm"
              >
                Sale
              </Link>
            </div>
          </div>

          {categoryDropdownOpen && (
            <div
              onMouseEnter={openCategories}
              onMouseLeave={closeCategories}
              className="absolute left-0 right-0 top-full z-[120] flex w-full overflow-hidden border-t border-white/20 bg-[#012318] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            >
              <div className="w-[220px] shrink-0 overflow-y-auto border-r border-white/10 bg-[#011c14] py-3 min-[1200px]:w-[260px] min-[1800px]:w-[300px] max-h-[min(68vh,640px)]">
                {categoryMenu.map((cat, index) => {
                  const selected = index === activeCategory;
                  return (
                    <Link
                      key={cat.slug}
                      to={linePath(cat.slug)}
                      onMouseEnter={() => setActiveCategory(index)}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className={`mx-2 mb-1 flex w-[calc(100%-1rem)] cursor-pointer items-center gap-2 rounded-lg no-underline px-3.5 py-2.5 text-left text-[13px] font-semibold transition-colors duration-150 min-[1200px]:px-4 ${
                        selected
                          ? 'bg-[#034a32] text-white shadow-[inset_0_0_0_1px_rgba(254,199,0,0.35)]'
                          : 'bg-transparent text-white/85 hover:bg-[#023d26] hover:text-white'
                      }`}
                    >
                      <span className="min-w-0 flex-1 leading-snug">{cat.title}</span>
                      {selected && <ChevronRight size={14} className="shrink-0 text-yellow" />}
                    </Link>
                  );
                })}
              </div>

              <div className="min-w-0 flex-1 overflow-y-auto bg-[#012318] p-5 min-[1200px]:p-6 max-h-[min(68vh,640px)]">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h3 className="m-0 text-[18px] font-black text-white min-[1200px]:text-[20px]">
                    {categoryMenu[activeCategory].title}
                  </h3>
                  <Link
                    to={linePath(categoryMenu[activeCategory].slug)}
                    onClick={() => setCategoryDropdownOpen(false)}
                    className="text-[12px] font-extrabold tracking-wide text-yellow no-underline hover:underline"
                  >
                    View all &gt;
                  </Link>
                </div>
                <div className="grid gap-4 min-[900px]:grid-cols-2 min-[1100px]:grid-cols-3 min-[1600px]:grid-cols-4">
                  {categoryMenu[activeCategory].groups.map((group) => (
                    <div
                      key={group.title}
                      className="rounded-2xl border border-white/10 bg-[#034a32] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span className="grid h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                          <img src={group.image} alt="" className="h-full w-full object-cover" />
                        </span>
                        <p className="m-0 text-[14px] font-bold leading-tight text-white">{group.title}</p>
                      </div>
                      <ul className="m-0 flex list-none flex-col gap-1 p-0">
                        {group.items.map((item) => (
                          <li key={item}>
                            <Link
                              to={linePath(categoryMenu[activeCategory].slug)}
                              onClick={() => setCategoryDropdownOpen(false)}
                              className="block px-0 py-1 text-[13px] text-white/80 no-underline transition-colors duration-150 hover:text-yellow"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="min-[1100px]:hidden border-b-4 border-accent bg-white text-primary shadow-[0_16px_40px_rgb(2_70_46/0.18)]">
            <div className="site-wrap max-h-[min(72vh,560px)] overflow-y-auto overscroll-contain py-4">
              <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-primary px-3.5 py-3 text-white">
                <div className="min-w-0">
                  <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white">Farm Exchange</p>
                  <p className="m-0 mt-0.5 truncate text-[12px] font-semibold text-white/80">America's Farm Families</p>
                </div>
                <a
                  href="tel:18002248005"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[11px] font-black uppercase text-white no-underline"
                >
                  <PhoneCall size={13} /> Call
                </a>
              </div>

              <p className="m-0 mb-2 text-[11px] font-black uppercase tracking-wider text-primary/70">
                Menu
              </p>
              <div className="mb-5 flex flex-col gap-1">
                {mainNavLinks.map((link) => {
                  const isActive = linkActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`rounded-lg px-3.5 py-3 text-[15px] font-black no-underline transition-colors ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-primary hover:bg-primary/8'
                      }`}
                    >
                      {link.title}
                    </Link>
                  );
                })}
                <Link
                  to="/specials"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 flex items-center gap-3 rounded-xl border border-white/60 bg-primary px-3.5 py-3 no-underline transition-colors hover:border-white hover:bg-white/10"
                >
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block text-[13px] font-black uppercase tracking-wide text-white">This week&apos;s specials</span>
                    <span className="mt-0.5 block text-[12px] font-semibold leading-snug text-white/70">Tagged-down iron already on a USA lot</span>
                  </span>
                  <ChevronRight size={16} className="shrink-0 text-white/55" />
                </Link>
              </div>

              <p className="m-0 mb-2 text-[11px] font-black uppercase tracking-wider text-primary/70">
                Help
              </p>
              <div className="mb-5 flex flex-col gap-0.5">
                {helpMenuLinks.map((item) => {
                  const Icon = item.icon;
                  const className =
                    'flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-[14px] font-bold text-primary no-underline transition-colors hover:bg-primary/5';
                  if (item.external) {
                    return (
                      <a key={item.title} href={item.path} className={className} onClick={() => setMobileMenuOpen(false)}>
                        <Icon size={16} className="shrink-0 text-accent" />
                        {item.title}
                      </a>
                    );
                  }
                  return (
                    <Link key={item.title} to={item.path} className={className} onClick={() => setMobileMenuOpen(false)}>
                      <Icon size={16} className="shrink-0 text-accent" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>

              <p className="m-0 mb-2 text-[11px] font-black uppercase tracking-wider text-primary/70">
                Equipment categories
              </p>
              <div className="flex flex-col gap-0.5 pb-2">
                {categoryMenu.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={linePath(cat.slug)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between gap-2 rounded-lg px-3.5 py-2.5 text-[13px] font-bold text-primary/90 no-underline transition-colors hover:bg-primary/5"
                  >
                    <span>{cat.title}</span>
                    <ChevronRight size={14} className="shrink-0 text-primary/40" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Dynamic Spacer height matching fixed navbar */}
      <div aria-hidden="true" style={{ height: barHeight }} />
    </>
  );
}