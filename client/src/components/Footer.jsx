import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Mail, MapPin } from 'lucide-react';
import logo from '../public/logo-img.png';

const trustStats = [
  { display: '1999', label: 'On the lot since', caption: 'Sheridan desk · Farm Exchange' },
  { to: 3, label: 'Published phone lines', caption: 'Toll free · Long Island · Sheridan' },
  { to: 7, label: 'USA yard cities', caption: 'Sheridan, LI, TX, IA, CA lots' },
  { display: '800', label: 'Toll-free desk', caption: '1-800-224-8005 · 855-686-FARM' },
];

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null);
  const started = useRef(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const duration = 1400;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - progress) ** 3;
          setValue(Math.round(eased * to));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-white font-sans">
      <div className="border-b border-white/15 py-3.5 min-[993px]:py-4">
        <div className="site-wrap grid gap-3 text-center [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]">
          {trustStats.map((stat) => (
            <div key={stat.label}>
              <div className="text-[18px] font-black leading-none tracking-[-0.4px] text-yellow min-[640px]:text-[20px] min-[993px]:text-[22px] min-[1920px]:text-[28px] min-[2400px]:text-[34px]">
                {stat.display != null ? stat.display : <CountUp to={stat.to} suffix={stat.suffix} />}
              </div>
              <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.4px]">{stat.label}</div>
              <div className="mt-0.5 text-[10px] leading-tight text-white/75">{stat.caption}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="site-wrap flex flex-col gap-8 py-14 min-[993px]:flex-row min-[993px]:items-end min-[993px]:justify-between min-[993px]:py-16">
        <div className="max-w-[520px]">
          <h2 className="m-0 text-[24px] font-bold leading-tight text-white min-[640px]:text-[36px] min-[1920px]:text-[44px] min-[2400px]:text-[52px]">Lot updates by email</h2>
          <p className="m-0 mt-3 max-w-[440px] text-[15px] leading-[1.7] text-white/80">
            Leave an email if you want notice when tagged stock or freight windows change. No spam claims — just desk updates when we send them.
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex w-full flex-col gap-3 min-[640px]:w-auto min-[640px]:flex-row">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full rounded-full border border-white/25 bg-primary px-5 py-3.5 text-[14px] text-white outline-none placeholder:text-white/50 min-[640px]:w-[280px]"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full border-none bg-accent px-6 py-3.5 text-[13px] font-extrabold uppercase text-white transition-colors duration-200 hover:bg-accent-dark"
          >
            Get alerts
          </button>
        </form>
      </div>

      <div className="site-wrap grid gap-10 pb-16 min-[768px]:grid-cols-2 min-[1100px]:grid-cols-4 min-[1100px]:gap-8 min-[1100px]:pb-20 min-[1600px]:gap-12">
        <div className="min-w-0">
          <img
            src={logo}
            alt="Farm Exchange"
            className="h-[88px] w-auto max-w-full rounded-lg bg-white object-contain p-2.5 shadow-[0_8px_20px_rgb(0_0_0/0.2)] min-[640px]:h-[96px]"
          />
          <p className="m-0 mt-4 text-[22px] font-black tracking-[0.02em] text-white">Farm Exchange</p>
          <p className="m-0 mt-1 text-[13px] font-semibold leading-snug text-white/80">America's Farm Families</p>
          <p className="m-0 mt-4 max-w-[320px] text-[14px] leading-[1.7] text-white/80">
            Container shelters, metal sheds, tractors, skid attachments, greenhouses, irrigation, and parts tagged on USA yards.
          </p>
          <p className="m-0 mt-3 text-[12px] font-extrabold uppercase tracking-[0.1em] text-yellow">Since 1999</p>
        </div>

        <div className="min-w-0">
          <p className="m-0 mb-5 inline-block border-b-2 border-yellow pb-1 text-[13px] font-black uppercase tracking-[1px] text-yellow">
            The desk
          </p>
          <div className="flex flex-col gap-4 text-[13px] leading-[1.55] text-white">
            <span className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-yellow" />
              <span>
                30 N Gould Street
                <br />
                Sheridan, WY 82801
              </span>
            </span>
            <span className="flex items-start gap-2.5">
              <PhoneCall size={16} className="mt-0.5 shrink-0 text-yellow" />
              <span className="min-w-0">
                <a href="tel:18002248005" className="block font-semibold text-yellow no-underline hover:text-white">
                  1-800-224-8005
                </a>
                <span className="text-white/65">Toll free</span>
                <a href="tel:18556863276" className="mt-2 block font-semibold text-yellow no-underline hover:text-white">
                  855-686-FARM
                </a>
                <span className="text-white/65">Toll free</span>
                <a href="tel:15162528000" className="mt-2 block font-semibold text-yellow no-underline hover:text-white">
                  516-252-8000
                </a>
                <span className="text-white/65">Long Island</span>
                <a href="tel:13072071777" className="mt-2 block font-semibold text-yellow no-underline hover:text-white">
                  307-207-1777
                </a>
                <span className="text-white/65">Sheridan</span>
              </span>
            </span>
            <a href="mailto:welcome@farmexchange.com" className="flex items-center gap-2.5 text-white no-underline hover:text-yellow">
              <Mail size={16} className="shrink-0 text-yellow" />
              welcome@farmexchange.com
            </a>
          </div>
        </div>

        <div className="min-w-0">
          <p className="m-0 mb-5 inline-block border-b-2 border-yellow pb-1 text-[13px] font-black uppercase tracking-[1px] text-yellow">
            Top Categories
          </p>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {[
              ['Container Shelters', '/equipment?line=shelters'],
              ['Heavy Duty Metal Sheds', '/equipment?line=sheds'],
              ['Tractors & Mowers', '/equipment?line=tractors'],
              ['Skid Steer Attachments', '/equipment?line=skid'],
              ['Commercial Greenhouses', '/equipment?line=greenhouse'],
              ['Irrigation & Parts', '/equipment?line=parts'],
            ].map(([label, path]) => (
              <li key={label}>
                <Link to={path} className="text-[14px] text-white/90 no-underline transition-colors duration-200 hover:text-yellow">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <p className="m-0 mb-5 inline-block border-b-2 border-yellow pb-1 text-[13px] font-black uppercase tracking-[1px] text-yellow">
            Support & Dealers
          </p>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {[
              ['Become an Official Dealer', '/dealers'],
              ['Upload your ad', '/upload-ad'],
              ['Farm tours', '/#farm-tours'],
              ['Desk portals', '/#portals'],
              ['See all equipment', '/equipment'],
              ['Contact Customer Support', '/contact'],
            ].map(([label, path]) => (
              <li key={label}>
                <Link to={path} className="text-[14px] text-white/90 no-underline transition-colors duration-200 hover:text-yellow">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 py-8">
        <div className="site-wrap flex flex-wrap items-center justify-between gap-4 text-[13px] text-white">
          <div>© 2026 Farm Exchange. Since 1999. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            <Link to="/" className="text-white no-underline hover:text-white">Privacy Policy</Link>
            <Link to="/" className="text-white no-underline hover:text-white">Terms of Service</Link>
            <Link to="/" className="text-white no-underline hover:text-white">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
