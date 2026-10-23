import { CONTACT } from '../../data/contact';
import { useAuth } from '../../auth';

export default function AdminSettings() {
  const { user } = useAuth();

  return (
    <div className="grid gap-3 min-[993px]:grid-cols-2 min-[993px]:gap-4">
      <section className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-5">
        <h2 className="m-0 text-[18px] font-black text-primary">Desk settings</h2>
        <p className="m-0 mt-1 text-[13px] text-primary/55">Signed-in admin on this browser</p>
        <dl className="m-0 mt-4 space-y-3">
          {[
            ['Name', user?.name || '—'],
            ['Email', user?.email || '—'],
            ['Role', 'Yard admin (demo)'],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-wrap justify-between gap-2 border-b border-primary/8 pb-2">
              <dt className="text-[12px] font-extrabold uppercase text-primary/45">{k}</dt>
              <dd className="m-0 text-[14px] font-bold text-primary">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-2xl border border-primary/10 bg-white p-3.5 shadow-[0_12px_40px_rgb(2_70_46/0.06)] min-[640px]:p-5">
        <h2 className="m-0 text-[18px] font-black text-primary">Public desk lines</h2>
        <p className="m-0 mt-1 text-[13px] text-primary/55">Shown on the Farm Exchange site</p>
        <ul className="m-0 mt-4 list-none space-y-2.5 p-0 text-[14px]">
          <li className="flex justify-between gap-3 border-b border-primary/8 pb-2">
            <span className="text-primary/55">Toll free</span>
            <strong>{CONTACT.tollFree.display}</strong>
          </li>
          <li className="flex justify-between gap-3 border-b border-primary/8 pb-2">
            <span className="text-primary/55">Long Island</span>
            <strong>{CONTACT.longIsland.display}</strong>
          </li>
          <li className="flex justify-between gap-3 border-b border-primary/8 pb-2">
            <span className="text-primary/55">Sheridan</span>
            <strong>{CONTACT.sheridan.display}</strong>
          </li>
          <li className="flex justify-between gap-3 border-b border-primary/8 pb-2">
            <span className="text-primary/55">Email</span>
            <strong className="break-all text-right">{CONTACT.email}</strong>
          </li>
          <li className="flex justify-between gap-3">
            <span className="text-primary/55">Address</span>
            <strong className="max-w-[220px] text-right">{CONTACT.addressOneLine}</strong>
          </li>
        </ul>
      </section>
    </div>
  );
}
