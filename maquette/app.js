(() => {
  const { domains, courses, sessions, news, testimonials, references, partners } = window.BSA;
  const $ = (s, el = document) => el.querySelector(s);
  const byId = Object.fromEntries(courses.map((c) => [c.id, c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const icon = (name) => `<svg class="ic" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  /* Dates */
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const parse = (d) => new Date(d + "T00:00:00");
  const fmtDay = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" });
  const fmtMonth = new Intl.DateTimeFormat("fr-FR", { month: "long" });
  const fmtFull = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  const daysUntil = (d) => Math.round((parse(d) - today) / 864e5);
  const range = (s) => {
    const a = parse(s.start), b = parse(s.end);
    return `${a.getDate()}–${fmtFull.format(b)}`;
  };
  const length = (s) => Math.round((parse(s.end) - parse(s.start)) / 864e5) + 1;
  const soonLabel = (n) => (n <= 0 ? "En cours" : n === 1 ? "Débute demain" : `Débute dans ${n} jours`);

  const upcoming = sessions.filter((s) => daysUntil(s.end) >= 0).sort((a, b) => a.start.localeCompare(b.start));
  const nextFor = (id) => upcoming.find((s) => s.course === id);

  /* ===== Référence géante ===== */
  const refBox = $(".hero__ref"), refPre = $("#ref-pre"), refNum = $("#ref-num");
  let currentRef = refNum.textContent;
  function showRef(c) {
    if (!c || !c.code) return;
    const code = c.code, pre = c.pre || "";
    if (code === currentRef && refPre.textContent === pre) return;
    currentRef = code;
    refPre.textContent = pre;
    refNum.textContent = code;
    refBox.classList.remove("is-intro");
    refNum.classList.remove("is-swapping");
    if (!reduced) { void refNum.offsetWidth; refNum.classList.add("is-swapping"); }
  }
  refBox.classList.add("is-intro");

  /* ===== Recherche rapide ===== */
  const form = $("#search"), input = $("#q"), panel = $("#results-panel"), list = $("#results"), count = $("#results-count");
  let hits = [], active = -1;

  function score(c, q) {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    const hay = norm(`${c.pre} ${c.code} ${c.full} ${c.body} ${c.kw}`);
    let s = 0;
    for (const t of terms) {
      if (!hay.includes(t)) return 0;
      if (norm(c.code).startsWith(t)) s += 10;
      else if (norm(c.full).includes(t)) s += 4;
      else s += 1;
    }
    if (nextFor(c.id)) s += 1;
    return s;
  }
  function highlight(text, q) {
    const t = norm(q).trim();
    if (!t) return esc(text);
    const i = norm(text).indexOf(t);
    if (i < 0) return esc(text);
    return esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + t.length)) + "</mark>" + esc(text.slice(i + t.length));
  }
  function render() {
    const q = input.value.trim();
    if (!q) return close();
    hits = courses.map((c) => [c, score(c, q)]).filter(([, s]) => s > 0).sort((a, b) => b[1] - a[1]).slice(0, 7).map(([c]) => c);
    active = hits.length ? 0 : -1;
    panel.hidden = false;
    input.setAttribute("aria-expanded", "true");
    if (!hits.length) {
      count.textContent = "";
      list.innerHTML = `<li class="search__empty"><p>Aucune formation ne correspond à « ${esc(q)} ».</p><p>Essayez un numéro de norme (27001, 62443) ou un thème (risques, cloud). Pour un besoin spécifique, <a class="link" href="#devis">demandez une formation sur mesure</a>.</p></li>`;
      return;
    }
    count.textContent = `${hits.length} formation${hits.length > 1 ? "s" : ""}. Entrée pour ouvrir.`;
    list.innerHTML = hits.map((c, i) => {
      const n = nextFor(c.id);
      const domain = domains.find((d) => d.id === c.d).name;
      return `<li><div class="result" role="option" id="opt-${i}" data-id="${c.id}" aria-selected="${i === active}">
        <span class="result__code">${c.code ? `<small>${esc(c.pre)}</small>${esc(c.code)}` : "<small>Atelier</small>"}</span>
        <span class="result__title">${highlight(c.full, q)}</span>
        <span class="result__meta">${esc(domain)}</span>
        <span class="result__next">${n ? `<strong>${esc(n.city)}</strong>${fmtDay.format(parse(n.start))}` : "Sur demande"}</span>
      </div></li>`;
    }).join("");
    setActive(0);
  }
  function setActive(i) {
    active = i;
    list.querySelectorAll(".result").forEach((el, k) => el.setAttribute("aria-selected", String(k === i)));
    const el = $(`#opt-${i}`);
    if (el) { input.setAttribute("aria-activedescendant", el.id); el.scrollIntoView({ block: "nearest" }); showRef(hits[i]); }
  }
  function close() {
    panel.hidden = true; hits = []; active = -1;
    input.setAttribute("aria-expanded", "false"); input.removeAttribute("aria-activedescendant");
  }
  function choose(c) {
    close();
    openCourse(c.id);
  }
  input.addEventListener("input", render);
  input.addEventListener("focus", () => input.value.trim() && render());
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" && hits.length) { e.preventDefault(); setActive((active + 1) % hits.length); }
    else if (e.key === "ArrowUp" && hits.length) { e.preventDefault(); setActive((active - 1 + hits.length) % hits.length); }
    else if (e.key === "Escape") { close(); }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value.trim()) { input.focus(); return; }
    if (hits[active]) choose(hits[active]);
  });
  list.addEventListener("pointerdown", (e) => {
    const el = e.target.closest(".result");
    if (el) { e.preventDefault(); choose(byId[el.dataset.id]); }
  });
  list.addEventListener("pointermove", (e) => {
    const el = e.target.closest(".result");
    if (el) { const i = [...list.querySelectorAll(".result")].indexOf(el); if (i !== active) setActive(i); }
  });
  document.addEventListener("pointerdown", (e) => { if (!form.contains(e.target)) close(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); }
  });
  document.querySelectorAll(".hero__chips button").forEach((b) => {
    b.addEventListener("click", () => { input.value = b.dataset.q; input.focus(); render(); });
    b.addEventListener("pointerenter", () => { const c = courses.find((x) => score(x, b.dataset.q) >= 10); if (c) showRef(c); });
  });

  /* ===== Veille normative : actualités en images ===== */
  const veilleBox = $(".veille"), veille = $("#veille-list"), media = $("#veille-media");
  const ROTATE = 7000;
  veilleBox.style.setProperty("--rotate", `${ROTATE}ms`);
  media.innerHTML = news.map((n, i) => `<img src="${esc(n.img)}" alt="" data-i="${i}" decoding="async"${i ? ' loading="lazy"' : ""}>`).join("");
  let shown = [], current = -1;

  function activate(k) {
    if (!shown.length) return;
    current = (k + shown.length) % shown.length;
    const idx = news.indexOf(shown[current]);
    media.querySelectorAll("img").forEach((im) => im.classList.toggle("is-on", +im.dataset.i === idx));
    veille.querySelectorAll(".news").forEach((el, j) => {
      el.classList.remove("is-active");
      if (j === current) { void el.offsetWidth; el.classList.add("is-active"); }
    });
  }
  function renderNews(f) {
    shown = news.filter((n) => f === "all" || n.f === f).slice(0, 3);
    veille.innerHTML = shown.map((n) => {
      const c = byId[n.course], s = nextFor(n.course);
      const when = s ? `${s.city}, ${range(s)}` : "sur demande";
      return `<li class="news">
        <img class="news__img" src="${esc(n.img)}" alt="" decoding="async">
        <div class="news__body">
          <div class="news__top"><span class="news__ref">${esc(n.ref)}</span><span class="news__status" data-k="${esc(n.status)}">${esc(n.status)}</span><time datetime="${n.date}">${fmtDay.format(parse(n.date))}</time></div>
          <h3><a href="#catalogue" data-open="${c.id}">${esc(n.title)}</a></h3>
          <p>${esc(n.text)}</p>
          <span class="news__course">${icon("cal")}Formation ${esc(c.code ? [c.pre, c.code].join(" ") : c.full)} : ${esc(when)}</span>
        </div>
        <span class="news__timer" aria-hidden="true"></span>
      </li>`;
    }).join("");
    activate(0);
  }
  if (!reduced) {
    veille.addEventListener("animationend", (e) => { if (e.animationName === "newsTimer") activate(current + 1); });
  } else {
    veilleBox.classList.add("is-paused");
  }
  veille.addEventListener("pointerover", (e) => {
    const el = e.target.closest(".news");
    if (!el) return;
    const j = [...veille.children].indexOf(el);
    if (j !== current) activate(j);
    veilleBox.classList.add("is-paused");
  });
  veille.addEventListener("pointerleave", () => { if (!reduced && !veille.contains(document.activeElement)) { veilleBox.classList.remove("is-paused"); activate(current); } });
  veille.addEventListener("focusin", (e) => { const el = e.target.closest(".news"); if (el) { activate([...veille.children].indexOf(el)); veilleBox.classList.add("is-paused"); } });
  veille.addEventListener("focusout", (e) => { if (!reduced && !veille.contains(e.relatedTarget)) { veilleBox.classList.remove("is-paused"); activate(current); } });
  document.addEventListener("visibilitychange", () => { if (!reduced) veilleBox.classList.toggle("is-paused", document.hidden); });

  document.querySelectorAll(".seg button").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll(".seg button").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    veille.classList.remove("is-intro");
    renderNews(b.dataset.f);
  }));
  renderNews("all");
  if (!reduced) {
    veille.classList.add("is-intro");
    veille.querySelectorAll(".news").forEach((n, i) => (n.style.animationDelay = `${300 + i * 60}ms`));
  }

  /* ===== Sessions ===== */
  $("#session-list").innerHTML = upcoming.map((s) => {
    const c = byId[s.course], a = parse(s.start), n = daysUntil(s.start);
    return `<li class="session">
      <div class="session__date"><span class="session__day">${String(a.getDate()).padStart(2, "0")}</span><span class="session__month">${fmtMonth.format(a)}</span></div>
      <div class="session__what">${c.logo ? `<span class="session__logo"><img src="${esc(c.logo)}" alt="" loading="lazy" decoding="async"></span>` : ""}<div><p class="session__ref">${esc(domains.find((d) => d.id === c.d).name)}</p><h3>${esc(s.title)}</h3></div></div>
      <div class="session__where">
        <span>${icon("pin")}${esc(s.city)}, ${esc(s.country)}${s.venue ? ` (${esc(s.venue)})` : ""}</span>
        <span>${icon("cal")}${range(s)}, ${length(s)} jours</span>
        <span class="session__soon"${n <= 7 ? " data-urgent" : ""}>${soonLabel(n)}</span><span class="session__seats">Places disponibles</span>
      </div>
      <div class="session__cta"><a class="btn btn--red" href="#devis" data-enrol="${c.id}">S'inscrire</a><a class="btn btn--line" href="#catalogue" data-open="${c.id}">Programme</a></div>
    </li>`;
  }).join("");

  /* ===== Nos références : défilement sur une ligne ===== */
  const row = $(".marquee__row");
  const refItem = (ref, dup) => `<li${dup ? ' aria-hidden="true"' : ""}><img src="${esc(ref.logo || `img/references/${ref.id}.png`)}" alt="${dup ? "" : esc(ref.name)}" decoding="async"></li>`;
  row.innerHTML = references.map((r) => refItem(r, false)).join("") + (reduced ? "" : references.map((r) => refItem(r, true)).join(""));
  row.style.setProperty("--marquee-dur", `${Math.round(references.length * 1.5)}s`);

  /* ===== Nos partenaires ===== */
  $("#partners-list").innerHTML = partners.map((p) => `<li><img src="${esc(p.logo)}" alt="${esc(p.name)}"${p.size ? ` data-size="${p.size}"` : ""} loading="lazy" decoding="async"></li>`).join("");

  /* ===== Catalogue ===== */
  const tabs = $("#cat-tabs"), body = $("#cat-body"), caption = $("#cat-caption");
  tabs.innerHTML = domains.map((d, i) => {
    const n = courses.filter((c) => c.d === d.id).length;
    return `<button role="tab" id="tab-${d.id}" aria-controls="cat-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-d="${d.id}">${esc(d.name)}<span>${n}</span></button>`;
  }).join("");
  function renderDomain(id) {
    tabs.querySelectorAll("button").forEach((b) => {
      const on = b.dataset.d === id;
      b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1;
    });
    $("#cat-panel").setAttribute("aria-labelledby", `tab-${id}`);
    caption.textContent = domains.find((d) => d.id === id).name;
    body.innerHTML = courses.filter((c) => c.d === id).map((c) => {
      const s = nextFor(c.id);
      return `<tr id="row-${c.id}">
        <td>${c.code ? `<span class="cat__code"><small>${esc(c.pre)}</small>${esc(c.code)}</span>` : `<span class="cat__code cat__code--none">Non certifiante</span>`}</td>
        <td><span class="cat__name">${esc(c.title)}</span></td>
        <td class="hide-sm"><span class="cat__body">${esc(c.body || "Attestation de formation")}</span></td>
        <td class="cat__next">${s ? `<b>${esc(s.city)}</b><em>${range(s)}</em>` : `<em>Sur demande, en intra</em>`}</td>
        <td><a class="link" href="#devis" data-enrol="${c.id}">${s ? "S'inscrire" : "Demander un devis"}</a></td>
      </tr>`;
    }).join("");
  }
  tabs.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) renderDomain(b.dataset.d); });
  tabs.addEventListener("keydown", (e) => {
    const btns = [...tabs.querySelectorAll("button")];
    const i = btns.indexOf(document.activeElement);
    const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (dir == null || i < 0) return;
    e.preventDefault();
    const nb = btns[(i + dir + btns.length) % btns.length];
    nb.focus(); renderDomain(nb.dataset.d);
  });
  renderDomain(domains[0].id);

  function openCourse(id) {
    const c = byId[id];
    renderDomain(c.d);
    const row = $(`#row-${id}`);
    $("#catalogue").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    row.classList.remove("is-flash"); void row.offsetWidth; row.classList.add("is-flash");
    row.querySelector("a").focus({ preventScroll: true });
  }

  /* Liens internes : ouvrir une formation / préremplir le devis */
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]");
    if (o) { e.preventDefault(); openCourse(o.dataset.open); return; }
    const en = e.target.closest("[data-enrol]");
    if (en) { $("#devis-formation").value = byId[en.dataset.enrol].full; }
  });

  /* ===== Témoignages ===== */
  const names = $("#voices-names"), quote = $("#voices-quote");
  names.innerHTML = testimonials.map((t, i) => `<li><button role="tab" aria-selected="${i === 0}" data-i="${i}"><b>${esc(t.name)}</b><span>${esc(t.role)}</span></button></li>`).join("");
  function showQuote(i) {
    const t = testimonials[i];
    names.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", String(+b.dataset.i === i)));
    quote.innerHTML = `<div class="is-in"><blockquote><p>« ${esc(t.text)} »</p></blockquote><figcaption><b>${esc(t.name)}</b><span>${esc(t.role)}. Formation ${esc(t.course)}</span></figcaption></div>`;
  }
  names.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) showQuote(+b.dataset.i); });
  showQuote(0);

  /* ===== Formulaires (démo) ===== */
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  $("#devis-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget, msg = f.querySelector(".form__msg");
    const fo = f.formation, em = f.email;
    fo.setAttribute("aria-invalid", String(!fo.value.trim()));
    em.setAttribute("aria-invalid", String(!emailOk(em.value)));
    if (!fo.value.trim()) { msg.textContent = "Indiquez la formation souhaitée."; fo.focus(); return; }
    if (!emailOk(em.value)) { msg.textContent = "Saisissez une adresse e-mail valide, par exemple prenom.nom@entreprise.com."; em.focus(); return; }
    msg.textContent = `Demande envoyée. Le programme et le devis pour « ${fo.value.trim()} » seront adressés à ${em.value}.`;
    f.reset();
  });
  $("#news-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget, em = $("#news-email"), msg = f.querySelector(".form__msg");
    if (!emailOk(em.value)) { em.setAttribute("aria-invalid", "true"); msg.textContent = "Saisissez une adresse e-mail valide."; em.focus(); return; }
    em.setAttribute("aria-invalid", "false");
    msg.textContent = `Abonnement confirmé pour ${em.value}.`;
    f.reset();
  });

  /* ===== Menu mobile ===== */
  const burger = $(".nav__burger"), menu = $("#menu");
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    burger.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
  });
  menu.addEventListener("click", (e) => { if (e.target.closest("a") && menu.classList.contains("is-open")) burger.click(); });
})();
