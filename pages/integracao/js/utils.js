/* Utilidades genéricas: criação de DOM, ícones inline e pequenas animações. */

const Utils = (() => {
  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === undefined || v === null || v === false) continue;
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else if (k === "style" && typeof v === "object") Object.assign(node.style, v);
      else node.setAttribute(k, v);
    }
    (Array.isArray(children) ? children : [children]).forEach((c) => {
      if (c === undefined || c === null || c === false) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  const SVG_NS = "http://www.w3.org/2000/svg";
  function svg(tag, attrs = {}, children = []) {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === undefined || v === null) continue;
      node.setAttribute(k, v);
    }
    (Array.isArray(children) ? children : [children]).forEach((c) => c && node.appendChild(c));
    return node;
  }

  // Define o atraso de stagger (--d) em elementos filhos que casem com o seletor.
  function stagger(container, selector, base = 0, step = 0.09) {
    const items = container.querySelectorAll(selector);
    items.forEach((item, i) => {
      item.style.setProperty("--d", `${(base + i * step).toFixed(2)}s`);
    });
  }

  function setDelay(node, seconds) {
    node.style.setProperty("--d", `${seconds.toFixed(2)}s`);
  }

  // Conta progressivamente um número quando chamado (reexecuta a cada entrada de slide).
  function animateCount(node, target, { duration = 1200, suffix = "", decimals = 0 } = {}) {
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = target * eased;
      node.textContent = value.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Pequeno acervo de ícones lineares (24x24) desenhados à mão — sem dependência externa.
  const ICONS = {
    acougue: '<path d="M6 4c-2 2-2 5 0 7l3 3-6 6 2 2 6-6 3 3c2 2 5 2 7 0" /><path d="M14 4l6 6" />',
    desossa: '<path d="M4 12h16M4 12c0-3 2-5 5-5m-5 5c0 3 2 5 5 5m11-5c0-3-2-5-5-5m5 5c0 3-2 5-5 5" />',
    temperado: '<circle cx="12" cy="13" r="7" /><path d="M9 3.5c1-1 5-1 6 0M12 6v3" />',
    hortifruti: '<path d="M12 21c-4-1-7-4-7-9 0-3 2-5 4-5 2 0 3 1 3 3 0-2 1-3 3-3 2 0 4 2 4 5 0 5-3 8-7 9Z" /><path d="M12 6V3" />',
    camaras: '<rect x="4" y="5" width="16" height="14" rx="1.5" /><path d="M8 5v14M16 5v14M4 10h4m8 0h4M4 15h4m8 0h4" />',
    expedicao: '<path d="M3 16V7l5-3 5 3v9M3 16l5 3 5-3M13 16V9l5-3 5 3v7l-5 3-5-3Z" />',
    cozinha: '<path d="M6 3v6a3 3 0 0 0 6 0V3M9 9v12M17 3c-2 0-3 2-3 5s1 5 3 5 3-2 3-5-1-5-3-5Zm0 10v6" />',
    copa: '<path d="M6 3h12l-1.5 9a4.5 4.5 0 0 1-9 0L6 3Z" /><path d="M12 15v6M8 21h8" />',
    salao: '<rect x="3" y="4" width="18" height="16" rx="1.5" /><path d="M3 10h18M8 10v10" />',
    atendimento: '<circle cx="12" cy="8" r="3.4" /><path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5" />',
    frete: '<rect x="2" y="9" width="12" height="8" rx="1" /><path d="M14 12h4l3 3v2h-2M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />',
    padaria: '<path d="M4 12c0-4 3.5-8 8-8s8 4 8 8-3 8-8 8-8-4-8-8Z" /><path d="M8 12h8M8 15h5" />',
    confeitaria: '<path d="M12 3c1.5 2 1.5 3.5 0 5-1.5-1.5-1.5-3 0-5ZM6 10h12l-1 10H7L6 10Z" />',
    descanso: '<path d="M4 17V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8M4 17h16M4 17v2m16-2v2M14 10h4a2 2 0 0 1 2 2v2" />',
    lanchonete: '<path d="M5 9h14l-1.5 10a2 2 0 0 1-2 1.7h-7a2 2 0 0 1-2-1.7L5 9Z" /><path d="M8 9c0-3 1.8-5 4-5s4 2 4 5" />',
    producao: '<path d="M4 20V10l8-6 8 6v10" /><path d="M9 20v-6h6v6" />',
    seguranca: '<path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3Z" /><path d="M9 12l2 2 4-4" />',
    compra: '<circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2.4 12h10.2L20 8H6.2" />',
    recebimento: '<path d="M4 4h16v6H4zM4 14h16v6H4z" /><path d="M8 7h4M8 17h4" />',
    loja: '<path d="M4 10l1-5h14l1 5M5 10v9h14v-9M5 10a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />',
    users: '<circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.5 2.6-6 6-6s6 2.5 6 6" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14c2.6.3 4.5 2.4 4.5 6" />',
    check: '<path d="M5 12l5 5L20 6" />',
    cross: '<path d="M6 6l12 12M18 6L6 18" />',
    map: '<path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14" />',
    building: '<rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 8h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1" />',
    id: '<rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="12" r="2" /><path d="M14 10h4M14 14h4M6 16.5c.5-1.5 1.8-2 3-2s2.5.5 3 2" />',
    heart: '<path d="M12 20s-7-4.4-9.5-9C1 7.5 3 4 6.5 4 9 4 11 6 12 7.5 13 6 15 4 17.5 4 21 4 23 7.5 21.5 11 19 15.6 12 20 12 20Z" />',
    quality: '<path d="M12 2l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 2Z" />',
  };

  function icon(name, size = 20) {
    const svgNode = svg("svg", { viewBox: "0 0 24 24", width: size, height: size, fill: "none", stroke: "currentColor", "stroke-width": 1.6, "stroke-linecap": "round", "stroke-linejoin": "round" });
    svgNode.innerHTML = ICONS[name] || ICONS.building;
    return svgNode;
  }

  function chevron(dir = "right") {
    const path = dir === "right" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7";
    const svgNode = svg("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" });
    svgNode.innerHTML = `<path d="${path}" />`;
    return svgNode;
  }

  function unidadeNome(codigo, unidades) {
    const u = unidades.find((x) => x.codigo === codigo);
    return u ? u.nome : codigo;
  }

  return { el, svg, stagger, setDelay, animateCount, icon, chevron, unidadeNome };
})();
