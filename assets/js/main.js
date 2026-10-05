(function () {
  "use strict";

  var WHATSAPP = "5511915538743";
  var LANGS = ["pt", "en", "es"];
  var HTML_LANG = { pt: "pt-BR", en: "en", es: "es" };
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var current = "pt";

  function storageGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function storageSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* ignore */ } }

  function detectLang() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(fromUrl) > -1) return fromUrl;
    var saved = storageGet("gl-lang");
    if (LANGS.indexOf(saved) > -1) return saved;
    var nav = (navigator.language || "pt").slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) > -1 ? nav : "pt";
  }

  function t(key) { return (I18N[current] && I18N[current][key]) || I18N.pt[key] || ""; }

  function renderSolutions() {
    var grid = document.getElementById("solutions-grid");
    if (!grid) return;
    var active = (document.querySelector('.tabs [aria-selected="true"]') || {}).dataset;
    var filter = active ? active.filter : "all";
    grid.innerHTML = I18N[current].solutions.map(function (s) {
      var tag = t("solutions." + s.cat);
      return (
        '<article class="sol reveal in' + (filter !== "all" && filter !== s.cat ? " hidden" : "") + '" data-cat="' + s.cat + '" id="sol-' + s.id + '">' +
          '<div class="sol-media"><span class="tag">' + tag + '</span>' +
            '<img src="assets/img/products/' + s.img + '.webp" alt="' + s.name + '" loading="lazy" width="1000" height="584"></div>' +
          '<div class="sol-body">' +
            '<span class="kicker">' + s.kicker + '</span>' +
            '<h3 class="h3">' + s.name + '</h3>' +
            '<p>' + s.text + '</p>' +
            '<ul class="sol-feats">' + s.feats.map(function (f) { return "<li>" + f + "</li>"; }).join("") + '</ul>' +
            '<a class="sol-link" href="#contato" data-interest="' + s.name + '">' + t("solutions.cta") + ARROW + '</a>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  function applyLang(lang) {
    current = lang;
    document.documentElement.lang = HTML_LANG[lang];
    document.title = t("meta.title");
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var val = t(el.getAttribute("data-i18n"));
      if (val) el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":");
        if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    renderSolutions();
    storageSet("gl-lang", lang);

    var url = new URL(location.href);
    if (lang === "pt") url.searchParams.delete("lang"); else url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
  }

  function setFilter(filter) {
    document.querySelectorAll(".tabs button").forEach(function (b) {
      b.setAttribute("aria-selected", String(b.dataset.filter === filter));
    });
    document.querySelectorAll(".sol").forEach(function (card) {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.cat !== filter);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(detectLang());

    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.dataset.lang); });
    });

    document.querySelectorAll(".tabs button").forEach(function (b) {
      b.addEventListener("click", function () { setFilter(b.dataset.filter); });
    });
    document.querySelectorAll("[data-goto-filter]").forEach(function (a) {
      a.addEventListener("click", function () { setFilter(a.dataset.gotoFilter); });
    });

    // "Quero conhecer" preenche o campo de interesse do formulário
    document.addEventListener("click", function (e) {
      var link = e.target.closest("[data-interest]");
      if (!link) return;
      var msg = document.getElementById("f-message");
      if (msg && !msg.value) msg.value = link.dataset.interest + " — ";
    });

    // Duplica o marquee para loop contínuo
    var track = document.querySelector(".marquee-track");
    if (track) track.innerHTML += track.innerHTML;

    // Nav com fundo ao rolar
    var nav = document.querySelector(".nav");
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 24); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Menu mobile
    var toggle = document.querySelector(".menu-toggle");
    var menu = document.querySelector(".mobile-menu");
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.add("scrolled");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); });
    });

    // Reveal on scroll
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      document.querySelectorAll(".reveal:not(.in)").forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    }

    // Formulário → WhatsApp
    var form = document.getElementById("contact-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var sel = form.querySelector("select");
      var interest = sel.value ? sel.options[sel.selectedIndex].text : "";
      var lines = [
        t("form.waIntro"),
        "",
        t("form.name") + ": " + (f.get("name") || ""),
        t("form.company") + ": " + (f.get("company") || ""),
        t("form.email") + ": " + (f.get("email") || "")
      ];
      if (interest) lines.push(t("form.interest") + ": " + interest);
      if (f.get("message")) lines.push("", f.get("message"));
      window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
    });

    document.getElementById("year").textContent = new Date().getFullYear();
  });
})();
