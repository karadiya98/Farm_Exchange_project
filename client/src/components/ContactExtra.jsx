import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import ImageHoverCaption from './ImageHoverCaption';
import ruralMailbox from '../public/contact-extra/rural-mailbox.jpg';
import partsBay from '../public/about-extra/parts-bay.jpg';
import barnRoad from '../public/contact-extra/barn-road.jpg';
import oregonBarn from '../public/contact-extra/oregon-highway-barn.jpg';
import farmRoad from '../public/contact-extra/farm-road.jpg';

const chapters = [
  {
    kicker: 'Before you dial',
    title: 'What to have ready when you call the desk',
    image: ruralMailbox,
    alt: 'A rural mailbox at the edge of a farm drive',
    paragraphs: [
      'A good call starts before the phone rings. Write down the state you farm in, the job the machine has to do, and any size you already know: shelter span, tractor horsepower, pump gallons, or skid oil flow. If you already saw a card on the equipment list, write the yard number. If you did not, write the words you would use with a neighbor. “I need a used compact tractor with a loader before winter” is enough to begin.',
      'Have a pencil ready. We will give you the yard number slowly. Write the price. Write the town where the unit sits. Write the day the truck can leave. If anything on that note does not match what you asked for, say so while you are still on the line. It is easier to fix the note than to send the wrong iron down your lane.',
      'Also know your gate. Can a liftgate truck turn in? Is the lane soft after rain? Is there a low wire? These facts change the freight more than most buyers expect. You do not need perfect answers. You need honest ones. The desk would rather hear “I’m not sure about the gate” than learn about a problem after the driver is already on the road.',
      'If you are over sixty and prefer to talk instead of type, that is welcome here. Call 1-800-224-8005. Ask the person to repeat anything you missed. Ask them to stay on the line while you find your glasses or your notebook. The desk is built for that kind of call. The form on this page is for the same facts in writing, when email fits you better.',
    ],
    points: [
      'State, job, and size — even if the size is a guess.',
      'Yard number from the equipment list, if you have one.',
      'Gate and lane notes: liftgate, mud, wires, turns.',
      'A pencil, so the numbers can be written once and kept.',
    ],
  },
  {
    kicker: 'After you write',
    title: 'What happens in the first day after your note arrives',
    image: partsBay,
    alt: 'Parts and tagged iron on a Farm Exchange yard bay',
    paragraphs: [
      'When your note lands, the desk reads it the same day it is open. They look for the machine, the state, and whether you asked for a price, a freight window, or a dealer application. If a fact is missing, you get one clear question back, not a long form. If the facts are enough, you get a written answer: yard number, price, and what is included.',
      'That written answer is the same sheet the phone desk would read aloud — one price across the exchange. Email does not create a second number. The note and the call stay in one account. If you follow up by phone later, say you already wrote. We pull the note so you do not start over.',
      'If you asked us to watch for a machine that is not on the lot yet, the note stays open in the ecosystem. When a unit matches, we write or call with the tag facts. You can say no. The note does not disappear because the first match was wrong. You pay only if you buy, and only the price already written.',
      'Busy harvest weeks can slow a reply by a few hours. They do not erase your place in line. If the week matters and you have not heard back, call. Say you already sent the note. The desk will find it. Contact exists to name the next step — buy, lease, barter, repair, or parts — not to leave you wondering whether the message arrived.',
    ],
    points: [
      'Same-day read when the desk is open.',
      'One written sheet: price, yard number, what is included.',
      'Want-list notes stay open until you close them.',
      'Call if the week is short and you need a voice on the answer.',
    ],
  },
  {
    kicker: 'On the yard',
    title: 'Visiting a branch: what to bring and what to ask',
    image: barnRoad,
    alt: 'A barn beside a rural road you might drive to reach a yard',
    paragraphs: [
      'You can walk a lot when you want to see the iron with your own eyes. Call ahead so the unit is pulled to a place you can stand next to. Bring the yard number if you have it. Bring a tape measure if the span or the deck width matters. Bring a person who helps you decide, if that is how you buy. The branch addresses and hours are listed above this section.',
      'Ask the yard the same questions you would ask on the phone. Is the loader on the tractor? Is the cover rolled? Were the hours read from the meter? Can this truck fit my gate? A visit does not replace the written sheet. It confirms it. If what you see does not match the card, say so before you leave. We would rather fix the listing than argue later.',
      'Wear what you wear on the farm. Yards are work places. Surfaces can be uneven. Ask before you climb on a unit. Photos on your phone are fine. Serial numbers are better when written down. If you decide to buy while you are there, the desk can still send the price in writing to your email so you have a paper trail at home.',
      'Not every buyer needs a visit. Many sixty-and-older customers buy from the kitchen table after one careful call. That is allowed. A visit is for when you want the ground under your boots. Both paths use the same tags and the same people.',
    ],
    points: [
      'Call ahead so the unit is ready to see.',
      'Bring yard number, tape, and a decision partner if you use one.',
      'Match what you see to the written card before you leave.',
      'You can still buy from home if a visit is not needed.',
    ],
  },
  {
    kicker: 'Pick a path',
    title: 'Call, write, or walk in — which one fits the job',
    image: oregonBarn,
    alt: 'A red barn along a highway, a reminder that some trips are worth making',
    paragraphs: [
      'Call when the week is short, when the freight window matters, or when you want numbers read out loud. The phone is fastest for a price that has to move today. Write when you want a paper trail, when several people share the decision, or when you are laying out a long want list. Walk in when you need to see the machine, measure a span, or hear a diesel run.',
      'Many deals use more than one path. A farmer writes the first note, then calls to confirm the gate, then meets the truck at the lane. A dealer may visit a yard once, then handle reorders by phone. There is no penalty for mixing them. There is only one rule: the written sheet is the source of truth. If the call and the email ever disagree, ask us to send a corrected sheet before you pay.',
      'If you are not sure which path to take, start with the phone. Say, “I’m not sure if I should write or visit.” The person on the line will tell you what saves time for your exact job. That guidance is part of the contact desk. It is not a sales script. It is a farm habit: name the next step clearly.',
      'Emergency parts follow the same map. Call first. Have the serial ready. If the part is on the shelf, we say how it ships. If it is not, we say so. Visiting for a small blade is rarely needed. Visiting for a shelter frame you have never seen is often wise. Match the path to the size of the decision.',
    ],
    points: [
      'Call for speed and for numbers read aloud.',
      'Write for a shared decision and a paper trail.',
      'Visit to see, measure, and confirm the tag.',
      'The written sheet wins if two paths disagree.',
    ],
  },
  {
    kicker: 'Busy weeks',
    title: 'How the desk stays clear when the season turns loud',
    image: farmRoad,
    alt: 'A farm road during a working season, when many people call at once',
    paragraphs: [
      'Planting and harvest make the line busier. So do storm weeks, when shelters and pumps move fast. The desk does not close. It shortens the talk to what the acre needs: yard number, price, freight day. If you can send the facts in a short note before you call, the phone time goes further. If you can only call, that is still fine. We keep the tone calm on purpose. Rushing a wrong truck helps no one.',
      'During loud weeks we still write the price. We still name the gate. We still say when a unit is already promised. What we may ask is that you keep one decision-maker on the call, so we are not restarting the story three times. Families that buy together often put the phone on speaker. That works. What slows the desk is a chain of separate calls that never share the same yard number.',
      'After hours, the form still takes your note. The phone line hours are listed with each branch. If you write at night, you will hear back when the desk opens. If your pump failed at dusk and you need a voice, try the toll-free number anyway. When someone is there, they answer. When the line is in night mode, leave the yard number and the failure in a note so morning starts with your job already on the board.',
      'The goal is simple. Contact should feel like talking to a yard that already knows its iron. Busy weeks test that. We pass the test by keeping the sheet honest and the next step clear, even when many farms call on the same afternoon. That is why this page exists beyond the form: so you know how to reach us when the season is quiet, and how to reach us when it is not.',
    ],
    points: [
      'Busy weeks shorten the talk, not the honesty.',
      'One shared yard number keeps the account straight.',
      'Night notes wait for morning; emergencies still try the phone.',
      'Calm, written facts beat a rushed wrong truck.',
    ],
  },
];

export default function ContactExtra() {
  return (
    <section id="contact-more" className="section-y border-t border-white/10 bg-primary text-white">
      <div className="content-wrap">
        <Reveal>
          <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">How to reach us well</p>
          <h2 className="heading-fit m-0 mt-3 text-[clamp(1.4rem,3vw,2.5rem)] font-black leading-[1.15]">
            Call, write, and visit with a clear next step
          </h2>
        </Reveal>
        <p className="prose-rail prose-rail-wide prose-rail-on-dark m-0 mt-4 text-[15px] leading-[1.8] min-[640px]:mt-5 min-[640px]:text-[17px] min-[1600px]:text-[19px]">
          The form and the branch list tell you where to send a note and where to walk the lot. The long sections below tell you how to use those paths well: what to prepare, what happens after you write, what to bring on a visit, when to call instead of email, and how the desk works in a loud season. The words are plain on purpose, for buyers who want a clear next step.
        </p>

        <div className="mt-10 flex flex-col gap-12 min-[768px]:mt-12 min-[993px]:mt-14 min-[993px]:gap-16 min-[1600px]:gap-20">
          {chapters.map((chapter, index) => {
            const imageFirst = index % 2 === 0;
            const lead = chapter.paragraphs.slice(0, 2);
            const rest = chapter.paragraphs.slice(2);
            return (
              <article key={chapter.title} className="min-w-0">
                <div className="grid items-stretch gap-5 min-[640px]:gap-6 min-[993px]:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] min-[993px]:gap-10 min-[1600px]:gap-12">
                  <Reveal className={`h-full min-h-[200px] min-[768px]:min-h-[280px] min-[993px]:min-h-[300px] min-[1600px]:min-h-[340px] ${imageFirst ? 'min-[993px]:order-2' : ''}`}>
                    <div className="group relative h-full min-h-[inherit] overflow-hidden">
                      <img
                        src={chapter.image}
                        alt={chapter.alt}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <ImageHoverCaption kicker={chapter.kicker} title={chapter.title} body={chapter.paragraphs[0]} />
                    </div>
                  </Reveal>
                  <Reveal delay={80} className={`min-w-0 ${imageFirst ? 'min-[993px]:order-1' : ''}`}>
                    <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">{chapter.kicker}</p>
                    <h3 className="heading-fit m-0 mt-2 text-[clamp(1.2rem,2.4vw,2rem)] font-black leading-tight text-white">
                      {chapter.title}
                    </h3>
                    <div className="prose-rail prose-rail-wide prose-rail-on-dark mt-5 text-[16px] leading-[1.85] min-[1600px]:text-[18px]">
                      {lead.map((paragraph) => (
                        <p key={paragraph.slice(0, 36)} className="m-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </Reveal>
                </div>
                <Reveal className="mt-6">
                  {rest.length > 0 && (
                    <div className="prose-rail prose-rail-wide prose-rail-on-dark text-[16px] leading-[1.85] min-[1600px]:text-[18px]">
                      {rest.map((paragraph) => (
                        <p key={paragraph.slice(0, 36)} className="m-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                  <ul className="m-0 mt-5 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-white/85">
                    {chapter.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Reveal>
              </article>
            );
          })}
        </div>

        <Reveal className="mt-16 border border-white/20 bg-[#034a32] p-6 text-white min-[640px]:p-8 min-[993px]:p-10">
          <p className="m-0 text-xs font-extrabold uppercase tracking-[1px] text-yellow">Ready when you are</p>
          <h3 className="m-0 mt-2 text-[22px] font-black uppercase leading-tight text-white min-[640px]:text-[28px]">
            Still not sure how to start?
          </h3>
          <p className="prose-rail prose-rail-wide prose-rail-on-dark m-0 mt-4 text-[16px] leading-[1.8]">
            Call 1-800-224-8005 and say what you need in your own words. Or scroll back to the form and send the state, the machine, and the gate. If you want to see iron first, open the equipment list, pick a yard number, then call that branch hour from the list above. The desk will meet you on whichever path you choose.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="tel:18002248005" className="cta-box px-5 py-3 text-[13px]">
              Call 1-800-224-8005
            </a>
            <Link
              to="/equipment"
              className="inline-block border border-white px-5 py-3 text-[13px] font-extrabold uppercase text-white no-underline transition-colors duration-300 hover:border-yellow hover:bg-yellow hover:text-primary"
            >
              Browse equipment
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
