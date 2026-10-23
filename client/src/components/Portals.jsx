import { Link } from 'react-router-dom';
import { ArrowRight, Handshake, Store, Tractor, Wrench } from 'lucide-react';
import Reveal from './Reveal';

const portals = [
  {
    icon: Tractor,
    title: 'Buyer portal',
    body: 'Browse tagged iron, save lots, and open a freight window without calling three desks.',
    to: '/equipment',
    cta: 'Open the lot',
  },
  {
    icon: Store,
    title: 'Seller portal',
    body: 'List a unit with hours, hitch, and a yard photo. Get a written price path the same day.',
    to: '/upload-ad',
    cta: 'List or advertise',
  },
  {
    icon: Handshake,
    title: 'Dealer portal',
    body: 'Volume quotes and dealer pricing through the same toll-free desk that tags the yard stock.',
    to: '/dealers',
    cta: 'Become a dealer',
  },
  {
    icon: Wrench,
    title: 'Service portal',
    body: 'Repair, parts, and lease paths tied to the same tagged inventory on the Farm Exchange desk.',
    to: '/contact',
    cta: 'Talk to the desk',
  },
];

export default function Portals() {
  return (
    <section id="portals" className="bg-primary text-white py-14 min-[993px]:py-[88px]">
      <div className="content-wrap">
        <Reveal className="mb-8 max-w-[640px]">
          <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/60">Desk portals</p>
          <h2 className="m-0 mt-2 text-[24px] font-black uppercase leading-tight text-white min-[640px]:text-[34px] min-[1600px]:text-[42px]">
            Four doors into Farm Exchange
          </h2>
          <p className="m-0 mt-3 text-[15px] leading-[1.65] text-white/75">
            Buy, sell, deal, or service — each portal points at the same tagged lot, not a brochure warehouse.
          </p>
        </Reveal>

        <div className="grid gap-4 min-[768px]:grid-cols-2 min-[1280px]:grid-cols-4">
          {portals.map((portal, index) => {
            const Icon = portal.icon;
            return (
              <Reveal key={portal.title} delay={index * 70}>
                <Link
                  to={portal.to}
                  className="group flex h-full flex-col border border-white/15 bg-white/[0.04] p-5 no-underline transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-yellow/50 hover:bg-white/[0.09] hover:shadow-[0_14px_28px_rgba(0,0,0,0.28)]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center bg-accent text-white transition-transform duration-300 ease-out group-hover:scale-105">
                    <Icon size={18} />
                  </span>
                  <h3 className="m-0 mt-4 text-[15px] font-black uppercase text-white transition-colors duration-300 group-hover:text-yellow">
                    {portal.title}
                  </h3>
                  <p className="m-0 mt-2 flex-1 text-[13px] leading-[1.55] text-white/70 transition-colors duration-300 group-hover:text-white/85">
                    {portal.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white transition-colors duration-300 group-hover:text-yellow">
                    {portal.cta}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
