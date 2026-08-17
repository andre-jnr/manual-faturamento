/* Motor da apresentação: escala do palco, navegação, progresso e ciclo de vida dos slides. */

const Presentation = (() => {
  const STAGE_W = 1920;
  const STAGE_H = 1080;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let slides = [];
  let current = 0;
  let locked = false;
  let stageEl, deckEl;
  let dom = {};
  let autoplayTimer = null;

  function scaleStage() {
    const scale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
    const left = (window.innerWidth - STAGE_W * scale) / 2;
    const top = (window.innerHeight - STAGE_H * scale) / 2;
    stageEl.style.width = STAGE_W + "px";
    stageEl.style.height = STAGE_H + "px";
    stageEl.style.transform = `scale(${scale})`;
    stageEl.style.position = "absolute";
    stageEl.style.top = `${top}px`;
    stageEl.style.left = `${left}px`;
  }

  function buildChrome() {
    const { el } = Utils;
    const ambient = el("div", { class: "ambient" }, [
      el("div", { class: "ambient__line" }),
      el("div", { class: "ambient__watermark" }),
      el("div", { class: "ambient__grain" }),
      el("div", { class: "ambient__particles" }, Array.from({ length: 16 }).map((_, i) => particle(i))),
    ]);
    stageEl.appendChild(ambient);

    deckEl = el("div", { class: "deck" });
    stageEl.appendChild(deckEl);

    const logoMark = el("div", { class: "slide__logo-mark" }, [el("img", { src: DATA.empresa.logo, alt: "" }), el("span", {}, DATA.empresa.nome)]);
    stageEl.appendChild(logoMark);

    const idx = el("div", { class: "slide__index" }, [el("b", { id: "idxCurrent" }, "01"), document.createTextNode(" / "), el("span", { id: "idxTotal" }, "00")]);
    stageEl.appendChild(idx);

    const progress = el("div", { class: "nav-progress" }, [el("div", { class: "nav-progress__bar", id: "progressBar" })]);
    stageEl.appendChild(progress);

    const zonePrev = el("div", { class: "nav-zone nav-zone--prev", onclick: () => go(-1) });
    const zoneNext = el("div", { class: "nav-zone nav-zone--next", onclick: () => go(1) });
    stageEl.appendChild(zonePrev);
    stageEl.appendChild(zoneNext);

    const btnPrev = el("button", { class: "nav-btn", "aria-label": "Slide anterior", onclick: () => go(-1) }, chevronIcon("left"));
    const btnNext = el("button", { class: "nav-btn", "aria-label": "Próximo slide", onclick: () => go(1) }, chevronIcon("right"));
    const meta = el("div", { class: "nav-meta" }, [el("div", { class: "nav-meta__count" }, [el("b", { id: "metaCurrent" }, "01"), document.createTextNode(" / "), el("span", { id: "metaTotal" }, "00"), document.createTextNode("  ·  "), el("span", { id: "sectionLabel" }, "")])]);
    const controls = el("div", { class: "nav-controls" }, [btnPrev, meta, btnNext]);
    stageEl.appendChild(controls);

    dom = {
      idxCurrent: idx.querySelector("#idxCurrent"),
      idxTotal: idx.querySelector("#idxTotal"),
      metaCurrent: meta.querySelector("#metaCurrent"),
      metaTotal: meta.querySelector("#metaTotal"),
      sectionLabel: meta.querySelector("#sectionLabel"),
      progressBar: progress.querySelector("#progressBar"),
      btnPrev,
      btnNext,
    };
  }

  function particle(i) {
    const left = (i * 61) % 100;
    const delay = (i * 1.7) % 14;
    const dur = 12 + (i % 6);
    const node = document.createElement("i");
    node.style.left = left + "%";
    node.style.bottom = "-10px";
    node.style.animationDelay = `${delay}s`;
    node.style.animationDuration = `${dur}s`;
    return node;
  }

  function chevronIcon(dir) {
    const svgNode = Utils.svg("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" });
    svgNode.innerHTML = dir === "left" ? '<path d="M15 5l-7 7 7 7" />' : '<path d="M9 5l7 7-7 7" />';
    return svgNode;
  }

  function buildSlideShell(def, index) {
    const section = document.createElement("section");
    section.className = `slide slide--${def.id}`;
    section.dataset.index = index;
    section.dataset.id = def.id;
    deckEl.appendChild(section);
    return section;
  }

  function ensureBuilt(index) {
    const s = slides[index];
    if (s.built) return;
    s.build(s.section);
    s.built = true;
  }

  function render() {
    slides.forEach((s, i) => {
      const active = i === current;
      s.section.classList.toggle("is-active", active);
      s.section.classList.toggle("is-prev", i < current);
      if (active) {
        ensureBuilt(i);
        requestAnimationFrame(() => {
          if (typeof s.onEnter === "function") s.onEnter(s.section);
        });
      }
    });

    const n = slides.length;
    dom.idxCurrent.textContent = String(current + 1).padStart(2, "0");
    dom.idxTotal.textContent = String(n).padStart(2, "0");
    dom.metaCurrent.textContent = String(current + 1).padStart(2, "0");
    dom.metaTotal.textContent = String(n).padStart(2, "0");
    dom.sectionLabel.textContent = slides[current].section_ || "";
    dom.progressBar.style.width = `${(current / (n - 1)) * 100}%`;
    dom.btnPrev.disabled = current === 0;
    dom.btnNext.disabled = current === n - 1;
    stageEl.dataset.current = slides[current].id;

    clearTimeout(autoplayTimer);
    if (slides[current].autoplay && !reducedMotion) {
      autoplayTimer = setTimeout(() => go(1), slides[current].autoplay);
    }
  }

  function goTo(index) {
    if (locked) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    if (clamped === current) return;
    current = clamped;
    locked = true;
    render();
    setTimeout(() => (locked = false), 420);
  }

  function go(delta) {
    goTo(current + delta);
  }

  function bindEvents() {
    window.addEventListener("resize", scaleStage);
    window.addEventListener("keydown", (e) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        go(1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(slides.length - 1);
      }
    });

    let touchX = null;
    stageEl.addEventListener(
      "touchstart",
      (e) => {
        touchX = e.touches[0].clientX;
      },
      { passive: true }
    );
    stageEl.addEventListener(
      "touchend",
      (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
        touchX = null;
      },
      { passive: true }
    );
  }

  function init(slideDefs) {
    stageEl = document.getElementById("stage");
    scaleStage();
    buildChrome();

    slides = slideDefs.map((def, i) => {
      const section = buildSlideShell(def, i);
      return { ...def, section, built: false, section_: def.section };
    });

    bindEvents();
    render();
  }

  return { init, go, goTo, get current() { return current; } };
})();
