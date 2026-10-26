# Design

Recorded from the built site (index.html, assets/css/style.css). The direction is the classic photography-portfolio canon, in strict black and white.

## Color

The interface carries no hue: black, white and greys only. Photographs stay in full natural colour (user request, 2026-10-26), so the pictures are the only colour on the page. The Google map stays greyscale so it doesn't compete with them.

| Token | Value | Use |
|---|---|---|
| `--ink` | #0a0a0a | Dark sections, primary buttons on light |
| `--ink-2` | #151515 | Image placeholders on dark |
| `--paper` | #f5f5f2 | Services, reviews, enquiry form |
| `--white` | #ffffff | Process, contact, FAQ; primary buttons on dark |
| `--on-dark-mute` | #a6a6a2 | Secondary text on dark |
| `--on-light-mute` | #565652 | Secondary text on light |
| `--line-dark` / `--line-light` | 16% white / 14% ink | Hairline rules |

Section rhythm: hero, intro, work (black) → services (paper) → films band (photo) → process (white) → reviews (paper) → contact, FAQ (white) → footer (black).

## Typography

- Display: **Bodoni Moda** 400, letter-spacing -0.02 to -0.03em, max 6rem. Headings, wordmark, service names, step numerals.
- Text: **Hanken Grotesk** 400/500/600, 17px base, line-height 1.65.
- Labels and buttons: Hanken Grotesk 600, 12–13px, uppercase, tracking 0.12–0.14em.
- Gujarati: **Noto Serif Gujarati** for સહયોગ સ્ટુડિયો.

## Components

- Buttons: square corners, 50px min height, solid or 1px outline; hover inverts fill.
- Rules, not cards: lists, details and FAQ are separated by 1px hairlines. No shadows, no rounded corners (except social and play circles).
- Gallery: CSS-column masonry, 16px gap (8px on mobile), captions on hover, native `<dialog>` lightbox with arrows, keys and swipe.
- Icons: inline SVG sprite, 1.5px stroke, currentColor.
- Mobile: bottom quick bar (Call / WhatsApp / Directions), WhatsApp cell inverted white.

## Motion

One authored moment: the hero crossfade (1.6s) with slow 7.5s zoom-out and a slide timer line. Sections fade/rise once on entry (ease-out-expo). All motion off under `prefers-reduced-motion`.
