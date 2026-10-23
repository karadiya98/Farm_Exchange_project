/** Hover caption for plain images — parent must use `group relative overflow-hidden`. */
export default function ImageHoverCaption({ kicker, title, body, compact = false }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end overflow-hidden"
    >
      <span className="absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/30 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 [@media(hover:none)]:opacity-60" />
      <span
        className={`relative translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 ${
          compact ? 'px-2.5 pb-2.5 pt-8' : 'px-3.5 pb-3.5 pt-10 min-[640px]:px-4 min-[640px]:pb-4'
        }`}
      >
        {kicker ? (
          <span className={`block font-black uppercase tracking-[0.08em] text-yellow ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
            {kicker}
          </span>
        ) : null}
        {title ? (
          <span
            className={`mt-1 block font-black uppercase leading-tight text-white ${
              compact ? 'text-[12px]' : 'text-[14px] min-[640px]:text-[16px] min-[1600px]:text-[18px]'
            }`}
          >
            {title}
          </span>
        ) : null}
        {body ? (
          <span
            className={`mt-1 block font-semibold leading-snug text-white/90 ${
              compact ? 'text-[10px] line-clamp-2' : 'text-[12px] min-[640px]:text-[13px] line-clamp-3'
            }`}
          >
            {body}
          </span>
        ) : null}
      </span>
    </span>
  );
}
