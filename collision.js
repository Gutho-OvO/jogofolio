// ===== DEBUG MODE =====
window.showDebug = false; // Mude para false para desativar o debug
const barriers = [
  //ponte
  { x: 0, y: 0, width: 300, height: 1600 },
  { x: 300, y: 834, width: 1092, height: 40 },
  { x: 300, y: 1107, width: 1109, height: 40 },
  //barreiras
  { x: 1391, y: 644, width: 18, height: 214 },
  { x: 1409, y: 644, width: 384, height: 22 },
  { x: 1775, y: 430, width: 18, height: 214 },
  { x: 1295, y: 1147, width: 18, height: 350 },
  //barreira policia
  { x: 2914, y: 682, width: 18, height: 480 },
  //objetos do mapa
  { x: 1793, y: 548, width: 112, height: 21 },
  { x: 1797, y: 864, width: 6, height: 6 },
  { x: 1797, y: 1073, width: 6, height: 6 },
  { x: 2149, y: 816, width: 6, height: 6 },
  { x: 2149, y: 1056, width: 6, height: 6 },
  { x: 2309, y: 816, width: 6, height: 6 },
  { x: 2309, y: 1056, width: 6, height: 6 },
  { x: 2661, y: 848, width: 6, height: 6 },
  { x: 2661, y: 1088, width: 6, height: 6 },
  //predio
  { x: 1904, y: 346, width: 16, height: 400 },
  { x: 1920, y: 727, width: 208, height: 16 },
  { x: 2128, y: 680, width: 16, height: 66 },
  { x: 2320, y: 680, width: 16, height: 66 },
  { x: 2336, y: 727, width: 208, height: 16 },
  { x: 2544, y: 650, width: 16, height: 96 },
  { x: 2560, y: 650, width: 63, height: 16 },
  { x: 2623, y: 346, width: 16, height: 322 },
  //entrada do predio
  { x: 2144, y: 650, width: 176, height: 16 },
  //detalhes entrada meio
  { x: 2190, y: 666, width: 84, height: 1 },
  { x: 2191, y: 667, width: 82, height: 1 },
  { x: 2192, y: 668, width: 80, height: 1 },
  { x: 2193, y: 669, width: 78, height: 1 },
  { x: 2194, y: 670, width: 76, height: 1 },
  { x: 2196, y: 671, width: 72, height: 1 },
  { x: 2197, y: 672, width: 70, height: 1 },
  { x: 2199, y: 673, width: 66, height: 1 },
  { x: 2201, y: 674, width: 62, height: 1 },
  { x: 2203, y: 675, width: 58, height: 1 },
  { x: 2206, y: 676, width: 52, height: 1 },
  { x: 2209, y: 677, width: 46, height: 1 },
  { x: 2212, y: 678, width: 40, height: 1 },
  { x: 2215, y: 679, width: 34, height: 1 },
  { x: 2221, y: 680, width: 22, height: 1 },
  { x: 2227, y: 681, width: 10, height: 1 },
  //detalhes entrada esq
  { x: 2144, y: 666, width: 12, height: 3 },
  { x: 2144, y: 669, width: 11, height: 2 },
  { x: 2144, y: 671, width: 10, height: 2 },
  { x: 2144, y: 673, width: 9, height: 2 },
  { x: 2144, y: 675, width: 8, height: 1 },
  { x: 2144, y: 676, width: 7, height: 1 },
  { x: 2144, y: 677, width: 6, height: 1 },
  { x: 2144, y: 678, width: 5, height: 1 },
  { x: 2144, y: 679, width: 3, height: 1 },
  { x: 2144, y: 680, width: 1, height: 1 },
  //detalhes entrada dir
  { x: 2308, y: 666, width: 12, height: 3 },
  { x: 2309, y: 669, width: 11, height: 2 },
  { x: 2310, y: 671, width: 10, height: 2 },
  { x: 2311, y: 673, width: 9, height: 2 },
  { x: 2312, y: 675, width: 8, height: 1 },
  { x: 2313, y: 676, width: 7, height: 1 },
  { x: 2314, y: 677, width: 6, height: 1 },
  { x: 2315, y: 678, width: 5, height: 1 },
  { x: 2317, y: 679, width: 3, height: 1 },
  { x: 2319, y: 680, width: 1, height: 1 },
  //telescopio
  { x: 1409, y: 682, width: 15, height: 16 },
  //npcs
  { x: 2650, y: 365, width: 13, height: 13 },
  { x: 1492, y: 666, width: 8, height: 24 },
  { x: 310, y: 915, width: 8, height: 16 },
  { x: 310, y: 1041, width: 8, height: 16 },
  //predios-decoração
  { x: 1616, y: 1194, width: 16, height: 414 },
  { x: 1632, y: 1194, width: 464, height: 16 },
  { x: 2096, y: 1194, width: 16, height: 48 },
  { x: 2112, y: 1242, width: 16, height: 32 },
  { x: 2128, y: 1258, width: 240, height: 16 },
  { x: 2368, y: 1226, width: 16, height: 48 },
  { x: 2384, y: 1226, width: 176, height: 16 },
  { x: 2560, y: 1226, width: 16, height: 48 },
  { x: 2576, y: 1258, width: 224, height: 16 },
  { x: 2800, y: 1210, width: 16, height: 64 },
  { x: 2816, y: 1162, width: 160, height: 64 },
  //predio-beco
  { x: 2768, y: 666, width: 30, height: 48 },
  { x: 2798, y: 666, width: 116, height: 32 },
  { x: 2818, y: 698, width: 14, height: 16 },
  { x: 2880, y: 698, width: 14, height: 16 },
  { x: 2672, y: 300, width: 96, height: 382 },
  { x: 2623, y: 300, width: 48, height: 46 },
  { x: 2688, y: 682, width: 48, height: 15 },
];

const buildingBarriers = [
  //cima esquerda
  { x: 385, y: 102, width: 14, height: 62 },
  { x: 289, y: 102, width: 96, height: 78 },
  //cima direita
  { x: 437, y: 102, width: 14, height: 62 },
  { x: 451, y: 102, width: 96, height: 78 },
  //cima meio
  { x: 399, y: 102, width: 38, height: 11 },
  //parede esquerda
  { x: 251, y: 210, width: 22, height: 233 },//grandona
  { x: 273, y: 102, width: 16, height: 108 },//retangulo cima
  { x: 273, y: 251, width: 16, height: 54 },//divisao cima
  { x: 273, y: 347, width: 16, height: 54 },//divisao baixo
  { x: 273, y: 443, width: 16, height: 93 },//retangulo baixo
  //parede direita
  { x: 563, y: 210, width: 22, height: 233 },//grandona
  { x: 547, y: 102, width: 16, height: 108 },//retangulo cima
  { x: 547, y: 251, width: 16, height: 54 },//divisao cima
  { x: 547, y: 347, width: 16, height: 54 },//divisao baixo
  { x: 547, y: 443, width: 16, height: 93 },//retangulo baixo
  //parede porta
  { x: 273, y: 538, width: 290, height: 16 },
];

// ===== BARREIRAS DA SALA =====
const roomBarriers = [
  // Adicione as barreiras da sala aqui depois
  // Por enquanto apenas paredes básicas
  { x: 0, y: 210, width: 800, height: 20 },
  { x: 289, y: 0, width: 20, height: 600 },
  { x: 555, y: 0, width: 20, height: 600 },
  { x: 0, y: 416, width: 800, height: 20 },
  { x: 519, y: 0, width: 36, height: 376 },
  //mesas pri fileira
  { x: 311, y: 342, width: 12, height: 16 },
  { x: 311, y: 295, width: 12, height: 16 },
  { x: 311, y: 247, width: 12, height: 16 },
  //mesas pri fileira hrz
  { x: 323, y: 352, width: 33, height: 6 },
  { x: 323, y: 305, width: 33, height: 6 },
  { x: 323, y: 257, width: 33, height: 6 },
  //mesas seg fileira
  { x: 391, y: 342, width: 12, height: 16 },
  { x: 391, y: 295, width: 12, height: 16 },
  { x: 391, y: 247, width: 12, height: 16 },
  //mesas sec fileira hrz
  { x: 403, y: 352, width: 33, height: 6 },
  { x: 403, y: 305, width: 33, height: 6 },
  { x: 403, y: 257, width: 33, height: 6 },
  //mesas ter fileira
  { x: 505, y: 342, width: 12, height: 16 },
  { x: 505, y: 295, width: 12, height: 16 },
  { x: 505, y: 247, width: 12, height: 16 },
  //mesas ter fileira hrz
  { x: 472, y: 352, width: 33, height: 6 },
  { x: 472, y: 305, width: 33, height: 6 },
  { x: 472, y: 257, width: 33, height: 6 },

];

// ===== BARREIRAS DO CINEMA =====
// Barreiras laterais para o player não sair da tela
const cinemaBarriers = [
  { x: 10, y: 0, width: 16, height: 9999 },      // parede esquerda
  { x: 9999, y: 0, width: 50, height: 9999 },   // parede direita (será ajustada dinamicamente)
];

// Arrays de colisões para cada mapa
const cityCollisions = barriers;
const buildingCollisions = buildingBarriers;
const roomCollisions = roomBarriers;
const cinemaCollisions = cinemaBarriers;

// Área de teleporte
const teleportArea = {
  x: 1311, y: 1450, width: 800, height: 300
};

const teleportTarget = {
  x: 1450, y: 1150
};

// Áreas que deixam as coisas transparentes
const cityFrontAreas = [
  { x: 1623, y: 940, width: 1300, height: 340 },
  { x: 2144, y: 670, width: 176, height: 25 },
];

const cloudsAreas = [
  { x: 1311, y: 1347, width: 800, height: 300 }
];

const telescopeObj = { x: 1409, y: 682, width: 15, height: 16 };

// ===== COMPUTADOR =====
const computerObj = { x: 412, y: 297, width: 5, height: 5 };

// Ícones do computador (posição será calculada dinamicamente no render)
const computerIcons = [
  {
    id: "icon1",
    x: 0, // Será calculado
    y: 0,
    width: 0,
    height: 0,
    url: "https://gutho-ovo.github.io/Pagina-Pessoal/", // COLOQUE SEU LINK AQUI
    img: icon1Img
  },
  {
    id: "icon2",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    url: "https://github.com", // COLOQUE SEU LINK AQUI
    img: icon2Img
  },
  {
    id: "icon3",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    url: "https://www.youtube.com", // COLOQUE SEU LINK AQUI
    img: icon3Img
  },
  {
    id: "icon4",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    url: "https://www.linkedin.com", // COLOQUE SEU LINK AQUI
    img: icon4Img
  },
  {
    id: "icon5",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    url: "https://twitter.com", // COLOQUE SEU LINK AQUI
    img: icon5Img
  }
];

const foregroundObjects = [
  {
    x: 1760,
    y: 640,
    width: 400,
    height: 0,
    img: new Image(),
    offsetY: 220
  }
];
foregroundObjects[0].img.src = "assets/city_front.png";

// ===== PORTAS DO PRÉDIO =====
const buildingDoors = [
  {
    id: "porta_esquerda",
    x: 2156,
    y: 665,
    width: 34,
    height: 4,
    targetMap: "building",
    spawn: { x: 344, y: 450 }
  },
  {
    id: "porta_direita",
    x: 2274,
    y: 665,
    width: 34,
    height: 4,
    targetMap: "building",
    spawn: { x: 460, y: 450 }
  }
];

// ===== SAÍDAS DO PRÉDIO (INTERIOR → CIDADE) =====
const buildingExitDoors = [
  {
    id: "saida_esquerda",
    x: 335,
    y: 545,
    width: 30,
    height: 20,
    targetMap: "city",
    spawn: { x: 2156, y: 690 }
  },
  {
    id: "saida_direita",
    x: 470,
    y: 545,
    width: 30,
    height: 20,
    targetMap: "city",
    spawn: { x: 2274, y: 690 }
  }
];

// ===== PORTA DA SALA (PRÉDIO → SALA) =====
const roomDoor = {
  id: "porta_sala",
  x: 251,
  y: 305,
  width: 24,
  height: 42,
  targetMap: "room",
  spawn: { x: 515, y: 380 } // ajuste conforme necessário
};

// ===== SAÍDA DA SALA (SALA → PRÉDIO) =====
const roomExitDoor = {
  id: "saida_sala",
  x: 550,
  y: 378, // ajuste para onde fica a saída na sala
  width: 5,
  height: 32,
  targetMap: "building",
  spawn: { x: 275, y: 310 } // volta pro prédio
};

// ===== PORTA DO CINEMA (PRÉDIO → CINEMA) =====
const cinemaArea = {
  id: "area_cinema",
  x: 399,
  y: 115,
  width: 38,
  height: 8
};

const cinemaSpawn = { x: 430, y: 285 };

// ===== SAÍDA DO CINEMA (CINEMA → PRÉDIO) =====
const cinemaExitSpawn = { x: 399, y: 130 };

// ===== FUNÇÕES DE COLISÃO =====

// Verifica se dois objetos estão colidindo (AABB)
function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// Verifica se o player está atrás de qualquer área (para transparência)
function isPlayerBehindAnyBuilding(player, areas) {
  for (const area of areas) {
    if (
      player.x + player.width > area.x &&
      player.x < area.x + area.width &&
      player.y + player.height > area.y &&
      player.y < area.y + area.height
    ) {
      return true;
    }
  }
  return false;
}

// Função principal de verificação de colisão
// Verifica se um objeto está colidindo com alguma barreira da lista
function checkCollision(obj, collisionList) {
  for (const barrier of collisionList) {
    if (isColliding(obj, barrier)) {
      return true; // Colidiu
    }
  }
  return false; // Não colidiu
}