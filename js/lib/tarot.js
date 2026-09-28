/* ============================================================
   موتور چیدمان‌های تاروت — توسط فایل‌های مستقل هر فال استفاده می‌شود
   ============================================================ */
import { el, delay, faNum } from "./util.js";
import { tarotZone, cardSlot, resultWrap, showResult, readingItem, readingSection, copyBtn } from "./ui.js";
import { majorDeck, minorDeck, fullDeck } from "../data/tarot-deck.js";

/**
 * اجرای یک چیدمان تاروت
 * @param {HTMLElement} box
 * @param {object} cfg { deck:'major'|'full', positions:[{label,sub,hint}], focusLabel, allowQuestion }
 */
export function runSpread(box, cfg) {
  const deck = cfg.deck === "major" ? majorDeck() : cfg.deck === "minor" ? minorDeck() : fullDeck();
  box.innerHTML = "";

  const lead = el("p", { class: "lead-note muted", text: cfg.focusLabel || "" });
  const btnRow = el("div", { class: "center" });
  const zone = tarotZone();
  const result = resultWrap();
  const btn = el("button", { class: "btn big breathe", text: cfg.drawLabel || "✨ کشیدن کارت‌ها" });
  btnRow.append(btn);
  box.append(lead, btnRow, zone, result);

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "در حال برهم‌زدن کارت‌ها…";
    result.hidden = true;
    await delay(900 + Math.random() * 500);
    zone.innerHTML = "";

    const cards = pickCards(deck, cfg.positions.length);
    cards.forEach((pick, i) => {
      const pos = cfg.positions[i];
      const slotEl = cardSlot({ label: pos.label, sub: pos.sub }, pick, 400 + i * (cfg.flipGap || 500));
      zone.append(slotEl);
    });

    const last = 400 + (cards.length - 1) * (cfg.flipGap || 500) + 750;
    btn.textContent = cfg.againLabel || "کشیدن دوباره";
    await delay(last);
    btn.disabled = false;

    const items = cards.map((pick, i) => buildItem(cfg.positions[i], pick));
    const html = readingSection(cfg.resultTitle || "تفسیر کارت‌ها", items);
    html.append(el("div", { class: "center", style: "margin-top:6px" }, copyBtn(buildText(cfg, cards))));
    showResult(result, "");
    result.append(html);
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function pickCards(deck, n) {
  const shuffled = deck.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const out = [];
  for (let i = 0; i < n; i++) {
    const card = shuffled[i % shuffled.length];
    out.push({ card, reversed: Math.random() < 0.32 });
  }
  return out;
}

function buildItem(pos, pick) {
  const { card, reversed } = pick;
  const meaning = reversed ? card.reversed : card.upright;
  const paras = [meaning];
  if (pos.hint) paras.unshift(pos.hint);
  const title = reversed ? `${pos.label} — ${card.name} (معکوس)` : `${pos.label} — ${card.name}`;
  return readingItem(title, paras);
}

function buildText(cfg, cards) {
  const lines = [`${cfg.title} — فال‌بین`, ""];
  cards.forEach((pick, i) => {
    const pos = cfg.positions[i];
    const { card, reversed } = pick;
    lines.push(`${faNum(i + 1)}. ${pos.label}: ${card.name}${reversed ? " (معکوس)" : ""}`);
    lines.push(reversed ? card.reversed : card.upright);
    lines.push("");
  });
  return lines.join("\n");
}

