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
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.600 5.600l2.100 2.100M16.300 16.300l2.100 2.100M5.600 18.400l2.100-2.100M16.300 7.700l2.100-2.100"/>'
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
    {id: 'human', q: 'Talk to a person', k: ['person', 'human', 'agent', 'staff', 'someone', 'call me', 'phone', 'viber', 'whatsapp', 'contact', 'talk to', 'speak to', 'customer service'],
      human: true,
      a: 'I can’t chat with the team from inside this prototype, but you can message them directly. The contact details are still to be provided by A&J.'}
  ];
  const GREETING = 'Hi! I’m the A&J FAQ assistant (prototype). Ask me about buying, consigning, shipping, payment or authenticity.';
  const FALLBACK = 'I’m not sure about that one. I can help with: how to buy, consignment, shipping, payment, layaway, authenticity, returns and the showroom.\nFor anything else, or a specific item, the A&J team can help directly.';
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
  const CHIPS = ['buy', 'consign', 'shipping', 'payment', 'layaway', 'authentic', 'returns', 'showroom'];
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
  const SB = '<div class="island"></div><div class="status"><span>9:41</span><span><svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.500" width="3" height="6.500" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" y="0" width="3" height="12" rx=".8"/></svg><svg viewBox="0 0 17 12"><path d="M8.500 2.500c2.300 0 4.400.9 6 2.400l1.200-1.300A10.600 10.600 0 0 0 8.500.7 10.600 10.600 0 0 0 1.300 3.600L2.500 4.900a8.800 8.800 0 0 1 6-2.400zm0 3.700c1.300 0 2.500.5 3.400 1.300l1.200-1.300a7.100 7.100 0 0 0-9.200 0l1.200 1.300c.9-.8 2.100-1.300 3.400-1.300zm0 3.600l1.800-1.900a2.600 2.600 0 0 0-3.600 0z"/></svg><svg viewBox="0 0 27 12"><rect x=".5" y=".5" width="22" height="11" rx="3.200" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="19" height="8" rx="2"/><rect x="24" y="4" width="2" height="4" rx="1" opacity=".45"/></svg></span></div><div class="homebar"></div>';
  document.body.insertAdjacentHTML('afterbegin', sprite);
  $$('.screen').forEach(s => s.insertAdjacentHTML('afterbegin', SB));
  fit();

  return {$, $$, esc, peso, fmtDate, isEmail, isMobile, ref, S, isGuest, D, req, ticked, mobileRule, emailRule, validate, fld, sel, chk, ic, CATS, catName, ITEMS, BRANDS, item, pic, art, PHOTO_SLOTS,
    FAQ, faq, CHIPS, GREETING, reply, paras, info, CONTACT, toast, route};
})();
