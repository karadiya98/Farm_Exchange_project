import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import CardRail, { slideClass } from './CardRail';
import ListingCard from './ListingCard';
import { catalogLines } from '../data/catalog';

const PAGE_SIZE = 9;

function byName(product) {
  return String(product.name || '').toLowerCase();
}

function FilterSection({ title, open, onToggle, children }) {
  return (
    <div className="border-b border-primary/15">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-2 border-none bg-transparent px-3 py-3 text-left hover:bg-primary/[0.03]"
      >
        <span className="text-[14px] font-bold text-primary">{title}</span>
        <ChevronRight
          size={16}
          strokeWidth={2.25}
          className={`shrink-0 text-primary/55 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
        />
      </button>
      {open && <div className="border-t border-primary/10 bg-primary/[0.02] px-3 py-2.5">{children}</div>}
    </div>
  );
}

function ChoiceList({ options, value, onChange }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-1 p-0">
      {options.map((option) => {
        const id = typeof option === 'string' ? option : option.id;
        const label = typeof option === 'string' ? option : option.label;
        const on = value === id;
        return (
          <li key={id}>
            <button
              type="button"
              onClick={() => onChange(id)}
              className={`w-full cursor-pointer rounded-md border px-3 py-2 text-left text-[13px] font-semibold transition-colors ${
                on
                  ? 'border-primary bg-primary text-white'
                  : 'border-transparent bg-transparent text-primary/80 hover:border-primary/15 hover:bg-white'
              }`}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function FilterPanel({
  line,
  onLine,
  condition,
  setCondition,
  stateName,
  setStateName,
  year,
  setYear,
  drive,
  setDrive,
  states,
  years,
  drives,
  openSections,
  toggleSection,
  clearFilters,
  className = '',
  style,
  id = 'equipment-filters',
}) {
  return (
    <aside id={id} className={className} style={style}>
      <div className="flex items-center justify-between gap-2 border-b border-primary/15 px-3 py-3">
        <p className="m-0 text-[14px] font-extrabold text-primary">Filters</p>
        <button
          type="button"
          onClick={clearFilters}
          className="cursor-pointer border-none bg-transparent text-[11px] font-bold uppercase tracking-[0.04em] text-primary/50 hover:text-accent"
        >
          Clear
        </button>
      </div>

      <FilterSection title="Category" open={openSections.category} onToggle={() => toggleSection('category')}>
        <ChoiceList options={catalogLines} value={line} onChange={onLine} />
      </FilterSection>
      <FilterSection title="Condition" open={openSections.condition} onToggle={() => toggleSection('condition')}>
        <ChoiceList options={['All', 'New', 'Used']} value={condition} onChange={setCondition} />
      </FilterSection>
      <FilterSection title="State" open={openSections.state} onToggle={() => toggleSection('state')}>
        <ChoiceList options={states} value={stateName} onChange={setStateName} />
      </FilterSection>
      <FilterSection title="Year" open={openSections.year} onToggle={() => toggleSection('year')}>
        <ChoiceList options={years} value={year} onChange={setYear} />
      </FilterSection>
      <FilterSection title="Drive" open={openSections.drive} onToggle={() => toggleSection('drive')}>
        <ChoiceList options={drives} value={drive} onChange={setDrive} />
      </FilterSection>
    </aside>
  );
}

export default function ProductBrowser({ products, line = 'all', onLine, heading }) {
  const [keyword, setKeyword] = useState('');
  const [condition, setCondition] = useState('All');
  const [stateName, setStateName] = useState('All');
  const [year, setYear] = useState('All');
  const [drive, setDrive] = useState('All');
  const [sort, setSort] = useState('listed');
  const [page, setPage] = useState(1);
  const [openSections, setOpenSections] = useState({
    category: false,
    condition: false,
    state: false,
    year: false,
    drive: false,
  });

  useEffect(() => {
    setPage(1);
  }, [line, condition, stateName, year, drive, sort, keyword]);

  const states = useMemo(
    () => ['All', ...Array.from(new Set(products.map((product) => product.state))).sort()],
    [products],
  );

  const years = useMemo(
    () => ['All', ...Array.from(new Set(products.map((product) => product.year))).sort((a, b) => Number(b) - Number(a))],
    [products],
  );

  const drives = useMemo(
    () => ['All', ...Array.from(new Set(products.map((product) => product.drive).filter(Boolean))).sort()],
    [products],
  );

  const filtered = useMemo(() => {
    const needle = keyword.trim().toLowerCase();
    const next = products.filter((product) => {
      if (line !== 'all' && product.line !== line) return false;
      if (condition !== 'All' && product.condition !== condition) return false;
      if (stateName !== 'All' && product.state !== stateName) return false;
      if (year !== 'All' && product.year !== year) return false;
      if (drive !== 'All' && product.drive !== drive) return false;
      if (needle) {
        const hay = `${product.name} ${product.type} ${product.location} ${product.serial}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    if (sort === 'az') next.sort((a, b) => byName(a).localeCompare(byName(b)));
    if (sort === 'za') next.sort((a, b) => byName(b).localeCompare(byName(a)));
    return next;
  }, [products, line, condition, stateName, year, drive, sort, keyword]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const toggleSection = (key) => {
    setOpenSections((currentOpen) => ({ ...currentOpen, [key]: !currentOpen[key] }));
  };

  const clearFilters = () => {
    setKeyword('');
    setCondition('All');
    setStateName('All');
    setYear('All');
    setDrive('All');
    onLine('all');
  };

  const filterProps = {
    line,
    onLine,
    condition,
    setCondition,
    stateName,
    setStateName,
    year,
    setYear,
    drive,
    setDrive,
    states,
    years,
    drives,
    openSections,
    toggleSection,
    clearFilters,
  };

  return (
    <div id="product-browser">
      {heading}

      {/* Mobile / tablet: filters above the lot */}
      <FilterPanel
        {...filterProps}
        id="equipment-filters-mobile"
        className="mt-5 overflow-hidden rounded-xl border border-primary/15 bg-white min-[1100px]:hidden"
      />

      <div className="mt-5 grid items-start gap-5 min-[1100px]:grid-cols-[minmax(260px,300px)_minmax(0,1fr)] min-[1100px]:gap-6 min-[1440px]:grid-cols-[minmax(280px,340px)_minmax(0,1fr)] min-[1440px]:gap-8 min-[1920px]:grid-cols-[360px_minmax(0,1fr)]">
        {/* Desktop filter — self-start required for sticky in CSS grid; docks under fixed navbar */}
        <FilterPanel
          {...filterProps}
          id="equipment-filters"
          className="sticky z-40 hidden max-h-[calc(100svh-var(--header-h,180px)-8px)] w-full self-start overflow-y-auto overscroll-contain rounded-xl border border-primary/15 bg-white min-[1100px]:block"
          style={{ top: 'var(--header-h, 180px)' }}
        />

        <div className="min-w-0">
          <div
            className="sticky z-30 -mx-1 border-b border-primary/10 bg-white/95 px-1 pb-3 backdrop-blur-sm"
            style={{ top: 'var(--header-h, 180px)' }}
          >
            <div className="grid grid-cols-1 items-center gap-3 rounded-xl border border-primary/10 bg-primary/5 px-3 py-2.5 min-[768px]:grid-cols-[auto_minmax(0,1fr)_auto] min-[768px]:gap-4 min-[768px]:px-4">
              <p className="m-0 shrink-0 text-[13px] font-semibold text-primary/75">
                <span className="font-extrabold text-primary">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'listing' : 'listings'}
              </p>
              <form
                onSubmit={(event) => event.preventDefault()}
                className="flex min-w-0 w-full max-w-[420px] justify-self-center overflow-hidden rounded-md border border-primary/20 bg-white"
              >
                <input
                  type="search"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="Enter Keyword(s)"
                  className="min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-[13px] text-primary outline-none placeholder:text-primary/40"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center gap-1 border-none bg-primary px-2.5 text-[12px] font-bold text-white hover:bg-primary/90"
                >
                  <Search size={13} />
                  Search
                </button>
              </form>
              <label className="inline-flex shrink-0 items-center gap-2 justify-self-start rounded-md border border-primary/20 bg-white px-2.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.04em] text-primary min-[768px]:justify-self-end">
                Sort
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="cursor-pointer border-none bg-transparent text-[13px] font-semibold normal-case text-primary outline-none"
                >
                  <option value="listed">Recently listed</option>
                  <option value="az">A to Z</option>
                  <option value="za">Z to A</option>
                </select>
              </label>
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="m-0 mt-6 border border-primary/15 bg-[#034a32] px-4 py-6 text-center text-[14px] font-semibold text-white min-[640px]:px-5 min-[640px]:py-8 min-[640px]:text-[15px]">
              No listings match those filters. Clear a filter to see the rest of the lot.
            </p>
          ) : (
            <CardRail className="mt-5" columns={3}>
              {visible.map((product) => (
                <div key={product.id} className={slideClass}>
                  <ListingCard product={product} />
                </div>
              ))}
            </CardRail>
          )}

          {pages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                aria-label="Previous page"
                disabled={current <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className={`grid h-8 w-8 place-items-center rounded-md border min-[768px]:h-9 min-[768px]:w-9 ${
                  current <= 1
                    ? 'cursor-not-allowed border-primary/10 bg-white text-primary/30'
                    : 'cursor-pointer border-primary/20 bg-white text-primary hover:border-primary'
                }`}
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => setPage(number)}
                  className={`h-8 min-w-8 cursor-pointer rounded-md border px-2 text-[12px] font-extrabold min-[768px]:h-9 min-[768px]:min-w-9 min-[768px]:text-[13px] ${
                    number === current
                      ? 'border-primary bg-primary text-white'
                      : 'border-primary/20 bg-white text-primary hover:border-primary'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                type="button"
                aria-label="Next page"
                disabled={current >= pages}
                onClick={() => setPage((value) => Math.min(pages, value + 1))}
                className={`grid h-8 w-8 place-items-center rounded-md border min-[768px]:h-9 min-[768px]:w-9 ${
                  current >= pages
                    ? 'cursor-not-allowed border-primary/10 bg-white text-primary/30'
                    : 'cursor-pointer border-primary/20 bg-white text-primary hover:border-primary'
                }`}
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
