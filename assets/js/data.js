// Shared product catalog — single source of truth used by every page.
// scheme.type: 'bogo' (bonus free units, no price cut) or 'percent' (real price discount).
const PRODUCTS = {
  'liv52-syrup': {
    id: 'liv52-syrup', name: 'Himalaya Liv.52 Syrup 200ml', brand: 'Himalaya',
    category: 'ayurvedic', company: 'himalaya', icon: '🌿',
    ptr: 120, mrp: 150, pts: 108, batch: 'H52-902', expiry: 'Nov 2027',
    scheme: { type: 'bogo', freeEvery: 10, label: '10+1 Free' }
  },
  'dabur-honey': {
    id: 'dabur-honey', name: 'Dabur Honey 500g', brand: 'Dabur',
    category: 'ayurvedic', company: 'dabur', icon: '🍯',
    ptr: 180, mrp: 220, pts: 162, batch: 'DH-221', expiry: 'Jan 2028',
    scheme: { type: 'percent', percent: 5, label: '5% Off' }
  },
  'shankhpushpi': {
    id: 'shankhpushpi', name: 'Baidyanath Shankhpushpi', brand: 'Baidyanath',
    category: 'ayurvedic', company: 'baidyanath', icon: '🧴',
    ptr: 95, mrp: 115, pts: 85, batch: 'SK-77', expiry: 'Jun 2027',
    scheme: null
  },
  'liv52-ds': {
    id: 'liv52-ds', name: 'Himalaya Liv.52 DS', brand: 'Himalaya',
    category: 'ayurvedic', company: 'himalaya', icon: '🌿',
    ptr: 145, mrp: 175, pts: 130, batch: 'DS-114', expiry: 'Mar 2028',
    scheme: { type: 'percent', percent: 8, label: '8% Bulk' }
  },
  'chyawanprash': {
    id: 'chyawanprash', name: 'Dabur Chyawanprash 1kg', brand: 'Dabur',
    category: 'ayurvedic', company: 'dabur', icon: '🍫',
    ptr: 210, mrp: 260, pts: 189, batch: 'CP-556', expiry: 'May 2028',
    scheme: { type: 'bogo', freeEvery: 10, label: '10+1 Free' }
  },
  'ashwagandha': {
    id: 'ashwagandha', name: 'Baidyanath Ashwagandha', brand: 'Baidyanath',
    category: 'ayurvedic', company: 'baidyanath', icon: '💊',
    ptr: 135, mrp: 165, pts: 121, batch: 'AW-38', expiry: 'Sep 2027',
    scheme: null
  },
  'septilin': {
    id: 'septilin', name: 'Himalaya Septilin Tablets', brand: 'Himalaya',
    category: 'ayurvedic', company: 'himalaya', icon: '🌿',
    ptr: 98, mrp: 120, pts: 88, batch: 'SP-902', expiry: 'Feb 2028',
    scheme: { type: 'percent', percent: 8, label: '8% Bulk' }
  },
  'lal-tail': {
    id: 'lal-tail', name: 'Dabur Lal Tail 100ml', brand: 'Dabur',
    category: 'ayurvedic', company: 'dabur', icon: '🧴',
    ptr: 62, mrp: 78, pts: 56, batch: 'LT-410', expiry: 'Dec 2027',
    scheme: null
  }
};

window.PRODUCTS = PRODUCTS;
window.PRODUCT_LIST = Object.values(PRODUCTS);
window.GST_RATE = 0.12;
