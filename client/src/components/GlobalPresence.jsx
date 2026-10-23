import { useState } from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import Reveal from './Reveal';
import { CONTACT } from '../data/contact';

/** Yards and desk lines published on About / contact — no invented street addresses or fake phones. */
const offices = [
  {
    id: 'sheridan',
    name: 'Sheridan',
    region: 'Wyoming',
    country: 'United States',
    kind: 'Headquarters',
    address: CONTACT.addressOneLine,
    query: '30 N Gould Street Sheridan WY 82801',
    lat: 44.7972,
    lng: -106.9562,
    phone: CONTACT.sheridan.display,
    zone: 'MT · UTC-7',
    facts: [
      { value: CONTACT.sinceLine, label: 'Desk founded' },
      { value: CONTACT.tollFree.display, label: 'Toll free' },
      { value: 'HQ', label: 'Main yard' },
    ],
  },
  {
    id: 'long-island',
    name: 'Long Island',
    region: 'New York',
    country: 'United States',
    kind: 'Main desk line',
    address: 'Long Island, NY — call for directions',
    query: 'Long Island NY',
    lat: 40.7891,
    lng: -73.135,
    phone: CONTACT.longIsland.display,
    zone: 'ET · UTC-5',
    facts: [
      { value: '516', label: 'Area code' },
      { value: CONTACT.longIsland.display, label: 'Local line' },
      { value: CONTACT.tollFree.display, label: 'Toll free' },
    ],
  },
  {
    id: 'waco',
    name: 'Waco',
    region: 'Texas',
    country: 'United States',
    kind: 'Yard',
    address: 'Waco, Texas — stock yard',
    query: 'Waco TX',
    lat: 31.5493,
    lng: -97.1467,
    phone: CONTACT.tollFree.display,
    zone: 'CT · UTC-6',
    facts: [
      { value: 'TX', label: 'State' },
      { value: CONTACT.tollFree.display, label: 'Desk line' },
      { value: 'Yard', label: 'Tagged stock' },
    ],
  },
  {
    id: 'lubbock',
    name: 'Lubbock',
    region: 'Texas',
    country: 'United States',
    kind: 'Yard',
    address: 'Lubbock, Texas — stock yard',
    query: 'Lubbock TX',
    lat: 33.5779,
    lng: -101.8552,
    phone: CONTACT.tollFree.display,
    zone: 'CT · UTC-6',
    facts: [
      { value: 'TX', label: 'State' },
      { value: CONTACT.tollFree.display, label: 'Desk line' },
      { value: 'Yard', label: 'Tagged stock' },
    ],
  },
  {
    id: 'amarillo',
    name: 'Amarillo',
    region: 'Texas',
    country: 'United States',
    kind: 'Yard',
    address: 'Amarillo, Texas — stock yard',
    query: 'Amarillo TX',
    lat: 35.222,
    lng: -101.8313,
    phone: CONTACT.tollFree.display,
    zone: 'CT · UTC-6',
    facts: [
      { value: 'TX', label: 'State' },
      { value: CONTACT.tollFree.display, label: 'Desk line' },
      { value: 'Yard', label: 'Tagged stock' },
    ],
  },
  {
    id: 'des-moines',
    name: 'Des Moines',
    region: 'Iowa',
    country: 'United States',
    kind: 'Yard',
    address: 'Des Moines, Iowa — stock yard',
    query: 'Des Moines IA',
    lat: 41.5868,
    lng: -93.625,
    phone: CONTACT.tollFree.display,
    zone: 'CT · UTC-6',
    facts: [
      { value: 'IA', label: 'State' },
      { value: CONTACT.tollFree.display, label: 'Desk line' },
      { value: 'Yard', label: 'Tagged stock' },
    ],
  },
  {
    id: 'salinas',
    name: 'Salinas',
    region: 'California',
    country: 'United States',
    kind: 'Yard',
    address: 'Salinas, California — stock yard',
    query: 'Salinas CA',
    lat: 36.6777,
    lng: -121.6555,
    phone: CONTACT.tollFree.display,
    zone: 'PT · UTC-8',
    facts: [
      { value: 'CA', label: 'State' },
      { value: CONTACT.tollFree.display, label: 'Desk line' },
      { value: 'Yard', label: 'Tagged stock' },
    ],
  },
];

function kindClass(kind) {
  if (kind === 'Headquarters') return 'bg-accent text-white';
  return 'bg-primary text-white';
}

export default function GlobalPresence() {
  const [activeId, setActiveId] = useState(offices[0].id);
  const office = offices.find((item) => item.id === activeId) ?? offices[0];
  const pad = 0.018;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${office.lng - pad}%2C${office.lat - pad}%2C${office.lng + pad}%2C${office.lat + pad}&layer=mapnik&marker=${office.lat}%2C${office.lng}`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.query)}`;

  return (
    <section id="global-presence" className="bg-white text-primary py-[80px] min-[1800px]:py-[110px]">
      <div className="content-wrap">
        <Reveal className="mx-auto mb-12 max-w-[760px] text-center">
          <span className="mx-auto mb-4 block h-[3px] w-10 bg-accent" />
          <p className="m-0 section-kicker text-[11px] font-extrabold uppercase tracking-[1.8px]">Yards &amp; desk lines</p>
          <h2 className="m-0 mt-3 text-[24px] font-black leading-[1.1] tracking-[-0.5px] min-[640px]:text-[32px] min-[993px]:text-[38px] min-[1600px]:text-[42px]">
            Published yards,
            <span className="block text-primary">same desk numbers</span>
          </h2>
          <p className="m-0 mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.7] text-primary/80">
            Sheridan holds the main desk at {CONTACT.addressOneLine}. Call Long Island at {CONTACT.longIsland.display}, Sheridan at{' '}
            {CONTACT.sheridan.display}, or toll free {CONTACT.tollFree.display}. Yard cities below are where stock is tagged; street directions for those lots come from the desk when you book freight.
          </p>
        </Reveal>

        <div className="grid items-start gap-4 min-[993px]:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <Reveal className="flex flex-col gap-3">
            {offices.map((item) => {
              const selected = item.id === office.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`flex items-center gap-4 rounded-2xl border bg-white px-4 py-4 text-left cursor-pointer shadow-[0_8px_20px_rgb(2_70_46/0.04)] transition-colors duration-200 ${
                    selected ? 'border-primary' : 'border-primary/10 hover:border-primary/30'
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                      selected ? 'bg-accent text-white' : 'bg-mint text-primary'
                    }`}
                  >
                    <MapPin size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[16px] font-black leading-tight">
                      {item.name}{' '}
                      <span className="font-semibold text-primary/50">{item.country}</span>
                    </span>
                    <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.6px] ${kindClass(item.kind)}`}>
                      {item.kind}
                    </span>
                  </span>
                </button>
              );
            })}
          </Reveal>

          <Reveal delay={120} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-[0_16px_36px_rgb(2_70_46/0.06)] min-[993px]:p-7">
            <div key={office.id} className="animate-[step-in_0.35s_ease]">
              <div className="grid gap-6 min-[993px]:grid-cols-[minmax(0,1fr)_minmax(220px,280px)]">
                <div>
                  <p className="m-0 section-kicker text-[11px] font-extrabold uppercase tracking-[1.6px]">{office.kind}</p>
                  <h3 className="m-0 mt-3 text-[30px] font-black leading-[0.95] tracking-[-0.6px] min-[640px]:text-[36px] min-[993px]:text-[48px]">
                    {office.name}
                    <span className="text-primary/35"> —</span>
                    <span className="mt-1 block">
                      {office.region}{' '}
                      <span className="text-[18px] font-semibold text-primary/50 min-[993px]:text-[22px]">{office.country}</span>
                    </span>
                  </h3>

                  <ul className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
                    <li className="flex items-start gap-3 text-[14px] leading-[1.45]">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-white">
                        <MapPin size={15} />
                      </span>
                      <span className="pt-1">{office.address}</span>
                    </li>
                    <li className="flex items-center gap-3 text-[14px]">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-white">
                        <Phone size={15} />
                      </span>
                      <span>{office.phone}</span>
                    </li>
                    <li className="flex items-center gap-3 text-[14px]">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-white">
                        <Clock size={15} />
                      </span>
                      <span>{office.zone}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="h-[190px] overflow-hidden rounded-xl border border-primary/10 bg-primary min-[993px]:h-[210px]">
                    <iframe
                      key={office.id}
                      title={`Map of ${office.name}`}
                      src={mapSrc}
                      className="h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex text-[13px] font-extrabold text-primary no-underline transition-colors duration-200 hover:text-accent"
                  >
                    Open Google Map →
                  </a>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-primary/10 pt-6">
                {office.facts.map((stat) => (
                  <div key={stat.label}>
                    <p className="m-0 text-[18px] font-black leading-none text-primary min-[993px]:text-[22px] break-words">{stat.value}</p>
                    <p className="m-0 mt-2 text-[12px] text-primary/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
