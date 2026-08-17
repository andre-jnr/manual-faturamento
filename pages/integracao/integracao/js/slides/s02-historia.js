(() => {
  const { el } = Utils;

  function legend(items) {
    return el(
      "div",
      { class: "map-legend" },
      items.map((it) => el("div", { class: "map-legend__item" }, [el("span", { class: "map-legend__dot", style: { background: it.color } }), it.label]))
    );
  }

  function buildPresenca(container) {
    const inner = el("div", { class: "slide__inner" });
    inner.appendChild(
      el("div", { class: "slide__header" }, [
        el("span", { class: "eyebrow reveal" }, "Nossa história"),
        el("h2", { class: "title-lg reveal", style: { "--d": "0.08s" } }, "Nossa presença em Manaus"),
        el("p", { class: "lead reveal", style: { "--d": "0.16s" } }, "Uma história construída em diferentes pontos da cidade."),
      ])
    );

    const body = el("div", { class: "slide__body" });
    const mapWrap = el("div", { class: "city-map reveal-scale", style: { "--d": "0.22s" } });
    body.appendChild(mapWrap);
    inner.appendChild(body);
    container.appendChild(inner);

    CityMap.render(mapWrap, { unidades: DATA.unidades, variant: "historia" });
    mapWrap.appendChild(legend([{ color: "var(--gold-400)", label: "Unidade ao longo da nossa história" }]));
  }

  function buildVendidas(container) {
    const inner = el("div", { class: "slide__inner" });
    inner.appendChild(
      el("div", { class: "slide__header" }, [
        el("span", { class: "eyebrow reveal" }, "Nossa história"),
        el("h2", { class: "title-lg reveal", style: { "--d": "0.08s" } }, "Alguns capítulos ficaram para trás"),
        el("p", { class: "lead reveal", style: { "--d": "0.16s" } }, "Ao longo da nossa trajetória, algumas unidades foram vendidas — e a empresa continuou crescendo."),
      ])
    );

    const body = el("div", { class: "slide__body" });
    const mapWrap = el("div", { class: "city-map reveal-scale", style: { "--d": "0.22s" } });
    body.appendChild(mapWrap);
    inner.appendChild(body);
    container.appendChild(inner);

    CityMap.render(mapWrap, { unidades: DATA.unidades, variant: "vendidas" });
    mapWrap.appendChild(
      legend([
        { color: "var(--gold-400)", label: "Segue ativa hoje" },
        { color: "var(--sold-500)", label: "Vendida" },
      ])
    );
  }

  SLIDES.push({ id: "presenca", section: "Nossa História", build: buildPresenca });
  SLIDES.push({ id: "vendidas", section: "Nossa História", build: buildVendidas });
})();
