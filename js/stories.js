/* Stories page: renders the stories, sends questions, and optional giving by UPI.
 *
 * SETTINGS: fill in to open giving and WhatsApp questions.
 *   upiId     your UPI ID (VPA), e.g. "abhijit@okhdfcbank". Gifts go straight to the bank account behind it.
 *   whatsapp  your WhatsApp number with country code, digits only, e.g. "919812345678". Questions go here if set, otherwise by email.
 * Until upiId is set, the giving box says "Giving opens soon". Nothing on the page is ever required to be paid.
 */
const SETTINGS = {
  upiId: "",
  payeeName: "Abhijit Singh",
  whatsapp: "",
  email: "abhijitsingh@tuta.io"
};

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* theme and menu, same behaviour as the main page */
  $("#theme-btn").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
  $("#menu-btn").addEventListener("click", () => {
    const on = $("#site-nav").classList.toggle("open");
    $("#menu-btn").textContent = on ? "✕" : "☰";
  });

  /* stories */
  const stories = window.STORIES || [];
  $("#story-list").innerHTML = stories.map((s, i) => `
    <details class="story" id="${esc(s.id)}"${i === 0 ? " open" : ""}>
      <summary>
        <h3>${esc(s.title)}</h3>
        <p class="story-hook">${esc(s.hook)}</p>
        <span class="story-meta"><span>${s.minutes} min read</span><span class="open-cue">Read</span></span>
      </summary>
      <div class="story-body">
        ${s.paragraphs.map(p => `<p>${esc(p)}</p>`).join("")}
        <div class="story-foot">
          <button class="btn btn-sm" type="button" data-share="${esc(s.id)}">Share this story</button>
          ${s.paper ? `<a class="btn btn-sm" href="index.html#paper-${esc(s.paper)}">The paper behind it</a>` : ""}
          <span class="muted small" data-shared="${esc(s.id)}"></span>
        </div>
      </div>
    </details>`).join("");

  function openFromHash() {
    const id = location.hash.slice(1), el = id && document.getElementById(id);
    if (el && el.classList.contains("story")) { el.open = true; el.scrollIntoView({ block: "start" }); }
  }
  addEventListener("hashchange", openFromHash);
  openFromHash();

  document.addEventListener("click", async e => {
    const b = e.target.closest("[data-share]"); if (!b) return;
    const s = stories.find(x => x.id === b.dataset.share);
    const url = location.origin + location.pathname + "#" + s.id;
    const note = document.querySelector(`[data-shared="${s.id}"]`);
    try {
      if (navigator.share) { await navigator.share({ title: s.title, text: s.hook, url }); return; }
      await navigator.clipboard.writeText(url); note.textContent = "Link copied. Pass it on.";
    } catch (err) { if (err && err.name !== "AbortError") note.textContent = url; }
  });

  /* ask for a story */
  $("#ask-form").addEventListener("submit", e => {
    e.preventDefault();
    const q = $("#ask-q").value.trim(); if (!q) return;
    const name = $("#ask-name").value.trim();
    const text = "Hello Abhijit, I'd love a story about this:\n\n" + q + (name ? "\n\nFrom " + name : "");
    if (SETTINGS.whatsapp) {
      window.open("https://wa.me/" + SETTINGS.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      $("#ask-hint").textContent = "Your question is ready in WhatsApp. Press send there.";
    } else {
      location.href = "mailto:" + SETTINGS.email + "?subject=" + encodeURIComponent("A question for a story") + "&body=" + encodeURIComponent(text);
      $("#ask-hint").textContent = "Your email app should open with the question ready. Press send there.";
    }
  });
  if (SETTINGS.whatsapp) $("#ask-send").textContent = "Send on WhatsApp";

  /* giving, only if they wish */
  const open = !!SETTINGS.upiId;
  $("#give-closed").style.display = open ? "none" : "";
  $(".give-amounts").style.display = open ? "" : "none";
  $(".give-pay").style.display = open ? "" : "none";
  let amount = "";
  function upiLink() {
    const p = new URLSearchParams({ pa: SETTINGS.upiId, pn: SETTINGS.payeeName, cu: "INR", tn: "Thank you for the stories" });
    if (amount) p.set("am", amount);
    return "upi://pay?" + p.toString().replace(/\+/g, "%20");
  }
  function renderGive() {
    if (!open) return;
    const link = upiLink();
    $("#give-upi").href = link;
    $("#give-vpa").textContent = SETTINGS.upiId;
    const box = $("#give-qr");
    if (window.qrcode) {
      const q = qrcode(0, "M"); q.addData(link); q.make();
      box.innerHTML = q.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
      box.style.display = "";
    } else {
      box.style.display = "none";
    }
  }
  document.querySelectorAll(".give-amounts .chip").forEach(c => c.addEventListener("click", () => {
    amount = c.dataset.amt;
    document.querySelectorAll(".give-amounts .chip").forEach(x => x.setAttribute("aria-pressed", x === c ? "true" : "false"));
    renderGive();
  }));
  renderGive();
})();
