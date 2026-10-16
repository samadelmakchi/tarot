/* ============================================================
   موتور چیدمان‌های تاروت — توسط فایل‌های مستقل هر فال استفاده می‌شود
   ============================================================ */
import { el, delay, faNum, shuffle } from "./util.js";
import { tarotZone, cardSlot, resultWrap, showResult, readingItem, readingSection, copyBtn } from "./ui.js";
import { majorDeck, minorDeck, fullDeck } from "../data/tarot-deck.js";

/**
 * اجرای یک چیدمان تاروت
 * @param {HTMLElement} box
 * @param {object} cfg { deck:'major'|'full', positions:[{label,sub,hint}], focusLabel, allowQuestion }
 */
export function runSpread(box, cfg) {
  cardPicker(box, cfg, (result, cards) => {
    const items = cards.map((pick, i) => buildItem(cfg.positions[i], pick));
    const html = readingSection(cfg.resultTitle || "تفسیر کارت‌ها", items);
    html.append(el("div", { class: "center", style: "margin-top:6px" }, copyBtn(buildText(cfg, cards))));
    showResult(result, "");
    result.append(html);
  });
}

/** هر دکمه به یک کارت ثابت از دستهٔ برهم‌زده متصل است. */
export function cardPicker(box, cfg, onComplete) {
  const deck = cfg.deck === "major" ? majorDeck() : cfg.deck === "minor" ? minorDeck() : fullDeck();
  box.innerHTML = "";

  const lead = el("p", { class: "lead-note muted", text: cfg.focusLabel || "" });
  const progress = el("p", { class: "selection-status", role: "status", "aria-live": "polite", "aria-atomic": "true" });
  const choices = el("div", { class: "card-choices", role: "group", "aria-label": "کارت‌های پشت‌ورو؛ برای کشیدن، یک کارت را انتخاب کن" });
  const zone = tarotZone();
  const result = resultWrap();
  const btn = el("button", { type: "button", class: "btn big", text: cfg.againLabel || "کشیدن دوباره" });
  const btnRow = el("div", { class: "center" }, btn);
  box.append(lead, progress, choices, zone, result, btnRow);
  let round = 0;

  function start() {
    const currentRound = ++round;
    const cards = [];
    const picks = shuffle(deck).map((card) => ({ card, reversed: Math.random() < (cfg.reversedChance ?? 0.32) }));
    btnRow.hidden = true;
    result.hidden = true;
    result.replaceChildren();
    zone.replaceChildren();
    choices.replaceChildren();
    choices.hidden = false;
    const updateProgress = () => {
      const next = cfg.positions[cards.length];
      progress.textContent = `${faNum(cards.length)} از ${faNum(cfg.positions.length)} کارت انتخاب شده — کارت ${faNum(cards.length + 1)}: ${next.label}؛ یکی از کارت‌های پشت‌ورو را انتخاب کن.`;
    };
    updateProgress();

    picks.forEach((pick, index) => {
      const choice = el("button", {
        type: "button", class: "card-choice",
        "aria-label": `کشیدن کارت شمارهٔ ${faNum(index + 1)}`,
      }, el("span", { class: "card-face card-back", "aria-hidden": "true" }));
      choice.addEventListener("click", async () => {
        if (choice.disabled || cards.length >= cfg.positions.length) return;
        choice.disabled = true;
        choice.classList.add("is-picked");
        choice.setAttribute("aria-label", `کارت شمارهٔ ${faNum(index + 1)} انتخاب شد`);
        const pos = cfg.positions[cards.length];
        cards.push(pick);
        zone.append(cardSlot({ label: pos.label, sub: pos.sub }, pick, 50));

        if (cards.length < cfg.positions.length) {
          updateProgress();
          const buttons = [...choices.children];
          const next = buttons.slice(index + 1).find((button) => !button.disabled)
            || buttons.find((button) => !button.disabled);
          next?.focus({ preventScroll: true });
          return;
        }

        for (const button of choices.children) button.disabled = true;
        progress.textContent = `هر ${faNum(cards.length)} کارت را انتخاب کردی؛ در حال نمایش تفسیر…`;
        await delay(900);
        if (currentRound !== round || !box.isConnected) return;
        choices.hidden = true;
        progress.textContent = `انتخاب ${faNum(cards.length)} کارت کامل شد.`;
        onComplete(result, cards);
        btnRow.hidden = false;
        result.setAttribute("tabindex", "-1");
        result.focus({ preventScroll: true });
        result.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
      choices.append(choice);
    });
  }
  btn.addEventListener("click", () => {
    start();
    choices.firstElementChild?.focus({ preventScroll: true });
    progress.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  start();
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

