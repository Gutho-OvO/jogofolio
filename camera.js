// ===== CAMERA =====
const camera = {
  x: 0,
  y: 0,
  width: 960,
  height: 540
};

// Zoom ajustável por tamanho de tela
let ZOOM = 4;

function calculateZoom() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const isPortrait = screenHeight > screenWidth; // Detecta orientação
  
  if (window.isMobile) {
    // Mobile: zoom menor para ver mais do mapa e UI maior
    if (isPortrait) {
      // Modo retrato (vertical) - zoom ainda menor para UI maior
      if (screenWidth < 400) {
        ZOOM = 2;
      } else if (screenWidth < 600) {
        ZOOM = 2.3;
      } else {
        ZOOM = 2.8;
      }
    } else {
      // Modo paisagem (horizontal)
      if (screenWidth < 600) {
        ZOOM = 2.8;
      } else {
        ZOOM = 3.2;
      }
    }
  } else {
    // Desktop: zoom padrão
    ZOOM = 4;
  }
}

// Função resizeCanvas
function resizeCanvas() {
  calculateZoom();
  canvas.width = window.innerWidth / ZOOM;
  canvas.height = window.innerHeight / ZOOM;
  camera.width = canvas.width;
  camera.height = canvas.height;
  ctx.imageSmoothingEnabled = false;
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