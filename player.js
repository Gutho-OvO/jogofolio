// ===== PLAYER =====
const player = {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    speed: window.isMobile ? 1.2 : 0.5,

    direction: "down",
    frame: 0,
    frameTimer: 0,
    frameDelay: 25,
    moving: false
};

const spawnPoint = { x: 1700, y: 964 };

function isInsideArea(player, area) {
  return (
    player.x < area.x + area.width &&
    player.x + player.width > area.x &&
    player.y < area.y + area.height &&
    player.y + player.height > area.y
  );
}

function updatePlayer() {

    let dx = 0;
    let dy = 0;

    // 🎬 RESTRIÇÃO DE MOVIMENTO NO CINEMA (apenas esquerda/direita)
    if (currentMap === "cinema") {
        if (keys["a"] || keys["arrowleft"]) dx--;
        if (keys["d"] || keys["arrowright"]) dx++;
        // Não permite movimento vertical no cinema
    } else {
        // Movimento normal em outros mapas
        if (keys["w"] || keys["arrowup"]) dy--;
        if (keys["s"] || keys["arrowdown"]) dy++;
        if (keys["a"] || keys["arrowleft"]) dx--;
        if (keys["d"] || keys["arrowright"]) dx++;
    }

    player.moving = dx !== 0 || dy !== 0;

    // 🧭 DIREÇÃO
    if (player.moving) {
        // No cinema, força direção apenas horizontal
        if (currentMap === "cinema") {
            if (dx === -1) player.direction = "left";
            else if (dx === 1) player.direction = "right";
        } else {
            // Movimento normal em outros mapas
            if (dx === 0 && dy === -1) player.direction = "up";
            else if (dx === 0 && dy === 1) player.direction = "down";
            else if (dx === -1 && dy === 0) player.direction = "left";
            else if (dx === 1 && dy === 0) player.direction = "right";
            else if (dx === -1 && dy === -1) player.direction = "up-left";
            else if (dx === 1 && dy === -1) player.direction = "up-right";
            else if (dx === -1 && dy === 1) player.direction = "down-left";
            else if (dx === 1 && dy === 1) player.direction = "down-right";
        }
    }

    // 🔄 NORMALIZA DIAGONAL
    const len = Math.hypot(dx, dy);
    if (len !== 0) {
        dx /= len;
        dy /= len;
    }

    // 🔮 PRÓXIMA POSIÇÃO
    const nextX = player.x + dx * player.speed;
    const nextY = player.y + dy * player.speed;

    // Seleciona as colisões do mapa atual
    const activeCollisions = 
        currentMap === "city" ? cityCollisions : 
        currentMap === "building" ? buildingCollisions : 
        currentMap === "room" ? roomCollisions :
        cinemaCollisions;

    // 👣 HITBOX NOS PÉS (para verificação mais precisa)
    const hitboxX = {
        x: nextX + (player.width - 18) / 2,
        y: player.y + player.height - 15,
        width: 18,
        height: 15
    };

    const hitboxY = {
        x: player.x + (player.width - 18) / 2,
        y: nextY + player.height - 15,
        width: 18,
        height: 15
    };

    // Verifica colisão no eixo X
    if (!checkCollision(hitboxX, activeCollisions)) {
        player.x = nextX;
    }

    // Verifica colisão no eixo Y (não aplica no cinema)
    if (currentMap !== "cinema" && !checkCollision(hitboxY, activeCollisions)) {
        player.y = nextY;
    }

    // 🎞️ ANIMAÇÃO
    if (player.moving) {
        player.frameTimer++;

        if (player.frameTimer >= player.frameDelay) {
            player.frame++;

            if (player.frame > 4) {
                player.frame = 1; // volta para primeiro frame andando
            }

            player.frameTimer = 0;
        }
    } else {
        player.frame = 0; // parado
    }

    updateCamera();
}
