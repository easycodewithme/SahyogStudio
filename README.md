# Sahyog Studio website

Portfolio and contact site for **Sahyog Studio**: head office Sahyog Photo Studio & Printing Press, Rakhiyal; new branch Sahyog Recording Studio, Mahadev Arcade, Atarsumba–Kapadvanj Highway, Atarsumba 387610. Phone / WhatsApp +91 99134 17943, Instagram @sahyog_studio_4006.

Plain HTML/CSS/JS. No build step. Open `index.html` in a browser, or host the folder on GitHub Pages, Netlify or Vercel.

## Business details

1. **`assets/js/config.js`**: phone, WhatsApp, map links, Instagram, Facebook, YouTube. A link left as "" is hidden on the site (Facebook and YouTube are hidden until you add them).
2. **`index.html`**: the same details in the `<script type="application/ld+json">` block (what Google reads) and the visible addresses in the Contact section.
3. **Domain**: replace `https://sahyogstudio.in/` in `index.html`, `robots.txt` and `sitemap.xml` with the real domain.

Still missing: opening hours, email, logo, Facebook and YouTube links.

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
