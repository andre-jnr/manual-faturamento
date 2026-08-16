;(() => {
  const { el, stagger, chevron } = Utils
  const { sectionHeader, card, person, kvList } = Components

  function areaTags(list) {
    return el(
      'div',
      { class: 'area-tags' },
      list.map(a => el('span', { class: 'area-tag reveal', style: {} }, a))
    )
  }

  function unidadeKv(u) {
    return kvList([
      { key: 'CNPJ', value: u.cnpj },
      { key: 'Código', value: u.codigo },
      { key: 'Endereço', value: u.endereco.join('<br>') }
    ])
  }

  /* ---------- Layout padrão para unidades com detalhamento completo ---------- */
  function buildUnidadeDetail({
    unidade,
    foto,
    lideres,
    areas,
    tituloDestaque
  }) {
    return container => {
      const inner = el('div', { class: 'slide__inner' })
      inner.appendChild(
        sectionHeader({
          eyebrow: 'Nossas Unidades',
          title: `Unidade ${unidade.nome}`,
          lead:
            tituloDestaque ||
            `Código ${unidade.codigo} · Bairro ${unidade.bairro}`
        })
      )

      const right = el('div', { class: 'col unidade-info' }, [
        el(
          'div',
          { class: 'reveal', style: { '--d': '0.2s' } },
          unidadeKv(unidade)
        ),
        lideres && lideres.length
          ? el(
              'div',
              { class: 'unidade-team reveal', style: { '--d': '0.32s' } },
              [
                el('div', { class: 'label' }, 'Liderança'),
                el(
                  'div',
                  { class: 'unidade-team__row' },
                  lideres.map(p => person(p))
                )
              ]
            )
          : null,
        areas && areas.length
          ? el(
              'div',
              { class: 'unidade-areas reveal', style: { '--d': '0.44s' } },
              [
                el('div', { class: 'label' }, 'Áreas da unidade'),
                areaTags(areas)
              ]
            )
          : null
      ])

      const grid = el('div', { class: 'grid-2 grid-2--asym' }, [
        el(
          'div',
          { class: 'col hero-photo reveal-scale', style: { '--d': '0.1s' } },
          [
            el('img', { src: foto, alt: `Unidade ${unidade.nome}` }),
            el('div', { class: 'hero-photo__veil' })
          ]
        ),
        right
      ])

      inner.appendChild(el('div', { class: 'slide__body' }, grid))
      container.appendChild(inner)
      const teamRow = inner.querySelector('.unidade-team__row')
      if (teamRow) stagger(teamRow, '.card', 0.4, 0.1)
      const tags = inner.querySelector('.area-tags')
      if (tags) stagger(tags, '.area-tag', 0.5, 0.045)
    }
  }

  /* ---------- Ponta Negra ---------- */
  const pn = DATA.unidades.find(u => u.id === 'pn')
  const buildPN = buildUnidadeDetail({
    unidade: pn,
    foto: 'images/loja-pn.png',
    lideres: [
      { nome: pn.diretor, cargo: 'Diretor', gold: true },
      { nome: pn.gerenteAcougue, cargo: 'Gerente de Açougue' },
      { nome: pn.gerenteFrenteLoja, cargo: 'Gerente — Frente de Loja / Caixas' }
    ],
    areas: [
      'Frete de caixa',
      'Salão de vendas',
      'Atendimento',
      'Açougue',
      'Desossa',
      'Temperado',
      'Hortifruti',
      'Câmaras',
      'Expedição',
      'Cozinha',
      'Copa',
      'Padaria',
      'Confeitaria',
      'Sala de descanso'
    ]
  })

  /* ---------- Morada do Sol ---------- */
  const ms = DATA.unidades.find(u => u.id === 'ms')
  const buildMS = buildUnidadeDetail({
    unidade: ms,
    foto: 'images/loja-ms-interna.png',
    lideres: [
      { nome: ms.diretora, cargo: 'Diretora', gold: true },
      { nome: ms.gerenteLoja, cargo: 'Gerente de Loja' },
      {
        nome: ms.gerenteFrenteLoja,
        cargo: 'Gerente — Frente de Loja / Caixas'
      },
      { nome: ms.gerenteAcougue, cargo: 'Gerente de Açougue' },
      { nome: ms.liderTemperado, cargo: 'Líder do Temperado' },
      { nome: ms.faturista, cargo: 'Faturista' }
    ],
    areas: [
      'Frete de caixa',
      'Salão de vendas',
      'Atendimento',
      'Açougue',
      'Desossa',
      'Temperado',
      'Hortifruti',
      'Câmaras',
      'Expedição',
      'Cozinha',
      'Copa',
      'Padaria',
      'Confeitaria',
      'Lanchonete',
      'Sala de descanso'
    ]
  })

  /* ---------- Centro de Distribuição ---------- */
  const cd = DATA.unidades.find(u => u.id === 'cd')
  const buildCD = buildUnidadeDetail({
    unidade: cd,
    foto: 'images/loja-cd.png',
    lideres: [
      { nome: cd.gerente, cargo: 'Gerente CD', gold: true },
      { nome: cd.encarregado, cargo: 'Encarregado' }
    ],
    tituloDestaque: 'O centro logístico que abastece todas as lojas.'
  })

  /* ---------- Monte das Oliveiras — visual, destaque para a unidade ---------- */
  function buildMO(container) {
    const mo = DATA.unidades.find(u => u.id === 'mo')
    const inner = el('div', {
      class: 'slide__inner slide__inner--tight mo-hero'
    })
    inner.appendChild(
      el('div', {
        class: 'mo-hero__bg ken-burns',
        style: { backgroundImage: 'url(images/loja-mo.png)' }
      })
    )
    inner.appendChild(el('div', { class: 'mo-hero__veil' }))

    const panel = el('div', { class: 'mo-hero__panel' }, [
      el(
        'span',
        { class: 'eyebrow reveal', style: { '--d': '0.1s' } },
        'Nossas Unidades'
      ),
      el('h2', { class: 'title-xl reveal-blur', style: { '--d': '0.22s' } }, [
        'Unidade ',
        el('span', { class: 'gold-text' }, 'Monte das Oliveiras')
      ]),
      el(
        'div',
        { class: 'reveal', style: { '--d': '0.4s' } },
        kvList([
          { key: 'CNPJ', value: mo.cnpj },
          { key: 'Código', value: mo.codigo },
          { key: 'Endereço', value: mo.endereco.join('<br>') }
        ])
      ),
      el(
        'div',
        { class: 'reveal', style: { '--d': '0.55s' } },
        person({
          nome: mo.gerenteFrenteLoja,
          cargo: 'Gerente — Frente de Loja / Caixas',
          gold: true
        })
      )
    ])

    inner.appendChild(panel)
    container.appendChild(inner)
  }

  /* ---------- Função do CD ---------- */
  function buildFuncaoCD(container) {
    const inner = el('div', { class: 'slide__inner' })
    inner.appendChild(
      sectionHeader({
        eyebrow: 'Nossas Unidades',
        title: 'O coração da operação',
        lead: 'O Centro de Distribuição conecta a compra da matéria-prima até a chegada nas lojas.',
        align: 'center'
      })
    )

    const flow = el('div', { class: 'cd-flow' })
    DATA.cdFluxo.forEach((step, i) => {
      flow.appendChild(
        card(
          [
            el(
              'div',
              { class: 'cd-flow__index' },
              String(i + 1).padStart(2, '0')
            ),
            el('div', { class: 'cd-flow__title' }, step.titulo)
          ],
          { className: 'cd-flow__step' }
        )
      )
      if (i < DATA.cdFluxo.length - 1) {
        flow.appendChild(
          el(
            'div',
            {
              class: 'cd-flow__connector reveal-line',
              style: { '--d': `${0.3 + i * 0.18}s` }
            },
            chevron('right')
          )
        )
      }
    })

    const areasRow = el(
      'div',
      { class: 'cd-areas reveal', style: { '--d': '1.2s' } },
      [
        el('div', { class: 'label' }, 'Frentes de trabalho'),
        areaTags(DATA.cdAreas)
      ]
    )

    inner.appendChild(
      el('div', { class: 'slide__body col-center' }, [flow, areasRow])
    )
    container.appendChild(inner)
    stagger(flow, '.cd-flow__step', 0.15, 0.18)
    const tags = areasRow.querySelector('.area-tags')
    stagger(tags, '.area-tag', 1.35, 0.08)
  }

  SLIDES.push({ id: 'unidade-pn', section: 'Nossas Unidades', build: buildPN })
  SLIDES.push({ id: 'unidade-ms', section: 'Nossas Unidades', build: buildMS })
  SLIDES.push({ id: 'unidade-mo', section: 'Nossas Unidades', build: buildMO })
  SLIDES.push({ id: 'unidade-cd', section: 'Nossas Unidades', build: buildCD })
  SLIDES.push({
    id: 'funcao-cd',
    section: 'Nossas Unidades',
    build: buildFuncaoCD
  })
})()
