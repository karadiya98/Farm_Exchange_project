import { Children, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const slideClass = 'w-[84%] shrink-0 snap-start min-[768px]:w-full min-[768px]:shrink';

const CardExpandContext = createContext(null);

export function useCardExpand() {
  return useContext(CardExpandContext);
}

function ExpandSlot({ index, children }) {
  const rail = useContext(RailExpandContext);
  const value = useMemo(
    () => ({
      expanded: rail ? rail.isRowExpanded(index) : false,
      toggle: () => rail?.toggleRow(index),
    }),
    [rail, index],
  );

  return <CardExpandContext.Provider value={value}>{children}</CardExpandContext.Provider>;
}

const RailExpandContext = createContext(null);

function columnCountForWidth(width, columns) {
  if (width < 768) return 1;
  if (width < 1100) return 2;
  return columns;
}

export default function CardRail({ children, className = '', columns = 4 }) {
  const scroller = useRef(null);
  const pauseUntil = useRef(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [colCount, setColCount] = useState(columns);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const [expandedRows, setExpandedRows] = useState(() => new Set());

  const sync = () => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [children]);

  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      setColCount(columnCountForWidth(width, columns));
      setIsMobile(width < 768);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, [columns]);

  useEffect(() => {
    setExpandedRows(new Set());
  }, [children, colCount]);

  const railApi = useMemo(
    () => ({
      isRowExpanded: (index) => expandedRows.has(Math.floor(index / colCount)),
      toggleRow: (index) => {
        const row = Math.floor(index / colCount);
        setExpandedRows((current) => {
          const next = new Set(current);
          if (next.has(row)) next.delete(row);
          else next.add(row);
          return next;
        });
      },
    }),
    [expandedRows, colCount],
  );

  const move = (direction) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.firstElementChild;
    const amount = card ? card.getBoundingClientRect().width + 12 : el.clientWidth * 0.84;
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  const bumpPause = (ms = 6000) => {
    pauseUntil.current = Date.now() + ms;
    setPaused(true);
    window.setTimeout(() => {
      if (Date.now() >= pauseUntil.current) setPaused(false);
    }, ms + 40);
  };

  // Auto-advance on mobile, same cadence as listing image slideshow.
  useEffect(() => {
    if (!isMobile || paused) return undefined;
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const el = scroller.current;
    if (!el || el.scrollWidth <= el.clientWidth + 8) return undefined;

    const timer = setInterval(() => {
      if (document.hidden || Date.now() < pauseUntil.current) return;
      const rail = scroller.current;
      if (!rail) return;
      const atEndNow = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
      if (atEndNow) {
        rail.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }
      const card = rail.firstElementChild;
      const amount = card ? card.getBoundingClientRect().width + 12 : rail.clientWidth * 0.84;
      rail.scrollBy({ left: amount, behavior: 'smooth' });
    }, 3200);

    return () => clearInterval(timer);
  }, [isMobile, paused, children]);

  const arrowClass = 'absolute top-[118px] z-20 grid h-11 w-11 cursor-pointer place-items-center rounded-full border-none bg-primary text-white shadow-[0_8px_20px_rgb(2_70_46/0.28)] min-[768px]:hidden disabled:cursor-default disabled:opacity-35';

  const items = Children.toArray(children);

  return (
    <RailExpandContext.Provider value={railApi}>
      <div
        className={`relative ${className}`}
        onPointerDown={() => bumpPause()}
        onTouchStart={() => bumpPause()}
      >
        <div
          ref={scroller}
          data-card-rail
          className={`flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[768px]:grid min-[768px]:grid-cols-2 min-[768px]:gap-4 min-[768px]:overflow-visible min-[768px]:px-0 min-[768px]:pb-0 min-[1100px]:gap-x-5 min-[1100px]:gap-y-7 ${
            columns === 3 ? 'min-[1100px]:grid-cols-3' : 'min-[1100px]:grid-cols-4'
          }`}
        >
          {items.map((child, index) => (
            <ExpandSlot key={child.key ?? index} index={index}>
              {child}
            </ExpandSlot>
          ))}
        </div>
        <button
          type="button"
          aria-label="Previous"
          onClick={() => {
            bumpPause();
            move(-1);
          }}
          disabled={atStart}
          className={`${arrowClass} left-1`}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => {
            bumpPause();
            move(1);
          }}
          disabled={atEnd}
          className={`${arrowClass} right-1`}
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </RailExpandContext.Provider>
  );
}
