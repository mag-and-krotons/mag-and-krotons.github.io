/* Abhijit Singh — research site. Page logic: navigation, tabs, papers, results table, code, citations. */
(function () {
  "use strict";

  const KATEX_MACROS = {
    "\\dd": "\\,\\mathrm{d}",
    "\\e": "\\mathrm{e}",
    "\\R": "\\mathbb{R}",
    "\\C": "\\mathbb{C}",
    "\\N": "\\mathbb{N}",
    "\\Z": "\\mathbb{Z}",
    "\\Q": "\\mathbb{Q}",
    "\\fr": "\\{#1\\}",
    "\\Re": "\\operatorname{Re}",
    "\\Im": "\\operatorname{Im}",
    "\\T": "\\mathrm{T}",
    "\\sgn": "\\operatorname{sgn}",
    "\\NH": "\\mathrm{NH_3}",
    "\\HS": "\\mathrm{H_2S}",
    "\\NHSH": "\\mathrm{NH_4SH}",
    "\\Hw": "\\mathrm{H_2O}",
    "\\CH": "\\mathrm{CH_4}",
    "\\muH": "\\,\\mu\\mathrm{Hz}",
    "\\li": "\\operatorname{li}",
    "\\Li": "\\operatorname{Li}",
    "\\Tr": "\\operatorname{Tr}"
  };

  const GITHUB_USER = "mag-and-krotons";
  const FALLBACK_REPOS = [
    { name: "BeTeR-Intelligence", description: "BeTeR Intelligence: reading images and language with no training. Handwritten digits 98.08%, letters read from the flow of language 93.0%, zero trained parameters.", html_url: "https://github.com/mag-and-krotons/BeTeR-Intelligence", language: "Python" },
    { name: "mag-and-krotons.github.io", description: "Source of this site: papers, notes and the interactive model of the medial antiprism.", html_url: "https://github.com/mag-and-krotons/mag-and-krotons.github.io", language: "HTML / JavaScript" },
    { name: "GAT", description: "", html_url: "https://github.com/mag-and-krotons/GAT", language: "" }
  ];

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ---------- Math ---------- */
  function triggerMathRendering(el) {
    const target = el || document.body;
    if (!window.renderMathInElement) return;
    try {
      window.renderMathInElement(target, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false }
        ],
        macros: KATEX_MACROS,
        throwOnError: false,
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "input"]
      });
    } catch (e) { /* leave the source visible */ }
  }
  window.triggerMathRendering = triggerMathRendering;
  window.KATEX_MACROS = KATEX_MACROS;

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function showToast(msg) {
    const t = $("#app-toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
  }
  window.showToast = showToast;

  function copyText(text, okMsg) {
    const done = () => showToast(okMsg || "Copied");
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { showToast("Copy failed — select the text instead"); }
    ta.remove();
  }
  window.copyText = copyText;

  /* ---------- Theme ---------- */
  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) {}
    if (saved === "light" || saved === "dark") document.documentElement.setAttribute("data-theme", saved);
    const btn = $("#theme-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") ||
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      document.dispatchEvent(new CustomEvent("themechange", { detail: next }));
    });
  }

  /* ---------- Navigation ---------- */
  function initNav() {
    const nav = $("#site-nav"), btn = $("#menu-btn");
    if (btn && nav) {
      btn.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.textContent = open ? "✕" : "☰";
      });
      $$("a", nav).forEach(a => a.addEventListener("click", () => {
        nav.classList.remove("open"); btn.textContent = "☰"; btn.setAttribute("aria-expanded", "false");
      }));
    }
  }

  /* ---------- Tabs ---------- */
  function activateTab(group, name) {
    const bar = $(`.tabs[data-tabgroup="${group}"]`);
    if (!bar) return;
    const scope = bar.parentElement;
    $$(".tab", bar).forEach(t => {
      const on = t.dataset.tab === name;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    $$(":scope > .tab-panel", scope).forEach(p => p.classList.toggle("active", p.dataset.panel === name));
    document.dispatchEvent(new CustomEvent("tabchange", { detail: { group, name } }));
  }
  window.activateTab = activateTab;

  function initTabs() {
    $$(".tabs[data-tabgroup]").forEach(bar => {
      $$(".tab", bar).forEach(t => t.addEventListener("click", () => activateTab(bar.dataset.tabgroup, t.dataset.tab)));
    });
  }

  function syncHash() {
    const h = location.hash;
    if (!h || h.startsWith("#blog-")) return;
    if (h === "#cosmos") activateTab("structure", "cosmos");
    else if (h === "#structure") activateTab("structure", "playground");
    else if (h.startsWith("#paper-")) activateTab("papers", "manuscripts");
    let el = null;
    try { el = document.querySelector(h === "#cosmos" ? '.tabs[data-tabgroup="structure"]' : h); } catch (e) {}
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  }

  /* ---------- Papers ---------- */
  let PAPERS = [];
  let activeCategory = "all";

  function paperCard(p) {
    const doiLink = p.doi ? `<a class="btn btn-sm" href="https://doi.org/${escapeHtml(p.doi)}" target="_blank" rel="noopener">DOI ${escapeHtml(p.doi)}</a>` : "";
    const pdfLink = p.pdf ? `<a class="btn btn-sm btn-primary" href="${escapeHtml(p.pdf)}" target="_blank" rel="noopener">PDF</a>` : "";
    const bib = p.bibtex ? `<button class="btn btn-sm" data-bib="${escapeHtml(p.id)}">Cite</button>` : "";
    const venue = escapeHtml(p.venue || "");
    return `
      <article class="paper" id="paper-${escapeHtml(p.id)}" data-category="${escapeHtml(p.category)}">
        <div class="paper-meta">
          <span class="badge">${escapeHtml(p.categoryLabel)}</span>
          <span>${escapeHtml(p.date || p.year)}</span>
          ${venue ? `<span>· ${venue}</span>` : ""}
          <span>· ${escapeHtml(p.license || "CC BY 4.0")}</span>
        </div>
        <h3>${escapeHtml(p.title)}</h3>
        <div class="abstract collapsed" id="abs-${escapeHtml(p.id)}">${escapeHtml(p.abstract)}</div>
        <div class="paper-actions">
          <button class="btn btn-sm" data-abs="${escapeHtml(p.id)}">Full abstract</button>
          ${pdfLink}${doiLink}${bib}
        </div>
      </article>`;
  }

  function renderPapers() {
    const list = $("#papers-list");
    if (!list) return;
    const shown = PAPERS.filter(p => activeCategory === "all" || p.category === activeCategory);
    if (!shown.length) { list.innerHTML = `<p class="muted">No papers in this category.</p>`; return; }
    const series = [];
    shown.forEach(p => { if (!series.includes(p.series)) series.push(p.series); });
    list.innerHTML = series.map(s =>
      `<div class="series-title">${escapeHtml(s)}</div>` + shown.filter(p => p.series === s).map(paperCard).join("")
    ).join("");
    triggerMathRendering(list);
  }

  function renderFilters() {
    const row = $("#paper-filters");
    if (!row) return;
    const cats = [];
    PAPERS.forEach(p => { if (!cats.find(c => c.id === p.category)) cats.push({ id: p.category, label: p.categoryLabel }); });
    const pill = (id, label, n) => `<button class="pill${id === activeCategory ? " active" : ""}" data-cat="${escapeHtml(id)}">${escapeHtml(label)} <span class="muted">${n}</span></button>`;
    row.innerHTML = pill("all", "All", PAPERS.length) +
      cats.map(c => pill(c.id, c.label, PAPERS.filter(p => p.category === c.id).length)).join("");
  }

  function renderCurrent() {
    const ul = $("#current-list");
    if (!ul) return;
    const cur = PAPERS.filter(p => /^Current/.test(p.series || ""));
    ul.innerHTML = cur.map(p =>
      `<li><a href="#paper-${escapeHtml(p.id)}">${escapeHtml(p.title)}</a><span class="note">${p.doi ? "Preprints.org · " + escapeHtml(p.doi) : "Submitted to Preprints.org"}</span></li>`
    ).join("");
  }

  function initPapers() {
    const list = $("#papers-list");
    if (!list) return;
    list.addEventListener("click", e => {
      const a = e.target.closest("[data-abs]");
      if (a) {
        const box = document.getElementById("abs-" + a.dataset.abs);
        if (box) {
          const collapsed = box.classList.toggle("collapsed");
          a.textContent = collapsed ? "Full abstract" : "Shorter";
        }
        return;
      }
      const b = e.target.closest("[data-bib]");
      if (b) openBibtex(b.dataset.bib);
    });
    const row = $("#paper-filters");
    if (row) row.addEventListener("click", e => {
      const b = e.target.closest("[data-cat]");
      if (!b) return;
      activeCategory = b.dataset.cat;
      renderFilters(); renderPapers();
    });
    fetch("papers.json", { cache: "no-cache" })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(d => {
        PAPERS = Array.isArray(d) ? d : (d.papers || []);
        renderFilters(); renderPapers(); renderCurrent();
        // the list changes the page height: settle the anchor again
        requestAnimationFrame(syncHash);
      })
      .catch(() => { list.innerHTML = `<p class="muted">The paper list could not be loaded. The PDFs are in the <a href="https://github.com/mag-and-krotons/mag-and-krotons.github.io/tree/main/papers">papers folder</a>.</p>`; });
  }

  /* ---------- BibTeX ---------- */
  function openBibtex(id) {
    const p = PAPERS.find(x => x.id === id);
    if (!p) return;
    $("#bibtex-title").textContent = "Cite: " + p.title;
    $("#bibtex-text").textContent = p.bibtex;
    $("#bibtex-modal").classList.add("open");
  }
  function closeBibtex(e) {
    if (e && e.target && e.currentTarget && e.target !== e.currentTarget) return;
    $("#bibtex-modal").classList.remove("open");
  }
  window.openBibtex = openBibtex;
  window.closeBibtex = closeBibtex;

  /* ---------- Key results table ---------- */
  function initMatrix() {
    const box = $("#matrix-container");
    if (!box) return;
    fetch("data/theoretical_matrix.json", { cache: "no-cache" })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(rows => {
        const groups = [];
        rows.forEach(r => {
          let g = groups.find(x => x.title === r.paperTitle);
          if (!g) { g = { title: r.paperTitle, domain: r.domain, rows: [] }; groups.push(g); }
          g.rows.push(r);
        });
        box.innerHTML = groups.map(g => `
          <div class="matrix-paper">
            <h3>${escapeHtml(g.title)}</h3>
            <p class="small muted">${escapeHtml(g.domain || "")}</p>
            <div class="table-wrap"><table class="matrix-table">
              <thead><tr><th>System</th><th>Key equations</th><th>Parameters</th><th>How it is checked</th></tr></thead>
              <tbody>${g.rows.map(r => `<tr><td>${escapeHtml(r.system)}</td><td>${escapeHtml(r.equations)}</td><td>${escapeHtml(r.parameters)}</td><td>${escapeHtml(r.validation)}</td></tr>`).join("")}</tbody>
            </table></div>
          </div>`).join("");
        triggerMathRendering(box);
      })
      .catch(() => { box.innerHTML = `<p class="muted">The table could not be loaded.</p>`; });
  }

  /* ---------- Code ---------- */
  function repoCard(r) {
    const desc = r.description ? `<p>${escapeHtml(r.description)}</p>` : "";
    const lang = r.language ? `<span>${escapeHtml(r.language)}</span>` : "";
    const upd = r.updated_at ? `<span>Updated ${new Date(r.updated_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>` : "";
    return `<a class="repo" href="${escapeHtml(r.html_url)}" target="_blank" rel="noopener">
      <b>${escapeHtml(r.name)}</b>${desc}<div class="paper-meta">${lang}${upd}</div></a>`;
  }
  function initRepos() {
    const grid = $("#repo-grid");
    if (!grid) return;
    const zenodo = `<a class="repo" href="https://doi.org/10.5281/zenodo.22129334" target="_blank" rel="noopener">
      <b>Complete Research Release 8.0.2</b><p>Distinction, Perspective, and Predictive Closure. Zenodo, 27 August 2026, CC BY 4.0, archived in Software Heritage.</p>
      <div class="paper-meta"><span>DOI 10.5281/zenodo.22129334</span></div></a>`;
    const draw = repos => { grid.innerHTML = zenodo + repos.map(repoCard).join(""); };
    draw(FALLBACK_REPOS);
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(list => {
        const own = (list || []).filter(r => !r.fork).map(r => {
          const fb = FALLBACK_REPOS.find(f => f.name === r.name);
          return { name: r.name, description: r.description || (fb && fb.description) || "", html_url: r.html_url, language: r.language || (fb && fb.language) || "", updated_at: r.updated_at };
        });
        if (own.length) draw(own);
      })
      .catch(() => {});
  }

  /* ---------- Keyboard ---------- */
  function initKeys() {
    document.addEventListener("keydown", e => {
      if (e.key !== "Escape") return;
      $$(".modal-backdrop.open").forEach(m => m.classList.remove("open"));
      document.body.style.overflow = "";
    });
    const copyBtn = $("#bibtex-copy");
    if (copyBtn) copyBtn.addEventListener("click", () => copyText($("#bibtex-text").textContent, "BibTeX copied"));
  }

  initTheme();
  document.addEventListener("DOMContentLoaded", () => {
    initNav(); initTabs(); initKeys();
    initPapers(); initMatrix(); initRepos();
    triggerMathRendering(document.body);
    syncHash();
  });
  window.addEventListener("hashchange", syncHash);
})();
