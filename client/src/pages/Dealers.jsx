import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import ImageHoverCaption from '../components/ImageHoverCaption';
import rowTractor from '../public/dealers/row-tractor.jpg';
import seedDrill from '../public/dealers/seed-drill.jpg';
import fieldSprayer from '../public/dealers/sprayer.jpg';
import shelterFrame from '../public/machinery/shelter-dome.jpg';
import greenhouseHouse from '../public/machinery/greenhouse.jpg';
import dieselPump from '../public/machinery/pump.jpg';
import brushCutter from '../public/machinery/brush.jpg';
import heroTractor from '../public/Hero images/hero-tractor.jpg';

const yards = [
  ['SHERIDAN, WY', 'Main desk', '30 N GOULD STREET · 307-207-1777 · toll free 1-800-224-8005.'],
  ['Long Island', 'Long Island main', 'Main number for Long Island: 516-252-8000.'],
  ['Waco, Texas', 'Skid and attachment yard', 'Skid steers, brush cutters, and coupler kits.'],
  ['Lubbock, Texas', 'House and pump yard', 'Greenhouses and diesel pumps tagged for the plains.'],
  ['Amarillo, Texas', 'Irrigation desk', 'Layflat sets and transfer pumps for a short run.'],
  ['Des Moines, Iowa', 'Tractor desk', 'Row and field tractors with the PTO checked.'],
  ['Salinas, California', 'West coast freight', 'Houses and pumps staged for a coastal lane.'],
];

const steps = [
  ['Apply', 'Send the farm or store name, the state, and the lines you want to stock.'],
  ['Desk review', 'We confirm hitch class, freight reach, and which yard will tag your units.'],
  ['Written price', 'Dealer cost goes out in writing the same day, with the freight window named.'],
  ['First truck', 'The unit leaves with a yard number. Parts for that line stay on the shelf.'],
];

const dealerLines = [
  {
    name: 'Shelters and sheds',
    image: shelterFrame,
    alt: 'A container shelter ready for a dealer lot',
    paragraphs: [
      'Dealers who carry shelters sell wind-rated bays a farmer can point at. The span and the cover status are on the tag before the unit leaves the yard. Sheds follow the same rule: door height, snow load, and the anchor kit are written.',
      'A store that stocks one or two bays can reorder from the same desk. Parts for covers and ratchets stay on the shelf for the lines you carry. Volume freight for several bays is quoted within two hours when the count and the destination are known.',
    ],
  },
  {
    name: 'Tractors and field iron',
    image: heroTractor,
    alt: 'A field tractor a dealer can stock and sell',
    paragraphs: [
      'Tractor dealers draw from yards that already checked the PTO and wrote the hours. Compact, utility, and field sizes all move through the same toll-free line. If a loader is separate, that is on the sheet the farmer reads in your store.',
      'You sell the tagged unit, not a future build. Hitch class and remotes are named. When a buyer needs a mower or a cultivator to match, the desk can pull from the same network and put both on one freight plan.',
    ],
  },
  {
    name: 'Skid tools and cutters',
    image: brushCutter,
    alt: 'A brush cutter for a dealer skid line',
    paragraphs: [
      'Skid yards in Waco and partner lots tag brush cutters, forks, augers, and grapples with flow and width. A dealer can stock the tools that match the skids their town already runs. Couplers and hose ends for those tools stay orderable after the first truck.',
      'Clearing a fence row or a brush lot is a common reason a farmer walks into a dealer. Having the tool on the lot, with the plate type written, closes that sale without a long wait on a factory.',
    ],
  },
  {
    name: 'Greenhouses and irrigation',
    image: greenhouseHouse,
    alt: 'A greenhouse a dealer can offer on the plains or coast',
    paragraphs: [
      'House and pump yards in Lubbock, Amarillo, and Salinas stage greenhouses and diesel pumps for the plains and the coast. Snow load, gallons, and what is in the crate are on the card. A dealer near growers can carry both a house and a pump for the same season.',
      'Irrigation specials and full-price pumps share the same desk. Layflat and filters can leave with the pump or follow as a second line. Your account keeps the yard numbers so a seal or a vent later is a short call, not a new hunt.',
    ],
  },
];

export default function Dealers() {
  return (
    <>
    <section className="section-y bg-white text-primary">
      <div className="content-wrap">
        <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">The network</p>
        <h1 className="heading-fit m-0 mt-2 text-[clamp(1.5rem,4vw,4rem)] font-black uppercase leading-tight">Dealers</h1>
        <p className="m-0 mt-3 max-w-[680px] text-[15px] leading-[1.7] text-primary/75">
          Farm Exchange sells through a USA desk and a short list of yards. A dealer gets the same written price, the same tag, and the same toll-free line a farmer uses. This is not a brochure network. Each yard below already has stock.
        </p>

        <div className="mt-8 grid gap-4 min-[768px]:grid-cols-2 min-[1100px]:grid-cols-3">
          {yards.map(([city, role, note]) => (
            <article key={city} className="card-lift border border-primary/15 bg-white p-5 hover:border-primary/30">
              <p className="m-0 section-kicker text-[11px] font-extrabold uppercase tracking-[0.08em]">{role}</p>
              <h2 className="m-0 mt-2 text-[16px] font-black uppercase min-[1920px]:text-[22px] min-[2400px]:text-[26px]">{city}</h2>
              <p className="m-0 mt-2 text-[14px] leading-[1.65] text-primary/75">{note}</p>
              <a href="tel:18002248005" className="mt-3 inline-block text-[13px] font-extrabold text-primary no-underline hover:text-accent">
                1-800-224-8005
              </a>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border border-primary/15 bg-primary p-6 min-[993px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[993px]:items-stretch min-[993px]:p-8 text-white">
          <div className="flex h-full flex-col">
            <h2 className="m-0 text-[22px] font-black uppercase leading-tight text-white min-[640px]:text-[24px] min-[1920px]:text-[32px] min-[2400px]:text-[40px]">Become a certified dealer</h2>
            <p className="m-0 mt-3 text-[15px] leading-[1.7] text-white/75">
              Sales points across the USA share one desk. Hitch class, span, and a dealer price go out in writing the same day. Volume freight is quoted within two hours, and a person stays on the account after the first truck.
            </p>
            <Link to="/contact" className="cta-box mt-5 w-fit px-5 py-3 text-[13px]">
              Talk to the desk
            </Link>
            <div className="mt-auto border-t border-white/15 pt-5 min-[993px]:mt-8">
              <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.08em] text-yellow">What you get</p>
              <ul className="m-0 mt-3 list-none space-y-2.5 p-0">
                <li className="text-[14px] leading-[1.55] text-white/85">
                  <span className="font-extrabold text-white">Same-day dealer cost</span>
                  {' — '}written with hitch class, span, and freight window named.
                </li>
                <li className="text-[14px] leading-[1.55] text-white/85">
                  <span className="font-extrabold text-white">One toll-free line</span>
                  {' — '}
                  <a href="tel:18002248005" className="font-extrabold text-yellow no-underline hover:underline">
                    1-800-224-8005
                  </a>
                  {' '}for stock, parts, and the next truck.
                </li>
                <li className="text-[14px] leading-[1.55] text-white/85">
                  <span className="font-extrabold text-white">Parts after the first unit</span>
                  {' — '}covers, seals, and couplers stay orderable for the lines you carry.
                </li>
              </ul>
            </div>
          </div>
          <ol className="m-0 list-none p-0">
            {steps.map(([title, body], index) => (
              <li key={title} className="border-b border-white/10 py-3 last:border-b-0">
                <p className="m-0 text-[12px] font-black text-accent">0{index + 1}</p>
                <h3 className="m-0 mt-1 text-[16px] font-black uppercase text-white">{title}</h3>
                <p className="m-0 mt-1 text-[14px] leading-[1.6] text-white/75">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>

    <section className="bg-white pb-6 text-primary">
      <div className="content-wrap grid items-center gap-8 min-[993px]:grid-cols-2 min-[993px]:gap-12">
        <div className="group relative overflow-hidden">
          <img
            src={rowTractor}
            alt="A row tractor pulling a cultivator through a cut field"
            className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] min-[768px]:h-[420px] min-[1600px]:h-[520px] min-[2200px]:h-[640px]"
          />
          <ImageHoverCaption
            kicker="01"
            title="A yard that already has stock"
            body="Tagged units with hitch, span, and hours before a dealer offers them."
          />
        </div>
        <div>
          <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Who a dealer is</p>
          <h2 className="m-0 mt-2 text-[24px] font-black uppercase leading-tight min-[640px]:text-[36px] min-[1920px]:text-[46px] min-[2400px]:text-[56px]">A yard that already has stock</h2>
          <div className="prose-rail mt-4 text-[16px] leading-[1.8] text-primary/80">
            <p className="m-0">
              A Farm Exchange dealer is a store or a lot that can stand next to the machine. The unit is tagged before it is offered. Hitch class, span, hours, and a yard number are on the sheet a farmer reads, and that same sheet is what the desk uses when the truck is booked. Sheridan, Long Island, Waco, Lubbock, Amarillo, Des Moines, and Salinas already hold stock. A new dealer draws from those yards, not from a factory slot.
            </p>
            <p className="m-0">
              The price a dealer pays is written the same day, with the freight window named. Volume is quoted within two hours. After the first truck, a person stays on the account. Parts for that line stay on the shelf, so a blade, a vent, or a pump fitting is not a second search once the season is underway.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-primary py-16 text-white">
      <div className="content-wrap">
        <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Why carry the line</p>
        <h2 className="m-0 mt-2 max-w-[680px] text-[24px] font-black uppercase leading-tight min-[640px]:text-[36px] min-[1920px]:max-w-[860px] min-[1920px]:text-[46px] min-[2400px]:text-[56px]">Iron you can sell, and a desk behind it</h2>
        <div className="mt-8 grid gap-6 min-[993px]:grid-cols-2">
          <article className="card-lift group overflow-hidden bg-white">
            <div className="relative overflow-hidden">
              <img
                src={seedDrill}
                alt="A tractor with a seed drill working beside farm sheds"
                className="h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] min-[768px]:h-[280px] min-[1600px]:h-[360px] min-[2200px]:h-[440px]"
              />
              <ImageHoverCaption kicker="01" title="Matches the acre" body="Wind rating, hitch, and what is not included are already written." />
            </div>
            <div className="p-5 min-[768px]:p-6">
              <h3 className="m-0 text-[18px] font-black uppercase">The machine matches the acre</h3>
              <p className="m-0 mt-3 text-[15px] leading-[1.75] text-primary/80">
                Shelters, sheds, tractors, skid iron, greenhouses, and irrigation are tagged for the job they do. A dealer does not have to explain a brochure. The wind rating, the hitch, and what is not included are already written. If a unit will not do the work on the drawing, it does not leave the yard.
              </p>
            </div>
          </article>
          <article className="card-lift group overflow-hidden bg-white">
            <div className="relative overflow-hidden">
              <img
                src={fieldSprayer}
                alt="A tractor pulling a field sprayer across a harvested field"
                className="h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] min-[768px]:h-[280px] min-[1600px]:h-[360px] min-[2200px]:h-[440px]"
              />
              <ImageHoverCaption kicker="02" title="One network line" body="Farmers and dealers call the same desk. Freight is named in the price." />
            </div>
            <div className="p-5 min-[768px]:p-6">
              <h3 className="m-0 text-[18px] font-black uppercase">One line for the whole network</h3>
              <p className="m-0 mt-3 text-[15px] leading-[1.75] text-primary/80">
                Farmers and dealers call the same toll-free number. Freight is liftgate or flatbed, with the lane and the gate named in the price. When the truck lands, the desk is still there. That is the point of the network: stock you can point at, a written price, and a person who stays on the account.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className="section-y bg-white text-primary">
      <div className="content-wrap">
        <Reveal>
          <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Lines a dealer can carry</p>
          <h2 className="section-title m-0 mt-3 text-[26px] font-black leading-[1.15] min-[640px]:text-[34px] min-[1600px]:text-[40px]">
            Equipment you can stock from our yards
          </h2>
        </Reveal>
        <p className="m-0 mt-5 max-w-[820px] text-[17px] leading-[1.8] text-primary/85">
          A dealer does not have to take every line on day one. Pick the iron your town already asks for. Each group below has yards that tag it, a photo of the kind of unit you would stand on the lot, and a plain note on how the desk supports that line after the first truck.
        </p>

        <div className="mt-12 flex flex-col gap-14 min-[993px]:gap-20">
          {dealerLines.map((item, index) => {
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
                    <ImageHoverCaption kicker="Line" title={item.name} body={item.paragraphs[0]} />
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

        <Reveal className="mt-16 grid items-center gap-8 border border-white/15 bg-primary p-6 text-white min-[993px]:grid-cols-2 min-[993px]:p-10">
          <div className="group relative overflow-hidden">
            <img
              src={dieselPump}
              alt="A diesel pump staged for dealer freight"
              className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] min-[768px]:h-[280px]"
            />
            <ImageHoverCaption kicker="Start" title="Stock one line or the lot" body="Name the yard, dealer cost, and freight window in writing." />
          </div>
          <div>
            <h3 className="m-0 text-[22px] font-black leading-tight text-white">Start with one line, or stock the lot</h3>
            <p className="m-0 mt-4 text-[16px] leading-[1.8] text-white/85">
              Tell the desk the state you sell in and the iron your buyers ask for. We name the yard, the dealer cost, and the freight window in writing. Farmers can browse the same equipment list you sell from. Call 1-800-224-8005 or write the contact desk to begin.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/contact" className="cta-box px-5 py-3 text-[13px]">
                Talk to the desk
              </Link>
              <Link to="/equipment" className="inline-block border border-white px-5 py-3 text-[13px] font-extrabold uppercase text-white no-underline transition-colors duration-300 hover:border-yellow hover:bg-yellow hover:text-primary">
                See the equipment
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
    </>
  );
}
