import { useEffect, useState } from 'react';
import harvestField from '../public/Hero images/corn-field6.webp';
import yellowField from '../public/Hero images/corn-field4.jpg';
import cornRows from '../public/Hero images/corn-field1.webp';
import Reveal from './Reveal';
import ImageHoverCaption from './ImageHoverCaption';

const stills = [
  {
    src: harvestField,
    alt: 'A field half harvested, with trucks and a wagon sitting on the cut ground',
    kicker: 'The cut',
    title: 'Trucks on the cut',
    caption: 'Rows still standing beside the harvest',
  },
  {
    src: yellowField,
    alt: 'A yellow crop field running to a fence, with mountains under a cloudy sky',
    kicker: 'The range',
    title: 'Acre to the fence',
    caption: 'Open ground the shelters are sized for',
  },
  {
    src: cornRows,
    alt: 'Straight rows of corn filling a field under a blue sky',
    kicker: 'The row',
    title: 'Rows that hold a line',
    caption: 'The crop the hitch tools are listed for',
  },
];

const notes = [
  {
    n: '01',
    title: 'The cut',
    body: 'Half the field is taken, and the trucks are already on it. Implements are listed for ground a crew can finish in a day.',
  },
  {
    n: '02',
    title: 'The range',
    body: 'Open acre under a long sky. Shelters and pumps are sized for a field that runs to the fence, with the freight lane on the same sheet.',
  },
  {
    n: '03',
    title: 'The row',
    body: 'Corn standing in a straight line. Hitch class and span are written for rows that hold like this after the truck has turned in.',
  },
];

export default function YardFilm() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % stills.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const still = stills[index];

  return (
    <section id="yard-film" className="relative overflow-hidden bg-white text-primary py-[80px] min-[1800px]:py-[110px]">
      <div className="pointer-events-none absolute -left-6 top-8 select-none text-[120px] font-black uppercase leading-none tracking-[-4px] text-primary/[0.05] min-[993px]:text-[180px]">
        Yard
      </div>

      <div className="relative content-wrap">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-kicker text-xs font-extrabold uppercase tracking-[1.4px]">Field stills</span>
            <h2 className="m-0 mt-2 text-[24px] min-[640px]:text-[32px] min-[993px]:text-[44px] min-[1920px]:text-[56px] min-[2400px]:text-[68px] font-black uppercase leading-[0.95] tracking-[-0.6px]">
              The lot, <span className="text-accent">on the acre</span>
            </h2>
          </div>
          <p className="m-0 max-w-[280px] min-[640px]:max-w-[320px] min-[1600px]:max-w-[480px] min-[2400px]:max-w-[620px] text-[13px] leading-[1.6] text-primary/70 min-[1920px]:text-[16px] min-[2400px]:text-[18px]">
            Three photographs of the ground this lot is written for. The stills change on their own.
          </p>
        </Reveal>

        <div className="grid items-center gap-8 min-[993px]:grid-cols-[minmax(0,0.78fr)_minmax(0,1.35fr)_minmax(0,0.78fr)] min-[993px]:gap-7">
          <Reveal className="min-[993px]:text-right">
            <p className="m-0 section-kicker text-[11px] font-extrabold uppercase tracking-[1.6px]">Before the quote</p>
            <h3 className="m-0 mt-3 text-[20px] min-[993px]:text-[34px] min-[1920px]:text-[42px] min-[2400px]:text-[50px] font-black uppercase leading-[0.95] tracking-[-0.4px]">
              See the acre this iron is built for
            </h3>
            <p className="m-0 mt-4 text-[15px] leading-[1.7] text-primary/75">
              A field half taken, open acre to the fence, corn standing in a straight line. Farm Exchange stocks the shelters, hitch tools, and pumps that sit beside ground like this.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 border border-primary/15 px-4 py-3 min-[993px]:ml-auto">
              <span className="text-[22px] font-black text-accent leading-none">03</span>
              <span className="text-left text-[11px] font-bold uppercase tracking-[1px] text-primary/70 leading-[1.3]">
                  Fields beside
                  <br />
                  the lot
              </span>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <span className="pointer-events-none absolute -left-3 -top-3 h-8 w-8 border-l-2 border-t-2 border-primary" />
            <span className="pointer-events-none absolute -right-3 -top-3 h-8 w-8 border-r-2 border-t-2 border-primary" />
            <span className="pointer-events-none absolute -bottom-3 -left-3 h-8 w-8 border-b-2 border-l-2 border-primary" />
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-primary" />

            <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-primary shadow-[0_30px_60px_rgb(0_0_0/0.35)]">
              <div className="relative aspect-video w-full">
                {stills.map((item, itemIndex) => (
                  <img
                    key={item.title}
                    src={item.src}
                    alt={item.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-in-out ${
                      itemIndex === index ? 'opacity-100 group-hover:scale-[1.04]' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/80 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 px-4 py-3 transition-opacity duration-300 group-hover:opacity-0">
                <div>
                  <p className="m-0 text-[10px] font-extrabold uppercase tracking-[1.4px] text-yellow min-[1920px]:text-[13px]">{still.kicker}</p>
                  <p className="m-0 text-[12px] text-white/80 min-[1920px]:text-[16px] min-[2400px]:text-[18px]">{still.caption}</p>
                </div>
                <p className="m-0 text-[11px] font-extrabold uppercase tracking-[1px] text-white">
                  0{index + 1} / 0{stills.length}
                </p>
              </div>
              <ImageHoverCaption
                kicker={`0${index + 1}`}
                title={still.title}
                body={still.caption}
              />
            </div>
          </Reveal>

          <Reveal delay={220} className="flex flex-col gap-5">
            <p className="m-0 section-kicker text-[11px] font-extrabold uppercase tracking-[1.6px]">Beside the still</p>
            {notes.map((note, noteIndex) => (
              <div
                key={note.n}
                className={`border-l-2 pl-4 transition-colors duration-300 ${
                  noteIndex === index ? 'border-primary' : 'border-primary/15'
                }`}
              >
                <p className="m-0 text-[11px] font-black tracking-[1px] text-accent">{note.n}</p>
                <h4 className="m-0 mt-1 text-[15px] font-black uppercase leading-tight min-[1920px]:text-[20px] min-[2400px]:text-[24px]">{note.title}</h4>
                <p className="m-0 mt-1.5 text-[13px] leading-[1.65] text-primary/70 min-[1920px]:text-[16px] min-[2400px]:text-[18px]">{note.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
