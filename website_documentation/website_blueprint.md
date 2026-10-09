# A&J Luxury: Website Blueprint

| | |
|---|---|
| **Site** | A&J Luxury, <https://aandjluxury.com/> |
| **Observed** | 2026-10-09 (all counts, prices and availability are a snapshot of that day) |
| **Visitor state** | Anonymous, Philippines (PHP ₱), no cookies accepted, no account |
| **Method** | `robots.txt` read first; `sitemap.xml` and child sitemaps; HTTP fetches (1 request/second); the store's documented read-only JSON feeds; headless Chromium (Playwright) for screenshots at 1440 / 768 / 390 px, computed styles and interaction tests |
| **Companion files** | [sitemap.md](sitemap.md) · [asset_inventory.md](asset_inventory.md) · [datasets/](datasets/) · [assets/](assets/) |

## How to read this document

Every statement carries one of these evidence levels.

| Label | Meaning |
|---|---|
| **Confirmed** | Read directly from the site's HTML, CSS, headers, JSON feeds or sitemap, or reproduced in a live browser test. |
| **Observed** | Seen in a screenshot or the rendered page, not separately measured. |
| **Estimate** | Derived (e.g. a colour sampled from a screenshot, a ratio computed from sizes). Always flagged. |
| **Unverified** | Present in markup or on screen, but the behaviour was **not** exercised or could not be confirmed. |

Nothing was invented to fill gaps; where the site gives no data, the document says so.

## Table of contents

1. [Executive summary](#1-executive-summary)
2. [Website overview](#2-website-overview)
3. [Visual design system](#3-visual-design-system)
4. [Sitemap summary](#4-sitemap-summary)
5. [Page-by-page documentation](#5-page-by-page-documentation)
6. [Module inventory](#6-module-inventory)
7. [Feature and function inventory](#7-feature-and-function-inventory)
8. [User workflows](#8-user-workflows)
9. [Content catalog](#9-content-catalog)
10. [Datasets](#10-datasets)
11. [Image and asset inventory](#11-image-and-asset-inventory)
12. [Technical observations](#12-technical-observations)
13. [Content and navigation issues found](#13-content-and-navigation-issues-found)
14. [Implementation guidance for a similar site or app](#14-implementation-guidance-for-a-similar-site-or-app)
15. [Limitations and unresolved questions](#15-limitations-and-unresolved-questions)
16. [Appendix: method, compliance and file index](#16-appendix-method-compliance-and-file-index)

---

## 1. Executive summary

A&J Luxury is a Philippine reseller of authenticated **pre-loved** (956 items) and **brand-new** (35 items) luxury goods, with a **consignment** and **sell-to-us** service. The site is a standard **Shopify** storefront on the commercial **Minimog 5.4.0** theme, lightly customised: black and white palette, Poppins typography, square-cornered buttons, and photography shot on a branded diamond-pattern mat.

What a developer needs to know:

- **Catalogue-first, enquiry-led commerce.** 991 products, each a single variant ("Default Title") priced in PHP from ₱4,000 to ₱1,280,000, with no SKUs, no sale prices and no sizes. The product page pushes visitors to **Viber and WhatsApp** to enquire; an "Add to cart" exists too, but the FAQ tells website buyers to also message the shop (Instagram, Facebook, Viber or WhatsApp) and lists bank, GCash and BDO Checkout payment options.
- **Rich filtering** on collection pages (brand, colour, condition "rank" out of 10, price, availability) and a predictive search, but **no category pages beyond Bags, Shoes and Small Leather Goods** actually hold stock; Scents, Clothing and Sale are empty yet linked.
- **Trust content** (authenticity guarantee, layaway, consignment rules, FAQs) is long-form copy, not structured data, and contains contradictions (see [section 13](#13-content-and-navigation-issues-found)).
- **Navigation defects:** the header Wishlist icon goes to a 404; the footer "Customer Reviews" and "Brands" links are dead; the consign/sell form that both pages tell users to fill in does not exist.
- **Public machine-readable data is plentiful** (Shopify JSON feeds); this blueprint captured it as 10 dataset files (991 products, 26,972 image URLs).

---

## 2. Website overview

### 2.1 Identity and business

| Item | Value | Evidence |
|---|---|---|
| Brand name | A&J Luxury ("A & J Luxury" in the `<title>`) | Confirmed |
| Tagline / meta description | "100% Authentic Luxury Items with Money Back Guarantee" | Confirmed (`<meta name="description">`) |
| Announcement bar | "BUY, SELL, & CONSIGN" (plain text, not a link) | Confirmed |
| Founders (story copy) | Two sisters, Alex and Joyce; started selling mid-brands in 2018; sourced brand-new items directly from Italy during the 2020 pandemic; later accepted consignments | Confirmed (About Us copy) |
| Business lines | Pre-loved resale, brand-new resale, consignment, outright purchase from sellers, layaway | Confirmed (pages and product copy) |
| Showroom | "South Caloocan" (Visit Us page); open "Every day 12nn to 8pm". Product descriptions mostly say **Quezon City** (see [section 13](#13-content-and-navigation-issues-found)) | Confirmed |
| Public contacts | Phone `+639277537322` (footer `tel:`); Viber `09277537322`; WhatsApp `639152345968`; email `info@aandjluxury.com`; Facebook `/ajluxuryph/`; Instagram `@shopwithaandj` | Confirmed |
| Delivery area | Philippines only ("we only deliver nationwide"); free shipping within Metro Manila on the benefit strip and in product copy | Confirmed (FAQ) |
| Currency / locale | PHP ₱, English (`en-PH`) | Confirmed (`Shopify.currency`, `content-language`) |

### 2.2 Platform

| Item | Value | Evidence |
|---|---|---|
| Platform | Shopify (response header `powered-by: Shopify`; `Shopify.shop = "a-and-j-luxury.myshopify.com"`) | Confirmed |
| Theme | Name **"Nonah Designs 3.0"**, schema **"Minimog - OS 2.0" v5.4.0**, `theme_store_id: null` (not installed from the Shopify theme store), theme id 138006528180 | Confirmed |
| Edge / CDN | Cloudflare (`server: cloudflare`), Shopify CDN for assets and fonts | Confirmed |
| Agent commerce | UCP discovery at `/.well-known/ucp` and an MCP endpoint at `/api/ucp/mcp`, advertised in `robots.txt` and `/agents.md` (Shopify-provided) | Confirmed (profile fetched; endpoint **not** called) |

### 2.3 Scale snapshot

| Metric | Value |
|---|--:|
| Products (live JSON feed) | 991 (971 in `sitemap.xml`) |
| Pre-loved / Brand-new | 956 / 35 |
| Available / unavailable | 985 / 6 |
| Brands (Shopify "vendor") | 51 in the feed; 50 in the filter list |
| Collections | 12 (3 empty) |
| Pages in sitemap | 9 (3 are 404) |
| Blog articles | 1 (June 2022) |
| Product images | 26,972 (5 to 55 per product, median 30, mean 27.2) |
| Price range / median / mean | ₱4,000 / ₱48,000 / ≈ ₱90,511 / ₱1,280,000 max |

---

## 3. Visual design system

Source: inline `<style>` colour schemes on the homepage, `:root` custom properties read from the live page (101 variables, saved in [`datasets/design_tokens.json`](datasets/design_tokens.json)), and computed styles from Chromium at 1440 px. Hex values are **converted from the theme's RGB tokens** (exact) unless marked **Estimate**.

### 3.1 Brand mark

| | |
|---|---|
| Logo | Black line-art diamond with "A & J" above and "LUXURY" below, on transparent background, 500×300 PNG: [`logopng.png`](assets/branding/logopng.png) |
| Logo size on site | 125 px wide desktop, 120 px mobile (`--logo-width-desktop/-mobile`) |
| Favicon | The same PNG rendered at 32×32 |
| Share image | [`soc.jpg`](assets/branding/soc.jpg), 1200×628 |
| Tone | Monochrome, minimal, editorial; colour comes almost entirely from product photography |

### 3.2 Colour palette

**Default scheme (`.m-color-default`), used by header, product tabs, category tiles, promo panels, testimonials and all content pages**

| Role | Token | RGB | HEX | Where seen |
|---|---|---|---|---|
| Background | `--color-background` | 255,255,255 | `#FFFFFF` | Page and header |
| Surface (secondary background) | `--color-background-secondary` | 245,245,245 | `#F5F5F5` | Secondary panels |
| Text / headings | `--color-foreground`, `--color-heading` | 34,34,34 | `#222222` | Body text, headings, nav links |
| Muted text | `--color-foreground-secondary` | 102,102,102 | `#666666` | Secondary copy; sub-menu links render at 60 % opacity of `#222222` |
| Primary button | `--color-button` | 0,0,0 | `#000000` | Filled buttons; button text `#FFFFFF` |
| Button hover | `--color-button-hover` | 34,34,34 | `#222222` | Hover fill with white text |
| Outline button | `--color-outline-button` | 0,0,0 | `#000000` | Secondary (outlined) buttons |
| Border | `--color-border` | 238,238,238 | `#EEEEEE` | Dividers, cards |
| Regular price | `--color-price-regular` | 0,0,0 | `#000000` | Prices |
| Sale price | `--color-price-sale` | 232,78,78 | `#E84E4E` | Defined, **not seen** in use (no item has a compare-at price) |
| Form field | `--color-form-field` / text | 255,255,255 / 0,0,0 | `#FFFFFF` / `#000000` | Inputs |
| Tooltip | `--color-tooltip` / text | 34,34,34 / 255,255,255 | `#222222` / `#FFFFFF` | Tooltips |

**Other schemes defined by the theme**

| Scheme class | Background | Text | Button / text | Border | Used for (Confirmed unless stated) |
|---|---|---|---|---|---|
| `.m-color-dark` | `#000000` | `#FFFFFF` | `#FFFFFF` / `#222222` | `#4B4B4B` | **Announcement bar and footer** (computed footer text is white on black) |
| `.m-color-footer` | `#F9F9F9` | `#000000` | `#222222` / `#FFFFFF` | `#DEDEDE` | **Benefit icon strip** (despite its name, not the footer) |
| `.m-color-badge-hot` | `#E4D266` | `#222222` | `#222222` / `#E4D266` | `#222222` | Badge scheme; not seen in use |
| `.m-color-badge-new` | `#49A594` | `#FFFFFF` | | `#DEDEDE` | Badge scheme; not seen in use |
| `.m-color-badge-sale` | `#DA3F3F` | `#FFFFFF` | | `#DEDEDE` | Badge scheme; not seen in use |
| `.m-color-scheme-cee058e4-…` | `#F4F4F4` | `#222222` | `#000000` / `#FFFFFF` | `#EEEEEE` | Custom grey scheme (form fields `#F2F2F2`); not located on a visited page |
| `.m-color-scheme-09e5b5b4-…` | `#DFF8EF` | `#222222` | `#000000` / `#FFFFFF` | `#EEEEEE` | Custom mint scheme; not located on a visited page |

**Status and utility colours**

| Role | HEX | Source |
|---|---|---|
| Error / error background | `#DA3F3F` / `#FBEAEA` | `--color-error`, `--color-error-bg` |
| Success / success background | `#3A8735` / `#D1ECCF` | `--color-success`, `--color-success-bg` |
| Warning / warning background | `#D2861A` / `#FAECD7` | `--color-warning`, `--color-warning-bg` |
| Cart and wishlist count bubble | `#DA3F3F` on `#FFFFFF` | `--bg-cart-wishlist-count` (no cart icon is shown in the desktop header, see [section 7](#7-feature-and-function-inventory)) |
| Image placeholder | `#F3F3F3` | `--bg-card-placeholder` |
| Image overlay | `#000000` at 20 % | `--color-image-overlay`, `--opacity-image-overlay` |
| 404 page background | `#F5F1ED` | **Estimate**, pixel sampled from the screenshot |
| Slider/arrow accent | `#007AFF` | `--swiper-theme-color`, a library default, not visible in the UI |

> Visual summary: **#000000 / #FFFFFF / #222222** carry the whole interface. There is no brand accent colour. Red appears only in the (unused) sale and error tokens.

### 3.3 Typography

| Role | Family | Weight | Size | Notes |
|---|---|---|---|---|
| Headings | Poppins | 300 (light) | h1 60 / 42 / 36 px (desktop / tablet / mobile), h2 42 / 33 / 29, h3 36 / 28 / 25, h4 24 / 19 / 19, h5 15 / 14, h6 14 | `--font-h*-desktop/-tablet/-mobile`; letter-spacing 0 |
| Section headings (e.g. "Featured Collection") | Poppins | 300 | 36 px (class `h3`), line-height ≈ 46 px | Measured |
| Body | Poppins | 400 | 14 px / 21 px (`--font-base-size: 14`) | Bold weight 700 |
| Main nav links | Poppins | 500 | 12 px, UPPERCASE | Measured |
| Sub-menu links | Poppins | 400 | 14 px, colour `#222222` at 60 % | Measured |
| Featured-collection tabs | Poppins | 400 | 18 px / 27 px | Measured |
| Product card title | Poppins | 300 | 14 px / ≈ 18 px | Centred |
| Product card price | Poppins | 400 | 14 px | Centred |
| Buttons | Poppins | 500 | 14 px, letter-spacing 1 px, line-height 23 px | `--font-btn-*` |
| Footer headings | Poppins | 500 | 14 px, UPPERCASE | Measured |

Font files served from the store's CDN: Poppins 200, 300, 400, 700 and 400/700 italic (woff2), `font-display: swap`. Fallback: `sans-serif`. URLs are in [asset_inventory.md](asset_inventory.md#4-referenced-but-not-downloaded).

### 3.4 Shape, spacing, elevation and motion

| Token | Value | Evidence |
|---|---|---|
| Container width | 1200 px (`--container-width`); fluid container 1460 px with 100 px offset | Confirmed |
| Section spacing variables | 0 px at every breakpoint (spacing comes from each section's own padding) | Confirmed |
| Breakpoints used in theme CSS | 640, 768, 1024, 1280, 1536 px (min-width) and 767, 1023, 1279, 1535 px (max-width) | Confirmed (media-query tally) |
| Button radius | **0 px** (square); border 1 px | Confirmed (`--btn-border-radius`, `--btn-border-width`) |
| Button padding | 10 px × 30 px | Measured on the hero button |
| Input radius / border | 5 px / 1 px | Confirmed |
| Round controls | Scroll-to-top button 46×46 px, 50 % radius; wishlist heart in a circular button (Observed) | Measured / Observed |
| Shadows | None on buttons at rest; hover adds a `0 0 0 .2rem` ring in the hover colour on primary buttons (theme rule) | Confirmed in `main.css` |
| Header | Announcement bar 40 px + header 98 px. The header scrolls away on scroll-down (no sticky state observed) | Measured |
| Hero | 960 px tall at 1440×900 (aspect 1.50 desktop, 0.61 mobile) | Measured |
| Product card media | ≈ 288×383 px at 4 columns (3:4) | Measured; **Estimate** that crops are 3:4 |
| Motion | Hover/transition 0.25 s; entrance `fade-in-up` 600 ms; image transitions 0.65 s; hero **auto-advances** (index changed in 9 s); scrolling-text marquee styles exist in `custom-style.css` but no marquee was seen on visited pages | Confirmed |

### 3.5 Component patterns

| Component | Appearance |
|---|---|
| **Primary button** | `#000` fill, white 14 px/500 text, 1 px letter-spacing, square corners; hover `#222`. Example: "SHOP COLLECTION", "Go to Home", "Inquire on Viber". |
| **Outline button** | Transparent, 1 px border in the text colour (white on the hero), square. Hero CTAs "SHOP BAGS / SHOP SHOES / SHOP SLGs". |
| **Product card** | Image on `#F3F3F3` placeholder, small uppercase grey brand label, centred title, centred price. No cart/quick-view/wishlist buttons on the card (none found in the DOM). |
| **Tabs** | Text tabs, 18 px, active tab underlined. |
| **Filter group** | Heading with chevron, checkbox rows with counts, colour swatches as circles, range slider with two number inputs. |
| **Accordion** | Title row with chevron and a hairline; first FAQ item open by default; product-page accordions open on click. |
| **Dark promo panel** | Black block, white light-weight heading, short copy, white "Read more" button, paired with a photo. |
| **Icon strip** | Four small black line icons over uppercase captions on `#F9F9F9`. |
| **Footer** | Black, three columns separated by 1 px `#4B4B4B` rules, white 14 px links, circular light-grey social buttons. |

### 3.6 Imagery style

Editorial lifestyle shots (models holding bags, flat-lays of wallets and sandals) in hero and category tiles; product photos are **front-on, centred on a light mat printed with the A&J diamond logo pattern**, with inclusions (box, dust bag) laid in frame. File names follow `IMG-####.jpg` for product photos and `viber_image_YYYY-MM-DD_…jpg` for the editorial uploads (all dated 2024-10-03).

### 3.7 Layout and hierarchy by page type

| Page type | Layout |
|---|---|
| Home | Full-bleed hero → centred tabbed product row → mosaic of five tiles (1 tall + 4 square) → two alternating image/black-panel bands → testimonials → grey benefit strip → black footer. Strong vertical rhythm, one idea per band. |
| Collection | Centred breadcrumb and large light H1 → two-column body: 300 px filter sidebar left, product grid right (3 columns default; 1-5 selectable) → numbered pagination. |
| Product | Breadcrumb → two columns (gallery left, details right, each ≈ 560 px wide; Observed) → recently viewed. Fixed add-to-cart bar along the bottom of the viewport. |
| Content pages | Centred H1 and breadcrumb; alternating image/text blocks (Consign), centred accordion (FAQs), two-column info grid (Visit Us), centred text (Sell, About Us). |
| 404 | Centred sad-face icon, "Oops! Page not found!", **Go to Home** button on `#F5F1ED`. |

Responsive behaviour (Confirmed in 390 and 768 px captures): the menu collapses to a hamburger (left), logo centred, **search only** at right on mobile (account and wishlist icons are hidden); collection filters move behind a **Filter** button with sort and 1/2-column toggles; hero swaps to portrait images.

---

## 4. Sitemap summary

Full hierarchy, navigation table, flowchart and defects are in [sitemap.md](sitemap.md). It is **based on discovered public pages**, not on hidden routes.

```text
Home
├── SHOP ▾ Bags · Shoes · Small Leather Goods · Scents (empty) · All Products
├── SALE (empty)      ├── BRAND NEW
├── CONSIGN/SELL ▾ Consign · Sell
├── CUSTOMER SERVICE ▾ About Us · FAQs · Visit Us
├── Icons: Search · Account · Wishlist (404)
├── Collections (12) → Product pages (991)
├── Pages: Wish List · [Brands, Shop by Brand, Customer Reviews = 404]
├── Blog: News (1 article)     ├── Policy: Refund policy
└── Utility: /search · /collections/vendors?q= · 404 · /account · /cart
```

---

## 5. Page-by-page documentation

Screenshots: [`assets/screenshots/`](assets/screenshots/) (`<page>_desktop|tablet|mobile.png`).

### 5.1 Home, `/`

[desktop](assets/screenshots/home_desktop.png) · [tablet](assets/screenshots/home_tablet.png) · [mobile](assets/screenshots/home_mobile.png). Title "A & J Luxury – A&J Luxury".

| # | Section (theme type) | Content | Links / interaction | Status |
|--:|---|---|---|---|
| 1 | Announcement bar (`announcement`, dark scheme) | "BUY, SELL, & CONSIGN" | None | Confirmed |
| 2 | Header (`header`) | Logo; menu; search, account, wishlist icons | See [5.2](#52-header-and-footer-global) | Confirmed |
| 3 | Hero slideshow (`slider`) | 3 full-bleed photos with centred outlined buttons **SHOP BAGS**, **SHOP SHOES**, **SHOP SLGs** | Whole slide and button link to `/collections/bags`, `/shoes`, `/wallets`; auto-advance; 3 vertical dots at right (no arrows detected) | Confirmed (autoplay, links) |
| 4 | Featured Collection (`product-tabs`) | Heading "Featured Collection"; tabs **New Arrivals · Bags · Shoes · SLGs**; product cards (image, title, price) | Tab click swaps the product list (verified for all four); each tab has a **SHOP COLLECTION** button to `/collections/new-arrivals`, `/bags`, `/shoes`, `/wallets` | Confirmed |
| 5 | Category tiles (`image-cards`) | Five tiles with white uppercase labels: **BAGS** (large), **SLGs**, **SHOES**, **WATCHES**, **ACCESSORIES** | Only BAGS (`/collections/bags`) and SLGs (`/collections/wallets`) are links | Confirmed |
| 6 | Promo band (`custom-content`) | "Sell or Consign with Us!" / "Looking for a new home for your luxury items?" / "We can certainly help sell them for you!" | **Read more** → `/pages/consign` | Confirmed |
| 7 | Story band (`custom-content`) | "We invite you to explore and discover the art of bliss with A&J Luxury." plus 4 short paragraphs | **Read more** → `/pages/about-us` | Confirmed |
| 8 | Empty custom-content section | Zero height, no content | n/a | Confirmed |
| 9 | Testimonials (`testimonials`, layout 2) | "What People Are Saying"; five-star row; 5 short reviews with initials and city (3 visible at a time) | Slider arrows | Observed (arrows); data in [`testimonials.json`](datasets/testimonials.json) |
| 10 | Benefit strip (`icon-box`, grey) | Free Shipping within Metro Manila · 100% Authentic with Money Back Guarantee · Low Price Guaranteed · Offers Layaway with Minimal Interest | None | Confirmed |
| 11 | Footer | See 5.2 | | Confirmed |
| 12 | Hidden: mobile sticky bar, age verifier, cookie banner, cart drawer | Sticky bar renders 0 px and empty; age verifier is **disabled** (`data-enable="false"`); cookie banner hidden for this visitor; cart drawer closed | | Confirmed |

> The first homepage fetch showed a "Sold Out" label on the newest tiles, but the product feed fetched ~3 minutes later reported them available and all 991 products carried an `updated_at` between 02:03 and 02:04 GMT (a bulk update). Treat that label as a transient state. **Unresolved.**

### 5.2 Header and footer (global)

**Header** (all pages)

- **Desktop:** logo left; centred menu **HOME · SHOP ▾ · SALE · BRAND NEW · CONSIGN/SELL ▾ · CUSTOMER SERVICE ▾**; icons right: Search (opens an overlay), Account (`/account`), Wishlist (`/pages/wishlist`, **404**). Dropdowns open on hover (verified): [Shop](assets/screenshots/interactions/menu-hover-shop_desktop.png), [Consign/Sell](assets/screenshots/interactions/menu-hover-consign_desktop.png), [Customer Service](assets/screenshots/interactions/menu-hover-customer-service_desktop.png). The parent labels are `href="#"`.
- **Mobile:** hamburger opens a slide-in drawer with the same tree ([open](assets/screenshots/interactions/mobile-menu-open_mobile.png), [Shop sub-menu](assets/screenshots/interactions/mobile-menu-shop-submenu_mobile.png)); search icon at right.
- **Country selector:** the header HTML lists **235 distinct countries** (the list appears twice, once per desktop/mobile selector), **every one priced in PHP ₱** (no currency conversion). **Unverified:** where/whether it is displayed.
- **No cart icon** is rendered in the desktop header. A cart drawer exists in the DOM (Unverified how a visitor opens it).

**Footer**

| Column | Content |
|---|---|
| QUICK LINKS | Home · Shop (`/collections/all-products`) · Brands (dead) · About Us · FAQs · Customer Reviews (404) |
| CATEGORIES | Bags · Clothing (empty) · Shoes · SLGs · All Products |
| FOLLOW US | `+639277537322` · `info@aandjluxury.com` · Facebook · Instagram · WhatsApp (circular icon buttons) |
| Bottom bar | "© A&J LUXURY 2024" (stale year) and a "Payment options:" label with **no icons rendered** |

### 5.3 Collection template, `/collections/{handle}`

Example: Bags ([desktop](assets/screenshots/collection-bags_desktop.png) · [tablet](assets/screenshots/collection-bags_tablet.png) · [mobile](assets/screenshots/collection-bags_mobile.png), filter close-up [here](assets/screenshots/interactions/collection-bags-filters_desktop.png)).

| Area | Detail |
|---|---|
| Header block | Breadcrumb **Home › {Collection}**, centred H1 |
| Sidebar (desktop) | **Collections** (Bags, Clothing, Shoes, SLGs, All Products) · **Condition** (Brand New, Preloved: links to those collections) · **Brands** (checkbox list with counts, scrollable) · **Product type** · **Color** (swatch circles with names and counts, 100 values) · **Ranking** (condition score) · **Price** (range slider, ₱0 to ₱1,280,000 plus From/To inputs) · **Availability** (In stock / Out of stock) |
| Toolbar | Sort dropdown (default shown on Bags: "Best selling"); grid buttons: List, 2, 3 (default), 4, 5 columns |
| Grid | **20 products per page** (verified: grid container holds 20 cards; Bags has 36 pages), card = image, brand label, title, price |
| Pagination | Numbered links with `?page=N` and a "»" next link |
| Empty state | "Sorry, there are no products in this collection", sidebar and sort still shown, plus a "New Arrivals" strip ([scents screenshot](assets/screenshots/collection-empty-scents_desktop.png)) |
| Mobile | "Filter" button, sort dropdown, 1-column and 2-column toggles ([capture](assets/screenshots/interactions/collection-bags-top_mobile.png)) |

Sort options (Confirmed in markup): Featured, Most relevant, Best selling, Alphabetically A-Z, Alphabetically Z-A, Price low to high, Price high to low, Date old to new, Date new to old.

Collections inventory:

| Handle | H1 | Products | Pages (20/page) | Linked from |
|---|---|--:|--:|---|
| `bags` | Bags | 702 | 36 | Shop menu, hero, tile, tab, footer |
| `wallets` | Wallets and Small Leather Goods | 116 | 6 | Shop menu ("Small Leather Goods"), hero, tile, tab, footer ("SLGs") |
| `shoes` | Shoes | 114 | 6 | Shop menu, hero, tab, footer |
| `all-products` | All Products | 985 | 50 | Shop menu, footer |
| `new-arrivals` | New Arrivals | 985 | 50 | Home tab button (membership equals All Products) |
| `pre-loved` | Pre loved | 956 | 48 | Sidebar "Condition > Preloved" |
| `brand-new` | Brand New | 35 | 2 | Header, sidebar |
| `pre-order` | Pre-order | 6 | 1 | **None found** |
| `watches` | Watches | 1 | 1 | **None found** (home tile not linked) |
| `scents` | Scents | 0 | | Shop menu |
| `clothing` | Clothing | 0 | | Footer, sidebar |
| `sale` | Sale | 0 | | Header |

Data: [`datasets/collections.csv`](datasets/collections.csv).

### 5.4 Product template, `/products/{handle}`

Example: [desktop](assets/screenshots/product_desktop.png) · [tablet](assets/screenshots/product_tablet.png) · [mobile](assets/screenshots/product_mobile.png).

| Zone | Content |
|---|---|
| Breadcrumb | Home › All Products › {title} |
| Gallery | Large image, thumbnail strip with Previous/Next, a **Zoom in** button per image that opens a modal ([capture](assets/screenshots/interactions/product-zoom-lightbox_desktop.png)). 5 to 55 photos per product (median 30). |
| Heading | Brand (small caps), H1 title, circular **Add to wishlist** heart |
| Price | "₱7,500.00" style; regular/sale/unit-price text is visually hidden |
| Facts block | **Brand:** (link to `/collections/vendors?q={brand}`) · **Rank:** (condition, e.g. "Brand New" or "9.3/10") · **Inclusions:** · link "See full product details ↓" (`#deets`) |
| Enquiry | Black buttons **Inquire on Viber** (`viber://chat?number=+639277537322`) and **Inquire on WhatsApp** (`https://wa.me/+639152345968`) |
| Accordions | **Product Details** (open by default; full description with payment lines, showroom, disclaimer) · **Layaway Policy** · **Payment Options** ([open state](assets/screenshots/interactions/product-accordion-open_desktop.png)) |
| Purchase bar | Fixed along the bottom of the viewport: thumbnail, title, price, quantity stepper (− 1 +), **Add to cart**. Forms post to `/cart/add`. |
| Below | "Recently Viewed Products" (loaded via `/search?section_id=…recent-viewed-products`) |
| Structured data | JSON-LD `Product` with `Offer` (price, `priceCurrency: PHP`, availability) and `Brand` |

Layaway text on the live page: 30 % fixed down payment, balance in equal monthly payments, down payment forfeited if the time frame is exceeded, and a leftover placeholder reading "contact us here ( insert link )".

Typical description pattern (`ONHAND AND READY TO SHIP!` and an `Inclusions` line appear in all 991 products; a condition score appears in the 956 pre-loved ones): `ONHAND AND READY TO SHIP!` → item line → (pre-loved: `Condition: 9.5/10`, `Flaw/s:` ) → `Inclusions:` → three payment bullets (cash, card via BDO Checkout with a fee, up to 12-month BDO instalments at 1 %/month) → showroom location → authenticity and return statement → contact block → brand disclaimer.

### 5.5 Search, `/search?q={query}`

[desktop](assets/screenshots/search_desktop.png). For "chanel": **"Found 464 results for "chanel""**, a search box, a **Filters** sidebar (Brands and others), "Relevance" sort, 4-column grid. (464 > 153 Chanel-vendor products because search also matches description text.)

**Predictive overlay** (Confirmed): clicking the header icon opens a full-width search bar with popular terms (**Hermes, Louis Vuitton, Goyard, Chanel, Double Flap, Belt, Wallet, WOC**); typing queries `GET /search/suggest?q=…&section_id=predictive-search` and shows **Suggestions** (e.g. "chanel wallet on chain", "chanel 25") and up to five **Products** with thumbnail and price, plus a "Results for" link ([open](assets/screenshots/interactions/search-open_desktop.png), [results](assets/screenshots/interactions/search-results_desktop.png)).

### 5.6 Consign, `/pages/consign`

[desktop](assets/screenshots/consign_desktop.png). H1 "Consign"; lead "Looking for a new home for your luxury items? We can certainly help sell them for you!"; image beside **"Why Consign with Us?"** (four benefits: quick and easy, hassle-free, competitive, sustainable); image beside **"To Consign,"** (five numbered steps); a **VIBER US - 09277537322** button whose `href` is `#`; large headings **PAYOUT** and **PULL OUT** with rules; dark "Want to Sell?" band with **HOW TO SELL** → `/pages/sell`.

Terms stated: only items that are 100 % authentic and in at least excellent condition; the shop adds a minimal mark-up and may decline items with no room for it; consignors may drop off at the showroom or ship via Grab, Lalamove or LBC; payout scheduled after the buyer receives the item (cash, deposit or in-store credit); **consignment period 1 to 5 months; ₱2,000 pull-out fee per item if pulled before one month; pull-outs need ≥ 1 business day notice**.

> Step 3 says "Fill out our consignment form", but **no form, link or embed exists** on the page (Confirmed in HTML and in the screenshot). The Viber button's link is `#`, so it does not open Viber.

### 5.7 Sell, `/pages/sell`

[desktop](assets/screenshots/sell_desktop.png). H1 "Sell"; copy "Are you struggling with where to sell your luxury items? … In need of quick cash?"; **How to Sell?** (fill out the form or message Viber/WhatsApp; final appraisal and authentication on receipt; allow 24 hours to schedule payment; cash, deposit or in-store credit); **VIBER US - 09277537322**; dark "Want to Consign?" band with **HOW TO CONSIGN** → `/pages/consign`. The same missing-form problem applies.

### 5.8 About Us, `/pages/about-us`

[desktop](assets/screenshots/about-us_desktop.png). H1, one image, and four paragraphs: the sisters' story, 2018 start, 2020 direct-from-Italy sourcing, consignment growth ("one of the leading consignment shops in the country"), transparency about item condition. Closing line repeats the home-page invitation.

### 5.9 FAQs, `/pages/faqs`

[desktop](assets/screenshots/faqs_desktop.png). Accordion with nine questions (first open): How do I place an order? · What is your return policy? · How long does delivery take? · Do you deliver internationally? · Payment Options · Can I visit your showroom? · Can I return pre-ordered items? · Can I refund my order? · Can I cancel my order? Full text: [`datasets/faqs.json`](datasets/faqs.json).

### 5.10 Visit Us, `/pages/visit-us`

[desktop](assets/screenshots/visit-us_desktop.png). H1 and "A&J Showroom"; two-column grid: **Address** ("South Caloocan", **Get Direction** → Google Maps short link), **We're Open** ("Our store has re-opened for shopping, exchanges / Every day 12nn to 8pm"), **Message** ("Viber: 09277537322"), **Social Media** (Facebook and Instagram icons; no WhatsApp icon here).

### 5.11 Wish List, `/pages/wish-list`

[empty](assets/screenshots/wish-list_desktop.png) · [with an item](assets/screenshots/interactions/wishlist-with-item_desktop.png). Empty state: "No products were added to the wishlist page." with **Back to shopping** → `/collections/all`. **Verified:** the heart on a product page writes the product handle into the browser's `localStorage` key `m-wishlist-products`, and this page then lists that product. It is **per-browser only** (no account sync). The header icon points at the wrong URL.

### 5.12 Blog, `/blogs/news` and `/blogs/news/main-account-disabled`

[index](assets/screenshots/blog-news_desktop.png). One article: **"MAIN ACCOUNT DISABLED"** by Joyce Anne Gonzales, **Jun 14, 2022** (notice that the main Instagram account was disabled; follow two backup handles). The article has Facebook, Pinterest and Twitter share buttons and empty "Related Articles" and "Instagram" sections. No header/footer link to the blog.

### 5.13 Refund policy, `/policies/refund-policy`

Text equals the FAQ return policy: all sales are final; returns only for undeclared flaws or missing inclusions; **exchange only**; notify within 24 hours; security tag intact; ship within 48 hours; client pays both shipping legs.

### 5.14 404 page

[desktop](assets/screenshots/not-found_desktop.png). Real HTTP 404; header and footer retained.

### 5.15 Account and cart (not exercised)

`/account/login`, `/account/register` and `/cart` return 200 and are linked from the header or drawer. `robots.txt` disallows `/cart/`, `/checkout`, `/orders` and `/account` (except login), so **login, registration, add-to-cart and checkout were deliberately not tested**. The cart drawer markup (Shopping Cart, "Your cart is currently empty", order note, shipping-rate estimator with country/province/postal fields, discount code, subtotal, **Check out**, **View Cart**) is documented from HTML only.

---

## 6. Module inventory

Theme sections and scripts confirmed from the page HTML (`data-section-type`, script and stylesheet names).

| Module | Where | Purpose / behaviour | Evidence |
|---|---|---|---|
| Announcement bar | Header group | One-line message bar (dark scheme) | Confirmed |
| Header + mega menu | All pages | Three dropdowns (hover), mobile drawer, icons | Confirmed |
| Predictive search | Header overlay | Popular terms, suggestions, product hits via `/search/suggest` | Verified live |
| Slideshow | Home | 3 slides, `<picture>` mobile sources, autoplay | Verified live |
| Product tabs | Home | Tabbed product lists with per-tab CTA | Verified live |
| Image cards | Home | Category mosaic (2 of 5 linked) | Verified (DOM) |
| Custom content / image-with-text | Home, Consign, About, Sell | Image beside rich text, optional dark band and button | Confirmed |
| Testimonials | Home | Review slider | Observed |
| Icon box | Home | 4-icon benefit strip (SVGs hotlinked from svgrepo.com) | Confirmed |
| Footer | All pages | Three columns, social icons, copyright | Confirmed |
| Facets (filters) | Collections, search | Vendor, product type, metafield colour and ranking, price, availability; AJAX update | Verified live (vendor) |
| Sort + layout toggle | Collections | 9 sorts; 1-5 column density | Layout toggle verified; sort **not triggered** (robots) |
| Pagination | Collections | `?page=N`, 20 per page | Verified |
| Product media gallery | Product | Thumbnails, prev/next, zoom modal | Zoom verified |
| Product accordions | Product | Details / Layaway / Payment | Verified |
| Sticky add-to-cart bar | Product | Title, price, quantity, Add to cart | Visible; ATC **not exercised** |
| Wishlist | Product, wish-list page | `localStorage` list of handles | Verified |
| Recently viewed | Product | Section fetched via search endpoint | Observed |
| Product inventory / variant picker / product model scripts | Product | Theme scripts present; single variant so no picker UI | Confirmed (scripts); N/A |
| Compare product, quick view, product-card swatch scripts | Theme | Scripts load, but **no compare or quick-view control was found** on cards | Confirmed (scripts) / not exposed |
| Cart drawer + cart add-on | Global | Drawer with note, shipping estimate, coupon | Markup only (**Unverified**) |
| Localization form | Header | 235 countries, all PHP | Markup only |
| Age verifier | Footer group | "Are you 18 years old or older?" modal | **Disabled** |
| Cookie banner | Footer group | Accept/Decline bar | Hidden for this visitor |
| Mobile sticky bar | Footer group | Empty | Confirmed |
| Instagram section | Blog | Heading only, nothing renders | Observed |
| Scrolling-text / marquee, tab-label styles | `custom-style.css` | Theme custom CSS; unused on visited pages | Confirmed (CSS) |

---

## 7. Feature and function inventory

Status key: ✅ **Verified** in a live browser test or feed · 👁 **Displayed** (seen, behaviour not tested) · ⛔ **Not exercised** on purpose (robots.txt or payment/account areas) · ❓ **Unverified** (could not confirm).

| # | Feature | Location | Inputs → outputs | Status |
|--:|---|---|---|---|
| 1 | Primary navigation dropdowns | Header | Hover a parent → sub-links appear (Shop 5 links, Consign/Sell 2, Customer Service 3) | ✅ |
| 2 | Mobile drawer menu | Header (≤ 767 px) | Tap hamburger → drawer; tap parent → sub-menu | ✅ |
| 3 | Predictive search | Header | Type text → `GET /search/suggest` → suggestions + products | ✅ |
| 4 | Full search results | `/search` | Query → "Found N results", filters, sort | ✅ (page loaded; sort not triggered) |
| 5 | Hero autoplay | Home | Slides advance without input | ✅ |
| 6 | Featured tabs | Home | Click tab → different product list; button → collection | ✅ |
| 7 | Category tiles | Home | BAGS and SLGs click through; other three do not | ✅ (DOM) |
| 8 | Testimonials slider | Home | Arrow click → next reviews | 👁 |
| 9 | Brand filter | Collections | Tick brand → `fetch` of `?section_id=…__main&filter.p.vendor=…`; URL and grid update with no page reload (Hermes on Bags: 20 cards, 4 pages = the 79 shown in the facet) | ✅ |
| 10 | Colour, ranking, price, availability, product-type filters | Collections | Same mechanism | 👁 (markup) |
| 11 | Sort dropdown | Collections | Choose option → `sort_by=` | ⛔ (robots disallows crawling `sort_by` URLs) |
| 12 | Grid density | Collections | List / 2 / 3 / 4 / 5 columns → card width 910 / 443 / 287 / 210 / 163 px | ✅ |
| 13 | Pagination | Collections | `?page=N`, 20 per page | ✅ |
| 14 | Image gallery and zoom | Product | Thumbnail/arrow/zoom button → modal | ✅ (zoom modal opens) |
| 15 | Product accordions | Product | Click title → expands (`aria-expanded=true`) | ✅ |
| 16 | Inquire on Viber / WhatsApp | Product | Anchor to `viber://chat?number=+639277537322` / `wa.me` | 👁 (links read, not followed) |
| 17 | Quantity stepper | Product sticky bar | − / + changes the number | ❓ (clicks timed out; not confirmed) |
| 18 | Add to cart | Product sticky bar | Form POST to `/cart/add` | ⛔ |
| 19 | Cart drawer, order note, shipping estimate, coupon | Global | See 5.15 | ⛔ / 👁 |
| 20 | Checkout and payment | `/checkout` | Not tested; FAQ describes bank, GCash, BDO Checkout (+4 %), COD in Metro Manila, pick-up with down payment | ⛔ |
| 21 | Wishlist add and list | Product, `/pages/wish-list` | Heart → `localStorage["m-wishlist-products"]` → listed on wish-list page | ✅ |
| 22 | Header wishlist link | Header | Goes to `/pages/wishlist` | ✅ it is a **404** |
| 23 | Recently viewed | Product | Loaded via section endpoint | 👁 |
| 24 | Account login / register | `/account/*` | Not tested | ⛔ |
| 25 | Country / currency selector | Header | 235 countries, all PHP | ❓ (placement not confirmed) |
| 26 | Consign / Sell form | Consign, Sell | Pages instruct visitors to fill a form | ✅ **absent** |
| 27 | Share buttons | Article | Facebook, Pinterest, Twitter intents | 👁 |
| 28 | Cookie consent | Global | Banner hidden for this visitor | 👁 |
| 29 | Age gate | Global | Present but disabled | ✅ |
| 30 | Public JSON/agent endpoints | Site | `/collections/{h}/products.json`, `/products/{h}.json`, `/.well-known/ucp`, `/api/ucp/mcp` | ✅ for feeds; MCP **not called** |

---

## 8. User workflows

Steps marked ⛔ were described from the site's own copy, not executed.

**A. Browse and discover (verified)**
1. Land on Home; use the hero, tab row or category tiles, or open SHOP and pick a category.
2. On a collection, narrow with the sidebar (brand, colour, condition rank, price, availability), change grid density, page through (20 per page).
3. Open a product card to the product page.

**B. Search (verified)**
1. Click the search icon; pick a popular term or type a query.
2. Choose a suggestion or product directly, or open full results (`/search?q=…`) with its own filters.

**C. Evaluate a product (verified)**
1. Scroll the gallery; open zoom; read Brand / Rank / Inclusions.
2. Expand **Product Details** (condition, flaws, prices), **Layaway Policy**, **Payment Options**.
3. Optionally tap the heart to save it to the on-device wish list.

**D. Enquire or buy**
1. Tap **Inquire on Viber** or **Inquire on WhatsApp** (links confirmed; chat not opened). FAQ guidance: even when ordering on the website, message the shop on Instagram, Facebook, Viber or WhatsApp. ⛔
2. Alternatively **Add to cart** from the purchase bar and check out. ⛔
3. Pay by BDO, BPI, GCash, UnionBank, credit card via BDO Checkout (fee), COD within Metro Manila (extra fee, not for sale items) or cash on pick-up with a down payment. ⛔
4. Delivery: same day in Metro Manila by Grab/Lalamove (cut-off 6:00 PM); 1-2 business days elsewhere; shipping paid by the client. ⛔

**E. Consign or sell (copy only)**
1. Read Consign or Sell. 2. Send photos with inclusions, flaws and store of purchase via Viber/WhatsApp (the promised form is missing). 3. Drop off at the showroom or ship via Grab, Lalamove or LBC. 4. Authentication, then payout (cash, deposit or in-store credit; consignments pay out after the buyer receives the item).

**F. Visit the showroom (copy only)**
1. Open Visit Us for the area ("South Caloocan"), hours and the Maps link. 2. Message on Viber first so the item you want is on hand.

**G. Returns and refunds (copy only)**
All sales final; exchange-only for undeclared flaws or missing inclusions within the 24-hour / 48-hour windows; pre-orders are non-returnable; refunds "typically not available"; cancellation is not possible.

---

## 9. Content catalog

Verbatim text lives in the datasets so this document stays readable: [`faqs.json`](datasets/faqs.json) (9 Q&A), [`testimonials.json`](datasets/testimonials.json) (5 reviews), [`products.csv`](datasets/products.csv) (`description_text` for all 991 products).

| Content type | Count | Fields | Source |
|---|--:|---|---|
| Navigation labels | 6 top-level, 10 sub-links | label, URL | Header |
| Hero slides | 3 | image (desktop and mobile), CTA text, link | Home |
| Category tiles | 5 | image, label, optional link | Home |
| Testimonials | 5 | heading, quote, initials, city/province | Home |
| Benefit strip | 4 | icon URL, caption | Home |
| FAQs | 9 | question, answer (rich text) | `/pages/faqs` |
| Policy text | 1 (refund) + FAQ copy | rich text | `/policies/refund-policy` |
| Layaway and payment copy | 2 accordions | rich text | Product pages |
| Blog | 1 article | title, author, date, body, share links | `/blogs/news` |
| Product | 991 | see [section 10](#10-datasets) | JSON feed |
| Contact details | phone, 2 messaging numbers, email, 2 social profiles | | Footer, Visit Us |

Testimonial attribution style: initials plus place (Davao City, Bataan, Pasig City, Sta. Mesa). Quotes mix English and Filipino and keep emoji.

---

## 10. Datasets

All files in [`datasets/`](datasets/) are public data from the store's own pages and sanctioned JSON feeds. No customer, order or account data was collected.

| File | Rows | Contents |
|---|--:|---|
| [`products.csv`](datasets/products.csv) | 991 | `product_id, handle, title, title_tag_(derived), vendor, product_type, price_php, compare_at_price, available, sku, variant_count, image_count, featured_image_url, product_url, collections_(derived), published_at, created_at, updated_at, description_text` |
| [`product_images.csv`](datasets/product_images.csv) | 26,972 | `product_id, handle, position, image_id, width, height, src` |
| [`vendors.csv`](datasets/vendors.csv) | 51 | `vendor, product_count, available_count, min_price_php, max_price_php` |
| [`collections.csv`](datasets/collections.csv) | 12 | handle, H1, URL, product count, pages, menu and footer placement |
| [`facets_all-products.json`](datasets/facets_all-products.json) | 5 groups | Filter values and counts as displayed on All Products |
| [`sitemap_urls.csv`](datasets/sitemap_urls.csv) | 996 | Every URL in the sitemaps, with type |
| [`pages.csv`](datasets/pages.csv) | 23 | Page/link, label, HTTP status observed, how discovered |
| [`design_tokens.json`](datasets/design_tokens.json) | | 8 colour schemes + root custom properties |
| [`faqs.json`](datasets/faqs.json) · [`testimonials.json`](datasets/testimonials.json) | 9 · 5 | Verbatim public copy |

Field notes (Confirmed from the feed):

- `title_tag_(derived)`: the bracketed prefix of the title, **PRE LOVED** (956) or **BRAND NEW** (35). `collections_(derived)` comes from each collection's own feed.
- `product_type` is blank for **968** of 991 products (Bags 10, Shoes 5, Sunglasses 5, Wallet 1, Wallets 1, Accessories 1). Category is therefore expressed through collections and titles, not product type.
- Every product has **one variant** ("Default Title"), **no SKU**, **no compare-at price** and **no tags**. Prices are strings with two decimals in PHP.
- Images are mostly **1280×1280** (26,942 of 26,972 files); each product has **5 to 55** images (median 30, mean 27.2).
- Descriptions are HTML (≤ 1,758 chars); `description_text` is the stripped text.
- `created_at` ranges 2023-06-07 to 2026-10-08. **Every** product's `updated_at` falls between 10:03 and 10:04 (+08:00) on 2026-10-09 (750 at 10:03, 241 at 10:04): a bulk update, so `updated_at` carries no editorial meaning in this snapshot.

**Brands (top 15 by count)**

| Brand | Products | Brand | Products |
|---|--:|---|--:|
| Chanel | 153 | Celine | 37 |
| Louis Vuitton | 125 | Goyard | 28 |
| Hermes | 124 | Loewe | 22 |
| Gucci | 85 | Balenciaga | 22 |
| Prada | 71 | Givenchy | 22 |
| Yves Saint Laurent | 55 | Valentino | 18 |
| Christian Dior | 54 | Polene | 16 |
| Bottega Veneta | 38 | | |

**Filter vocabularies** (from All Products): 50 brands; 100 colours (e.g. Black 194+, Beige, Blue, Brown, plus French/brand colour names such as Etoupe, Bleu Nuit, Ebene/Bamboo); **condition "Ranking"** values: Brand New, 7.5/10, 8/10, 8.3/10, 8.5/10, 8.8/10, 9/10, 9.0/10, 9.3/10, 9.5/10, 9.8/10; availability In stock / Out of stock. Colour and ranking are **product metafields** (`custom.color`, `custom.ranking`) that are **not exposed in the JSON feed**, only through the filters and the product page.

---

## 11. Image and asset inventory

Full tables with sizes, hashes, source pages and original URLs: **[asset_inventory.md](asset_inventory.md)**.

| Group | Count | Folder |
|---|--:|---|
| Branding (logo, share image) | 2 | [`assets/branding/`](assets/branding/) |
| Homepage (slides, tiles, panels) | 12 | [`assets/homepage/`](assets/homepage/) |
| Content pages (About, Consign, Sell) | 4 | [`assets/pages/`](assets/pages/) |
| Product photography sample | 17 | [`assets/products/`](assets/products/) |
| Screenshots (my captures) | 53 | [`assets/screenshots/`](assets/screenshots/) |
| Referenced, not downloaded | 26,955 product photos, 4 third-party SVGs, 6 font files | see inventory |

Reuse limits: no licence is published; copy and imagery belong to A&J Luxury and, for goods shown, the brand owners. Use for reference only.

---

## 12. Technical observations

| Topic | Finding | Evidence |
|---|---|---|
| Stack | Shopify Online Store 2.0 + Minimog 5.4.0 (custom theme build "Nonah Designs 3.0"); JS modules named `header`, `mega-menu`, `predictive-search`, `slideshow` (Swiper), `product-tabs`, `testimonials`, `wishlist`, `cart-drawer`, etc.; JS globals `MinimogTheme`, `MinimogSettings`, `MinimogEvents` | Confirmed |
| Hosts contacted on the homepage | `aandjluxury.com`, `cdn.shopify.com`, `fonts.shopifycdn.com`, `monorail-edge.shopifysvc.com`, `otlp-http-production.shopifysvc.com`, `www.svgrepo.com` | Confirmed (network log) |
| Analytics and third parties | Only Shopify's own analytics beacons (`/api/collect`, monorail) were seen on first load. **No** Google Analytics, Meta Pixel, chat widget or email-popup script was observed (consent not granted; a banner may gate others). `sameAs` social links in JSON-LD | Confirmed for first load |
| Security headers | `strict-transport-security`, `x-frame-options: DENY`, `x-content-type-options: nosniff`, CSP `frame-ancestors 'none'; upgrade-insecure-requests` | Confirmed |
| Cookies on first load | `localization`, `_shopify_essential`, `_shopify_analytics`, `_shopify_marketing` | Confirmed |
| Structured data | `Organization` JSON-LD on pages; `Product` + `Offer` on product pages | Confirmed |
| SEO meta | `<title>` "A & J Luxury – A&J Luxury" repeats the brand; `theme-color` is empty; OG/Twitter tags present with `og:image` over `http://`; `sitemap.xml` lags the live catalogue by 20 products (exactly the 20 newest, created 2026-10-08 21:40-22:02 +08:00) | Confirmed |
| Accessibility | Viewport tag sets `maximum-scale=1.0, user-scalable=0` (blocks pinch zoom); hero slides use alt text like "slider image 1621243260e1af0c20-0"; category-tile images have empty alt; the consign/sell Viber button has `href="#"`; nav parent links are `href="#"`. Positive: product card second image carries the title as alt; buttons have `aria-label`s (Zoom in, Add to wishlist, Increase/Decrease quantity) | Confirmed |
| Page weight | Homepage HTML ≈ 417 KB (country list inflates it); server render ≈ 72 ms (`server-timing`) | Confirmed |
| AJAX endpoints used by the UI | `/search/suggest`, `/products/{handle}.js`, `/search?section_id=…recent-viewed-products`, collection section re-render (`/collections/{h}?section_id=…__main&filter…`), `/cart/add` and `/cart` forms (forms seen, not submitted) | Confirmed |
| Client state | Wish list in `localStorage` key `m-wishlist-products` | Confirmed |
| Agent / commerce protocol | `/.well-known/ucp` (version 2026-08-25) lists MCP and embedded transports; capabilities include checkout, fulfilment and discount; `/agents.md` documents flows and says checkout needs human approval | Confirmed (read only) |
| Redirects | None observed on tested URLs | Confirmed |
| `robots.txt` | Shopify default plus agent notes: disallows `/cart/`, `/checkout`, `/account`, `/orders`, `*sort_by*`, multi-filter URLs, `cart.js`, `/recommendations/products`; allows `/account/login`; sitemap at `/sitemap.xml` | Confirmed |

---

## 13. Content and navigation issues found

| # | Issue | Evidence | Why it matters |
|--:|---|---|---|
| 1 | Header wishlist icon → `/pages/wishlist` (**404**); real page `/pages/wish-list` has no inbound link | HTTP statuses | Broken core feature entry |
| 2 | Footer "Customer Reviews" → 404; "Brands" → internal myshopify host (unreachable from the test network) and the same path on the primary domain is 404; `/pages/brands` and `/pages/shop-by-brand` are 404 | HTTP statuses | No brand directory, dead trust link |
| 3 | Consign and Sell pages tell visitors to "fill out the form", but **no form exists**; the Viber button's `href` is `#` | HTML + screenshot | Primary conversion path for sellers is missing |
| 4 | Three empty collections in primary navigation (Scents, Sale, Clothing) | Empty-state text | Dead ends |
| 5 | Three homepage category tiles (Shoes, Watches, Accessories) are not clickable | DOM | Wasted prominent space |
| 6 | **Card-fee contradiction:** BDO Checkout surcharge is "+5 % fee" in **741** product descriptions, "+4 % fee" in **245**, "+4 % tax" in **5**, and "+4 %" in the FAQ | Description text counts | Pricing trust and legal clarity |
| 7 | **Showroom contradiction:** "Quezon City" in **830** product descriptions vs "South Caloocan" in **160** and on Visit Us | Description text counts | Customers may go to the wrong place |
| 8 | **Return-policy contradiction:** **986** product descriptions say "No returns/exchange unless item is proven fake by a 3rd party authenticator", while FAQ and policy allow exchange for undeclared flaws or missing inclusions | Description text counts | Conflicting customer promises |
| 9 | Layaway accordion still contains the template placeholder "( insert link )" | Product page text | Unfinished copy |
| 10 | Footer copyright "© A&J LUXURY 2024" while data runs to October 2026; sitemap lists 971 of 991 products | Footer, sitemap | Stale signals |
| 11 | Empty "Payment options:" label (no icons) and empty "Instagram" sections on blog pages | Screenshots | Visible gaps |
| 12 | Collection H1 "Wallets and Small Leather Goods" vs menu "Small Leather Goods" vs footer/tab "SLGs"; "Pre loved" vs "Preloved" vs "[PRE LOVED]" | Labels | Inconsistent vocabulary |
| 13 | Two catalogue aliases: `/collections/all` (991) and `/collections/all-products` (985) | Feeds | Inconsistent entry points |

---

## 14. Implementation guidance for a similar site or app

Derived from the evidence above; these are suggestions, not facts about the existing site.

**Data model (maps 1:1 to the feed)**

```text
Product  { id, handle, title, vendor(brand), condition ∈ {PRE LOVED, BRAND NEW},
           rank (e.g. 9.3/10 or "Brand New"), colour, inclusions, flaws,
           price_php, available, description, images[1..12] (1280×1280), created_at }
Collection { handle, title, product_count }          // bags, wallets (SLGs), shoes, new-arrivals, pre-loved, brand-new, pre-order, watches
Brand    = Product.vendor (50 values)
```

Promote `rank`, `colour` and `inclusions` to real fields (today they are metafields or free text) and `condition` to an enum (today it is a title prefix).

**Screens / templates**: Home (hero, tabs, tiles, promos, testimonials, benefits) · Collection (filters, sort, density, pagination 20 per page) · Product (gallery + zoom, facts, enquiry buttons, accordions, purchase bar, recently viewed) · Search (predictive + results) · Wish list (local) · Consign / Sell (**build the missing form**) · FAQs (accordion) · About · Visit Us · Blog · 404.

**Design tokens**: reuse [`design_tokens.json`](datasets/design_tokens.json); Poppins 300/400/500; 14 px base; square 0 px radius; 1 px hairlines `#EEEEEE`; black/white with `#222222` text; breakpoints 640 / 768 / 1024 / 1280 / 1536.

**Behaviour worth keeping**: brand-first filtering with counts, condition score filter, enquiry-by-Viber/WhatsApp CTA, layaway and payment accordions, predictive search seeded with popular brand terms.

**Fix on rebuild**: the defects in [section 13](#13-content-and-navigation-issues-found); one source of truth for fees, return policy and showroom location; structured fields instead of description parsing; accessible zoom (remove `user-scalable=0`).

---

## 15. Limitations and unresolved questions

**Not covered or not verified**

- **Checkout, payment, account login/registration, add-to-cart, discount codes and shipping estimates** were not exercised (robots.txt disallows the paths and payment must be human-approved). Their behaviour is unknown beyond the markup and the FAQ.
- **Sort dropdown** was not triggered (robots.txt disallows `sort_by` URLs); the 9 options come from markup.
- **Quantity stepper** on the product bar: clicks timed out in three attempts; unconfirmed.
- **Country selector** placement and effect, **cart-drawer open trigger**, and **cookie banner** copy for visitors outside the Philippines are unconfirmed.
- Other filters (colour, ranking, price, availability), the testimonials arrows and the Viber / WhatsApp deep links were **displayed only**; links were read but not followed.
- **Per-product metafields** (colour, ranking, inclusions) were not extracted for all 991 products (that would need 991 page requests); only collection-level counts were captured.
- **Footer "Brands" target** (`a-and-j-luxury.myshopify.com`) could not be reached from the test network (connection reset in curl and Chromium, as with `cdn.shopify.com`); its real behaviour is unknown.
- **Tablet and mobile** were captured for 13 pages and the mobile menu was tested; every interaction test ran at 1440 px except the mobile menu.
- **Hidden, unlinked or admin routes** were not searched for and are not claimed. Only pages from the sitemaps, the navigation and the store's own documentation were visited.

**Unresolved questions**

1. Why did the first homepage fetch label new items "Sold Out" while the feed minutes later reported them available? (A bulk update at 02:03 GMT is the likely cause; unconfirmed.)
2. Is the theme-level age gate intentionally disabled, and is the cookie banner shown in other regions?
3. Where are the 2 unused custom colour schemes (`#F4F4F4`, `#DFF8EF`) applied, if anywhere?
4. Is "Quezon City" or "South Caloocan" the current showroom?
5. Why are 20 products in the live feed (the newest) missing from `sitemap.xml`: sitemap caching lag, or deliberately hidden from search engines?

---

## 16. Appendix: method, compliance and file index

### 16.1 Compliance

- **robots.txt** read before any other request. All visited paths are `Allow`ed or not matched by a `Disallow`. `/cart/`, `/checkout*`, `/orders*`, `/account*` (except login), `*sort_by*`, multi-filter URLs, `cart.js` and `/recommendations/products` were avoided. `/cart` (no trailing slash) and `/account/login` were requested **once each for an HTTP status only**.
- The store's `robots.txt` and `agents.md` state that agents must not complete checkout automatically. **No checkout, payment, order, login, registration or form submission** took place. The wish-list test touched only my own headless browser's `localStorage`.
- **Rate:** direct HTTP requests were spaced at least 0.6 s apart (1 s for pages and feeds), roughly 150 in total, plus about 30 headless-browser sessions of a few pages each. Public JSON feeds listed in `agents.md` were used instead of crawling 991 product pages.
- **User-Agent:** `Mozilla/5.0 (compatible; SiteDocumentation/1.0)`.
- No private customer information, credentials or non-public data was collected. Testimonials are shown on the public homepage with initials and city only.
- Copyright: see [asset_inventory.md](asset_inventory.md#1-download-policy-and-limitations).

### 16.2 Tooling

`curl`, Python 3.12 (`html.parser`, `csv`, `json`, Pillow) and Playwright/Chromium. The Claude-in-Chrome extension was not connected, so Playwright was used instead. The `cdn.shopify.com` and `*.myshopify.com` hosts were unreachable from the test machine; the store-domain equivalents were used.

### 16.3 Validation performed

- Every relative link and image path in the three Markdown files resolves to an existing file (checked by script).
- All 35 downloaded images open as valid images; SHA-256 shows no duplicates.
- Dataset row counts reconcile: 991 products = 956 + 35; 26,972 image rows; 996 sitemap URLs; collection counts match the JSON feeds.
- The Mermaid diagram in [sitemap.md](sitemap.md#3-navigation-flow-mermaid) was parsed with the Mermaid library.

### 16.4 Folder index

```text
website_documentation/
├── website_blueprint.md     (this file)
├── sitemap.md
├── asset_inventory.md
├── datasets/                (10 files, section 10)
└── assets/
    ├── branding/            2
    ├── homepage/            12
    ├── pages/               4
    ├── products/            17
    └── screenshots/         39 (+ interactions/ 14)
```
