import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const services = [
  {
    n: '01',
    title: 'Buy from the lot',
    to: '/equipment',
    action: 'Browse equipment',
    paragraphs: [
      'A purchase here is a unit that already has a yard number. Container shelters, metal sheds, tractors, skid iron, greenhouses, pumps, and the parts that keep them working are tagged before a truck is booked. Wind rating, hitch class, hours, span, and gallons sit on the listing a buyer reads in the morning and on the sheet the desk uses that afternoon.',
      'The price is written. Freight is named with it, liftgate or flatbed, the lane, and the gate. If a loader is not on the tractor, it is not implied. If a cover is rolled and banded, the listing says so. Pay now and add to cart start from that same card, and a person on the toll-free line can confirm the serial before the unit moves.',
    ],
  },
  {
    n: '02',
    title: 'Rent for the season',
    to: '/contact',
    action: 'Ask the desk',
    paragraphs: [
      'Some acres need a machine for a cut, a plant, or a stretch of hot weeks, not for the next ten years. Rental is quoted against the same tagged inventory. The desk names the unit, the hours already on it, the window it can leave, and the day it has to be back on the yard. A renter does not get a brochure machine that still has to be found.',
      'The written note covers delivery to the farm lane, what is included, and what is the renter’s to return in the same condition. If the gate will not take the truck, that is said before the unit is promised. Call with the acre, the dates, and the hitch or the span, and the price goes out the same day.',
    ],
  },
  {
    n: '03',
    title: 'Lease with a written term',
    to: '/contact',
    action: 'Ask the desk',
    paragraphs: [
      'A lease is for a farm or a contractor that wants the machine on the place for a named term without buying it outright. The term, the payment, the hours allowed, and who holds the service are written before anyone signs. The unit is still one that sits on a USA lot, with a serial the desk can read back.',
      'At the end of the term the sheet already says what happens: return to the yard, buy the remainder, or extend. Freight both ways is part of that conversation, not a line added after the first payment. Dealers and growers get the same term sheet.',
    ],
  },
  {
    n: '04',
    title: 'Barter against iron you already own',
    to: '/contact',
    action: 'Ask the desk',
    paragraphs: [
      'A clean trade starts with two machines that can be described. Tell the desk what you are bringing in, the hours, the hitch or the span, and what you want off the lot. We look at both against the tagged price, not against a guess made on the phone.',
      'If the incoming unit has to be seen on the yard before a number is final, the note says that. If the difference is cash plus freight, both numbers are written. Barter is not a handshake that changes when the truck arrives. It is a sheet with two serials and one balance.',
    ],
  },
  {
    n: '05',
    title: 'Repair on the lines we sell',
    to: '/contact',
    action: 'Call the desk',
    paragraphs: [
      'Repair is for the shelters, sheds, tractors, skid tools, houses, and pumps that left our yards. The desk needs the yard number or the serial, what failed, and whether the unit is still on the farm. From that, a person who knows the line can say if it is a part, a visit, or a unit that should come back.',
      'We do not take on iron we have never tagged and then pretend the drawing is on the shelf. If the failure is a blade, a vent, a seal, or a hose we stock, it can ship. If the frame has to be looked at, the freight back to the yard is named before the unit moves. The same number stays on the account after the repair.',
    ],
  },
  {
    n: '06',
    title: 'Parts that match the tag',
    to: '/equipment?line=parts',
    action: 'Open parts',
    paragraphs: [
      'Blades, vents, pump seals, couplers, and the small iron that keeps a sold unit working stay on the shelf for the lines we carry. A part is listed with the machine it belongs to, not as a bin of hardware with no name. If it is out, the desk says so instead of taking an order that cannot ship.',
      'Parts orders use the same freight habit as a whole unit. The lane, the gate, and whether it is a small parcel or a flatbed are written. A dealer stocking a line and a farmer who broke a cutter on Tuesday use the same counter. The toll-free line can match a serial to the shelf while the crew is still in the field.',
    ],
  },
  {
    n: '07',
    title: 'Freight to the farm lane',
    to: '/dealers',
    action: 'See the yards',
    paragraphs: [
      'Nothing on this lot is sold as if the truck were someone else’s problem. Liftgate or flatbed, the route, and the gate are part of the written price. Direct to farm and job site is the normal path, not a terminal two counties over unless the note says that is the stop.',
      'Volume and dealer loads are quoted inside two hours when the count and the destination are known. If a shelter will not fit the lane, or a pump needs a dock the farm does not have, that is said before the unit is banded. The driver calls before the turn-in. The desk still has the yard number when the truck is on the road.',
    ],
  },
  {
    n: '08',
    title: 'A dealer desk, one price sheet',
    to: '/dealers',
    action: 'Dealer yards',
    paragraphs: [
      'Sales points across the USA share one toll-free line and one written dealer cost. Hitch class, span, and the freight window go out the same day the application is complete. A dealer does not keep a private version of the equipment list. The farmer and the store read the same tag.',
      'Becoming a dealer is a short path: the name, the state, and the lines you want to stock, then a desk review, then a first truck that leaves with a yard number. Parts for that line stay available after the unit lands. An account manager remains on the load, including bulk orders for a commercial crew.',
    ],
  },
  {
    n: '09',
    title: 'Warranty and the season after',
    to: '/about',
    action: 'About the desk',
    paragraphs: [
      'A standard 12-month structural and manufacturer warranty covers the build we sell. Extended commercial protection can be named at the same time as the price, not invented after a failure. The warranty is tied to the serial on the yard tag, so a claim has a machine, a date, and a person.',
      'The service does not end when the truck pulls off the lane. Assembly notes and the video that matches the crate stay with the sale. If a leg is out of square, it does not get a tag in the first place. If something that did leave the jig needs a part in season, the shelf and the same phone number are still there.',
    ],
  },
];

export default function ServicesDesk() {
  return (
    <section id="services" className="section-y bg-primary text-white">
      <div className="content-wrap">
        <Reveal>
          <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Services</p>
          <h2 className="section-title m-0 mt-2 text-[26px] font-black uppercase leading-[1.05] min-[640px]:text-[36px] min-[1600px]:text-[44px]">
            What the desk will actually do
          </h2>
        </Reveal>
        <div className="prose-rail prose-rail-on-dark prose-rail-wide mt-8 text-[16px] leading-[1.85] min-[993px]:text-[18px] min-[1920px]:text-[20px]">
          <p className="m-0">
            Farm Exchange is a yard and a phone line, not a menu of promises. Every service below uses the same habit: a unit or a part that can be named, a price in writing, and a freight window that includes the lane and the gate. Buyers, renters, and dealers read one sheet. If the work cannot be done from stock we already tag, the desk says that before a truck is booked.
          </p>
          <p className="m-0">
            The lines are container shelters, metal sheds, tractors and mowers, skid steer attachments, greenhouses, irrigation, and the parts that belong to them. Around those lines the desk will sell, rent, lease, barter, repair, ship, and stay on the account after the season starts. The toll-free number is 1-800-224-8005. A note with the serial, the state, and what you need is enough to start.
          </p>
        </div>

        <div className="mt-12 border-t border-primary/20">
          {services.map((service, index) => (
            <Reveal key={service.n} delay={index * 40}>
              <article className="grid gap-4 border-b border-primary/15 py-8 min-[860px]:grid-cols-[88px_minmax(0,1fr)] min-[860px]:gap-8 min-[1200px]:grid-cols-[100px_minmax(0,1fr)_auto] min-[1200px]:items-start min-[1600px]:py-10">
                <p className="m-0 text-[13px] font-black tracking-[0.14em] text-yellow min-[1600px]:text-[15px]">{service.n}</p>
                <div className="prose-rail prose-rail-on-dark">
                  <h3 className="m-0 text-[22px] font-black uppercase leading-tight text-white min-[640px]:text-[26px] min-[1920px]:text-[32px]">{service.title}</h3>
                  {service.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="m-0 mt-3 text-[15px] leading-[1.8] text-white/80 min-[1600px]:text-[17px]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <Link
                  to={service.to}
                  className="mt-1 inline-flex w-fit shrink-0 items-center whitespace-nowrap border border-white px-3.5 py-2 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white no-underline transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-yellow hover:bg-yellow hover:text-primary min-[1200px]:mt-1"
                >
                  {service.action}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
