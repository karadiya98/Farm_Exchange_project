export const ORDER_STATUS = {
  tagged: { label: 'Tagged on the lot', tone: 'bg-primary/10 text-primary', darkTone: 'bg-white/10 text-white' },
  freight: { label: 'Freight booked', tone: 'bg-yellow/20 text-primary', darkTone: 'bg-yellow/20 text-yellow' },
  on_road: { label: 'On the road', tone: 'bg-accent/10 text-accent', darkTone: 'bg-accent/30 text-white' },
  delivered: { label: 'Delivered', tone: 'bg-primary text-white', darkTone: 'bg-white text-primary' },
  canceled: { label: 'Canceled', tone: 'bg-primary/5 text-primary/55', darkTone: 'bg-white/5 text-white/55' },
};

const STEPS = ['Tagged', 'Paid', 'Freight booked', 'On the road', 'Delivered'];

export const demoOrders = [
  {
    id: 'FX-24018',
    title: '2024 FX 30×40 Shelter',
    type: 'Container Shelters',
    serial: 'FX3040-4412',
    yard: 'SHERIDAN, WY',
    placed: 'Oct 8, 2026',
    placedIso: '2026-10-08',
    total: 2899,
    freight: 420,
    tax: 174,
    subtotal: 2899,
    amountPaid: 3493,
    currency: 'USD',
    status: 'on_road',
    eta: 'Oct 17–18, 2026',
    steps: STEPS,
    stepIndex: 3,
    carrier: 'Flatbed · Central freight',
    tracking: 'FXTRK-88421',
    gate: 'Liftgate OK · Farm lane off Gould',
    shipTo: {
      name: 'Buyer on account',
      line1: 'Rural Route 4',
      city: 'Buffalo',
      state: 'WY',
      zip: '82834',
    },
    items: [
      { name: '2024 FX 30×40 Shelter', qty: 1, unit: 2899, serial: 'FX3040-4412' },
    ],
    transactions: [
      { id: 'TXN-99102', when: 'Oct 8, 2026 · 9:14 AM', method: 'Card ·••• 4242', type: 'Payment', amount: 3493, status: 'Captured' },
      { id: 'TXN-99118', when: 'Oct 9, 2026 · 2:40 PM', method: 'Desk credit', type: 'Freight hold', amount: 0, status: 'Released' },
    ],
    timeline: [
      { when: 'Oct 8', text: 'Order tagged on the Sheridan lot. Written sheet emailed.' },
      { when: 'Oct 8', text: 'Payment captured. Invoice FX-24018 issued.' },
      { when: 'Oct 10', text: 'Freight booked — flatbed window Oct 17–18.' },
      { when: 'Oct 16', text: 'Truck left Sheridan. Tracking FXTRK-88421.' },
    ],
  },
  {
    id: 'FX-23991',
    title: '15HP Diesel Pump',
    type: 'Irrigation Pumps',
    serial: 'WP15-2208',
    yard: 'Amarillo, Texas',
    placed: 'Sep 22, 2026',
    placedIso: '2026-09-22',
    total: 949,
    freight: 185,
    tax: 57,
    subtotal: 949,
    amountPaid: 1191,
    currency: 'USD',
    status: 'delivered',
    eta: 'Delivered Sep 29, 2026',
    steps: STEPS,
    stepIndex: 4,
    carrier: 'Liftgate · Plains lane',
    tracking: 'FXTRK-77104',
    gate: 'Hard surface · No low wires',
    shipTo: {
      name: 'Buyer on account',
      line1: 'County Road 12',
      city: 'Hereford',
      state: 'TX',
      zip: '79045',
    },
    items: [
      { name: '15HP Diesel Pump', qty: 1, unit: 949, serial: 'WP15-2208' },
    ],
    transactions: [
      { id: 'TXN-98011', when: 'Sep 22, 2026 · 11:02 AM', method: 'ACH', type: 'Payment', amount: 1191, status: 'Settled' },
    ],
    timeline: [
      { when: 'Sep 22', text: 'Pump tagged in Amarillo. Payment settled.' },
      { when: 'Sep 24', text: 'Freight booked with liftgate.' },
      { when: 'Sep 28', text: 'On the road — ETA next day.' },
      { when: 'Sep 29', text: 'Delivered at the farm lane. Signed on sheet.' },
    ],
  },
  {
    id: 'FX-23940',
    title: '72in Brush Cutter',
    type: 'Skid Attachments',
    serial: 'BC72-0904',
    yard: 'Waco, Texas',
    placed: 'Sep 4, 2026',
    placedIso: '2026-09-04',
    total: 4280,
    freight: 310,
    tax: 257,
    subtotal: 4280,
    amountPaid: 4847,
    currency: 'USD',
    status: 'delivered',
    eta: 'Delivered Sep 11, 2026',
    steps: STEPS,
    stepIndex: 4,
    carrier: 'LTL · Couplers in crate',
    tracking: 'FXTRK-66088',
    gate: 'Forks available',
    shipTo: {
      name: 'Buyer on account',
      line1: '210 Farm Spur',
      city: 'Temple',
      state: 'TX',
      zip: '76501',
    },
    items: [
      { name: '72in Brush Cutter', qty: 1, unit: 4280, serial: 'BC72-0904' },
    ],
    transactions: [
      { id: 'TXN-97201', when: 'Sep 4, 2026 · 3:18 PM', method: 'Card ·••• 1881', type: 'Payment', amount: 4847, status: 'Captured' },
    ],
    timeline: [
      { when: 'Sep 4', text: 'Cutter tagged in Waco. Invoice issued.' },
      { when: 'Sep 6', text: 'Freight booked.' },
      { when: 'Sep 11', text: 'Delivered. Couplers confirmed in crate.' },
    ],
  },
  {
    id: 'FX-23812',
    title: 'Compact Skid Steer',
    type: 'Skid Steers',
    serial: 'SS19-1840K',
    yard: 'Waco, Texas',
    placed: 'Aug 18, 2026',
    placedIso: '2026-08-18',
    total: 24500,
    freight: 890,
    tax: 1470,
    subtotal: 24500,
    amountPaid: 26860,
    currency: 'USD',
    status: 'freight',
    eta: 'Oct 22–24, 2026',
    steps: STEPS,
    stepIndex: 2,
    carrier: 'Lowboy · Dealer prep',
    tracking: 'FXTRK-55210',
    gate: 'Wide gate · Hard pack',
    shipTo: {
      name: 'Buyer on account',
      line1: '88 Cotton Lane',
      city: 'Lubbock',
      state: 'TX',
      zip: '79401',
    },
    items: [
      { name: '2019 Compact Skid Steer', qty: 1, unit: 24500, serial: 'SS19-1840K' },
    ],
    transactions: [
      { id: 'TXN-96140', when: 'Aug 18, 2026 · 10:05 AM', method: 'Wire', type: 'Deposit', amount: 5000, status: 'Settled' },
      { id: 'TXN-96188', when: 'Aug 20, 2026 · 4:22 PM', method: 'Wire', type: 'Balance', amount: 21860, status: 'Settled' },
    ],
    timeline: [
      { when: 'Aug 18', text: 'Deposit taken. Unit held on Waco lot.' },
      { when: 'Aug 20', text: 'Balance settled. Full invoice issued.' },
      { when: 'Oct 14', text: 'Freight booked — lowboy window Oct 22–24.' },
    ],
  },
  {
    id: 'FX-23755',
    title: 'Twin-Wall House 20×30',
    type: 'Greenhouses',
    serial: 'GH2030-118',
    yard: 'Lubbock, Texas',
    placed: 'Jul 30, 2026',
    placedIso: '2026-07-30',
    total: 1999,
    freight: 260,
    tax: 120,
    subtotal: 1999,
    amountPaid: 2379,
    currency: 'USD',
    status: 'delivered',
    eta: 'Delivered Aug 8, 2026',
    steps: STEPS,
    stepIndex: 4,
    carrier: 'Parcel freight · Crated panels',
    tracking: 'FXTRK-44109',
    gate: 'Covered unload preferred',
    shipTo: {
      name: 'Buyer on account',
      line1: '4 Greenhouse Rd',
      city: 'Clovis',
      state: 'NM',
      zip: '88101',
    },
    items: [
      { name: 'Twin-Wall House 20×30', qty: 1, unit: 1999, serial: 'GH2030-118' },
    ],
    transactions: [
      { id: 'TXN-95002', when: 'Jul 30, 2026 · 1:55 PM', method: 'Card ·••• 4242', type: 'Payment', amount: 2379, status: 'Captured' },
    ],
    timeline: [
      { when: 'Jul 30', text: 'House tagged. Payment captured.' },
      { when: 'Aug 8', text: 'Delivered. Vent kit checked on sheet.' },
    ],
  },
];

export function formatMoney(n) {
  return `$${Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function statusMeta(status) {
  return ORDER_STATUS[status] || ORDER_STATUS.tagged;
}

export function getOrderById(id) {
  if (!id) return null;
  const needle = String(id).trim().toUpperCase();
  return demoOrders.find((order) => order.id.toUpperCase() === needle) || null;
}

export function getRecentOrders(limit = 3) {
  return demoOrders.slice(0, limit);
}

export function orderGrandTotal(order) {
  return (order.subtotal || 0) + (order.freight || 0) + (order.tax || 0);
}

/** Browser download of a plain printable invoice (demo). */
export function downloadInvoice(order, buyerName = 'Buyer', buyerEmail = '') {
  if (!order) return;
  const grand = orderGrandTotal(order);
  const lines = (order.items || [])
    .map(
      (item) =>
        `<tr>
          <td style="padding:10px 8px;border-bottom:1px solid #ddd;">${item.name}<br/><span style="color:#555;font-size:12px;">Serial ${item.serial || '—'}</span></td>
          <td style="padding:10px 8px;border-bottom:1px solid #ddd;text-align:center;">${item.qty}</td>
          <td style="padding:10px 8px;border-bottom:1px solid #ddd;text-align:right;">${formatMoney(item.unit)}</td>
          <td style="padding:10px 8px;border-bottom:1px solid #ddd;text-align:right;">${formatMoney(item.unit * item.qty)}</td>
        </tr>`
    )
    .join('');

  const txRows = (order.transactions || [])
    .map(
      (tx) =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">${tx.id}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;">${tx.when}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;">${tx.type} · ${tx.method}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${formatMoney(tx.amount)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;">${tx.status}</td>
        </tr>`
    )
    .join('');

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><title>Invoice ${order.id}</title>
<style>
  body{font-family:Georgia,serif;color:#023d26;margin:32px;line-height:1.45}
  h1{margin:0;font-size:28px;letter-spacing:.04em;text-transform:uppercase}
  .muted{color:#456;font-size:13px}
  table{width:100%;border-collapse:collapse;margin-top:16px;font-size:14px}
  .box{border:2px solid #023d26;padding:16px;margin-top:18px}
  .total{font-size:18px;font-weight:700}
  @media print{body{margin:16px}}
</style></head><body>
  <div style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap">
    <div>
      <h1>Farm Exchange</h1>
      <p class="muted">Since 1999 · 30 N GOULD STREET · SHERIDAN, WY 82801<br/>1-800-224-8005 · welcome@farmexchange.com</p>
    </div>
    <div style="text-align:right">
      <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#c82425">Invoice</p>
      <p style="margin:4px 0 0;font-size:22px;font-weight:800">${order.id}</p>
      <p class="muted">Placed ${order.placed}<br/>Status: ${statusMeta(order.status).label}</p>
    </div>
  </div>
  <div class="box">
    <strong>Bill to</strong><br/>
    ${buyerName}${buyerEmail ? `<br/>${buyerEmail}` : ''}<br/>
    ${order.shipTo?.line1 || ''}<br/>
    ${[order.shipTo?.city, order.shipTo?.state, order.shipTo?.zip].filter(Boolean).join(', ')}
  </div>
  <table>
    <thead>
      <tr style="background:#023d26;color:#fff">
        <th style="text-align:left;padding:10px 8px">Item</th>
        <th style="padding:10px 8px">Qty</th>
        <th style="text-align:right;padding:10px 8px">Unit</th>
        <th style="text-align:right;padding:10px 8px">Line</th>
      </tr>
    </thead>
    <tbody>${lines}</tbody>
  </table>
  <table style="max-width:360px;margin-left:auto">
    <tr><td style="padding:6px 0">Subtotal</td><td style="text-align:right">${formatMoney(order.subtotal)}</td></tr>
    <tr><td style="padding:6px 0">Freight</td><td style="text-align:right">${formatMoney(order.freight)}</td></tr>
    <tr><td style="padding:6px 0">Tax</td><td style="text-align:right">${formatMoney(order.tax)}</td></tr>
    <tr class="total"><td style="padding:10px 0;border-top:2px solid #023d26">Amount paid</td><td style="text-align:right;border-top:2px solid #023d26">${formatMoney(grand)}</td></tr>
  </table>
  <h2 style="margin:28px 0 8px;font-size:16px;text-transform:uppercase">Transactions</h2>
  <table>
    <thead><tr style="background:#f4f7f5"><th style="text-align:left;padding:8px">ID</th><th style="text-align:left;padding:8px">When</th><th style="text-align:left;padding:8px">Detail</th><th style="text-align:right;padding:8px">Amount</th><th style="text-align:left;padding:8px">Status</th></tr></thead>
    <tbody>${txRows}</tbody>
  </table>
  <p class="muted" style="margin-top:28px">Yard: ${order.yard} · Tracking: ${order.tracking || '—'} · Demo invoice for Farm Exchange.</p>
  <script>window.onload=function(){window.print()}</script>
</body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Farm-Exchange-Invoice-${order.id}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
