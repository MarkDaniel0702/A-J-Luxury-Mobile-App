/* Shared by prototype2, prototype3 and prototype4. One place for: phone-fit scaling, icons, placeholder pictures,
   sample catalogue, FAQ chatbot engine, policy text and small helpers. Each prototype supplies its own layout, look and features.
   No A&J photos, logo or testimonials are used anywhere. Pictures are drawn here as inline SVG. Brands, titles and prices are invented samples. */
const AJ = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const peso = n => '₱' + Math.round(n).toLocaleString('en-PH');
  const fmtDate = (d, o = {month: 'short', day: 'numeric'}) => d.toLocaleDateString('en-PH', o);
  const isEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());
  const isMobile = s => /^(\+?63|0)9\d{9}$/.test(s.replace(/[\s-]/g, ''));
  let seq = 1000;
  const ref = p => p + '-' + (++seq);

  /* ---------- in-memory state (a prototype: nothing is sent or saved) ---------- */
  const S = {user: null, wish: new Set(), inq: [], con: [], req: [], msgs: []}; // user: null | 'guest' | {name,email,mobile}
  const isGuest = () => S.user === 'guest';

  /* ---------- window fit: scale the phone so it is fully visible without page scroll ---------- */
  function fit() {
    const p = $('.phone'); if (!p) return;
    const f = () => p.style.setProperty('--s', innerWidth < 520 ? 1 : Math.min(1.25, (innerHeight - 28) / 868, (innerWidth - 28) / 414).toFixed(3));
    f(); addEventListener('resize', f);
  }

  /* ---------- icons: one set, each prototype styles stroke width / colour in CSS ---------- */
  const I = {
    home: '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>',
    grid: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
    list: '<rect x="4" y="5" width="16" height="6"/><rect x="4" y="13" width="16" height="6"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.500 3.600-7 8-7s8 2.500 8 7"/>',
    heart: '<path d="M12 20s-7.500-4.600-7.500-10.200A4.300 4.300 0 0 1 12 7.200a4.300 4.300 0 0 1 7.500 2.600C19.500 15.400 12 20 12 20z"/>',
    back: '<path d="M20 12H5M11 6l-6 6 6 6"/>',
    next: '<path d="M9 6l6 6-6 6"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    up: '<path d="M6 15l6-6 6 6"/>',
    send: '<path d="M4 12l16-8-6 16-3-6z"/>',
    search: '<circle cx="11" cy="11" r="6.500"/><path d="M16 16l5 5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="M5 12.500l4.500 4.500L19 7"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.500 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    camera: '<path d="M4 8h4l2-2h4l2 2h4v11H4z"/><circle cx="12" cy="13.500" r="3.500"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.500" cy="8.500" r="1.200"/>',
    truck: '<path d="M2 6h11v10H2zM13 10h4l3 3v3h-7"/><circle cx="6.500" cy="17.500" r="1.800"/><circle cx="16.500" cy="17.500" r="1.800"/>',
    shield: '<path d="M12 3l7 3v5c0 5-3 8.500-7 10-4-1.500-7-5-7-10V6z"/><path d="M9 12l2.200 2.200L15.500 10"/>',
    calendar: '<rect x="4" y="5" width="16" height="15"/><path d="M4 10h16M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s-6.500-6-6.500-11a6.500 6.500 0 0 1 13 0C18.500 15 12 21 12 21z"/><circle cx="12" cy="10" r="2.300"/>',
    phone: '<path d="M6 3h4l1.500 5-2.500 1.500a11 11 0 0 0 5.500 5.500L16 12.500l5 1.500v4a2 2 0 0 1-2 2C10 20.500 3.500 14 3.500 5A2 2 0 0 1 6 3z"/>',
    mail: '<rect x="3" y="5" width="18" height="14"/><path d="M3 7l9 6 9-6"/>',
    lock: '<rect x="5" y="11" width="14" height="9"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    eye: '<path d="M2 12s3.500-7 10-7 10 7 10 7-3.500 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeoff: '<path d="M2 12s3.500-7 10-7 10 7 10 7-3.500 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 4l16 16"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    sort: '<path d="M8 5v14M5 16l3 3 3-3M16 19V5M13 8l3-3 3 3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.500v.5"/>',
    star: '<path d="M12 3l2.700 5.800 6.300.8-4.600 4.400 1.200 6.300-5.600-3.100-5.600 3.100 1.200-6.300L3 9.600l6.300-.8z"/>',
    gem: '<path d="M7 4h10l4 5-9 11L3 9z"/><path d="M3 9h18M9.500 4L8 9l4 11 4-11-1.500-5"/>',
    card: '<rect x="3" y="6" width="18" height="12"/><path d="M3 10h18"/>',
    box: '<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8"/>',
    sparkle: '<path d="M11 3l1.800 5.200L18 10l-5.200 1.800L11 17l-1.800-5.200L4 10l5.200-1.800z"/><path d="M19 15v5M16.500 17.500h5"/>',
    percent: '<path d="M5 19L19 5"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>',
    logout: '<path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9"/>',
    doc: '<path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6"/>',
    image: '<rect x="3" y="5" width="18" height="14"/><circle cx="9" cy="10" r="1.500"/><path d="M21 16l-5-5-8 8"/>',
    swap: '<path d="M4 8h14l-3-3M20 16H6l3 3"/>',
    refresh: '<path d="M20 12a8 8 0 1 1-2.400-5.700"/><path d="M20 4v5h-5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.600 5.600l2.100 2.100M16.300 16.300l2.100 2.100M5.600 18.400l2.100-2.100M16.300 7.700l2.100-2.100"/>',
    headset: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><path d="M4 14h3v6H5a1 1 0 0 1-1-1zM20 14h-3v6h2a1 1 0 0 0 1-1z"/>',
    chart: '<path d="M4 20h16M7 16v-5M12 16V6M17 16v-8"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'
  };
  const sprite = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' + Object.entries(I).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join('') + '</svg>';
  const ic = (n, c = '') => `<svg class="i ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;

  /* ---------- placeholder pictures: drawn line-art, three looks (line / noir / pop). Always labelled as placeholders ---------- */
  const CATS = [['bags', 'Bags'], ['watches', 'Watches'], ['jewelry', 'Jewelry'], ['shoes', 'Shoes'], ['wallets', 'Wallets'], ['accessories', 'Accessories']];
  const catName = c => CATS.find(x => x[0] === c)?.[1] ?? c;
  const SHAPE = {
    bags: '<path d="M32 38C32 18 68 18 68 38"/><path d="M20 38h60l6 46H14z"/><path d="M40 52h20"/>',
    watches: '<path d="M38 8h24l-4 20H42zM42 72h16l4 20H38z"/><circle cx="50" cy="50" r="22"/><path d="M50 50V37M50 50l9 6"/>',
    jewelry: '<circle cx="50" cy="64" r="24"/><path d="M38 34l12-14 12 14-12 12z"/><path d="M38 34h24"/>',
    shoes: '<path d="M12 64c18 0 22-24 32-26l8 10c12 4 34 6 36 18v8H12z"/><path d="M12 72h76"/>',
    wallets: '<rect x="14" y="28" width="72" height="46" rx="6"/><path d="M14 44h72"/><circle cx="72" cy="59" r="4"/>',
    accessories: '<circle cx="31" cy="54" r="16"/><circle cx="69" cy="54" r="16"/><path d="M47 52h6M15 50L6 40M85 50l9-10"/>'
  };
  const INCL = '<path d="M18 40h64v38H18zM14 30h72v10H14z"/><path d="M50 30v48"/><path d="M50 30c-8-10-18-4-12 0M50 30c8-10 18-4 12 0"/>';
  const VIEW = {
    Front: 'translate(15 8) scale(.7)', Back: 'translate(85 8) scale(-.7 .7)',
    Detail: 'translate(-22 -26) scale(1.45)', 'Flaw close-up': 'translate(-22 -26) scale(1.45)'
  };
  const POP = [['#f2c94c', '#14342b'], ['#e8714f', '#3a1409'], ['#9fd4b9', '#14342b'], ['#f7bfa9', '#4a1d10'], ['#b9c5f2', '#1d2350'], ['#14342b', '#f2c94c']];
  const memo = new Map();
  function art(cat, i, {s = 'line', v = 'Front', cap = true} = {}) {
    const key = [cat, i, s, v, cap].join('|');
    if (memo.has(key)) return memo.get(key);
    const h = (i * 47 + 20) % 360;
    let bg, fg, sw = 2, fill = 'none', capc;
    if (s === 'noir') {
      bg = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${h} 14% 15%)"/><stop offset="1" stop-color="#070707"/></linearGradient>
       <pattern id="d" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0H12M0 0V12" stroke="#c9a96a" stroke-opacity=".09" stroke-width=".5"/></pattern></defs>
       <rect width="100" height="100" fill="url(#g)"/><rect width="100" height="100" fill="url(#d)"/>`;
      fg = '#d8bd84'; sw = 1.6; capc = '#c9a96a';
    } else if (s === 'pop') {
      const [b, k] = POP[i % POP.length];
      bg = `<rect width="100" height="100" fill="${b}"/><circle cx="50" cy="52" r="38" fill="#fff" fill-opacity=".28"/>`;
      fg = k; sw = 2.8; fill = '#fff6e4'; capc = k;
    } else {
      bg = `<rect width="100" height="100" fill="hsl(${h} 20% 92%)"/>`;
      fg = `hsl(${h} 15% 32%)`; capc = `hsl(${h} 10% 45%)`;
    }
    const incl = v === 'Inclusions';
    const mark = v === 'Flaw close-up' ? `<circle cx="64" cy="60" r="9" fill="none" stroke="${fg}" stroke-width="1" stroke-dasharray="2 3"/>` : '';
    const label = v === 'Front' ? 'PLACEHOLDER IMAGE' : 'PLACEHOLDER · ' + v.toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${bg}
     <g fill="${fill}" stroke="${fg}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" transform="${incl ? 'translate(0 2)' : VIEW[v] || VIEW.Front}">${incl ? INCL : SHAPE[cat]}</g>${mark}
     ${cap ? `<text x="50" y="95" font-family="sans-serif" font-size="4.600" letter-spacing="1.400" text-anchor="middle" fill="${capc}" fill-opacity=".8">${label}</text>` : ''}</svg>`;
    const uri = 'data:image/svg+xml,' + encodeURIComponent(svg);
    memo.set(key, uri);
    return uri;
  }

  /* ---------- sample catalogue: invented brands, titles and prices (NOT A&J's data) ---------- */
  const RAW = [
    ['bags', 'Maison Aurel', 'Structured Top-Handle Bag in Black', 185000, '9.5/10', 'Dustbag, strap', 'Light corner wear', 'Black', 'Calfskin leather', '28 × 21 × 12 cm'],
    ['bags', 'Casa Verdi', 'Quilted Shoulder Bag with Chain in Cream', 142000, '9/10', 'Dustbag', 'Minor scuff on base', 'Cream', 'Lambskin leather', '25 × 15 × 7 cm'],
    ['bags', 'Atelier Sol', 'Canvas Tote in Tan', 68000, 'Brand New', 'Dustbag, tag', 'None', 'Tan', 'Coated canvas', '36 × 30 × 15 cm'],
    ['bags', 'Belmonte', 'Mini Bucket Bag in Burgundy', 96000, '9.8/10', 'Dustbag, strap, box', 'None', 'Burgundy', 'Smooth leather', '20 × 18 × 12 cm'],
    ['watches', 'Lumière', 'Ladies Steel Watch with Diamond Bezel', 96000, '9.3/10', 'Box, papers', 'Fine hairlines on strap', 'Silver', 'Stainless steel', '28 mm case'],
    ['watches', 'Veloce', 'Automatic Chronograph 40mm', 210000, '9.8/10', 'Box, papers, extra strap', 'None', 'Steel and blue', 'Stainless steel', '40 mm case'],
    ['watches', 'Lumière', 'Gold-tone Dress Watch', 54000, '8.8/10', 'Box', 'Light case scratches', 'Gold', 'Gold-plated steel', '32 mm case'],
    ['watches', 'Nocturne', 'Skeleton Automatic in Rose Gold', 168000, 'Brand New', 'Box, papers, tag', 'None', 'Rose gold', 'Steel, PVD finish', '41 mm case'],
    ['jewelry', 'Orfèvre Noir', 'Solitaire Ring in 18K Gold', 120000, 'Brand New', 'Box, pouch', 'None', 'Yellow gold', '18K gold, white stone', 'Size 6'],
    ['jewelry', 'Orfèvre Noir', 'Pearl Drop Earrings', 38000, '9.5/10', 'Pouch', 'None', 'White', 'Freshwater pearl, gold-plated', '3.5 cm drop'],
    ['jewelry', 'Atelier Sol', 'Chain Bracelet in Silver', 27000, '9/10', 'Pouch', 'Slight tarnish on clasp', 'Silver', 'Sterling silver', '18 cm'],
    ['jewelry', 'Belmonte', 'Gold Pendant Necklace', 74000, '9.7/10', 'Box, pouch', 'None', 'Yellow gold', '18K gold', '45 cm chain'],
    ['shoes', 'Casa Verdi', 'Leather Slingback Flats in Black', 32000, '9.3/10', 'Box, dustbag', 'Sole wear', 'Black', 'Leather', 'EU 38'],
    ['shoes', 'Veloce', 'Low-top Sneakers in White', 24000, '9/10', 'Box', 'Light creasing', 'White', 'Leather', 'EU 40'],
    ['shoes', 'Maison Aurel', 'Block-heel Pumps in Nude', 41000, 'Brand New', 'Box, dustbag', 'None', 'Nude', 'Patent leather', 'EU 37.5'],
    ['shoes', 'Atelier Sol', 'Suede Loafers in Chocolate', 36000, '9.5/10', 'Dustbag', 'Light sole scuffs', 'Brown', 'Suede', 'EU 39'],
    ['wallets', 'Atelier Sol', 'Zip Wallet in Burgundy', 52000, 'Brand New', 'Box, felt, booklet', 'None', 'Burgundy', 'Grained leather', '19 × 10 cm'],
    ['wallets', 'Maison Aurel', 'Card Holder in Caviar Leather', 29000, '9.5/10', 'Box', 'None', 'Black', 'Caviar leather', '11 × 8 cm'],
    ['wallets', 'Casa Verdi', 'Wallet on Chain in Black', 88000, '9/10', 'Dustbag', 'Edge rubbing', 'Black', 'Lambskin leather', '19 × 12 cm'],
    ['wallets', 'Belmonte', 'Bifold Wallet in Navy', 31000, '9.6/10', 'Box', 'None', 'Navy', 'Smooth leather', '11 × 9 cm'],
    ['accessories', 'Lumière', 'Oversized Sunglasses with Case', 22000, '9.5/10', 'Case, cloth', 'None', 'Black', 'Acetate', 'One size'],
    ['accessories', 'Veloce', 'Silk Scarf in Orange', 18000, 'Brand New', 'Box', 'None', 'Orange', 'Silk twill', '90 × 90 cm'],
    ['accessories', 'Casa Verdi', 'Leather Belt with Gold Buckle', 26000, '9.3/10', 'Dustbag', 'Minor hole stretching', 'Black', 'Leather, gold-tone buckle', '85 cm'],
    ['accessories', 'Nocturne', 'Wool-Silk Shawl in Charcoal', 34000, '9.8/10', 'Box', 'None', 'Charcoal', 'Wool-silk blend', '140 × 140 cm']
  ];
  const ITEMS = RAW.map(([cat, brand, title, price, rank, inc, flaw, color, mat, size], i) => ({
    id: String(i), cat, brand, title, price, rank, inc, flaw, color, mat, size, isNew: rank === 'Brand New',
    views: ['Front', 'Back', 'Detail', ...(flaw === 'None' ? [] : ['Flaw close-up']), 'Inclusions']
  }));
  const BRANDS = [...new Set(ITEMS.map(p => p.brand))].sort((a, b) => a.localeCompare(b));
  const item = id => ITEMS.find(p => p.id === id);
  const pic = (p, s = 'line', v = 'Front', cap = true) => art(p.cat, +p.id, {s, v, cap});
  const PHOTO_SLOTS = [['Front', 1], ['Back', 1], ['Sides'], ['Bottom'], ['Interior'], ['Hardware'], ['Serial / date code', 1], ['Logo / stamp'], ['Flaws'], ['Inclusions']].map(([label, req]) => ({label, req: !!req}));

  /* ---------- FAQ chatbot: keyword match over approved answers. Policy text paraphrases A&J's public website and is NOT yet confirmed by A&J ---------- */
  const FAQ = [
    {id: 'buy', q: 'How do I buy?', k: ['buy', 'order', 'purchase', 'how to', 'inquire', 'inquiry', 'enquire'],
      a: 'Browse the shop, open an item and send an inquiry. The A&J team confirms the item is still available, then sends payment details by chat.\nGuests can browse only. Log in to send an inquiry.'},
    {id: 'consign', q: 'How does consignment work?', k: ['consign', 'sell my', 'selling my', 'pull out', 'pull-out', 'pullout', 'commission', 'accepted items', 'what items'],
      a: 'How it works: 1) Send the item’s details and photos. 2) Drop it off at the showroom or ship it (Grab, Lalamove or LBC). 3) A&J authenticates and lists it. 4) You are paid after the buyer receives the item, in cash, by deposit or as in-store credit.\nTerms: consignment period is 1 to 5 months. Pull-out fee is ₱2,000 per item if pulled out before one month, with at least 1 business day notice. A&J accepts only items it can authenticate in excellent condition or better, and may decline items that leave no room for its mark-up.'},
    {id: 'sell', q: 'Can I sell for cash?', k: ['sell', 'cash for', 'for cash', 'quick cash', 'outright', 'buy my'],
      a: 'Yes. Send photos with the inclusions, flaws and where you bought the item. A&J does the final appraisal and authentication when it receives the item, then schedules payment (allow about 24 hours). Payment can be cash, deposit or in-store credit.'},
    {id: 'payout', q: 'When do consignors get paid?', k: ['payout', 'get paid', 'be paid', 'when will i be paid', 'my money'],
      a: 'For consignments, payment is scheduled after the buyer receives the item. It can be cash, bank deposit or in-store credit. The exact timing still needs to be confirmed by A&J.'},
    {id: 'shipping', q: 'Shipping and delivery', k: ['ship', 'deliver', 'courier', 'metro manila', 'rider', 'lalamove', 'grab', 'international', 'abroad'],
      a: 'Metro Manila: same-day delivery by Grab or Lalamove is possible if booked before the 6:00 PM cut-off. Outside Metro Manila: 1–2 business days processing. Delivery is nationwide only (no international shipping).\nWho pays shipping is unclear in the source material (the FAQ says the client pays; the homepage mentions free shipping within Metro Manila). A&J needs to confirm.'},
    {id: 'payment', q: 'Payment options', k: ['pay', 'payment', 'gcash', 'bdo', 'bpi', 'unionbank', 'card', 'cod', 'cash on', 'on delivery', 'installment', 'instalment', 'bank'],
      a: 'Bank transfer (BDO, BPI, UnionBank), GCash, credit card via BDO Checkout (+4% fee), cash on delivery within Metro Manila (extra fee, not for sale items), or cash on pick-up (a down payment reserves the item).'},
    {id: 'layaway', q: 'Layaway', k: ['layaway', 'lay-away', 'down payment', 'downpayment', 'monthly', 'interest', 'hulugan'],
      a: 'Layaway: 30% fixed down payment, with the balance split into equal monthly payments. The down payment is forfeited if the agreed time frame is exceeded.\nThe website mentions “minimal interest” but gives no rate. Ask the A&J team for the exact terms on your item.'},
    {id: 'authentic', q: 'Is it authentic?', k: ['authentic', 'fake', 'genuine', 'is it real', 'real or', 'legit', 'original or', 'counterfeit', 'certificate', 'peke'],
      a: 'A&J says it sells only authentic items. I can’t confirm whether any specific item is authentic or fake. That is decided by A&J’s human experts, so please ask the team about the item you like.\nDetails of A&J’s authentication process are still pending from A&J.'},
    {id: 'returns', q: 'Returns, refunds, cancellation', k: ['return', 'refund', 'cancel', 'exchange', 'money back', 'pre-order', 'preorder', 'pre order'],
      a: 'All sales are final. Exchange only, and only for undeclared flaws or missing inclusions. Notify A&J within 24 hours of receiving the item (security tag intact) and ship it back within 48 hours. The client pays shipping both ways.\nPre-ordered items can’t be returned. Refunds are typically not available and orders can’t be cancelled, but you can contact the team about exceptional cases.'},
    {id: 'condition', q: 'Condition ratings', k: ['condition', 'rank', 'grade', 'flaw', '9/10', 'scratch', 'wear', 'brand new', 'pre-loved', 'preloved'],
      a: 'Each item shows a condition rank out of 10 (or “Brand New”), plus its inclusions and any flaws. Review the photos and description carefully before buying.'},
    {id: 'showroom', q: 'Visit the showroom', k: ['showroom', 'visit', 'store', 'location', 'address', 'opening hours', 'where', 'appointment', 'viewing'],
      a: 'Showroom visits are welcome. Message the team first so the items you want to see are on hand. Address and hours still need to be confirmed by A&J.'},
    {id: 'account', q: 'What can guests do?', k: ['guest', 'log in', 'login', 'account', 'sign up', 'signup', 'register', 'password'],
      a: 'Guests can browse, search, read the FAQs and use this assistant. To save items, send inquiries or start a consignment request, create a free account or log in.'},
    {id: 'support', q: 'Help with an order or consignment', k: ['support', 'ticket', 'after-sales', 'after sales', 'complaint', 'problem with', 'issue with', 'damaged', 'not delivered', 'not arrived', "hasn't arrived", 'wrong item', 'track my'],
      a: 'For a problem with an order, a return or refund request, an authenticity concern or an app problem, open a support ticket in Support. Link the order or consignment, describe the issue, and follow its status (Open, In progress, Resolved) there. The A&J team replies inside the ticket.'},
    {id: 'human', q: 'Talk to a person', k: ['person', 'human', 'agent', 'staff', 'someone', 'call me', 'phone', 'viber', 'whatsapp', 'contact', 'talk to', 'speak to', 'customer service'],
      human: true,
      a: 'I can pass you to a support agent. Tap “Talk to a support agent” to open a support ticket with this chat attached. The team replies in Support.\nYou can also message the team directly. Those contact details are still to be provided by A&J.'}
  ];
  const GREETING = 'Hi! I’m the A&J FAQ assistant (prototype). Ask me about buying, consigning, shipping, payment or authenticity.';
  const FALLBACK = 'I’m not sure about that one. I can help with: how to buy, consignment, shipping, payment, layaway, authenticity, returns and the showroom.\nFor anything else, tap “Talk to a support agent” and the A&J team will reply in Support.';
  const KEYS = FAQ.map(f => ({f, re: f.k.map(k => [new RegExp('\\b' + k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')), k.length])}));
  function reply(text) {
    const t = text.toLowerCase().replace(/[’]/g, "'");
    let best = null, bs = 0;
    for (const {f, re} of KEYS) { const s = re.reduce((n, [r, w]) => n + (r.test(t) ? w : 0), 0); if (s > bs) { best = f; bs = s; } }
    if (best) return {text: best.a, topic: best.id, human: !!best.human};
    if (/^\s*(hi|hello|hey|kumusta|good (morning|afternoon|evening)|magandang)\b/.test(t)) return {text: GREETING, topic: 'hi'};
    if (/\b(thanks|thank you|salamat)\b/.test(t)) return {text: 'You’re welcome! Anything else I can help with?', topic: 'thanks'};
    return {text: FALLBACK, topic: 'none'};
  }
  const faq = id => FAQ.find(f => f.id === id);
  // one answer for a typed question or a tapped topic; every answer is counted for the admin's chatbot analytics
  const BOT = []; // {at, topic} asked in this session
  function answer(text, id) {
    const f = id && faq(id), r = f ? {text: f.a, topic: f.id, human: !!f.human} : reply(text);
    BOT.push({at: new Date(), topic: r.topic}); return r;
  }
  const CHIPS = ['buy', 'consign', 'shipping', 'payment', 'layaway', 'authentic', 'returns', 'support', 'showroom'];
  const paras = s => s.split('\n').map(l => `<p>${esc(l)}</p>`).join('');

  /* ---------- information pages (policy text; pending items are flagged) ---------- */
  const PEND = '<p class="pend">Paraphrased from A&amp;J’s public website. Not yet confirmed by A&amp;J.</p>';
  const INFO = {
    authenticity: {t: 'Authenticity', f: 'authentic', x: '<h3>What every listing shows</h3><ul><li>Condition rank out of 10, or “Brand New”</li><li>Inclusions such as box, dustbag and papers</li><li>Any flaws, with a close-up photo</li><li>Photos from several angles</li></ul>'},
    shipping: {t: 'Shipping & delivery', f: 'shipping'},
    payment: {t: 'Payment options', f: 'payment'},
    layaway: {t: 'Layaway', f: 'layaway'},
    returns: {t: 'Returns & refunds', f: 'returns'},
    consignment: {t: 'Consignment terms', f: 'consign'},
    terms: {t: 'Terms of service', raw: '<p class="pend">Placeholder. The Terms of Service must be written or approved by A&amp;J before launch.</p><p>This prototype stores nothing and sends nothing. Accounts, inquiries and consignment requests are simulated.</p>'},
    privacy: {t: 'Privacy notice', raw: '<p class="pend">Placeholder. A&amp;J must provide the approved privacy notice, consent text and a named privacy contact (Data Privacy Act, RA 10173).</p><p>This prototype collects no personal data. Anything you type stays on this page and is lost when you close it.</p>'}
  };
  const info = id => { const i = INFO[id]; return i && {t: i.t, html: (i.raw ?? PEND + paras(faq(i.f).a)) + (i.x || '')}; };
  const CONTACT = [['Showroom', 'Address to be confirmed by A&J'], ['Opening hours', 'To be confirmed by A&J'], ['Viber / WhatsApp', 'Number to be provided by A&J'], ['Instagram / Facebook', 'Accounts to be confirmed by A&J'], ['Email', 'To be provided by A&J']];

  /* ---------- small UI helpers shared by all three ---------- */
  function toast(msg) { const t = $('#toast'); if (!t) return; t.textContent = msg; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 2400); }
  function route() {
    const [p, qs = ''] = (location.hash.slice(1) || '/').split('?');
    const [, name = '', ...args] = p.split('/');
    return {name, args: args.map(decodeURIComponent), q: new URLSearchParams(qs)};
  }
  /* ---------- forms: D keeps every named field's value (so a form survives a trip to another page); validate() shows messages next to fields ---------- */
  const D = {};
  addEventListener('input', e => {
    const t = e.target; if (!t.name) return;
    if (t.type === 'checkbox') D[t.name] = t.checked; else if (t.type !== 'radio' || t.checked) D[t.name] = t.value;
  });
  const req = (msg = 'This field is required.') => [v => String(v).trim().length > 0, msg];
  const ticked = msg => [v => v === true, msg];
  const mobileRule = [v => isMobile(v), 'Enter a PH mobile number, e.g. 0917 123 4567.'];
  const emailRule = [v => isEmail(v), 'Enter a valid email address.'];
  // field markup shared by all three; each prototype styles .fld / .err / .chk its own way
  const fld = (label, name, o = {}) => `<label class="fld"><span>${label}</span>${o.area ? `<textarea name="${name}" rows="3" placeholder="${o.ph || ''}">${esc(D[name] || '')}</textarea>`
    : `<input type="${o.type || 'text'}" name="${name}" value="${esc(D[name] || '')}" ${o.ph ? `placeholder="${o.ph}"` : ''} ${o.ac ? `autocomplete="${o.ac}"` : ''} ${o.mode ? `inputmode="${o.mode}"` : ''}>`}<small class="err" data-for="${name}"></small></label>`;
  const sel = (label, name, opts, first) => `<label class="fld"><span>${label}</span><select name="${name}">${first ? `<option value="">${first}</option>` : ''}${opts.map(o => `<option ${D[name] === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select><small class="err" data-for="${name}"></small></label>`;
  const chk = (name, label, extra = '') => `<label class="chk"><input type="checkbox" name="${name}" ${D[name] ? 'checked' : ''}><span>${label}</span></label>${extra}`;
  // rules: {field: [test(value) -> ok, message]}. Shows the message in [data-for=field] (or a toast), marks the field and focuses the first bad one.
  function validate(root, rules) {
    let first = null;
    $$('[data-for]', root).forEach(e => e.textContent = '');
    $$('[aria-invalid]', root).forEach(e => e.removeAttribute('aria-invalid'));
    for (const [name, [ok, msg]] of Object.entries(rules)) {
      if (ok(D[name] ?? '')) continue;
      const el = root.querySelector(`[name="${name}"]`), m = root.querySelector(`[data-for="${name}"]`);
      if (m) m.textContent = msg; else toast(msg);
      el?.setAttribute('aria-invalid', 'true'); first ||= (m || el);
    }
    first?.scrollIntoView({block: 'center', behavior: 'smooth'});
    if (first) (root.querySelector(`[name="${first.dataset?.for ?? ''}"]`) || first).focus?.({preventScroll: true});
    return !first;
  }

  /* ---------- gestures: one recognizer for mouse (pointer events) and touch (touch events).
     Touch keeps the browser's own scrolling; the mouse gets drag-to-scroll with momentum and snapping, so swiping also works on a desktop.
     Markup hooks: [data-swipe=act] pages left/right (act gets d: 1 = next, -1 = previous, and returns false at the end of the list),
     [data-dismiss=act][data-dir=down|left] drags to close, img.zoomable zooms (double-tap or double-click, pinch, ctrl+wheel) and pans when zoomed,
     [data-nogesture] opts out (a widget with its own drag). Prototype hooks (gestures()): act(name, el, d), edge() -> back function or null,
     pull() -> refresh function or null. ---------- */
  let G = null, O = {}, E, P, anim = 0, stop = null, quiet = 0, tap = null;
  const scr = () => $('.screen');
  const scale = () => { const s = scr(); return s.getBoundingClientRect().width / s.offsetWidth || 1; };
  const buzz = () => navigator.vibrate?.(8);
  const scrolls = (el, ax) => /auto|scroll/.test(getComputedStyle(el)[ax === 'x' ? 'overflowX' : 'overflowY'])
    && (ax === 'x' ? el.scrollWidth - el.clientWidth : el.scrollHeight - el.clientHeight) > 1;
  const scroller = (el, ax) => { for (; el && !el.classList.contains('screen'); el = el.parentElement) if (scrolls(el, ax)) return el; return null; };
  const atTop = (el, lim) => { for (; el; el = el.parentElement) { if (el.scrollTop > 0) return false; if (el === lim) return true; } return true; };
  function settle(el) { el.style.transition = 'transform .28s cubic-bezier(.2,.8,.2,1),opacity .28s'; el.style.transform = el.style.opacity = ''; setTimeout(() => el.style.transition = '', 300); }
  function animate(tick, done) { // tick(ms since last frame) -> true while running; a new touch stops it early (done still runs)
    let last = performance.now();
    stop = () => { cancelAnimationFrame(anim); stop = null; done(); };
    const f = now => { const on = tick(now - last); last = now; on ? anim = requestAnimationFrame(f) : stop(); };
    anim = requestAnimationFrame(f);
  }
  const glide = (el, p, to, done) => { const from = el[p]; let t = 0; animate(dt => { t = Math.min(1, t + dt / 320); el[p] = from + (to - from) * (1 - (1 - t) ** 3); return t < 1; }, done); };
  const coast = (el, p, v, done) => {
    let pos = el[p]; const max = p === 'scrollTop' ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth;
    animate(dt => { pos = Math.max(0, Math.min(max, pos + v * dt)); v *= .95 ** (dt / 16); el[p] = pos; return Math.abs(v) > .02 && pos > 0 && pos < max; }, done);
  };
  const snapPoints = (el, k) => { const r = el.getBoundingClientRect(), pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0, max = el.scrollWidth - el.clientWidth;
    return [...el.children].map(c => Math.max(0, Math.min(max, (c.getBoundingClientRect().left - r.left) / k + el.scrollLeft - pad))); };
  function setZoom(z, s, x, y) {
    const mx = z.offsetWidth * (s - 1) / 2, my = z.offsetHeight * (s - 1) / 2;
    z._z = {s, x: Math.max(-mx, Math.min(mx, x)), y: Math.max(-my, Math.min(my, y))};
    z.style.transform = s > 1 ? `translate(${z._z.x}px,${z._z.y}px) scale(${s})` : '';
    z.classList.toggle('zoomed', s > 1);
  }
  function zoomAt(z, cx, cy) { // zoom in on the tapped point, or back out
    const r = z.getBoundingClientRect(), k = scale(), s = z._z?.s > 1 ? 1 : 2.5;
    z.style.transition = 'transform .3s cubic-bezier(.2,.8,.2,1)';
    setZoom(z, s, -(cx - r.left - r.width / 2) / k * (s - 1), -(cy - r.top - r.height / 2) / k * (s - 1));
  }
  function start(x, y, t, touch) {
    stop?.();
    if (!t.closest || t.closest('input,select,textarea,[data-nogesture]')) { G = null; return; }
    const k = scale(), z = t.closest('.zoomable');
    G = {x0: x, y0: y, x, y, t, touch, k, h: [[performance.now(), x, y]], edge: (x - scr().getBoundingClientRect().left) / k < 24 && !t.closest('[data-dismiss],.scrim'), z: z?._z?.s > 1 ? z : null};
  }
  function grab(el, p) { G.el = el; G.p = p; G.s0 = el[p]; G.snap = getComputedStyle(el).scrollSnapType !== 'none'; el.style.scrollSnapType = 'none'; return 'scroll'; }
  function decide(dx, dy) { // what this drag is: scroll, swipe, edge (back), dismiss, pull (refresh), pan (zoomed image) or native (leave it to the browser)
    const t = G.t; let el;
    G.ax = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    if (G.z) { G.el = G.z; G.zx = G.z._z.x; G.zy = G.z._z.y; G.z.style.transition = 'none'; return 'pan'; }
    if (G.ax === 'x') {
      if (G.edge && dx > 0 && (G.fn = O.edge?.())) return 'edge';
      if ((el = t.closest('[data-dismiss][data-dir=left]')) && dx < 0) { G.el = el; return 'dismiss'; }
      if ((el = scroller(t, 'x'))) return G.touch && getComputedStyle(el).scrollSnapType === 'none' ? 'native' : grab(el, 'scrollLeft'); // snap carousels are paged here for touch too
      if ((el = t.closest('[data-swipe]'))) { G.el = el; return 'swipe'; }
    } else {
      if ((el = t.closest('[data-dismiss][data-dir=down]')) && dy > 0 && atTop(t, el)) { G.el = el; return 'dismiss'; }
      if ((el = t.closest('main')) && dy > 0 && el.scrollTop <= 0 && (G.fn = O.pull?.())) {
        G.el = el; P.style.top = (el.getBoundingClientRect().top - scr().getBoundingClientRect().top) / G.k + 'px'; return 'pull';
      }
      if ((el = scroller(t, 'y')) && !G.touch) return grab(el, 'scrollTop');
    }
    return 'native';
  }
  const STEP = {
    scroll(dx, dy) { G.el[G.p] = G.s0 - (G.p === 'scrollLeft' ? dx : dy); },
    pan(dx, dy) { setZoom(G.el, G.el._z.s, G.zx + dx, G.zy + dy); },
    edge(dx) {
      const p = Math.min(1, dx / 100);
      E.style.transition = 'none'; E.style.opacity = p; E.style.transform = `translateX(${p * 60 - 54}px) scale(${.6 + .4 * p})`; E.classList.toggle('go', p >= 1);
      $('main').style.transform = `translateX(${Math.min(dx, 140) * .15}px)`;
    },
    dismiss(dx, dy) { G.el.style.transition = 'none'; G.el.style.transform = G.ax === 'y' ? `translateY(${Math.max(0, dy)}px)` : `translateX(${Math.min(0, dx)}px)`; },
    swipe(dx) { G.el.style.transition = 'none'; G.el.style.transform = `translateX(${dx * .4}px)`; G.el.style.opacity = 1 - Math.min(.5, Math.abs(dx) / 500); },
    pull(dx, dy) {
      const p = Math.min(110, Math.max(0, dy) * .5);
      P.style.transition = 'none'; P.style.opacity = Math.min(1, p / 50); P.style.transform = `translateY(${p - 30}px) rotate(${p * 4}deg)`; P.classList.toggle('go', p >= 64);
      G.el.style.transform = `translateY(${p * .6}px)`;
    }
  };
  const END = {
    scroll(g, dx, dy, vx, vy) {
      const el = g.el, v = -(g.p === 'scrollLeft' ? vx : vy), done = () => el.style.scrollSnapType = '';
      if (!g.snap) return coast(el, g.p, v, done);
      // a flick, or a drag past 20% of the width, turns the page that way; otherwise snap to the nearest card
      const at = el[g.p], pts = snapPoints(el, g.k), moved = at - g.s0, near = pts.reduce((a, b) => Math.abs(b - at) < Math.abs(a - at) ? b : a, 0);
      const dir = Math.abs(v) > .25 ? Math.sign(v) : Math.abs(moved) > Math.min(80, el.clientWidth * .2) ? Math.sign(moved) : 0;
      glide(el, g.p, (dir > 0 ? pts.find(p => p >= at - 1) : dir < 0 ? [...pts].reverse().find(p => p <= at + 1) : near) ?? near, done);
    },
    edge(g, dx, dy, vx) {
      E.style.transition = 'opacity .2s'; E.style.opacity = 0; E.classList.remove('go'); settle($('main'));
      if (dx > 100 || (vx > .5 && dx > 40)) { buzz(); g.fn(); }
    },
    dismiss(g, dx, dy, vx, vy) {
      const el = g.el, down = g.ax === 'y', dist = down ? dy : -dx, v = down ? vy : -vx;
      if (dist < (down ? el.offsetHeight : el.offsetWidth) * .3 && !(v > .5 && dist > 30)) return settle(el);
      buzz(); el.style.transition = 'transform .22s ease-in'; el.style.transform = down ? 'translateY(100%)' : 'translateX(-100%)';
      setTimeout(() => { O.act(el.dataset.dismiss, el); el.style.transition = el.style.transform = ''; }, 220);
    },
    swipe(g, dx, dy, vx) {
      const el = g.el, d = dx < 0 ? 1 : -1;
      if (!(Math.abs(dx) > 70 || (Math.abs(vx) > .4 && Math.abs(dx) > 25)) || O.act(el.dataset.swipe, el, d) === false) return settle(el);
      buzz(); el.style.transform = el.style.opacity = '';
      $(`[data-swipe="${el.dataset.swipe}"]`)?.animate([{transform: `translateX(${d * 60}px)`, opacity: 0}, {transform: 'none', opacity: 1}], {duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)'});
    },
    pull(g) {
      const m = g.el;
      if (!P.classList.contains('go')) { P.style.transition = 'opacity .2s'; P.style.opacity = 0; return settle(m); }
      buzz(); P.classList.add('spin'); P.style.transition = m.style.transition = 'transform .2s'; P.style.transform = 'translateY(14px)'; m.style.transform = 'translateY(56px)'; skeleton(900);
      setTimeout(() => { g.fn(); P.classList.remove('spin', 'go'); P.style.opacity = 0; settle(m); toast('Up to date'); }, 900);
    },
    pan() {},
    pinch(g) { if (g.el._z.s < 1.1) { g.el.style.transition = 'transform .25s'; setZoom(g.el, 1, 0, 0); } }
  };
  function move(x, y, e) {
    if (!G || G.mode === 'pinch') return;
    const now = performance.now(), dx = (x - G.x0) / G.k, dy = (y - G.y0) / G.k;
    G.x = x; G.y = y; G.h.push([now, x, y]); while (G.h.length > 2 && now - G.h[0][0] > 100) G.h.shift();
    if (!G.mode) {
      if (Math.hypot(dx, dy) < 6) return;
      G.mode = decide(dx, dy);
      if (G.mode === 'native') { G = null; return; }
      if (!G.touch) { scr().classList.add('dragging'); getSelection()?.removeAllRanges(); }
    }
    if (e.cancelable) e.preventDefault();
    STEP[G.mode](dx, dy);
  }
  function end() {
    const g = G; G = null; if (!g) return;
    scr().classList.remove('dragging');
    if (g.mode === 'pinch') return END.pinch(g);
    const now = performance.now(); while (g.h.length > 1 && now - g.h[0][0] > 100) g.h.shift();
    const dt = Math.max(16, now - g.h[0][0]), vx = (g.x - g.h[0][1]) / g.k / dt, vy = (g.y - g.h[0][2]) / g.k / dt;
    if (!g.mode) { // a tap: two quick taps on a zoomable image zoom it
      const z = g.t.closest('.zoomable');
      if (z && tap && now - tap.t < 320 && Math.hypot(g.x - tap.x, g.y - tap.y) < 30) { tap = null; return zoomAt(z, g.x, g.y); }
      tap = {t: now, x: g.x, y: g.y}; return;
    }
    if (!g.touch) quiet = now + 400; // swallow the click that follows a mouse drag
    END[g.mode](g, (g.x - g.x0) / g.k, (g.y - g.y0) / g.k, vx, vy);
  }
  const span = t => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  function pinch(e) {
    const z = e.target.closest?.('.zoomable'); if (!z || e.touches.length !== 2) { G = null; return; }
    z.style.transition = 'none'; G = {mode: 'pinch', el: z, d0: span(e.touches), c: z._z || {s: 1, x: 0, y: 0}};
  }
  function zoomBy(z, c, s) { s = Math.max(1, Math.min(4, s)); setZoom(z, s, c.x * s / c.s, c.y * s / c.s); }
  function gestures(o) {
    O = o; const s = scr();
    addEventListener('hashchange', () => stop?.()); // momentum never carries over to the next screen
    s.insertAdjacentHTML('beforeend', `<div class="g-edge" aria-hidden="true">${ic('back')}</div><div class="g-pull" aria-hidden="true">${ic('refresh')}</div>`);
    E = $('.g-edge', s); P = $('.g-pull', s);
    const mv = e => move(e.clientX, e.clientY, e);
    const up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); removeEventListener('pointercancel', up); end(); };
    s.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button) return;
      start(e.clientX, e.clientY, e.target, false);
      if (G) { addEventListener('pointermove', mv); addEventListener('pointerup', up); addEventListener('pointercancel', up); }
    });
    s.addEventListener('touchstart', e => { const t = e.touches; t.length === 1 ? start(t[0].clientX, t[0].clientY, e.target, true) : pinch(e); }, {passive: true});
    s.addEventListener('touchmove', e => {
      const t = e.touches;
      if (G?.mode === 'pinch') { if (t.length > 1) { e.preventDefault(); zoomBy(G.el, G.c, G.c.s * span(t) / G.d0); } return; }
      if (t.length === 1) move(t[0].clientX, t[0].clientY, e);
    }, {passive: false});
    s.addEventListener('touchend', e => { if (!e.touches.length) end(); });
    s.addEventListener('touchcancel', end);
    s.addEventListener('click', e => { if (performance.now() < quiet) { e.preventDefault(); e.stopPropagation(); quiet = 0; } }, true);
    s.addEventListener('dragstart', e => e.preventDefault()); // no ghost-image drag of pictures and links
    s.addEventListener('wheel', e => { // trackpad pinch / ctrl+wheel zoom on a zoomable image
      const z = e.ctrlKey && e.target.closest?.('.zoomable'); if (!z) return;
      e.preventDefault(); z.style.transition = 'none'; const c = z._z || {s: 1, x: 0, y: 0}; zoomBy(z, c, c.s * Math.exp(-e.deltaY / 200));
    }, {passive: false});
  }
  function skeleton(ms = 700) { const s = scr(); s.classList.add('sk'); clearTimeout(skeleton.t); skeleton.t = setTimeout(() => s.classList.remove('sk'), ms); }
  const pop = el => el?.animate([{transform: 'scale(1)'}, {transform: 'scale(1.35)'}, {transform: 'scale(1)'}], {duration: 380, easing: 'ease-out'});
  function center(el) { // scroll a chip row so the given chip sits in the middle
    if (!el) return; const r = el.parentElement, a = r.getBoundingClientRect(), b = el.getBoundingClientRect();
    r.scrollTo({left: r.scrollLeft + (b.left - a.left - (a.width - b.width) / 2) / scale(), behavior: 'smooth'});
  }
  // first-run intro slides; each prototype draws them in its own style
  const INTRO = [['Luxury, checked and graded', 'Pre-loved and brand-new pieces. Every listing shows its condition, inclusions and flaws.', 'bags'],
    ['Consign with ease', 'Send photos and details, hand the piece over, and get paid after it sells.', 'watches'],
    ['Help when you need it', 'Ask the FAQ assistant, or open a support ticket after you buy or consign.', 'jewelry']];

  /* ---------- after-sales support tickets ----------
     Tickets live here, outside S, so log-out keeps them: a user submits one, the admin logs in on the same page and replies or changes
     the status, and the user sees it after logging back in. Nothing is saved: everything resets when the page reloads. */
  const DAY = 864e5, T0 = Date.now();
  const TTYPES = [['order', 'Order issue', 'Order issue', 'Late, wrong or missing delivery, or a payment problem'], ['return', 'Return or refund request', 'Return / refund', 'Undeclared flaws, missing inclusions or an exchange'],
    ['auth', 'Authenticity concern', 'Authenticity', 'A question about an item’s authenticity'], ['app', 'App problem', 'App problem', 'Something in the app isn’t working']]; // key, name, short name, hint
  const ttype = k => TTYPES.find(x => x[0] === k) || TTYPES[0];
  const TSTEPS = ['Open', 'In progress', 'Resolved'];
  const AGENTS = ['Bea Santos', 'Paolo Reyes', 'Carla Mendoza', 'Migs Tan'];
  const ADMIN = {email: 'admin@ajluxury.test', pw: 'Admin2026', name: 'Bea Santos'}; // sample staff login; a real app needs A&J's own staff accounts
  const isAdmin = () => !!S.user?.admin;
  const who = u => u?.email && u.email !== '—' ? u.email.trim().toLowerCase() : (u?.mobile || '').replace(/[\s-]/g, ''); // Prototype 4 can log in with a mobile number
  const TK = []; let tseq = 1000;
  const setStatus = (t, st, staff = true) => { // staff changes flag the ticket for the customer
    if (st === t.st) return; t.st = st; t.up = new Date(); t.done = st === 'Resolved' ? t.up : null; if (staff) t.newU = true;
    t.msgs.push({by: 'sys', text: 'Status changed to ' + st, at: t.up});
  };
  const assign = (t, a) => { t.agent = a || null; t.up = new Date(); t.msgs.push({by: 'sys', text: a ? 'Assigned to ' + a : 'Unassigned', at: t.up}); };
  function post(t, by, text, name) { // a reply: the customer's reopens a resolved ticket, the agent's moves an open one to In progress
    t.msgs.push({by, name, text, at: new Date()}); t.up = new Date();
    if (by === 'user') { t.newA = true; if (t.st === 'Resolved') setStatus(t, 'Open', false); }
    else { t.newU = true; t.agent ||= name; if (t.st === 'Open') setStatus(t, 'In progress'); }
  }
  function addTicket(u, {type, link, subj, text, chat}) {
    const t = {ref: 'TKT-' + (++tseq), key: who(u), cust: {name: u.name, email: u.email !== '—' ? u.email : u.mobile, city: '—'}, type, subj, link: link || null,
      ch: chat ? 'Chatbot' : 'Form', chat: chat || null, st: 'Open', agent: null, at: new Date(), msgs: [], newA: true};
    t.up = t.at; t.msgs.push({by: 'user', name: u.name, text, at: t.at}); TK.unshift(t); return t;
  }
  const ticket = ref => TK.find(t => t.ref === ref);
  const byUpdate = l => [...l].sort((a, b) => b.up - a.up);
  const myTickets = u => (mine(u), byUpdate(TK.filter(t => t.key === who(u))));
  // the admin's ticket queues, plus a search over reference, subject, customer and linked order
  const QUEUES = [['active', 'Active'], ['unassigned', 'Unassigned'], ['mine', 'Mine'], ['Open', 'Open'], ['In progress', 'In progress'], ['Resolved', 'Resolved'], ['all', 'All']];
  function queue(k, q = '') {
    const w = q.toLowerCase().split(/\s+/).filter(Boolean), live = t => t.st !== 'Resolved';
    return byUpdate(TK.filter(t => (k === 'all' || (k === 'active' ? live(t) : k === 'unassigned' ? live(t) && !t.agent : k === 'mine' ? live(t) && t.agent === ADMIN.name : t.st === k))
      && w.every(x => [t.ref, t.subj, t.cust.name, t.cust.email, t.link?.ref].join(' ').toLowerCase().includes(x))));
  }
  // escalating from the FAQ chatbot: the last question becomes the subject and the recent chat is attached to the ticket
  const lastAsked = () => (S.msgs.filter(m => m.who === 'me').at(-1)?.text || '').slice(0, 80);
  const chatLog = () => S.msgs.filter(m => m.who && m.text).slice(-8).map(m => (m.who === 'me' ? 'You: ' : 'Assistant: ') + m.text.split('\n')[0].slice(0, 160));
  // The logged-in customer's sample orders and consignments (fixed per email or mobile), so a ticket can be linked to one.
  const MINE = {};
  function mine(u) {
    const k = who(u); if (MINE[k]) return MINE[k];
    let h = [...k].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
    const next = () => (h = (h * 1103515245 + 12345) >>> 0) >>> 8;
    const row = (kind, d, st) => { const p = ITEMS[next() % ITEMS.length]; return {kind, ref: (kind === 'Order' ? 'ORD-7' : 'CON-8') + String(next() % 10000).padStart(4, '0'), item: p.id, title: p.brand + ' ' + p.title, amount: p.price, at: new Date(T0 - d * DAY), status: st, sample: true}; };
    const l = MINE[k] = [row('Order', 3, 'Shipped'), row('Order', 19, 'Delivered'), row('Order', 58, 'Delivered'), row('Consignment', 34, 'Listed'), row('Consignment', 96, 'Paid out')];
    // one resolved sample ticket, so the history and status tracking have something to show
    const o = l[2], at = new Date(T0 - 55 * DAY), t = {ref: 'TKT-' + (++tseq), key: k, cust: {name: u.name, email: u.email !== '—' ? u.email : u.mobile, city: '—'}, type: 'order', subj: 'Question about my delivery schedule',
      link: o, ch: 'Form', chat: null, st: 'Resolved', agent: 'Carla Mendoza', at, up: new Date(+at + 6 * 36e5), done: new Date(+at + 6 * 36e5), sample: true, msgs: [
        {by: 'user', name: u.name, text: 'Hi! Can the rider deliver my order on Saturday morning instead?', at},
        {by: 'agent', name: 'Carla Mendoza', text: 'Hi! Yes, we moved the delivery to Saturday between 9 AM and 12 NN. The rider will message you before arriving.', at: new Date(+at + 2 * 36e5)},
        {by: 'sys', text: 'Status changed to Resolved', at: new Date(+at + 6 * 36e5)}]};
    TK.push(t); return l;
  }

  /* ---------- admin sample data: about a year of orders, consignment requests, sign-ups, tickets and chatbot questions ----------
     Every name, order and number here is generated (example.com emails, invented brands), not A&J data. The generator is seeded,
     so the numbers are the same on every load; dates count back from today, so "last 30 days" always has data. */
  let sd = 7; const rnd = () => (sd = sd * 16807 % 2147483647) / 2147483647;
  const rp = a => a[Math.floor(rnd() * a.length)];
  const rw = (a, w) => { let x = rnd() * w.reduce((s, v) => s + v, 0); return a.find((_, i) => (x -= w[i]) < 0) ?? a.at(-1); };
  const pois = l => { let k = 0, p = Math.exp(-l), s = p; const u = rnd(); while (u > s) { p *= l / ++k; s += p; } return k; };
  const FIRST = 'Andrea Bianca Camille Danica Erika Francesca Gabrielle Hannah Isabel Jasmine Katrina Louise Mika Nicole Patricia Rafael Miguel Carlo Joaquin Enzo Marco Lorenzo Sofia Trisha Janelle Kevin'.split(' ');
  const LAST = ['Santos', 'Reyes', 'Cruz', 'Bautista', 'Ocampo', 'Garcia', 'Mendoza', 'Torres', 'Aquino', 'Ramos', 'Villanueva', 'Castillo', 'Flores', 'Navarro', 'Dela Cruz', 'Gonzales', 'Lim', 'Tan', 'Uy', 'Co', 'Sy', 'Lopez', 'Del Rosario', 'Mercado'];
  const CITY = ['Makati', 'Taguig', 'Quezon City', 'Pasig', 'Mandaluyong', 'Manila', 'Parañaque', 'Cebu City', 'Davao City', 'Iloilo City', 'Baguio', 'Angeles'];
  const UTYPES = ['Buyer', 'Consignor', 'Buyer and consignor'];
  const MODELS = {bags: ['Top-Handle Bag', 'Chain Shoulder Bag', 'Canvas Tote', 'Bucket Bag', 'Crossbody Bag', 'Flap Bag'], watches: ['Automatic 36mm', 'Chronograph 40mm', 'Dress Watch', 'Diver 41mm', 'Ladies Quartz Watch'],
    jewelry: ['Solitaire Ring', 'Tennis Bracelet', 'Pearl Earrings', 'Pendant Necklace', 'Hoop Earrings'], shoes: ['Slingback Flats', 'Low-top Sneakers', 'Block-heel Pumps', 'Suede Loafers', 'Ankle Boots'],
    wallets: ['Zip Wallet', 'Card Holder', 'Wallet on Chain', 'Bifold Wallet', 'Coin Purse'], accessories: ['Silk Scarf', 'Sunglasses', 'Leather Belt', 'Wool Shawl', 'Key Holder']};
  const PRICE = {bags: [45, 260], watches: [40, 320], jewelry: [15, 160], shoes: [18, 55], wallets: [15, 95], accessories: [12, 45]}; // thousands of pesos
  const COLOURS = ['Black', 'Cream', 'Tan', 'Burgundy', 'Navy', 'White', 'Gold', 'Silver', 'Rose', 'Olive'];
  const person = () => { const f = rp(FIRST), l = rp(LAST); return {name: f + ' ' + l, email: (f + '.' + l.replace(/ /g, '')).toLowerCase() + '@example.com', city: rw(CITY, [16, 15, 14, 11, 7, 7, 6, 8, 6, 4, 3, 3])}; };
  const piece = () => { const cat = rw(CATS.map(c => c[0]), [34, 14, 15, 12, 15, 10]), [lo, hi] = PRICE[cat];
    return {cat, brand: rp(BRANDS), title: `${rp(MODELS[cat])} in ${rp(COLOURS)}`, amount: Math.round((lo + (hi - lo) * rnd() ** 1.8) * 2) * 500}; };
  const TXT = { // [subject, customer message] per type, then the agent's first reply and the closing reply
    order: [[['Item not delivered yet', 'My order still hasn’t arrived. Can you check where it is?'], ['Wrong delivery address', 'I entered the wrong address. Can the rider deliver to my office instead?'], ['Payment not reflected', 'I paid by bank transfer yesterday but the order still shows unpaid.'], ['Tracking link not working', 'The courier’s tracking link shows an error.']],
      'Thanks for reaching out. I’m checking this with our logistics team and will update you today.', 'The courier confirmed the update and your order is on its way. Let us know if anything else comes up.'],
    return: [[['Undeclared scratch on the item', 'There’s a scratch on the clasp that wasn’t in the listing photos.'], ['Missing dustbag', 'The listing said a dustbag was included but it wasn’t in the box.'], ['Request for exchange', 'Can I exchange this for a different size?'], ['Refund question', 'Is a refund possible if the item doesn’t fit?']],
      'Sorry about this. Please send photos of the item with the security tag still on, so we can review it under our exchange policy.', 'We reviewed your request under our exchange policy and sent the next steps by your chosen contact channel.'],
    auth: [[['Question about the authenticity card', 'The card looks different from the one I have for another bag. Can you explain?'], ['Serial code check', 'I want to confirm the serial code on my item matches your records.'], ['Request for a second inspection', 'Can your team re-inspect the stitching on my item?']],
      'Thank you. I’ve passed this to our authentication team. They will review the item details and get back to you.', 'Our authentication team reviewed your concern and sent you a written explanation. Reply here if you have more questions.'],
    app: [[['Can’t upload photos', 'The photo upload keeps failing in the consignment form.'], ['Sign-up code not received', 'I didn’t receive the SMS code when signing up.'], ['Wishlist not saving', 'Items I save disappear after I log out.'], ['App freezes on the inquiry form', 'The app freezes when I open the inquiry form.']],
      'Thanks for reporting this. Which phone model and app version are you using?', 'We released a fix in the latest version. Please update the app and tell us if it happens again.']
  };
  const RESH = {order: [3, 40], return: [12, 110], auth: [20, 140], app: [1, 30]}; // hours to resolve, min and max
  const USERS = [], ORD = [], CONS = [], BOTD = [];
  for (let n = 0; n < 150; n++) USERS.push({...person(), at: new Date(T0 - (400 + rnd() * 500) * DAY), type: rw(UTYPES, [62, 14, 24])}); // joined before the sample year
  for (let i = 400; i >= 0; i--) {
    const day = new Date(T0 - i * DAY), m = day.getMonth(), g = 1 + (400 - i) / 400 * .4, wk = [0, 6].includes(day.getDay()) ? 1.15 : 1;
    const k = g * wk * ({11: 1.7, 10: 1.25, 0: .85}[m] || 1) * ([14, 15, 29, 30].includes(day.getDate()) ? 1.3 : 1); // December peak, paydays, weekends
    const at = () => new Date(Math.min(T0 - rnd() * 36e5, new Date(day.getFullYear(), m, day.getDate(), 9 + Math.floor(rnd() * 12), Math.floor(rnd() * 60))));
    for (let n = pois(1.9 * g); n--;) USERS.push({...person(), at: at(), type: rw(UTYPES, [62, 14, 24])});
    for (let n = pois(1.05 * k); n--;) ORD.push({ref: 'ORD-' + (20000 + ORD.length), at: at(), cust: rp(USERS), ...piece(), pay: rw(['Bank transfer', 'GCash', 'Credit card', 'Cash on delivery', 'Cash on pick-up', 'Layaway'], [30, 28, 18, 6, 8, 10]),
      st: i < 1 ? 'Processing' : i < 4 ? 'Shipped' : 'Delivered'});
    for (let n = pois(.42 * g); n--;) { const r = rnd();
      CONS.push({ref: 'CON-' + (5000 + CONS.length), at: at(), cust: rp(USERS), ...piece(), st: i < 2 ? 'Submitted' : i < 5 ? 'Received' : i < 9 ? 'Authenticated' : r < .08 ? 'Declined' : r < .13 ? 'Pulled out' : i < 25 || r > .8 ? 'Listed' : i < 50 ? 'Sold' : 'Paid out'}); }
    for (let n = pois(.6 * g); n--;) {
      const type = rw(['order', 'return', 'auth', 'app'], [36, 24, 14, 26]), o = type !== 'app' && ORD.length ? rp(ORD.slice(-50)) : null, c = o ? o.cust : rp(USERS), t0 = at();
      const [msgs, first, last] = TXT[type], [subj, text] = rp(msgs), [lo, hi] = RESH[type], resH = lo + (hi - lo) * rnd() ** 1.5, firstH = .3 + rnd() * 20, age = (T0 - t0) / 36e5, late = age < 504 && rnd() < .4; // some of the last 3 weeks still waits on the customer or the team
      const t = {ref: '', key: c.email, cust: c, type, subj, link: o && {kind: 'Order', ref: o.ref, title: o.brand + ' ' + o.title, amount: o.amount, at: o.at, status: o.st}, ch: rnd() < .3 ? 'Chatbot' : 'Form', chat: null, at: t0,
        st: !late && age > resH ? 'Resolved' : age > firstH ? 'In progress' : 'Open', agent: null, msgs: [{by: 'user', name: c.name, text, at: t0}]};
      if (t.ch === 'Chatbot') t.msgs.unshift({by: 'sys', text: 'Escalated from the FAQ assistant', at: t0});
      if (t.st !== 'Open' || rnd() < .5) t.agent = rp(AGENTS);
      if (t.st !== 'Open') t.msgs.push({by: 'agent', name: t.agent, text: first, at: new Date(+t0 + firstH * 36e5)});
      if (t.st === 'Resolved') { t.done = new Date(+t0 + resH * 36e5); t.msgs.push({by: 'agent', name: t.agent, text: last, at: t.done}, {by: 'sys', text: 'Status changed to Resolved', at: t.done}); }
      t.up = t.msgs.at(-1).at; TK.push(t);
    }
    BOTD.push({at: day, q: pois(27 * g * wk), fb: pois(1.6 * g * wk)});
  }
  TK.sort((a, b) => a.at - b.at).forEach(t => t.ref = 'TKT-' + (++tseq)); TK.reverse();
  const TOPICS = {buy: ['Buying', 14.3], consign: ['Consigning', 15.8], sell: ['Selling for cash', 6.2], payout: ['Payouts', 4.7], shipping: ['Shipping', 12.6], payment: ['Payment', 11.9], layaway: ['Layaway', 8.8], authentic: ['Authenticity', 10.4],
    returns: ['Returns', 7.3], support: ['Order help', 6.1], condition: ['Condition', 3.9], showroom: ['Showroom', 5.6], account: ['Accounts', 3.2], human: ['Talk to a person', 4.4], none: ['Not understood', 0]}; // share of questions

  /* ---------- analytics + reports (read by the admin screens) ---------- */
  const sum = (l, f) => l.reduce((n, x) => n + (typeof f === 'string' ? x[f] : f(x)), 0);
  const hrs = h => h < 48 ? Math.round(h) + ' h' : (h / 24).toFixed(1) + ' days';
  const compact = new Intl.NumberFormat('en-PH', {notation: 'compact', maximumFractionDigits: 1});
  const pesoK = n => '₱' + compact.format(n);
  const pct = n => Math.round(n * 100) + '%';
  const vs = (a, b) => b ? (a >= b ? '▲ ' : '▼ ') + Math.abs(Math.round((a - b) / b * 100)) + '% vs previous' : ''; // change against the period before
  const rtf = new Intl.RelativeTimeFormat('en', {numeric: 'auto'});
  const ago = d => { const m = (d - Date.now()) / 6e4; return Math.abs(m) < 60 ? rtf.format(Math.round(m), 'minute') : Math.abs(m) < 1440 ? rtf.format(Math.round(m / 60), 'hour') : rtf.format(Math.round(m / 1440), 'day'); };
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const PERIODS = [[7, '7 days'], [30, '30 days'], [90, '90 days'], [365, '12 months']];
  function range(days) { // 12 months starts on the 1st, so the chart shows whole months
    const f = new Date(T0 - (days - 1) * DAY); f.setHours(0, 0, 0, 0); if (days === 365) { f.setMonth(f.getMonth() + 1, 1); }
    return {f, t: new Date()};
  }
  function bins(f, t) { // days up to a month, then weeks up to about four months, then months
    const days = (t - f) / DAY, u = days <= 32 ? 'd' : days <= 125 ? 'w' : 'm', out = [], s = new Date(f); s.setHours(0, 0, 0, 0); if (u === 'm') s.setDate(1);
    while (s <= t) {
      const e = new Date(s); u === 'd' ? e.setDate(e.getDate() + 1) : u === 'w' ? e.setDate(e.getDate() + 7) : e.setMonth(e.getMonth() + 1);
      out.push({s: new Date(s), e, l: u === 'm' ? fmtDate(s, {month: 'short'}) : fmtDate(s), tl: u === 'm' ? fmtDate(s, {month: 'long', year: 'numeric'}) : u === 'w' ? 'Week of ' + fmtDate(s) : fmtDate(s, {weekday: 'short', month: 'short', day: 'numeric'})});
      s.setTime(+e);
    }
    return out;
  }
  const series = (l, f, t, val = () => 1) => bins(f, t).map(b => [b.l, sum(l.filter(x => x.at >= b.s && x.at < b.e && x.at >= f && x.at <= t), val), b.tl]);
  const botAll = () => [...BOTD, ...BOT.map(b => ({at: b.at, q: 1, fb: b.topic === 'none' ? 1 : 0}))];
  function stats(f, t) {
    const w = x => x.at >= f && x.at <= t, o = ORD.filter(w), done = TK.filter(x => x.done && x.done >= f && x.done <= t), b = botAll().filter(w), tk = TK.filter(w);
    return {sales: sum(o, 'amount'), orders: o.length, users: USERS.filter(w).length, cons: CONS.filter(w).length, tickets: tk.length, esc: tk.filter(x => x.ch === 'Chatbot').length,
      res: done.length ? sum(done, x => x.done - x.at) / done.length / 36e5 : 0, q: sum(b, 'q'), faq: sum(b, 'q') ? 1 - sum(b, 'fb') / sum(b, 'q') : 0};
  }
  const trend = (kind, f, t) => kind === 'sales' ? series(ORD, f, t, x => x.amount) : kind === 'tickets' ? series(TK, f, t) : series(botAll(), f, t, x => x.q);
  const topCats = (f, t) => CATS.map(([c, l]) => [l, sum(ORD.filter(x => x.cat === c && x.at >= f && x.at <= t), 'amount')]).sort((a, b) => b[1] - a[1]);
  const resByType = (f, t) => TTYPES.map(([k, , s]) => { const l = TK.filter(x => x.type === k && x.done && x.done >= f && x.done <= t); return [s, l.length ? sum(l, x => x.done - x.at) / l.length / 36e5 : 0]; });
  function topics(f, t) {
    const b = botAll().filter(x => x.at >= f && x.at <= t), w = sum(Object.values(TOPICS), x => x[1]), live = BOT.filter(x => x.at >= f && x.at <= t);
    const n = sum(b, 'q') - live.length, fb = sum(b, 'fb') - live.filter(x => x.topic === 'none').length;
    return Object.entries(TOPICS).map(([k, [l, wt]]) => [l, (k === 'none' ? fb : Math.round((n - fb) * wt / w)) + live.filter(x => x.topic === k).length]).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }
  const REPORTS = {sales: ['Sales', CATS], consignments: ['Consignments', CATS], tickets: ['Support tickets', TTYPES.map(([k, l]) => [k, l])], users: ['Users', UTYPES.map(x => [x, x])]};
  const most = (l, f) => { const c = {}; l.forEach(x => c[f(x)] = (c[f(x)] || 0) + 1); return Object.entries(c).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'; };
  // report(kind, from, to, category) -> {title, sub, kpis, cols: [[label, 'd' date | 'p' peso | '']], rows (newest first), show (columns shown on the phone), trend, fmt}
  function report(kind, f, t, cat = '') {
    const w = x => x.at >= f && x.at <= t && (!cat || (x.cat ?? x.type) === cat), [title, cats] = REPORTS[kind];
    const r = {kind, title: title + ' report', file: `aj-${kind}-report-${iso(f)}-to-${iso(t)}`, fmt: n => compact.format(n)};
    if (kind === 'sales') { const l = ORD.filter(w).reverse(), s = sum(l, 'amount');
      Object.assign(r, {kpis: [['Sales', peso(s)], ['Orders', l.length], ['Average order', peso(l.length ? s / l.length : 0)], ['Top category', most(l, x => catName(x.cat))]],
        cols: [['Date', 'd'], ['Order'], ['Item'], ['Category'], ['Customer'], ['City'], ['Payment'], ['Status'], ['Amount', 'p']], show: [0, 2, 7, 8], fmt: pesoK, trend: series(l, f, t, x => x.amount),
        rows: l.map(x => [x.at, x.ref, x.brand + ' ' + x.title, catName(x.cat), x.cust.name, x.cust.city, x.pay, x.st, x.amount])}); }
    if (kind === 'consignments') { const l = CONS.filter(w).reverse();
      Object.assign(r, {kpis: [['Requests', l.length], ['Listed now', l.filter(x => x.st === 'Listed').length], ['Sold or paid out', l.filter(x => /Sold|Paid/.test(x.st)).length], ['Declined', l.filter(x => x.st === 'Declined').length]],
        cols: [['Submitted', 'd'], ['Reference'], ['Item'], ['Category'], ['Consignor'], ['Status'], ['Asking price', 'p']], show: [0, 2, 5, 6], trend: series(l, f, t),
        rows: l.map(x => [x.at, x.ref, x.brand + ' ' + x.title, catName(x.cat), x.cust.name, x.st, x.amount])}); }
    if (kind === 'tickets') { const l = TK.filter(w), done = l.filter(x => x.done);
      Object.assign(r, {kpis: [['Tickets', l.length], ['Resolved', done.length], ['Average resolution', done.length ? hrs(sum(done, x => x.done - x.at) / done.length / 36e5) : '—'], ['Via chatbot', l.length ? pct(l.filter(x => x.ch === 'Chatbot').length / l.length) : '—']],
        cols: [['Created', 'd'], ['Ticket'], ['Type'], ['Subject'], ['Customer'], ['Channel'], ['Assignee'], ['Status'], ['Resolution (hours)']], show: [0, 1, 3, 7], trend: series(l, f, t),
        rows: l.map(x => [x.at, x.ref, ttype(x.type)[1], x.subj, x.cust.name, x.ch, x.agent || 'Unassigned', x.st, x.done ? Math.round((x.done - x.at) / 36e5 * 10) / 10 : ''])}); }
    if (kind === 'users') { const l = USERS.filter(w).reverse();
      Object.assign(r, {kpis: [['New users', l.length], ['Buyers', l.filter(x => x.type !== 'Consignor').length], ['Consignors', l.filter(x => x.type !== 'Buyer').length], ['Top city', most(l, x => x.city)]],
        cols: [['Joined', 'd'], ['Name'], ['Email'], ['Type'], ['City']], show: [0, 1, 3, 4], trend: series(l, f, t), rows: l.map(x => [x.at, x.name, x.email, x.type, x.city])}); }
    r.sub = `${fmtDate(f, {day: 'numeric', month: 'short', year: 'numeric'})} – ${fmtDate(t, {day: 'numeric', month: 'short', year: 'numeric'})} · ${cat ? cats.find(c => c[0] === cat)[1] : 'All categories'} · ${r.rows.length} rows`;
    return r;
  }
  const cell = (v, k) => k === 'd' ? fmtDate(v, {day: 'numeric', month: 'short', year: 'numeric'}) : k === 'p' ? peso(v) : esc(v);
  function csv(r) { // dates as yyyy-mm-dd and amounts as plain numbers, so a spreadsheet can sum them; text that starts like a formula is neutralised
    const q = v => { let s = String(v ?? ''); if (/^[=+\-@]/.test(s) && typeof v === 'string') s = "'" + s; return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
    const text = [r.cols.map(([l, k]) => q(k === 'p' ? l + ' (PHP)' : l)).join(','), ...r.rows.map(row => row.map((v, i) => q(r.cols[i][1] === 'd' ? iso(v) : v)).join(','))].join('\r\n');
    const a = Object.assign(document.createElement('a'), {href: URL.createObjectURL(new Blob(['﻿' + text], {type: 'text/csv'})), download: r.file + '.csv'});
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  function printReport(r) { // the browser's print dialog, where "Save as PDF" makes the PDF; phone.css prints only this sheet
    const p = $('#ajprint') || document.body.appendChild(Object.assign(document.createElement('div'), {id: 'ajprint'}));
    p.innerHTML = `<h1>A&amp;J Luxury · ${esc(r.title)}</h1><p>${esc(r.sub)} · Generated ${fmtDate(new Date(), {day: 'numeric', month: 'short', year: 'numeric'})}</p>
     <dl>${r.kpis.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>${cols(r.trend, r.fmt)}
     <table><thead><tr>${r.cols.map(c => `<th>${c[0]}</th>`).join('')}</tr></thead><tbody>${r.rows.map(row => `<tr>${row.map((v, i) => `<td>${cell(v, r.cols[i][1])}</td>`).join('')}</tr>`).join('')}</tbody></table>
     <p>Sample data generated for the prototype. These are not A&amp;J figures.</p>`;
    print();
  }

  /* ---------- charts: one-series inline SVG, columns for change over time and bars for rankings. Each prototype colours them with
     --ch (marks), --chg (gridlines) and --cht (axis text). Hovering or tapping a mark shows its value in the chart's readout line. ---------- */
  const nice = v => { const p = 10 ** Math.floor(Math.log10(v || 1)); return [1, 2, 2.5, 5, 10].map(k => k * p).find(k => k >= v); };
  function cols(rows, f = String) { // rows: [[axis label, value, tooltip label]]
    const W = 340, H = 150, L = 36, B = 20, T = 8, max = nice(Math.max(...rows.map(r => r[1]), 1)), bw = (W - L) / rows.length, w = Math.min(24, bw * .7), step = Math.ceil(rows.length / 6);
    const y = v => H - B - (H - B - T) * v / max;
    const bar = (x, v) => { const h = H - B - y(v), r = Math.min(4, h, w / 2); return h > 0 ? `<path class="ch-b" d="M${x} ${H - B}V${y(v) + r}Q${x} ${y(v)} ${x + r} ${y(v)}H${x + w - r}Q${x + w} ${y(v)} ${x + w} ${y(v) + r}V${H - B}Z"/>` : ''; };
    return `<svg class="ch-s" viewBox="0 0 ${W} ${H}">${[0, .5, 1].map(k => `<line class="ch-g" x1="${L}" x2="${W}" y1="${y(max * k)}" y2="${y(max * k)}"/><text class="ch-ax" x="${L - 6}" y="${y(max * k) + 3}" text-anchor="end">${f(max * k)}</text>`).join('')}
     ${rows.map(([l, v, tl], i) => { const x = L + i * bw + (bw - w) / 2; return `<g data-tip="${esc(tl || l)}: ${esc(f(v))}">${bar(x, v)}<rect x="${L + i * bw}" y="0" width="${bw}" height="${H - B}" fill="transparent"/>${(rows.length - 1 - i) % step ? '' : `<text class="ch-ax" x="${x + w / 2}" y="${H - 6}" text-anchor="middle">${esc(l)}</text>`}</g>`; }).join('')}</svg>`;
  }
  function hbars(rows, f = String) { // rows: [[label, value]], largest first
    const W = 340, rh = 26, L = 108, R = 64, max = Math.max(...rows.map(r => r[1]), 1);
    return `<svg class="ch-s" viewBox="0 0 ${W} ${rows.length * rh}">${rows.map(([l, v], i) => { const w = v ? Math.max(3, (W - L - R) * v / max) : 0, y = i * rh + 7, r = Math.min(4, w / 2);
      return `<g data-tip="${esc(l)}: ${esc(f(v))}"><text class="ch-ax" x="0" y="${y + 9}">${esc(l)}</text>${w ? `<path class="ch-b" d="M${L} ${y}H${L + w - r}Q${L + w} ${y} ${L + w} ${y + r}V${y + 12 - r}Q${L + w} ${y + 12} ${L + w - r} ${y + 12}H${L}Z"/>` : ''}<text class="ch-v" x="${L + w + 6}" y="${y + 10}">${esc(f(v))}</text><rect x="0" y="${i * rh}" width="${W}" height="${rh}" fill="transparent"/></g>`; }).join('')}</svg>`;
  }
  const chart = (svg, tip) => `<div class="ch"><p class="ch-r" aria-live="polite">${esc(tip)}</p>${svg}</div>`;
  const colChart = (rows, f = String) => { const l = rows.at(-1); return chart(cols(rows, f), `${l[2] || l[0]}: ${f(l[1])}`); }; // readout starts on the latest period
  const barChart = (rows, f = String) => chart(hbars(rows, f), `${rows[0][0]}: ${f(rows[0][1])}`);
  const showTip = e => { const g = e.target.closest?.('.ch [data-tip]'); if (g) g.closest('.ch').querySelector('.ch-r').textContent = g.dataset.tip; };
  addEventListener('pointerover', showTip); addEventListener('click', showTip);

  const SB ='<div class="island"></div><div class="status"><span>9:41</span><span><svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.500" width="3" height="6.500" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" y="0" width="3" height="12" rx=".8"/></svg><svg viewBox="0 0 17 12"><path d="M8.500 2.500c2.300 0 4.400.9 6 2.400l1.200-1.300A10.600 10.600 0 0 0 8.500.7 10.600 10.600 0 0 0 1.300 3.600L2.500 4.900a8.800 8.800 0 0 1 6-2.400zm0 3.700c1.300 0 2.500.5 3.400 1.300l1.200-1.300a7.100 7.100 0 0 0-9.200 0l1.200 1.300c.9-.8 2.100-1.300 3.400-1.300zm0 3.600l1.800-1.900a2.600 2.600 0 0 0-3.600 0z"/></svg><svg viewBox="0 0 27 12"><rect x=".5" y=".5" width="22" height="11" rx="3.200" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="19" height="8" rx="2"/><rect x="24" y="4" width="2" height="4" rx="1" opacity=".45"/></svg></span></div><div class="homebar"></div>';
  document.body.insertAdjacentHTML('afterbegin', sprite);
  $$('.screen').forEach(s => s.insertAdjacentHTML('afterbegin', SB));
  fit();

  return {$, $$, esc, peso, fmtDate, isEmail, isMobile, ref, S, isGuest, D, req, ticked, mobileRule, emailRule, validate, fld, sel, chk, ic, CATS, catName, ITEMS, BRANDS, item, pic, art, PHOTO_SLOTS,
    FAQ, faq, CHIPS, GREETING, reply, answer, paras, info, CONTACT, toast, route, gestures, skeleton, pop, center, INTRO,
    TTYPES, ttype, TSTEPS, AGENTS, ADMIN, isAdmin, who, TK, ticket, addTicket, post, setStatus, assign, mine, myTickets, QUEUES, queue, lastAsked, chatLog,
    PERIODS, range, stats, trend, topCats, resByType, topics, REPORTS, report, cell, csv, printReport, colChart, barChart, hrs, pesoK, pct, vs, compact, ago, iso};
})();
