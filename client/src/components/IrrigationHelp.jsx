import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import ImageHoverCaption from './ImageHoverCaption';
import pivotField from '../public/irrigation/pivot-idaho.jpg';
import fieldSprinkler from '../public/irrigation/farm-sprinkler.jpg';
import transferPump from '../public/machinery/pump.jpg';

const types = [
  {
    kicker: 'Surface',
    title: 'Water that soaks in as it travels',
    body: 'Surface irrigation, often called gravity irrigation, is the oldest method still used on a wide scale. Water is turned out of a ditch, a gated pipe, or a canal and soaks into the soil as it moves down the slope. Furrows, borders, and level basins are the usual shapes. The field has to fall the right way, and the soil has to take the water before it runs off the low end. Where that is true, a pump and a length of pipe can still be the whole system.',
  },
  {
    kicker: 'Sprinkler',
    title: 'A span that walks the field',
    body: 'Sprinkler systems include fuel and electric center pivots and linear-move machines. A pivot travels a circle. A linear travels straight down a rectangular field. Both carry steel or aluminum pipe, risers, and either a line of heads or a high-pressure gun. Motors, a pump, reels, and a traveling platform move the water while the crop stays put. Pressure at the far end of the span is the number that decides whether the pump on the tag can finish the pass.',
  },
  {
    kicker: 'Micro',
    title: 'A small dose at the plant',
    body: 'Micro-irrigation, also called localized or trickle irrigation, places a measured amount of water at the plant. Low-pressure micro-sprinklers, drip on the soil, and drip buried under it all belong here. The filter and the pressure matter as much as the horsepower. A short transfer pump and a clean line can cover a greenhouse, a berry row, or a block that a big gun would drown. The sheet says the gallons and whether the suction hose is in the crate.',
  },
];

const gear = [
  { title: 'Towable reels', body: 'A reel that can be pulled to the next set, with the hose length and the gun named before the truck is booked.' },
  { title: 'Hose and layflat', body: 'Discharge hose and layflat sold by the length, with the diameter written so it matches the pump outlet.' },
  { title: 'Aluminum pipe', body: 'Light pipe and fittings for a hand-move or a solid-set line, counted by joint rather than guessed from a photo.' },
  { title: 'Hydraulic guns', body: 'High-pressure spray guns for a reel or a pivot end, with the nozzle range stated on the listing.' },
  { title: 'Motors and pumps', body: 'Diesel, gas, electric, and PTO pumps tagged with horsepower, hours, and gallons per minute.' },
  { title: 'Nozzles and heads', body: 'Nozzles, impact heads, and gaskets for the sets we sell, matched to the riser already on the farm.' },
];

const steps = [
  {
    n: '01',
    title: 'The acre is named first',
    body: 'Before a pump is priced, the desk asks what the water has to cover. Span, row length, lift, and whether the line is layflat, drip, or a pivot all go on the same sheet as the horsepower. A 15-horse diesel that looks cheap on a card is the wrong machine if the discharge has to climb a rise or feed a circle the hose cannot reach.',
  },
  {
    n: '02',
    title: 'The unit is tagged in the yard',
    body: 'Suction, discharge, gallons per minute, and hours are written on the listing before a truck is booked. If the filter is not in the crate, it is not implied. If the sprinkler set is a separate line, the sheet says so. The buyer in Texas and the dealer in Iowa read the same numbers.',
  },
  {
    n: '03',
    title: 'The line is part of the price',
    body: 'A pump without a way to move the water is only half a job. Layflat, a filter, and a sprinkler set can leave on the same freight window, or they can be named as a second shipment. Either way the lane and the gate are written down, so the hose is not a surprise after the unit is paid for.',
  },
  {
    n: '04',
    title: 'The same desk stays on the call',
    body: 'Once the water is on the acre, seals, impellers, and hose ends for the lines we sell stay on the shelf. The toll-free number is answered by people who can talk gallons, hitch class, and a bulk load in the same conversation. The season does not wait on a brochure that still has to be built.',
  },
];

const chapters = [
  {
    image: pivotField,
    alt: 'Aerial view of center-pivot irrigation circles beside a canal, with spray visible along the spans',
    kicker: 'The span',
    title: 'A circle the pump has to finish',
    body: [
      'A pivot does not forgive a guess. The span has a length, the end gun has a reach, and the pump has to hold pressure after the circle has turned for hours. Tagged diesel and electric pumps list gallons and discharge on the same sheet, so the acre and the machine meet in writing before a truck is booked.',
      'In the exchange, that sheet travels with the unit: freight window, whether layflat and filter ride along, and the yard number a dealer or grower can trade against later. Liftgate or flatbed, the lane, and the gate sit in the price — named while the iron is still on the lot.',
    ],
  },
  {
    image: fieldSprinkler,
    alt: 'An impact sprinkler on a riser above a white irrigation pipe in a green field',
    kicker: 'The gun',
    title: 'Water that has to land on the row',
    body: [
      'A sprinkler on a riser looks simple until the set is short a head, a gasket, or a length of pipe. Pump and set are sold as countable iron: heads, layflat, and filter written as what is in the crate — inventory you can buy, lease, or barter against other tagged lines on the same desk.',
      'The listing carries drive, hours, and gallons. Hose can leave on the same freight window or stay off if the line is already in the ground. Either way the exchange keeps one sheet: yard number, price, and what moves with the truck.',
    ],
  },
  {
    image: transferPump,
    alt: 'A diesel irrigation pump on the lot, tagged for transfer and layflat work',
    kicker: 'The line',
    title: 'A hose that stays on the soil',
    body: [
      'Drip and layflat are a different job from a big gun. Water moves slower, the filter matters more, and a small transfer pump is often the right machine for a short run. Those pumps sit on the lot with suction size and gallons on the tag — and the sheet says when suction hose is not in the price.',
      'After the unit lands, seals, fittings, and hose ends stay in the same exchange: the shelf that sold the pump still answers to the yard number. Trade up, order the part, or put a tired pump against a tagged diesel — one ecosystem, one desk, one written sheet.',
    ],
  },
];

export default function IrrigationHelp() {
  return (
    <section id="irrigation-help" className="section-y bg-white text-primary">
      <div className="content-wrap">
        <Reveal>
          <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Irrigation · Exchange</p>
          <h2 className="section-title m-0 mt-2 text-[26px] font-black uppercase leading-[1.05] min-[640px]:text-[36px] min-[1600px]:text-[44px]">
            How the water gets to the acre
          </h2>
        </Reveal>
        <div className="prose-rail prose-rail-wide mt-8 text-[16px] leading-[1.85] text-primary/80 min-[993px]:text-[18px] min-[1920px]:text-[20px]">
          <p className="m-0">
            Irrigation here is part of the Farm Exchange ecosystem — not a separate brochure. Pumps, layflat, filters, and sprinkler sets already carry a yard number on the same desk that sells shelters and tractors. Buy, lease, barter, repair, or order the part: water iron moves through the same written path as every other tagged line.
          </p>
          <p className="m-0">
            We start with the water, not the brand on the cowling. Distance, lift, and whether it lands from a pivot, a gun, or a hose on the soil set the horsepower and the hose. Those facts sit on the sheet next to gallons, hours, and the freight window — so a dealer stocking a line and a grower finishing one span read the same numbers.
          </p>
          <p className="m-0">
            Moving water onto dry ground is an old farm job. The pivots, pumps, and drop nozzles on this lot do it with a published GPM and a yard tag you can trade against later. Measured water from a canal, dam, lake, or well lands on ground where rainfall alone will not carry the season — and the exchange keeps the serial, the sheet, and the shelf linked after the truck leaves.
          </p>
          <p className="m-0">
            Wetting the crop is only the first use: fertigation, pasture, livestock cool-down, grounds, frost protection. Every one of those jobs uses the same toll-free line and the same inventory rules — what is in the crate is written; what is missing is written too.
          </p>
        </div>

        <div className="mt-16">
          <Reveal>
            <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Types of irrigation</p>
            <h3 className="section-title m-0 mt-2 text-[22px] font-black uppercase leading-tight min-[640px]:text-[28px] min-[1600px]:text-[32px]">
              Surface, sprinkler, and micro
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-4 min-[993px]:grid-cols-3">
            {types.map((type) => (
              <article key={type.kicker} className="card-lift border border-primary/15 bg-white p-5 hover:border-primary/30 min-[1600px]:p-7">
                <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">{type.kicker}</p>
                <h4 className="m-0 mt-2 text-[18px] font-black uppercase leading-tight min-[1600px]:text-[22px]">{type.title}</h4>
                <p className="m-0 mt-3 text-[14px] leading-[1.75] text-primary/80 min-[1600px]:text-[16px]">{type.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <Reveal>
            <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">On the sheet</p>
            <h3 className="section-title m-0 mt-2 text-[22px] font-black uppercase leading-tight min-[640px]:text-[28px] min-[1600px]:text-[32px]">
              The iron that moves the water
            </h3>
          </Reveal>
          <p className="prose-rail prose-rail-wide m-0 mt-5 text-[16px] leading-[1.85] text-primary/80 min-[993px]:text-[18px] min-[1920px]:text-[20px]">
            Towable reels, hose, aluminum pipe, hydraulic guns, motors, and nozzles are asked for by name. The answer is a tagged listing, with more iron added to the irrigation line as it lands on a yard. A reel without its gun, or a pump without the hose that matches the outlet, is written that way before anyone pays.
          </p>
          <div className="mt-8 grid gap-4 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-3">
            {gear.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden border border-yellow/25 bg-[#034a32] p-5 pl-5 text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-yellow hover:bg-[#045c3e] hover:shadow-[0_16px_32px_rgba(0,0,0,0.28)]"
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-yellow transition-all duration-300 group-hover:w-1.5" />
                <h4 className="m-0 text-[16px] font-black uppercase leading-tight text-yellow transition-colors duration-300 group-hover:text-white min-[1600px]:text-[18px]">
                  {item.title}
                </h4>
                <p className="m-0 mt-2 text-[14px] leading-[1.7] text-white/85 transition-colors duration-300 group-hover:text-white">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <Reveal>
            <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">What we actually do</p>
            <h3 className="section-title m-0 mt-2 text-[22px] font-black uppercase leading-tight min-[640px]:text-[28px] min-[1600px]:text-[32px]">
              Four steps between the call and the first hour of water
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-4 min-[768px]:grid-cols-2">
            {steps.map((step) => (
              <article
                key={step.n}
                className="group relative overflow-hidden border border-yellow/25 bg-[#034a32] p-5 text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-yellow hover:bg-[#045c3e] hover:shadow-[0_16px_32px_rgba(0,0,0,0.28)] min-[1600px]:p-7"
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-yellow transition-all duration-300 group-hover:w-1.5" />
                <p className="m-0 text-[12px] font-black tracking-[0.08em] text-yellow">{step.n}</p>
                <h4 className="m-0 mt-2 text-[18px] font-black uppercase leading-tight text-white transition-colors duration-300 group-hover:text-yellow min-[1600px]:text-[22px]">
                  {step.title}
                </h4>
                <p className="m-0 mt-3 text-[14px] leading-[1.75] text-white/85 transition-colors duration-300 group-hover:text-white min-[1600px]:text-[16px]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-16 min-[993px]:mt-20 min-[993px]:gap-24">
          {chapters.map((chapter, index) => {
            const imageFirst = index % 2 === 0;
            return (
              <article key={chapter.title} className="grid items-center gap-8 min-[993px]:grid-cols-2 min-[993px]:gap-12">
                <Reveal className={imageFirst ? '' : 'min-[993px]:order-2'}>
                  <div className="group relative overflow-hidden">
                    <img
                      src={chapter.image}
                      alt={chapter.alt}
                      className="h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] min-[768px]:h-[380px] min-[1600px]:h-[460px]"
                    />
                    <ImageHoverCaption kicker={chapter.kicker} title={chapter.title} body={chapter.body[0]} />
                  </div>
                </Reveal>
                <Reveal delay={80} className={imageFirst ? '' : 'min-[993px]:order-1'}>
                  <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">{chapter.kicker}</p>
                  <h3 className="m-0 mt-2 text-[24px] font-black uppercase leading-tight min-[640px]:text-[32px] min-[1920px]:text-[40px]">
                    {chapter.title}
                  </h3>
                  <div className="prose-rail mt-4 text-[15px] leading-[1.8] text-primary/80 min-[1600px]:text-[17px]">
                    {chapter.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)} className="m-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>

        <div className="mt-16 grid gap-4 min-[993px]:grid-cols-2 min-[993px]:gap-5">
          <Reveal>
            <article className="group relative h-full overflow-hidden border border-yellow/25 bg-[#034a32] p-6 text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-yellow hover:bg-[#045c3e] hover:shadow-[0_16px_32px_rgba(0,0,0,0.28)] min-[993px]:p-8">
              <span className="absolute inset-y-0 left-0 w-1 bg-yellow transition-all duration-300 group-hover:w-1.5" />
              <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">Irrigation through the years</p>
              <h3 className="m-0 mt-2 text-[24px] font-black uppercase leading-tight text-white transition-colors duration-300 group-hover:text-yellow min-[640px]:text-[32px]">
                From a river turned onto a field
              </h3>
              <p className="m-0 mt-4 text-[15px] leading-[1.8] text-white/85 transition-colors duration-300 group-hover:text-white min-[1600px]:text-[17px]">
                Accounts of the earliest irrigation place it in the Middle East several thousand years before the common era, when growers were already turning river water onto planted ground. In what is now the American Southwest, canal systems were carrying water to fields long before a diesel pump existed. The span on a modern yard is a later machine for an old job.
              </p>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="group relative h-full overflow-hidden border border-yellow/25 bg-[#034a32] p-6 text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-yellow hover:bg-[#045c3e] hover:shadow-[0_16px_32px_rgba(0,0,0,0.28)] min-[993px]:p-8">
              <span className="absolute inset-y-0 left-0 w-1 bg-yellow transition-all duration-300 group-hover:w-1.5" />
              <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">How a system is chosen now</p>
              <h3 className="m-0 mt-2 text-[24px] font-black uppercase leading-tight text-white transition-colors duration-300 group-hover:text-yellow min-[640px]:text-[32px]">
                Region, crop, and a screen in the cab
              </h3>
              <p className="m-0 mt-4 text-[15px] leading-[1.8] text-white/85 transition-colors duration-300 group-hover:text-white min-[1600px]:text-[17px]">
                A grower weighs the region, the crop, the shape of the field, the water source, the fuel, and the labor. Newer machines add GPS guidance, remote monitors, touchscreens, and phone apps so pressure and position can be read away from the pivot point. Variable control puts more water on a dry corner and less on ground that is already wet. On our lot the tag still starts with gallons, hours, and a yard number, and the electronics are named when they are on the unit.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal className="fx2-panel fx2-panel-red mt-16 px-6 py-8 min-[993px]:px-10 min-[993px]:py-10">
          <span className="fx2-corners" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <div className="relative z-[1]">
            <p className="fx2-kicker m-0">The exchange</p>
            <h3 className="fx2-title m-0 text-[24px] font-black uppercase leading-tight min-[640px]:text-[32px]">
              Pumps and sets already on a USA lot
            </h3>
            <p className="m-0 mt-7 max-w-[760px] text-[15px] leading-[1.75] text-white/85 min-[1600px]:text-[17px]">
              Diesel, gas, and PTO pumps, layflat, and sprinkler sets are tagged with gallons, hours, and a yard — ready to buy, lease, barter, or keep running with parts from the same shelf. Open the irrigation line, or call 1-800-224-8005 if the water has to move this week. Price and freight leave in writing the same day.
            </p>
            <Link to="/equipment?line=irrigation" className="fx2-cta">
              Open irrigation listings
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
