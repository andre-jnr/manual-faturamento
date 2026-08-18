name: apresentacao-editorial-scroll
description: Gera peças editoriais em HTML autocontido, estilo "matéria/documentário digital" em tema escuro, explicando um conceito, documento, processo ou instituição com tipografia serifada grande, número gigante de fundo no hero, cursor customizado e botão magnético. Em telas de computador funciona como apresentação por clique (cada seção é um slide full-screen, avança clicando ou com setas do teclado, transição suave de fade); em celular/touch mantém rolagem contínua com revelação de texto ao rolar. Arquivo HTML único, JS puro, sem React/build/CDN — mais leve que a apresentação cinematográfica completa. Use para "explicar X em formato de site/página", "página bonita sobre X", "artigo interativo", "apresentação em slides que eu passo clicando", ou landing explicativa/institucional de um conceito, documento ou processo. NÃO use para decks pptx nem quando pedirem React, Framer Motion, GSAP, Three.js ou "estilo Awwwards/FWA" — nesses casos use apresentacao-cinematografica.

---

# Apresentação Editorial em Scroll (vanilla HTML)

## Filosofia

Isto não é um slide tradicional nem uma página de scroll simples — é uma **matéria digital com dois modos de leitura**. Em telas de computador (mouse fino + hover), a peça se comporta como uma **apresentação por clique**: cada seção é um slide full-screen, e o leitor avança clicando ou com as setas do teclado, com uma transição suave de fade + leve deslocamento vertical entre um slide e o próximo — sem barra de rolagem, sem scroll. Em touch/mobile, mantém o scroll contínuo natural (o gesto de rolar é mais natural em celular do que cliques sequenciais). A voz visual é a de um documentário editorial sério — tipografia serifada grande, paleta escura e restrita, um único tom de destaque usado com parcimônia. O movimento existe para guiar a leitura (revelar, escalonar, respirar), nunca para chamar atenção para si mesmo.

Diferença chave em relação a uma apresentação de produto/marketing: aqui o objetivo é **explicar algo com clareza e autoridade** (um conceito, um documento, uma lei, um processo, uma instituição), não vender ou impressionar com efeitos 3D. Pense em uma reportagem longform do tipo NYT/The Pudding entregue como um slide deck elegante, não em um hero de startup.

## Quando usar esta skill vs. `apresentacao-cinematografica`

| Sinal do pedido                                                                                                             | Skill                                            |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| "explica X num site bonito", "vira uma página editorial", conteúdo informativo/institucional/conceitual, sem menção a stack | **Esta skill** (vanilla, mais rápida, mais leve) |
| Menção explícita a React, Framer Motion, GSAP, Three.js, 3D, "estilo Awwwards/FWA", pitch de produto/negócio                | `apresentacao-cinematografica`                   |
| Ambíguo, mas o conteúdo é claramente narrativo-explicativo (não comercial)                                                  | Esta skill é o padrão mais seguro                |

Se o usuário não especificar, prefira esta skill para conteúdo explicativo/educacional — ela entrega 90% do impacto visual com uma fração do código e sem dependências externas (funciona offline, abre em qualquer navegador, sem risco de CDN falhar).

**Identidade visual fixa**: esta skill tem uma paleta e tipografia próprias e consistentes (ver `:root` no boilerplate) — fundo escuro quase preto, texto marfim, accent dourado, tipografia serifada editorial para títulos. Use sempre essa identidade, peça após peça, para que o formato seja reconhecível. Só desvie dela se o usuário pedir explicitamente outra paleta, tema claro ou cores de marca.

## Stack técnica

Um único arquivo `.html` autocontido: CSS puro (custom properties + `clamp()` para tipografia fluida) e JavaScript vanilla (IIFE, sem dependências, sem build). Nada de React, nada de import de CDN. Isso é uma escolha deliberada, não uma limitação — comece sempre a partir de `assets/boilerplate.html`, que já contém o motor completo:

- **Modo apresentação (desktop, por clique)**: quando o dispositivo tem mouse fino + hover (`(hover: hover) and (pointer: fine) and (min-width: 900px)`), o JS adiciona `slides-mode` ao `<body>`. Cada `<section>` vira um slide `position: fixed` full-screen; só um fica com a classe `.slide-active` por vez. Avança-se clicando em qualquer área vazia do slide (cliques em links/botões/campos não disparam o avanço), com as setas do teclado (←/→/↑/↓/PageUp/PageDown/Espaço/Home/End), ou pelos botões de seta + contador no canto inferior direito. A transição é um fade + leve translateY (28px) na mesma curva de easing do resto da peça — elegante, nunca abrupta. Uma barra fina no topo (`.deck-progress`) mostra o progresso do deck inteiro. As animações de entrada de cada seção (`.reveal`, `.split-text`) **replay a cada vez que o slide é ativado** — dá uma sensação cinematográfica de "virar a página", não só troca de tela.
- **Modo scroll (mobile/touch)**: em qualquer dispositivo sem hover fino (celular, tablet touch), o comportamento original de rolagem contínua com `IntersectionObserver` é mantido sem alteração — é o gesto nativo desses dispositivos, não faz sentido forçar clique.
- **Reveal on scroll** (modo scroll): `IntersectionObserver` aplicando a classe `.reveal`/`.visible` (fade + translateY, com atraso configurável via `style="--d:0.1s"`).
- **Split text palavra-por-palavra**: qualquer elemento com `data-split` é quebrado em spans e revelado em cascata quando entra na viewport (modo scroll) ou quando o slide é ativado (modo apresentação) — use só em 2-3 headlines-chave (hero, viradas, CTA final), nunca em corpo de texto.
- **Hero com número/sigla gigante de fundo**: texto enorme (`clamp(8rem, 32vw, 26rem)`), só contorno (`-webkit-text-stroke`). No modo scroll tem parallax leve ligado ao scroll; no modo apresentação fica estático (não há scroll para amarrar o parallax) — isso é automático, não precisa de ajuste manual.
- **Barra de progresso**: no modo scroll, ligada à seção de processo (`#lifecycle`); no modo apresentação, vira a barra global do deck no topo da tela (`.deck-progress`) — também automático.
- **Cursor customizado + botão magnético**: só em desktop com mouse fino, ativos nos dois modos (scroll e apresentação).

## Fluxo de trabalho

1. **Leia o conteúdo/tema fornecido** pelo usuário (ou pesquise, se for um conceito que você já domina) e extraia: uma definição central em uma frase, 3-6 categorias/tipos (se aplicável), um processo de 3-6 passos (se aplicável), e 3-4 argumentos de "por que importa".
2. **Copie `assets/boilerplate.html`** para o destino de saída — não escreva o motor de CSS/JS do zero, ele já está pronto e testado.
3. **Preencha o conteúdo real** em cada seção (nunca lorem ipsum), seguindo a ordem narrativa do boilerplate: Hero → Definição → Categorias/Tipos → Processo → Importância → Futuro/Virada (opcional) → CTA/Síntese final. Remova ou repita seções conforme o volume de conteúdo — nem todo tema tem "tipos" ou "processo"; se não houver, corte a seção em vez de forçar conteúdo fraco.
4. **Não troque a paleta nem as fontes por conta própria.** O boilerplate já vem com a identidade visual definitiva desta skill — fundo `#0b0e11`/`#10151b`, texto `#f2ede4`, accent dourado `#d9a441`, muted `#8b9099`, display serifada (Georgia/Iowan Old Style/Palatino) + corpo sans-serif do sistema. Mantenha exatamente essas variáveis em `:root` em toda peça que gerar com esta skill — é a assinatura visual do formato, não um placeholder de exemplo. Só altere cor ou fonte se o usuário pedir isso explicitamente (ex.: "quero em tema claro", "usa a paleta da minha marca X"); nesse caso troque somente as variáveis em `:root` — o resto do sistema (contraste, hairlines, etc.) se adapta automaticamente porque tudo consome as CSS variables.
5. **Ajuste os `--d`/`--i` de stagger** para os itens que você adicionar ou remover em listas repetidas (`.type-row`, `.lifecycle-step`, `.importance-card`), incrementando em ~0.08–0.1s por item, na ordem em que aparecem.
6. **Revise a proporção de seções pelo volume de conteúdo**: tema curto → 4-5 seções (hero, definição, 1-2 destaques, CTA); briefing médio → 5-7 seções (o fluxo completo do boilerplate); conteúdo denso → agrupe em mais seções temáticas, mas mantenha cada seção legível em uma "tela" de rolagem, sem empilhar texto demais em um único bloco.
7. **Salve em `/mnt/user-data/outputs/`** e apresente com `present_files`.

## Tipografia e conteúdo

- Título do hero: curto, de impacto, sempre com `data-split` para o efeito de revelação palavra-por-palavra.
- Eyebrow (`.eyebrow`): rótulo curto em caixa alta, letter-spacing largo, sempre na cor de destaque — usado para contextualizar cada seção antes do título.
- Headlines de seção (`h2`): frases completas com 1-2 termos destacados via `<span class="highlight">`, não títulos telegráficos — a frase já carrega a ideia central da seção.
- Parágrafos de corpo: curtos (`max-width: 58-60ch`), sem jargão desnecessário, um parágrafo por ideia.
- Números/tags (`.tag`, `.num`, `.idx`): use algarismos, siglas curtas ou numeração — eles funcionam como âncoras visuais nas listas.

## Responsividade

O boilerplate já cobre os dois modos automaticamente a partir de um único conjunto de seções (você não escreve conteúdo duas vezes):

- **Desktop (mouse fino + hover, ≥900px)**: modo apresentação por clique — sem barra de rolagem, navegação por clique/teclado/setas, com contador e barra de progresso do deck.
- **Touch/mobile**: modo scroll contínuo, idêntico ao comportamento original.
- Cursor customizado e botão magnético são desativados automaticamente em touch/`pointer: coarse` — não precisa de tratamento extra.
- `.lifecycle-track` e `.importance-grid` colapsam para coluna única abaixo de 900px/760px respectivamente (isso vale para os dois modos).
- Toda tipografia usa `clamp()` — evite adicionar tamanhos fixos em `px` para headlines novas.
- Ao revisar uma peça gerada, teste mentalmente os dois modos: como leitura contínua (scroll) e como apresentação clicável (desktop) — o conteúdo de cada seção precisa funcionar isolado em uma "tela" nos dois casos, já que no modo apresentação cada seção some completamente da tela ao sair.

## Saída esperada

- Arquivo `.html` único, sem dependências externas, pronto para abrir direto no navegador ou publicar em qualquer host estático.
- Conteúdo real do usuário embutido em todas as seções — nunca placeholder.
- Comentários HTML curtos marcando cada seção (mantidos do boilerplate) para facilitar edição posterior.
