import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

const VIEW_WIDTH = 927;
const VIEW_HEIGHT = 400;

const PROCESS_PATH = `
  M 77 54
  C 132 2 244 8 297 118
  C 350 70 461 75 507 185
  C 571 124 698 136 757 271
`;

const points = [
  { x: 77, y: 54 },
  { x: 297, y: 118 },
  { x: 507, y: 185 },
  { x: 757, y: 271 },
];

export default function AnimatedPath({
  lineColor = '#FEC700',
  dotColor = '#c82425',
  strokeWidth = 1.5,
  dashLength = 7,
  gapLength = 7,
  dotSize = 11,
  speed = 130,
  trailLength = 0.3,
  startDelay = 0,
  startOnView = true,
  showBase = true,
  baseOpacity = 0.22,
}) {
  const containerRef = useRef(null);
  const measurementPathRef = useRef(null);
  const [started, setStarted] = useState(!startOnView);
  const [pathLength, setPathLength] = useState(800);
  const uniqueId = useId().replace(/:/g, '');
  const animationName = `smooth-process-flow-${uniqueId}`;
  const animationClass = `smooth-process-path-${uniqueId}`;

  useLayoutEffect(() => {
    const path = measurementPathRef.current;
    if (!path) return;
    const measuredLength = path.getTotalLength();
    if (measuredLength > 0) setPathLength(measuredLength);
  }, []);

  useEffect(() => {
    if (!startOnView) {
      setStarted(true);
      return;
    }
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [startOnView]);

  const animationDuration = Math.max(pathLength / Math.max(speed, 1), 0.4);
  const normalizedTrail = Math.max(0.01, Math.min(trailLength, 0.9999));
  const normalizedGap = 1 - normalizedTrail;

  const animationStyles = `
    @keyframes ${animationName} {
      from { stroke-dashoffset: 0; }
      to { stroke-dashoffset: -1; }
    }
    .${animationClass} {
      animation-name: ${animationName};
      animation-duration: ${animationDuration}s;
      animation-delay: ${Math.max(startDelay, 0)}s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-fill-mode: both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${animationClass} {
        animation: none !important;
        stroke-dashoffset: 0 !important;
      }
    }
  `;

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-visible pointer-events-none">
      <style>{animationStyles}</style>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 block overflow-visible"
      >
        <path ref={measurementPathRef} d={PROCESS_PATH} fill="none" stroke="transparent" strokeWidth={1} />
        {showBase && (
          <path
            d={PROCESS_PATH}
            fill="none"
            stroke={lineColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLength} ${gapLength}`}
            strokeLinecap="round"
            opacity={baseOpacity}
            vectorEffect="non-scaling-stroke"
          />
        )}
        <path
          d={PROCESS_PATH}
          pathLength={1}
          fill="none"
          stroke={lineColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${normalizedTrail} ${normalizedGap}`}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className={started ? animationClass : undefined}
        />
        {points.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r={dotSize / 2} fill={dotColor} />
        ))}
      </svg>
    </div>
  );
}
