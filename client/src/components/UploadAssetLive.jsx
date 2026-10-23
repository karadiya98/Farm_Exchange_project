import { Link } from 'react-router-dom';
import { ArrowRight, Radio, UploadCloud } from 'lucide-react';
import Reveal from './Reveal';
import ImageHoverCaption from './ImageHoverCaption';
import heroTractor from '../public/Hero images/hero-tractor.jpg';

const beats = [
  'Snap the unit from the front, the hitch, and the hour meter.',
  'Add year, hours, drive, and the town where it sits today.',
  'Go live on the lot while the desk reviews the card.',
];

export default function UploadAssetLive() {
  return (
    <section id="upload-asset" className="bg-primary text-white py-14 min-[993px]:py-[88px]">
      <div className="content-wrap grid items-center gap-8 min-[993px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[993px]:gap-12">
        <Reveal>
          <p className="m-0 inline-flex items-center gap-2 section-kicker text-[11px] font-extrabold uppercase tracking-[0.12em]">
            <Radio size={14} className="animate-pulse" />
            Upload live
          </p>
          <h2 className="m-0 mt-2 text-[24px] font-black uppercase leading-tight min-[640px]:text-[34px] min-[1600px]:text-[42px]">
            Put your asset on the lot now
          </h2>
          <p className="m-0 mt-3 max-w-[520px] text-[15px] leading-[1.65] text-white/75">
            Sellers can stage a live listing draft from the field. Photos and specs land on a card the desk can publish once the yard number is tied on.
          </p>
          <ul className="m-0 mt-5 list-none space-y-3 p-0">
            {beats.map((beat, index) => (
              <li key={beat} className="flex gap-3 text-[14px] font-semibold text-white/90">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-white text-[12px] font-black text-primary">
                  {index + 1}
                </span>
                <span className="pt-1">{beat}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="cta-box px-4 py-2.5 text-[12px]"
            >
              <UploadCloud size={15} />
              Start a live upload
            </Link>
            <Link
              to="/upload-ad"
              className="inline-flex items-center gap-2 border border-white/40 bg-white/10 px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white no-underline transition-all duration-300 ease-out hover:-translate-y-1 hover:border-yellow hover:bg-yellow hover:text-primary"
            >
              Advertise on the rails <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="group relative overflow-hidden border border-white/15">
            <img
              src={heroTractor}
              alt="Tractor ready to list on Farm Exchange"
              className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] min-[640px]:h-[320px] min-[1600px]:h-[380px]"
            />
            <ImageHoverCaption
              kicker="Live"
              title="Photos in · waiting on desk tag"
              body="Stage the draft from the field. The desk publishes once the yard number is tied on."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
