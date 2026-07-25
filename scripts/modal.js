document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".close-modal");

  document.querySelectorAll(".image-box img").forEach(img => {
    img.addEventListener("click", () => {
      modal.classList.add("active");
      modalImg.src = img.src;
      modalImg.alt = img.alt || "Imagem ampliada";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("active");
    }
  });
});

function copiarTexto(botao) {

    const texto = botao
        .parentElement
        .querySelector(".copy-text")
        .textContent
        .trim();

    navigator.clipboard.writeText(texto);

    const original = botao.innerHTML;

    botao.innerHTML = "✅ Copiado!";

    setTimeout(() => {
        botao.innerHTML = original;
    }, 1800);
}

/* ======================================================
       MODO APRESENTAÇÃO 
====================================================== */

(function(){
    "use strict";

    var overlay      = document.getElementById('presentationOverlay');
    var stage         = document.getElementById('presStage');
    var slideEl       = document.getElementById('presSlideContent');
    var counterEl      = document.getElementById('presCounter');
    var progressFillEl = document.getElementById('presProgressFill');
    var dotsEl         = document.getElementById('presDots');
    var prevBtn         = document.getElementById('presPrevBtn');
    var nextBtn         = document.getElementById('presNextBtn');
    var presentBtn       = document.getElementById('presentBtn');
    var exitBtn           = document.getElementById('presExitBtn');

    var slides = [];
    var currentIndex = 0;

    // ---------- Construção automática dos slides a partir do conteúdo da página ----------

    function chunkElements(els, maxChars, maxEls){
      maxChars = maxChars || 560;
      maxEls = maxEls || 4;
      if(!els.length) return [[]];
      var chunks = [], cur = [], curLen = 0;
      els.forEach(function(el){
        var len = (el.textContent || '').length;
        if(cur.length > 0 && (cur.length >= maxEls || curLen + len > maxChars)){
          chunks.push(cur);
          cur = [];
          curLen = 0;
        }
        cur.push(el);
        curLen += len;
      });
      if(cur.length) chunks.push(cur);
      return chunks;
    }

    function buildSlides(){
      var built = [];

      var h1 = document.querySelector('header h1');
      var introP = document.querySelector('header p');
      built.push({
        type: 'title',
        title: h1 ? h1.textContent.trim() : 'Apresentação',
        subtitle: introP ? introP.textContent.trim() : ''
      });

      var article = document.querySelector('main article');
      if(!article) return built;

      var children = Array.from(article.children);
      var sections = [];
      var current = null;
      var leading = [];

      children.forEach(function(el){
        var tag = el.tagName;
        if(tag === 'H2'){
          if(current) sections.push(current);
          current = { heading: el, intro: [], subs: [] };
        } else if(tag === 'H3'){
          if(current){
            current.subs.push({ heading: el, els: [] });
          }
        } else {
          if(!current){
            leading.push(el);
          } else if(current.subs.length > 0){
            current.subs[current.subs.length - 1].els.push(el);
          } else {
            current.intro.push(el);
          }
        }
      });
      if(current) sections.push(current);

      if(leading.length){
        chunkElements(leading).forEach(function(chunk, idx){
          built.push({ type: 'content', title: 'Introdução' + (idx > 0 ? ' (continuação)' : ''), els: chunk });
        });
      }

      sections.forEach(function(sec){
        var heading = sec.heading.textContent.trim();

        if(sec.subs.length === 0){
          var chunks = chunkElements(sec.intro);
          chunks.forEach(function(chunk, idx){
            built.push({ type: 'content', title: heading + (idx > 0 ? ' (continuação)' : ''), els: chunk });
          });
        } else {
          if(sec.intro.length){
            chunkElements(sec.intro).forEach(function(chunk, idx){
              built.push({ type: 'content', title: heading + (idx > 0 ? ' (continuação)' : ''), els: chunk });
            });
          }
          sec.subs.forEach(function(sub){
            var subHeading = heading + ' — ' + sub.heading.textContent.trim();
            chunkElements(sub.els).forEach(function(chunk, idx){
              built.push({ type: 'content', title: subHeading + (idx > 0 ? ' (continuação)' : ''), els: chunk });
            });
          });
        }
      });

      built.push({ type: 'end' });
      return built;
    }

    // ---------- Renderização ----------

    function renderSlideContent(slide){
      slideEl.innerHTML = '';

      if(slide.type === 'title'){
        var wrap = document.createElement('div');
        wrap.className = 'pres-title-slide';
        wrap.innerHTML =
          '<div class="pres-kicker">Treinamento · Faturamento</div>' +
          '<h1>' + escapeHtml(slide.title) + '</h1>' +
          (slide.subtitle ? '<p>' + escapeHtml(slide.subtitle) + '</p>' : '');
        slideEl.appendChild(wrap);
        return;
      }

      if(slide.type === 'end'){
        var end = document.createElement('div');
        end.className = 'pres-end-slide';
        end.innerHTML =
          '<h2>✅ Fim da apresentação</h2>' +
          '<p>Reveja o Manual de Faturamento a qualquer momento. Bons cálculos!</p>';
        slideEl.appendChild(end);
        return;
      }

      var heading = document.createElement('h2');
      heading.textContent = slide.title;
      slideEl.appendChild(heading);

      slide.els.forEach(function(el){
        slideEl.appendChild(el.cloneNode(true));
      });

      if(slide.els.length === 0){
        var note = document.createElement('p');
        note.textContent = 'Consulte a versão completa no manual.';
        slideEl.appendChild(note);
      }
    }

    function escapeHtml(str){
      var d = document.createElement('div');
      d.textContent = str || '';
      return d.innerHTML;
    }

    function renderDots(){
      dotsEl.innerHTML = '';
      slides.forEach(function(_, i){
        var dot = document.createElement('span');
        dot.className = 'pres-dot' + (i === currentIndex ? ' active' : '');
        dotsEl.appendChild(dot);
      });
    }

    function goToSlide(index){
      if(index < 0 || index >= slides.length) return;
      currentIndex = index;

      slideEl.classList.remove('pres-visible');
      window.requestAnimationFrame(function(){
        renderSlideContent(slides[currentIndex]);
        stage.scrollTop = 0;
        window.requestAnimationFrame(function(){
          slideEl.classList.add('pres-visible');
        });
      });

      counterEl.textContent = 'Slide ' + (currentIndex + 1) + ' de ' + slides.length;
      progressFillEl.style.width = (((currentIndex + 1) / slides.length) * 100) + '%';
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === slides.length - 1;
      renderDots();
    }

    function nextSlide(){ if(currentIndex < slides.length - 1) goToSlide(currentIndex + 1); }
    function prevSlide(){ if(currentIndex > 0) goToSlide(currentIndex - 1); }

    // ---------- Abrir / fechar ----------

    function openPresentation(){
      slides = buildSlides();
      currentIndex = 0;
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if(overlay.requestFullscreen){
        overlay.requestFullscreen().catch(function(){});
      } else if(overlay.webkitRequestFullscreen){
        overlay.webkitRequestFullscreen();
      }

      goToSlide(0);
    }

    function closePresentation(){
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if(document.fullscreenElement){
        document.exitFullscreen().catch(function(){});
      } else if(document.webkitFullscreenElement && document.webkitExitFullscreen){
        document.webkitExitFullscreen();
      }
    }

    // ---------- Eventos ----------

    presentBtn.addEventListener('click', openPresentation);
    exitBtn.addEventListener('click', closePresentation);
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    stage.addEventListener('click', function(e){
      if(e.target.closest('a')) return;
      nextSlide();
    });

    document.addEventListener('keydown', function(e){
      if(!overlay.classList.contains('active')) return;
      if(e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' '){
        e.preventDefault();
        nextSlide();
      } else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
        e.preventDefault();
        prevSlide();
      } else if(e.key === 'Escape'){
        closePresentation();
      }
    });

    document.addEventListener('fullscreenchange', function(){
      if(!document.fullscreenElement && overlay.classList.contains('active')){
        closePresentation();
      }
    });
  })();