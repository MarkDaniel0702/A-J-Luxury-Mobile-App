# A&J Luxury Mobile App

Clickable prototypes for a marketplace where users can buy and consign luxury items (Philippines).

| Open this in a browser | What it is |
|---|---|
| `prototype/index.html` | Prototype 1. Uses A&J website photos, so it is not for sharing until A&J gives permission. |
| `prototype2/index.html` | Prototype 2, Classic Boutique. **Uses A&J Luxury's logo, photos and item details.** |
| `prototype3/index.html` | Prototype 3, Noir Salon. **Uses A&J Luxury's logo, photos and item details.** |
| `prototype4/index.html` | Prototype 4, Noir & Boutique. Prototype 3's layout in two colour themes (light from Prototype 2, dark from Prototype 3), plus the features the earlier "Bloom" Prototype 4 had on its own. **Uses A&J Luxury's logo, photos and item details.** |

Prototypes 2 to 4 share the `shared/` folder, so keep them together. Swiping works with a mouse drag or a finger.

## A&J materials in Prototypes 2, 3 and 4

A&J Luxury has given permission to use its materials. Prototypes 2, 3 and 4 load `shared/aj-brand.js` before `shared/core.js`.

- **Logo and photos:** copied from `website_documentation/assets` into `shared/aj/` (the logo is cropped, nothing else is edited): 17 product photos, category and homepage photos, and the consign page photos.
- **Items:** the 17 items we hold photos of, with A&J's own title, price, condition, inclusions and flaws (taken from `prototype/data.js`). Brand names come from the item titles; two vendor fields in A&J's feed were wrong (Maison Margiela filed under Christian Dior, Hermes Evelyne filed under "A&J Luxury"). Each item has one photo.
- **FAQ, contact and policy wording:** from A&J's FAQ, Consign, Sell and Visit Us pages and its product descriptions. Where A&J's own pages disagree, the app says "A&J to confirm" instead of choosing (showroom address, who pays shipping, "money back guarantee" versus "refunds not available").
- **Not A&J data:** customers, orders, tickets, dates, the assistant's statistics and staff names are made-up samples (admin reports say so). Terms of Service and Privacy notice are still placeholders. A&J's authentication process has not been provided, so the app does not describe it. The layaway month options (2, 3, 4, 6) are a sample: A&J publishes only "30% down, equal monthly payments".
- **Cart:** items are one of a kind, so there is no quantity. "Send inquiry" creates one inquiry per item (nothing is sent or paid).
- **Not used:** customer testimonials (consent not confirmed).

## Prototype 4: themes and features

**Look.** The layout is Prototype 3's, in both modes. Light mode uses Prototype 2's palette (white, black, hairlines); dark mode uses Prototype 3's (near-black, A&J yellow-gold). Only colours change between modes; every element stays in the same place. **Appearance** (System / Light / Dark) is in the menu, on Profile, and as a small button in the corner of the sign-in screens. System, the default, follows the device and updates when the device theme changes. A manual choice is remembered in the browser. Small readability fixes sit on top of the two palettes (each checked with a contrast audit of every screen): placeholder hint text is lighter (it was 2.6:1 in Prototype 3's dark mode); in light mode, outlines on chips and segmented controls use Prototype 2's field colour instead of the faint hairline, chat bubbles use a slightly lighter surface so their small print reaches 4.5:1, and the photo-viewer caption and close button are light on the viewer's black backdrop.

**Features that only the earlier "Bloom" Prototype 4 had**, redesigned in this layout (the old file is still in git history: `git show 7f41fd5:prototype4/index.html`):

| Feature | Where to find it |
|---|---|
| 4-digit code step at sign-up | Create account |
| Log in and reset password with email **or** mobile number | Log in, Forgot password |
| Greeting ("Kumusta, name") and notifications bell | Home |
| Buy / Consign switch (swipe left or right) and the consignment tracker | Home |
| Shortcuts: Under ₱30,000, Brand new, Top condition (removable filter chip), Trending row | Home, then Collections |
| Discover swipe deck (drag, buttons or arrow keys) | Home banner, menu, Quick actions, Saved |
| Layaway planner (30% down, monthly schedule, request) | Menu, Home, item page, Saved |
| Layaway estimate on every item | Item page |
| Grid / list view and filter sheet (max price, condition, several brands) | Collections |
| My activity: tabs, progress bars, sample tracker (swipe between tabs) | Menu |
| Notifications (unread count on the menu button) | Bell, menu |
| Guided "List an item" flow, one question per step (replaces Prototype 3's one-page form in this prototype) | Consign, Home, menu |
| Ava, the guided FAQ assistant (topics, "Talk to a person", Helpful? Yes/No) | Round button on every screen, menu, Support |
| Quick actions (customer and staff) | Top of the menu |
| Ticket-type option rows, ticket progress bars, staff tickets bell | Support, Admin |

Prototypes 2 to 4 also have **Support** (after-sales tickets) and an **admin area** (tickets, reports, analytics). Admin login is on the log-in screen: `admin@ajluxury.test` / `Admin2026` (sample account). Use the same browser tab for the customer and admin sides, because nothing is saved. See `AJ-Luxury-Permission-Request.md` (Tasks 3, 4 and 5) for details, features and known limits.
