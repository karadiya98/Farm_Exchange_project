import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductBrowser from '../components/ProductBrowser';
import Reveal from '../components/Reveal';
import ImageHoverCaption from '../components/ImageHoverCaption';
import { products } from '../data/catalog';
import shelterSpan from '../public/machinery/span.jpg';
import dieselPump from '../public/machinery/pump.jpg';
import brushCutter from '../public/machinery/brush.jpg';
import yardTractor from '../public/yard.jpg';
import fieldSprayer from '../public/dealers/sprayer.jpg';

const specials = products.filter((product) => product.special);

const whySpecials = [
  {
    n: '01',
    kicker: 'The price',
    title: 'A clear mark-down on the card',
    body: 'A special is a unit that already sits on a USA yard and has a lower price written on the tag. You are not waiting for a phone-only deal. The number you see is the number the desk will quote. Freight is still named separately, to the lane, the same way as a regular listing.',
  },
  {
    n: '02',
    kicker: 'The facts',
    title: 'The same yard facts stay on the sheet',
    body: 'Wind rating, hitch class, hours, span, and gallons do not disappear because the price moved. The special only changes what you pay. If a loader is missing, the card still says so. If a cover is rolled and banded, that is still written. You can trust the tag the same way you trust a full-price unit.',
  },
  {
    n: '03',
    kicker: 'The week',
    title: 'Good for a buyer who needs iron this week',
    body: 'Specials move faster because the price is already cut. Call 1-800-224-8005 if the truck window matters. A person can say whether the unit is still free, what day it can leave, and whether liftgate or flatbed fits your gate. Add to cart and pay now work the same as on the main equipment list.',
  },
];

const specialLines = [
  {
    name: 'Shelter and shed specials',
    image: shelterSpan,
    alt: 'A long span shelter frame on the lot',
    paragraphs: [
      'A marked-down shelter is still a tagged span. The wind number and the cover status stay on the card. These units often sit because a buyer needed a different length, or a dealer ordered a bay and then changed the plan. The iron is real. The price is lower.',
      'Read the span first. A 20ft bay is a different job from a 40ft bay. If the lane will not take a long truck, say so before you pay. The desk will name the freight window the same day.',
    ],
  },
  {
    name: 'Pump and irrigation specials',
    image: dieselPump,
    alt: 'A diesel pump ready for a layflat line',
    paragraphs: [
      'Irrigation specials are pumps and sets that need to move. Horsepower, hours, and gallons per minute are still on the tag. A lower price does not change how much water the machine can move. Match the pump to the span or the short run you have in mind.',
      'Ask whether the hose and the filter travel with the unit. Some specials are the pump alone. Some include a layflat set. The card says which. Call if you need both on the same truck.',
    ],
  },
  {
    name: 'Skid tools and cutter specials',
    image: brushCutter,
    alt: 'A brush cutter attachment marked for sale',
    paragraphs: [
      'Brush cutters, forks, and other skid tools go on special when a yard is clearing a plate size or a flow rating. Width and oil flow stay written. Confirm your skid can run that tool before you book the truck.',
      'Hoses and couplers are listed if they are in the crate. If they are not, the card says so. A special blade set or a spare part may sit next to the tool. Ask the desk to read both tags in one call.',
    ],
  },
  {
    name: 'Tractor and mower specials',
    image: yardTractor,
    alt: 'A utility tractor on the yard',
    paragraphs: [
      'A tractor special is often a unit with more hours, or a model a dealer needed to turn. Hitch, drive, and whether a loader is included are still on the sheet. Walk the hours against the price. The desk can read the serial back to you.',
      'Mower specials follow the same rule. Blade condition and PTO speed are named. Match the deck to the tractor horsepower you already own, or ask us to point at a tractor special that fits the same week.',
    ],
  },
];

export default function Specials() {
  const [line, setLine] = useState('all');

  return (
    <>
      <section className="bg-white pb-16 pt-8 text-primary">
        <div className="content-wrap content-wrap-lot">
          <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Clearance</p>
          <h1 className="m-0 mt-2 text-[26px] font-black uppercase leading-tight min-[480px]:text-[30px] min-[640px]:text-[40px] min-[1920px]:text-[52px] min-[2400px]:text-[64px]">Specials</h1>
          <p className="m-0 mt-3 max-w-[640px] text-[15px] leading-[1.7] text-primary/75">
            Tagged-down machines and parts already on a USA lot. The price on the card is the special. Freight is still quoted to the lane, and the same add-to-cart and pay-now buttons apply.
          </p>
          <div className="mt-8 grid gap-4 border border-primary/15 bg-primary p-5 text-white min-[768px]:grid-cols-3">
            {[
              ['Written price', 'The special is the number on the card, not a phone-only deal.'],
              ['Same yard tag', 'Wind rating, hitch class, and hours stay on the listing.'],
              ['Desk is open', 'Call 1-800-224-8005 if the truck window matters this week.'],
            ].map(([title, body]) => (
              <div key={title}>
                <p className="m-0 text-[13px] font-black uppercase text-yellow min-[1920px]:text-[16px] min-[2400px]:text-[18px]">{title}</p>
                <p className="m-0 mt-1.5 text-[13px] leading-[1.6] text-white/75 min-[1920px]:text-[15px] min-[2400px]:text-[17px]">{body}</p>
              </div>
            ))}
          </div>
          <ProductBrowser products={specials} line={line} onLine={setLine} />
        </div>
      </section>

      <section className="section-y border-t border-primary/10 bg-primary text-white">
        <div className="content-wrap">
          <Reveal>
            <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">How specials work</p>
            <h2 className="section-title m-0 mt-3 text-[26px] font-black leading-[1.15] min-[640px]:text-[34px] min-[1600px]:text-[40px]">
              A lower price. The same plain facts.
            </h2>
            <p className="m-0 mt-4 max-w-[640px] text-[16px] leading-[1.75] text-white/75">
              Three things stay true on every mark-down: the number is written, the tag facts stay, and the desk still books the truck the same way.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 min-[768px]:grid-cols-3 min-[768px]:gap-5">
            {whySpecials.map((item) => (
              <article
                key={item.title}
                className="group relative flex h-full flex-col overflow-hidden border border-yellow/25 bg-[#034a32] p-5 text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-yellow hover:bg-[#045c3e] hover:shadow-[0_16px_32px_rgba(0,0,0,0.28)] min-[1600px]:p-7"
              >
                <span className="absolute inset-y-0 left-0 w-[3px] bg-yellow transition-all duration-300 group-hover:w-1" />
                <div className="flex items-center justify-between gap-3 pl-1">
                  <p className="m-0 text-[12px] font-black tracking-[0.08em] text-yellow">{item.n}</p>
                  <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/50">{item.kicker}</p>
                </div>
                <h3 className="m-0 mt-3 pl-1 text-[18px] font-black leading-tight text-white transition-colors duration-300 group-hover:text-yellow min-[1600px]:text-[20px]">
                  {item.title}
                </h3>
                <p className="m-0 mt-3 flex-1 pl-1 text-[15px] leading-[1.75] text-white/85 transition-colors duration-300 group-hover:text-white">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-white text-primary">
        <div className="content-wrap">
          <Reveal>
            <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">What goes on special</p>
            <h2 className="section-title m-0 mt-3 text-[26px] font-black leading-[1.15] min-[640px]:text-[34px] min-[1600px]:text-[40px]">
              The kinds of iron you will see marked down
            </h2>
          </Reveal>
          <p className="prose-rail prose-rail-wide m-0 mt-5 text-[17px] leading-[1.8] text-primary/85">
            Specials come from every line on the lot. Shelters, pumps, skid tools, and tractors all show up when a yard needs to turn a unit. Below is a plain guide to what those mark-downs usually mean, with a photo of the kind of iron that often sits here.
          </p>

          <div className="mt-12 flex flex-col gap-14 min-[993px]:gap-20">
            {specialLines.map((item, index) => {
              const imageFirst = index % 2 === 0;
              return (
                <article key={item.name} className="grid items-center gap-8 min-[993px]:grid-cols-2 min-[993px]:gap-12">
                  <Reveal className={imageFirst ? '' : 'min-[993px]:order-2'}>
                    <div className="group relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] min-[768px]:h-[340px] min-[1600px]:h-[420px]"
                      />
                      <ImageHoverCaption kicker="Special" title={item.name} body={item.paragraphs[0]} />
                    </div>
                  </Reveal>
                  <Reveal delay={80} className={imageFirst ? '' : 'min-[993px]:order-1'}>
                    <h3 className="m-0 text-[22px] font-black leading-tight min-[640px]:text-[28px]">{item.name}</h3>
                    <div className="prose-rail mt-4 text-[16px] leading-[1.8] text-primary/85">
                      {item.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 28)} className="m-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </Reveal>
                </article>
              );
            })}
          </div>

          <Reveal className="mt-16 grid items-center gap-8 border border-primary/15 bg-primary p-6 text-white min-[993px]:grid-cols-2 min-[993px]:p-10">
            <div className="group relative overflow-hidden">
              <img
                src={fieldSprayer}
                alt="A tractor and sprayer working a harvested field"
                className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] min-[768px]:h-[280px]"
              />
              <ImageHoverCaption kicker="Ready" title="Take a special" body="Hold a yard number while you check the gate and the lane." />
            </div>
            <div>
              <h3 className="m-0 text-[22px] font-black leading-tight">Ready to take a special?</h3>
              <p className="m-0 mt-4 text-[16px] leading-[1.8] text-white/85">
                Scroll back up to the cards, or open the full equipment list if you want every unit, not only the mark-downs. The desk answers at 1-800-224-8005 and can hold a yard number while you check the gate and the lane.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/equipment" className="cta-box px-5 py-3 text-[13px]">
                  Browse all equipment
                </Link>
                <a href="tel:18002248005" className="inline-block border border-primary px-5 py-3 text-[13px] font-extrabold uppercase text-primary no-underline">
                  Call the desk
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
