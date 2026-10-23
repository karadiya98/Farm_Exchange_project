import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionRule from './SectionRule';
import ImageHoverCaption from './ImageHoverCaption';
import sellPhoto from '../public/deal-paths/sell-lot.jpg';
import leasePhoto from '../public/deal-paths/lease-field.jpg';
import barterPhoto from '../public/deal-paths/barter-pair.jpg';
import repairPhoto from '../public/deal-paths/repair-shop.jpg';
import partsPhoto from '../public/deal-paths/parts-shelf.jpg';

const overview = [
  { n: '01', title: 'We sell', href: '#step-sell', line: 'A tagged machine, a written price, a truck to your lane.' },
  { n: '02', title: 'Lease', href: '#step-lease', line: 'Use it for a set time. The end of the term is written first.' },
  { n: '03', title: 'Barter', href: '#step-barter', line: 'Trade iron you own against a unit on our yard.' },
  { n: '04', title: 'Repair', href: '#step-repair', line: 'The lines we sold can come back to the same desk.' },
  { n: '05', title: 'Parts', href: '#step-parts', line: 'Blades, seals, vents, and hose that match the tag.' },
];

const steps = [
  {
    id: 'step-sell',
    n: '01',
    kicker: 'We sell',
    title: 'You buy a machine that is already on a yard',
    image: sellPhoto,
    alt: 'Farm sprayers lined up for a machinery sale on a yard',
    paragraphs: [
      'Selling, on this desk, means the unit is already tagged. It has a year, a price, hours or a new mark, and a town. You can read the card at home. You can call 1-800-224-8005 and ask a person to read the same card out loud. When you say yes, we send the price in writing the same day. The writing names the truck, the lane, and the day it can leave.',
      'We sell shelters, sheds, tractors, mowers, skid-steer tools, greenhouses, pumps, and the parts that go with them. A new shelter is still in the crate, with the cover rolled and the wind number on the tag. A used tractor shows the hours and whether a loader is on it. If the loader is a separate piece, the card says so. You are not guessing from a pretty picture.',
      'The sale is finished when three things match: the yard number, the price you agreed to, and the machine that comes off the truck. Pay and freight are talked through before the driver is booked. If the gate is too narrow, we say so while the unit is still on the yard. You can also ask us to watch for a machine you do not see today. That note stays open until you close it.',
    ],
    points: [
      'The price is on the card before you call.',
      'Freight to the farm lane is named with the price.',
      'What is in the crate is written. What is missing is written too.',
      'The same person can confirm the serial before the truck rolls.',
    ],
  },
  {
    id: 'step-lease',
    n: '02',
    kicker: 'Lease',
    title: 'Use the machine for a time you can name',
    image: leasePhoto,
    alt: 'A telehandler moving straw bales in the field during a busy season',
    paragraphs: [
      'A lease is for a farm or a crew that needs the machine on the place for a set time, and does not want to buy it outright today. The time, the payment, and the hours you may put on it are written before anyone signs. The unit is still one that sits on a USA yard. It has a serial the desk can read back to you.',
      'People lease a tractor for a busy season, a shelter while a barn is rebuilt, or a pump while a well job is underway. You know the day it arrives and the day it is due back. If you want to keep it at the end, the sheet already says how that buyout works. If you want to send it home, the return freight is on that same sheet. You are not hearing about the return truck for the first time on the last week.',
      'We do not lease a machine we cannot point to. If the unit you want is already promised, we say so and name the next one that is free. Payments are plain. There is no extra fee hiding under a new name. Call with the dates, the acre or the job, and the size you need. The term sheet goes out the same day.',
    ],
    points: [
      'The length of the lease is written in weeks or months.',
      'Hours allowed on the machine are written.',
      'Return, buyout, or a longer term is chosen before you start.',
      'The truck both ways is part of the talk, not a surprise later.',
    ],
  },
  {
    id: 'step-barter',
    n: '03',
    kicker: 'Barter',
    title: 'Trade the iron you already own',
    image: barterPhoto,
    alt: 'Two older crawler tractors side by side, the kind of iron that can be traded',
    paragraphs: [
      'Barter means you bring a machine you already own and put it against a machine on our lot. Tell us what you have: the year if you know it, the hours, the hitch or the span, and what still works. Then tell us what you want from the yard. We look at both against the tagged prices. The difference, if there is one, is a number on paper.',
      'A fair trade starts with two machines that can be described. If we need to see your unit on a yard before the number is final, the note says that. We do not shake hands on a guess and then change it when the truck arrives. Photos help. Hours help more. A serial number helps most. If something is broken, say so at the start. A missing loader or a torn cover changes the balance, and it should change it before you haul anything.',
      'You can trade up to a larger tractor, trade a tired mower for a tagged one, or put an old pump against a newer diesel. Cash can make up the difference. Freight can be part of the balance too. Both numbers are written. When the paper matches what you see, then the trucks are booked. One may bring your old iron in. One may take the new iron to the lane. The order is on the sheet.',
    ],
    points: [
      'Two serials, or two clear descriptions, go on one sheet.',
      'The balance is cash, freight, or both. It is written.',
      'Broken parts and missing pieces are named at the start.',
      'Nothing is hauled until you have read the balance back to us.',
    ],
  },
  {
    id: 'step-repair',
    n: '04',
    kicker: 'Repair',
    title: 'The same desk stays on the machine after it is yours',
    image: repairPhoto,
    alt: 'A tractor on a jack with a front wheel off for repair',
    paragraphs: [
      'Repair is for the shelters, sheds, tractors, skid tools, houses, and pumps that left our yards. Call with the yard number or the serial, what failed, and whether the unit is still on the farm. From that, a person who knows the line can say if you need a part in the mail, a closer look, or the unit back on a truck. You get that answer in plain words.',
      'A rock can chip a cutter. A seal can weep on a pump. A vent can stick on a greenhouse. Those are jobs we know, because we sold the line. If the part is on the shelf, it can ship to the lane. If the frame has to be seen, we name the freight back to the yard before the unit moves. We do not take on a machine we have never tagged and then pretend the drawing is on the shelf.',
      'You should not have to retell the whole sale to a stranger. The account still has the yard number. Tell us the week it failed and what you were doing. Cutting brush. Pumping a span. Closing a shelter door in wind. That is enough for us to start. If the repair will take days, we say how many. If a loaner is not available, we say that too, so you can plan the work.',
    ],
    points: [
      'Have the yard number or the serial ready.',
      'Say what failed and whether it is still on the farm.',
      'A stocked part can ship. A frame job is named before it moves.',
      'The phone number does not change after the sale.',
    ],
  },
  {
    id: 'step-parts',
    n: '05',
    kicker: 'Parts',
    title: 'The small iron that keeps the big iron working',
    image: partsPhoto,
    alt: 'A row of tractor attachments and spare iron on the grass',
    paragraphs: [
      'Parts are the pieces that wear out in a season. Blades for a brush cutter. A seal or an impeller for a pump. A vent kit for a greenhouse. Couplers, hose ends, and the hardware bag that should have stayed with the crate. Each part is listed with the machine it belongs to. You are not buying a bin of hardware with no name.',
      'Order the part the way you would order the whole unit. Give us the yard number of the machine, or the size: 72 inch cutter, 15 horse pump, twin-wall house. We match it to the shelf. If it is out, we say so. We do not take an order we cannot ship. Small parts go out as a parcel. A long piece of pipe or a rolled cover is named as freight, with the lane and the gate.',
      'Dealers stocking a line and a farmer who broke a blade on Tuesday use the same counter. Call while the crew is still in the field if you need to. We can read the shelf against the serial. Keep the old part until the new one fits. If it does not match, call before you throw the old one away. We would rather send the right piece the same week than have you parked over a wrong bolt.',
    ],
    points: [
      'The part is tied to a machine, not sold as a mystery bin.',
      'Out of stock is said out loud. We do not pretend it shipped.',
      'Parcel or truck is named before you pay.',
      'The serial on your unit is the fastest way to get the right piece.',
    ],
  },
];

const machines = [
  {
    name: 'Container shelters',
    what: 'A steel arch and a heavy cover that turns a container, or an open pad, into a roofed bay.',
    uses: 'Park a tractor out of the weather. Store hay, seed, and tools. Give a crew a wind break at the edge of the yard.',
    to: '/equipment?line=shelters',
    subs: [
      { name: '20ft single-truss shelter', what: 'A shorter arch for one container. The cover is rolled and the ratchets are in the box.', uses: 'Cover a single container or a short equipment pad when a full 40ft bay is more than you need.', to: '/equipment?line=shelters' },
      { name: '30ft commercial bay', what: 'A mid-size shelter with a galvanized arch and a heavy vinyl cover.', uses: 'Hold a tractor and a wagon side by side. The wind number is on the tag before you order.', to: '/equipment?line=shelters' },
      { name: '40ft span shelter', what: 'A longer double-truss span with doors at the ends. The cover ships rolled and banded.', uses: 'A full equipment row. Hay at one end and iron at the other. Check the lane before the truck day.', to: '/equipment?line=shelters' },
    ],
  },
  {
    name: 'Metal sheds',
    what: 'A framed building with a door, sold as a bay you can stand a machine inside.',
    uses: 'A tool room. A hay bay. A place to keep a skid steer when the sky opens up.',
    to: '/equipment?line=sheds',
    subs: [
      { name: 'Tool bay', what: 'A closed metal shed with a double door, tall enough for a small machine.', uses: 'Lock up hand tools, a mower, and parts bins. The anchor kit is named when it is in the crate.', to: '/equipment?line=sheds' },
      { name: 'Hay bay', what: 'An open-front shed with a high eave so a wagon can back in.', uses: 'Keep hay dry and still easy to load. Snow load is written on the card.', to: '/equipment?line=sheds' },
      { name: 'Skid-steer bay', what: 'A shed sized so a skid steer can drive in and turn.', uses: 'Park the skid and hang the attachments on the wall. Door height is the number to read first.', to: '/equipment?line=sheds' },
    ],
  },
  {
    name: 'Tractors',
    what: 'The pulling machine. Compact, utility, and field sizes, with a hitch and a PTO on the ones we tag that way.',
    uses: 'Pull a mower, a cultivator, or a wagon. Run a PTO pump. Move a loader when the loader is on the unit.',
    to: '/equipment?line=tractors',
    subs: [
      { name: 'Compact tractor', what: 'A smaller tractor for a yard, a garden block, or a tight gate.', uses: 'Mow, scrape a short lane, and run a light PTO tool. Hours and hitch are on the card.', to: '/equipment?line=tractors' },
      { name: 'Utility tractor', what: 'A mid-size tractor for daily chores. Some have a loader. Some do not. The card says which.', uses: 'Move pallets, pull a box blade, and keep the place up. Ask if the loader is included.', to: '/equipment?line=tractors' },
      { name: 'Row and field tractor', what: 'A larger tractor for long rows and heavier pull. Cab or open station is written.', uses: 'Plant, cultivate, and pull a wagon. Horsepower and the number of remotes are on the tag.', to: '/equipment?line=tractors' },
      { name: 'Pasture tractor', what: 'An older, simpler tractor with a live PTO, tagged with the hours it already has.', uses: 'Mow pasture and pull a light implement. A good fit when you want iron you can work on yourself.', to: '/equipment?line=tractors' },
    ],
  },
  {
    name: 'Mowers',
    what: 'A cutter that hangs on the tractor or is its own unit. Width and PTO speed are on the card.',
    uses: 'Keep a yard neat. Cut pasture. Knock down stalks after harvest.',
    to: '/equipment?line=tractors',
    subs: [
      { name: 'Finish mower', what: 'A three-blade deck for a clean cut on grass. It runs off the tractor PTO.', uses: 'Lawns, lanes, and grounds that need to look kept. Blade condition is noted on the sheet.', to: '/equipment?line=tractors' },
      { name: 'Rotary cutter', what: 'A heavy deck that cuts brush and stalks, often called a bush hog.', uses: 'Pasture edges, ditches, and stalks after harvest. Match it to the tractor horsepower.', to: '/equipment?line=tractors' },
      { name: 'Flail mower', what: 'A mower with swinging knives on a drum. It chops finer than a rotary.', uses: 'Roadsides and residue you want left in small pieces. The knife set is named if it is new.', to: '/equipment?line=tractors' },
    ],
  },
  {
    name: 'Skid steers and tools',
    what: 'A compact loader, plus the tools that lock onto the plate. The machine is the power. The tool does the job.',
    uses: 'Lift, cut, dig, and move in a yard that is too tight for a big tractor.',
    to: '/equipment?line=skid',
    subs: [
      { name: 'Compact skid steer', what: 'The machine itself. Wheels or tracks, a quick-attach plate, and the couplers on the arms.', uses: 'Run every tool below. Hours, lift, and whether the bucket is included are on the card.', to: '/equipment?line=skid' },
      { name: 'Brush cutter', what: 'A hydraulic deck that locks on the skid and cuts thick brush. Width and oil flow are written.', uses: 'Clear fence rows and overgrown lots. Hoses and couplers are listed if they are in the crate.', to: '/equipment?line=skid' },
      { name: 'Auger', what: 'A drill for post holes, driven by the skid hydraulics.', uses: 'Fence posts and tree planting. Bit size is the number to match to the job.', to: '/equipment?line=skid' },
      { name: 'Bucket and pallet forks', what: 'The lift tools. A bucket moves dirt and snow. Forks move pallets and crates.', uses: 'Daily yard work. Confirm the plate matches your skid before you pay.', to: '/equipment?line=skid' },
      { name: 'Grapple and bale spear', what: 'Tools that grab. A grapple holds brush or rocks. A spear lifts round bales.', uses: 'Clean-up and hay. These are separate tags when they do not come with the skid.', to: '/equipment?line=skid' },
    ],
  },
  {
    name: 'Soil tools',
    what: 'Machines that pack or loosen the ground. They sit with the skid line on this lot.',
    uses: 'Pack a lane, a pad, or a trench. Break soil before you plant a small block.',
    to: '/equipment?line=skid',
    subs: [
      { name: 'Plate compactor', what: 'A flat plate that vibrates and packs gravel or soil as you walk it forward.', uses: 'Shed pads, lanes, and trench backfill. Weight and plate size are on the card.', to: '/equipment?line=skid' },
      { name: 'Rammer', what: 'A narrow jumping tamper for tight trenches where a plate will not fit.', uses: 'Footings and narrow ditches. Easier to trailer than a ride-on roller.', to: '/equipment?line=skid' },
      { name: 'Tiller', what: 'A rotary tool that breaks the top soil for a garden block or a greenhouse floor.', uses: 'Seedbeds and house floors. Match the width to the tractor or the walk-behind you have.', to: '/equipment?line=skid' },
    ],
  },
  {
    name: 'Greenhouses',
    what: 'A covered house for plants. Vents and benches are named when they are in the crate.',
    uses: 'Start transplants. Hold a crop out of hail. Extend a short northern season.',
    to: '/equipment?line=greenhouse',
    subs: [
      { name: 'Twin-wall house', what: 'A polycarbonate house with twin-wall panels, a roof vent, and a bench kit when the card says so.', uses: 'A starter house for transplants. Snow load is on the tag.', to: '/equipment?line=greenhouse' },
      { name: 'Gothic house', what: 'A peaked arch that sheds snow better than a round tunnel. Ends and a ridge vent are listed apart if they ship that way.', uses: 'A longer season in a snow country. Read the length before you pour a floor.', to: '/equipment?line=greenhouse' },
      { name: 'Tunnel house', what: 'A simpler hoop house for a row of plants. Lighter than a gothic, faster to stand up.', uses: 'Season extension on a bed you already have. Anchors matter in wind.', to: '/equipment?line=greenhouse' },
    ],
  },
  {
    name: 'Pumps and irrigation',
    what: 'The machine that moves the water, and the hose and heads that put it on the crop.',
    uses: 'Feed a pivot or a gun. Move water a short distance. Put a line on a row.',
    to: '/equipment?line=irrigation',
    subs: [
      { name: 'Diesel pump', what: 'A fuel pump with suction and discharge sizes written. Gallons per minute are the main number.', uses: 'Hold pressure on a span or a gun for a long day. Hours are on the tag.', to: '/equipment?line=irrigation' },
      { name: 'Gas transfer pump', what: 'A smaller pull-start pump for a short run. The suction hose is named if it is not included.', uses: 'Move water from a ditch or a tank to a nearby row. Easy to lift into a pickup.', to: '/equipment?line=irrigation' },
      { name: 'PTO pump', what: 'A pump that runs off the tractor shaft instead of its own engine.', uses: 'Use the tractor you already own as the motor. Match the PTO speed on the card.', to: '/equipment?line=irrigation' },
      { name: 'Layflat, filter, and gun', what: 'The hose, the screen, and the sprinkler head. Often a set of their own, not part of the pump price.', uses: 'Carry water down the row and throw it on the crop. Diameter has to match the pump outlet.', to: '/equipment?line=irrigation' },
      { name: 'Drip line', what: 'A hose that stays on the soil and lets water out slowly at the plant.', uses: 'Houses, berries, and rows that a big gun would drown. The filter matters as much as the pump.', to: '/equipment?line=irrigation' },
    ],
  },
  {
    name: 'Implements',
    what: 'Tools that hitch to the tractor. They are not the tractor. They do one job behind it.',
    uses: 'Work the soil, grade a lane, or carry a load. Match the horsepower to the tractor you own.',
    to: '/equipment?line=parts',
    subs: [
      { name: 'Cultivator', what: 'A three-point tool with sweeps or rolling blades for the ground between rows.', uses: 'Weed a crop without a full spray pass. Hitch pins and PTO, if it has one, are on the card.', to: '/equipment?line=parts' },
      { name: 'Box blade', what: 'A rear blade with sides, used to pull dirt and level a lane.', uses: 'Driveways, shed pads, and low spots. A good pair with a utility tractor.', to: '/equipment?line=parts' },
      { name: 'Wagon and trailer gear', what: 'The hitch hardware and the rolling gear that lets a tractor haul.', uses: 'Move seed, hay, and parts from the yard to the field. Weight rating is the number to read.', to: '/equipment?line=parts' },
    ],
  },
  {
    name: 'Parts',
    what: 'The wear pieces for the machines above. Each part is tied to a line we sell.',
    uses: 'Put a machine back to work the same week. Stock a dealer shelf. Replace what a rock or a season took off.',
    to: '/equipment?line=parts',
    subs: [
      { name: 'Cutter blades', what: 'A matched pair and the bolts for a brush cutter or a mower deck.', uses: 'Replace a nicked blade without sending the whole unit back. Size has to match the deck.', to: '/equipment?line=parts' },
      { name: 'Pump seals and impellers', what: 'The pieces inside a pump that wear out when sand or hours pile up.', uses: 'Stop a leak and bring the gallons back. Have the pump serial when you call.', to: '/equipment?line=parts' },
      { name: 'Greenhouse vents', what: 'A ridge vent, an opener, and the screws for the houses on this lot.', uses: 'Let heat out of a house on a bright day. The kit is named for the house it fits.', to: '/equipment?line=parts' },
      { name: 'Couplers and hose ends', what: 'The fittings that join a skid tool or a layflat line to the machine.', uses: 'Swap a tool or fix a blown end. Flat-face or pipe thread is written so you get the right one.', to: '/equipment?line=parts' },
    ],
  },
];

export default function DealPaths() {
  return (
    <>
      <section id="ways-we-work" className="section-y bg-white text-primary">
        <div className="content-wrap">
          <Reveal>
            <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">The exchange</p>
            <h2 className="section-title m-0 mt-3 text-[26px] font-black leading-[1.15] min-[640px]:text-[34px] min-[1600px]:text-[40px]">
              Sell, lease, barter, repair, and parts
            </h2>
          </Reveal>
          <div className="prose-rail prose-rail-wide mt-6 text-[17px] leading-[1.8] text-primary/85 min-[1600px]:text-[19px]">
            <p className="m-0">
              Farm Exchange is one ecosystem for tagged iron. Buy a machine already on a yard. Lease one for a time you name. Trade iron you already own. Bring a unit back for repair. Order the part that keeps it running. One toll-free line for all five. One written sheet before a truck moves.
            </p>
            <p className="m-0">
              The overview below is the whole path in five short lines. Every step shares the same shape: what it is, how a call goes, and what we write down. Skip to the step you need, or read them in order if you are new. Selling comes first because most deals start there. Parts come last because they keep the first machine — and the exchange — alive.
            </p>
            <p className="m-0">
              The words stay plain. Price means the dollars on the sheet. Freight means the truck to your lane. Yard number means the tag on that one unit. Serial means the number stamped on the machine. Those facts travel with the iron across buy, lease, barter, repair, and parts — that is the ecosystem.
            </p>
          </div>

          <ol className="m-0 mt-10 grid list-none gap-3 p-0 min-[768px]:grid-cols-5">
            {overview.map((item) => (
              <li key={item.n}>
                <a
                  href={item.href}
                  className="fx1-card flex h-full flex-col p-4 text-white no-underline"
                >
                  <span className="text-[12px] font-black tracking-[0.08em] text-yellow">{item.n}</span>
                  <span className="fx1-title mt-2 text-[16px] font-black">{item.title}</span>
                  <span className="mt-2 text-[14px] leading-relaxed text-white/75">{item.line}</span>
                </a>
              </li>
            ))}
          </ol>

          <div className="mt-16 flex flex-col gap-16 min-[993px]:gap-20">
            {steps.map((step, index) => {
              const imageFirst = index % 2 === 1;
              const [lead, ...rest] = step.paragraphs;
              return (
                <article id={step.id} key={step.id} className="scroll-mt-[calc(var(--header-h,180px)+12px)]">
                  <div className="grid items-stretch gap-8 min-[993px]:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] min-[993px]:gap-10">
                    <Reveal className={`h-full min-h-[260px] min-[768px]:min-h-[320px] ${imageFirst ? 'min-[993px]:order-2' : ''}`}>
                      <div className="group relative h-full min-h-[inherit] overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.alt}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        <ImageHoverCaption kicker={step.n} title={step.kicker} body={step.title} />
                      </div>
                    </Reveal>
                    <Reveal delay={80} className={`flex h-full flex-col justify-center ${imageFirst ? 'min-[993px]:order-1' : ''}`}>
                      <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">
                        Step {step.n} · {step.kicker}
                      </p>
                      <h3 className="section-title m-0 mt-2 text-[22px] font-black leading-tight min-[640px]:text-[28px] min-[1600px]:text-[32px]">
                        {step.title}
                      </h3>
                      <div className="prose-rail prose-rail-wide mt-4 text-[16px] leading-[1.8] text-primary/85 min-[1600px]:text-[18px]">
                        <p className="m-0">{lead}</p>
                      </div>
                    </Reveal>
                  </div>
                  {(rest.length > 0 || step.points.length > 0) && (
                    <Reveal className="mt-6">
                      {rest.length > 0 && (
                        <div className="prose-rail prose-rail-wide text-[16px] leading-[1.8] text-primary/85 min-[1600px]:text-[18px]">
                          {rest.map((paragraph) => (
                            <p key={paragraph.slice(0, 28)} className="m-0">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}
                      <ul className="m-0 mt-5 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-primary/85">
                        {step.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </Reveal>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SectionRule />

      <section id="machine-guide" className="section-y bg-primary text-white">
        <div className="content-wrap">
          <Reveal>
            <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">The iron</p>
            <h2 className="section-title m-0 mt-3 text-[26px] font-black leading-[1.15] min-[640px]:text-[34px] min-[1600px]:text-[40px]">
              What the machines are, and what they are for
            </h2>
          </Reveal>
          <div className="prose-rail prose-rail-on-dark prose-rail-wide mt-6 text-[17px] leading-[1.8] min-[1600px]:text-[19px]">
            <p className="m-0">
              Farm iron falls into a few plain groups. Some of it covers things. Some of it pulls. Some of it cuts, digs, or moves water. The tool on the back of a tractor is not the tractor. The pump is not the hose. Knowing the group saves a wrong order. The table below is that map. Each row says what the machine is, what people use it for, and where to see the ones tagged on our yards.
            </p>
            <p className="m-0">
              A shelter keeps weather off a bay. A shed is a building with a door. A tractor is the power that pulls and turns a shaft. A mower, a cultivator, and a skid tool are the pieces that do a single job. A greenhouse holds plants. A pump moves water. Parts replace what wore out. If two rows seem close, read the “what it is” line. That line is the one we use on the phone.
            </p>
            <p className="m-0">
              You do not have to memorize horsepower charts. Match the job to the row, then open the lot. The cards under that row already have the size, the hours, and the price. If the table and the card ever disagree, the card for that yard number wins. Call and we will read the row with you.
            </p>
            <p className="m-0">
              The dark name is the main machine. The lighter rows under it are the kinds that belong to that machine. A tractor is the main machine. A compact tractor and a field tractor are the kinds. A pump is the main machine. A diesel pump and a drip line are the kinds. Read the main row first. Then read the kind that matches your job.
            </p>
          </div>

          <div className="mt-10 overflow-hidden border border-white/20 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
            <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1.35fr)_140px] gap-5 border-b-2 border-yellow bg-primary px-5 py-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white/90 min-[900px]:grid">
              <span>Machine</span>
              <span>What it is</span>
              <span>What people use it for</span>
              <span>On the lot</span>
            </div>
            {machines.map((row) => (
              <div key={row.name} className="border-b border-primary/10 last:border-b-0">
                <article className="grid gap-3 bg-[#034a32] px-5 py-5 text-white transition-colors duration-300 hover:bg-[#045c3e] min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1.35fr)_140px] min-[900px]:items-center min-[900px]:gap-5">
                  <h3 className="m-0 text-[18px] font-black leading-tight">
                    <span className="mb-1.5 inline-block rounded-sm bg-yellow/15 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-yellow">
                      Main machine
                    </span>
                    <span className="mt-1.5 block">{row.name}</span>
                  </h3>
                  <p className="m-0 text-[15px] leading-[1.65] text-white/85">
                    <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-yellow/80 min-[900px]:hidden">What it is</span>
                    {row.what}
                  </p>
                  <p className="m-0 text-[15px] leading-[1.65] text-white/85">
                    <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-yellow/80 min-[900px]:hidden">What people use it for</span>
                    {row.uses}
                  </p>
                  <Link
                    to={row.to}
                    className="group/btn inline-flex w-fit items-center gap-1.5 border border-yellow/50 bg-yellow/10 px-3 py-2 text-[12px] font-extrabold uppercase tracking-[0.04em] text-yellow no-underline transition-all duration-300 hover:border-yellow hover:bg-yellow hover:text-primary"
                  >
                    View these <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </Link>
                </article>
                {row.subs.map((sub, subIndex) => (
                  <article
                    key={sub.name}
                    className={`grid gap-3 border-t border-primary/8 px-5 py-4 transition-colors duration-300 hover:bg-primary/[0.04] min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1.35fr)_140px] min-[900px]:items-center min-[900px]:gap-5 ${
                      subIndex % 2 === 1 ? 'bg-primary/[0.03]' : 'bg-white'
                    }`}
                  >
                    <h4 className="m-0 text-[16px] font-bold leading-tight min-[900px]:border-l-2 min-[900px]:border-primary/15 min-[900px]:pl-4">
                      <span className="mb-1.5 inline-block text-[10px] font-extrabold uppercase tracking-[0.08em] text-primary/40">
                        Related
                      </span>
                      <span className="mt-1 block">{sub.name}</span>
                    </h4>
                    <p className="m-0 text-[15px] leading-[1.65] text-primary/80">
                      <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-primary/40 min-[900px]:hidden">What it is</span>
                      {sub.what}
                    </p>
                    <p className="m-0 text-[15px] leading-[1.65] text-primary/80">
                      <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-primary/40 min-[900px]:hidden">What people use it for</span>
                      {sub.uses}
                    </p>
                    <Link
                      to={sub.to}
                      className="group/btn inline-flex w-fit items-center gap-1.5 border border-accent/30 px-3 py-2 text-[12px] font-extrabold uppercase tracking-[0.04em] text-accent no-underline transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white"
                    >
                      View these <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                    </Link>
                  </article>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-primary/15 bg-white px-5 py-6">
            <p className="m-0 max-w-[640px] text-[16px] leading-[1.7] text-primary/85">
              The full lot is longer than this table. New and used units are added when they are tagged. Open every line, or call and tell us the job. We will point you at the right row.
            </p>
            <Link to="/equipment" className="cta-box px-6 py-3 text-[14px]">
              View all machines
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
