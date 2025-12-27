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
    // Desktop: zoom baseado na resolução
    ZOOM = 4;
  }
  
  // Calcula o fator de escala baseado no ZOOM
  // ZOOM 4 (padrão) = escala 1.0
  // ZOOM menor = escala menor = velocidade MAIOR
  SCALE_FACTOR = 4 / ZOOM; // INVERTIDO! Quanto menor o zoom, menor a escala
  
  console.log("ZOOM:", ZOOM, "| SCALE_FACTOR:", SCALE_FACTOR.toFixed(2));
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
    const baseSpeed = 0.5; // Velocidade no seu monitor 3440x1440
    player.speed = baseSpeed * SCALE_FACTOR; // MULTIPLICAR, não dividir
    player.frameDelay = Math.max(8, Math.round(25 / SCALE_FACTOR)); // Mínimo 8
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