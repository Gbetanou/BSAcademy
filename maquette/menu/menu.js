/* En-tête commun V1 / V2. Se monte à la place de <div id="site-header" data-base="…">.
   data-base : préfixe des chemins (« » pour la V1, « ../ » pour la V2)
   data-catalog / data-refs / data-partners / data-voices : ancres propres à chaque version */
(() => {
  const host = document.getElementById("site-header");
  if (!host) return;
  const cfg = host.dataset, base = cfg.base || "";
  const BSA = window.BSA || { domains: [], courses: [] };
  const L = {
    home: "#", sessions: "#sessions", devis: "#devis", contact: "#contact",
    catalog: cfg.catalog || "#", refs: cfg.refs || "#", partners: cfg.partners || "#", voices: cfg.voices || "#"
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Icônes ---------- */
  const P = {
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15" rx="1"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    cert: '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    building: '<path d="M4 21V5l8-2v18M12 8h8v13M4 21h17M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="1.5"/><path d="M9 7V5h6v2M3 12h18"/>',
    laptop: '<rect x="5" y="5" width="14" height="10" rx="1"/><path d="M3 19h18"/>',
    star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
    book: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
    news: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M7 9h6M7 13h10M7 16h10M16 8.5h1"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.6v.3M12 17h.01"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a5.5 5.5 0 0 1 3.5 6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
    hand: '<path d="m3 12 4-4 4 2 3-2 7 4M7 8l-4 4 6 6 2-1 2 1 6-5"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/>',
    right: '<path d="m9 5 7 7-7 7"/>',
    left: '<path d="m15 5-7 7 7 7"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    shield: '<path d="M12 3 4.5 6v6c0 4.5 3.2 7.7 7.5 9 4.3-1.3 7.5-4.5 7.5-9V6z"/><path d="m9 12 2 2 4-4"/>',
    factory: '<path d="M3 21V10l5 3V10l5 3V6h3l1 6h4v9z"/><path d="M7 17h2M12 17h2M17 17h1"/>',
    network: '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-4h12v4"/>',
    tasks: '<path d="m4 6 1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17M11 6.5h9M11 12.5h9M11 18.5h9"/>',
    wifi: '<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>'
  };
  const ic = (n, cls = "") => `<svg class="m-ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ""}</svg>`;
  const flagFR = '<svg class="m-flag" viewBox="0 0 3 2" aria-hidden="true"><path fill="#002395" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#ED2939" d="M2 0h1v2H2z"/></svg>';
  const flagEN = '<svg class="m-flag" viewBox="0 0 60 30" aria-hidden="true"><path fill="#012169" d="M0 0h60v30H0z"/><path d="M0 0l60 30M60 0 0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30M60 0 0 30" stroke="#C8102E" stroke-width="3"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></svg>';

  /* ---------- Contenu ---------- */
  const domainIcon = { iso: "shield", ot: "factory", gov: "network", pm: "tasks", net: "wifi", mgmt: "users" };
  const certsOf = (d) => BSA.courses.filter((c) => c.d === d);
  const codeOf = (c) => (/^IS[OA]/.test(c.pre) ? `${c.pre} ${c.code}` : c.code ? (/ITIL|COBIT/.test(c.pre) ? `${c.pre.replace("®", "")} ${c.code}` : /PRINCE2/.test(c.pre) ? "PRINCE2" : c.code === "DSF" ? "Data Science" : c.code) : "");

  const MENU = [
    { label: "Accueil", href: L.home, current: true },
    {
      id: "formations", label: "Formations",
      feature: { img: base + "img/card-terrain.jpg", title: "Planifiez votre prochaine formation.", text: "Consultez les prochaines sessions et choisissez la date et la ville qui vous conviennent.", cta: "Voir le calendrier", href: L.sessions },
      title: "Trouvez votre formation",
      links: [["cal", "Prochaines sessions", L.sessions], ["cert", "Formations certifiantes", L.catalog], ["grid", "Formations par domaine", L.catalog], ["briefcase", "Formations métier", L.catalog], ["building", "Formations en intra-entreprise", L.devis], ["laptop", "Plateforme e-learning", "#"], ["star", "Nos événements", "#"]],
      foot: ["book", "Catalogue 2026-2027 en PDF", "#"]
    },
    {
      id: "certifications", label: "Certifications", certifications: true,
      feature: { icon: "cert", title: "Valorisez vos compétences.", text: "Découvrez les certifications reconnues dans votre domaine et préparez l'examen avec nos formateurs.", cta: "Voir les certifications", href: L.catalog },
      title: "Choisissez votre domaine de certification"
    },
    {
      id: "entreprises", label: "Entreprises", featureLast: true,
      feature: { icon: "users", title: "Un projet pour vos équipes ?", text: "Programme, dates et lieu adaptés à votre organisation, dans vos locaux ou en classe virtuelle.", cta: "Demander un devis", href: L.devis },
      title: "Formez vos équipes",
      links: [["building", "Formation intra-entreprise", L.devis], ["tasks", "Plan de formation sur mesure", L.devis], ["file", "Demander un devis", L.devis], ["hand", "Devenir partenaire", L.contact]]
    },
    {
      id: "ressources", label: "Ressources", catalogue: true,
      title: "Vos ressources pour progresser",
      links: [["book", "Catalogue en PDF", "#"], ["news", "Blog : actualités des normes", "#"], ["help", "Questions fréquentes", "#"], ["laptop", "Plateforme e-learning", "#"], ["user", "Créer son compte candidat", L.contact]]
    },
    {
      id: "apropos", label: "À propos",
      feature: { icon: "chat", title: "Parlons de votre projet.", text: "Contactez notre équipe pour être accompagné dans votre projet de formation.", cta: "Contacter BostonSolux", href: L.contact },
      title: "Découvrez BostonSolux Academy",
      links: [["building", "Qui sommes-nous", "#"], ["users", "Nos formateurs", "#"], ["cert", "Accréditations et partenaires", L.partners], ["star", "Nos références", L.refs], ["pin", "Nos bureaux", L.contact], ["chat", "Témoignages", L.voices], ["mail", "Nous contacter", L.contact]]
    }
  ];

  /* ---------- Rendu desktop ---------- */
  const featureHTML = (f) => `<a class="m-feature" href="${esc(f.href)}">
      <span class="m-feature__art">${f.img ? `<img src="${esc(f.img)}" alt="" loading="lazy">` : ic(f.icon)}</span>
      <h2>${esc(f.title)}</h2><p>${esc(f.text)}</p><span class="m-cta">${esc(f.cta)} →</span></a>`;
  const linksHTML = (links) => `<ul class="m-links">${links.map(([i, t, h]) => `<li><a href="${esc(h)}">${ic(i)}${esc(t)}</a></li>`).join("")}</ul>`;
  const catalogueHTML = () => `<a class="m-feature m-feature--light" href="#">
      <span><h2>Explorez notre catalogue.</h2><p>Retrouvez tous nos domaines de formation et choisissez le parcours qui vous correspond.</p><span class="m-cta">Télécharger le catalogue →</span></span>
      <span class="m-book" aria-hidden="true"><b>Catalogue des formations</b><i></i><span>BostonSolux Academy<br>2026-2027</span></span></a>`;
  function certsHTML(d) {
    const cs = certsOf(d), cert = cs.filter((c) => c.code);
    const list = (cert.length ? cert : cs).slice(0, 8);
    return `<div class="is-in"><ul>${list.map((c) => `<li><a href="${esc(L.catalog)}" data-open="${c.id}"><b>${esc(codeOf(c) || "Atelier")}</b><span>${esc(c.code ? c.title : c.full)}</span></a></li>`).join("")}</ul>
      ${cert.length ? "" : "<p>Formations métier avec attestation de fin de formation.</p>"}</div>`;
  }
  function panelHTML(m) {
    const content = `<div class="m-content"><p class="m-label">${esc(m.title)}</p>${
      m.certifications
        ? `<ul class="m-links" role="tablist" aria-label="Domaines">${BSA.domains.map((d, i) => `<li><button type="button" role="tab" data-domain="${d.id}" aria-selected="${i === 0}">${ic(domainIcon[d.id] || "cert")}${esc(d.name)}${ic("right", "m-chev")}</button></li>`).join("")}</ul>`
        : linksHTML(m.links)
    }${m.foot ? `<div class="m-foot"><a href="${esc(m.foot[2])}">${ic(m.foot[0])}${esc(m.foot[1])}</a></div>` : ""}</div>`;
    const feature = m.catalogue ? catalogueHTML() : m.feature ? featureHTML(m.feature) : "";
    const certs = m.certifications && BSA.domains.length ? `<div class="m-certs" role="tabpanel" aria-live="polite">${certsHTML(BSA.domains[0].id)}</div>` : "";
    return `<div class="m-panel" id="mp-${m.id}" role="region" aria-label="${esc(m.label)}">
      <button type="button" class="m-close" aria-label="Fermer le menu ${esc(m.label)}">×</button>
      ${m.featureLast || m.catalogue ? content + feature : feature + content + certs}</div>`;
  }

  const topHTML = `<div class="m-top"><div class="wrap m-top__in">
      <p class="m-phones"><a href="tel:+12403423141">${ic("phone")}+1 240 342 3141</a><span class="m-sep">/</span><a href="tel:+22891061873">+228 91 06 18 73</a><span class="m-hide-sm"><span class="m-sep"> / </span></span><a class="m-more m-hide-sm" href="${esc(L.contact)}">${ic("plus")}Autres téléphones</a></p>
      <div class="m-top__right">
        <button type="button" class="m-search" aria-label="Rechercher une formation sur le site">${ic("search")}</button>
        <div class="m-langs"><a href="#" aria-current="true">${flagFR}<span>FR</span></a><a href="#">${flagEN}<span>EN</span></a></div>
      </div></div></div>`;
  const barHTML = `<header class="m-bar" id="nav"><div class="wrap m-bar__in">
      <a class="m-logo" href="${esc(L.home)}"><img src="${esc(base)}logo-bs-academy.png" alt="BostonSolux Academy, Excellence in Training" width="1114" height="150"></a>
      <nav aria-label="Navigation principale"><ul class="m-menu">${MENU.map((m) => m.id
        ? `<li class="m-item" data-id="${m.id}"><button type="button" class="m-link" aria-expanded="false" aria-controls="mp-${m.id}">${esc(m.label)}</button>${panelHTML(m)}</li>`
        : `<li class="m-item"><a class="m-link" href="${esc(m.href)}"${m.current ? ' aria-current="page"' : ""}>${esc(m.label)}</a></li>`).join("")}</ul></nav>
      <button type="button" class="m-burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="m-drawer">${ic("menu")}</button>
    </div></header>`;

  /* ---------- Rendu mobile (tiroir) ---------- */
  const subLinks = (m) => m.certifications
    ? BSA.domains.map((d) => `<li><span>${ic(domainIcon[d.id] || "cert")}<b>${esc(d.name)}</b></span></li>${certsOf(d.id).filter((c) => c.code).map((c) => `<li><a href="${esc(L.catalog)}" data-open="${c.id}">${esc(c.full)}</a></li>`).join("")}`).join("")
    : (m.catalogue ? [] : []).concat(m.links || []).map(([i, t, h]) => `<li><a href="${esc(h)}">${ic(i)}${esc(t)}</a></li>`).join("");
  const drawerHTML = `<div class="m-veil" data-close></div>
    <aside class="m-drawer" id="m-drawer" aria-label="Menu" aria-hidden="true">
      <div class="m-drawer__head"><button type="button" class="m-drawer__close" data-close aria-label="Fermer le menu">${ic("close")}</button>Menu</div>
      <div class="m-pages">
        <div class="m-page" data-page="root"><ul>${MENU.map((m) => m.id
          ? `<li><a href="#" data-go="${m.id}">${esc(m.label)}</a><button type="button" class="m-next" data-go="${m.id}" aria-label="Ouvrir ${esc(m.label)}">${ic("right")}</button></li>`
          : `<li><a href="${esc(m.href)}">${esc(m.label)}</a></li>`).join("")}</ul></div>
        ${MENU.filter((m) => m.id).map((m) => `<div class="m-page" data-page="${m.id}" data-pos="right">
          <button type="button" class="m-back" data-back>${ic("left")}${esc(m.label)}</button>
          <ul>${subLinks(m)}</ul>
          ${m.feature ? `<div class="m-page__cta"><a href="${esc(m.feature.href)}">${esc(m.feature.cta)}</a></div>` : ""}
        </div>`).join("")}
      </div>
    </aside>`;

  host.outerHTML = topHTML + barHTML;
  document.body.insertAdjacentHTML("beforeend", drawerHTML);

  /* ---------- Comportement desktop ---------- */
  const bar = document.getElementById("nav");
  const items = [...bar.querySelectorAll(".m-item[data-id]")];
  let openItem = null, tOpen = 0, tClose = 0;
  function place(li) {
    const panel = li.querySelector(".m-panel"), inner = bar.querySelector(".m-bar__in");
    const lr = li.querySelector(".m-link").getBoundingClientRect(), ir = inner.getBoundingClientRect();
    const maxLeft = document.documentElement.clientWidth - 16 - ir.left - panel.offsetWidth;
    panel.style.setProperty("--px", Math.max(-ir.left + 16, Math.min(lr.left - ir.left, maxLeft)) + "px");
  }
  function open(li) {
    if (openItem === li) return;
    closeAll();
    place(li);
    li.classList.add("is-open");
    li.querySelector(".m-link").setAttribute("aria-expanded", "true");
    openItem = li;
  }
  function closeAll() {
    items.forEach((li) => { li.classList.remove("is-open"); li.querySelector(".m-link").setAttribute("aria-expanded", "false"); });
    openItem = null;
  }
  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  items.forEach((li) => {
    const btn = li.querySelector(".m-link");
    if (canHover) {
      li.addEventListener("pointerenter", () => { clearTimeout(tClose); clearTimeout(tOpen); tOpen = setTimeout(() => open(li), openItem ? 0 : 90); });
      li.addEventListener("pointerleave", () => { clearTimeout(tOpen); tClose = setTimeout(closeAll, 220); });
    }
    btn.addEventListener("click", () => (openItem === li ? closeAll() : open(li)));
    li.querySelector(".m-close").addEventListener("click", () => { closeAll(); btn.focus(); });
    li.addEventListener("focusout", (e) => { if (!li.contains(e.relatedTarget)) { if (openItem === li) closeAll(); } });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && openItem) { const b = openItem.querySelector(".m-link"); closeAll(); b.focus(); }
  });
  document.addEventListener("pointerdown", (e) => { if (openItem && !openItem.contains(e.target)) closeAll(); });
  bar.addEventListener("click", (e) => { if (e.target.closest(".m-panel a")) closeAll(); });
  addEventListener("resize", () => openItem && place(openItem));

  // Certifications : le domaine survolé ou choisi affiche ses certifications
  const certBox = bar.querySelector(".m-certs");
  bar.querySelectorAll("[data-domain]").forEach((b) => {
    const show = () => {
      if (b.getAttribute("aria-selected") === "true") return;
      bar.querySelectorAll("[data-domain]").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
      certBox.innerHTML = certsHTML(b.dataset.domain);
    };
    b.addEventListener("pointerenter", show);
    b.addEventListener("focus", show);
    b.addEventListener("click", show);
  });

  // Barre ombrée dès qu'on défile
  const onScroll = () => bar.classList.toggle("is-scrolled", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Bouton de recherche : remonte au champ de recherche du header
  document.querySelector(".m-search").addEventListener("click", () => {
    const q = document.querySelector(cfg.search || "#q");
    window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    if (q) setTimeout(() => q.focus({ preventScroll: true }), 350);
  });

  /* ---------- Comportement mobile ---------- */
  const drawer = document.getElementById("m-drawer"), burger = bar.querySelector(".m-burger");
  const pages = [...drawer.querySelectorAll(".m-page")];
  function showPage(id) {
    pages.forEach((p) => p.setAttribute("data-pos", p.dataset.page === id ? "" : p.dataset.page === "root" ? "left" : "right"));
    const pg = pages.find((p) => p.dataset.page === id);
    const f = pg && pg.querySelector("button, a");
    if (f) f.focus({ preventScroll: true });
  }
  function setDrawer(on) {
    document.body.classList.toggle("m-open", on);
    drawer.setAttribute("aria-hidden", String(!on));
    burger.setAttribute("aria-expanded", String(on));
    if (on) showPage("root"); else burger.focus({ preventScroll: true });
  }
  burger.addEventListener("click", () => setDrawer(true));
  document.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", () => setDrawer(false)));
  drawer.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (go) { e.preventDefault(); showPage(go.dataset.go); return; }
    if (e.target.closest("[data-back]")) { showPage("root"); return; }
    if (e.target.closest(".m-page a")) setDrawer(false);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("m-open")) setDrawer(false); });
})();
