import { useState } from 'react';
import Reveal from './Reveal';
import ImageHoverCaption from './ImageHoverCaption';
import harvestFields from '../public/Hero images/Golden-Hour Harvest Across the Fields.png';
import cornRows from '../public/Hero images/corn-field8.jpg';
import sunsetField from '../public/Hero images/corn-field9.jpg';
import standingCorn from '../public/Hero images/corn-field10.webp';

const chapters = [
  {
    n: '01',
    title: 'A depot, not a brochure mill',
    image: cornRows,
    alt: 'Two stands of corn side by side, one tighter and one more open, seen from above',
    body: 'Farm Exchange keeps container shelters, skid steer attachments, and irrigation pumps on a USA lot. A farmer is not waiting on a factory slot. The unit already has a yard number, a wind rating, and a hitch class written on the tag before anyone books a truck. Sheridan is the desk. The acre is the address we ship to.',
  },
  {
    n: '02',
    title: 'Written for the acre',
    image: sunsetField,
    alt: 'A green field at sunset with a single tree and long shadows',
    body: 'Every listing says what is actually in stock, the span, and the hydraulic flow. A grower in California and a ranch in Montana read the same sheet, then get a freight plan that names the lane a truck can reach. We do not dress a brochure up as a specification. If a bay will not take the wind number on the drawing, it does not leave the jig.',
  },
  {
    n: '03',
    title: 'One desk for the exchange',
    image: standingCorn,
    alt: 'Standing corn rows running toward a tree line',
    body: 'The toll-free line covers hitch class, liftgate delivery, and a bulk price in the same call — for dealers and growers alike. Written quote, freight window, and yard number stay on one sheet. Buy, lease, barter, repair, and parts all use that sheet. The work does not end when the truck pulls off the farm lane.',
  },
];

export default function AboutUs() {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];

  return (
    <section id="about" className="section-y overflow-hidden bg-white text-primary">
      <div className="content-wrap">
        <div>
          <Reveal>
            <span className="section-kicker text-xs font-extrabold uppercase tracking-[1.4px]">About us</span>
            <h2 className="heading-fit m-0 mt-3 text-[clamp(1.35rem,3.8vw,4rem)] font-black uppercase tracking-[-0.5px] min-[1280px]:whitespace-nowrap">
              The lot behind the listing
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="m-0 mt-4 max-w-[560px] text-[15px] leading-[1.7] min-[640px]:mt-5 min-[640px]:text-[16px]">
              Farm Exchange is a depot and an exchange for heavy farm equipment. Tagged iron leaves the yard, freight is named to your gate, and the same desk stays on the sheet for parts, repair, lease, and barter after the crate lands.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid items-start gap-6 min-[768px]:mt-10 min-[993px]:mt-12 min-[993px]:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] min-[993px]:gap-10">
          <Reveal className="min-[993px]:sticky min-[993px]:top-36">
            <div className="relative p-2 min-[640px]:p-3">
              <span className="pointer-events-none absolute inset-0 rounded-[16px] border border-primary/15 min-[640px]:rounded-[22px]" />
              <span className="pointer-events-none absolute inset-[5px] rounded-[12px] border border-[#02462E]/25 min-[640px]:inset-[7px] min-[640px]:rounded-[16px]" />
              <div className="group relative h-[200px] overflow-hidden rounded-xl min-[480px]:h-[240px] min-[993px]:h-[min(52vh,460px)] min-[1600px]:h-[540px] min-[2200px]:h-[680px]">
                {chapters.map((item, index) => (
                  <img
                    key={item.n}
                    src={item.image}
                    alt={item.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-in-out ${
                      index === active ? 'opacity-100 scale-100 group-hover:scale-[1.04]' : 'opacity-0'
                    }`}
                  />
                ))}
                <span className="absolute left-4 bottom-4 z-20 bg-primary text-white text-[11px] font-extrabold uppercase tracking-[1px] px-3 py-1.5 rounded transition-opacity duration-300 group-hover:opacity-0">
                  {chapter.n} / 03
                </span>
                <ImageHoverCaption
                  kicker={chapter.n}
                  title={chapter.title}
                  body={chapter.body}
                />
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col">
            {chapters.map((item, index) => {
              const on = index === active;
              return (
                <button
                  key={item.n}
                  type="button"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => {
                    if (window.matchMedia('(hover: hover)').matches) setActive(index);
                  }}
                  className={`text-left bg-transparent border-0 border-t border-primary/15 cursor-pointer py-7 px-0 transition-colors duration-300 ${
                    on ? 'text-primary' : 'text-primary/55'
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className={`text-[12px] font-black tracking-[1px] ${on ? 'text-accent' : 'text-accent/70'}`}>{item.n}</span>
                    <span className="text-[22px] font-black uppercase leading-[1.05] text-accent min-[993px]:text-[32px] min-[1920px]:text-[40px] min-[2400px]:text-[48px]">
                      {item.title}
                    </span>
                  </span>
                  <span
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block pt-4 max-w-[560px] text-[15px] leading-[1.75] text-primary/75">
                        {item.body}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
            <div className="border-t border-[#02462E]/15" />
          </div>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[28px] min-h-[340px]">
          <img
            src={harvestFields}
            alt="Tractor working a cornfield at golden hour, with grain bins beyond the rows"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#013522]/82 via-[#02462E]/55 to-[#02462E]/30" />
          <div className="relative flex min-h-[280px] min-[993px]:min-h-[340px] min-[1800px]:min-h-[460px] min-[2400px]:min-h-[560px] flex-col justify-end p-6 min-[993px]:p-14 max-w-[760px] min-[1600px]:max-w-[980px] min-[2400px]:max-w-[1200px]">
            <span className="text-xs font-extrabold uppercase tracking-[1.4px] text-yellow">The promise</span>
            <p className="m-0 mt-3 text-[26px] min-[993px]:text-[48px] min-[2400px]:text-[60px] font-black uppercase leading-[0.98] text-white">
              We sell what we can stand next to.
            </p>
            <p className="m-0 mt-4 max-w-[520px] text-[15px] leading-[1.7] text-white/80">
              A shelter, a cutter, or a pump leaves with a yard number already on it. The truck goes to the gate you name, and the same desk still answers when the season is underway.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
