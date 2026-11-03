/* Learn with me: offers, UPI payment, and sending the payment reference.
 *
 * SETTINGS: fill in these three values to open payments.
 *   upiId     your UPI ID (VPA), e.g. "abhijit@okhdfcbank". Payments go straight to the bank account behind it.
 *   whatsapp  your WhatsApp number with country code, digits only, e.g. "919812345678".
 *   email     where payment references are also accepted.
 * Until upiId is set, the page shows "Payments open soon" and the pay buttons become "Reserve" messages.
 * Prices are in rupees; change them in OFFERS below.
 */
const SETTINGS = {
  upiId: "",
  payeeName: "Abhijit Singh",
  whatsapp: "",
  email: "abhijitsingh@tuta.io"
};

const OFFERS = [
  {
    id: "question", title: "Ask me a question", price: 199, unit: "per question",
    points: ["One question about any of my papers or ideas", "A written answer from me within 48 hours", "One follow-up question included"]
  },
  {
    id: "reading", title: "Guided reading of a paper", price: 999, unit: "60 minutes",
    badge: "Most chosen", featured: true, pickPaper: true,
    points: ["We read one paper together on a video call", "I explain each step in plain words", "You keep my notes from the session"]
  },
  {
    id: "session", title: "One-to-one session", price: 1499, unit: "per hour",
    points: ["An hour on whatever you want to learn or work on", "Your research, your questions, your problem", "A short written summary afterwards"]
  },
  {
    id: "course", title: "The October series course", price: 4999, unit: "5 sessions",
    points: ["All five papers of the current series, one per session", "From the medial antiprism to the square-root horizon", "Questions by message between sessions"]
  }
];
const SPONSOR = { id: "sponsor", title: "Sponsor a place for a student", price: 999, unit: "one guided reading" };

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const inr = n => "₹" + n.toLocaleString("en-IN");
  const open = !!SETTINGS.upiId;
  let current = null, papers = [];

  /* theme and menu, same behaviour as the main page */
  $("#theme-btn").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
  $("#menu-btn").addEventListener("click", () => {
    const nav = $("#site-nav"), on = nav.classList.toggle("open");
    $("#menu-btn").textContent = on ? "✕" : "☰";
  });

  function contactLink(text) {
    if (SETTINGS.whatsapp) return "https://wa.me/" + SETTINGS.whatsapp + "?text=" + encodeURIComponent(text);
    return "mailto:" + SETTINGS.email + "?subject=" + encodeURIComponent("Learn with Abhijit") + "&body=" + encodeURIComponent(text);
  }

  function renderOffers() {
    $("#offer-grid").innerHTML = OFFERS.map(o => `
      <article class="card offer${o.featured ? " featured" : ""}">
        ${o.badge ? `<span class="badge">${o.badge}</span>` : ""}
        <h3>${o.title}</h3>
        <div class="price">${inr(o.price)}<small>${o.unit}</small></div>
        <ul>${o.points.map(p => `<li>${p}</li>`).join("")}</ul>
        ${o.pickPaper ? `<label class="small muted" for="paper-${o.id}">Which paper</label><select id="paper-${o.id}"><option value="">I'll choose later</option></select>` : ""}
        <div class="btn-row"><button class="btn${o.featured ? " btn-primary" : ""}" type="button" data-buy="${o.id}">${open ? "Choose and pay" : "Reserve"}</button></div>
      </article>`).join("");
    fillPapers();
  }

  function fillPapers() {
    document.querySelectorAll("select[id^=paper-]").forEach(sel => {
      papers.forEach(p => { const op = document.createElement("option"); op.value = op.textContent = p; sel.appendChild(op); });
    });
  }
  fetch("papers.json").then(r => r.json()).then(list => {
    papers = list.map(p => p.title.split(":")[0]);
    fillPapers();
  }).catch(() => {});

  function upiLink(o) {
    const p = new URLSearchParams({ pa: SETTINGS.upiId, pn: SETTINGS.payeeName, am: String(o.price), cu: "INR", tn: ("Learn: " + o.title).slice(0, 50) });
    return "upi://pay?" + p.toString().replace(/\+/g, "%20");
  }

  function paperFor(o) { const s = $("#paper-" + o.id); return s && s.value ? s.value : ""; }

  function openPay(o) {
    current = o;
    const paper = paperFor(o);
    if (!open) {
      const msg = `Hello Abhijit, I'd like to reserve: ${o.title} (${inr(o.price)}, ${o.unit})${paper ? ". Paper: " + paper : ""}.`;
      window.open(contactLink(msg), "_blank", "noopener");
      return;
    }
    $("#pay-title").textContent = o.title;
    $("#pay-amount").textContent = inr(o.price);
    $("#pay-what").textContent = o.unit + (paper ? " · " + paper : "");
    $("#pay-vpa").textContent = SETTINGS.upiId;
    const link = upiLink(o);
    $("#pay-upi").href = link;
    const box = $("#pay-qr");
    box.innerHTML = "";
    if (window.qrcode) {
      const q = qrcode(0, "M"); q.addData(link); q.make();
      box.innerHTML = q.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
    } else {
      box.innerHTML = `<p class="small muted center">Open this page on your phone and tap Pay, or pay ${inr(o.price)} to ${SETTINGS.upiId} from any UPI app.</p>`;
    }
    $("#pf-hint").textContent = "";
    $("#pay-modal").classList.add("open");
    $("#pay-modal").setAttribute("aria-hidden", "false");
    $("#pay-close").focus();
  }

  function closePay() { $("#pay-modal").classList.remove("open"); $("#pay-modal").setAttribute("aria-hidden", "true"); }
  $("#pay-close").addEventListener("click", closePay);
  $("#pay-modal").addEventListener("click", e => { if (e.target.id === "pay-modal") closePay(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closePay(); });

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-buy]"); if (!b) return;
    const o = b.dataset.buy === "sponsor" ? SPONSOR : OFFERS.find(x => x.id === b.dataset.buy);
    if (o) openPay(o);
  });

  function referenceText() {
    const o = current, paper = paperFor(o);
    return [
      "Hello Abhijit, I have paid for: " + o.title + " (" + inr(o.price) + ", " + o.unit + ")" + (paper ? "\nPaper: " + paper : ""),
      "Name: " + $("#pf-name").value.trim(),
      "Contact: " + $("#pf-contact").value.trim(),
      "UPI reference: " + $("#pf-ref").value.trim(),
      $("#pf-note").value.trim() ? "I want to learn: " + $("#pf-note").value.trim() : ""
    ].filter(Boolean).join("\n");
  }

  $("#pay-form").addEventListener("submit", e => {
    e.preventDefault();
    if (!SETTINGS.whatsapp) { $("#pf-mail").click(); return; }
    window.open("https://wa.me/" + SETTINGS.whatsapp + "?text=" + encodeURIComponent(referenceText()), "_blank", "noopener");
    $("#pf-hint").textContent = "Sent to WhatsApp. I confirm within 24 hours.";
  });
  $("#pf-mail").addEventListener("click", () => {
    if (!$("#pay-form").reportValidity()) return;
    location.href = "mailto:" + SETTINGS.email + "?subject=" + encodeURIComponent("Payment: " + current.title) + "&body=" + encodeURIComponent(referenceText());
    $("#pf-hint").textContent = "Your email app should open with the message ready. I confirm within 24 hours.";
  });
  if (!SETTINGS.whatsapp) $("#pf-send").style.display = "none";

  $("#free-ask").href = contactLink("Hello Abhijit, I'd like to ask for a free place. About me and what I want to learn: ");
  $("#learn-closed").style.display = open ? "none" : "";
  renderOffers();
})();
