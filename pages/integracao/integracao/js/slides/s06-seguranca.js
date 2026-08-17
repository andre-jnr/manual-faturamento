(() => {
  const { el, stagger, icon } = Utils;
  const { sectionHeader, card, ruleCard } = Components;

  /* ---------- 5S ---------- */
  function build5S(container) {
    const inner = el("div", { class: "slide__inner" });
    inner.appendChild(sectionHeader({ eyebrow: "Segurança & Qualidade", title: "5S", lead: "Organização, disciplina, limpeza, eficiência e segurança — todos os dias.", align: "center" }));
    const row = el(
      "div",
      { class: "cinco-s-row" },
      DATA.cincoS.map((s) =>
        card([el("div", { class: "cinco-s__letter" }, s.letra), el("div", { class: "cinco-s__termo" }, s.termo), el("div", { class: "cinco-s__nome" }, s.nome), el("div", { class: "cinco-s__texto" }, s.texto)], { className: "cinco-s__card" })
      )
    );
    inner.appendChild(el("div", { class: "slide__body col-center" }, row));
    container.appendChild(inner);
    stagger(row, ".card", 0.15, 0.11);
  }

  /* ---------- Segurança do trabalho ---------- */
  function buildSeguranca(container) {
    const inner = el("div", { class: "slide__inner" });
    const grid = el("div", { class: "grid-2 grid-2--asym" }, [
      el("div", { class: "col col-center" }, [
        el("span", { class: "eyebrow reveal" }, "Segurança & Qualidade"),
        el("h2", { class: "title-xl reveal-blur", style: { "--d": "0.15s" } }, ["Segurança começa ", el("span", { class: "gold-text" }, "com você.")]),
        el("p", { class: "quote reveal", style: { "--d": "0.4s" } }, "Colaborador, você é nosso maior bem!"),
        el("p", { class: "lead reveal", style: { "--d": "0.58s" } }, "Queremos que você volte para casa em segurança!"),
      ]),
      el("div", { class: "col seguranca-badges" }, [
        el("div", { class: "seguranca-badge reveal-scale", style: { "--d": "0.3s" } }, el("img", { src: "images/trabalho-seguro-vida-completa.png", alt: "Trabalho seguro, vida completa" })),
        el("div", { class: "seguranca-badge seguranca-badge--sm reveal-scale", style: { "--d": "0.5s" } }, el("img", { src: "images/seguranca-do-trabalho.png", alt: "Segurança do trabalho" })),
      ]),
    ]);
    inner.appendChild(el("div", { class: "slide__body" }, grid));
    container.appendChild(inner);
  }

  /* ---------- EPIs ---------- */
  function buildEpis(container) {
    const inner = el("div", { class: "slide__inner" });
    inner.appendChild(sectionHeader({ eyebrow: "Segurança & Qualidade", title: "Segurança é atitude.", lead: "A prevenção de acidentes começa com a informação e a utilização correta dos EPIs. Nos açougues, entre os equipamentos utilizados estão:" }));
    const grid = el("div", { class: "epi-grid" }, DATA.epis.map((e) => card([el("div", { class: "area-card__icon" }, icon("seguranca")), el("div", { class: "area-card__title" }, e.nome)], { className: "area-card" })));
    inner.appendChild(
      el("div", { class: "slide__body" }, [
        grid,
        el("div", { class: "fonte-credito reveal", style: { "--d": "1s" } }, "Fonte: Instituto Brasileiro de Ensino Profissionalizante — INBRAEP"),
      ])
    );
    container.appendChild(inner);
    stagger(grid, ".card", 0.15, 0.06);
  }

  /* ---------- Certo x Errado ---------- */
  function buildCertoErrado(container) {
    const inner = el("div", { class: "slide__inner" });
    inner.appendChild(sectionHeader({ eyebrow: "Segurança & Qualidade", title: "Certo x Errado", align: "center" }));

    function col(list, variant) {
      const isOk = variant === "certo";
      return el("div", { class: `ce-col ce-col--${variant}` }, [
        el("div", { class: `ce-col__tag ce-col__tag--${variant} reveal`, style: { "--d": "0.15s" } }, [icon(isOk ? "check" : "cross", 16), isOk ? "CERTO" : "ERRADO"]),
        el(
          "div",
          { class: "ce-col__images" },
          list.map((it, i) =>
            el("div", { class: `ce-img reveal-scale`, style: { "--d": `${0.3 + i * 0.16}s` } }, [
              el("img", { src: it.imagem, alt: it.legenda }),
              el("div", { class: `ce-img__badge ce-img__badge--${variant}` }, icon(isOk ? "check" : "cross", 14)),
              el("div", { class: "ce-img__legenda" }, it.legenda),
            ])
          )
        ),
      ]);
    }

    inner.appendChild(el("div", { class: "slide__body ce-grid" }, [col(DATA.certoErrado.certo, "certo"), col(DATA.certoErrado.errado, "errado")]));
    container.appendChild(inner);
  }

  /* ---------- Higiene pessoal ---------- */
  function buildHigiene(container) {
    const inner = el("div", { class: "slide__inner" });
    inner.appendChild(sectionHeader({ eyebrow: "Segurança & Qualidade", title: "Higiene pessoal no trabalho", align: "center" }));
    const icons = { Unhas: "check", Cabelos: "users", Barba: "id" };
    const row = el("div", { class: "higiene-row" }, DATA.higiene.map((h) => card([el("div", { class: "area-card__icon higiene-icon" }, icon(icons[h.titulo] || "check", 26)), el("div", { class: "value-card__title", style: { fontSize: "22px" } }, h.titulo), el("div", { class: "value-card__text" }, h.texto)], { className: "value-card higiene-card" })));
    inner.appendChild(el("div", { class: "slide__body col-center" }, row));
    container.appendChild(inner);
    stagger(row, ".card", 0.15, 0.13);
  }

  /* ---------- Normas e políticas ---------- */
  function buildNormas(container) {
    const inner = el("div", { class: "slide__inner" });
    inner.appendChild(sectionHeader({ eyebrow: "Segurança & Qualidade", title: "Nossas regras protegem todos nós." }));
    const grid = el("div", { class: "normas-grid" }, DATA.normas.map((n, i) => ruleCard(i + 1, n)));
    inner.appendChild(el("div", { class: "slide__body col-center" }, grid));
    container.appendChild(inner);
    stagger(grid, ".card", 0.12, 0.08);
  }

  SLIDES.push({ id: "cinco-s", section: "Segurança & Qualidade", build: build5S });
  SLIDES.push({ id: "seguranca-trabalho", section: "Segurança & Qualidade", build: buildSeguranca });
  SLIDES.push({ id: "epis", section: "Segurança & Qualidade", build: buildEpis });
  SLIDES.push({ id: "certo-errado", section: "Segurança & Qualidade", build: buildCertoErrado });
  SLIDES.push({ id: "higiene", section: "Segurança & Qualidade", build: buildHigiene });
  SLIDES.push({ id: "normas", section: "Segurança & Qualidade", build: buildNormas });
})();
