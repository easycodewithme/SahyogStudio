# Sahyog Studio website

Portfolio and contact site for **Sahyog Studio** (Sahyog Photo Studio), near Municipal Girls High School, Dahegam, Gujarat.

Plain HTML/CSS/JS. No build step. Open `index.html` in a browser, or host the folder on GitHub Pages, Netlify or Vercel.

## Before going live: fill in the real details

1. **`assets/js/config.js`**: phone, WhatsApp number, email, address, hours, Instagram, Facebook, YouTube and Google Maps links. Every button and link on the site reads from here.
2. **`index.html`**: the same phone/email/address in the `<script type="application/ld+json">` block (this is what Google reads), plus the visible fallback text (search for `XXXXX`).
3. **Domain**: replace `https://sahyogstudio.in/` in `index.html`, `robots.txt` and `sitemap.xml` with the real domain.

## Replace the sample photos

All photos are free Unsplash samples, shown in full colour against the black-and-white design. Replace them with the studio's own work:

- Put photos in `assets/img/` (export them around 1600px wide, JPG/WebP, under 400 KB each).
- In `index.html`, change the `src`, `srcset` and `data-full` URLs of each gallery item, and keep the `alt` text describing the photo (good for Google).
- Gallery filters use `data-cat="wedding" | "prewedding" | "portrait" | "events"`.
- Delete the "Sample photos from Unsplash" line in the footer once done.

## SEO included

- Title, description, keywords, canonical, Open Graph and Twitter cards (nice previews when shared on WhatsApp)
- LocalBusiness + FAQPage structured data (JSON-LD)
- `sitemap.xml`, `robots.txt`, `site.webmanifest`, `404.html`
- Descriptive alt text, one H1, semantic sections, fast lazy-loaded images

After launch: create/claim the **Google Business Profile** for the studio, submit the sitemap in **Google Search Console**, and use the same name/address/phone everywhere (Justdial, Google, Instagram).
