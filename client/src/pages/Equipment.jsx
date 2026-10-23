import { Link, useSearchParams } from 'react-router-dom';
import ProductBrowser from '../components/ProductBrowser';
import Reveal from '../components/Reveal';
import ImageHoverCaption from '../components/ImageHoverCaption';
import { catalogLines, products } from '../data/catalog';
import shelterFrame from '../public/machinery/shelter-dome.jpg';
import shopTractors from '../public/shop.jpg';
import heroTractor from '../public/Hero images/hero-tractor.jpg';
import brushCutter from '../public/machinery/brush.jpg';
import greenhouseHouse from '../public/machinery/greenhouse.jpg';
import dieselPump from '../public/machinery/pump.jpg';
import cultTractor from '../public/Hero images/Tractor Cultivating Green Crop Rows.png';

const categories = [
  {
    id: 'shelters',
    name: 'Container shelters',
    image: shelterFrame,
    alt: 'A container shelter frame with a heavy cover on a farm lot',
    paragraphs: [
      'A container shelter is a steel arch and a heavy cover. It turns a shipping container, or an open pad, into a roofed bay. Farmers use them to keep a tractor out of the rain, to store hay and seed, and to give a crew a wind break at the edge of the yard.',
      'On this lot you will see 20ft, 30ft, and 40ft spans. The wind number is on the tag. The cover is rolled and banded for the truck. If doors are included, the card says so. Open the shelters line to read every yard number we have tagged this week.',
    ],
  },
  {
    id: 'sheds',
    name: 'Metal sheds',
    image: shopTractors,
    alt: 'Farm equipment parked under and beside metal shed buildings',
    paragraphs: [
      'A metal shed is a framed building with a door. It is sold as a bay you can stand a machine inside. Tool bays hold hand tools and a mower. Hay bays take a wagon. Skid-steer bays are tall enough for a compact loader to drive in and turn.',
      'Snow load and door height are written on the card. The anchor kit is named when it is in the crate. A shed is not a shelter. A shelter is an open arch. A shed is a building. Pick the one that matches how you work the place.',
    ],
  },
  {
    id: 'tractors',
    name: 'Tractors and mowers',
    image: heroTractor,
    alt: 'A farm tractor working a green field',
    paragraphs: [
      'Tractors are the pulling machines. Compact sizes fit a tight gate. Utility sizes handle daily chores. Row and field sizes pull heavier wagons and longer implements. Hours, hitch, and horsepower stay on the card. If a loader is not on the unit, the listing says so.',
      'Mowers hang on the tractor or ride as their own deck. Finish mowers keep a yard neat. Rotary cutters knock down brush and stalks. Flail mowers chop finer residue. Match the PTO speed and the width to the tractor you already own, or ask the desk to name a pair.',
    ],
  },
  {
    id: 'skid',
    name: 'Skid steers and tools',
    image: brushCutter,
    alt: 'A brush cutter attachment for a skid steer',
    paragraphs: [
      'A skid steer is a compact loader. The tools lock onto the plate. Brush cutters clear fence rows. Augers dig post holes. Buckets and forks move dirt and pallets. Grapples and bale spears grab what a bucket cannot hold.',
      'Oil flow and plate type have to match your machine. Those numbers are on the tag. Soil tools such as plate compactors, rammers, and tillers sit with this line on our lot. They pack a pad or break a garden block without a full-size tractor.',
    ],
  },
  {
    id: 'greenhouse',
    name: 'Greenhouses',
    image: greenhouseHouse,
    alt: 'A polycarbonate greenhouse on a farm yard',
    paragraphs: [
      'A greenhouse is a covered house for plants. Twin-wall houses use polycarbonate panels. Gothic houses shed snow with a peaked arch. Tunnel houses are lighter and faster to stand up on a bed you already have.',
      'Snow load, length, and whether a vent or a bench kit is in the crate are written on the card. Growers use these houses to start transplants, hold a crop out of hail, and stretch a short northern season. Open the greenhouse line to see what is tagged.',
    ],
  },
  {
    id: 'irrigation',
    name: 'Irrigation and pumps',
    image: dieselPump,
    alt: 'A diesel irrigation pump on the lot',
    paragraphs: [
      'Irrigation on this lot means pumps, hose, filters, and sprinkler sets that already have a yard number. Diesel pumps hold pressure on a long day. Gas transfer pumps move water a short distance. PTO pumps run off the tractor you already own.',
      'Layflat, guns, and drip line put the water on the crop. Gallons per minute are the number that matters. Match the hose diameter to the pump outlet. Filters matter more on a drip line than on a big gun. Call if the span length is known and you need a written match.',
    ],
  },
  {
    id: 'parts',
    name: 'Parts and implements',
    image: cultTractor,
    alt: 'A tractor cultivating green crop rows',
    paragraphs: [
      'Parts are the wear pieces: blades, seals, vents, couplers, and hose ends for the lines we sell. Each part is tied to a machine, not sold as a mystery bin. Implements hitch to the tractor: cultivators, box blades, and wagon gear.',
      'Have the yard number or the serial when you order. Size has to match the deck or the pump. Small parts ship as a parcel. Longer iron is named as freight. Open the parts line for what is on the shelf this week.',
    ],
  },
];

export default function Equipment() {
  const [params, setParams] = useSearchParams();
  const requested = params.get('line') || 'all';
  const line = catalogLines.some((item) => item.id === requested) ? requested : 'all';

  const setLine = (id) => {
    const next = new URLSearchParams(params);
    if (id === 'all') next.delete('line');
    else next.set('line', id);
    setParams(next);
  };

  return (
    <>
      <section className="bg-white pb-16 pt-8 text-primary">
        <div className="content-wrap content-wrap-lot">
          <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">The lot</p>
          <h1 className="m-0 mt-2 text-[26px] font-black uppercase leading-tight min-[480px]:text-[30px] min-[640px]:text-[40px] min-[1920px]:text-[52px] min-[2400px]:text-[64px]">Equipment</h1>
          <p className="m-0 mt-3 max-w-[640px] text-[15px] leading-[1.7] text-primary/75">
            Shelters, sheds, tractors, skid iron, greenhouses, irrigation, and parts. Every card is a unit with a yard number, a price, and a way to buy it. Filter the line, then add it to the cart or pay now.
          </p>
          <ProductBrowser products={products} line={line} onLine={setLine} />
        </div>
      </section>

      <section id="equipment-guide" className="section-y border-t border-primary/10 bg-primary text-white">
        <div className="content-wrap">
          <Reveal>
            <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Know the line</p>
            <h2 className="section-title m-0 mt-3 text-[26px] font-black leading-[1.15] min-[640px]:text-[34px] min-[1600px]:text-[40px]">
              Main equipment categories
            </h2>
          </Reveal>
          <p className="prose-rail prose-rail-on-dark prose-rail-wide m-0 mt-5 text-[17px] leading-[1.8] min-[1600px]:text-[19px]">
            The cards above are the units on the yard today. The guide below explains each main line in plain words. Read the name, look at a typical photo, and learn what that iron is for. Then open that line to see every tagged machine.
          </p>

          <div className="mt-12 flex flex-col gap-14 min-[993px]:gap-20">
            {categories.map((category, index) => {
              const imageFirst = index % 2 === 0;
              return (
                <article key={category.id} className="grid items-center gap-8 min-[993px]:grid-cols-2 min-[993px]:gap-12">
                  <Reveal className={imageFirst ? '' : 'min-[993px]:order-2'}>
                    <div className="group relative overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.alt}
                        className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] min-[768px]:h-[340px] min-[1600px]:h-[420px]"
                      />
                      <ImageHoverCaption kicker="Category" title={category.name} body={category.paragraphs[0]} />
                    </div>
                  </Reveal>
                  <Reveal delay={80} className={imageFirst ? '' : 'min-[993px]:order-1'}>
                    <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">Category</p>
                    <h3 className="m-0 mt-2 text-[22px] font-black leading-tight min-[640px]:text-[28px] min-[1920px]:text-[34px]">
                      {category.name}
                    </h3>
                    <div className="prose-rail prose-rail-on-dark mt-4 text-[16px] leading-[1.8] min-[1600px]:text-[18px]">
                      {category.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 28)} className="m-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <Link
                      to={`/equipment?line=${category.id}`}
                      className="mt-5 inline-block text-[13px] font-extrabold uppercase tracking-[0.04em] text-yellow no-underline transition-colors hover:text-white"
                    >
                      View {category.name.toLowerCase()}
                    </Link>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
