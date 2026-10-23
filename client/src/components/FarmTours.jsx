import { Link } from 'react-router-dom';
import { ArrowRight, MapPinned, MonitorPlay } from 'lucide-react';
import Reveal from './Reveal';
import ImageHoverCaption from './ImageHoverCaption';
import yardWorkshop from '../public/about-extra/yard-workshop.jpg';
import leaseField from '../public/deal-paths/lease-field.jpg';

const tours = [
  {
    kind: 'Virtual',
    icon: MonitorPlay,
    title: 'Walk the lot on a live call',
    body: 'A desk hand walks the camera past tagged units — hitch class, hours, and the bay number on the card. Book a 20-minute walkthrough from home.',
    image: yardWorkshop,
    hoverKicker: '01',
    hoverTitle: 'Live lot walkthrough',
    hoverBody: 'Camera on tagged units — hitch, hours, and bay number in one call.',
    points: ['Live video from the yard', 'Ask for serial and remotes on camera', 'Same-day follow-up in writing'],
    cta: 'Request a virtual tour',
  },
  {
    kind: 'In person',
    icon: MapPinned,
    title: 'Stand next to the machine',
    body: 'Come to the highway lot. Climb the step, check the tires, and read the tag yourself before a truck is booked.',
    image: leaseField,
    hoverKicker: '02',
    hoverTitle: 'Yard visit',
    hoverBody: 'Stand on the step, read the tag, leave with a written freight window.',
    points: ['Open yard hours by appointment', 'Bring your hitch or flow notes', 'Leave with a written freight window'],
    cta: 'Book a yard visit',
  },
];

export default function FarmTours() {
  return (
    <section id="farm-tours" className="bg-white text-primary py-14 min-[993px]:py-[88px]">
      <div className="content-wrap">
        <Reveal className="mb-8 max-w-[620px]">
          <p className="m-0 section-kicker text-[11px] font-extrabold uppercase tracking-[0.12em]">Farm tours</p>
          <h2 className="m-0 mt-2 text-[24px] font-black uppercase leading-tight min-[640px]:text-[34px] min-[1600px]:text-[42px]">
            See the iron before you buy
          </h2>
          <p className="m-0 mt-3 text-[15px] leading-[1.65] text-primary/70">
            Virtual or in person — both tours use the same tagged inventory. No brochure machine that still has to be found.
          </p>
        </Reveal>

        <div className="grid gap-5 min-[993px]:grid-cols-2">
          {tours.map((tour, index) => {
            const Icon = tour.icon;
            return (
              <Reveal key={tour.kind} delay={index * 90}>
                <article className="card-lift group relative overflow-hidden border border-primary/15 bg-white hover:border-primary/30">
                  <div className="relative h-[200px] overflow-hidden min-[640px]:h-[240px] min-[1600px]:h-[280px]">
                    <img
                      src={tour.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 bg-primary px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white">
                      <Icon size={13} />
                      {tour.kind}
                    </span>
                    <ImageHoverCaption
                      kicker={tour.hoverKicker}
                      title={tour.hoverTitle}
                      body={tour.hoverBody}
                    />
                  </div>
                  <div className="p-5 min-[1600px]:p-6">
                    <h3 className="m-0 text-[18px] font-black uppercase min-[1600px]:text-[20px]">{tour.title}</h3>
                    <p className="m-0 mt-2 text-[14px] leading-[1.6] text-primary/70">{tour.body}</p>
                    <ul className="m-0 mt-4 list-none space-y-2 p-0">
                      {tour.points.map((point) => (
                        <li key={point} className="flex gap-2 text-[13px] font-semibold text-primary/85">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="cta-box mt-5 px-3.5 py-2.5 text-[12px]"
                    >
                      {tour.cta} <ArrowRight size={14} className="cta-box-arrow" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
