/* Mapa estilizado de Manaus com as unidades do Frigorífico Amazonas. */

const CityMap = (() => {
  const { el, svg } = Utils;

  function background() {
    const svgNode = svg("svg", { viewBox: DATA.mapaViewBox, preserveAspectRatio: "xMidYMid slice" });

    // Grade sutil de referência
    const grid = svg("g", { class: "city-map__grid" });
    for (let x = 0; x <= 1000; x += 100) grid.appendChild(svg("line", { x1: x, y1: 0, x2: x, y2: 720 }));
    for (let y = 0; y <= 720; y += 100) grid.appendChild(svg("line", { x1: 0, y1: y, x2: 1000, y2: y }));
    svgNode.appendChild(grid);

    // Rio Negro estilizado — margem oeste/sul, curva livre (não geograficamente literal)
    svgNode.appendChild(
      svg("path", {
        class: "city-map__river",
        d: "M -50 250 C 120 300, 60 420, 180 520 S 420 700, 700 760",
      })
    );
    svgNode.appendChild(
      svg("path", {
        class: "city-map__river",
        d: "M -50 250 C 120 300, 60 420, 180 520 S 420 700, 700 760",
        style: "stroke-width:80;opacity:0.16",
      })
    );

    // Manchas suaves indicando regiões urbanas
    const districts = [
      { cx: 500, cy: 480, r: 230 },
      { cx: 120, cy: 340, r: 150 },
      { cx: 650, cy: 130, r: 170 },
      { cx: 900, cy: 420, r: 150 },
    ];
    districts.forEach((d) => {
      svgNode.appendChild(svg("circle", { class: "city-map__district", cx: d.cx, cy: d.cy, r: d.r }));
    });

    return svgNode;
  }

  function pct(coords) {
    const [, , vw, vh] = DATA.mapaViewBox.split(" ").map(Number);
    return { left: (coords.x / vw) * 100, top: (coords.y / vh) * 100 };
  }

  function marker(unidade, { variant, delay }) {
    const isSold = unidade.status === "vendida";
    const showSold = variant === "vendidas" && isSold;
    const isDim = variant === "vendidas" && isSold;
    const isEmphasis = variant === "vendidas" && !isSold;
    const { left, top } = pct(unidade.coords);
    const labelBelow = top < 34;

    const card = el("div", { class: "marker__card" }, [
      el("div", { class: "marker__name" }, unidade.nome),
      el("div", { class: "marker__meta" }, `${unidade.bairro} · ${unidade.cep}`),
      showSold ? el("span", { class: "marker__seal" }, "VENDIDA") : null,
    ]);
    const stem = el("span", { class: "marker__stem" });

    const label = el(
      "div",
      { class: `marker__label ${labelBelow ? "marker__label--below" : "marker__label--above"}` },
      labelBelow ? [stem, card] : [card, stem]
    );

    const pin = el("div", { class: "marker__pin" }, [el("span", { class: "marker__ring" }), el("span", { class: "marker__dot" })]);

    const classes = ["marker"];
    if (showSold) classes.push("marker--sold");
    if (isDim) classes.push("marker--dim");
    if (isEmphasis) classes.push("marker--emphasis");

    const node = el("div", { class: classes.join(" "), style: { left: `${left}%`, top: `${top}%` } }, [pin, label]);
    node.style.setProperty("--d", `${delay.toFixed(2)}s`);
    return node;
  }

  function render(container, { unidades, variant = "historia" } = {}) {
    container.innerHTML = "";
    container.appendChild(background());
    const layer = el("div", { class: "markers-layer", style: { position: "absolute", inset: "0" } });
    unidades.forEach((u, i) => {
      if (!u.coords) return;
      layer.appendChild(marker(u, { variant, delay: 0.25 + i * 0.16 }));
    });
    container.appendChild(layer);
  }

  return { render };
})();
