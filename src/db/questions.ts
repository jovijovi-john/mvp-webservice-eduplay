// Conjunto de questões separados por questionario (nao por nivel)

// localhost/create-room -> return pin:   param: level

type QuestionType = {
  title: string;
  options: {
    1: string;
    2: string;
    3: string;
    4: string;
  };
  correctAnswer: "1" | "2" | "3" | "4";
};

export const ElementaryLevelQuestionnaire: QuestionType[] = [
  {
    title:
      "A paisagem dos Lençóis Maranhenses ____ cheia de dunas e lagoas cristalinas, um cenário incrível! Qual a forma correta de completar essa frase",
    options: {
      1: "estar",
      2: "está",
      3: "estár",
      4: "esta",
    },
    correctAnswer: "2",
  },

  {
    title:
      "Os Lençóis Maranhenses são lindos, _____ é importante ir na época certa para ver as lagoas cheias.",
    options: {
      1: "mais",
      2: "mas",
      3: "maís",
      4: "más",
    },
    correctAnswer: "2",
  },

  {
    title:
      "Em qual região brasileira está localizado o Parque Nacional dos Lençóis Maranhenses?",
    options: {
      1: "Norte",
      2: "Nordeste",
      3: "Centro-Oeste",
      4: "Sudeste",
    },
    correctAnswer: "2",
  },

  {
    title:
      "Sobre a visita aos Lençóis Maranhenses, escolha a opção correta: 'Durante nossa ______ no parque, vimos muitas lagoas e dunas.'",
    options: {
      1: "estadia",
      2: "estada",
      3: "estadía",
      4: "estaria",
    },
    correctAnswer: "2",
  },

  {
    title:
      "O Parque Nacional dos Lençóis Maranhenses abrange quatro municípios. Qual desses municípios não integra a região do parque?",
    options: {
      1: "Humberto de campos",
      2: "Santo amaro",
      3: "Barreirinhas",
      4: "São Luís",
    },
    correctAnswer: "4",
  },

  {
    title:
      "Qual frase está correta no uso do verbo 'assistir' ao descrever uma experiência nos Lençóis Maranhenses?",
    options: {
      1: "Nós assistimos a uma vista espetacular ao pôr do sol nos Lençóis Maranhenses.",
      2: "Eu assisti nos Lençóis Maranhenses e fiquei impressionado com as dunas.",
      3: "Eles assistiram da lagoa cristalina em meio às dunas.",
      4: "Ela assistiu em várias paisagens deslumbrantes.",
    },
    correctAnswer: "1",
  },
];

export const HighSchoolLevelQuestionnaire: QuestionType[] = [
  {
    title: "Qual frase apresenta o uso correto do verbo “estar”?",
    options: {
      1: "A duna de areia branca estar localizada em uma área de conservação ambiental.",
      2: "Durante a estação chuvosa, as lagoas entre as dunas está completamente cheias.",
      3: "O ecossistema dos Lençóis Maranhenses está ameaçado por mudanças climáticas.",
      4: "Visitar a região sem guia especializado estar sujeito a riscos.",
    },
    correctAnswer: "3",
  },

  {
    title:
      "Uma das frases a seguir apresenta erro no uso de 'mais' ou 'mas'. Identifique-a.",
    options: {
      1: "Os Lençóis Maranhenses têm uma das paisagens mais bonitas do Brasil.",
      2: "A região atrai turistas o ano todo, mas nem sempre as lagoas estão cheias.",
      3: "As dunas são altas, mas acessíveis para quem gosta de aventura.",
      4: "Existem poucas áreas preservadas, mais o governo local planeja novas medidas de proteção.",
    },
    correctAnswer: "4",
  },

  {
    title:
      "O Brasil tem 6 Biomas. O Parque dos Lençóis Maranhenses fica na região do Cerrado. Mas também recebe influência de outros dois Biomas. Você sabe quais são?",
    options: {
      1: "Amazônia e Caatinga",
      2: "Mata Atlântica e Pantanal",
      3: "Pantanal e Amazônia",
      4: "Pampa e Cerrado",
    },
    correctAnswer: "1",
  },

  {
    title: "Assinale a frase com o uso de estada ou estadia:",
    options: {
      1: "A nossa estada nos Lençóis Maranhenses foi curta, mas inesquecível.",
      2: "A agência organizou nossa estada no hotel à beira das lagoas.",
      3: "Durante a estadia no parque, fizemos trilhas e visitamos as dunas.",
      4: "A estada no parque e a estada no hotel são o mesmo tipo de viagem.",
    },
    correctAnswer: "1",
  },

  {
    title: "O Parque Nacional dos Lençóis Maranhenses está localizado:",
    options: {
      1: "No litoral do Maranhão, com influência dos biomas Cerrado, Amazônia e Caatinga.",
      2: "Na região semiárida do Maranhão, influenciado pelos biomas Caatinga e Mata Atlântica.",
      3: "No litoral do Maranhão, predominando os biomas Cerrado e Pantanal.",
      4: "No Maranhão, dentro do bioma Amazônia.",
    },
    correctAnswer: "1",
  },

  {
    title:
      "Assinale a alternativa em que o uso de “assistir” está adequado no contexto dos Lençóis Maranhenses:",
    options: {
      1: "Muitos turistas desejam assistir as transformações das dunas ao longo do dia.",
      2: "Quem visita os Lençóis Maranhenses pode assistir ao espetáculo das lagoas se enchendo após as chuvas.",
      3: "É comum assistir o nascer do sol sobre as dunas em silêncio.",
      4: "Turistas preferem assistir as mudanças de cor nas lagoas à distância.",
    },
    correctAnswer: "2",
  },
];

export const Questionnaires = {
  elementarySchool: ElementaryLevelQuestionnaire,
  highSchool: HighSchoolLevelQuestionnaire,
};
