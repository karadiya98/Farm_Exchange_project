import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import KineticMarquee from '../components/KineticMarquee';
import AnimatedPath from '../components/AnimatedPath';
import AboutUs from '../components/AboutUs';
import YardFilm from '../components/YardFilm';
import HistoryEvolution from '../components/HistoryEvolution';
import IrrigationHelp from '../components/IrrigationHelp';
import ServicesDesk from '../components/ServicesDesk';
import HomeReading from '../components/HomeReading';
import DealPaths from '../components/DealPaths';
import GlobalPresence from '../components/GlobalPresence';
import ContactForm from '../components/ContactForm';
import DeviceMockups from '../components/DeviceMockups';
import Portals from '../components/Portals';
import FarmTours from '../components/FarmTours';
import UploadAssetLive from '../components/UploadAssetLive';
import SectionRule from '../components/SectionRule';
import Reveal from '../components/Reveal';
import ImageHoverCaption from '../components/ImageHoverCaption';
import CardRail, { slideClass } from '../components/CardRail';
import ListingCard from '../components/ListingCard';
import { featuredProducts, lineBySlug } from '../data/catalog';
import shopTractors from '../public/shop.jpg';
import fieldTractor from '../public/field.jpg';
import classicTractor from '../public/classic.jpg';
import yardTractor from '../public/yard.jpg';
import heroTractor from '../public/Hero images/hero-tractor.jpg';
import heroIrrigation from '../public/Hero images/hero-irrigation.jpg';
import heroCornfield from '../public/Hero images/hero-cornfield.jpg';
import faqCorn from '../public/Hero images/Cornfield Border on Transparent Background.png';
import harvestCard from '../public/Hero images/Golden Harvest_ Tractor and Cornfield.png';
import logo from '../public/logo-img.png';
import cat1 from '../catregories/cat1.jpg';
import cat2 from '../catregories/cat2.jpeg';
import cat3 from '../catregories/cat3.jpg';
import cat4 from '../catregories/cat4.jpg';
import cat5 from '../catregories/cat5.webp';
import cat6 from '../catregories/cat6.webp';
import cat7 from '../catregories/cat7.jpg';
import cat8 from '../catregories/cat8.png';
import { 
  Phone, ShieldCheck, Truck, RotateCcw,
  ArrowRight, Wrench, CheckCircle, Clock, Mail, BookOpen
} from 'lucide-react';

const CATALOGUE_FLIPBOOK = 'https://heyzine.com/flip-book/0da837088c.html';

const heroMarks = ['Buy', 'Barter', 'Repair', 'Parts', 'Freight', 'Service'];

const accentBtn =
  'inline-flex items-center gap-2.5 bg-accent text-white font-extrabold rounded-md cursor-pointer uppercase tracking-[0.5px] border-none no-underline transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_6px_20px_rgb(200_36_37/0.3)] hover:bg-accent-dark hover:-translate-y-[3px] hover:shadow-[0_12px_28px_rgb(200_36_37/0.45)]';

const dealerSlides = [
  {
    src: fieldTractor,
    alt: 'Red tractor facing a harvested field',
    kicker: '01',
    title: 'Harvest row iron',
    body: 'Listed for the cut — hitch class and hours on the same card.',
  },
  {
    src: classicTractor,
    alt: 'Vintage red tractor in a green pasture',
    kicker: '02',
    title: 'Dealer field stock',
    body: 'Proven pasture units tagged before a truck is booked.',
  },
  {
    src: yardTractor,
    alt: 'Weathered tractor parked by a farm lane',
    kicker: '03',
    title: 'Yard to your gate',
    body: 'Freight named with the sale, from the lot to the lane.',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

 const heroSlides = [
    {
      id: 1,
      badge: "HEAVY MACHINERY & ATTACHMENTS",
      title: ["TRACTOR IMPLEMENTS THAT", "HOLD A STRAIGHT ROW"],
      description: "Cultivators, brush cutters, and hydraulic tools from the depot, built for the flow and the soil a working tractor actually sees.",
    },
    {
      id: 2,
      badge: "IRRIGATION ON THE ACRE",
      title: ["PUMPS THAT KEEP THE FIELD", "UNDER WATER ON SCHEDULE"],
      description: "High-volume diesel and electric pumps, sized for the span and the season, with a freight plan that names the lane to your gate.",
    },
    {
      id: 3,
      badge: "FROM THE DEPOT TO THE GATE",
      title: ["EQUIPMENT LISTED FOR", "THE FIELD IT HAS TO WORK"],
      description: "Shelters, iron, and spare parts leave with a yard number, a wind rating, and a truck that can reach the acre. Since 1999.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const [openFaq, setOpenFaq] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [heroSeen, setHeroSeen] = useState(false);
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHeroSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setHeroSeen(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = true;
    const start = () => video.play().catch(() => {});
    start();
    video.addEventListener('canplay', start);
    return () => video.removeEventListener('canplay', start);
  }, []);

  const categoryHelix = [
    { number: '01', title: 'Container Shelters', slug: 'container-shelters', client: '28 models', category: 'Shelters', description: 'Galvanized frames and 32oz vinyl, wind-rated before a truck is booked.', image: cat1 },
    { number: '02', title: 'Metal Storage Sheds', slug: 'metal-sheds', client: '16 models', category: 'Sheds', description: 'Heavy bays for tools, hay, and a skid steer that has to stay out of the weather.', image: cat2 },
    { number: '03', title: 'Skid Steer Attachments', slug: 'skid-steer-attachments', client: '34 attachments', category: 'Iron', description: 'Brush cutters, augers, and buckets matched to the hydraulic flow on the tag.', image: cat3 },
    { number: '04', title: 'Irrigation Pumps', slug: 'irrigation-pumps', client: '20 systems', category: 'Water', description: 'Diesel and electric pumps sized for the span and the season on the acre.', image: cat4 },
    { number: '05', title: 'Tractors & Mowers', slug: 'tractors-mowers', client: 'In stock', category: 'Machines', description: 'Implements that hold a straight row, listed with hitch class and a yard number.', image: cat5 },
    { number: '06', title: 'Greenhouses', slug: 'greenhouses', client: 'Multi-span', category: 'Houses', description: 'Polycarbonate houses for a full season, with vents and a freight plan to the gate.', image: cat6 },
    { number: '07', title: 'Soil Compactors', slug: 'soil-compactors', client: 'Yard tools', category: 'Ground', description: 'Plate compactors, rammers, and tillers for a pad or a garden block.', image: cat7 },
    { number: '08', title: 'Farm Implements', slug: 'farm-implements', client: 'Hitch tools', category: 'Parts', description: 'Box blades, cultivators, and hay tools matched to the hitch on your tractor.', image: cat8 },
  ];

  const shopStages = [
    { n: '01', title: 'Cut list', body: 'Tube, plate, and brackets are sawn to the shelter span and the hitch class on the drawing.', left: '8.3%', top: '13.5%', shift: 'translate(18px, 16px)' },
    { n: '02', title: 'Fixture weld', body: 'Bows and legs are clamped square so the roofline matches the bay width.', left: '32%', top: '29.5%', shift: 'translate(-20%, 18px)' },
    { n: '03', title: 'Pull test', body: 'A winch loads the frame to its published wind rating and any twist is marked before paint.', left: '54.7%', top: '46.3%', shift: 'translate(-30%, 18px)' },
    { n: '04', title: 'Yard number', body: 'The finished shelter is tagged on the depot lot, waiting on a truck that is already assigned.', left: '81.7%', top: '67.8%', shift: 'translate(-88%, 18px)' },
  ];

  const steps = [
    {
      n: '01',
      title: 'Choose the machine',
      time: '10 min',
      icon: Wrench,
      summary: 'Match a shelter, attachment, or pump to the acreage and the job.',
      body: 'Open the equipment list and narrow by category, horsepower, and frame size. Every listing shows wind rating, hydraulic flow, and what is actually in stock, so you are not guessing from a brochure.',
      points: ['Live depot inventory', 'Specs beside every model', 'Side-by-side comparisons'],
    },
    {
      n: '02',
      title: 'Lock the spec',
      time: 'Same day',
      icon: Phone,
      summary: 'An equipment engineer confirms fit, freight, and the price in one call.',
      body: 'Call the toll-free line or send a quote request. We check hitch class, hydraulic flow, and the driveway a truck can actually reach, then send a written dealer price before anything moves.',
      points: ['Engineer on the phone', 'Written quote in 2 hours', 'No surprise freight later'],
    },
    {
      n: '03',
      title: 'Ship to the farm',
      time: 'Tracked',
      icon: Truck,
      summary: 'Liftgate or flatbed delivery straight to the gate you name.',
      body: 'The order leaves the depot on a scheduled truck. You get a tracking window, a driver call ahead, and the choice of farm lane or job site. Bulk loads can be staged in one drop.',
      points: ['Farm-gate delivery', 'Call-ahead drivers', 'Bulk loads in one drop'],
    },
    {
      n: '04',
      title: 'Build and run',
      time: 'Day one',
      icon: ShieldCheck,
      summary: 'Manuals, a video guide, and a 12-month warranty start the moment it lands.',
      body: 'Printed steps and an HD assembly video come with the crate. Spare parts stay in stock if a blade or panel needs replacing, and the warranty is registered before the first hour of work.',
      points: ['Printed and video guides', 'Parts hub on standby', '12-month structural warranty'],
    },
  ];

  const faqs = [
    { question: "How is equipment delivered?", answer: "Freight is quoted before you pay. Depending on the unit and your gate, that may be liftgate or flatbed to a farm address or job site. The desk names the truck type and the window on the sheet." },
    { question: "Do manuals ship with the unit?", answer: "When a manual or assembly guide is in the crate, it is noted on the listing. If you need a guide before the truck leaves, call the desk with the yard number and we will say what is available." },
    { question: "What warranty applies?", answer: "Coverage, when it applies, is written on the listing or quote before you pay. Ask the desk to read the warranty lines for that yard number — we do not invent coverage after the sale." },
    { question: "Can I get a freight quote for more than one unit?", answer: "Yes. Call 1-800-224-8005 with the yard numbers and destination. Volume loads are quoted once the count and gate details are known." },
  ];

  return (
    <div className="flex-1 font-sans bg-white text-primary overflow-x-clip">
      <section id="site-hero" ref={heroRef} className="relative w-full min-h-[480px] min-[993px]:h-[580px] min-[993px]:min-h-0 min-[1600px]:h-[700px] min-[2200px]:h-[820px] bg-ink">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src="/hero.mp4#t=0.1"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-2 z-30 flex justify-center px-4 min-[993px]:top-3">
          <div className="w-[min(86vw,300px)] min-[993px]:w-[520px] min-[1600px]:w-[600px]">
            <img
              src={logo}
              alt="Farm Exchange"
              className="block h-auto w-full object-contain drop-shadow-[0_8px_18px_rgb(0_0_0/0.45)]"
            />
            <p className="m-0 -mt-1 flex w-full items-center justify-between whitespace-nowrap pl-[36%] pr-[1%] text-[8px] font-extrabold uppercase tracking-[0.04em] text-white [text-shadow:0_2px_8px_rgb(0_0_0/0.75)] min-[993px]:text-[11px] min-[993px]:tracking-[0.06em] min-[1600px]:text-[12px]">
              {heroMarks.map((word, index) => (
                <span key={word} className="inline-flex items-center gap-[0.35em]">
                  {index > 0 && <span className="text-white" aria-hidden="true">|</span>}
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 flex items-center pt-[108px] transition-opacity duration-[800ms] ease-in-out min-[480px]:pt-[120px] min-[993px]:pt-[168px] min-[1600px]:pt-[190px] ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="site-wrap relative z-20 flex w-full max-w-full items-center justify-between gap-4 min-[993px]:gap-8 min-[1600px]:gap-14">
              <div
                className={`min-w-0 flex-1 max-w-[700px] min-[1600px]:max-w-[980px] min-[2200px]:max-w-[1200px] transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                  heroSeen && index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <span className="mb-2.5 inline-block rounded bg-accent px-2 py-1 text-[9px] font-black uppercase tracking-[0.08em] text-white shadow-[0_4px_12px_rgb(200_36_37/0.4)] min-[480px]:mb-3.5 min-[480px]:px-3 min-[480px]:py-1.5 min-[480px]:text-[11px] min-[480px]:tracking-[1.2px]">
                  {slide.badge}
                </span>
                <h1 className="m-0 mb-3 max-w-full text-[clamp(1.55rem,4.8vw,4.35rem)] font-black uppercase leading-[1.08] tracking-[0.4px] text-white [text-shadow:0_2px_8px_rgb(0_0_0/0.5)] min-[480px]:mb-4">
                  <span className="block min-[640px]:whitespace-nowrap">{slide.title[0]}</span>
                  <span className="block min-[640px]:whitespace-nowrap">{slide.title[1]}</span>
                </h1>
                <p className="mb-4 max-w-[600px] text-[13px] leading-[1.55] text-white min-[480px]:mb-7 min-[480px]:text-[15px] min-[1600px]:max-w-[720px] min-[1600px]:text-[18px]">
                  {slide.description}
                </p>
                <div className="flex w-full max-w-full flex-col gap-2 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:gap-3">
                  <a href="#catalog" className={`${accentBtn} w-full justify-center px-3.5 py-2 text-[11px] min-[480px]:w-auto min-[480px]:px-8 min-[480px]:py-3.5 min-[480px]:text-sm`}>
                    Explore Inventory <ArrowRight className="h-3.5 w-3.5 min-[480px]:h-[18px] min-[480px]:w-[18px]" />
                  </a>
                  <button className="w-full cursor-pointer rounded-md border-2 border-yellow bg-yellow px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.5px] text-primary transition-all duration-300 hover:-translate-y-[3px] hover:border-accent hover:bg-accent hover:text-white hover:shadow-[0_8px_20px_rgb(200_36_37/0.4)] min-[480px]:w-auto min-[480px]:px-7 min-[480px]:py-3 min-[480px]:text-sm">
                    Request Custom Quote
                  </button>
                </div>
              </div>

              <div className="hidden min-[993px]:block w-[330px] min-[1800px]:w-[400px] [perspective:1100px] group/card">
                <div className="relative h-[228px] transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)] motion-reduce:transition-none motion-reduce:group-hover/card:[transform:none]">
                  <div className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border-2 border-yellow p-7 shadow-[0_20px_40px_rgb(0_0_0/0.6)] [backface-visibility:hidden]">
                    <img src={harvestCard} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
                    <div className="pointer-events-none absolute inset-0 bg-primary/70" aria-hidden="true" />
                    <span className="relative text-[11px] uppercase text-white font-extrabold tracking-[1.2px]">Toll Free US Sales Line</span>
                    <p className="relative m-0 my-2 text-[28px] font-black text-yellow">1-800-224-8005</p>
                    <p className="relative text-xs text-white m-0 leading-[1.5]">Speak Directly With Equipment Engineers & Freight Consultants</p>
                    <div className="relative mt-auto pt-3.5 border-t border-accent/40 flex items-center gap-2.5 text-[13px] text-white font-bold">
                      <Phone size={18} className="text-white" />
                  <span>Instant Dealer Pricing</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border-2 border-yellow p-6 shadow-[0_20px_40px_rgb(0_0_0/0.6)] [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <img src={harvestCard} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
                    <div className="pointer-events-none absolute inset-0 bg-primary/70" aria-hidden="true" />
                    <span className="relative text-[11px] font-extrabold uppercase tracking-[1.2px] text-white">The desk · Since 1999</span>
                    <ul className="relative m-0 mt-3 flex list-none flex-col gap-2 p-0 text-[12px] font-semibold text-white">
                      <li className="flex items-center gap-2.5">
                        <Phone size={15} className="shrink-0 text-white" />
                        Long Island 516-252-8000
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Phone size={15} className="shrink-0 text-white" />
                        Sheridan 307-207-1777
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Mail size={15} className="shrink-0 text-white" />
                        <span className="break-all">welcome@farmexchange.com</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Clock size={15} className="mt-0.5 shrink-0 text-white" />
                        Freight quote and hitch class in writing
                      </li>
                    </ul>
                    <p className="relative m-0 mt-auto text-[11px] font-bold uppercase leading-snug text-white/85">
                      30 N GOULD STREET
                      <br />
                      SHERIDAN, WY 82801
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      </section>

      <SectionRule />
      <KineticMarquee />
      <SectionRule />

      <section className="bg-primary text-white">
        <div className="content-wrap py-6 grid gap-6 grid-cols-1 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-4 min-[1100px]:gap-8 min-[1600px]:py-8">
          {[
            { icon: Truck, title: 'Nationwide Freight', text: 'Direct job-site & farm delivery across USA' },
            { icon: ShieldCheck, title: '12-Month Warranty', text: 'Certified structural build guarantee' },
            { icon: RotateCcw, title: '30-Day Guarantee', text: 'Hassle-free equipment returns policy' },
            { icon: Wrench, title: 'Spare Parts Hub', text: 'Full inventory replacement stock ready' },
          ].map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 80}>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/80 bg-primary text-white min-[1600px]:h-14 min-[1600px]:w-14">
                  <Icon size={22} />
                </span>
                <div className="min-w-0">
                  <h3 className="m-0 text-[13px] min-[1600px]:text-[15px] font-black uppercase tracking-[0.4px] text-white">{title}</h3>
                  <p className="m-0 mt-1 text-[12px] min-[1600px]:text-[13px] leading-snug text-white/70">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionRule />

      <section className="bg-white pt-12 pb-14 min-[640px]:pt-[60px] min-[640px]:pb-16">
        <div className="content-wrap mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <Reveal className="min-w-0 max-w-[640px] text-left">
            <span className="section-kicker text-xs font-extrabold uppercase tracking-[1px]">HEAVY CATALOGUE</span>
            <h2 className="m-0 mt-1 text-[28px] font-black uppercase leading-tight min-[640px]:text-[38px] min-[1600px]:text-[48px] min-[2400px]:text-[60px]">Explore Equipment Categories</h2>
            <p className="m-0 mt-3 max-w-[560px] text-sm text-primary/70">Shelters, sheds, skid steer iron, pumps, tractors, houses, compactors, and implements. Each line already has a yard number.</p>
          </Reveal>
          <Link
            to="/equipment"
            className="cta-box mb-1 ml-auto px-3.5 py-2 text-[12px]"
          >
            View equipment
          </Link>
        </div>
        <div className="content-wrap">
          <CardRail>
            {categoryHelix.map((item) => (
              <Link
                key={item.number}
                to={`/equipment?line=${lineBySlug[item.slug] || 'all'}`}
                className={`${slideClass} group relative block h-[180px] overflow-hidden rounded-md no-underline min-[640px]:h-[200px] min-[1100px]:h-[240px] min-[1600px]:h-[280px] min-[2200px]:h-[340px]`}
              >
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-primary/25 transition-colors duration-300 group-hover:bg-primary/35" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-primary via-primary/80 to-transparent transition-[height] duration-300 group-hover:h-[78%]" />
                <span className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-3 pb-4 pt-8 min-[1800px]:px-4 min-[1800px]:pb-5">
                  <span className="mb-1 text-[10px] font-black tracking-[0.08em] text-yellow">{item.number}</span>
                  <span className="text-[12px] font-black uppercase leading-[1.25] tracking-[0.03em] text-white transition-transform duration-300 ease-out group-hover:-translate-y-0.5 min-[1440px]:text-[13px] min-[1800px]:text-[16px]">
                    {item.title}
                  </span>
                  <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                    <span className="overflow-hidden">
                      <span className="mt-1.5 block translate-y-3 text-[11px] font-semibold leading-[1.35] normal-case tracking-normal text-white/90 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 min-[1440px]:text-[12px] min-[1800px]:text-[13px]">
                        {item.description}
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </CardRail>
        </div>
      </section>

      <SectionRule />

      <section className="bg-primary text-white py-12 min-[1441px]:py-[70px] min-[1800px]:py-[100px]">
        <div className="content-wrap">
          <div className="flex flex-wrap items-start justify-between gap-8 mb-8">
            <Reveal className="max-w-[560px]">
              <span className="section-kicker text-xs font-extrabold uppercase tracking-[1px]">ON THE SHOP FLOOR</span>
              <h2 className="text-[28px] min-[640px]:text-[34px] min-[1441px]:text-[38px] min-[1600px]:text-[48px] min-[2200px]:text-[56px] font-black text-white m-0 mt-1 uppercase leading-tight">Proved on the jig before a truck is booked</h2>
              <p className="m-0 mt-3 text-sm text-white/80 leading-[1.6]">
                Four stops on the bay itself. Steel is cut, welded square, pulled to its wind rating, and tagged in the yard.
              </p>
            </Reveal>
            <Reveal delay={120} className="group relative w-full min-[993px]:w-[280px] min-[1441px]:w-[380px] min-[1800px]:w-[520px] min-[2400px]:w-[680px] shrink-0 p-2.5 min-[1441px]:p-3.5">
              <span className="pointer-events-none absolute inset-0 rounded-[22px] border border-primary/15" />
              <span className="pointer-events-none absolute inset-[7px] rounded-[16px] border border-white/50" />
              <div className="relative h-[150px] min-[1441px]:h-[220px] min-[1800px]:h-[300px] min-[2400px]:h-[400px] overflow-hidden rounded-xl">
                <img
                  src={shopTractors}
                  alt="Red and green tractors parked on a harvested field"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
                />
                <ImageHoverCaption
                  kicker="01"
                  title="Shop floor stock"
                  body="Red and green units tagged on the bay before a truck is booked."
                />
              </div>
            </Reveal>
        </div>

          <div className="mt-6 grid gap-4 min-[1200px]:hidden">
            {shopStages.map((stage) => (
              <div key={stage.n} className="border border-white/25 rounded-xl bg-primary p-4">
                <span className="text-[11px] font-black text-yellow tracking-[1px]">{stage.n}</span>
                <h3 className="m-0 mt-1 text-base font-black uppercase text-white">{stage.title}</h3>
                <p className="m-0 mt-1.5 text-[13px] text-white/80 leading-[1.55]">{stage.body}</p>
              </div>
            ))}
            <p className="m-0 text-sm text-white/80 leading-[1.65]">
              Nothing on this line is a brochure promise. The cut list, the jig notes, and the pull-test sheet stay with the bay until a yard number is tied on. If a leg is out of square, it does not get a tag, and it does not get a truck.
            </p>
          </div>

          <div className="relative hidden min-[1200px]:block h-[440px] min-[1441px]:h-[520px] min-[1800px]:h-[600px]">
            <AnimatedPath />
            {shopStages.map((stage) => (
              <div
                key={stage.n}
                className="absolute w-[180px] max-w-[26%] min-[1441px]:w-[210px] min-[1441px]:max-w-[28%]"
                style={{ left: stage.left, top: stage.top, transform: stage.shift }}
              >
                <span className="text-[11px] font-black text-yellow tracking-[1px]">{stage.n}</span>
                <h3 className="m-0 mt-1 text-base font-black uppercase leading-tight text-white">{stage.title}</h3>
                <p className="m-0 mt-1.5 text-[13px] text-white/80 leading-[1.5]">{stage.body}</p>
              </div>
            ))}
            <div className="absolute left-0 bottom-0 max-w-[300px]">
              <span className="text-[11px] font-extrabold text-yellow uppercase tracking-[1px]">Why the tag matters</span>
              <p className="m-0 mt-2 text-sm text-white/80 leading-[1.65]">
                Nothing on this line is a brochure promise. The cut list, the jig notes, and the pull-test sheet stay with the bay until a yard number is tied on. If a leg is out of square, it does not get a tag, and it does not get a truck.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionRule />

      <section id="catalog" className="content-wrap py-10 pb-[70px]">
        <div className="flex flex-wrap justify-between items-end mb-8 gap-4">
          <Reveal>
            <span className="section-kicker text-xs font-extrabold uppercase tracking-[1px]">IN-STOCK INVENTORY</span>
            <h2 className="text-[30px] min-[640px]:text-[38px] min-[1600px]:text-[48px] min-[2200px]:text-[56px] font-black m-0 mt-1 uppercase leading-tight">Featured Machinery</h2>
          </Reveal>

          <Link
            to="/equipment"
            className="cta-box mb-1 px-3.5 py-2 text-[12px]"
          >
            View all
          </Link>
        </div>

        <CardRail columns={4}>
          {featuredProducts.slice(0, 12).map((product, index) => (
            <Reveal key={product.id} delay={index * 60} className={slideClass}>
              <ListingCard product={product} />
            </Reveal>
          ))}
        </CardRail>
      </section>

      <SectionRule />

      <section id="catalogue-book" className="bg-primary py-14 text-white min-[993px]:py-[72px]">
        <div className="content-wrap">
          <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0 max-w-[640px]">
              <p className="section-kicker m-0 text-xs font-extrabold uppercase tracking-[1px]">Printed lot book</p>
              <h2 className="m-0 mt-2 text-[30px] font-black uppercase leading-tight min-[640px]:text-[42px] min-[1600px]:text-[50px]">
                Flip the Farm Exchange catalogue
              </h2>
              <p className="m-0 mt-3 text-[15px] leading-[1.65] text-white/75">
                Turn the pages online — the same yard book buyers use when they call the desk.
              </p>
            </div>
            <a
              href={`${CATALOGUE_FLIPBOOK}#page/1`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-box inline-flex shrink-0 items-center gap-2 px-4 py-2.5 text-[12px]"
            >
              <BookOpen size={15} />
              Open full book
            </a>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative w-full overflow-hidden border border-white/20 bg-black/20 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
              <div className="aspect-[4/3] w-full min-[768px]:aspect-[16/10] min-[1280px]:aspect-[16/9]">
                <iframe
                  title="Farm Exchange online catalogue flipbook"
                  src={`${CATALOGUE_FLIPBOOK}?p=1`}
                  className="h-full w-full border-0"
                  allow="fullscreen; clipboard-write"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionRule />

      <section className="bg-white text-primary py-[70px] min-[1800px]:py-[100px]">
        <div className="content-wrap grid gap-10 items-center min-[993px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal>
            <span className="bg-accent text-white py-1 px-2.5 text-[11px] font-black uppercase rounded tracking-[1px]">B2B & FARMER SUPPLIER</span>
            <h2 className="text-[28px] min-[640px]:text-[40px] min-[1600px]:text-[50px] min-[2400px]:text-[62px] font-black my-3.5 uppercase leading-[1.15]">Bulk equipment orders and dealer networks</h2>
            <p className="text-primary text-[15px] leading-[1.6] mb-6 max-w-[520px]">
              Equipping large scale agricultural enterprises and commercial contractors across North America. Get volume discount quotes directly from our sales team.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <span className="flex items-center gap-2.5 text-sm text-primary font-extrabold">
                <CheckCircle size={18} className="text-accent shrink-0" /> Freight quoted before you pay
              </span>
              <span className="flex items-center gap-2.5 text-sm text-primary font-extrabold">
                <CheckCircle size={18} className="text-accent shrink-0" /> Same toll-free desk for buyers and dealers
              </span>
            </div>
            <h3 className="text-[22px] font-black m-0 mb-2 uppercase">Become a dealer</h3>
            <p className="text-[15px] text-primary/75 m-0 max-w-[480px] leading-[1.6]">
              Apply through the dealers page. Volume pricing and yard access are set with the desk — call 1-800-224-8005.
            </p>
          </Reveal>

          <Reveal delay={140} className="grid h-[220px] grid-cols-2 grid-rows-2 gap-2 min-[640px]:h-[380px] min-[640px]:grid-cols-5 min-[1200px]:h-[460px] min-[1600px]:h-[520px] min-[2200px]:h-[640px]">
            {dealerSlides.map((slide, index) => (
              <figure
                key={slide.alt}
                className={`group relative m-0 overflow-hidden rounded-xl ${
                  index === 0 ? 'col-span-2 row-span-1 min-[640px]:col-span-3 min-[640px]:row-span-2' : 'col-span-1 min-[640px]:col-span-2'
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <ImageHoverCaption
                  kicker={slide.kicker}
                  title={slide.title}
                  body={slide.body}
                  compact={index !== 0}
                />
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      <SectionRule />
      <Portals />
      <SectionRule />
      <FarmTours />
      <SectionRule />
      <UploadAssetLive />
      <SectionRule />
      <YardFilm />
      <SectionRule />
      <AboutUs />
      <SectionRule />
      <HistoryEvolution />
      <SectionRule />
      <IrrigationHelp />
      <SectionRule />
      <ServicesDesk />
      <SectionRule />
      <HomeReading />
      <SectionRule />
      <DealPaths />
      <SectionRule />

      <section id="how-it-works" className="bg-white py-[70px] min-[1800px]:py-[100px]">
        <div className="content-wrap">
          <Reveal className="mb-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="section-kicker text-xs font-extrabold uppercase tracking-[1px]">HOW IT WORKS</span>
                <h2 className="section-title m-0 mt-1 text-[22px] font-black uppercase leading-tight min-[640px]:text-[30px] min-[1600px]:text-[36px]">From the lot to first hour in the field</h2>
              </div>
              <p className="m-0 max-w-[480px] min-[1600px]:max-w-[560px] text-sm text-primary/70 leading-[1.6]">
                Four steps. No dealer runaround. Pick a stage to see what happens on your farm.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 items-stretch min-[993px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="flex flex-col gap-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const active = index === activeStep;
                return (
                  <button
                    key={step.n}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => {
                      if (window.matchMedia('(hover: hover)').matches) setActiveStep(index);
                    }}
                    aria-pressed={active}
                    className={`group text-left w-full rounded-xl border cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      active
                        ? 'bg-primary text-white border-primary shadow-[0_18px_40px_rgb(2_70_46/0.18)] -translate-y-0.5'
                        : 'bg-white text-primary border-primary/10 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_28px_rgb(2_70_46/0.08)]'
                    }`}
                  >
                    <span className="flex items-center gap-4 px-4 py-4">
                      <span className={`grid place-items-center w-12 h-12 rounded-lg shrink-0 font-black text-sm tracking-[1px] transition-colors duration-300 ${
                        active ? 'bg-accent text-white' : 'bg-mint text-primary'
                      }`}>
                        {step.n}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[11px] font-extrabold uppercase tracking-[1px] ${active ? 'text-white/80' : 'section-kicker'}`}>
                          {step.time}
                        </span>
                        <span className={`mt-0.5 block text-base font-black uppercase ${active ? 'text-white' : 'text-accent'}`}>
                          {step.title}
                        </span>
                        <span className={`block text-[13px] font-semibold mt-1 leading-[1.45] ${active ? 'text-white/80' : 'hidden'}`}>
                          {step.summary}
                        </span>
                      </span>
                      <Icon size={22} className={`shrink-0 transition-transform duration-300 ${active ? 'text-white scale-110' : 'text-primary group-hover:translate-x-0.5'}`} />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-white text-primary p-8 min-[993px]:p-10 shadow-[0_24px_50px_rgb(2_70_46/0.08)] flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-[1.2px] text-primary/55">
                    Step {steps[activeStep].n} of 04
                  </span>
                  <span className="text-[11px] font-extrabold uppercase tracking-[1px] bg-accent text-white px-2.5 py-1 rounded">
                    {steps[activeStep].time}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-primary/10 overflow-hidden mb-7">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <div key={steps[activeStep].n} className="flex items-start justify-between gap-4 min-[768px]:items-center min-[768px]:gap-6 animate-[step-in_0.4s_ease]">
                  <div className="min-w-0">
                    <h3 className="text-[22px] min-[640px]:text-[28px] font-black uppercase m-0 mb-4 leading-[1.15]">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-[15px] text-primary/80 leading-[1.65] m-0">
                      {steps[activeStep].body}
                    </p>
                  </div>
                  <span className="pointer-events-none hidden min-[768px]:block shrink-0 self-center pr-1 text-[72px] min-[993px]:text-[96px] font-black leading-none text-primary/10 select-none">
                    {steps[activeStep].n}
                  </span>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <ul className="list-none m-0 p-0 flex flex-col gap-2">
                  {steps[activeStep].points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-[13px] font-extrabold">
                      <CheckCircle size={16} className="text-accent shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setActiveStep((activeStep + 1) % steps.length)}
                  className="cta-box rounded-none py-3 px-6 text-xs"
                >
                  {activeStep === steps.length - 1 ? 'Start again' : 'Next step'}{' '}
                  <ArrowRight size={16} className="cta-box-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white pb-36 pt-16">
        <img
          src={faqCorn}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full select-none object-cover object-bottom opacity-40 [mask-image:linear-gradient(to_top,#000_78%,transparent)] min-[768px]:h-72"
        />
        <Reveal className="content-wrap relative z-10 mb-9 text-center">
          <div className="mx-auto max-w-[860px] min-[1800px]:max-w-[1100px]">
          <span className="section-kicker text-xs font-extrabold uppercase tracking-[1px]">Help Center</span>
          <h2 className="m-0 mt-2 text-[28px] min-[640px]:text-[38px] min-[1600px]:text-[48px] min-[2400px]:text-[60px] font-black uppercase">FAQs</h2>
          <p className="m-0 mt-3 text-sm leading-relaxed text-primary/70">
            Frequently asked questions about delivery, assembly, warranty, and bulk freight.
          </p>
        </div>
        </Reveal>
        <div className="content-wrap relative z-10">
        <div className="mx-auto flex max-w-[860px] min-[1800px]:max-w-[1100px] flex-col gap-3">
          {faqs.map((faq, idx) => {
            const open = openFaq === idx;
            return (
              <button 
                key={faq.question}
                type="button"
                onClick={() => setOpenFaq(idx)}
                className={`card-lift w-full cursor-pointer rounded-[18px] border border-primary/10 bg-white px-5 text-left text-primary shadow-[0_10px_24px_rgb(2_70_46/0.05)] ${
                  open ? 'py-6 border-accent/30' : 'py-5 hover:border-primary/25'
                }`}
              >
                <span className="flex items-center gap-4">
                  <span className="w-10 shrink-0 text-[15px] font-bold text-yellow">{String(idx + 1).padStart(3, '0')}</span>
                  <span className="flex-1 text-center text-[18px] font-medium leading-snug min-[768px]:text-[22px]">{faq.question}</span>
                  <span className="w-8 shrink-0 text-right text-[22px] font-medium leading-none">+</span>
                </span>
                <span className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.34,1.2,0.64,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <span className="overflow-hidden">
                    <span className="block px-2 pt-4 text-center text-[16px] font-light leading-relaxed min-[768px]:text-[18px]">
                      {faq.answer}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
            </div>
        </div>
      </section>

      <SectionRule />
      <GlobalPresence />
      <SectionRule />
      <DeviceMockups />
      <SectionRule />
      <ContactForm />
      <SectionRule />
    </div>
  );
}
