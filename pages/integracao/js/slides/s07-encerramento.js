(() => {
  const { el, icon } = Utils;
  const { valueCard } = Components;

  /* ---------- Missão, Visão e Valores ---------- */
  function buildValores(container) {
    const inner = el("div", { class: "slide__inner slide__inner--tight" });
    inner.appendChild(
      el("div", { class: "valores-focus" }, [
        el("span", { class: "eyebrow reveal", style: { textAlign: "center" } }, "O que nos guia"),
        el("h2", { class: "valores-word gold-text reveal-blur", style: { "--d": "0.15s" } }, [icon("quality", 46), "QUALIDADE"]),
      ])
    );
    const grid = el("div", { class: "valores-grid" }, DATA.valores.map((v, i) => {
      const c = valueCard(v.nome, v.texto);
      c.style.setProperty("--d", `${0.4 + i * 0.12}s`);
      return c;
    }));
    inner.appendChild(el("div", { class: "slide__body col-center" }, grid));
    container.appendChild(inner);
  }

  /* ---------- Encerramento ---------- */
  function buildEncerramento(container) {
    container.classList.add("slide--center");
    const inner = el("div", { class: "slide__inner" }, [
      el("div", { class: "abertura-bg ken-burns", style: { backgroundImage: "url(images/frigo-am-essa-marca-e-nossa.png)" } }),
      el("div", { class: "abertura-veil" }),
      el("div", { class: "abertura-logo reveal-blur", style: { "--d": "0.1s", width: "112px", height: "112px" } }, el("img", { src: DATA.empresa.logo, alt: DATA.empresa.nome })),
      el("h2", { class: "encerramento-title reveal-blur", style: { "--d": "0.6s" } }, ["Agora você faz parte ", el("span", { class: "gold-text" }, "dessa história.")]),
      el("div", { class: "encerramento-lines" }, [
        el("p", { class: "reveal", style: { "--d": "1.25s" } }, "Cada área importa."),
        el("p", { class: "reveal", style: { "--d": "1.55s" } }, "Cada pessoa importa."),
        el("p", { class: "reveal", style: { "--d": "1.85s" } }, "Cada atitude importa."),
      ]),
      el("p", { class: "encerramento-final reveal", style: { "--d": "2.4s" } }, ["Seja bem-vindo ao ", el("strong", {}, DATA.empresa.nome), "."]),
      el("p", { class: "quote reveal", style: { "--d": "2.9s", margin: "auto", "margin-top": "36px" } }, "O crescimento de uma empresa começa quando cada pessoa entende a importância do seu papel."),
    ]);
    container.appendChild(inner);
  }

  SLIDES.push({ id: "valores", section: "Nossos Valores", build: buildValores });
  SLIDES.push({ id: "encerramento", section: "Encerramento", build: buildEncerramento });
})();
