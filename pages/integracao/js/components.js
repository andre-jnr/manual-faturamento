/* Componentes de UI reutilizáveis entre os slides. */

const Components = (() => {
  const { el, icon } = Utils;

  function sectionHeader({ eyebrow, title, lead, align } = {}) {
    return el("div", { class: "slide__header reveal", style: align === "center" ? { alignItems: "center", textAlign: "center" } : {} }, [
      eyebrow ? el("span", { class: "eyebrow" }, eyebrow) : null,
      el("h2", { class: "title-lg", html: title }),
      lead ? el("p", { class: "lead", html: lead }) : null,
    ]);
  }

  function card(children, { className = "", gold = false } = {}) {
    return el("div", { class: `card reveal ${gold ? "card--gold-top" : ""} ${className}`.trim() }, children);
  }

  function pill(text, variant = "gold") {
    return el("span", { class: `pill pill--${variant}` }, text);
  }

  function person({ nome, cargo, tag, gold = false, size = "md" }) {
    return card(
      [el("div", { class: "person__name" }, nome), el("div", { class: "person__role" }, cargo), tag ? el("span", { class: "person__tag" }, tag) : null],
      { className: `person ${size === "lg" ? "person--lg" : ""}`.trim(), gold }
    );
  }

  function areaCard(nome, iconName) {
    return card([el("div", { class: "area-card__icon" }, icon(iconName || "building")), el("div", { class: "area-card__title" }, nome)], { className: "area-card" });
  }

  function ruleCard(num, text) {
    return card([el("div", { class: "rule-card__num" }, String(num).padStart(2, "0")), el("div", { class: "rule-card__text" }, text)], { className: "rule-card" });
  }

  function valueCard(nome, texto) {
    return card([el("div", { class: "value-card__title" }, nome), el("div", { class: "value-card__text" }, texto)], { className: "value-card" });
  }

  function kvList(items) {
    return el(
      "div",
      { class: "kv-list" },
      items
        .filter(Boolean)
        .map((it) =>
          el("div", { class: "kv-list__item" }, [el("div", { class: "kv-list__key" }, it.key), el("div", { class: "kv-list__value", html: it.value })])
        )
    );
  }

  function unitBadge(unidade) {
    return el("span", { class: "mono-tag" }, unidade);
  }

  function slugify(str) {
    return str
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Nó de organograma posicionado por porcentagem — a linha de conexão até o
  // pai (data-parent) é desenhada dinamicamente por OrgChart.connect().
  function orgNode({ id, parent, nome, cargo, unidade, left, top, indirect = false, lead = false }) {
    const nodeId = id || slugify(nome);
    const attrs = { class: `org-node ${indirect ? "org-node--indirect" : ""} ${lead ? "org-node--lead" : ""}`.trim(), "data-id": nodeId, style: { left: `${left}%`, top: `${top}%` } };
    if (parent) attrs["data-parent"] = parent;
    return el("div", attrs, [
      el("div", { class: "org-node__name" }, nome),
      cargo ? el("div", { class: "org-node__role" }, cargo) : null,
      unidade ? el("div", { class: "org-node__unit" }, unidade) : null,
    ]);
  }

  function orgChartShell() {
    return el("div", { class: "orgchart" }, [Utils.svg("svg", { class: "orgchart__svg" }), el("div", { class: "orgchart__nodes" })]);
  }

  return { sectionHeader, card, pill, person, areaCard, ruleCard, valueCard, kvList, unitBadge, orgNode, orgChartShell, slugify };
})();
