# Asset Inventory

> Part of the [A&J Luxury website blueprint](website_blueprint.md). Source site: <https://aandjluxury.com/>. Observed **2026-10-09**.

## Contents

1. [Download policy and limitations](#1-download-policy-and-limitations)
2. [Downloaded site imagery (branding, homepage, pages)](#2-downloaded-site-imagery)
3. [Downloaded product photography sample](#3-downloaded-product-photography-sample)
4. [Referenced but not downloaded](#4-referenced-but-not-downloaded)
5. [Screenshots captured for this documentation](#5-screenshots-captured-for-this-documentation)
6. [Asset directory index](#6-asset-directory-index)

## 1. Download policy and limitations

- **Method:** plain HTTP GET of original files (no resize parameters), 0.6-0.7 s between requests, descriptive User-Agent. No hotlink protection or access control was encountered or bypassed; every download returned HTTP 200.
- **Copyright:** all photography and the logo belong to A&J Luxury (or are photographs of third-party branded goods whose marks belong to their owners; product pages carry the disclaimer *"A&J Luxury is not affiliated with any of the brand names posted. All rights and trademarks solely belong to the brand owners."*). The site publishes no explicit image-reuse licence. Treat everything below as **reference material only**; do not republish it in a new site without the owner's permission.
- **Product photos:** the catalog references **26,972** product images (about 1280x1280 px, ~150-300 KB each, i.e. several GB). Only a **17-image representative sample** was downloaded (section 3). All 26,972 URLs are catalogued in [`datasets/product_images.csv`](datasets/product_images.csv). Downloading the remainder was judged disproportionate (copyright and server load) and was not done.
- **Deduplication:** SHA-256 of every downloaded file was compared; **no duplicates** among the 35 downloaded files. Responsive variants of the same image (`width=` / `crop=` URLs) were not downloaded separately; the original file is stored.
- **URL note:** the Shopify JSON feeds expose images on `cdn.shopify.com/s/files/1/0572/4946/4500/files/<name>`. The same files are served from the store domain at `https://aandjluxury.com/cdn/shop/files/<name>`, which is what the storefront pages reference and what was used for downloading (the `cdn.shopify.com` host failed a TLS handshake from the Windows `curl.exe` used here).

## 2. Downloaded site imagery

| # | File | Type | Dimensions | Bytes | SHA-256 (first 12) | Source page(s) | Original URL | Observed use |
|--:|---|---|---|--:|---|---|---|---|
| 1 | [`logopng.png`](assets/branding/logopng.png) | PNG | 500x300 | 41,975 | `c4a8c4a1138d` | All pages (header logo) | `https://aandjluxury.com/cdn/shop/files/logopng.png?v=1727324588` | Header logo (125px wide desktop / 120px mobile per theme CSS vars); also `<link rel="shortcut icon">` at 32x32 and the Organization `logo` in JSON-LD |
| 2 | [`soc.jpg`](assets/branding/soc.jpg) | JPEG | 1200x628 | 26,161 | `48bd83985b73` | All pages (`<meta property="og:image">`) | `https://aandjluxury.com/cdn/shop/files/soc.jpg?v=1632381074` | Open Graph / Twitter card share image (declared 1200x628) |
| 3 | [`viber_image_2024-10-03_16-00-25-456.jpg`](assets/homepage/viber_image_2024-10-03_16-00-25-456.jpg) | JPEG | 1280x853 | 211,871 | `0ff7fb7ee2b9` | Home | `https://aandjluxury.com/cdn/shop/files/viber_image_2024-10-03_16-00-25-456.jpg?v=1727959440` | Hero slide 1 desktop source ("SHOP BAGS" -> /collections/bags) |
| 4 | [`viber_image_2024-10-03_16-00-25-456_bc30339d-2cd7-4ad6-b794-48ed6cf900f8.jpg`](assets/homepage/viber_image_2024-10-03_16-00-25-456_bc30339d-2cd7-4ad6-b794-48ed6cf900f8.jpg) | JPEG | 518x853 | 91,547 | `c3341094a999` | Home | `https://aandjluxury.com/cdn/shop/files/viber_image_2024-10-03_16-00-25-456_bc30339d-2cd7-4ad6-b794-48ed6cf900f8.jpg?v=1727962267` | Hero slide 1 mobile source (`<source media="(max-width: 767px)">`, declared 518x853) |
| 5 | [`viber_image_2024-10-03_16-00-42-866.jpg`](assets/homepage/viber_image_2024-10-03_16-00-42-866.jpg) | JPEG | 1280x853 | 112,761 | `0fe05a9b1c70` | Home | `https://aandjluxury.com/cdn/shop/files/viber_image_2024-10-03_16-00-42-866.jpg?v=1727959440` | Hero slide 2 desktop source ("SHOP SHOES" -> /collections/shoes) |
| 6 | [`viber_image_2024-10-03_16-00-42-866_4afce564-3b47-40ae-9776-581e9be257e2.jpg`](assets/homepage/viber_image_2024-10-03_16-00-42-866_4afce564-3b47-40ae-9776-581e9be257e2.jpg) | JPEG | 511x850 | 64,350 | `5f4a1d701c8d` | Home | `https://aandjluxury.com/cdn/shop/files/viber_image_2024-10-03_16-00-42-866_4afce564-3b47-40ae-9776-581e9be257e2.jpg?v=1727962312` | Hero slide 2 mobile source |
| 7 | [`viber_image_2024-10-03_16-00-47-757.jpg`](assets/homepage/viber_image_2024-10-03_16-00-47-757.jpg) | JPEG | 1280x853 | 223,875 | `3cf427f7b076` | Home | `https://aandjluxury.com/cdn/shop/files/viber_image_2024-10-03_16-00-47-757.jpg?v=1727959440` | Hero slide 3 ("SHOP SLGs" -> /collections/wallets); no separate mobile source observed |
| 8 | [`2.jpg`](assets/homepage/2.jpg) | JPEG | 1000x1000 | 138,073 | `656c2ef0d16e` | Home | `https://aandjluxury.com/cdn/shop/files/2.jpg?v=1728016220` | Category tile "BAGS" (linked -> /collections/bags) |
| 9 | [`5.jpg`](assets/homepage/5.jpg) | JPEG | 1000x1000 | 100,804 | `b3228cf8404e` | Home | `https://aandjluxury.com/cdn/shop/files/5.jpg?v=1728016220` | Category tile "SLGs" (linked -> /collections/wallets) |
| 10 | [`4.jpg`](assets/homepage/4.jpg) | JPEG | 1000x1000 | 109,540 | `da08327069b1` | Home | `https://aandjluxury.com/cdn/shop/files/4.jpg?v=1728016220` | Category tile "SHOES" (not linked in DOM) |
| 11 | [`3.jpg`](assets/homepage/3.jpg) | JPEG | 1000x1000 | 94,769 | `d2793ad93901` | Home | `https://aandjluxury.com/cdn/shop/files/3.jpg?v=1728016220` | Category tile "WATCHES" (not linked in DOM) |
| 12 | [`1.jpg`](assets/homepage/1.jpg) | JPEG | 1000x1000 | 105,850 | `f3fea3b2afb9` | Home | `https://aandjluxury.com/cdn/shop/files/1.jpg?v=1728016220` | Category tile "ACCESSORIES" (not linked in DOM) |
| 13 | [`viber_image_2024-10-03_16-00-46-832.jpg`](assets/homepage/viber_image_2024-10-03_16-00-46-832.jpg) | JPEG | 1280x853 | 176,679 | `049071174d26` | Home | `https://aandjluxury.com/cdn/shop/files/viber_image_2024-10-03_16-00-46-832.jpg?v=1727959440` | Image of the "Sell or Consign with Us!" promo panel |
| 14 | [`viber_image_2024-10-03_16-00-24-592_e779bcb0-62f3-452c-81af-5c08c656ddf1.jpg`](assets/homepage/viber_image_2024-10-03_16-00-24-592_e779bcb0-62f3-452c-81af-5c08c656ddf1.jpg) | JPEG | 853x1083 | 186,482 | `4bf2f0aae408` | Home | `https://aandjluxury.com/cdn/shop/files/viber_image_2024-10-03_16-00-24-592_e779bcb0-62f3-452c-81af-5c08c656ddf1.jpg?v=1728016896` | Image of the "We invite you to explore and discover the art of bliss with A&J Luxury." story panel |
| 15 | [`viber_image_2024-10-03_16-00-29-495.jpg`](assets/pages/viber_image_2024-10-03_16-00-29-495.jpg) | JPEG | 1280x853 | 174,259 | `25ba66e9e8a3` | About Us | `https://aandjluxury.com/cdn/shop/files/viber_image_2024-10-03_16-00-29-495.jpg?v=1727959459` | About Us page feature image |
| 16 | [`viber_image_2024-10-03_16-00-25-089.jpg`](assets/pages/viber_image_2024-10-03_16-00-25-089.jpg) | JPEG | 853x1280 | 174,461 | `320d889047de` | Consign | `https://aandjluxury.com/cdn/shop/files/viber_image_2024-10-03_16-00-25-089.jpg?v=1727959440` | Image beside "Why Consign with Us?" |
| 17 | [`viber_image_2024-10-03_16-00-27-409.jpg`](assets/pages/viber_image_2024-10-03_16-00-27-409.jpg) | JPEG | 853x1280 | 166,912 | `8ad0110bbe90` | Consign | `https://aandjluxury.com/cdn/shop/files/viber_image_2024-10-03_16-00-27-409.jpg?v=1727959440` | Image beside "To Consign," |
| 18 | [`viber_image_2024-10-03_16-00-37-254.jpg`](assets/pages/viber_image_2024-10-03_16-00-37-254.jpg) | JPEG | 853x1280 | 128,041 | `62b3afd6673c` | Sell | `https://aandjluxury.com/cdn/shop/files/viber_image_2024-10-03_16-00-37-254.jpg?v=1727959440` | Image beside "How to Sell?" |

## 3. Downloaded product photography sample

One main (first) image for each of: the first available product in the Bags, Wallets (SLGs), Shoes, Watches and Brand New collections, plus the first available product of each of the 12 largest brands (de-duplicated). Chosen to show photography style, not to represent the catalog.

| # | File | Dimensions | Bytes | Product (title as published) | Brand | Why sampled | Product page | Original URL |
|--:|---|---|--:|---|---|---|---|---|
| 1 | [`IMG-4964_aed48604-e290-438a-a2b6-6ae846934568.jpg`](assets/products/IMG-4964_aed48604-e290-438a-a2b6-6ae846934568.jpg) | 1280x1280 | 244,050 | [PRE LOVED] Gucci Small GG Supreme Tian Backpack in Brown with Red Leather Trims SHW | Gucci | first in collection: bags | [/products/pre-loved-gucci-small-gg-supreme-tian-…](https://aandjluxury.com/products/pre-loved-gucci-small-gg-supreme-tian-backpack-in-brown-with-red-leather-trims-shw) | `https://aandjluxury.com/cdn/shop/files/IMG-4964_aed48604-e290-438a-a2b6-6ae846934568.jpg?v=1791472452` |
| 2 | [`IMG-5060.jpg`](assets/products/IMG-5060.jpg) | 1280x1280 | 138,767 | [PRE LOVED] Chanel Compact Trifold Wallet in Light Green Caviar Leather in Light Gold HW (microchipped) | Chanel | first in collection: wallets | [/products/pre-loved-chanel-compact-trifold-walle…](https://aandjluxury.com/products/pre-loved-chanel-compact-trifold-wallet-in-light-green-caviar-leather-in-light-gold-hw-microchipped) | `https://aandjluxury.com/cdn/shop/files/IMG-5060.jpg?v=1791473174` |
| 3 | [`IMG-4259.jpg`](assets/products/IMG-4259.jpg) | 1280x1280 | 142,782 | [PRE LOVED] Maison Margiela Tabi Sandals in Black 37.5EU | Christian Dior | first in collection: shoes | [/products/pre-loved-maison-margiela-tabi-sandals…](https://aandjluxury.com/products/pre-loved-maison-margiela-tabi-sandals-in-black-37-5eu) | `https://aandjluxury.com/cdn/shop/files/IMG-4259.jpg?v=1791400710` |
| 4 | [`IMG-5545.jpg`](assets/products/IMG-5545.jpg) | 1280x1280 | 149,008 | [BRAND NEW] Philip Stein Women's Watch Mother of Pearl Dial in Gold | Philip Stein | first in collection: watches | [/products/brand-new-philip-stein-womens-watch-mo…](https://aandjluxury.com/products/brand-new-philip-stein-womens-watch-mother-of-pearl-dial-in-gold) | `https://aandjluxury.com/cdn/shop/files/IMG-5545.jpg?v=1774514719` |
| 5 | [`IMG-4270_c869eb5a-c8cc-4523-9206-9d5a2f59b57b.jpg`](assets/products/IMG-4270_c869eb5a-c8cc-4523-9206-9d5a2f59b57b.jpg) | 1280x1280 | 211,023 | [BRAND NEW] Hermes Evelyne PM III 29 in Gold Clemence Leather PHW (Stamp K - 2025) | A&J Luxury | first in collection: brand-new | [/products/brand-new-hermes-evelyne-pm-iii-29-in-…](https://aandjluxury.com/products/brand-new-hermes-evelyne-pm-iii-29-in-gold-clemence-leather-phw-stamp-k-2025) | `https://aandjluxury.com/cdn/shop/files/IMG-4270_c869eb5a-c8cc-4523-9206-9d5a2f59b57b.jpg?v=1791400835` |
| 6 | [`IMG-0810_e49ca745-38d0-46ac-a8a3-cffcb90c3c9a.jpg`](assets/products/IMG-0810_e49ca745-38d0-46ac-a8a3-cffcb90c3c9a.jpg) | 1280x1280 | 180,486 | [BRAND NEW] Chanel 26A Collection Small Vanity with Chain in Black Caviar Leather GHW (microchipped) | Chanel | top vendor: Chanel | [/products/brand-new-chanel-26a-collection-small-…](https://aandjluxury.com/products/brand-new-chanel-26a-collection-small-vanity-with-chain-in-black-caviar-leather-ghw-microchipped) | `https://aandjluxury.com/cdn/shop/files/IMG-0810_e49ca745-38d0-46ac-a8a3-cffcb90c3c9a.jpg?v=1786031620` |
| 7 | [`IMG-3373_383ef20f-cc1b-4d2b-8f41-991e7391087c.jpg`](assets/products/IMG-3373_383ef20f-cc1b-4d2b-8f41-991e7391087c.jpg) | 1280x1280 | 219,805 | [PRE LOVED] Louis Vuitton 6-Key Holder in Black SHW | Louis Vuitton | top vendor: Louis Vuitton | [/products/pre-loved-louis-vuitton-6-key-holder-i…](https://aandjluxury.com/products/pre-loved-louis-vuitton-6-key-holder-in-black-shw) | `https://aandjluxury.com/cdn/shop/files/IMG-3373_383ef20f-cc1b-4d2b-8f41-991e7391087c.jpg?v=1762533189` |
| 8 | [`IMG-5617.jpg`](assets/products/IMG-5617.jpg) | 1280x1280 | 184,191 | [BRAND NEW] Hermes Cashmere Scarf 140x30cm in Marine/Orange | Hermes | top vendor: Hermes | [/products/brand-new-hermes-cashmere-scarf-140x30…](https://aandjluxury.com/products/brand-new-hermes-cashmere-scarf-140x30cm-in-marine-orange) | `https://aandjluxury.com/cdn/shop/files/IMG-5617.jpg?v=1774515938` |
| 9 | [`IMG-6187_bf89ddca-b4ef-44d9-a57b-04207ff0a6c8.jpg`](assets/products/IMG-6187_bf89ddca-b4ef-44d9-a57b-04207ff0a6c8.jpg) | 1280x1280 | 202,905 | [PRE LOVED] Adidas x Gucci Gazelle in Blue/Green/Red Size 7US | Gucci | top vendor: Gucci | [/products/pre-loved-adidas-x-gucci-gazelle-in-bl…](https://aandjluxury.com/products/pre-loved-adidas-x-gucci-gazelle-in-blue-green-red-size-7us) | `https://aandjluxury.com/cdn/shop/files/IMG-6187_bf89ddca-b4ef-44d9-a57b-04207ff0a6c8.jpg?v=1774702361` |
| 10 | [`IMG-8584.jpg`](assets/products/IMG-8584.jpg) | 1280x1280 | 237,638 | [PRE LOVED] Prada 1AB1O1 Rectangular Frame Glasses | Prada | top vendor: Prada | [/products/pre-loved-prada-1ab1o1-rectangular-fra…](https://aandjluxury.com/products/pre-loved-prada-1ab1o1-rectangular-frame-glasses) | `https://aandjluxury.com/cdn/shop/files/IMG-8584.jpg?v=1723816781` |
| 11 | [`IMG-2537.jpg`](assets/products/IMG-2537.jpg) | 1280x1280 | 165,173 | [PRE LOVED] YSL Baby Cabas in Black GHW | Yves Saint Laurent | top vendor: Yves Saint Laurent | [/products/pre-loved-ysl-baby-cabas-in-black-ghw…](https://aandjluxury.com/products/pre-loved-ysl-baby-cabas-in-black-ghw) | `https://aandjluxury.com/cdn/shop/files/IMG-2537.jpg?v=1790425729` |
| 12 | [`IMG-8059_1685515d-31aa-48a2-9873-c2fc31768c0d.jpg`](assets/products/IMG-8059_1685515d-31aa-48a2-9873-c2fc31768c0d.jpg) | 1280x1280 | 219,002 | [PRE LOVED] Christian Dior Bloom Cardholder in Black Patent Leather GHW (2018) | Christian Dior | top vendor: Christian Dior | [/products/pre-loved-christian-dior-bloom-cardhol…](https://aandjluxury.com/products/pre-loved-christian-dior-bloom-cardholder-in-black-patent-leather-ghw-2018) | `https://aandjluxury.com/cdn/shop/files/IMG-8059_1685515d-31aa-48a2-9873-c2fc31768c0d.jpg?v=1784791397` |
| 13 | [`IMG-2316.jpg`](assets/products/IMG-2316.jpg) | 1280x1280 | 207,322 | [BRAND NEW] Bottega Veneta Mini Dumpling Wristlet in Black | Bottega Veneta | top vendor: Bottega Veneta | [/products/brand-new-bottega-veneta-mini-dumping-…](https://aandjluxury.com/products/brand-new-bottega-veneta-mini-dumping-wristlet-in-black) | `https://aandjluxury.com/cdn/shop/files/IMG-2316.jpg?v=1742142574` |
| 14 | [`IMG-3250_cb9e5f24-0203-4758-9d6a-2db30c833e71.jpg`](assets/products/IMG-3250_cb9e5f24-0203-4758-9d6a-2db30c833e71.jpg) | 1280x1280 | 297,802 | [PRE LOVED] Celine 16 Bucket Bag in White/Brown Textile and Smooth Tan Calfskin GHW | Celine | top vendor: Celine | [/products/pre-loved-celine-16-bucket-bag-in-whit…](https://aandjluxury.com/products/pre-loved-celine-16-bucket-bag-in-white-brown-textile-and-smooth-tan-calfskin-ghw) | `https://aandjluxury.com/cdn/shop/files/IMG-3250_cb9e5f24-0203-4758-9d6a-2db30c833e71.jpg?v=1782385639` |
| 15 | [`IMG-5685.jpg`](assets/products/IMG-5685.jpg) | 1280x1280 | 191,194 | [BRAND NEW] Goyard Matignon PM Wallet in Burgundy | Goyard | top vendor: Goyard | [/products/brand-new-goyard-matignon-pm-wallet-in…](https://aandjluxury.com/products/brand-new-goyard-matignon-pm-wallet-in-burgundy) | `https://aandjluxury.com/cdn/shop/files/IMG-5685.jpg?v=1787850367` |
| 16 | [`IMG-5758_8a683e1c-b15c-48e6-a3c7-e74c19597432.jpg`](assets/products/IMG-5758_8a683e1c-b15c-48e6-a3c7-e74c19597432.jpg) | 1280x1280 | 155,379 | [BRAND NEW] Loewe Anagram Flat Cardholder in Sand | Loewe | top vendor: Loewe | [/products/brand-new-loewe-anagram-flat-cardholde…](https://aandjluxury.com/products/brand-new-loewe-anagram-flat-cardholder-in-sand) | `https://aandjluxury.com/cdn/shop/files/IMG-5758_8a683e1c-b15c-48e6-a3c7-e74c19597432.jpg?v=1787850970` |
| 17 | [`IMG-8734.jpg`](assets/products/IMG-8734.jpg) | 1280x1280 | 133,786 | [PRE LOVED] Balenciaga BB096S Sunglasses in Black | Balenciaga | top vendor: Balenciaga | [/products/pre-loved-balenciaga-bb096s-sunglasses…](https://aandjluxury.com/products/pre-loved-balenciaga-bb096s-sunglasses-in-black) | `https://aandjluxury.com/cdn/shop/files/IMG-8734.jpg?v=1766328705` |

## 4. Referenced but not downloaded

| Asset | Where used | URL(s) | Reason not downloaded |
|---|---|---|---|
| 26,955 remaining product photos | Product pages, collection grids, search, homepage tabs | Listed per image in [`datasets/product_images.csv`](datasets/product_images.csv) (`src` column) | Volume and copyright; see section 1 |
| `free-shipping-sales.svg` | Homepage icon strip, label "Free Shipping within Metro Manila" | `https://www.svgrepo.com/show/424872/free-shipping-sales.svg` | Third-party host (SVG Repo); licence of this specific icon was not verified. Re-source from a licensed icon set when rebuilding |
| `economy-sales-discount.svg` | Homepage icon strip, label "100% Authentic with Money Back Guarantee" | `https://www.svgrepo.com/show/424881/economy-sales-discount.svg` | Third-party host (SVG Repo); licence of this specific icon was not verified. Re-source from a licensed icon set when rebuilding |
| `deal-sales-discount.svg` | Homepage icon strip, label "Low Price Guaranteed" | `https://www.svgrepo.com/show/424867/deal-sales-discount.svg` | Third-party host (SVG Repo); licence of this specific icon was not verified. Re-source from a licensed icon set when rebuilding |
| `tag-sales-discount.svg` | Homepage icon strip, label "Offers Layaway with Minimal Interest" | `https://www.svgrepo.com/show/424873/tag-sales-discount.svg` | Third-party host (SVG Repo); licence of this specific icon was not verified. Re-source from a licensed icon set when rebuilding |
| Poppins webfont (weights 200, 300, 400 italic/regular, 700 italic/regular) | Global typography | `https://aandjluxury.com/cdn/fonts/poppins/poppins_n2.99893b093cc6b797a8baf99180056d9e77320b68.woff2` (200), `…poppins_n3.05f58335c3209cce17da4f1f1ab324ebe2982441.woff2` (300), `…poppins_n4.0ba78fa5af9b0e1a374041b3ceaadf0a43b41362.woff2` (400), `…poppins_n7.56758dcf284489feb014a026f3727f2f20a54626.woff2` (700), `…poppins_i4.846ad1e22474f856bd6b81ba4585a60799a9f5d2.woff2` (400 italic), `…poppins_i7.42fd71da11e9d101e1e6c7932199f925f9eea42d.woff2` (700 italic) | Font files, not imagery. Poppins is available from Google Fonts; use that source when rebuilding |
| Theme UI icons `arrow-down.svg`, `arrow-down-white.svg`, `ar-down.svg` | Select-box / accordion chevrons (CSS custom properties `--arrow-down-url`, `--arrow-select-box`) | `https://aandjluxury.com/cdn/shop/t/6/assets/arrow-down.svg`, `…/arrow-down-white.svg`, `…/ar-down.svg` | Trivial glyphs belonging to the commercial Minimog theme |
| Footer social icons (Facebook, Instagram, WhatsApp) | Footer "FOLLOW US" | Inline SVG inside the page HTML | No separate file exists |
| Payment-method logos | Footer "Payment options:" label | none rendered | The label is present but no icons were output in the HTML or the screenshots |
| Instagram feed images | Blog index and article pages ("Instagram" heading) | none rendered | The section heading is present but no feed images loaded |
| Sold-out / badge graphics | Product cards | CSS-rendered text badges | No image files |

## 5. Screenshots captured for this documentation

These are **my own captures** of the public site (headless Chromium, 2026-10-09, default visitor state: Philippines, cookies not accepted) and are not site assets. Viewports: desktop 1440x900, tablet 768x1024, mobile 390x844 (full-page unless noted).

| Page | Desktop | Tablet | Mobile |
|---|---|---|---|
| Home | [1452x5099](assets/screenshots/home_desktop.png) | [768x7132](assets/screenshots/home_tablet.png) | [390x6619](assets/screenshots/home_mobile.png) |
| Collection: Bags | [1452x5597](assets/screenshots/collection-bags_desktop.png) | [768x5791](assets/screenshots/collection-bags_tablet.png) | [390x5815](assets/screenshots/collection-bags_mobile.png) |
| Collection: Scents (empty) | [1452x1941](assets/screenshots/collection-empty-scents_desktop.png) | [768x2550](assets/screenshots/collection-empty-scents_tablet.png) | [390x1584](assets/screenshots/collection-empty-scents_mobile.png) |
| Product (sample) | [1452x2569](assets/screenshots/product_desktop.png) | [841x2833](assets/screenshots/product_tablet.png) | [390x2819](assets/screenshots/product_mobile.png) |
| About Us | [1452x2318](assets/screenshots/about-us_desktop.png) | [768x1961](assets/screenshots/about-us_tablet.png) | [390x1767](assets/screenshots/about-us_mobile.png) |
| Consign | [1452x3739](assets/screenshots/consign_desktop.png) | [768x4487](assets/screenshots/consign_tablet.png) | [390x4544](assets/screenshots/consign_mobile.png) |
| Sell | [1452x2313](assets/screenshots/sell_desktop.png) | [768x2875](assets/screenshots/sell_tablet.png) | [390x2336](assets/screenshots/sell_mobile.png) |
| FAQs | [1452x1501](assets/screenshots/faqs_desktop.png) | [768x1537](assets/screenshots/faqs_tablet.png) | [390x1356](assets/screenshots/faqs_mobile.png) |
| Visit Us | [1452x1220](assets/screenshots/visit-us_desktop.png) | [773x1247](assets/screenshots/visit-us_tablet.png) | [390x1118](assets/screenshots/visit-us_mobile.png) |
| Wish List (empty) | [1452x942](assets/screenshots/wish-list_desktop.png) | [768x1024](assets/screenshots/wish-list_tablet.png) | [390x844](assets/screenshots/wish-list_mobile.png) |
| News (blog index) | [1452x1126](assets/screenshots/blog-news_desktop.png) | [768x1191](assets/screenshots/blog-news_tablet.png) | [390x844](assets/screenshots/blog-news_mobile.png) |
| Search "chanel" | [1452x3676](assets/screenshots/search_desktop.png) | [768x2940](assets/screenshots/search_tablet.png) | [390x3349](assets/screenshots/search_mobile.png) |
| 404 page (/pages/brands) | [1452x1313](assets/screenshots/not-found_desktop.png) | [768x1156](assets/screenshots/not-found_tablet.png) | [390x899](assets/screenshots/not-found_mobile.png) |

Interaction captures (viewport-sized unless noted):

| Capture | What it shows |
|---|---|
| [`menu-hover-shop_desktop.png`](assets/screenshots/interactions/menu-hover-shop_desktop.png) | SHOP dropdown open on hover |
| [`menu-hover-consign_desktop.png`](assets/screenshots/interactions/menu-hover-consign_desktop.png) | CONSIGN/SELL dropdown open on hover |
| [`menu-hover-customer-service_desktop.png`](assets/screenshots/interactions/menu-hover-customer-service_desktop.png) | CUSTOMER SERVICE dropdown open on hover |
| [`search-open_desktop.png`](assets/screenshots/interactions/search-open_desktop.png) | Search overlay with popular-search chips |
| [`search-results_desktop.png`](assets/screenshots/interactions/search-results_desktop.png) | Predictive search for "chanel": suggestions + product results |
| [`home-tab-bags_desktop.png`](assets/screenshots/interactions/home-tab-bags_desktop.png) | Homepage Featured Collection with the "Bags" tab active |
| [`collection-bags-filters_desktop.png`](assets/screenshots/interactions/collection-bags-filters_desktop.png) | Bags collection: filter sidebar, sort control, grid-density buttons |
| [`collection-bags-top_mobile.png`](assets/screenshots/interactions/collection-bags-top_mobile.png) | Bags collection on mobile |
| [`collection-card-hover_desktop.png`](assets/screenshots/interactions/collection-card-hover_desktop.png) | Product card hover state |
| [`product-accordion-open_desktop.png`](assets/screenshots/interactions/product-accordion-open_desktop.png) | Product page with "Layaway Policy" accordion opened |
| [`product-zoom-lightbox_desktop.png`](assets/screenshots/interactions/product-zoom-lightbox_desktop.png) | Product image zoom modal |
| [`wishlist-with-item_desktop.png`](assets/screenshots/interactions/wishlist-with-item_desktop.png) | Wish List page after one item was stored in localStorage |
| [`mobile-menu-open_mobile.png`](assets/screenshots/interactions/mobile-menu-open_mobile.png) | Mobile slide-in menu |
| [`mobile-menu-shop-submenu_mobile.png`](assets/screenshots/interactions/mobile-menu-shop-submenu_mobile.png) | Mobile menu after tapping "Shop" |

## 6. Asset directory index

```text
website_documentation/
  assets/branding/  (2 files)
  assets/homepage/  (12 files)
  assets/pages/  (4 files)
  assets/products/  (17 files)
  assets/screenshots/  (39 files)
  assets/screenshots/interactions/  (14 files)
```
