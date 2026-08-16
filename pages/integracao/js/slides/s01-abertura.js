(() => {
  const { el } = Utils;

  function build(container) {
    container.classList.add("slide--center");
    container.style.cursor = "pointer";
    container.addEventListener("click", (e) => {
      if (e.target.closest(".nav-btn")) return;
      Presentation.go(1);
    });

    const inner = el("div", { class: "slide__inner" }, [
      el("div", { class: "abertura-bg ken-burns", style: { backgroundImage: "url(images/frigo-am-essa-marca-e-nossa.png)" } }),
      el("div", { class: "abertura-veil" }),
      el("div", { class: "abertura-logo reveal-blur", style: { "--d": "0.15s" } }, el("img", { src: DATA.empresa.logo, alt: DATA.empresa.nome })),
      el("div", { class: "abertura-kicker reveal", style: { "--d": "0.9s" } }, DATA.empresa.nome.toUpperCase()),
      el("h1", { class: "abertura-title gold-text reveal-blur", style: { "--d": "1.15s" } }, "INTEGRAÇÃO"),
      el("p", { class: "abertura-sub reveal", style: { "--d": "2.0s" } }, ["Seja bem-vindo ao ", el("strong", {}, DATA.empresa.nome), "."]),
      el("div", { class: "abertura-hint reveal", style: { "--d": "2.8s" } }, [el("span", {}, "clique ou aguarde para continuar"), chevronDown()]),
    ]);
    container.appendChild(inner);
  }

  function chevronDown() {
    const svgNode = Utils.svg("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" });
    svgNode.innerHTML = '<path d="M6 9l6 6 6-6" />';
    return svgNode;
  }

  SLIDES.push({
    id: "abertura",
    section: "Abertura",
    autoplay: 7200,
    build,
  });
})();
