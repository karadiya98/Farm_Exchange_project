import { useEffect, useRef } from 'react';

const PHRASE_TEXT =
  'CONTAINER SHELTERS ✦ SKID STEER ATTACHMENTS ✦ IRRIGATION PUMPS ✦ NATIONWIDE FREIGHT ✦ 12-MONTH WARRANTY ✦ SPARE PARTS IN STOCK';
const SEPARATOR = '✦';

export default function KineticMarquee({
  text = PHRASE_TEXT,
  separator = SEPARATOR,
  repeatCount = 4,
  speed = 80,
  direction = 'left',
  pauseOnHover = false,
  effectRadius = 120,
  liftAmount = 14,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const charRefsA = useRef([]);
  const charRefsB = useRef([]);
  const charOffsetsA = useRef([]);
  const charOffsetsB = useRef([]);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const hoveringRef = useRef(false);
  const isVisibleRef = useRef(true);
  const wasFarRef = useRef(true);

  const phrase =
    Array.from({ length: repeatCount }, () => text).join(` ${separator} `) + ` ${separator} `;
  const chars = phrase.split('');

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    function measureAll() {
      halfWidthRef.current = track.scrollWidth / 2;
      const containerRect = container.getBoundingClientRect();
      const currentOffset = offsetRef.current;
      charOffsetsA.current = charRefsA.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.left - containerRect.left - currentOffset + r.width / 2 };
      });
      charOffsetsB.current = charRefsB.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.left - containerRect.left - currentOffset + r.width / 2 };
      });
    }

    measureAll();
    const resizeObserver = new ResizeObserver(measureAll);
    resizeObserver.observe(track);

    function handleMouseMove(e) {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX, y: e.clientY };
      hoveringRef.current =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
      hoveringRef.current = false;
    }

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    let lastTime = performance.now();
    const levelsA = [];
    const levelsB = [];

    function applyCharEffect(spans, offsets, levels, baseX, mouse, cy, dt) {
      const ease = 1 - Math.exp(-dt * 10);
      let moving = false;
      for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        const off = offsets[i];
        if (!span || !off) continue;
        const cx = baseX + off.x;
        const dist = Math.hypot(mouse.x - cx, mouse.y - cy);
        const target = dist < effectRadius ? 1 - dist / effectRadius : 0;
        const current = levels[i] || 0;
        const next = current + (target - current) * ease;
        if (next < 0.01) {
          levels[i] = 0;
          if (span.style.transform) span.style.transform = '';
          continue;
        }
        levels[i] = next;
        moving = true;
        span.style.transform = `translateY(${(-next * liftAmount).toFixed(2)}px)`;
      }
      return moving;
    }

    function tick(now) {
      const dt = Math.min(0.032, (now - lastTime) / 1000);
      lastTime = now;
      const shouldScroll = !(pauseOnHover && hoveringRef.current);
      if (shouldScroll) {
        const dir = direction === 'left' ? -1 : 1;
        offsetRef.current += dir * speed * dt;
        if (direction === 'left' && offsetRef.current <= -halfWidthRef.current) {
          offsetRef.current += halfWidthRef.current;
        } else if (direction === 'right' && offsetRef.current >= 0) {
          offsetRef.current -= halfWidthRef.current;
        }
        track.style.transform = `translateX(${offsetRef.current}px)`;
      }

      const mouse = mouseRef.current;
      const isFar = mouse.x < -5000 && mouse.y < -5000;
      if (!(isFar && wasFarRef.current)) {
        const containerRect = container.getBoundingClientRect();
        const cy = containerRect.top + containerRect.height / 2;
        const baseX = containerRect.left + offsetRef.current;
        const movingA = applyCharEffect(charRefsA.current, charOffsetsA.current, levelsA, baseX, mouse, cy, dt);
        const movingB = applyCharEffect(charRefsB.current, charOffsetsB.current, levelsB, baseX, mouse, cy, dt);
        wasFarRef.current = isFar && !movingA && !movingB;
      }

      if (isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = 0;
      }
    }

    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting && rafRef.current === 0) {
            lastTime = performance.now();
            rafRef.current = requestAnimationFrame(tick);
          }
        },
        { threshold: 0 }
      );
      observer.observe(container);
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      resizeObserver.disconnect();
      if (observer) observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [phrase, speed, direction, pauseOnHover, effectRadius, liftAmount]);

  const renderChars = (setRef, keyPrefix) =>
    chars.map((c, i) => (
      <span
        key={keyPrefix + i}
        ref={(el) => {
          setRef.current[i] = el;
        }}
        className={`inline-block font-black uppercase tracking-[1.2px] text-[16px] min-[640px]:text-[22px] leading-none ${
          c === separator ? 'text-accent px-1' : 'text-white'
        }`}
      >
        {c === ' ' ? '\u00A0' : c}
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className="relative flex w-full items-center overflow-hidden bg-deep h-[56px] min-[640px]:h-[72px]"
      aria-label="Farm equipment highlights"
    >
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        <span className="flex">{renderChars(charRefsA, 'a')}</span>
        <span className="flex" aria-hidden="true">
          {renderChars(charRefsB, 'b')}
        </span>
      </div>
    </div>
  );
}
