# A&J Luxury Mobile App — What to Request From A&J Luxury

**Prepared for:** project adviser · **Market:** Philippines · **Legend:** **[R]** Required · **[O]** Optional
**Adviser's instruction:** no pictures from the A&J Luxury website until A&J gives permission. Prototype 2 follows this: it contains no A&J photos, logo or testimonials.
**Legal note:** Philippine law references are from general knowledge and were not verified. Have counsel confirm before launch.

Where an A&J policy is quoted in the prototype (shipping, returns, consignment terms), it was paraphrased from A&J's public website text and is **not yet confirmed by A&J**. Items below marked ⚠ are known conflicts or gaps.

---

## Task 1 — Needed from A&J for the prototype

| Status | Request | Why |
|---|---|---|
| [R] | **Written permission to build and show a prototype** under the A&J name: who may see it (adviser, class, panel) and for how long | We are using A&J's name and business model. Permission should exist before anyone outside the team sees it. |
| [R] | **A named contact and approval owner** at A&J | Someone has to answer questions and approve content. |
| [R] | **Confirmation of the FAQ and policy answers the chatbot gives**: how to buy, consignment steps and terms, shipping, payment, layaway, returns | The chatbot must only repeat what A&J has approved. ⚠ The site FAQ says the client pays shipping, while the homepage mentions free shipping within Metro Manila. |
| [R] | **Short description of how A&J authenticates items** (who, how, any certificate issued) | The chatbot can't state that any item is authentic or fake, so it needs an approved explanation of the process. |
| [R] | **Consignment terms in writing**: period (site says 1–5 months), pull-out fee (site says ₱2,000), what items are accepted | Used in the consignment answers and the future consign flow. |
| [O] | **Permission to use the A&J logo and brand colors** | Prototype 2 uses a plain text wordmark instead, so it works without this. |
| [O] | **Written permission to use specific photos**, and whether we may crop or edit them | Lets us replace placeholders with real photos later. Without it, placeholders stay. |
| [O] | **5–10 sample listings** (photos with permission, title, condition, inclusions, price) | Gives the prototype realistic content in place of invented samples. |
| [O] | **Showroom address, hours and contact channels** | The chatbot's showroom answer says these are unconfirmed. |
| [O] | **Escalation contact for the chatbot** (who a viewer is handed to) | Needed to make the "talk to a person" step real. |

---

## Task 2 — Needed from A&J for the full mobile app

The company-side checklist for sellers and consignors is in [`AJ-Luxury-Company-Requirements.md`](AJ-Luxury-Company-Requirements.md) (more detail per item). This is the grouped summary.

### A. Written permissions and legal
| Status | Request | Why |
|---|---|---|
| [R] | **Written permission to use photos and descriptions** in the app, website, social media and ads, including whether we may edit, crop or watermark | Copyright. |
| [R] | **Proof that A&J owns the photos** or may license them (or permission for the app team to take new ones) | Stops use of images taken from brand sites or other sellers. |
| [R] | **Terms of Service, Seller Policy and Privacy Notice** approved by A&J | Legal basis for users, consignors and data handling. |
| [R] | **Signed consignment agreement template**: commission, price authority, holding period, unsold returns, loss and damage, payout | The legal basis for selling someone else's property. |
| [R] | **Brand and trademark use position**: how brand names are shown, plus a no-endorsement disclaimer | Avoids trademark claims. A&J's site already carries a non-affiliation notice. |
| [R] | **Anti-money-laundering and proof-of-ownership procedure** for high-value items | Luxury goods carry laundering and stolen-goods risk. Confirm what applies to A&J. |
| [R] | **Data privacy items**: named privacy contact, consent text, retention periods | Required under the Data Privacy Act (RA 10173). |
| [O] | **Permission to feature customer testimonials** | Social proof. Don't use reviews without consent. |

### B. Brand assets
| Status | Request | Why |
|---|---|---|
| [R] | **Logo (vector and PNG), color palette, fonts, brand guidelines** | Consistent UI and app-store icons. |
| [O] | **Brand story and "About us" text** | Trust. We can draft it from an interview. |
| [O] | **Brand photography and tone-of-voice guide** | Marketing screens and chatbot tone. |

### C. Product data and media
| Status | Request | Why |
|---|---|---|
| [R] | **Catalogue data** (CSV or spreadsheet): brand, title, category, condition rank, description, inclusions, flaws, SKU, quantity, location | Populates the app. We will provide a template. |
| [R] | **Photos per item in a fixed set** (front, back, sides, bottom, interior, hardware, serial or date code, flaws, inclusions) plus photo standards | Buyers can't touch the item. |
| [R] | **Condition grading scale in writing** (what "9.5/10" means) | Misstated condition is the top cause of disputes. |
| [O] | **Short video or 360° spin** for high-value items | Raises buyer confidence. |
| [O] | **Brand-specific attributes** (watch movement, reference number, metal purity) | Better filters. |

### D. Pricing, fees and payouts
| Status | Request | Why |
|---|---|---|
| [R] | **Asking price per item** and **private minimum price** | Listing price and offer rules. |
| [R] | **Commission and fee schedule** (authentication, listing, storage, payment processing) | Checkout and payout math. |
| [R] | **Tax treatment**: VAT status, official receipt rules, withholding on payouts | Correct receipts and payouts. Confirm with an accountant. |
| [R] | **Payout terms**: timing, method, minimum | Consignors need to know when they are paid. |
| [R] | **Who pays shipping, insurance and payment fees** ⚠ | Conflicting in current public material. |
| [R] | **Layaway terms** (site says 30% down, equal monthly payments, down payment forfeited if late) and **price-change rules** | Needed to build layaway and markdown features. |
| [O] | **Negotiation, trade-in and store-credit rules** | Only if those features are in scope. |

### E. Authenticity and verification
| Status | Request | Why |
|---|---|---|
| [R] | **Authentication process and standards** per brand and category, and names and credentials of authenticators | Produces the in-app authenticity record. Authentication stays with human experts. |
| [R] | **Intake inspection record** (photos at intake) and **process for failed authentication** | Evidence for disputes and clear seller rights. |
| [R] | **Proof of ownership** and **government ID** of consignors, with secure-storage rules | Fraud and stolen-goods prevention. |
| [O] | **Third-party authentication partner contract** | Only if outsourced. |

### F. Operations
| Status | Request | Why |
|---|---|---|
| [R] | **Consignment workflow, term and end-of-term handling** (extend, mark down, return) | Defines app screens and reminders. |
| [R] | **Shipping policy**: couriers, areas, cut-off times, packaging, insurance, signature on delivery | Checkout options and fees. |
| [R] | **Return, refund, cancellation and dispute process** | Buyer protection flow. The site says exchange-only, no refunds or cancellations; A&J must confirm it as the app policy. |
| [R] | **Support policy**: channels, hours, response times, escalation contacts | Chatbot handoff and support tooling. |
| [R] | **Operations owner** for inventory, intake and shipping | Prevents stalled orders. |
| [O] | **Showroom viewing and appointment rules**; **cross-border handling** | Only if offered. |

### G. Chatbot content
| Status | Request | Why |
|---|---|---|
| [R] | **Approved FAQ answers and policy texts**, tone of voice | The bot answers only from approved material. |
| [R] | **Topics the bot must not answer** (authenticity decisions, legal advice, refund approvals) and **who it hands off to** | Safety and liability. |

### H. Business and accounts
| Status | Request | Why |
|---|---|---|
| [R] | **Registered business name, address, registration documents (SEC/DTI, business permit, BIR 2303), TIN** | Legitimacy and compliant receipts. |
| [R] | **Authorized representative** with ID and signing authority | Signs the agreements. |
| [R] | **Business bank or e-wallet account** for payouts | Payments must go to a verified account. |
| [R] | **Ownership of Apple and Google developer accounts** (and D-U-N-S number if needed) | App publishing needs a verified entity. |
| [R] | **Payment-gateway merchant account** (for example GCash, Maya or a card processor) | Needed for in-app checkout. Which provider is not yet decided. |
| [O] | **Past sales and customer data** (only with customer consent), social links, marketing plan | Seeding the catalogue and promotions. |

---

## Task 3 — Temporary replacement pictures

I did not use stock photos. Prototype 2 draws its own **placeholder images** (inline SVG, generated in `prototype2/index.html`), so there is no third-party license to track and nothing to download. Each is labeled "PLACEHOLDER IMAGE" so it can't be mistaken for a product photo.

| Image description | Source | License |
|---|---|---|
| Handbag line drawing on soft tint | Generated in `prototype2/index.html` (`art()`, category `bags`) | Original work, MIT (see `LICENSE`) |
| Wristwatch line drawing | Same, category `watches` | Original work, MIT |
| Ring with gem line drawing | Same, category `jewelry` | Original work, MIT |
| Shoe line drawing | Same, category `shoes` | Original work, MIT |
| Wallet line drawing | Same, category `wallets` | Original work, MIT |
| Sunglasses line drawing | Same, category `accessories` | Original work, MIT |

Each of the 18 sample listings uses one of these six drawings with a different tint.

**If you later want real photos as placeholders:** Unsplash, Pexels and Pixabay offer free-to-use photos under their own licenses. I have **not** browsed them or checked any specific image, so no photo is listed here. Before using one, read the license on that photo's page at download time. Free-to-use licenses generally don't cover trademarks, so avoid photos where a brand's logo is prominent.

---

## Task 4 — Prototype 2

Open `prototype2/index.html` in a browser (phone frame on desktop, full screen on a phone). No server or internet needed.

| Screen | What it does |
|---|---|
| **Login** (first screen) | Email and password, or **Continue as guest (view only)**. Any email and password works; nothing is sent or saved. "Create one" shows a not-built notice. |
| **Home** | Banner, six category tiles, new arrivals, a three-step "how it works". A note says items and pictures are samples. |
| **Shop** | Search by brand or item, category chips, sort by price. 18 sample items with placeholder pictures. |
| **Item** | Placeholder picture, condition, inclusions, flaws, details, authenticity and shipping sections, **Ask Help** and **Inquire to buy**. |
| **Help (chatbot)** | Answers FAQs from keyword matching: how to buy, consignment, shipping, payment, layaway, authenticity, returns, condition ratings, showroom. Tap-to-ask chips. It never says whether an item is authentic or fake. Unknown questions get a fallback pointing to the A&J team. |
| **Account** | Guests see a login prompt. Members see their email, a wishlist and **Log out**. |

**Guest mode is view only:** guests can browse, search and use Help. Saving to the wishlist or inquiring shows a "Log in to …" prompt.

**Known limits:** no real accounts, no consign form, no checkout. "Inquire to buy" shows a demo message. Chatbot answers are unconfirmed A&J policies; the shipping answer says the fee responsibility is unclear.
