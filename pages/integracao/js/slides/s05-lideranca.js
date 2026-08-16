(() => {
  const { el } = Utils;
  const { sectionHeader, orgNode, orgChartShell } = Components;

  /* ---------- Quem conduz nossas unidades ---------- */
  function buildGerenciaLoja(container) {
    const inner = el("div", { class: "slide__inner" });
    inner.appendChild(sectionHeader({ eyebrow: "Liderança", title: "Quem conduz nossas unidades", align: "center" }));

    const g = DATA.gerenciaPorLoja;
    const shell = orgChartShell();
    const nodes = shell.querySelector(".orgchart__nodes");
    nodes.appendChild(orgNode({ id: "presidente", nome: g.topo[0].nome, cargo: g.topo[0].cargo, left: 50, top: 0, lead: true }));
    nodes.appendChild(orgNode({ id: "diretor-geral", parent: "presidente", nome: g.topo[1].nome, cargo: g.topo[1].cargo, left: 50, top: 22 }));
    nodes.appendChild(orgNode({ id: "gerente-geral", parent: "diretor-geral", nome: g.topo[2].nome, cargo: g.topo[2].cargo, left: 50, top: 44, lead: true }));

    const cols = [10, 30, 50, 70, 90];
    g.unidades.forEach((u, i) => nodes.appendChild(orgNode({ parent: "gerente-geral", nome: u.nome, cargo: "Loja / Unidade", unidade: u.unidade, left: cols[i], top: 78 })));

    inner.appendChild(
      el("div", { class: "slide__body" }, [
        shell,
        el("p", { class: "quote reveal", style: { "--d": "1.2s", "text-align": "center", margin: "0 auto" } }, g.frase),
      ])
    );
    container.appendChild(inner);
  }

  /* ---------- Organograma geral ---------- */

  // Card estático (sem posicionamento absoluto, sem linha de conexão) usado
  // na cadeia executiva do topo — aqui não há uma relação 1:1 clara o
  // bastante para desenhar linhas sem confundir, então mostramos os níveis
  // apenas pela ordem e agrupamento visual.
  function execCard(nome, cargo, lead) {
    return el("div", { class: `org-node org-node--static ${lead ? "org-node--lead" : ""}`.trim() }, [el("div", { class: "org-node__name" }, nome), cargo ? el("div", { class: "org-node__role" }, cargo) : null]);
  }

  // Mini-organograma de 2 níveis (líder + equipe) usado dentro de cada bloco
  // funcional — aqui a relação É 1:N clara, então faz sentido ter linhas.
  function miniChart(leader, filhos) {
    const shell = orgChartShell();
    shell.classList.add("orgchart--mini");
    const nodes = shell.querySelector(".orgchart__nodes");
    nodes.appendChild(orgNode({ id: "lider", nome: leader.nome, cargo: leader.cargo, left: 50, top: 0, lead: true }));
    const n = filhos.length;
    filhos.forEach((f, i) => {
      const left = n === 1 ? 50 : 8 + (i * (100 - 16)) / (n - 1);
      nodes.appendChild(orgNode({ parent: "lider", nome: f.nome, unidade: f.unidade, left, top: 62 }));
    });
    return shell;
  }

  function buildOrganogramaGeral(container) {
    const inner = el("div", { class: "slide__inner slide__inner--tight" });
    inner.appendChild(sectionHeader({ eyebrow: "Liderança", title: "Organograma geral" }));

    const o = DATA.organogramaGeral;

    const chain = el("div", { class: "exec-chain reveal", style: { "--d": "0.1s" } }, [
      execCard(o.presidente.nome, o.presidente.cargo, true),
      execCard(o.diretoraFinanceira.nome, o.diretoraFinanceira.cargo),
      el("div", { class: "exec-chain__row" }, [execCard(o.diretores[0].nome, o.diretores[0].cargo), execCard(o.diretores[1].nome, o.diretores[1].cargo)]),
    ]);

    const chartNilton = miniChart(
      o.geral,
      o.blocoNilton.map((item) => ({ nome: item.nome, unidade: item.unidade }))
    );
    const chartJanaina = miniChart(
      o.controladoria,
      o.blocoJanaina.map((item) => ({ nome: item.nomes.join(", "), unidade: item.area }))
    );

    const blocks = el("div", { class: "org-blocks reveal", style: { "--d": "0.4s" } }, [
      el("div", { class: "org-block org-block--chart" }, [el("div", { class: "org-block__title" }, "Operações"), chartNilton]),
      el("div", { class: "org-block org-block--chart" }, [el("div", { class: "org-block__title" }, "Controladoria"), chartJanaina]),
    ]);

    inner.appendChild(el("div", { class: "slide__body organograma-geral-body" }, [chain, blocks]));
    container.appendChild(inner);
  }

  SLIDES.push({ id: "gerencia-loja", section: "Liderança", build: buildGerenciaLoja, onEnter: (c) => OrgChart.connect(c) });
  SLIDES.push({ id: "organograma-geral", section: "Liderança", build: buildOrganogramaGeral, onEnter: (c) => OrgChart.connect(c) });
})();
