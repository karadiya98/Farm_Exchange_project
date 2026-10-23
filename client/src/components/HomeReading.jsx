import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import SectionRule from './SectionRule';
import ImageHoverCaption from './ImageHoverCaption';
import yardTractor from '../public/Hero images/hero-tractor.jpg';
import rowTractor from '../public/dealers/row-tractor.jpg';
import harvestField from '../public/Hero images/Golden Harvest_ Tractor and Cornfield.png';
import shelterBay from '../public/machinery/shelter-dome.jpg';

const differences = [
  {
    n: '01',
    title: 'The card matches the machine',
    body: 'Every listing is written for that one unit. The year, the hours, the price, and the town are on the card before a truck is booked. If a hose, a filter, or a loader is not in the crate, the card says so. You are looking at the machine on our yard, with a number you can read back to us on the phone.',
  },
  {
    n: '02',
    title: 'We speak farm English',
    body: 'The desk talks shelters, sheds, tractors, mowers, skid-steer tools, greenhouses, pumps, and parts. Span, hitch, horsepower, and gallons per minute are everyday words here. You do not have to explain the job twice. Tell us the acre, the gate, and what the machine has to do. We will answer in the same plain words.',
  },
  {
    n: '03',
    title: 'One written sheet for the whole job',
    body: 'The price, the freight, and what is included stay on one sheet. You can read it on a phone, on a computer, or on paper. The person who answers 1-800-224-8005 is looking at that same sheet. If a number changes, we send a new one. We do not change the deal after the truck is loaded.',
  },
  {
    n: '04',
    title: 'You can switch without stopping work',
    body: 'If you have been buying from another yard, you can start here on the next machine you need. Tell us the size and the week you need it. We tag the unit, name the truck, and give you a day. Your old machine can stay in the field until the new one is in the lane. There is no long setup and no day when the phone goes quiet.',
  },
  {
    n: '05',
    title: 'You are free to come back next season',
    body: 'You stay because the machine was right and the truck showed up. Looking at the lot does not lock you into a contract. Buy one pump this month. Buy a row of shelters next spring. Call about a trade when you are ready. The account and the phone number are still here.',
  },
];

const letters = [
  {
    name: 'Mark D.',
    place: 'Lincoln, Nebraska',
    title: 'The shelter fit the note we signed',
    paragraphs: [
      'We needed a 30 by 40 shelter for equipment we were tired of leaving in the weather. I am past the age of driving half a day to kick tires, so I read the card at the kitchen table. The span, the wind number, and the town were all written down. I called and a person read the same numbers back to me.',
      'The truck came to the farm lane, not to a terminal two counties over. The driver called before he turned in. Two of us had the frame going up with the paper that came in the crate. The bay is square, and it matches what we paid for. I would tell a neighbor to call before they order a shelter from a picture with no yard number.',
    ],
  },
  {
    name: 'Robert K.',
    place: 'Des Moines, Iowa',
    title: 'They still answer after the sale',
    paragraphs: [
      'I have bought iron long enough to know the smile ends when the check clears. This desk was different. The warranty words were on the sheet before I said yes. When I had a question the next month, the same phone number picked up. They knew the unit from the yard tag.',
      'I do not want a website that makes me feel clever. I want the hours, the hitch, and a person who will say if a part is on the shelf. That is what I got. I have sent two other farmers to the same line. Both of them are old enough to want the answer in one call.',
    ],
  },
  {
    name: 'Ruth A.',
    place: 'Billings, Montana',
    title: 'The paper matched the crate',
    paragraphs: [
      'We are a small place and we do our own work. The assembly notes matched what was in the crate. We were not hunting for a missing bracket at dusk. The photo on the card was the bay we received, and the freight day was the day they named.',
      'I like that the words are big and plain. I can hand the phone to my husband and he hears the same story I read. No fine print hiding the delivery. If the gate will not take the truck, they say so before you pay. That saved us a bad morning.',
    ],
  },
  {
    name: 'Hannah P.',
    place: 'Fargo, North Dakota',
    title: 'The truck came to the lane',
    paragraphs: [
      'Winter here does not leave much room for a missed delivery. I told them the lane, the gate, and the week we could take the unit. They wrote it down and the truck came in that window. The driver knew which gate. I did not have to stand in the cold redirecting a stranger.',
      'I also asked them to watch for a used mower in our size. A few weeks later they called with one yard number, one price, and the town it sat in. I said no to the first one. They kept the note. The second call was the machine we bought. That is the kind of help I can use.',
    ],
  },
];

const requestSteps = [
  {
    n: '1',
    title: 'Tell us what you need',
    body: 'Share the kind of machine, the size, and the job. A shelter span. A tractor horsepower. A pump in gallons. New or used. The top price you have in mind. It takes a few minutes on the phone or on the contact page. Use your own words. We will write them down the way you said them.',
  },
  {
    n: '2',
    title: 'We keep an eye on the yards',
    body: 'Your note stays open. We watch the lots we already run. If a unit matches, we send the yard number, the price, the hours, and the town. You can say yes or no. If you say no, the note stays open. We do not drop your name because the first machine was not the right one.',
  },
  {
    n: '3',
    title: 'Both sides get a call',
    body: 'If you are selling or trading a machine we can use, we tell you when a buyer has already asked for that kind of iron. You still set the terms with us in writing. Nothing is loaded until both sides have seen the price, the freight, and what is included. A phone call comes before a surprise truck.',
  },
];

const requestReasons = [
  {
    n: '1',
    title: 'You hear when there is a match',
    body: 'The moment a tagged unit fits your note, we call or write. You are not refreshing a page at supper to see if it sold. One message. The yard number is on it. You can ask us to read the hours out loud if you would rather hear it than read it.',
  },
  {
    n: '2',
    title: 'You stay on the place',
    body: 'Looking takes time, and the season does not wait. We do the checking during the week. You read one note instead of ten websites. If you are in the field, leave the request with us and pick up the phone when you are back at the house.',
  },
  {
    n: '3',
    title: 'Asking does not cost extra',
    body: 'There is no fee to put your name on a list. You pay only if you buy, and only the price already written on the sheet. The call to 1-800-224-8005 is the same call you would make about a machine you already see on the lot.',
  },
];

function Prose({ children, onDark = false, className = '' }) {
  return (
    <div
      className={`prose-rail prose-rail-wide text-[17px] leading-[1.8] min-[1600px]:text-[19px] ${
        onDark ? 'prose-rail-on-dark' : 'text-primary/85'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Paragraph({ children }) {
  return <p className="m-0">{children}</p>;
}

export default function HomeReading() {
  return (
    <>
      <section id="buying-desk" className="section-y bg-white text-primary">
        <div className="content-wrap">
          <Reveal>
            <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">For the buyer</p>
            <h2 className="section-title m-0 mt-3 text-[26px] font-black leading-[1.15] min-[640px]:text-[34px] min-[993px]:text-[36px] min-[1600px]:text-[42px]">
              A place built for the way farms buy equipment
            </h2>
          </Reveal>

          <div className="mt-6 grid items-stretch gap-5 min-[640px]:mt-8 min-[640px]:gap-6 min-[993px]:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] min-[993px]:gap-10">
            <Reveal className="min-w-0">
              <Prose className="mt-0">
                <Paragraph>
                  Farm Exchange is a USA equipment yard you can look through from the kitchen table. Shelters, sheds, tractors, mowers, skid-steer tools, greenhouses, pumps, and parts are already tagged. Each card shows the year, the hours, the price, and the town where the unit sits. You do not have to drive half a day just to learn if the machine is real.
                </Paragraph>
                <Paragraph>
                  The website is the front window. The people on the phone know the same sheet you are reading. If a photo is older than the unit, or a part is not in the crate, they will say so. The price is written. The truck route is written with it. You can keep a paper copy. You can hand the phone to your spouse and they will hear the same facts.
                </Paragraph>
                <Paragraph>
                  The pages use plain words and type that is easy to read. A shelter card shows the span and the wind rating. A tractor card shows the hitch and the hours. A pump card shows the gallons. You can sort the equipment from A to Z. You can choose new or used. You can choose the state. If you would rather talk than click, call 1-800-224-8005. A person answers.
                </Paragraph>
              </Prose>
            </Reveal>
            <Reveal delay={80} className="flex h-full min-w-0 flex-col">
              <div className="group relative min-h-[200px] flex-1 overflow-hidden min-[768px]:min-h-[280px]">
                <img
                  src={yardTractor}
                  alt="A tractor working a green field in daylight"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <ImageHoverCaption
                  kicker="01"
                  title="Card matches the yard"
                  body="Ask for the yard number and we will read it back."
                />
              </div>
              <p className="m-0 mt-3 text-[14px] leading-relaxed text-primary/70 min-[640px]:text-[15px]">
                The machines on the cards are the machines on the yards. Ask for the yard number and we will read it back.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-8">
            <Prose className="mt-0">
              <Paragraph>
                You do not need a special login to look. You do not sign a long contract just to ask a price. Find the unit, or tell us what you are hunting. We send the price in writing the same day, and we name the day the truck can leave. Buy, rent, lease, or trade. The sheet says which one you picked.
              </Paragraph>
              <Paragraph>
                Many of our buyers are sixty and older. They have bought iron for decades and they are tired of pages that hide the price. So we put the price on the card. We put the phone number where you can see it. We use short sentences. If a word is dealer slang, we say the plain version next to it. Gallons means how much water the pump moves. Span means how wide the shelter is. Hours means how long the engine has already run.
              </Paragraph>
              <Paragraph>
                Bring a son or a daughter into the call if you want. They can look at the screen while you listen. The facts do not change between the two of you. When you are ready, we repeat the yard number, the price, and the delivery day one last time. Then, and only then, the truck is booked.
              </Paragraph>
            </Prose>
          </Reveal>
        </div>
      </section>

      <SectionRule />

      <section id="what-makes-us-different" className="section-y bg-primary text-white">
        <div className="content-wrap grid items-start gap-10 min-[993px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[993px]:gap-14">
          <div>
            <Reveal>
              <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Plain reasons</p>
              <h2 className="section-title m-0 mt-3 text-[26px] font-black leading-[1.15] min-[640px]:text-[34px] min-[1600px]:text-[40px]">
                What makes us different
              </h2>
              <Prose onDark>
                <Paragraph>
                  Folks move their buying to this desk because they want stronger facts, a faster answer, and a truck that comes to the farm lane. They want something built for the way equipment actually sells. Here is what we hear back, year after year, from farmers, ranchers, and small dealers.
                </Paragraph>
                <Paragraph>
                  Most of our buyers are busy, and many of them would rather talk than fight with a screen. So we keep the path short. Read the card. Call if you want the same words out loud. Get the price on paper. Know the day the truck rolls. That is the whole idea.
                </Paragraph>
              </Prose>
            </Reveal>
            <ol className="m-0 mt-8 list-none p-0">
              {differences.map((item) => (
                <li key={item.n} className="mt-6 flex gap-4 border-t border-primary/10 pt-6 first:mt-0 first:border-t-0 first:pt-0">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[15px] font-black text-primary">
                    {item.n}
                  </span>
                  <div>
                    <h3 className="m-0 text-[18px] font-black leading-tight min-[1600px]:text-[22px]">{item.title}</h3>
                    <p className="m-0 mt-2 text-[16px] leading-[1.75] text-white/85 min-[1600px]:text-[18px]">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <Reveal delay={80} className="min-[993px]:sticky min-[993px]:top-[calc(var(--header-h,180px)+16px)]">
            <div className="group relative overflow-hidden">
              <img
                src={rowTractor}
                alt="A green tractor parked in a row on the yard"
                className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] min-[768px]:h-[460px] min-[1600px]:h-[560px]"
              />
              <ImageHoverCaption
                kicker="02"
                title="Listed until sold"
                body="A unit stays on the yard list until it leaves. The card comes down with the machine."
              />
            </div>
            <p className="m-0 mt-3 text-[15px] leading-relaxed text-white/70">
              A unit stays on the yard list until it is sold. The card comes down when the machine leaves.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionRule />

      <section id="customer-letters" className="section-y bg-white text-primary">
        <div className="content-wrap">
          <Reveal className="mx-auto max-w-[760px] text-center">
            <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">From the farms</p>
            <h2 className="m-0 mt-3 text-[28px] font-black leading-[1.15] min-[640px]:text-[36px] min-[1600px]:text-[46px]">
              What our customers are saying
            </h2>
            <p className="m-0 mt-3 text-[18px] font-bold">Real dealers. Real farms. Real results.</p>
            <p className="m-0 mt-3 text-[17px] leading-[1.75] text-primary/80">
              We are glad to help equipment buyers across the country. These notes are the kind of calls we get after a truck has left: what fit, what the driver did, and whether the paper matched the crate. Read them the way you would read a letter from a neighbor.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 min-[768px]:grid-cols-2">
            {letters.map((letter) => (
              <article key={letter.name} className="fx1-card p-6 min-[1600px]:p-8">
                <h3 className="fx1-title m-0 text-[20px] font-black leading-tight min-[1600px]:text-[24px]">
                  {letter.title}
                </h3>
                <p className="m-0 mt-2 text-[14px] font-bold text-accent">
                  {letter.name} · {letter.place}
                </p>
                {letter.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="m-0 mt-4 text-[16px] leading-[1.8] text-white/85 min-[1600px]:text-[18px]">
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
          <Reveal className="mx-auto mt-10 max-w-[820px] text-[17px] leading-[1.8] text-primary/85">
            <p className="m-0">
              If you want to hear it yourself, call and ask for a recent delivery near your state. We will tell you the kind of unit, the lane it went to, and whether the buyer took the phone call after the truck left. We do not dress up a bad day. If a gate was tight or a part had to follow on a second box, that story is part of the record too.
            </p>
            <p className="m-0 mt-5">
              Good words only matter if the next machine is still handled the same way. That is why the yard number stays on your account. Next season you do not start over with a stranger. You start with the sheet from last time.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionRule />

      <section id="find-it" className="section-y bg-white text-primary">
        <div className="content-wrap">
          <Reveal>
            <p className="m-0 section-kicker text-xs font-extrabold uppercase tracking-[1px]">Tell us what you need</p>
            <h2 className="section-title m-0 mt-3 text-[24px] font-black leading-[1.15] min-[640px]:text-[32px] min-[993px]:text-[34px] min-[1600px]:text-[40px]">
              Let us take the work out of looking for the equipment you need
            </h2>
          </Reveal>

          <div className="mt-6 grid items-stretch gap-5 min-[640px]:mt-8 min-[640px]:gap-6 min-[993px]:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] min-[993px]:gap-10">
            <Reveal className="min-w-0">
              <Prose className="mt-0">
                <Paragraph>
                  You should not have to sit at a screen all week to catch the one tractor that fits your hitch. Tell the desk what you need. The make if you have one. The size. The hours you will accept. The state you farm in. We watch the yards we already run. When a unit matches, we call you. You still decide. Nothing ships until you say yes.
                </Paragraph>
                <Paragraph>
                  Shelters, sheds, tractors, mowers, skid tools, greenhouses, pumps, and parts come in and go out all season. A want list keeps your name next to the kind of iron you asked for. A good used unit does not leave for someone else while you are in the field and the card is still new.
                </Paragraph>
                <Paragraph>
                  It is simple, and it does not cost extra to ask. Call 1-800-224-8005 or use the contact page. Say new or used. Say the top price. Say whether the truck must come to the farm lane. We write it in the words you used. If we need one more fact, we ask one question, not a long form.
                </Paragraph>
              </Prose>
            </Reveal>
            <Reveal delay={80} className="flex h-full min-w-0 flex-col gap-3 min-[640px]:gap-4">
              <div className="group relative min-h-[180px] flex-[1.35] overflow-hidden min-[768px]:min-h-[220px]">
                <img
                  src={harvestField}
                  alt="A tractor in a cornfield at harvest"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <ImageHoverCaption
                  kicker="01"
                  title="Want list watch"
                  body="Tell the desk the size and the week. We call when a tagged unit matches."
                />
              </div>
              <div className="group relative min-h-[140px] flex-1 overflow-hidden min-[768px]:min-h-[160px]">
                <img
                  src={shelterBay}
                  alt="The inside of a metal equipment shelter"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <ImageHoverCaption
                  kicker="02"
                  title="Shelter bay"
                  body="Span and wind rating stay on the tag with the unit."
                  compact
                />
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-8">
            <Prose className="mt-0">
              <Paragraph>
                This helps dealers too. If you have a clean machine to sell or trade, tell us what it is and what you want off the lot. We look at both against the tagged price. The balance, if there is one, is written before a truck moves either way.
              </Paragraph>
              <Paragraph>
                You can be as exact as you like. “A used compact tractor under 50 horsepower, with a loader, in the Dakotas, this fall.” That is enough to start. If you only know the job, that is enough too. “I need to cut three acres of brush before winter.” We will name the kind of cutter that fits and tell you what is tagged this week.
              </Paragraph>
              <Paragraph>
                Keep a pencil by the phone. We will give you the yard number slowly. Write the price. Write the town. Write the day. If anything on that note does not match what you asked for, say so. We would rather fix the note than send the wrong iron down your lane.
              </Paragraph>
            </Prose>
            <p className="m-0 mt-6 text-[17px] font-bold leading-snug text-accent">
              Ready to try it? Send the note and let the desk watch the lot.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/contact" className="cta-box px-6 py-3 text-[14px]">
                Write the desk
              </Link>
              <a href="tel:18002248005" className="inline-block border border-primary px-6 py-3 text-[14px] font-extrabold uppercase tracking-[0.04em] text-primary no-underline transition-colors duration-300 hover:bg-primary hover:text-white">
                Call 1-800-224-8005
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionRule />

      <section id="how-a-request-works" className="section-y bg-primary text-white">
        <div className="content-wrap">
          <div className="grid gap-12 min-[993px]:grid-cols-2 min-[993px]:gap-16">
            <div>
              <h2 className="m-0 text-[24px] font-black leading-tight min-[640px]:text-[30px] min-[1600px]:text-[36px]">
                How a request works
              </h2>
              <p className="m-0 mt-4 text-[17px] leading-[1.8] text-white/85">
                You tell us once. We do the looking. You get a call when a real unit on a real yard fits the note. Here is the path, in the order it happens.
              </p>
              <ol className="m-0 mt-8 list-none p-0">
                {requestSteps.map((step) => (
                  <li
                    key={step.n}
                    className="group mt-6 flex gap-4 rounded-sm p-3 -mx-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.06]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[16px] font-black text-primary transition-transform duration-300 group-hover:scale-105 group-hover:bg-yellow">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="m-0 text-[18px] font-black transition-colors duration-300 group-hover:text-yellow">
                        {step.title}
                      </h3>
                      <p className="m-0 mt-2 text-[16px] leading-[1.75] text-white/85 transition-colors duration-300 group-hover:text-white">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="m-0 text-[24px] font-black leading-tight min-[640px]:text-[30px] min-[1600px]:text-[36px]">
                Why people use it
              </h2>
              <p className="m-0 mt-4 text-[17px] leading-[1.8] text-white/85">
                A want list is useful when your time is worth more than another hour of searching. These are the reasons buyers give us when they call back.
              </p>
              <ol className="m-0 mt-8 list-none p-0">
                {requestReasons.map((step) => (
                  <li
                    key={step.n}
                    className="group mt-6 flex gap-4 rounded-sm p-3 -mx-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.06]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[16px] font-black text-accent transition-transform duration-300 group-hover:scale-105 group-hover:bg-yellow group-hover:text-primary">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="m-0 text-[18px] font-black transition-colors duration-300 group-hover:text-yellow">
                        {step.title}
                      </h3>
                      <p className="m-0 mt-2 text-[16px] leading-[1.75] text-white/85 transition-colors duration-300 group-hover:text-white">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <Reveal className="mx-auto mt-16 max-w-[720px] text-center">
            <h2 className="m-0 text-[28px] font-black leading-tight min-[640px]:text-[36px]">Ready to give it a try?</h2>
            <p className="m-0 mt-4 text-[17px] leading-[1.75] text-white/85">
              Set up your request and let us handle the looking. Call the toll-free line, or write the desk. Have the size, the job, and your town ready. We will read it back so you know we heard you right.
            </p>
            <p className="m-0 mt-4 text-[16px] leading-[1.7] text-white/75">
              If you already see the machine on the lot, you can skip the want list and open the card. View details, ask for the written price, or call about pay and freight. The same people answer either way.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="cta-box px-6 py-3 text-[14px]">
                Write the desk
              </Link>
              <Link to="/equipment" className="inline-block border border-white px-6 py-3 text-[14px] font-extrabold uppercase tracking-[0.04em] text-white no-underline transition-colors duration-300 hover:border-yellow hover:bg-yellow hover:text-primary">
                Browse the lot
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
