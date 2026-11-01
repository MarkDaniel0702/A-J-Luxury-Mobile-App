# A&J Luxury Mobile App

Clickable prototypes for a marketplace where users can buy and consign luxury items (Philippines).

| Open this in a browser | What it is |
|---|---|
| `prototype/index.html` | Prototype 1. Uses A&J website photos, so it is not for sharing until A&J gives permission. |
| `prototype2/index.html` | Prototype 2, Classic Boutique. **Uses A&J Luxury's logo, photos and item details.** |
| `prototype3/index.html` | Prototype 3, Noir Salon. **Uses A&J Luxury's logo, photos and item details.** |
| `prototype4/index.html` | Prototype 4, Bloom. Still uses only generated placeholder pictures and invented samples. |

Prototypes 2 to 4 share the `shared/` folder, so keep them together. Swiping works with a mouse drag or a finger.

## A&J materials in Prototypes 2 and 3

This update applies A&J Luxury's materials (used with A&J's permission) to Prototypes 2 and 3. Prototype 4 deliberately keeps its placeholders. Prototypes 2 and 3 load `shared/aj-brand.js` before `shared/core.js`; Prototype 4 does not, so it is unchanged.

- **Logo and photos:** copied from `website_documentation/assets` into `shared/aj/` (the logo is cropped, nothing else is edited): 17 product photos, category and homepage photos, and the consign page photos.
- **Items:** the 17 items we hold photos of, with A&J's own title, price, condition, inclusions and flaws (taken from `prototype/data.js`). Brand names come from the item titles; two vendor fields in A&J's feed were wrong (Maison Margiela filed under Christian Dior, Hermes Evelyne filed under "A&J Luxury"). Each item has one photo.
- **FAQ, contact and policy wording:** from A&J's FAQ, Consign, Sell and Visit Us pages and its product descriptions. Where A&J's own pages disagree, the app says "A&J to confirm" instead of choosing (showroom address, who pays shipping, "money back guarantee" versus "refunds not available").
- **Not A&J data:** customers, orders, tickets, dates, the chatbot statistics and staff names are made-up samples (admin reports say so). Terms of Service and Privacy notice are still placeholders. A&J's authentication process has not been provided, so the app does not describe it.
- **Cart:** items are one of a kind, so there is no quantity. "Send inquiry" creates one inquiry per item (nothing is sent or paid).
- **Not used:** customer testimonials (consent not confirmed).

Prototypes 2 to 4 also have **Support** (after-sales tickets) and an **admin area** (tickets, reports, analytics). Admin login is on the log-in screen: `admin@ajluxury.test` / `Admin2026` (sample account). Use the same browser tab for the customer and admin sides, because nothing is saved. See `AJ-Luxury-Permission-Request.md` (Tasks 3, 4 and 5) for details, features and known limits.
