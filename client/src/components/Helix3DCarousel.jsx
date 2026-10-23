import { useEffect, useRef, useState } from 'react';

const RADIUS = 350;
const VERTICAL_SPACING = 190;
const ANGLE = 48;
const CENTER_Y = -50;

export default function Helix3DCarousel({ projects }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const progressRef = useRef(0);
  const targetProgress = useRef(0);
  const hoveredCard = useRef(null);
  const targetTilt = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: 0, y: 0 });
  const cardHoverWeights = useRef(projects.map(() => 0));
  const lastTime = useRef(0);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startProgress = useRef(0);
  const reducedMotion = useRef(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    const measure = () => {
      const width = window.innerWidth;
      if (width < 480) setScale(0.72);
      else if (width < 768) setScale(0.78);
      else if (width <= 1440) setScale(0.9);
      else if (width < 2000) setScale(1.12);
      else setScale(1.28);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    cardHoverWeights.current = projects.map(() => 0);
  }, [projects]);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion.current) return undefined;

    let frame = 0;
    let mounted = true;
    lastTime.current = performance.now();

    const animate = (currentTime) => {
      if (!mounted) return;
      const dt = Math.min(Math.max((currentTime - lastTime.current) / 1000, 0.001), 0.1);
      lastTime.current = currentTime;
      let needsUpdate = false;

      const progressDiff = targetProgress.current - progressRef.current;
      if (Math.abs(progressDiff) > 0.0002) {
        progressRef.current += progressDiff * (1 - Math.exp(-8.5 * dt));
        needsUpdate = true;
      } else if (progressRef.current !== targetProgress.current) {
        progressRef.current = targetProgress.current;
        needsUpdate = true;
      }

      const tiltLambda = hoveredCard.current !== null ? 14 : 7;
      const tiltDiffX = targetTilt.current.x - currentTilt.current.x;
      const tiltDiffY = targetTilt.current.y - currentTilt.current.y;
      if (Math.abs(tiltDiffX) > 0.002 || Math.abs(tiltDiffY) > 0.002) {
        currentTilt.current.x += tiltDiffX * (1 - Math.exp(-tiltLambda * dt));
        currentTilt.current.y += tiltDiffY * (1 - Math.exp(-tiltLambda * dt));
        needsUpdate = true;
      }

      cardHoverWeights.current.forEach((value, index) => {
        const targetValue = hoveredCard.current === index ? 1 : 0;
        const difference = targetValue - value;
        if (Math.abs(difference) > 0.002) {
          const hoverLambda = hoveredCard.current === index ? 16 : 6;
          cardHoverWeights.current[index] = value + difference * (1 - Math.exp(-hoverLambda * dt));
          needsUpdate = true;
        } else if (value !== targetValue) {
          cardHoverWeights.current[index] = targetValue;
          needsUpdate = true;
        }
      });

      if (needsUpdate) setTick((value) => (value + 1) % 1000000);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
    };
  }, [projects.length]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || reducedMotion.current) return undefined;
    const handleWheel = (event) => {
      const rect = element.getBoundingClientRect();
      const viewMid = window.innerHeight / 2;
      const stageMid = rect.top + rect.height / 2;
      const centered = Math.abs(stageMid - viewMid) < Math.min(140, window.innerHeight * 0.16);
      if (!centered) return;

      const max = projects.length - 1;
      const atEnd = targetProgress.current >= max - 0.001 && progressRef.current >= max - 0.12;
      const atStart = targetProgress.current <= 0.001 && progressRef.current <= 0.12;
      if ((event.deltaY > 0 && atEnd) || (event.deltaY < 0 && atStart)) return;
      event.preventDefault();
      targetProgress.current = Math.max(
        0,
        Math.min(max, targetProgress.current + event.deltaY * 0.0018)
      );
    };
    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, [projects.length]);

  const handlePointerDown = (event) => {
    if (reducedMotion.current) return;
    isDragging.current = true;
    startY.current = event.clientY;
    startProgress.current = targetProgress.current;
    hoveredCard.current = null;
    targetTilt.current = { x: 0, y: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging.current) return;
    const delta = startY.current - event.clientY;
    targetProgress.current = Math.max(
      0,
      Math.min(projects.length - 1, startProgress.current + delta * 0.0035)
    );
  };

  const handlePointerUp = (event) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    targetProgress.current = Math.round(targetProgress.current);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* pointer already released */
    }
  };

  const handleMouseEnter = (index) => {
    if (isDragging.current || reducedMotion.current) return;
    hoveredCard.current = index;
  };

  const handleMouseMove = (event, index) => {
    if (isDragging.current || reducedMotion.current) return;
    hoveredCard.current = index;
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const rawX = (event.clientX - rect.left) / rect.width - 0.5;
    const rawY = (event.clientY - rect.top) / rect.height - 0.5;
    targetTilt.current = {
      x: Math.max(-0.5, Math.min(0.5, rawX)) * 18,
      y: Math.max(-0.5, Math.min(0.5, rawY)) * 18,
    };
  };

  const handleMouseLeave = () => {
    hoveredCard.current = null;
    targetTilt.current = { x: 0, y: 0 };
  };

  const isMobile = scale < 0.8;
  const radius = RADIUS * scale * (isMobile ? 0.72 : 1);
  const verticalSpacing = VERTICAL_SPACING * scale;
  const centerYOffset = CENTER_Y * scale;
  const cardWidth = isMobile ? 176 : 300 * scale;
  const cardHeight = isMobile ? 232 : 400 * scale;
  const currentProgress = reducedMotion.current ? 0 : progressRef.current;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative h-[420px] w-full overflow-hidden min-[480px]:h-[480px] min-[768px]:h-[660px] min-[1441px]:h-[780px] min-[1800px]:h-[920px]"
      style={{
        background:
          'radial-gradient(ellipse at 50% 48%, rgba(254,199,0,0.16) 0%, transparent 62%), #ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: 1400,
        transformStyle: 'preserve-3d',
        touchAction: 'pan-y',
        userSelect: 'none',
      }}
    >
      {projects.map((project, index) => {
        const t = index - currentProgress;
        const absT = Math.abs(t);
        if (absT > 3.2) return null;

        const angleRad = (t * ANGLE * Math.PI) / 180;
        const x = Math.sin(angleRad) * radius;
        const y = t * verticalSpacing + centerYOffset;
        const z = (Math.cos(angleRad) - 1) * radius;
        const rotation = t * ANGLE;
        const cardScale = Math.max(0.58, 1 - absT * 0.14);
        const opacity = Math.max(0.12, 1 - (absT / 2.6) ** 1.5);
        const isCenter = absT < 0.5;
        const hover = cardHoverWeights.current[index] || 0;
        const lift = hover * 32;
        const hoverScale = 1 + hover * 0.04;
        const tiltX = -currentTilt.current.y * hover;
        const tiltY = currentTilt.current.x * hover;

        return (
          <div
            key={project.number}
            onClick={() => {
              targetProgress.current = index;
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseMove={(event) => handleMouseMove(event, index)}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: cardWidth,
              height: cardHeight,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              transform: `
                translate(-50%, -50%)
                translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${(z + lift).toFixed(2)}px)
                rotateY(${(rotation + tiltY).toFixed(2)}deg)
                rotateX(${tiltX.toFixed(2)}deg)
                scale(${(cardScale * hoverScale).toFixed(4)})
              `,
              opacity,
              zIndex: isCenter ? 100 : Math.round(50 - absT * 10),
              background: '#0C5C3A',
              borderRadius: 20 * scale,
              boxShadow: isCenter
                ? '0 45px 110px rgba(0,0,0,.55), 0 12px 45px rgba(0,0,0,.35)'
                : '0 25px 70px rgba(0,0,0,.4)',
              color: '#F7F8F4',
              boxSizing: 'border-box',
              cursor: isCenter ? 'default' : 'pointer',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '63%',
                overflow: 'hidden',
                background: '#013526',
                borderRadius: `${20 * scale}px ${20 * scale}px 0 0`,
              }}
            >
              <img
                src={project.image}
                alt=""
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transform: `scale(${1 + hover * 0.08})`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(2,70,46,.25) 0%, rgba(2,70,46,0) 40%, #0C5C3A 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                top: 18 * scale,
                left: 18 * scale,
                right: 18 * scale,
                display: 'flex',
                justifyContent: 'space-between',
                zIndex: 5,
              }}
            >
              <span
                style={{
                  background: 'rgba(2,70,46,.72)',
                  border: '1px solid rgba(254,199,0,.45)',
                  borderRadius: 999,
                  padding: `${6 * scale}px ${10 * scale}px`,
                  fontSize: 11 * scale,
                  fontWeight: 800,
                  color: isCenter ? '#FEC700' : '#F7F8F4',
                }}
              >
                {project.number}
              </span>
              <span
                style={{
                  background: 'rgba(2,70,46,.72)',
                  border: '1px solid rgba(200,36,37,.7)',
                  borderRadius: 999,
                  padding: `${6 * scale}px ${10 * scale}px`,
                  fontSize: 10 * scale,
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#F7F8F4',
                }}
              >
                {project.category}
              </span>
            </div>

            <div
              style={{
                position: 'absolute',
                left: 24 * scale,
                right: 24 * scale,
                bottom: 24 * scale,
                zIndex: 5,
              }}
            >
              <div
                style={{
                  fontSize: 10 * scale,
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  color: '#FEC700',
                  marginBottom: 8 * scale,
                  textTransform: 'uppercase',
                }}
              >
                {project.client}
              </div>
              <div
                style={{
                  fontSize: 22 * scale,
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: 8 * scale,
                  textTransform: 'uppercase',
                }}
              >
                {project.title}
              </div>
              <div
                style={{
                  fontSize: 12 * scale,
                  lineHeight: 1.45,
                  color: 'rgba(247,248,244,.78)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {project.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
