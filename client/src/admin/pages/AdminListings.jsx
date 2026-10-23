import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ImagePlus,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useAuth } from '../../auth';
import { catalogLines, products } from '../../data/catalog';

const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const emptyForm = {
  year: '',
  name: '',
  type: '',
  line: 'tractors',
  price: '',
  payment: '',
  hours: '',
  drive: '',
  horsepower: '',
  rops: '',
  load: '',
  serial: '',
  description: '',
  location: '',
  state: '',
  phone: '(800) 224-8005',
  seller: 'Farm Exchange',
  featured: false,
  special: false,
};

const fieldClass =
  'w-full rounded-lg border border-primary/15 bg-[#f7faf8] px-3 py-2.5 text-[13px] font-semibold text-primary outline-none transition focus:border-primary focus:bg-white';
const labelClass = 'mb-1 block text-[11px] font-extrabold uppercase tracking-[0.06em] text-primary/50';

function photoSrc(url) {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('http') || url.startsWith('blob:')) return url;
  if (url.startsWith('/uploads') && API) return `${API}${url}`;
  return url;
}

async function postForm(path, formData) {
  const response = await fetch(`${API}${path}`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'Could not save listing.');
    error.status = response.status;
    throw error;
  }
  return data;
}

export default function AdminListings() {
  const { apiJson } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiJson('/api/listings');
      setListings(Array.isArray(data.listings) ? data.listings : []);
    } catch (err) {
      setError(err.message || 'Could not load listings.');
    } finally {
      setLoading(false);
    }
  }, [apiJson]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return listings;
    return listings.filter((item) =>
      [item.name, item.year, item.serial, item.type, item.location, item.line]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q)),
    );
  }, [listings, query]);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const onPickFiles = (event) => {
    const picked = Array.from(event.target.files || []);
    setFiles((prev) => [...prev, ...picked].slice(0, 3));
    event.target.value = '';
  };

  const removePreview = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setFiles([]);
    setShowForm(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (typeof value === 'boolean') body.append(key, value ? 'true' : 'false');
        else body.append(key, value ?? '');
      });
      files.slice(0, 3).forEach((file) => body.append('photos', file));
      const data = await postForm('/api/listings', body);
      setListings((prev) => [data.listing, ...prev]);
      setNotice(`Added ${data.listing.year} ${data.listing.name} to the lot.`);
      resetForm();
    } catch (err) {
      setError(err.message || 'Could not save listing.');
    } finally {
      setSaving(false);
    }
  };

  const importCatalog = async () => {
    setSeeding(true);
    setError('');
    setNotice('');
    try {
      const payload = products.map((item) => ({
        id: item.id,
        year: item.year,
        name: item.name,
        type: item.type,
        line: item.line,
        price: item.price,
        payment: item.payment,
        hours: item.hours,
        drive: item.drive,
        horsepower: item.horsepower,
        rops: item.rops,
        load: item.load,
        serial: item.serial,
        description: item.description,
        location: item.location,
        state: item.state,
        phone: item.phone,
        seller: item.seller,
        featured: item.featured,
        special: item.special,
        updated: item.updated,
        photos: (item.photos || []).slice(0, 3).map((src) => {
          if (!src) return '';
          if (src.startsWith('http') || src.startsWith('data:')) return src;
          return `${window.location.origin}${src.startsWith('/') ? '' : '/'}${src}`;
        }),
      }));
      const data = await apiJson('/api/listings/seed', {
        method: 'POST',
        body: JSON.stringify({ listings: payload }),
      });
      setListings(Array.isArray(data.listings) ? data.listings : []);
      setNotice(`Imported ${data.upserted || payload.length} catalog listings into the database.`);
    } catch (err) {
      setError(err.message || 'Could not import catalog.');
    } finally {
      setSeeding(false);
    }
  };

  const removeListing = async (id) => {
    if (!window.confirm('Remove this listing from the database?')) return;
    setError('');
    try {
      await apiJson(`/api/listings/${id}`, { method: 'DELETE' });
      setListings((prev) => prev.filter((item) => item.id !== id));
      setNotice('Listing removed.');
    } catch (err) {
      setError(err.message || 'Could not delete listing.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-2xl border border-primary/10 bg-white p-4 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="m-0 text-[10px] font-extrabold uppercase tracking-[0.12em] text-accent">Lot inventory</p>
            <h2 className="m-0 mt-1 text-[22px] font-black tracking-tight text-primary">Listings</h2>
            <p className="m-0 mt-1 text-[13px] text-primary/55">
              Add yard tags with up to 3 photos. Catalog iron can be synced into the database.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/equipment"
              className="rounded-xl border border-primary/20 bg-white px-3.5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.04em] text-primary no-underline hover:border-primary hover:bg-primary hover:text-white"
            >
              Public lot
            </Link>
            <button
              type="button"
              onClick={importCatalog}
              disabled={seeding}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-primary/20 bg-[#f3f7f4] px-3.5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.04em] text-primary disabled:opacity-60"
            >
              {seeding ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              {seeding ? 'Importing…' : 'Import catalog'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-none bg-primary px-3.5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_8px_18px_rgb(2_70_46/0.2)]"
            >
              {showForm ? <X size={14} /> : <Plus size={14} />}
              {showForm ? 'Close form' : 'Add listing'}
            </button>
          </div>
        </div>

        {(error || notice) && (
          <p
            className={`mt-4 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold ${
              error ? 'bg-accent/10 text-accent' : 'bg-primary/8 text-primary'
            }`}
          >
            {error || notice}
          </p>
        )}

        {showForm && (
          <form onSubmit={onSubmit} className="mt-5 rounded-2xl border border-primary/10 bg-[linear-gradient(180deg,#f7faf8_0%,#ffffff_40%)] p-4 min-[640px]:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="m-0 text-[16px] font-black text-primary">New listing</h3>
                <p className="m-0 mt-0.5 text-[12px] text-primary/50">Same fields as the public equipment sheet</p>
              </div>
              <p className="m-0 text-[11px] font-bold uppercase tracking-[0.06em] text-primary/40">
                {files.length}/3 photos
              </p>
            </div>

            <div className="grid gap-3 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
              <label>
                <span className={labelClass}>Year *</span>
                <input className={fieldClass} value={form.year} onChange={(e) => setField('year', e.target.value)} required placeholder="2024" />
              </label>
              <label className="min-[768px]:col-span-2 min-[1200px]:col-span-2">
                <span className={labelClass}>Name *</span>
                <input className={fieldClass} value={form.name} onChange={(e) => setField('name', e.target.value)} required placeholder="Row Tractor" />
              </label>
              <label>
                <span className={labelClass}>Type *</span>
                <input className={fieldClass} value={form.type} onChange={(e) => setField('type', e.target.value)} required placeholder="Tractors" />
              </label>
              <label>
                <span className={labelClass}>Line *</span>
                <select className={fieldClass} value={form.line} onChange={(e) => setField('line', e.target.value)} required>
                  {catalogLines.filter((l) => l.id !== 'all').map((line) => (
                    <option key={line.id} value={line.id}>{line.label}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className={labelClass}>Price *</span>
                <input className={fieldClass} value={form.price} onChange={(e) => setField('price', e.target.value)} required placeholder="46,800" />
              </label>
              <label>
                <span className={labelClass}>Payment / mo</span>
                <input className={fieldClass} value={form.payment} onChange={(e) => setField('payment', e.target.value)} placeholder="1,264.00" />
              </label>
              <label>
                <span className={labelClass}>Hours / condition</span>
                <input className={fieldClass} value={form.hours} onChange={(e) => setField('hours', e.target.value)} placeholder="748 or New" />
              </label>
              <label>
                <span className={labelClass}>Drive</span>
                <input className={fieldClass} value={form.drive} onChange={(e) => setField('drive', e.target.value)} placeholder="4WD" />
              </label>
              <label>
                <span className={labelClass}>Horsepower</span>
                <input className={fieldClass} value={form.horsepower} onChange={(e) => setField('horsepower', e.target.value)} placeholder="155 HP" />
              </label>
              <label>
                <span className={labelClass}>ROPS</span>
                <input className={fieldClass} value={form.rops} onChange={(e) => setField('rops', e.target.value)} placeholder="Cab / Open / N/A" />
              </label>
              <label>
                <span className={labelClass}>Load / capacity</span>
                <input className={fieldClass} value={form.load} onChange={(e) => setField('load', e.target.value)} placeholder="8,600 lb" />
              </label>
              <label>
                <span className={labelClass}>Serial *</span>
                <input className={fieldClass} value={form.serial} onChange={(e) => setField('serial', e.target.value)} required placeholder="RT21-0748F" />
              </label>
              <label>
                <span className={labelClass}>Location</span>
                <input className={fieldClass} value={form.location} onChange={(e) => setField('location', e.target.value)} placeholder="Temple, Texas" />
              </label>
              <label>
                <span className={labelClass}>State</span>
                <input className={fieldClass} value={form.state} onChange={(e) => setField('state', e.target.value)} placeholder="Texas" />
              </label>
              <label>
                <span className={labelClass}>Phone</span>
                <input className={fieldClass} value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
              </label>
              <label>
                <span className={labelClass}>Seller</span>
                <input className={fieldClass} value={form.seller} onChange={(e) => setField('seller', e.target.value)} />
              </label>
              <label className="min-[768px]:col-span-2 min-[1200px]:col-span-3">
                <span className={labelClass}>Description</span>
                <textarea
                  className={`${fieldClass} min-h-[96px] resize-y`}
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  placeholder="Yard tag notes, hitch, tires, freight notes…"
                />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              <label className="inline-flex cursor-pointer items-center gap-2 text-[13px] font-semibold text-primary">
                <input type="checkbox" checked={form.featured} onChange={(e) => setField('featured', e.target.checked)} className="h-4 w-4 accent-primary" />
                Featured
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-[13px] font-semibold text-primary">
                <input type="checkbox" checked={form.special} onChange={(e) => setField('special', e.target.checked)} className="h-4 w-4 accent-accent" />
                Special
              </label>
            </div>

            <div className="mt-5">
              <span className={labelClass}>Photos (up to 3)</span>
              <div className="mt-1 grid gap-3 min-[640px]:grid-cols-3">
                {[0, 1, 2].map((slot) => (
                  <div
                    key={slot}
                    className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-dashed border-primary/20 bg-[#f3f7f4]"
                  >
                    {previews[slot] ? (
                      <>
                        <img src={previews[slot]} alt="" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePreview(slot)}
                          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg border-none bg-primary/80 text-white"
                          aria-label="Remove photo"
                        >
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-primary/40">
                        <ImagePlus size={22} />
                        <span className="text-[11px] font-bold uppercase">Slot {slot + 1}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-primary/15 bg-white px-3.5 py-2.5 text-[12px] font-extrabold uppercase text-primary hover:border-primary">
                <ImagePlus size={15} />
                Choose photos
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple className="hidden" onChange={onPickFiles} />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-none bg-accent px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.04em] text-white disabled:opacity-60"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                {saving ? 'Saving…' : 'Save listing'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="cursor-pointer rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-[12px] font-extrabold uppercase text-primary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="rounded-2xl border border-primary/10 bg-white p-4 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="m-0 text-[16px] font-black text-primary">On the lot</h3>
            <p className="m-0 mt-0.5 text-[12px] text-primary/50">
              {loading ? 'Loading…' : `${filtered.length} listing${filtered.length === 1 ? '' : 's'}`}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="relative block min-w-[200px] flex-1">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, serial, type…"
                className="w-full rounded-xl border border-primary/12 bg-[#f7faf8] py-2.5 pl-9 pr-3 text-[13px] font-semibold text-primary outline-none focus:border-primary focus:bg-white"
              />
            </label>
            <button
              type="button"
              onClick={load}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-primary/12 bg-white px-3 py-2.5 text-[11px] font-extrabold uppercase text-primary"
            >
              <RefreshCw size={13} /> Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="mt-8 flex items-center justify-center gap-2 py-10 text-primary/50">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-[13px] font-semibold">Loading listings…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-primary/15 bg-[#f7faf8] px-4 py-10 text-center">
            <p className="m-0 text-[15px] font-black text-primary">No listings in the database yet</p>
            <p className="m-0 mt-1 text-[13px] text-primary/55">Import the catalog or add a new yard tag above.</p>
            <button
              type="button"
              onClick={importCatalog}
              disabled={seeding}
              className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border-none bg-primary px-4 py-2.5 text-[11px] font-extrabold uppercase text-white"
            >
              <Upload size={14} /> Import catalog
            </button>
          </div>
        ) : (
          <div className="mt-4 grid gap-3 min-[768px]:grid-cols-2 min-[1400px]:grid-cols-3">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-primary/10 bg-[#f7faf8] transition hover:border-primary/25 hover:shadow-[0_10px_28px_rgb(2_70_46/0.08)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-primary/5">
                  {item.photos?.[0] ? (
                    <img src={photoSrc(item.photos[0])} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  ) : (
                    <div className="grid h-full place-items-center text-primary/30">
                      <ImagePlus size={28} />
                    </div>
                  )}
                  <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
                    {item.featured && (
                      <span className="bg-yellow px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-primary">Featured</span>
                    )}
                    {item.special && (
                      <span className="bg-accent px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-white">Special</span>
                    )}
                    <span className="bg-primary/80 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-white">
                      {item.source === 'catalog' ? 'Catalog' : 'Admin'}
                    </span>
                  </div>
                </div>
                <div className="p-3.5">
                  <h4 className="m-0 truncate text-[14px] font-black text-primary">
                    {item.year} {item.name}
                  </h4>
                  <p className="m-0 mt-0.5 truncate text-[11px] text-primary/50">
                    {item.type} · {item.serial}
                  </p>
                  <p className="m-0 mt-0.5 truncate text-[11px] text-primary/45">{item.location || '—'}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-[16px] font-black text-accent">${item.price}</span>
                    <div className="flex items-center gap-1.5">
                      {item.photos?.length > 1 && (
                        <span className="text-[10px] font-bold uppercase text-primary/40">{item.photos.length} photos</span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeListing(item.id)}
                        className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border-none bg-accent/10 text-accent hover:bg-accent hover:text-white"
                        aria-label="Delete listing"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
