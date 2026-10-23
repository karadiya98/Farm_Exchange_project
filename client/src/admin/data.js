import { demoOrders, formatMoney, orderGrandTotal } from '../data/orders';
import { products } from '../data/catalog';

export { formatMoney };

export const adminYards = [
  { id: 'sheridan', name: 'Sheridan desk', email: 'welcome@farmexchange.com' },
  { id: 'long-island', name: 'Long Island', email: 'welcome@farmexchange.com' },
];

export const performanceByRange = {
  day: {
    views: { value: '1,842', delta: 4.2, note: 'From yesterday' },
    visits: { value: '968', delta: 2.1, note: 'From yesterday' },
    orders: { value: '6', delta: -8.0, note: 'From yesterday' },
    conversion: { value: '2.4%', delta: 0.6, note: 'From yesterday' },
  },
  week: {
    views: { value: '12,406', delta: 6.8, note: 'From last week' },
    visits: { value: '6,210', delta: 3.4, note: 'From last week' },
    orders: { value: '38', delta: 11.2, note: 'From last week' },
    conversion: { value: '2.9%', delta: 1.1, note: 'From last week' },
  },
  month: {
    views: { value: '48,920', delta: 9.4, note: 'From last month' },
    visits: { value: '24,180', delta: 5.7, note: 'From last month' },
    orders: { value: '142', delta: 7.3, note: 'From last month' },
    conversion: { value: '3.1%', delta: -0.4, note: 'From last month' },
  },
  year: {
    views: { value: '512,400', delta: 14.6, note: 'From last year' },
    visits: { value: '268,900', delta: 10.2, note: 'From last year' },
    orders: { value: '1,486', delta: 12.8, note: 'From last year' },
    conversion: { value: '2.8%', delta: 0.9, note: 'From last year' },
  },
};

/** Monthly revenue points for the chart (demo). */
export const revenueSeries = [
  { label: 'Jan', value: 82000 },
  { label: 'Feb', value: 91000 },
  { label: 'Mar', value: 105000 },
  { label: 'Apr', value: 98000 },
  { label: 'May', value: 118000 },
  { label: 'Jun', value: 126000 },
  { label: 'Jul', value: 132000 },
  { label: 'Aug', value: 141000 },
  { label: 'Sep', value: 156000 },
  { label: 'Oct', value: 149000 },
  { label: 'Nov', value: 162000 },
  { label: 'Dec', value: 178000 },
];

export const totalRevenue = revenueSeries.reduce((sum, row) => sum + row.value, 0);

export const listingStats = {
  active: products.filter((p) => !p.special).length + 4,
  specials: products.filter((p) => p.special).length,
  featured: products.filter((p) => p.featured).length,
  pendingAds: 3,
};

export const recentActivities = [
  { id: 1, who: 'Jordan Hale', action: 'placed order FX-24018', when: '6 mins ago', tone: 'order' },
  { id: 2, who: 'River Mills', action: 'requested a side-rail ad', when: '22 mins ago', tone: 'ad' },
  { id: 3, who: 'Desk · Sheridan', action: 'tagged 40ft Span Shelter', when: '1 hr ago', tone: 'tag' },
  { id: 4, who: 'Casey Ort', action: 'paid balance on FX-23812', when: '2 hrs ago', tone: 'pay' },
  { id: 5, who: 'Long Island line', action: 'answered freight quote', when: '3 hrs ago', tone: 'call' },
  { id: 6, who: 'Morgan Lee', action: 'opened a dealer application', when: '5 hrs ago', tone: 'dealer' },
];

export const deskTips = [
  {
    title: 'Specials week is live',
    body: 'Push marked-down shelters before the freight window closes Friday.',
    href: '/specials',
  },
  {
    title: '3 ad drafts waiting',
    body: 'Review side-rail creatives before they rotate into the next scroll band.',
    href: '/admin/ads',
  },
];

export const adminCustomers = [
  { id: 'U-01', name: 'Jordan Hale', email: 'jordan@farm.com', orders: 3, spent: 9531, state: 'WY', joined: 'Sep 22, 2026' },
  { id: 'U-02', name: 'Casey Ort', email: 'casey@plains.ag', orders: 2, spent: 26860, state: 'TX', joined: 'Aug 18, 2026' },
  { id: 'U-03', name: 'River Mills', email: 'river@yard.co', orders: 1, spent: 2379, state: 'NM', joined: 'Jul 30, 2026' },
  { id: 'U-04', name: 'Morgan Lee', email: 'morgan@dealer.us', orders: 0, spent: 0, state: 'IA', joined: 'Oct 10, 2026' },
  { id: 'U-05', name: 'Sam Quinn', email: 'sam@cottonlane.com', orders: 4, spent: 18420, state: 'TX', joined: 'Jun 2, 2026' },
];

export const adminAds = [
  { id: 'AD-221', business: 'Sheridan Yard Iron', side: 'both', status: 'pending', files: 2, when: 'Oct 16, 2026' },
  { id: 'AD-218', business: 'Plains Pump Co', side: 'left', status: 'live', files: 1, when: 'Oct 12, 2026' },
  { id: 'AD-214', business: 'Temple Row Dealers', side: 'right', status: 'reviewed', files: 3, when: 'Oct 8, 2026' },
  { id: 'AD-209', business: 'Coast House Supply', side: 'both', status: 'rejected', files: 2, when: 'Oct 1, 2026' },
];

export function adminOrderRows() {
  return demoOrders.map((order) => ({
    ...order,
    paid: orderGrandTotal(order),
    paidLabel: formatMoney(orderGrandTotal(order)),
  }));
}

export function financeSummary() {
  const rows = adminOrderRows();
  const captured = rows.reduce((sum, o) => sum + o.paid, 0);
  const freight = rows.reduce((sum, o) => sum + (o.freight || 0), 0);
  const open = rows.filter((o) => o.status !== 'delivered' && o.status !== 'canceled').length;
  return {
    captured,
    freight,
    open,
    invoices: rows.length,
    capturedLabel: formatMoney(captured),
    freightLabel: formatMoney(freight),
  };
}
