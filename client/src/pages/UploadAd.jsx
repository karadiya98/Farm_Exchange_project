import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  ImagePlus,
  LayoutTemplate,
  MapPin,
  Megaphone,
  ShieldCheck,
  Upload,
} from 'lucide-react';
import sellLot from '../public/deal-paths/sell-lot.jpg';
import { useAuth } from '../auth';
import useAccountGate from '../hooks/useAccountGate';

const features = [
  {
    icon: ImagePlus,
    title: 'Photo-ready slots',
    body: 'Upload up to three vertical frames sized for the left and right rails. We crop to the ad band so your machine stays in frame.',
  },
  {
    icon: LayoutTemplate,
    title: 'Placement control',
    body: 'Pick left rail, right rail, or both. Your creative rotates with the scroll sets so it is not stuck on one screen forever.',
  },
  {
    icon: MapPin,
    title: 'Yard and link',
    body: 'Tie the ad to a listing, a dealer page, or a custom URL. Buyers tap through to the page you name.',
  },
  {
    icon: Megaphone,
    title: 'Run window',
    body: 'Choose a start day and how many scroll bands you want to cover. The desk confirms before it goes live.',
  },
  {
    icon: ShieldCheck,
    title: 'Desk review',
    body: 'Every upload is checked for clear photos and plain language. No fake prices. No stock that is not on a USA lot.',
  },
  {
    icon: BadgeCheck,
    title: 'Seller badge',
    body: 'Verified sellers get a small mark on the ad so buyers know the iron is already tagged on Farm Exchange.',
  },
];

const steps = [
  'Add your business name and a contact email the desk can answer.',
  'Drop 1–3 images. Tall frames work best on the side rails.',
  'Choose left, right, or both rails and the link buyers should open.',
  'Set the run window. We review and write back before it goes live.',
];

export default function UploadAd() {
  const { user, apiJson } = useAuth();
  const navigate = useNavigate();
  const { gateOk, gateError } = useAccountGate('/api/ads/access', '/upload-ad');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    link: '',
    side: 'both',
    notes: '',
  });
  const [files, setFiles] = useState([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!gateOk || !user) return;
    setForm((current) => ({
      ...current,
      name: current.name || user.name || '',
      email: current.email || user.email || '',
    }));
  }, [gateOk, user]);

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const onFiles = (event) => {
    const next = Array.from(event.target.files || []).slice(0, 3);
    setFiles(next);
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await apiJson('/api/ads', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          fileNames: files.map((file) => file.name),
        }),
      });
      setSent(true);
    } catch (err) {
      if (err.status === 401) {
        navigate(`/signup?mode=login&next=${encodeURIComponent('/upload-ad')}`, { replace: true });
        return;
      }
      setError(err.message || 'The desk could not save that ad request.');
    } finally {
      setBusy(false);
    }
  };

  const field =
    'w-full rounded-md border border-primary/20 bg-white px-3 py-2.5 text-[14px] text-primary outline-none focus:border-primary';

  if (!gateOk) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 bg-white px-4 py-16 text-primary">
        <p className="m-0 text-[15px] font-semibold text-primary/70">
          {gateError || 'Checking the desk…'}
        </p>
        {gateError && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="cursor-pointer border border-primary bg-white px-4 py-2 text-[12px] font-extrabold uppercase text-primary"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="bg-white text-primary">
      <div className="relative overflow-hidden border-b border-primary/10">
        <img src={sellLot} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative content-wrap py-14 min-[993px]:py-20">
          <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/70">Advertise on the rails</p>
          <h1 className="m-0 mt-2 text-[28px] font-black uppercase leading-tight text-white min-[640px]:text-[40px] min-[1600px]:text-[48px]">
            Upload your own ad
          </h1>
          <p className="m-0 mt-3 max-w-[520px] text-[15px] leading-[1.65] text-white/85">
            Put your machine or dealer brand on the side rails buyers already see while they scroll the lot. Sign in is required before the desk will take an ad request.
          </p>
        </div>
      </div>

      <div className="content-wrap py-12 min-[993px]:py-16">
        <div className="grid gap-10 min-[1100px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[1100px]:gap-14">
          <div>
            <p className="m-0 section-kicker text-[11px] font-extrabold uppercase tracking-[0.1em]">What you get</p>
            <h2 className="m-0 mt-2 text-[22px] font-black uppercase min-[640px]:text-[28px]">Built for the Farm Exchange rails</h2>
            <div className="mt-6 grid gap-4 min-[640px]:grid-cols-2">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="border border-primary/15 bg-white p-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center bg-primary text-white">
                      <Icon size={16} />
                    </span>
                    <h3 className="m-0 mt-3 text-[14px] font-black uppercase">{item.title}</h3>
                    <p className="m-0 mt-1.5 text-[13px] leading-[1.55] text-primary/70">{item.body}</p>
                  </article>
                );
              })}
            </div>

            <ol className="mt-8 m-0 list-none space-y-3 p-0">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-[14px] leading-snug text-primary/80">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-accent text-[12px] font-black text-white">
                    {index + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border border-primary/15 bg-white p-5 min-[640px]:p-6">
            {sent ? (
              <div>
                <p className="m-0 section-kicker text-[11px] font-extrabold uppercase tracking-[0.1em]">Request saved</p>
                <h2 className="m-0 mt-2 text-[22px] font-black uppercase">The desk has your draft</h2>
                <p className="m-0 mt-2 text-[14px] leading-[1.6] text-primary/75">
                  Your request is saved on the account. The desk will review the creative and write back before anything goes live on the rails.
                </p>
                <Link
                  to="/equipment"
                  className="cta-box mt-5 px-4 py-2.5 text-[12px]"
                >
                  Back to the lot <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
                <p className="m-0 section-kicker text-[11px] font-extrabold uppercase tracking-[0.1em]">Ad request</p>
                <h2 className="m-0 text-[20px] font-black uppercase">Send your creative</h2>

                <label className="block">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.04em] text-primary">Business or seller name</span>
                  <input required value={form.name} onChange={set('name')} className={field} placeholder="Sheridan Yard Iron" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.04em] text-primary">Email</span>
                  <input required type="email" value={form.email} onChange={set('email')} className={field} placeholder="you@farm.com" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.04em] text-primary">Click-through link</span>
                  <input value={form.link} onChange={set('link')} className={field} placeholder="/listing/6 or https://…" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.04em] text-primary">Rail side</span>
                  <select value={form.side} onChange={set('side')} className={field}>
                    <option value="both">Left and right</option>
                    <option value="left">Left rail only</option>
                    <option value="right">Right rail only</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.04em] text-primary">Images (up to 3)</span>
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-primary/30 bg-white px-4 py-6 text-center">
                    <Upload size={20} className="text-accent" />
                    <span className="text-[13px] font-bold text-primary">
                      {files.length ? `${files.length} file${files.length > 1 ? 's' : ''} ready` : 'Drop or choose photos'}
                    </span>
                    <span className="text-[11px] text-primary/60">JPG or PNG · tall frames preferred</span>
                    <input type="file" accept="image/*" multiple onChange={onFiles} className="sr-only" />
                  </label>
                </label>
                <label className="block">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.04em] text-primary">Notes for the desk</span>
                  <textarea
                    value={form.notes}
                    onChange={set('notes')}
                    rows={3}
                    className={`${field} resize-none`}
                    placeholder="Run dates, listing IDs, or copy you want under the frame."
                  />
                </label>
                {error && <p className="m-0 text-[13px] font-semibold text-accent">{error}</p>}
                <button
                  type="submit"
                  disabled={busy}
                  className="mt-1 inline-flex cursor-pointer items-center justify-center gap-2 border-none bg-accent py-3 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white hover:bg-accent-dark disabled:cursor-wait disabled:opacity-70"
                >
                  {busy ? 'Sending…' : 'Submit ad request'} <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
