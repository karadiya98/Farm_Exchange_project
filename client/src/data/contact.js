/** Farm Exchange desk contact — use these everywhere. */
export const CONTACT = {
  tollFree: {
    display: '1-800-224-8005',
    short: '(800) 224-8005',
    tel: 'tel:18002248005',
    label: 'Toll free',
  },
  farmToll: {
    display: '855-686-FARM',
    short: '855-686-FARM',
    digits: '1-855-686-3276',
    tel: 'tel:18556863276',
    label: 'Toll free',
  },
  longIsland: {
    display: '516-252-8000',
    short: '(516) 252-8000',
    tel: 'tel:15162528000',
    label: 'Main number for Long Island',
  },
  sheridan: {
    display: '307-207-1777',
    short: '(307) 207-1777',
    tel: 'tel:13072071777',
    label: 'Sheridan desk',
  },
  email: 'welcome@farmexchange.com',
  mailto: 'mailto:welcome@farmexchange.com',
  street: '30 N GOULD STREET',
  cityLine: 'SHERIDAN, WY 82801',
  addressOneLine: '30 N GOULD STREET, SHERIDAN, WY 82801',
  since: '1999',
  sinceLine: 'Since 1999',
};

/** Default phone shown on listing cards and most CTAs (toll free). */
export const DESK_PHONE = CONTACT.tollFree.display;
export const DESK_TEL = CONTACT.tollFree.tel;
export const DESK_EMAIL = CONTACT.email;
