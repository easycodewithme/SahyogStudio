(function () {
  "use strict";

  var S = window.SAHYOG || {};
  var doc = document;
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  doc.documentElement.classList.add("js");

  /* ---------- Apply business details from config.js ---------- */
  function waLink(text) {
    var base = "https://wa.me/" + (S.whatsapp || "");
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  }

  $$("[data-wa]").forEach(function (a) {
    a.href = waLink(a.getAttribute("data-wa-text"));
    a.target = "_blank";
    a.rel = "noopener";
  });
  $$("[data-tel]").forEach(function (a) { if (S.phoneIntl) a.href = "tel:" + S.phoneIntl; });
  $$("[data-phone-text]").forEach(function (el) { if (S.phoneDisplay) el.textContent = S.phoneDisplay; });
  $$("[data-email]").forEach(function (a) { if (S.email) a.href = "mailto:" + S.email; });
  $$("[data-email-text]").forEach(function (el) { if (S.email) el.textContent = S.email; });
  $$("[data-hours]").forEach(function (el) { if (S.hours) el.textContent = S.hours; });
  $$("[data-address]").forEach(function (el) {
    if (!S.addressLines) return;
    el.textContent = "";
    S.addressLines.forEach(function (line, i) {
      if (i) el.appendChild(doc.createElement("br"));
      el.appendChild(doc.createTextNode(line));
    });
  });
  var linkMap = { "data-maps": S.mapsUrl, "data-branch-maps": S.branchMapsUrl, "data-ig": S.instagram, "data-fb": S.facebook, "data-yt": S.youtube, "data-jd": S.justdial, "data-greviews": S.googleReviews };
  Object.keys(linkMap).forEach(function (attr) {
    $$("[" + attr + "]").forEach(function (a) {
      if (!linkMap[attr]) { a.hidden = true; return; }
      a.href = linkMap[attr]; a.target = "_blank"; a.rel = "noopener";
    });
  });
  $$("[data-map]").forEach(function (f) { if (S.mapsEmbed) f.src = S.mapsEmbed; });
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Nav ---------- */
  var nav = doc.querySelector("[data-nav]");
  var toggle = doc.querySelector("[data-menu-toggle]");
  var menu = doc.querySelector("[data-menu]");

  function onScroll() { nav.classList.toggle("is-solid", window.scrollY > 40 || !menu.hidden); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    doc.body.style.overflow = open ? "hidden" : "";
    onScroll();
  }
  toggle.addEventListener("click", function () { setMenu(menu.hidden); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) { setMenu(false); toggle.focus(); } });

  /* ---------- Hero slideshow ---------- */
  var slides = $$("[data-slides] .hero__slide");
  var nowEl = doc.querySelector("[data-slide-now]");
  var totalEl = doc.querySelector("[data-slide-total]");
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  if (totalEl) totalEl.textContent = pad(slides.length);

  function load(img) {
    if (img.dataset.src) {
      if (img.dataset.srcset) img.srcset = img.dataset.srcset;
      img.src = img.dataset.src;
      delete img.dataset.src;
      delete img.dataset.srcset;
    }
  }

  if (slides.length > 1 && !reduceMotion) {
    var current = 0;
    window.addEventListener("load", function () { load(slides[1]); });
    setInterval(function () {
      if (doc.hidden) return;
      var next = (current + 1) % slides.length;
      load(slides[next]);
      load(slides[(next + 1) % slides.length]);
      slides[current].classList.remove("is-active");
      slides[next].classList.add("is-active");
      current = next;
      if (nowEl) nowEl.textContent = pad(current + 1);
    }, 6000);
  }

  /* ---------- Gallery filter ---------- */
  var items = $$("[data-gallery] .g-item");
  var filterBtns = $$("[data-filter]");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", String(on));
      });
      items.forEach(function (it) {
        it.classList.toggle("is-hidden", cat !== "all" && it.getAttribute("data-cat") !== cat);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = doc.querySelector("[data-lightbox]");
  var lbImg = doc.querySelector("[data-lb-img]");
  var lbCap = doc.querySelector("[data-lb-cap]");
  var openers = $$(".g-open");
  var idx = 0;
  var lastFocus = null;

  function visibleOpeners() { return openers.filter(function (b) { return !b.closest(".g-item").classList.contains("is-hidden"); }); }

  function show(btn) {
    var img = btn.querySelector("img");
    lbImg.src = btn.getAttribute("data-full");
    lbImg.alt = img.alt;
    lbCap.textContent = btn.getAttribute("data-caption") || "";
    lbImg.style.animation = "none";
    void lbImg.offsetWidth;
    lbImg.style.animation = "";
  }
  function step(dir) {
    var list = visibleOpeners();
    idx = (idx + dir + list.length) % list.length;
    show(list[idx]);
  }

  if (lb && typeof lb.showModal === "function") {
    openers.forEach(function (btn) {
      btn.addEventListener("click", function () {
        lastFocus = btn;
        idx = visibleOpeners().indexOf(btn);
        show(btn);
        lb.showModal();
      });
    });
    doc.querySelector("[data-lb-close]").addEventListener("click", function () { lb.close(); });
    doc.querySelector("[data-lb-prev]").addEventListener("click", function () { step(-1); });
    doc.querySelector("[data-lb-next]").addEventListener("click", function () { step(1); });
    lb.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener("close", function () { lbImg.removeAttribute("src"); if (lastFocus) lastFocus.focus(); });

    var touchX = null;
    lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      touchX = null;
    });
  } else {
    openers.forEach(function (btn) {
      btn.addEventListener("click", function () { window.open(btn.getAttribute("data-full"), "_blank", "noopener"); });
    });
  }

  /* ---------- Enquiry form → WhatsApp ---------- */
  var form = doc.querySelector("[data-enquiry]");
  if (form) {
    function setError(input, msgEl, bad) {
      input.setAttribute("aria-invalid", String(bad));
      if (bad) input.setAttribute("aria-describedby", msgEl.id); else input.removeAttribute("aria-describedby");
      msgEl.hidden = !bad;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name;
      var phone = form.elements.phone;
      var digits = phone.value.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
      var nameBad = !name.value.trim();
      var phoneBad = digits.length !== 10;
      setError(name, doc.getElementById("f-name-err"), nameBad);
      setError(phone, doc.getElementById("f-phone-err"), phoneBad);
      if (nameBad) { name.focus(); return; }
      if (phoneBad) { phone.focus(); return; }

      var lines = [
        "Hi Sahyog Studio, I'd like to enquire about a shoot.",
        "Name: " + name.value.trim(),
        "Phone: " + digits,
        "Shoot: " + form.elements.service.value
      ];
      if (form.elements.date.value) lines.push("Date: " + form.elements.date.value);
      if (form.elements.message.value.trim()) lines.push("Message: " + form.elements.message.value.trim());
      window.open(waLink(lines.join("\n")), "_blank", "noopener");
    });
  }

  /* ---------- Scroll reveal ---------- */
  if ("IntersectionObserver" in window && !reduceMotion) {
    var targets = $$(".intro__body, .work__head, .svc__text, .svc__img, .films__content, .process .h-section, .step, .reviews__inner, .contact__info, .enquiry, .faq__list");
    targets.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }
})();
