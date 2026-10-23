import Reveal from './Reveal';

const eras = [
  {
    year: '1999',
    title: 'The desk opens',
    body: 'Farm Exchange starts in 1999. Farmers call the desk, stand next to tagged iron, and leave with a written price instead of a guess.',
  },
  {
    year: '2000s',
    title: 'Shelters join the line',
    body: 'Container shelters and metal sheds move onto the lot. Frames are bolted in the yard so a buyer can walk the bay before the truck is booked.',
  },
  {
    year: '2010s',
    title: 'Freight leaves the county',
    body: 'Liftgate and flatbed routes reach farms across the USA. A written freight window replaces the handshake about when the truck might show up.',
  },
  {
    year: '2020s',
    title: 'Long Island and Sheridan',
    body: 'The Long Island main line and the Sheridan desk share one toll-free number. Hitch class, span, and a dealer price go out in writing the same day.',
  },
  {
    year: 'Today',
    title: 'The lot goes on the listing',
    body: 'Stock, wind rating, and hydraulic flow sit next to the price. If a unit is on the site, it already has a yard number and a truck that can reach the gate.',
  },
];

export default function HistoryEvolution() {
  return (
    <section id="history" className="section-y bg-primary text-white">
      <Reveal className="content-wrap mb-14 text-center min-[993px]:mb-16">
        <h2 className="m-0 text-[26px] font-semibold tracking-tight text-white min-[640px]:text-[44px] min-[1920px]:text-[56px] min-[2400px]:text-[68px]">
          History and evolution
        </h2>
        <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-[1.7] text-white/80">
          Farm Exchange has been on the lot since 1999. It started as a yard where a farmer could stand next to the machine. The years since are the run of that idea, and where the listing picks up.
        </p>
      </Reveal>

      <div className="relative content-wrap">
        <div className="pointer-events-none absolute bottom-3 left-[18px] top-3 w-px -translate-x-1/2 bg-white/40 min-[993px]:left-1/2" />

        <ol className="m-0 flex list-none flex-col gap-10 p-0 min-[993px]:gap-12">
          {eras.map((era, index) => {
            const onLeft = index % 2 === 0;
            return (
              <li key={era.year} className="relative">
                <span className="absolute left-[18px] top-[11px] z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-yellow ring-[5px] ring-primary min-[993px]:left-1/2" />
                <Reveal delay={index * 80}>
                  <div
                    className={`flex flex-col items-start gap-2 pl-10 min-[993px]:w-1/2 min-[993px]:flex-row min-[993px]:gap-4 min-[993px]:pl-0 ${
                      onLeft
                        ? 'min-[993px]:justify-end min-[993px]:pr-9 min-[993px]:text-right'
                        : 'min-[993px]:ml-auto min-[993px]:pl-9'
                    }`}
                  >
                    <span
                      className={`inline-flex shrink-0 items-center rounded-full bg-yellow px-3.5 py-1.5 text-[13px] font-semibold text-primary shadow-[0_6px_16px_rgb(0_0_0/0.18)] ${
                        onLeft ? 'min-[993px]:order-2' : ''
                      }`}
                    >
                      {era.year}
                    </span>
                    <div className={`min-w-0 max-w-[360px] min-[1600px]:max-w-[480px] min-[2200px]:max-w-[560px] ${onLeft ? 'min-[993px]:order-1' : ''}`}>
                      <h3 className="m-0 text-[15px] font-semibold leading-snug text-white min-[993px]:text-[17px] min-[1920px]:text-[20px] min-[2400px]:text-[24px]">
                        {era.title}
                      </h3>
                      <p className="m-0 mt-1.5 text-[13px] leading-[1.65] text-white/75 min-[993px]:text-[14px]">
                        {era.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
