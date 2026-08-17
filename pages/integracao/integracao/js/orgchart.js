/*
  Desenha conexões entre nós de organograma (.org-node[data-parent]) a
  partir da geometria real do DOM — funciona com qualquer disposição
  definida em CSS (left/top em %), sem coordenadas fixas no JS.
  As linhas são "desenhadas" via stroke-dashoffset animado.
*/

const OrgChart = (() => {
  function anchor(node, edge) {
    return {
      x: node.offsetLeft + node.offsetWidth / 2,
      y: edge === "bottom" ? node.offsetTop + node.offsetHeight : node.offsetTop,
    };
  }

  // Aceita tanto o próprio `.orgchart` quanto um contêiner maior que
  // possua um ou mais `.orgchart` dentro dele (ex.: dois mini-organogramas
  // lado a lado no mesmo slide) — cada um é conectado independentemente.
  function connect(container, opts = {}) {
    const charts = container.classList && container.classList.contains("orgchart") ? [container] : Array.from(container.querySelectorAll(".orgchart"));
    charts.forEach((chart) => connectOne(chart, opts));
  }

  function connectOne(container, { stagger = 0.1, base = 0.15 } = {}) {
    const svgEl = container.querySelector(".orgchart__svg");
    const nodesLayer = container.querySelector(".orgchart__nodes");
    if (!svgEl || !nodesLayer) return;

    const w = nodesLayer.clientWidth;
    const h = nodesLayer.clientHeight;
    svgEl.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svgEl.innerHTML = "";

    const nodes = Array.from(nodesLayer.querySelectorAll(".org-node[data-parent]"));
    let i = 0;
    nodes.forEach((node) => {
      const parentIds = node.dataset.parent.split(/\s+/).filter(Boolean);
      parentIds.forEach((pid) => {
        const parent = nodesLayer.querySelector(`.org-node[data-id="${pid}"]`);
        if (!parent) return;
        const p1 = anchor(parent, "bottom");
        const p2 = anchor(node, "top");
        const midY = (p1.y + p2.y) / 2;
        const d = `M ${p1.x} ${p1.y} C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
        const path = Utils.svg("path", { class: "orgchart__edge", d });
        svgEl.appendChild(path);

        const len = path.getTotalLength();
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);
        path.style.transition = "none";
        // força reflow para garantir que o estado inicial seja pintado
        path.getBoundingClientRect();
        const delay = base + i * stagger;
        i += 1;
        requestAnimationFrame(() => {
          path.style.transition = `stroke-dashoffset 0.9s var(--ease-out) ${delay}s`;
          requestAnimationFrame(() => {
            path.style.strokeDashoffset = "0";
          });
        });
      });
    });
  }

  return { connect };
})();
