(() => {
  const { domains, courses, sessions, news, testimonials, references, partners } = window.BSA;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const A = (p) => "../" + p; // les données pointent vers maquette/
  const byId = Object.fromEntries(courses.map((c) => [c.id, c]));
  const G = window.gsap;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const motion = !!G && !reduced;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const icon = (n) => `<svg class="ic" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  if (G) G.registerPlugin(ScrollTrigger, SplitText, Flip);

  /* ===== Dates ===== */
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const parse = (d) => new Date(d + "T00:00:00");
  const fmtDay = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" });
  const fmtLong = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const fmtMonth = new Intl.DateTimeFormat("fr-FR", { month: "long" });
  const fmtFull = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  const daysUntil = (d) => Math.round((parse(d) - today) / 864e5);
  const range = (s) => `${parse(s.start).getDate()}–${fmtFull.format(parse(s.end))}`;
  const length = (s) => Math.round((parse(s.end) - parse(s.start)) / 864e5) + 1;
  const soonLabel = (n) => (n <= 0 ? "En cours" : n === 1 ? "Débute demain" : `Débute dans ${n} jours`);
  const upcoming = sessions.filter((s) => daysUntil(s.end) >= 0).sort((a, b) => a.start.localeCompare(b.start));
  const nextFor = (id) => upcoming.find((s) => s.course === id);
  const codeLabel = (c) => {
    if (!c.code) return "";
    if (/^IS[OA]/.test(c.pre)) return c.code;
    if (/ITIL|COBIT/.test(c.pre)) return `${c.pre.replace("®", "")} ${c.code}`;
    if (/PRINCE2/.test(c.pre)) return "PRINCE2";
    if (c.code === "DSF") return "Data Science";
    return c.code;
  };
  const shortRef = (n) => n.ref.replace(/:\d{4}.*$/, "").replace("®", "").replace("Version ", "V");

  /* ===== Intro : éléments masqués jusqu'à l'animation d'entrée ===== */
  const introEls = $$("[data-intro]");
  if (motion) G.set(introEls, { autoAlpha: 0 });
  document.documentElement.classList.remove("js-intro");

  /* ===== Recherche rapide ===== */
  const form = $("#search"), input = $("#q"), panel = $("#results-panel"), list = $("#results"), count = $("#results-count");
  let hits = [], active = -1;
  function score(c, q) {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    const hay = norm(`${c.pre} ${c.code} ${c.full} ${c.body} ${c.kw}`);
    let s = 0;
    for (const t of terms) {
      if (!hay.includes(t)) return 0;
      s += norm(c.code).startsWith(t) ? 10 : norm(c.full).includes(t) ? 4 : 1;
    }
    return s + (nextFor(c.id) ? 1 : 0);
  }
  function highlight(text, q) {
    const t = norm(q).trim(), i = t ? norm(text).indexOf(t) : -1;
    if (i < 0) return esc(text);
    return esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + t.length)) + "</mark>" + esc(text.slice(i + t.length));
  }
  function render() {
    const q = input.value.trim();
    if (!q) return close();
    hits = courses.map((c) => [c, score(c, q)]).filter(([, s]) => s > 0).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([c]) => c);
    panel.hidden = false;
    input.setAttribute("aria-expanded", "true");
    if (!hits.length) {
      count.textContent = "";
      list.innerHTML = `<li class="search__empty"><p>Aucune formation ne correspond à « ${esc(q)} ».</p><p>Essayez un numéro de norme (27001, 62443) ou un thème (risques, cloud). Pour un besoin spécifique, <a href="#devis">demandez une formation sur mesure</a>.</p></li>`;
      return;
    }
    count.textContent = `${hits.length} formation${hits.length > 1 ? "s" : ""}. Entrée pour ouvrir.`;
    list.innerHTML = hits.map((c, i) => {
      const n = nextFor(c.id);
      return `<li><div class="result" role="option" id="opt-${i}" data-id="${c.id}" aria-selected="false">
        <span class="result__code">${c.code ? `<small>${esc(c.pre)}</small>${esc(c.code)}` : "<small>Atelier</small>"}</span>
        <span class="result__title">${highlight(c.full, q)}</span>
        <span class="result__meta">${esc(domains.find((d) => d.id === c.d).name)}</span>
        <span class="result__next">${n ? `<strong>${esc(n.city)}</strong>${fmtDay.format(parse(n.start))}` : "Sur demande"}</span>
      </div></li>`;
    }).join("");
    setActive(0);
  }
  function setActive(i) {
    active = i;
    $$(".result", list).forEach((el, k) => el.setAttribute("aria-selected", String(k === i)));
    const el = $(`#opt-${i}`);
    if (el) { input.setAttribute("aria-activedescendant", el.id); el.scrollIntoView({ block: "nearest" }); }
  }
  function close() {
    panel.hidden = true; hits = []; active = -1;
    input.setAttribute("aria-expanded", "false"); input.removeAttribute("aria-activedescendant");
  }
  function choose(c) {
    close();
    const s = nextFor(c.id);
    if (s) {
      setCity("all");
      const ev = $(`#ev-${c.id}`);
      scrollToEl($("#sessions"), () => {
        sessionList.scrollTo({ left: ev.offsetLeft - parseFloat(getComputedStyle(sessionList).paddingLeft), behavior: reduced ? "auto" : "smooth" });
        setTimeout(() => flash(ev.querySelector(".session__card")), reduced ? 0 : 450);
      });
    } else {
      $("#devis-formation").value = c.full;
      scrollToEl($("#devis"), () => $("#devis-form").email.focus({ preventScroll: true }));
    }
  }
  function scrollToEl(el, done) {
    const y = el.getBoundingClientRect().top + scrollY - 110;
    window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
    setTimeout(done, reduced ? 0 : 700);
  }
  function flash(el) {
    if (!el) return;
    if (motion) G.fromTo(el, { boxShadow: "0 0 0 4px rgba(221,156,107,1)" }, { boxShadow: "0 0 0 0px rgba(221,156,107,0)", duration: 1.6, ease: "power2.out", clearProps: "boxShadow" });
  }
  input.addEventListener("input", render);
  input.addEventListener("focus", () => input.value.trim() && render());
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" && hits.length) { e.preventDefault(); setActive((active + 1) % hits.length); }
    else if (e.key === "ArrowUp" && hits.length) { e.preventDefault(); setActive((active - 1 + hits.length) % hits.length); }
    else if (e.key === "Escape") close();
  });
  form.addEventListener("submit", (e) => { e.preventDefault(); if (!input.value.trim()) return input.focus(); if (hits[active]) choose(hits[active]); });
  list.addEventListener("pointerdown", (e) => { const el = e.target.closest(".result"); if (el) { e.preventDefault(); choose(byId[el.dataset.id]); } });
  list.addEventListener("pointermove", (e) => { const el = e.target.closest(".result"); if (el) { const i = $$(".result", list).indexOf(el); if (i !== active) setActive(i); } });
  document.addEventListener("pointerdown", (e) => { if (!form.contains(e.target)) close(); });
  $$(".finder__chips button").forEach((b) => b.addEventListener("click", () => { input.value = b.dataset.q; input.focus(); render(); }));

  /* ===== Header : diaporama des actualités ===== */
  const ROTATE = 7000;
  const hero = $("#hero"), slidesBox = $("#hero-slides"), dotsBox = $("#hero-dots");
  const story = { ref: $("#story-ref"), status: $("#story-status"), date: $("#story-date"), title: $("#story-title"), teaser: $("#story-teaser"), read: $("#story-read"), course: $("#story-course") };
  slidesBox.innerHTML = news.map((n, i) => `<div class="slide${i ? "" : " is-on"}"><img src="${esc(A(n.img))}" alt="" decoding="async"></div>`).join("");
  dotsBox.style.setProperty("--n", news.length);
  dotsBox.innerHTML = news.map((n, i) => `<li><button type="button" data-i="${i}" aria-label="${esc(n.title)}"${i ? "" : ' aria-current="true"'}><span class="dots__label">${esc(shortRef(n))}</span><span class="dots__track"><span class="dots__fill"></span></span></button></li>`).join("");
  $("#hero-total").textContent = String(news.length).padStart(2, "0");
  const slideEls = $$(".slide", slidesBox), fills = $$(".dots__fill", dotsBox), dotBtns = $$("button", dotsBox);
  let cur = 0, busy = false, progress = null, titleSplit = null;
  const pause = { user: reduced, hover: false, focus: false, view: false, hidden: false };

  function fillText(i) {
    const n = news[i], c = byId[n.course], s = nextFor(n.course);
    if (titleSplit) { titleSplit.revert(); titleSplit = null; } // sinon revert() remettrait l'ancien titre
    story.ref.textContent = n.ref;
    story.status.textContent = n.status;
    story.date.textContent = fmtLong.format(parse(n.date));
    story.date.dateTime = n.date;
    story.title.textContent = n.title;
    story.teaser.textContent = n.teaser || n.text;
    story.read.href = "#";
    story.read.setAttribute("aria-label", `Lire l'article : ${n.title}`);
    story.course.textContent = s ? `Formation ${codeLabel(c) || c.full} : ${s.city}, ${fmtDay.format(parse(s.start))}` : "Voir la formation";
    story.course.dataset.course = c.id;
    $("#hero-index").textContent = String(i + 1).padStart(2, "0");
    dotBtns.forEach((b, k) => b.setAttribute("aria-current", String(k === i)));
  }
  function textIn() {
    if (!motion) return;
    titleSplit = SplitText.create(story.title, { type: "lines", mask: "lines" });
    const tl = G.timeline();
    tl.from(story.ref.parentElement.children, { y: 14, autoAlpha: 0, duration: 0.6, ease: "expo.out", stagger: 0.05 }, 0)
      .from(titleSplit.lines, { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.05)
      .from(story.teaser, { y: 18, autoAlpha: 0, duration: 0.8, ease: "expo.out" }, 0.25)
      .from(".story__actions > *", { y: 18, autoAlpha: 0, duration: 0.7, ease: "expo.out", stagger: 0.06 }, 0.35);
    return tl;
  }
  function setFills(i) { fills.forEach((f, k) => (motion ? G.set(f, { scaleX: k < i ? 1 : 0 }) : (f.style.transform = `scaleX(${k < i ? 1 : 0})`))); }
  function startProgress() {
    if (!motion) return;
    if (progress) progress.kill();
    progress = G.fromTo(fills[cur], { scaleX: 0 }, { scaleX: 1, duration: ROTATE / 1000, ease: "none", paused: true, onComplete: () => go(cur + 1, 1) });
    sync();
  }
  function sync() {
    const run = !Object.values(pause).some(Boolean);
    if (progress) run ? progress.play() : progress.pause();
    $("#hero-toggle").innerHTML = icon(pause.user ? "play" : "pause");
    $("#hero-toggle").setAttribute("aria-label", pause.user ? "Reprendre le défilement" : "Mettre en pause le défilement");
  }
  function kenBurns(slide) {
    if (!motion) return;
    G.fromTo(slide.querySelector("img"), { scale: 1.08 }, { scale: 1, duration: ROTATE / 1000 + 1.2, ease: "none", overwrite: "auto" });
  }
  function go(next, dir = 1) {
    next = (next + news.length) % news.length;
    if (next === cur || busy) return;
    const a = slideEls[cur], b = slideEls[next];
    if (!motion) {
      a.classList.remove("is-on"); b.classList.add("is-on");
      cur = next; fillText(cur); setFills(cur); return;
    }
    busy = true;
    const aImg = a.querySelector("img"), bImg = b.querySelector("img");
    b.classList.add("is-on");
    G.set(b, { zIndex: 2 }); G.set(a, { zIndex: 1 });
    const tl = G.timeline({
      onComplete: () => { a.classList.remove("is-on"); G.set(a, { clearProps: "zIndex,clipPath" }); G.set(aImg, { xPercent: 0 }); busy = false; }
    });
    tl.fromTo(b, { clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "expo.inOut" }, 0)
      .fromTo(bImg, { scale: 1.22, xPercent: dir * 6 }, { scale: 1.08, xPercent: 0, duration: 1.15, ease: "expo.inOut" }, 0)
      .to(aImg, { xPercent: -dir * 12, duration: 1.15, ease: "expo.inOut" }, 0)
      .add(() => kenBurns(b));
    // le texte sort, change, puis entre ligne par ligne
    G.to([story.ref.parentElement, story.title, story.teaser, ".story__actions"], {
      y: -12, autoAlpha: 0, duration: 0.35, ease: "power2.out", stagger: 0.03,
      onComplete: () => {
        fillText(next);
        G.set([story.ref.parentElement, story.title, story.teaser, ".story__actions"], { clearProps: "transform,opacity,visibility" });
        textIn();
      }
    });
    cur = next;
    setFills(cur);
    startProgress();
  }
  $("#hero-next").addEventListener("click", () => go(cur + 1, 1));
  $("#hero-prev").addEventListener("click", () => go(cur - 1, -1));
  $("#hero-toggle").addEventListener("click", () => { pause.user = !pause.user; sync(); });
  dotsBox.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) go(+b.dataset.i, +b.dataset.i > cur ? 1 : -1); });
  hero.addEventListener("keydown", (e) => {
    if (e.target.closest("input")) return;
    if (e.key === "ArrowRight") go(cur + 1, 1);
    if (e.key === "ArrowLeft") go(cur - 1, -1);
  });
  [$("#story"), $("#finder")].forEach((el) => {
    el.addEventListener("pointerenter", () => { pause.hover = true; sync(); });
    el.addEventListener("pointerleave", () => { pause.hover = false; sync(); });
  });
  $("#finder").addEventListener("focusin", () => { pause.focus = true; sync(); });
  $("#finder").addEventListener("focusout", (e) => { if (!$("#finder").contains(e.relatedTarget)) { pause.focus = false; sync(); } });
  document.addEventListener("visibilitychange", () => { pause.hidden = document.hidden; sync(); });
  // balayage au doigt
  let sx = null;
  hero.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse" && !e.target.closest(".finder")) sx = e.clientX; });
  hero.addEventListener("pointerup", (e) => { if (sx == null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); });
  $("#story-course").addEventListener("click", (e) => {
    const c = byId[e.currentTarget.dataset.course];
    if (c) { e.preventDefault(); choose(c); }
  });

  fillText(0);
  setFills(0);

  /* ===== Nos références ===== */
  const row = $("#refs-row");
  const refItem = (ref, dup) => `<li${dup ? ' aria-hidden="true"' : ""}${ref.text ? ' class="marquee__lockup"' : ""}><img src="${esc(A(ref.logo || `img/references/${ref.id}.png`))}" alt="${dup || ref.text ? "" : esc(ref.name)}" decoding="async">${ref.text ? `<span>${esc(ref.text)}</span>` : ""}</li>`;
  row.innerHTML = references.map((r) => refItem(r, false)).join("") + (motion ? references.map((r) => refItem(r, true)).join("") : "");

  /* ===== Domaines ===== */
  const ghosts = { iso: "27001", ot: "62443", gov: "ITIL", pm: "PMP", net: "CCNA", mgmt: "LEAD" };
  $("#domains-track").innerHTML = domains.map((d) => {
    const cs = courses.filter((c) => c.d === d.id), cert = cs.filter((c) => c.body).length;
    const codes = [...new Set(cs.map(codeLabel).filter(Boolean))];
    return `<li class="panel" id="panel-${d.id}">
      <span class="panel__ghost" aria-hidden="true">${ghosts[d.id]}</span>
      <p class="panel__count">${cs.length} formations${cert ? (cert === cs.length ? ", toutes certifiantes" : `, dont ${cert} certifiantes`) : ""}</p>
      <h3>${esc(d.name)}</h3>
      ${codes.length ? `<div class="panel__codes">${codes.map((c) => `<span>${esc(c)}</span>`).join("")}</div>` : ""}
      <ul class="panel__list">${cs.slice(0, codes.length ? 4 : 6).map((c) => `<li>${esc(c.full)}</li>`).join("")}</ul>
      <a class="panel__more" href="#">Voir les ${cs.length} formations ${icon("arrow")}</a>
    </li>`;
  }).join("");

  /* ===== Prochaines sessions : carrousel de cartes ===== */
  const sessionList = $("#session-list");
  sessionList.innerHTML = upcoming.map((s) => {
    const c = byId[s.course], a = parse(s.start), n = daysUntil(s.start);
    return `<li class="session" id="ev-${c.id}" data-city="${esc(s.city)}"><article class="session__card">
      <div class="session__top">
        <span class="session__logo">${c.logo ? `<img src="${esc(A(c.logo))}" alt="" loading="lazy" draggable="false">` : `<b>${esc(codeLabel(c))}</b>`}</span>
        <span class="session__date"><b>${String(a.getDate()).padStart(2, "0")}</b>${esc(fmtMonth.format(a))}</span>
      </div>
      <h3>${esc(s.title)}</h3>
      <p class="session__domain">${esc(domains.find((d) => d.id === c.d).name)}</p>
      <ul class="session__facts">
        <li>${icon("pin")}<span>${esc(s.city)}, ${esc(s.country)}${s.venue ? ` (${esc(s.venue)})` : ""}</span></li>
        <li>${icon("cal")}<span>${range(s)}, ${length(s)} jours</span></li>
      </ul>
      <p class="session__soon"${n <= 7 ? " data-urgent" : ""}><i aria-hidden="true"></i>${soonLabel(n)}, places disponibles</p>
      <div class="session__cta"><a class="btn btn--red" href="#devis" data-enrol="${c.id}">S'inscrire</a><a class="btn btn--line" href="#">Programme</a></div>
    </article></li>`;
  }).join("");

  const prevBtn = $("#sessions-prev"), nextBtn = $("#sessions-next"), countEl = $("#sessions-count"), barEl = $("#sessions-progress");
  const shown = () => $$(".session", sessionList).filter((el) => !el.hidden);
  const gapPx = () => parseFloat(getComputedStyle(sessionList).columnGap) || 0;
  const stepPx = () => { const c = shown()[0]; return c ? c.offsetWidth + gapPx() : 0; }; // largeur de mise en page, insensible aux animations
  function updateCarousel() {
    const total = shown().length, s = stepPx() || 1;
    const per = Math.min(total, Math.max(1, Math.floor((sessionList.clientWidth + gapPx() + 4) / s)));
    const max = sessionList.scrollWidth - sessionList.clientWidth;
    const first = Math.min(total - per, Math.round(sessionList.scrollLeft / s));
    countEl.textContent = !total ? "Aucune session" : per >= total ? `${total} session${total > 1 ? "s" : ""}` : per === 1 ? `${first + 1} sur ${total}` : `${first + 1}–${first + per} sur ${total}`;
    prevBtn.disabled = sessionList.scrollLeft <= 6;
    nextBtn.disabled = sessionList.scrollLeft >= max - 6;
    const f = Math.min(1, sessionList.clientWidth / Math.max(1, sessionList.scrollWidth));
    barEl.style.width = f * 100 + "%";
    barEl.style.transform = `translateX(${max > 0 ? ((sessionList.scrollLeft / max) * (1 - f) / f) * 100 : 0}%)`;
  }
  const slide = (dir) => sessionList.scrollBy({ left: dir * stepPx(), behavior: reduced ? "auto" : "smooth" });
  prevBtn.addEventListener("click", () => slide(-1));
  nextBtn.addEventListener("click", () => slide(1));
  let raf = 0;
  sessionList.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(updateCarousel); }, { passive: true });
  addEventListener("resize", updateCarousel);
  // glisser à la souris (le tactile utilise le défilement natif)
  let drag = null;
  sessionList.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag = { x: e.clientX, left: sessionList.scrollLeft, moved: false };
  });
  addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 5) { drag.moved = true; sessionList.classList.add("is-dragging"); }
    if (drag.moved) sessionList.scrollLeft = drag.left - dx;
  });
  addEventListener("pointerup", () => {
    if (!drag) return;
    const moved = drag.moved; drag = null;
    if (!moved) return;
    const s = stepPx() || 1;
    const target = Math.round(sessionList.scrollLeft / s) * s; // se cale sur la carte la plus proche
    sessionList.classList.remove("is-dragging");
    sessionList.scrollTo({ left: target, behavior: reduced ? "auto" : "smooth" });
  });

  const cities = [...new Set(upcoming.map((s) => s.city))];
  $("#city-filters").innerHTML = [["all", "Toutes", upcoming.length], ...cities.map((c) => [c, c, upcoming.filter((s) => s.city === c).length])]
    .map(([v, l, n], i) => `<button type="button" data-city="${esc(v)}" aria-pressed="${i === 0}">${esc(l)}<span>${n}</span></button>`).join("");
  function setCity(city) {
    const btns = $$("#city-filters button");
    if (btns.find((b) => b.dataset.city === city)?.getAttribute("aria-pressed") === "true") return;
    btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.city === city)));
    const items = $$(".session", sessionList);
    const state = motion ? Flip.getState(items) : null;
    items.forEach((el) => (el.hidden = city !== "all" && el.dataset.city !== city));
    sessionList.scrollLeft = 0;
    if (motion) {
      Flip.from(state, {
        duration: 0.6, ease: "power3.inOut", absolute: true, scale: true,
        onEnter: (els) => G.fromTo(els, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "expo.out", stagger: 0.06 }),
        onLeave: (els) => G.to(els, { autoAlpha: 0, y: 20, duration: 0.3, ease: "power2.out" }),
        onComplete: updateCarousel
      });
    }
    updateCarousel();
  }
  $("#city-filters").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) setCity(b.dataset.city); });
  updateCarousel();
  addEventListener("load", updateCarousel);

  /* ===== Engagement ===== */
  $$(".card").forEach((c, i) => c.style.setProperty("--i", i));

  /* ===== Témoignages ===== */
  const voices = $(".voices"), quote = $("#quote"), people = $("#voices-people");
  let vCur = 0, quoteSplit = null;
  people.innerHTML = testimonials.map((t, i) => `<li><button type="button" data-i="${i}" aria-current="${i === 0}"><b>${esc(t.name)}</b><span>${esc(t.role)}</span></button></li>`).join("");
  function showQuote(i, animate) {
    vCur = (i + testimonials.length) % testimonials.length;
    const t = testimonials[vCur];
    const put = () => {
      if (quoteSplit) { quoteSplit.revert(); quoteSplit = null; }
      quote.innerHTML = `<span class="quote__mark" aria-hidden="true">“</span><blockquote><p>${esc(t.text)}</p></blockquote><figcaption><b>${esc(t.name)}</b>${esc(t.role)}. Formation ${esc(t.course)}</figcaption>`;
      $$("button", people).forEach((b) => b.setAttribute("aria-current", String(+b.dataset.i === vCur)));
      if (motion && animate) {
        quoteSplit = SplitText.create($("blockquote p", quote), { type: "words" });
        G.from(quoteSplit.words, { y: 14, autoAlpha: 0, filter: "blur(4px)", duration: 0.7, ease: "expo.out", stagger: 0.012 });
        G.from([$(".quote__mark", quote), $("figcaption", quote)], { y: 16, autoAlpha: 0, duration: 0.7, ease: "expo.out", stagger: 0.1 });
      }
    };
    if (motion && animate && quote.firstChild) G.to(quote, { autoAlpha: 0, y: -10, duration: 0.25, ease: "power2.out", onComplete: () => { put(); G.set(quote, { autoAlpha: 1, y: 0 }); } });
    else put();
  }
  people.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) showQuote(+b.dataset.i, true); });
  $("#voice-next").addEventListener("click", () => showQuote(vCur + 1, true));
  $("#voice-prev").addEventListener("click", () => showQuote(vCur - 1, true));
  if (motion) people.addEventListener("animationend", (e) => { if (e.animationName === "voiceTimer") showQuote(vCur + 1, true); });
  else voices.classList.add("is-paused");
  voices.addEventListener("pointerenter", () => voices.classList.add("is-paused"));
  voices.addEventListener("pointerleave", () => motion && voices.classList.remove("is-paused"));
  showQuote(0, false);

  /* ===== Partenaires ===== */
  $("#partners-list").innerHTML = partners.map((p) => `<li><img src="${esc(A(p.logo))}" alt="${esc(p.name)}"${p.size ? ` data-size="${p.size}"` : ""} loading="lazy"></li>`).join("");

  /* ===== Liens « S'inscrire » : préremplir le devis ===== */
  document.addEventListener("click", (e) => {
    const en = e.target.closest("[data-enrol]");
    if (en) $("#devis-formation").value = byId[en.dataset.enrol].full;
  });

  /* ===== Formulaires (démo) ===== */
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  $("#devis-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget, msg = $(".form__msg", f), fo = f.formation, em = f.email;
    fo.setAttribute("aria-invalid", String(!fo.value.trim()));
    em.setAttribute("aria-invalid", String(!emailOk(em.value)));
    if (!fo.value.trim()) { msg.textContent = "Indiquez la formation souhaitée."; return fo.focus(); }
    if (!emailOk(em.value)) { msg.textContent = "Saisissez une adresse e-mail valide, par exemple prenom.nom@entreprise.com."; return em.focus(); }
    msg.textContent = `Demande envoyée. Le programme et le devis pour « ${fo.value.trim()} » seront adressés à ${em.value}.`;
    f.reset();
  });
  $("#news-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget, em = $("#news-email"), msg = $(".form__msg", f);
    if (!emailOk(em.value)) { em.setAttribute("aria-invalid", "true"); msg.textContent = "Saisissez une adresse e-mail valide."; return em.focus(); }
    em.setAttribute("aria-invalid", "false");
    msg.textContent = `Abonnement confirmé pour ${em.value}.`;
    f.reset();
  });

  /* ===== En-tête : géré par menu/menu.js ===== */
  const nav = $("#nav");

  if (!motion) {
    /* Sans animation : défilement manuel du header uniquement */
    $("#hero-toggle").hidden = true;
    sync();
    return;
  }

  /* =====================================================================
     MOTION DESIGN (GSAP)
     ===================================================================== */
  const ease = "expo.out";

  // Progression de lecture + navigation qui se rétracte
  G.to("#scroll-progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
  ScrollTrigger.create({
    start: 0, end: "max",
    onUpdate: (self) => {
      const y = self.scroll();
      nav.classList.toggle("is-scrolled", y > 10);
      nav.classList.toggle("is-hidden", self.direction === 1 && y > 500 && !document.body.classList.contains("m-open") && !nav.querySelector(".m-item.is-open"));
    }
  });

  // Titres de section : lignes qui montent
  document.fonts.ready.then(() => {
    $$("[data-split]").forEach((h) => {
      const s = SplitText.create(h, { type: "lines", mask: "lines" });
      G.from(s.lines, { yPercent: 105, duration: 1.1, ease, stagger: 0.09, scrollTrigger: { trigger: h, start: "top 88%", once: true } });
    });

    // Intro du header
    const intro = G.timeline({ defaults: { ease } });
    intro.fromTo(slideEls[0].querySelector("img"), { scale: 1.3 }, { scale: 1.08, duration: 1.8, ease: "expo.out", onComplete: () => kenBurns(slideEls[0]) }, 0)
      .fromTo("#finder", { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1 }, 0.25)
      .fromTo("#story", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 0.35)
      .add(textIn(), 0.35)
      .fromTo(".hero__bar", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 0.7)
      .add(startProgress, 1.2);
  });

  // Header en parallaxe au défilement
  const heroST = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
  G.to(".hero__grid", { yPercent: -14, ease: "none", scrollTrigger: heroST });
  G.to(slidesBox, { yPercent: 14, ease: "none", scrollTrigger: { ...heroST } });
  ScrollTrigger.create({ trigger: hero, start: "top top", end: "bottom 15%", onLeave: () => { pause.view = true; sync(); }, onEnterBack: () => { pause.view = false; sync(); } });

  // Références : défilement continu qui accélère avec le scroll
  const loop = G.to(row, { xPercent: -50, duration: references.length * 1.5, ease: "none", repeat: -1 });
  let boost = 0, slow = false;
  ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => { boost = Math.min(Math.abs(s.getVelocity()) / 250, 7); } });
  G.ticker.add(() => { boost *= 0.93; loop.timeScale(slow ? 0.2 : 1 + boost); });
  row.addEventListener("pointerenter", () => (slow = true));
  row.addEventListener("pointerleave", () => (slow = false));

  // Domaines : section épinglée, défilement horizontal (desktop)
  const mm = G.matchMedia();
  mm.add("(min-width: 901px)", () => {
    const track = $("#domains-track"), section = $(".domains");
    section.classList.add("is-pinned");
    const dist = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
    const tween = G.to(track, {
      x: () => -dist(), ease: "none",
      scrollTrigger: {
        trigger: section, pin: true, start: "top top", end: () => "+=" + dist(), scrub: 0.8, invalidateOnRefresh: true,
        onUpdate: (self) => G.set("#domains-meter", { scaleX: self.progress })
      }
    });
    $$(".panel", track).forEach((p) => {
      G.fromTo(p.querySelector(".panel__ghost"), { xPercent: 30 }, { xPercent: -20, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
    });
    G.from(".panel", { y: 80, autoAlpha: 0, duration: 1.1, ease, stagger: 0.08, scrollTrigger: { trigger: section, start: "top 75%", once: true } });
    G.from(".panel .panel__count, .panel h3, .panel__codes span, .panel__list li", { y: 20, autoAlpha: 0, duration: 0.8, ease, stagger: 0.015, delay: 0.25, scrollTrigger: { trigger: section, start: "top 75%", once: true } });
    return () => section.classList.remove("is-pinned");
  });
  mm.add("(max-width: 900px)", () => {
    const vp = $(".domains__viewport");
    const upd = () => G.set("#domains-meter", { scaleX: vp.scrollLeft / Math.max(1, vp.scrollWidth - vp.clientWidth) });
    vp.addEventListener("scroll", upd, { passive: true });
    return () => vp.removeEventListener("scroll", upd);
  });

  // Sessions : les cartes entrent en cascade, la barre de navigation suit
  G.from(".session", { y: 70, autoAlpha: 0, rotate: 1.5, duration: 1, ease, stagger: 0.1, scrollTrigger: { trigger: "#sessions-carousel", start: "top 85%", once: true } });
  G.from(".carousel__bar > *", { y: 16, autoAlpha: 0, duration: 0.7, ease, stagger: 0.06, delay: 0.3, scrollTrigger: { trigger: "#sessions-carousel", start: "top 85%", once: true } });

  // Engagement : les cartes s'empilent et reculent
  const cards = $$(".card");
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return;
    G.to(card, {
      scale: 1 - (cards.length - 1 - i) * 0.035, ease: "none",
      scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: () => `top ${96 + (i + 1) * 22}px`, scrub: true }
    });
    G.fromTo(card.querySelector("img"), { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top top", scrub: true } });
  });

  // Partenaires : apparition décalée
  G.from("#partners-list li", { y: 40, autoAlpha: 0, duration: 0.9, ease, stagger: 0.08, scrollTrigger: { trigger: "#partners-list", start: "top 88%", once: true } });

  // Footer : bureaux qui s'allument
  G.from(".pin", { scale: 0, autoAlpha: 0, duration: 0.6, ease: "back.out(2)", stagger: 0.12, scrollTrigger: { trigger: ".foot", start: "top 85%", once: true } });

  // CTA : halo qui suit le pointeur
  if (finePointer) {
    const cta = $(".cta");
    cta.addEventListener("pointermove", (e) => {
      const r = cta.getBoundingClientRect();
      G.to(cta, { "--gx": ((e.clientX - r.left) / r.width) * 100 + "%", "--gy": ((e.clientY - r.top) / r.height) * 100 + "%", duration: 0.6, ease: "power3", overwrite: true });
    });

    // Boutons magnétiques
    $$("[data-magnetic]").forEach((el) => {
      const xTo = G.quickTo(el, "x", { duration: 0.4, ease: "power3" }), yTo = G.quickTo(el, "y", { duration: 0.4, ease: "power3" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        xTo(G.utils.clamp(-8, 8, (e.clientX - r.left - r.width / 2) * 0.25));
        yTo(G.utils.clamp(-6, 6, (e.clientY - r.top - r.height / 2) * 0.3));
      });
      el.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
      el.addEventListener("pointerdown", () => G.to(el, { scale: 0.97, duration: 0.1 }));
      el.addEventListener("pointerup", () => G.to(el, { scale: 1, duration: 0.25, ease: "back.out(3)" }));
    });
  }

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
