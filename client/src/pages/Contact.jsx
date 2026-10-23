import { Clock, MapPin, Phone } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import ContactExtra from '../components/ContactExtra';

const notes = [
  {
    n: '01',
    title: 'Call when the week matters',
    body: 'One toll-free line covers every yard. A shelter, a tractor, or a pump is quoted in writing the same day, and the freight lane is named with the price. The form is for a note the desk can answer by email. If the season is moving and the truck window matters this week, call 1-800-224-8005. The line is open seven days, Central Time.',
  },
  {
    n: '02',
    title: 'Write the gate into the note',
    body: 'Put the state, the acre, and the yard number or the machine in the message. Hitch class, span, and whether the gate takes a liftgate all change the truck. A dealer asking for volume should name the line and the first delivery window. Parts for that line stay on the shelf after the unit lands, and the same person stays on the account.',
  },
];

const deskFacts = [
  ['Hours', 'Seven days, Central Time on the main desk line.'],
  ['Same day', 'Written price when the facts are enough to quote.'],
  ['After sale', 'Parts and the same number stay on the account.'],
];

const branches = [
  {
    city: 'SHERIDAN, WY',
    role: 'Main desk',
    address: '30 N GOULD STREET, SHERIDAN, WY 82801',
    hours: '7 days · Call the desk',
    stock: 'Main desk, toll free 1-800-224-8005 and 855-686-FARM, Sheridan line 307-207-1777.',
  },
  {
    city: 'Long Island',
    role: 'Long Island main',
    address: 'Long Island desk — call for the gate',
    hours: 'Call 516-252-8000',
    stock: 'Main number for Long Island: 516-252-8000.',
  },
  {
    city: 'Waco, Texas',
    role: 'Skid yard',
    address: '4100 Franklin Ave, Waco, TX 76710',
    hours: 'Mon–Sat · 7:30 a.m.–5:30 p.m. CT',
    stock: 'Skid steers, brush cutters, and coupler kits.',
  },
  {
    city: 'Lubbock, Texas',
    role: 'House and pump yard',
    address: '2211 Avenue A, Lubbock, TX 79401',
    hours: 'Mon–Fri · 8:00 a.m.–5:00 p.m. CT',
    stock: 'Greenhouses and diesel pumps tagged for the plains.',
  },
  {
    city: 'Amarillo, Texas',
    role: 'Irrigation desk',
    address: '1800 S Grand St, Amarillo, TX 79103',
    hours: 'Mon–Sat · 8:00 a.m.–5:00 p.m. CT',
    stock: 'Layflat sets and transfer pumps for a short run.',
  },
  {
    city: 'Des Moines, Iowa',
    role: 'Tractor desk',
    address: '900 E Court Ave, Des Moines, IA 50309',
    hours: 'Mon–Fri · 7:30 a.m.–5:00 p.m. CT',
    stock: 'Row and field tractors with the PTO checked on the lot.',
  },
  {
    city: 'Salinas, California',
    role: 'West coast freight',
    address: '350 Work St, Salinas, CA 93901',
    hours: 'Mon–Fri · 8:00 a.m.–5:00 p.m. PT',
    stock: 'Houses and pumps staged for a coastal lane.',
  },
];

export default function Contact() {
  return (
    <>
      <ContactForm headingLevel="h1" />
      <section className="section-y bg-primary text-white">
        <div className="content-wrap grid gap-6 min-[640px]:gap-8 min-[993px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[993px]:items-stretch min-[993px]:gap-10">
          <div className="flex h-full flex-col">
            <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">The desk</p>
            <h2 className="heading-fit m-0 mt-2 text-[clamp(1.25rem,3.2vw,2.6rem)] font-black uppercase text-white">
              What to send with the note
            </h2>
            <p className="prose-rail prose-rail-on-dark m-0 mt-4 max-w-[420px] text-[15px] leading-[1.7]">
              Two things change the truck: what is on the unit, and whether the gate can take it.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="tel:18002248005" className="cta-box w-fit px-5 py-3 text-[13px]">
                <Phone size={15} /> 1-800-224-8005
              </a>
              <a href="tel:18556863276" className="cta-box w-fit px-5 py-3 text-[13px]">
                <Phone size={15} /> 855-686-FARM
              </a>
              <a href="tel:15162528000" className="cta-box w-fit px-5 py-3 text-[13px]">
                <Phone size={15} /> 516-252-8000
              </a>
              <a href="tel:13072071777" className="cta-box w-fit px-5 py-3 text-[13px]">
                <Phone size={15} /> 307-207-1777
              </a>
            </div>
            <div className="mt-auto space-y-4 border-t border-white/15 pt-6 min-[993px]:mt-10">
              {deskFacts.map(([label, body]) => (
                <div key={label}>
                  <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.08em] text-yellow">{label}</p>
                  <p className="m-0 mt-1 text-[14px] leading-[1.55] text-white/85">{body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {notes.map((note) => (
              <article
                key={note.n}
                className="group flex h-full flex-col border border-white/15 bg-[#034a32] p-5 transition-colors duration-300 hover:border-yellow/50 hover:bg-[#045c3e] min-[640px]:p-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[13px] font-black text-accent">{note.n}</span>
                  <h3 className="m-0 text-[17px] font-black uppercase text-white transition-colors duration-300 group-hover:text-yellow">
                    {note.title}
                  </h3>
                </div>
                <p className="prose-rail prose-rail-on-dark m-0 mt-3 text-[15px] leading-[1.75]">{note.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-white text-primary">
        <div className="content-wrap">
          <div className="max-w-[720px]">
            <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Where to walk the lot</p>
            <h2 className="heading-fit m-0 mt-2 text-[clamp(1.5rem,4vw,3.25rem)] font-black uppercase leading-tight">
              Branches
            </h2>
            <p className="m-0 mt-3 text-[14px] leading-[1.7] text-primary/75 min-[640px]:text-[15px]">
              Six yards, one desk number. Call ahead if you want the unit pulled to the lane.
            </p>
          </div>
          <div className="mt-6 grid gap-3 min-[640px]:mt-8 min-[640px]:gap-4 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
            {branches.map((branch, index) => (
              <article
                key={branch.city}
                className="group flex h-full flex-col border border-primary/15 bg-white p-5 transition duration-300 hover:border-primary hover:bg-primary hover:text-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="m-0 section-kicker text-[11px] font-extrabold uppercase tracking-[0.08em] transition-colors duration-300 group-hover:text-yellow">
                      {branch.role}
                    </p>
                    <h3 className="m-0 mt-1.5 text-[18px] font-black uppercase leading-tight transition-colors duration-300 group-hover:text-white min-[1920px]:text-[22px]">
                      {branch.city}
                    </h3>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center bg-primary text-[12px] font-black text-white transition duration-300 group-hover:bg-yellow group-hover:text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="m-0 mt-3 text-[14px] leading-[1.65] text-primary/75 transition-colors duration-300 group-hover:text-white/85">
                  {branch.stock}
                </p>
                <div className="mt-auto space-y-2 border-t border-primary/10 pt-4 transition-colors duration-300 group-hover:border-white/20">
                  <p className="m-0 flex items-start gap-2 text-[13px] font-semibold text-primary transition-colors duration-300 group-hover:text-white/90">
                    <MapPin size={15} className="mt-0.5 shrink-0 text-accent transition-colors duration-300 group-hover:text-yellow" />
                    <span>{branch.address}</span>
                  </p>
                  <p className="m-0 flex items-start gap-2 text-[13px] font-semibold text-primary transition-colors duration-300 group-hover:text-white/90">
                    <Clock size={15} className="mt-0.5 shrink-0 text-accent transition-colors duration-300 group-hover:text-yellow" />
                    <span>{branch.hours}</span>
                  </p>
                </div>
                <a
                  href="tel:18002248005"
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 border border-primary bg-white px-3 py-2.5 text-[12px] font-extrabold uppercase text-primary no-underline transition duration-200 group-hover:border-yellow group-hover:bg-yellow group-hover:text-primary"
                >
                  <Phone size={13} /> Call this yard
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactExtra />
    </>
  );
}
