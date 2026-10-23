import { Link } from 'react-router-dom';
import AboutUs from '../components/AboutUs';
import HistoryEvolution from '../components/HistoryEvolution';
import AboutExtra from '../components/AboutExtra';
import SectionRule from '../components/SectionRule';
import ImageHoverCaption from '../components/ImageHoverCaption';
import cornRows from '../public/Hero images/corn-field2.jpg';
import yellowField from '../public/Hero images/corn-field3.jpg';
import harvestedRows from '../public/Hero images/corn-field7.webp';

const points = [
  ['The tag', 'Wind rating, hitch class, hours, and a yard number sit on the listing before a truck is booked.'],
  ['The desk', 'One toll-free line for farmers and dealers. A written price goes out the same day.'],
  ['The truck', 'Liftgate or flatbed, with the lane named. Freight is not a guess after the sale.'],
  ['The shelf', 'Blades, vents, and pump parts for the lines we sell stay in stock after the unit lands.'],
];

export default function About() {
  return (
    <div className="bg-white text-primary">
      <section className="content-wrap pb-6 pt-8 min-[993px]:pb-8 min-[993px]:pt-10">
        <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">The company</p>
        <h1 className="heading-fit m-0 mt-2 text-[clamp(1.5rem,4vw,4rem)] font-black uppercase leading-tight">About Farm Exchange</h1>
        <p className="m-0 mt-3 max-w-[680px] text-[14px] leading-[1.7] text-primary/75 min-[640px]:text-[15px]">
          Farm Exchange is a USA lot and a desk. Container shelters, sheds, tractors, skid iron, greenhouses, irrigation, and the parts that keep them working are tagged in the yard, then sold with a freight plan to the gate.
        </p>
        <div className="mt-6 grid gap-3 min-[640px]:mt-8 min-[640px]:gap-4 min-[768px]:grid-cols-2 min-[1100px]:grid-cols-4">
          {points.map(([title, body]) => (
            <article
              key={title}
              className="card-lift group border border-primary/15 bg-white p-4 transition-colors duration-300 hover:border-primary hover:bg-primary"
            >
              <h2 className="m-0 text-[15px] font-black uppercase transition-colors duration-300 group-hover:text-yellow">
                {title}
              </h2>
              <p className="m-0 mt-2 text-[13px] leading-[1.65] text-primary/75 transition-colors duration-300 group-hover:text-white/85">
                {body}
              </p>
            </article>
          ))}
        </div>
        <Link to="/equipment" className="mt-6 inline-block text-[13px] font-extrabold uppercase text-accent no-underline">
          Browse the equipment
        </Link>
        <div className="prose-rail prose-rail-wide mt-10 text-[16px] leading-[1.85] text-primary/80 min-[640px]:text-[18px] min-[993px]:text-[20px] min-[1920px]:text-[24px] min-[2400px]:text-[28px]">
          <p className="m-0">
            A buyer in Texas and a dealer in Iowa read the same sheet. The span, the hitch class, the hours, and the wind rating are written before anyone asks for a price. If a shelter will not hold the number on the drawing, it stays on the jig. If a tractor’s PTO has not been checked on the lot, it does not get a yard tag. The equipment list is the lot, not a brochure of machines that still have to be built. Every unit that leaves the yard already has a yard number, a serial, and a person who can say what is on the machine and what is not. A cover that is rolled and banded is listed that way. A loader that is not on the tractor is not implied. The sheet a farmer reads in the morning is the same sheet the desk uses when the truck is booked that afternoon.
          </p>
          <p className="m-0">
            Freight is named with the sale. Liftgate or flatbed, the lane, and the gate are part of the written price, so the truck is not a surprise after the unit is paid for. The same desk stays on the account once it lands. Blades, vents, and pump parts for the lines we sell remain on the shelf, and the toll-free line is answered by people who can talk hitch class and a bulk load in the same call. A dealer in one state and a grower in another get the price in writing the same day, with the freight window named. If the gate will not take the truck, that is said before the unit moves, not after it is on the road. The work does not end when the truck pulls off the farm lane. The shelf still has the blade, the vent, and the pump part, and the same number still answers.
          </p>
        </div>
      </section>

      <section className="section-y bg-white text-primary">
        <div className="content-wrap grid items-stretch gap-5 min-[640px]:gap-8 min-[993px]:grid-cols-2 min-[993px]:gap-12">
          <div className="group relative h-full min-h-[200px] overflow-hidden min-[768px]:min-h-[320px]">
            <img
              src={cornRows}
              alt="Green corn rows running toward a tree line, with mountains under a bright sky"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <ImageHoverCaption
              kicker="01"
              title="A desk and a set of yards"
              body="Sheridan holds the main desk at 30 N GOULD STREET. The rest of the stock sits on USA lots with a yard number."
            />
          </div>
          <div className="min-w-0">
            <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Who we are</p>
            <h2 className="heading-fit m-0 mt-2 text-[clamp(1.35rem,3.2vw,3.5rem)] font-black uppercase leading-tight">A desk and a set of yards</h2>
            <div className="prose-rail mt-4 text-[16px] leading-[1.8] text-primary/80">
              <p className="m-0">
                Farm Exchange is the people who tag the machine and the people who answer the line. Since 1999. Sheridan holds the main desk. Long Island answers at 516-252-8000. Waco, Lubbock, Amarillo, Des Moines, and Salinas hold the rest of the stock. A buyer is not waiting on a factory slot. The shelter, tractor, or pump is already on a USA lot, with a yard number on it.
              </p>
              <p className="m-0">
                We sell what a farmer or a dealer can stand next to: container shelters, sheds, tractors, skid iron, greenhouses, irrigation, and the parts that keep them working. The sheet names the hours, the hitch class, the wind rating, and what is not included. The same sheet is what the desk uses when the truck is booked.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-white">
        <div className="content-wrap">
          <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Why work with us</p>
          <h2 className="m-0 mt-2 max-w-[640px] text-[24px] font-black uppercase leading-tight min-[640px]:text-[36px] min-[1920px]:max-w-[820px] min-[1920px]:text-[46px] min-[2400px]:text-[56px]">The unit, the truck, and the person after</h2>
          <div className="mt-8 grid gap-6 min-[993px]:grid-cols-2">
            <article className="card-lift group overflow-hidden bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={harvestedRows}
                  alt="Harvested corn rows curving across a wide field, seen from above"
                  className="h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] min-[768px]:h-[280px] min-[1600px]:h-[360px] min-[2200px]:h-[440px]"
                />
                <ImageHoverCaption
                  kicker="01"
                  title="Already tagged"
                  body="If it is not on a yard tag, it is not for sale."
                />
              </div>
              <div className="p-5 min-[768px]:p-6 text-primary">
                <h3 className="m-0 text-[18px] font-black uppercase">The unit is already tagged</h3>
                <p className="m-0 mt-3 text-[15px] leading-[1.75] text-primary/80">
                  Ask for the serial, the hours, and a photo of the machine you will receive. If it is not on a yard tag, it is not for sale. A cover that is rolled is listed that way. A loader that is not on the tractor is not implied. You are buying the unit on the lot, not a drawing of one that still has to be built.
                </p>
              </div>
            </article>
            <article className="card-lift group overflow-hidden bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={yellowField}
                  alt="A yellow crop field in the foreground, with farm buildings and mountains beyond"
                  className="h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] min-[768px]:h-[280px] min-[1600px]:h-[360px] min-[2200px]:h-[440px]"
                />
                <ImageHoverCaption
                  kicker="02"
                  title="Freight in the price"
                  body="Liftgate or flatbed, the lane, and the gate are written with the sale."
                />
              </div>
              <div className="p-5 min-[768px]:p-6 text-primary">
                <h3 className="m-0 text-[18px] font-black uppercase">The truck is in the price</h3>
                <p className="m-0 mt-3 text-[15px] leading-[1.75] text-primary/80">
                  Liftgate or flatbed, the lane, and the gate are written with the sale. If the lane cannot take the truck, that is said before the unit moves. After it lands, the same desk stays on the account. Blades, vents, and pump parts for that line stay on the shelf, and the toll-free line still answers.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <AboutUs />
      <SectionRule />
      <HistoryEvolution />
      <SectionRule />
      <AboutExtra />
    </div>
  );
}
