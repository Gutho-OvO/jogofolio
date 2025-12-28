// ===== CAMERA =====
const camera = {
  x: 0,
  y: 0,
  width: 960,
  height: 540
};

// Zoom e escala ajustáveis
let ZOOM = 2.0;
let SCALE_FACTOR = 1;

function calculateZoom() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  if (window.isMobile) {
    // Mobile: apenas modo portrait (vertical)
    if (screenWidth < 400) {
      ZOOM = 2;
    } else if (screenWidth < 600) {
      ZOOM = 2.3;
    } else {
      ZOOM = 2.8;
    }
  } else {

    const pixelArea = screenWidth * screenHeight;
    const referenceArea = 3440 * 1440;
    const areaRatio = Math.sqrt(pixelArea / referenceArea);
    
    ZOOM = 1.5 / areaRatio; 
    ZOOM = Math.max(0.5, Math.min(2, ZOOM)); 
  }
  
  SCALE_FACTOR = ZOOM / 4; 
  
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
  
  if (player) {
    // Velocidade base diferente para mobile e desktop
    const baseSpeed = window.isMobile ? 3.1 : 5.5;
    player.speed = baseSpeed * SCALE_FACTOR;
    
    // Frame delay inversamente proporcional 
    const baseFrameDelay = window.isMobile ? 5 : 4; 
    player.frameDelay = Math.max(5, Math.round(baseFrameDelay / SCALE_FACTOR));
    
    console.log("Player speed:", player.speed.toFixed(2), "| Frame delay:", player.frameDelay);
  }
}

window.updateCamera = function() {
  if (mapTransitionFading) {
    return; // Mantém a câmera parada durante o fade
  }

  // No cinema, a câmera fica fixa
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