import { adminAds } from '../data';

const tone = {
  pending: 'bg-yellow/30 text-primary',
  live: 'bg-primary text-white',
  reviewed: 'bg-primary/10 text-primary',
  rejected: 'bg-accent/10 text-accent',
};

export default function AdminAds() {
  return (
    <section className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="m-0 text-[18px] font-black text-primary min-[640px]:text-[20px]">Side-rail ads</h2>
          <p className="m-0 mt-1 text-[13px] text-primary/55">Creative review before rails go live</p>
        </div>
        <p className="m-0 text-[12px] font-extrabold uppercase text-primary/45">{adminAds.length} requests</p>
      </div>

      <div className="mt-4 grid gap-2.5">
        {adminAds.map((ad) => (
          <article key={ad.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/10 bg-[#f6f9f7] px-3.5 py-3 min-[640px]:px-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="m-0 text-[12px] font-extrabold uppercase text-accent">{ad.id}</p>
                <span className={`px-2 py-0.5 text-[10px] font-extrabold uppercase ${tone[ad.status] || tone.pending}`}>{ad.status}</span>
              </div>
              <h3 className="m-0 mt-1 text-[15px] font-black text-primary">{ad.business}</h3>
              <p className="m-0 mt-0.5 text-[12px] text-primary/55">
                Rail: {ad.side} · {ad.files} file{ad.files === 1 ? '' : 's'} · {ad.when}
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="cursor-pointer rounded-lg border border-primary bg-white px-3 py-2 text-[11px] font-extrabold uppercase text-primary hover:bg-primary hover:text-white">
                Review
              </button>
              <button type="button" className="cursor-pointer rounded-lg border-none bg-accent px-3 py-2 text-[11px] font-extrabold uppercase text-white hover:bg-accent-dark">
                Approve
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
