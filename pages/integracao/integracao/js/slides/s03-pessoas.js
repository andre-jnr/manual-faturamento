;(() => {
  const { el, stagger } = Utils
  const {
    sectionHeader,
    card,
    person,
    areaCard,
    kvList,
    orgNode,
    orgChartShell
  } = Components

  const AREA_ICONS = {
    'Frete de caixa': 'frete',
    'Salão de vendas': 'salao',
    Atendimento: 'atendimento',
    Açougue: 'acougue',
    Desossa: 'desossa',
    Temperado: 'temperado',
    Hortifruti: 'hortifruti',
    Câmaras: 'camaras',
    Expedição: 'expedicao',
    Cozinha: 'cozinha',
    Copa: 'copa'
  }

  /* ---------- Nossa Diretoria ---------- */
  function buildDiretoria(container) {
    const inner = el('div', { class: 'slide__inner' })
    inner.appendChild(
      sectionHeader({
        eyebrow: 'Nossa Gente',
        title: 'Nossa Diretoria',
        lead: 'É com grande satisfação que apresentamos nossa Diretoria, liderança que transforma estratégia em resultetados e conduz nossa empresa rumo a novos desafios e conquistas.'
      })
    )
    const row = el(
      'div',
      { class: 'diretoria-row' },
      DATA.diretoria.map(d =>
        person({ nome: d.nome, cargo: d.cargo, gold: true })
      )
    )
    inner.appendChild(el('div', { class: 'slide__body col-center' }, row))
    container.appendChild(inner)
    stagger(row, '.card', 0.15, 0.1)
  }

  /* ---------- Unidade Parque Dez — Matriz ---------- */
  function buildMatrizIntro(container) {
    const inner = el('div', { class: 'slide__inner' })
    const pq10 = DATA.unidades.find(u => u.id === 'pq10')

    const grid = el('div', { class: 'grid-2 grid-2--asym' }, [
      el(
        'div',
        { class: 'col hero-photo reveal-scale', style: { '--d': '0.1s' } },
        [
          el('img', {
            src: 'images/loja-pq10.png',
            alt: 'Fachada da unidade Parque Dez'
          }),
          el('div', { class: 'hero-photo__veil' })
        ]
      ),
      el('div', { class: 'col col-center' }, [
        el(
          'span',
          { class: 'eyebrow reveal', style: { '--d': '0.15s' } },
          'A matriz administrativa'
        ),
        el('h2', { class: 'title-xl reveal-blur', style: { '--d': '0.28s' } }, [
          'Unidade ',
          el('br'),
          el('span', { class: 'gold-text' }, 'Parque Dez')
        ]),
        el(
          'p',
          { class: 'lead reveal', style: { '--d': '0.5s' } },
          'Matriz do Frigorífico Amazonas — é daqui que a operação administrativa acontece.'
        ),
        el(
          'div',
          { class: 'reveal', style: { '--d': '0.62s', 'margin-top': '32px' } },
          kvList([
            { key: 'CNPJ', value: pq10.cnpj },
            { key: 'Código', value: pq10.codigo },
            { key: 'Endereço', value: pq10.endereco.join('<br>') }
          ])
        )
      ])
    ])

    inner.appendChild(el('div', { class: 'slide__body' }, grid))
    container.appendChild(inner)
  }

  /* ---------- Administrativo da Matriz ---------- */
  function buildMatrizOrg(container) {
    const inner = el('div', { class: 'slide__inner' })
    inner.appendChild(
      sectionHeader({
        eyebrow: 'Nossa Gente',
        title: 'Administrativo da Matriz',
        lead: 'A estrutura que sustenta a operação da matriz, no dia a dia.'
      })
    )

    const shell = orgChartShell()
    const nodes = shell.querySelector('.orgchart__nodes')
    const m = DATA.matrizOrg

    nodes.appendChild(
      orgNode({
        id: 'janaina',
        nome: m.lider.nome,
        cargo: m.lider.cargo,
        left: 50,
        top: 0,
        lead: true
      })
    )
    const cols = [20, 50, 80]
    m.diretos.forEach((d, i) =>
      nodes.appendChild(
        orgNode({
          id: d.id,
          parent: 'janaina',
          nome: d.nome,
          cargo: d.cargo,
          left: cols[i],
          top: 42
        })
      )
    )
    m.apoio.forEach(a => {
      const parentIdx = m.diretos.findIndex(d => d.id === a.ligadoA)
      nodes.appendChild(
        orgNode({
          parent: a.ligadoA,
          nome: a.nome,
          cargo: a.cargo,
          left: cols[parentIdx],
          top: 80
        })
      )
    })

    inner.appendChild(el('div', { class: 'slide__body' }, shell))
    container.appendChild(inner)
  }

  /* ---------- Setor de Faturamento ---------- */
  function buildFaturamento(container) {
    const inner = el('div', { class: 'slide__inner' })
    inner.appendChild(
      sectionHeader({
        eyebrow: 'Nossa Gente',
        title: 'Faturamento',
        lead: 'Quem cuida da entrada e emissão de notas fiscais em cada unidade.'
      })
    )

    const f = DATA.faturamento
    const shell = orgChartShell()
    shell.classList.add('orgchart--compact')
    const nodes = shell.querySelector('.orgchart__nodes')
    nodes.appendChild(
      orgNode({
        id: 'janaina-f',
        nome: f.topo.nome,
        cargo: f.topo.cargo,
        unidade: f.topo.unidade,
        left: 50,
        top: 0,
        lead: true
      })
    )
    nodes.appendChild(
      orgNode({
        id: 'andre-f',
        parent: 'janaina-f',
        nome: f.lider.nome,
        cargo: f.lider.cargo,
        unidade: f.lider.unidade,
        left: 50,
        top: 34,
        lead: true
      })
    )
    const cols = [22, 50, 78]
    f.diretos.forEach((d, i) =>
      nodes.appendChild(
        orgNode({
          parent: 'andre-f',
          nome: d.nome,
          cargo: d.cargo,
          unidade: d.unidade,
          left: cols[i],
          top: 74
        })
      )
    )

    const indirectBox = el(
      'div',
      { class: 'indirect-box reveal', style: { '--d': '0.5s' } },
      [
        el(
          'div',
          { class: 'org-legend__item indirect-box__label' },
          'Liderança indireta'
        ),
        el(
          'div',
          { class: 'indirect-box__row' },
          f.indiretos.map(ind =>
            card(
              [
                el('div', { class: 'person__name' }, ind.nome),
                el(
                  'div',
                  { class: 'person__role' },
                  `${ind.cargo} · ${ind.unidade}`
                ),
                el('div', { class: 'indirect-box__legenda' }, ind.legenda)
              ],
              { className: 'person' }
            )
          )
        )
      ]
    )

    inner.appendChild(
      el('div', { class: 'slide__body faturamento-body' }, [shell, indirectBox])
    )
    container.appendChild(inner)
  }

  /* ---------- Áreas / lideranças da Matriz ---------- */
  function buildLiderancasMatriz(container) {
    const inner = el('div', { class: 'slide__inner' })
    inner.appendChild(
      sectionHeader({
        eyebrow: 'Nossa Gente',
        title: 'Áreas e lideranças da Matriz',
        lead: 'Quem lidera cada frente de trabalho na unidade Parque Dez.'
      })
    )

    const l = DATA.liderancasMatriz

    const producaoCard = card(
      [
        el('div', { class: 'producao-card__media' }, [
          el('img', {
            src: l.producao.imagem,
            alt: 'Açougue da unidade Parque Dez'
          }),
          el('div', { class: 'hero-photo__veil' })
        ]),
        el('div', { class: 'producao-card__body' }, [
          el('div', { class: 'label' }, l.producao.titulo),
          el('div', { class: 'person__name' }, l.producao.gerente),
          el(
            'div',
            { class: 'person__role' },
            `Responsável por ${l.producao.responsavelPor.join(', ')}`
          ),
          el('div', { class: 'producao-card__sub' }, [
            el('div', {}, [
              el('span', { class: 'mono-tag' }, 'Encarregado de Açougue'),
              el(
                'div',
                { class: 'person__name' },
                l.producao.encarregadoAcougue
              )
            ]),
            el('div', {}, [
              el('span', { class: 'mono-tag' }, 'Líder do Temperado'),
              el('div', { class: 'person__name' }, l.producao.liderTemperado)
            ])
          ])
        ])
      ],
      { className: 'producao-card' }
    )

    function leaderPhotoCard({ imagem, alt, label, nome, cargo }) {
      return card(
        [
          el('div', { class: 'producao-card__media' }, [
            el('img', { src: imagem, alt }),
            el('div', { class: 'hero-photo__veil' })
          ]),
          el('div', { class: 'producao-card__body' }, [
            el('div', { class: 'label' }, label),
            el('div', { class: 'person__name' }, nome),
            el('div', { class: 'person__role' }, cargo)
          ])
        ],
        { className: 'producao-card' }
      )
    }

    const row = el('div', { class: 'lideranca-grid' }, [
      producaoCard,
      leaderPhotoCard({
        imagem: 'images/loja-pq10.png',
        alt: 'Fachada da unidade Parque Dez',
        label: 'Frete de loja',
        nome: l.freteLoja.gerente,
        cargo: l.freteLoja.titulo
      }),
      leaderPhotoCard({
        imagem: 'images/frente-loja-pq10.png',
        alt: 'Frente de loja da unidade Parque Dez',
        label: 'Frente de loja / caixas',
        nome: l.frenteLojaCaixas.gerente,
        cargo: l.frenteLojaCaixas.titulo
      })
    ])

    inner.appendChild(el('div', { class: 'slide__body' }, row))
    container.appendChild(inner)
    stagger(row, '.card', 0.15, 0.12)
  }

  /* ---------- Áreas da empresa ---------- */
  function buildAreasEmpresa(container) {
    const inner = el('div', { class: 'slide__inner' })
    inner.appendChild(
      sectionHeader({
        eyebrow: 'Nossa Gente',
        title: 'Por trás de cada venda, existe uma equipe.',
        align: 'center'
      })
    )
    const grid = el(
      'div',
      { class: 'areas-grid' },
      DATA.areasEmpresa.map(a => areaCard(a, AREA_ICONS[a]))
    )
    inner.appendChild(el('div', { class: 'slide__body col-center' }, grid))
    container.appendChild(inner)
    stagger(grid, '.card', 0.12, 0.07)
  }

  SLIDES.push({
    id: 'diretoria',
    section: 'Nossa Gente',
    build: buildDiretoria
  })
  SLIDES.push({
    id: 'matriz-intro',
    section: 'Nossas Unidades',
    build: buildMatrizIntro
  })
  SLIDES.push({
    id: 'matriz-org',
    section: 'Nossa Gente',
    build: buildMatrizOrg,
    onEnter: c => OrgChart.connect(c)
  })
  SLIDES.push({
    id: 'faturamento',
    section: 'Nossa Gente',
    build: buildFaturamento,
    onEnter: c => OrgChart.connect(c)
  })
  SLIDES.push({
    id: 'liderancas-matriz',
    section: 'Nossa Gente',
    build: buildLiderancasMatriz
  })
  SLIDES.push({
    id: 'areas-empresa',
    section: 'Nossa Gente',
    build: buildAreasEmpresa
  })
})()
