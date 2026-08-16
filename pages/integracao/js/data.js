/*
  Fonte única de dados da apresentação de integração do Frigorífico
  Amazonas. Nenhum nome, cargo, CNPJ ou endereço aqui foi inventado —
  tudo reflete exatamente o que foi fornecido no briefing.

  Onde havia inconsistência nos dados originais, o valor foi mantido
  como recebido e a inconsistência foi comentada no ponto exato.
*/

const DATA = {
  empresa: {
    nome: 'Frigorífico Amazonas',
    tagline: 'Essa marca é nossa',
    logo: 'images/logo-frigorifico-amazonas.png'
  },

  /* -------------------------------------------------------------
     Unidades — presença em Manaus.
     Coordenadas em espaço de mapa (viewBox 0 0 1000 720), obtidas a
     partir de geocodificação aproximada dos bairros (ViaCEP +
     Nominatim/OpenStreetMap) — não são os CEPs tratados como
     coordenadas, e sim posições reais aproximadas dos bairros.
  ------------------------------------------------------------- */
  unidades: [
    {
      id: 'pq10',
      nome: 'Parque Dez',
      codigo: 'PQ10',
      status: 'matriz',
      cep: '69.054-737',
      bairro: 'Parque 10 de Novembro',
      cnpj: '19.234.190/0001-30',
      endereco: [
        'R Vasco Vasques, nº 1336',
        'Complemento: PQ Shangri-lá 4',
        'Parque 10 de Novembro'
      ],
      coords: { x: 430, y: 560 }
    },
    {
      id: 'lirio',
      nome: 'Lírio do Vale',
      codigo: null,
      status: 'vendida',
      cep: '69.038-110',
      bairro: 'Lírio do Vale',
      coords: { x: 234, y: 488 }
    },
    {
      id: 'pn',
      nome: 'Ponta Negra',
      codigo: 'PN',
      status: 'ativa',
      cep: '69.037-000',
      bairro: 'Ponta Negra',
      cnpj: '19.234.190/0003-00',
      endereco: [
        'AV Coronel Teixeira, nº 200',
        'Complemento: Lote 49 Quadra 01',
        'Bairro: Ponta Negra'
      ],
      diretor: 'Sr. Roberto',
      gerenteAcougue: 'Alex',
      gerenteFrenteLoja: 'Mônica',
      coords: { x: 150, y: 250 }
    },
    {
      id: 'mo',
      nome: 'Monte das Oliveiras',
      codigo: 'MO',
      status: 'ativa',
      cep: '69.093-149',
      bairro: 'Monte das Oliveiras',
      cnpj: '19.234.190/0004-82',
      endereco: [
        'AV Arquiteto José Henriques Bento Rodrigues, nº 170',
        'Bloco D',
        'Bairro: Monte das Oliveiras'
      ],
      gerenteFrenteLoja: 'Sra. Adriana',
      coords: { x: 520, y: 70 }
    },
    {
      // São José compartilha o mesmo CEP do Centro de Distribuição — ambos
      // ficam no bairro São José.
      id: 'sj',
      nome: 'São José',
      codigo: null,
      status: 'vendida',
      cep: '69.086-001',
      bairro: 'São José',
      coords: { x: 770, y: 460 }
    },
    {
      id: 'cd',
      nome: 'Centro de Distribuição',
      codigo: 'CD',
      status: 'ativa',
      cep: '69.086-001',
      bairro: 'São José',
      cnpj: '19.234.190/0006-44',
      endereco: ['R Rio Carauari, nº 100', 'Loja C', 'Bairro: São José'],
      gerente: 'Sr. Nilton',
      encarregado: 'Sr. Nellyson',
      coords: { x: 910, y: 500 }
    },
    {
      id: 'ms',
      nome: 'Morada do Sol',
      codigo: 'MS',
      status: 'ativa',
      cep: '69.057-083',
      bairro: 'Adrianópolis',
      cnpj: '19.234.190/0007-25',
      endereco: [
        'R Miguel Ângelo, nº 20',
        'QD L CJ Adrianópolis',
        'Bairro: Adrianópolis',
        'CEP: 69.057-083'
      ],
      diretora: 'Sra. Gisa',
      gerenteLoja: 'Lincoln',
      gerenteFrenteLoja: 'Luliana',
      gerenteAcougue: 'Keila',
      liderTemperado: 'Gabriel',
      faturista: 'Micael',
      coords: { x: 540, y: 680 }
    },
    {
      id: 'cn',
      nome: 'Cidade Nova',
      codigo: null,
      status: 'vendida',
      cep: '69.090-000',
      bairro: 'Cidade Nova',
      coords: { x: 880, y: 380 }
    }
  ],

  mapaViewBox: '0 0 1000 720',

  /* -------------------------------------------------------------
     Diretoria — todos no mesmo nível hierárquico.
  ------------------------------------------------------------- */
  diretoria: [
    { nome: 'Sr. Jarbas', cargo: 'Diretor Operacional' },
    { nome: 'Sra. Silvia', cargo: 'Diretora Financeira' },
    { nome: 'Sr. Roberto', cargo: 'Diretor Administrativo' },
    { nome: 'Sra. Gisa', cargo: 'Diretora Administrativa' },
    { nome: 'Sr. Nilton', cargo: 'Gerente Geral das Lojas e CD' }
  ],

  /* -------------------------------------------------------------
     Administrativo da Matriz (Parque Dez) — organograma.
  ------------------------------------------------------------- */
  matrizOrg: {
    lider: { nome: 'Janaina', cargo: 'Gerente de Controladoria' },
    diretos: [
      { id: 'andre', nome: 'André', cargo: 'Analista e Líder de Faturamento' },
      { id: 'nubyane', nome: 'Nubyane', cargo: 'Analista Financeiro' },
      { id: 'eliane', nome: 'Eliane', cargo: 'Analista de RH' }
    ],
    apoio: [
      { nome: 'Raysa', cargo: 'Analista de Faturamento', ligadoA: 'andre' },
      { nome: 'Akila', cargo: 'Assistente de RH', ligadoA: 'eliane' },
      {
        nome: 'Ana Beatriz',
        cargo: 'Assistente Financeira',
        ligadoA: 'nubyane'
      }
    ]
  },

  /* -------------------------------------------------------------
     Setor de Faturamento
  ------------------------------------------------------------- */
  faturamento: {
    topo: {
      nome: 'Janaina',
      unidade: 'PQ10',
      cargo: 'Gerente de Controladoria'
    },
    lider: {
      nome: 'André',
      unidade: 'PQ10',
      cargo: 'Analista e Líder de Faturamento'
    },
    diretos: [
      { nome: 'Raysa', unidade: 'PQ10', cargo: 'Analista de Faturamento' },
      { nome: 'Nicole', unidade: 'PN', cargo: 'Analista de Faturamento' },
      { nome: 'Micael', unidade: 'MS', cargo: 'Analista de Faturamento' }
    ],
    indiretos: [
      {
        nome: 'Dona Adriana',
        unidade: 'MO',
        cargo: 'Gerente',
        legenda: 'Liderança indireta — entrada e emissão de notas fiscais'
      },
      {
        nome: 'Nellyson',
        unidade: 'CD',
        cargo: 'Encarregado',
        legenda: 'Liderança indireta — entrada e emissão de notas fiscais'
      }
    ]
  },

  /* -------------------------------------------------------------
     Áreas e lideranças da Matriz
  ------------------------------------------------------------- */
  liderancasMatriz: {
    producao: {
      gerente: 'Rodrigo',
      titulo: 'Gerente de Produção',
      responsavelPor: ['Açougue', 'Temperado', 'Desossa'],
      encarregadoAcougue: 'Leones',
      liderTemperado: 'Elian',
      imagem: 'images/acougue-pq10.png'
    },
    // No briefing este bloco aparece como "Frete de loja" (possível grafia
    // de "Frente de loja"), mantido literalmente como fornecido — distinto
    // do bloco seguinte, "Frente de loja / caixas".
    freteLoja: { gerente: 'Felipe', titulo: 'Gerente de Loja' },
    frenteLojaCaixas: { gerente: 'Beatriz', titulo: 'Gerente' }
  },

  areasEmpresa: [
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
    'Copa'
  ],

  cdFluxo: [
    { titulo: 'Compra de matéria-prima' },
    { titulo: 'Recebimento' },
    { titulo: 'Produção / Desossa' },
    { titulo: 'Expedição' },
    { titulo: 'Lojas' }
  ],

  cdAreas: [
    'Compra da matéria-prima',
    'Recebimento e expedição',
    'Desossa / produção'
  ],

  /* -------------------------------------------------------------
     Gerência por loja
  ------------------------------------------------------------- */
  gerenciaPorLoja: {
    topo: [
      { nome: 'Sr. Jarbas', cargo: 'Presidente' },
      { nome: 'Sr. Roberto', cargo: 'Diretor' },
      { nome: 'Sr. Nilton', cargo: 'Gerente Geral' }
    ],
    unidades: [
      { unidade: 'PQ10', nome: 'Sr. Rodrigo' },
      { unidade: 'PN', nome: 'Sr. Alex' },
      { unidade: 'MS', nome: 'Lincoln' },
      { unidade: 'MO', nome: 'Sra. Adriana' },
      { unidade: 'CD', nome: 'Sr. Nilton' }
    ],
    frase:
      'Grandes resultados são construídos por pessoas que assumem responsabilidades e inspiram outras pessoas a fazer o mesmo.'
  },

  /* -------------------------------------------------------------
     Organograma geral
  ------------------------------------------------------------- */
  organogramaGeral: {
    presidente: { nome: 'Sr. Jarbas', cargo: 'Presidente' },
    diretoraFinanceira: { nome: 'Sra. Silvia', cargo: 'Diretora Financeira' },
    diretores: [
      { nome: 'Sr. Roberto', cargo: 'Diretor Administrativo' },
      { nome: 'Sra. Gisa', cargo: 'Diretora Administrativa' }
    ],
    geral: { nome: 'Sr. Nilton', cargo: 'Gerente Geral' },
    controladoria: {
      nome: 'Sra. Janaina',
      cargo: 'Gerente de Controladoria — Administrativo'
    },
    // Áreas substituídas pelos códigos das respectivas filiais (Produção→PQ10,
    // Açougue→PN, Loja/Lincoln→MS, Loja/Sra. Adriana→MO, CD→CD), cruzando com
    // os dados de gerenciaPorLoja/unidades — a pedido do usuário, para deixar
    // explícito a qual unidade cada liderança pertence.
    blocoNilton: [
      { unidade: 'PQ10', nome: 'Sr. Rodrigo' },
      { unidade: 'PN', nome: 'Sr. Alex' },
      { unidade: 'MS', nome: 'Lincoln' },
      { unidade: 'MO', nome: 'Sra. Adriana' },
      { unidade: 'CD', nome: 'Sr. Nellyson' }
    ],
    blocoJanaina: [
      // Grafia "Nubiane" mantida como fornecida nesta seção (em outro
      // ponto do briefing, seção da Matriz, aparece como "Nubyane").
      { area: 'Financeiro', nomes: ['Nubiane', 'Ana Beatriz'] },
      { area: 'Recursos Humanos', nomes: ['Eliane', 'Akila'] },
      { area: 'Faturamento', nomes: ['André', 'Raysa'] }
    ]
  },

  cincoS: [
    {
      letra: 'S',
      termo: 'Seiri',
      nome: 'Utilização',
      texto:
        'Separe o que é necessário do que não é. Menos itens, mais clareza para trabalhar.'
    },
    {
      letra: 'S',
      termo: 'Seiton',
      nome: 'Ordenação',
      texto:
        'Um lugar para cada coisa, cada coisa em seu lugar — fácil de achar, fácil de guardar.'
    },
    {
      letra: 'S',
      termo: 'Seiso',
      nome: 'Limpeza',
      texto:
        'Ambiente limpo é ambiente seguro. Cuidar do espaço é cuidar de quem trabalha nele.'
    },
    {
      letra: 'S',
      termo: 'Seiketsu',
      nome: 'Padronização',
      texto: 'Transformar organização e limpeza em rotina, não em exceção.'
    },
    {
      letra: 'S',
      termo: 'Shitsuke',
      nome: 'Disciplina',
      texto: 'Manter os quatro sensos anteriores todos os dias, por convicção.'
    }
  ],

  epis: [
    { nome: 'Avental' },
    { nome: 'Bota de PVC' },
    { nome: 'Calça frigorífica' },
    { nome: 'Japona frigorífica' },
    { nome: 'Luva anticorte' },
    { nome: 'Luva térmica' },
    { nome: 'Respirador descartável' },
    { nome: 'Touca descartável' },
    { nome: 'Óculos de proteção' }
  ],

  certoErrado: {
    certo: [
      {
        imagem: 'images/luva-certo.png',
        legenda: 'Uso correto da luva de proteção'
      },
      {
        imagem: 'images/luva-aco-certo.png',
        legenda: 'Luva anticorte em manuseio com faca'
      }
    ],
    errado: [
      {
        imagem: 'images/manipulando-maquina-sem-epi-errado.png',
        legenda: 'Máquina operada sem proteção adequada'
      },
      {
        imagem: 'images/manipulando-maquina-sem-epi-errado-2.png',
        legenda: 'Mãos desprotegidas próximas a partes móveis'
      }
    ]
  },

  higiene: [
    { titulo: 'Unhas', texto: 'Mantenha as unhas cortadas.' },
    {
      titulo: 'Cabelos',
      texto: 'Mantenha os cabelos cortados e adequadamente protegidos.'
    },
    {
      titulo: 'Barba',
      texto: 'Mantenha o rosto adequadamente preparado para as atividades.'
    }
  ],

  normas: [
    'Proibido o uso do celular nas áreas operacionais',
    'Não são permitidos relacionamentos ou contatos íntimos nas dependências da empresa',
    'Fazer o uso correto dos EPIs',
    'Manter o uniforme sempre limpo e em bom estado de uso',
    'Sujou? Limpe.',
    'Mantenha sempre organizado seu setor',
    'Respeite o horário de descanso do colega'
  ],

  valores: [
    {
      nome: 'Ética',
      texto:
        'Estabelecer relações de confiança, agir com senso de justiça e com respeito pelas pessoas e pelo negócio.'
    },
    {
      nome: 'Inovação',
      texto:
        'Perseguir a visão da empresa, com ousadia, atitude empreendedora, senso de urgência e foco em resultados.'
    },
    {
      nome: 'Respeito pelas Pessoas',
      texto:
        'Valorizar um ambiente cooperativo, harmônico e saudável entre as pessoas, recompensando desempenhos diferenciados e retendo talentos.'
    },
    {
      nome: 'Compromisso com o Negócio',
      texto:
        'Compartilhar ideias, defender nossas marcas e buscar a excelência no atendimento aos clientes.'
    }
  ]
}
