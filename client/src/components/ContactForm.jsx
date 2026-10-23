import { useState } from 'react';
import { ArrowRight, Building2, ChevronDown, Mail, MapPin, MessageSquare, Phone, Tag, User } from 'lucide-react';
import Reveal from './Reveal';

const needs = [
  'Container shelter',
  'Tractor or mower',
  'Skid steer iron',
  'Irrigation pump',
  'Spare parts',
  'Dealership',
  'Freight quote',
];

const empty = {
  name: '',
  company: '',
  email: '',
  phone: '',
  state: '',
  need: '',
  message: '',
};

const fieldClass =
  'w-full rounded-md border border-primary/15 bg-white py-3 pl-10 pr-3 text-[14px] text-primary outline-none transition-colors duration-200 placeholder:text-primary/40 focus:border-primary';

const labelClass = 'mb-2 block text-[13px] font-semibold text-primary';

function FieldIcon({ icon: Icon }) {
  return <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary/70" />;
}

export default function ContactForm({ headingLevel = 'h2' } = {}) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const TitleTag = headingLevel === 'h1' ? 'h1' : 'h2';
  const FormTitleTag = headingLevel === 'h1' ? 'h2' : 'h3';

  const set = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Add your name so the desk knows who to call.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Use an email the desk can answer.';
    if (!form.message.trim()) next.message = 'Tell us the acre, the machine, or the freight lane.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
  };

  return (
    <section id="contact" className="section-y bg-white text-primary">
      <Reveal className="content-wrap">
        <div className="mx-auto w-full max-w-[1100px] min-[1600px]:max-w-[1400px] min-[2000px]:max-w-[1760px]">
        <TitleTag className="m-0 text-center text-[26px] font-bold tracking-[-0.4px] min-[640px]:text-[40px] min-[1600px]:text-[52px] min-[2400px]:text-[64px]">
          Let’s get in touch
        </TitleTag>

        <div className="mt-10 grid gap-8 min-[640px]:grid-cols-3">
          <div className="flex items-start gap-3 min-[640px]:flex-col min-[640px]:items-center min-[640px]:text-center">
            <Phone size={18} className="mt-0.5 shrink-0 text-primary" />
            <div className="text-[13px] leading-[1.55]">
              <p className="m-0 font-semibold">
                <a href="tel:18002248005" className="text-primary no-underline hover:text-accent">1-800-224-8005</a>
              </p>
              <p className="m-0 text-primary/70">Toll free</p>
              <p className="m-0 mt-2 font-semibold">
                <a href="tel:18556863276" className="text-primary no-underline hover:text-accent">855-686-FARM</a>
              </p>
              <p className="m-0 text-primary/70">Toll free</p>
              <p className="m-0 mt-2 font-semibold">
                <a href="tel:15162528000" className="text-primary no-underline hover:text-accent">516-252-8000</a>
              </p>
              <p className="m-0 text-primary/70">Main number for Long Island</p>
              <p className="m-0 mt-2 font-semibold">
                <a href="tel:13072071777" className="text-primary no-underline hover:text-accent">307-207-1777</a>
              </p>
              <p className="m-0 text-primary/70">Sheridan desk</p>
            </div>
          </div>
          <div className="flex items-start gap-3 min-[640px]:flex-col min-[640px]:items-center min-[640px]:text-center">
            <Mail size={18} className="mt-0.5 shrink-0 text-primary" />
            <div className="text-[13px] leading-[1.55]">
              <p className="m-0 break-all font-semibold">
                <a href="mailto:welcome@farmexchange.com" className="text-primary no-underline hover:text-accent">welcome@farmexchange.com</a>
              </p>
              <p className="section-kicker m-0 mt-2 font-extrabold uppercase tracking-[0.08em]">Since 1999</p>
            </div>
          </div>
          <div className="flex items-start gap-3 min-[640px]:flex-col min-[640px]:items-center min-[640px]:text-center">
            <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
            <div className="text-[13px] leading-[1.55]">
              <p className="m-0 font-semibold">30 N GOULD STREET</p>
              <p className="m-0 text-primary/70">SHERIDAN, WY 82801</p>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-2xl border-2 border-primary/20 bg-white px-5 py-6 min-[640px]:px-8 min-[640px]:py-8">
        <FormTitleTag className="m-0 text-[22px] font-bold">Or fill out the form below</FormTitleTag>

        {sent ? (
          <div className="mt-8 rounded-md border border-primary/10 bg-[#F7F5EF] px-6 py-10 text-center">
            <p className="m-0 text-[13px] font-semibold uppercase tracking-[1px] text-accent">Note received</p>
            <p className="m-0 mt-3 text-[22px] font-bold">
              The desk has your name, {form.name.trim().split(' ')[0]}.
            </p>
            <p className="m-0 mx-auto mt-3 max-w-[460px] text-[14px] leading-[1.7] text-primary/75">
              We will answer {form.email.trim()} about {form.need || 'your note'}. If the season is moving, call 1-800-224-8005.
            </p>
            <button
              type="button"
              onClick={() => {
                setForm(empty);
                setSent(false);
              }}
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-md border-none bg-primary px-6 py-3 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-primary"
            >
              Write another note <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-6">
            <div className="grid gap-5 min-[640px]:grid-cols-2">
              <label className="block">
                <span className={labelClass}>What you need</span>
                <span className="relative block">
                  <FieldIcon icon={Tag} />
                  <select
                    value={form.need}
                    onChange={set('need')}
                    className={`${fieldClass} appearance-none pr-10`}
                  >
                    <option value="">Choose one option...</option>
                    {needs.map((need) => (
                      <option key={need} value={need}>{need}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary/70" />
                </span>
              </label>

              <label className="block">
                <span className={labelClass}>State or province</span>
                <span className="relative block">
                  <FieldIcon icon={MapPin} />
                  <input value={form.state} onChange={set('state')} className={fieldClass} placeholder="Nebraska" autoComplete="address-level1" />
                </span>
              </label>

              <label className="block">
                <span className={labelClass}>Full name <span className="text-accent">*</span></span>
                <span className="relative block">
                  <FieldIcon icon={User} />
                  <input value={form.name} onChange={set('name')} className={fieldClass} placeholder="Enter your full name..." autoComplete="name" />
                </span>
                {errors.name && <span className="mt-1 block text-[12px] text-accent">{errors.name}</span>}
              </label>

              <label className="block">
                <span className={labelClass}>Email <span className="text-accent">*</span></span>
                <span className="relative block">
                  <FieldIcon icon={Mail} />
                  <input value={form.email} onChange={set('email')} type="email" className={fieldClass} placeholder="Enter your email address..." autoComplete="email" />
                </span>
                {errors.email && <span className="mt-1 block text-[12px] text-accent">{errors.email}</span>}
              </label>

              <label className="block">
                <span className={labelClass}>Farm or company</span>
                <span className="relative block">
                  <FieldIcon icon={Building2} />
                  <input value={form.company} onChange={set('company')} className={fieldClass} placeholder="Enter your organization..." autoComplete="organization" />
                </span>
              </label>

              <label className="block">
                <span className={labelClass}>Phone number</span>
                <span className="relative block">
                  <FieldIcon icon={Phone} />
                  <input value={form.phone} onChange={set('phone')} type="tel" className={fieldClass} placeholder="Enter your phone number..." autoComplete="tel" />
                </span>
              </label>
            </div>

            <label className="mt-5 block">
              <span className={labelClass}>Message <span className="text-accent">*</span></span>
              <span className="relative block">
                <MessageSquare size={16} className="pointer-events-none absolute left-3 top-3.5 text-primary/70" />
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  rows={5}
                  className={`${fieldClass} resize-y py-3`}
                  placeholder="Enter your message here..."
                />
              </span>
              {errors.message && <span className="mt-1 block text-[12px] text-accent">{errors.message}</span>}
            </label>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center gap-2 rounded-none border border-primary bg-primary px-7 py-3 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-primary"
              >
                Send to the desk <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}
        </div>
        </div>
      </Reveal>
    </section>
  );
}
