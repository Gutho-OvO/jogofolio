// ===== CAMERA =====
const camera = {
  x: 0,
  y: 0,
  width: 960,
  height: 540
};

// Zoom e escala ajustáveis
let ZOOM = 4;
let SCALE_FACTOR = 1; // Fator de escala global baseado no zoom

function calculateZoom() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const isPortrait = screenHeight > screenWidth;
  
  if (window.isMobile) {
    // Mobile: zoom menor para ver mais do mapa
    if (isPortrait) {
      if (screenWidth < 400) {
        ZOOM = 2;
      } else if (screenWidth < 600) {
        ZOOM = 2.3;
      } else {
        ZOOM = 2.8;
      }
    } else {
      if (screenWidth < 600) {
        ZOOM = 2.8;
      } else {
        ZOOM = 3.2;
      }
    }
  } else {
    // Desktop: zoom baseado na resolução para manter experiência consistente
    // Seu monitor: 3440x1440 = área de ~4.9M pixels → ZOOM 4
    // Notebook: 1920x1080 = área de ~2M pixels → ZOOM ajustado
    
    const pixelArea = screenWidth * screenHeight;
    const referenceArea = 3440 * 1440; // Seu monitor principal
    const areaRatio = Math.sqrt(pixelArea / referenceArea);
    
    // ZOOM varia entre 3 e 4.5 baseado na resolução
    ZOOM = 4 / areaRatio;
    ZOOM = Math.max(3, Math.min(4.5, ZOOM)); // Limita entre 3 e 4.5
  }
  
  // SCALE_FACTOR agora representa o quanto mais rápido tudo deve ser
  // ZOOM maior = tela menor = precisa compensar com velocidade maior
  SCALE_FACTOR = ZOOM / 4; // Inverte a lógica anterior
  
  console.log("Resolução:", screenWidth, "x", screenHeight);
  console.log("ZOOM:", ZOOM.toFixed(2), "| SCALE_FACTOR:", SCALE_FACTOR.toFixed(2));
}

// Função resizeCanvas
function resizeCanvas() {
  calculateZoom();
  canvas.width = window.innerWidth / ZOOM;
  canvas.height = window.innerHeight / ZOOM;
  camera.width = canvas.width;
  camera.height = canvas.height;
  ctx.imageSmoothingEnabled = false;
  
  // Atualiza velocidade do player baseado na escala
  if (player) {
    // Velocidade base do seu monitor 3440x1440
    const baseSpeed = 2.0; // Ajuste este valor se necessário
    player.speed = baseSpeed * SCALE_FACTOR;
    
    // Frame delay inversamente proporcional (quanto menor a tela, mais rápido a animação)
    const baseFrameDelay = 10; // Ajuste este valor se necessário
    player.frameDelay = Math.max(5, Math.round(baseFrameDelay / SCALE_FACTOR));
    
    console.log("Player speed:", player.speed.toFixed(2), "| Frame delay:", player.frameDelay);
  }
}

window.updateCamera = function() {
  // 🎬 No cinema, a câmera fica fixa (não segue o player)
  if (currentMap === "cinema") {
    camera.x = 0;
    camera.y = 0;
    return;
  }

  camera.x = player.x + player.width / 2 - camera.width / 2;
  camera.y = player.y + player.height / 2 - camera.height / 2;

  const mapWidth  = 
    currentMap === "city" ? cityMap.width  : 
    currentMap === "building" ? buildingMap.width :
    roomBackImg.width;
    
  const mapHeight = 
    currentMap === "city" ? cityMap.height : 
    currentMap === "building" ? buildingMap.height :
    roomBackImg.height;

  camera.x = Math.max(0, Math.min(camera.x, mapWidth - camera.width));
  camera.y = Math.max(0, Math.min(camera.y, mapHeight - camera.height));
}

window.addEventListener("resize", resizeCanvas);