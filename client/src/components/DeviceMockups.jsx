import { useEffect, useRef, useState } from 'react';
import { Laptop, Smartphone, Tablet } from 'lucide-react';
import Reveal from './Reveal';

/** Full-device mockup videos (already framed) — show entire frame, no crop */
const devices = [
  {
    id: 'desktop',
    label: 'Desktop',
    icon: Laptop,
    src: '/mockups/desktop.mp4',
    stage: 'mx-auto w-full max-w-[1100px]',
  },
  {
    id: 'tablet',
    label: 'iPad',
    icon: Tablet,
    src: '/mockups/tablet.mp4',
    stage: 'mx-auto w-full max-w-[900px]',
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: Smartphone,
    src: '/mockups/mobile.mp4',
    stage: 'mx-auto w-full max-w-[420px]',
  },
];

export default function DeviceMockups() {
  const [active, setActive] = useState('desktop');
  const [loaded, setLoaded] = useState({ desktop: true });
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px 0px', threshold: 0.12 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView, active, loaded]);

  const select = (id) => {
    setActive(id);
    setLoaded((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  const current = devices.find((d) => d.id === active) || devices[0];

  return (
    <section ref={sectionRef} id="device-mockups" className="bg-primary py-14 text-white min-[993px]:py-[80px]">
      <div className="content-wrap">
        <Reveal className="mx-auto mb-8 max-w-[720px] text-center">
          <p className="section-kicker m-0 text-xs font-extrabold uppercase tracking-[1px]">
            Same desk, every screen
          </p>
          <h2 className="m-0 mt-2 text-[24px] font-black uppercase leading-tight min-[640px]:text-[34px] min-[1600px]:text-[42px]">
            Farm Exchange on desktop, iPad, and phone
          </h2>
          <p className="m-0 mt-3 text-[15px] leading-[1.65] text-white/75">
            Browse tagged lots from the office, the truck cab, or the yard gate — one desk on every device.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {devices.map(({ id, label, icon: Icon }) => {
              const on = id === active;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => select(id)}
                  aria-pressed={on}
                  className={`inline-flex cursor-pointer items-center gap-2 border px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.06em] transition-colors ${
                    on
                      ? 'border-yellow bg-yellow text-primary'
                      : 'border-white/25 bg-white/5 text-white hover:border-yellow/60 hover:bg-white/10'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className={`${current.stage} flex min-h-[280px] items-center justify-center min-[640px]:min-h-[360px] min-[993px]:min-h-[480px]`}>
            {loaded[current.id] ? (
              <video
                key={current.id}
                ref={videoRef}
                src={current.src}
                className="max-h-[min(72vh,720px)] w-full bg-transparent object-contain"
                muted
                loop
                playsInline
                preload="metadata"
                controls={false}
              />
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
