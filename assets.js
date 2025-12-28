window.assetsReady = false;

// Imagens
const cityMap = new Image();
cityMap.src = "assets/city_back.png";

const playerImg = new Image();
playerImg.src = "assets/player.png";

const cityFront = new Image();
cityFront.src = "assets/city_front.png";

const telescopeViewImg = new Image();
telescopeViewImg.src = "assets/telescopio_visao.png";

const cloudsImg = new Image();
cloudsImg.src = "assets/clouds.png";

const objectsImg = new Image();
objectsImg.src = "assets/objects.png";

const npc1Img = new Image();
npc1Img.src = "assets/npc_moeda.png";

const npc2Img = new Image();
npc2Img.src = "assets/npc_fixo1.png";

const npc3Img = new Image();
npc3Img.src = "assets/npc_fixo2.png";

const npc4FrontImg = new Image();
npc4FrontImg.src = "assets/npc_pose_frente.png";

const npc4DiagImg = new Image();
npc4DiagImg.src = "assets/npc_pose_diag.png";

const buildingMap = new Image();
buildingMap.src = "assets/interior_predio.png";

const roomBackImg = new Image();
roomBackImg.src = "assets/sala_computador.png";

const roomFrontImg = new Image();
roomFrontImg.src = "assets/sala_computador_deco.png";

const buildingFrontImg = new Image();
buildingFrontImg.src = "assets/decoracao_dentro.png";

const cinemaSalaImg = new Image();
cinemaSalaImg.src = "assets/sala_cinema.png";

const computerScreenImg = new Image();
computerScreenImg.src = "assets/computador.png";

const icon1Img = new Image();
icon1Img.src = "assets/icone1.png";

const icon2Img = new Image();
icon2Img.src = "assets/icone2.png";

const icon3Img = new Image();
icon3Img.src = "assets/icone3.png";

const icon4Img = new Image();
icon4Img.src = "assets/icone4.png";

const icon5Img = new Image();
icon5Img.src = "assets/icone5.png";


// controle de load
const TOTAL_ASSETS = 22;
let assetsLoaded = 0;

function assetLoaded() {
    assetsLoaded++;
    console.log(`Asset carregado: ${assetsLoaded}/${TOTAL_ASSETS}`);

    if (assetsLoaded === TOTAL_ASSETS) {
        window.assetsReady = true;
    }
}

// onload
cityMap.onload = assetLoaded;
playerImg.onload = assetLoaded;
cityFront.onload = assetLoaded;
cloudsImg.onload = assetLoaded;
telescopeViewImg.onload = assetLoaded;
objectsImg.onload = assetLoaded;
npc1Img.onload = assetLoaded;
npc2Img.onload = assetLoaded;
npc3Img.onload = assetLoaded;
npc4FrontImg.onload = assetLoaded;
npc4DiagImg.onload = assetLoaded;
buildingMap.onload = assetLoaded;
roomBackImg.onload = assetLoaded;
roomFrontImg.onload = assetLoaded;
buildingFrontImg.onload = assetLoaded;
cinemaSalaImg.onload = assetLoaded;
computerScreenImg.onload = assetLoaded;
icon1Img.onload = assetLoaded;
icon2Img.onload = assetLoaded;
icon3Img.onload = assetLoaded;
icon4Img.onload = assetLoaded;
icon5Img.onload = assetLoaded;