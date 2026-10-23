import Reveal from './Reveal';

const rowA = [
  { name: 'Mark D.', place: 'Lincoln, NE', quote: 'Ordered the 30x40 container shelter for our Nebraska farm. Delivery was exceptionally fast and framing build quality is top tier.', color: '#02462E' },
  { name: 'Jason T.', place: 'Boise, ID', quote: 'The skid steer brush cutter plowed through 3 acres of thick brush without a hitch. Incredible hydraulic efficiency.', color: '#FEC700' },
  { name: 'Robert K.', place: 'Des Moines, IA', quote: 'Reliable dealer support and great warranty coverage. Highly recommend Farm Exchange to any commercial operation.', color: '#c82425' },
  { name: 'Elena V.', place: 'Fresno, CA', quote: 'The irrigation pump held pressure through a full almond set. The yard tag matched the drawing we signed.', color: '#02462E' },
  { name: 'Carl M.', place: 'Amarillo, TX', quote: 'Wind came through at the published rating and the shelter bay stayed square. That pull test was worth it.', color: '#FEC700' },
];

const rowB = [
  { name: 'Hannah P.', place: 'Fargo, ND', quote: 'Freight landed at the farm lane, not a terminal two counties over. The driver called before he turned in.', color: '#c82425' },
  { name: 'Owen S.', place: 'Lexington, KY', quote: 'Spare blade was on the shelf the week a rock took a chip out of the cutter. No waiting on a factory.', color: '#02462E' },
  { name: 'Priya N.', place: 'Yuma, AZ', quote: 'We run three shelters now. Same jig, same span, same wind number on every tag. Easy to add a bay.', color: '#FEC700' },
  { name: 'Luis G.', place: 'Salinas, CA', quote: 'Account manager answered on a Saturday about hitch class. The quote was in writing before Monday.', color: '#c82425' },
  { name: 'Ruth A.', place: 'Billings, MT', quote: 'Assembly video matched the crate. Two of us had the frame standing before the truck was off the place.', color: '#02462E' },
];

function initials(name) {
  return name
    .split(' ')
    .filter((part) => /[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function Card({ item, className = '', compact = false }) {
  return (
    <article
      className={`shrink-0 rounded-[14px] border border-primary/10 bg-white shadow-[0_10px_24px_rgb(2_70_46/0.05)] ${
        compact ? 'p-3' : 'p-4'
      } ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`grid shrink-0 place-items-center rounded-full font-semibold ${
            compact ? 'h-8 w-8 text-[11px]' : 'h-9 w-9 text-xs'
          }`}
          style={{ backgroundColor: item.color, color: item.color === '#FEC700' ? '#02462E' : '#FEC700' }}
        >
          {initials(item.name)}
        </span>
        <div className="min-w-0">
          <p className={`m-0 font-semibold leading-tight text-primary ${compact ? 'text-[13px]' : 'text-sm'}`}>{item.name}</p>
          <p className="m-0 mt-0.5 text-xs font-normal text-primary/55">{item.place}</p>
        </div>
      </div>
      <p className={`m-0 mt-2.5 font-normal leading-relaxed text-primary/80 ${compact ? 'text-[12px]' : 'mt-3 text-sm'}`}>{item.quote}</p>
    </article>
  );
}

function HorizontalLane({ items, animationClass }) {
  return (
    <div
      className="t-row overflow-hidden py-2"
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 16px, #000 calc(100% - 16px), transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 16px, #000 calc(100% - 16px), transparent)',
      }}
    >
      <div className={`flex w-max ${animationClass}`}>
        {[items, items].map((set, copy) => (
          <div key={copy} className="flex gap-4 pr-4" aria-hidden={copy === 1 ? true : undefined}>
            {set.map((item) => (
              <Card key={`${item.name}-${copy}`} item={item} className="w-[260px] min-[1280px]:w-[320px] min-[1920px]:w-[400px] min-[2400px]:w-[480px]" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialRails() {
  const all = [...rowA, ...rowB];

  return (
    <section className="bg-white py-16 text-primary font-sans">
      <Reveal className="content-wrap mb-10 text-center">
        <p className="section-kicker m-0 text-xs font-semibold uppercase tracking-[1px]">Social proof</p>
        <h2 className="m-0 mt-2 text-[22px] min-[640px]:text-[30px] min-[1600px]:text-[40px] min-[2400px]:text-[52px] font-bold tracking-[-0.4px]">Trusted by American farmers</h2>
      </Reveal>

      <ul className="content-wrap hidden list-none grid-cols-1 gap-4 min-[1800px]:grid-cols-3 motion-reduce:grid sm:grid-cols-2">
        {all.map((item) => (
          <li key={item.name} className="min-w-0">
            <Card item={item} className="w-full" />
          </li>
        ))}
      </ul>

      <div className="content-wrap min-w-0 motion-reduce:hidden">
        <div className="hidden min-[768px]:block overflow-hidden">
          <HorizontalLane items={rowA} animationClass="t-left" />
          <HorizontalLane items={rowB} animationClass="t-right" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory min-[768px]:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {all.map((item) => (
            <Card key={item.name} item={item} compact className="w-[200px] min-[480px]:w-[220px] snap-start" />
          ))}
        </div>
      </div>
    </section>
  );
}
