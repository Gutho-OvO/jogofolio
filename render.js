function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    const camX = Math.floor(camera.x);
    const camY = Math.floor(camera.y);

    const directionMap = {
        "down": 0,
        "down-left": 1,
        "left": 2,
        "up-left": 3,
        "up": 4,
        "up-right": 5,
        "right": 6,
        "down-right": 7
    };

    // 1. FUNDO
    let activeMap = null;

    if (currentMap === "city") {
        activeMap = cityMap;
    }
    else if (currentMap === "building") {
        activeMap = buildingMap;
    }
    else if (currentMap === "room") {
        activeMap = roomBackImg;
    }
    else if (currentMap === "cinema") {
        // No cinema: desenha fundo preto
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        activeMap = null; // Cadeiras serão desenhadas depois, na parte de baixo
    }

    if (activeMap) {
        ctx.drawImage(
            activeMap,
            camX,
            camY,
            camera.width,
            camera.height,
            0,
            0,
            canvas.width,
            canvas.height
        );
    }

    // 🎬 DESENHA CADEIRAS DO CINEMA (na parte inferior, atrás do player)
    if (currentMap === "cinema" && cinemaSalaImg.complete) {
        // Cadeiras ocupam a parte inferior da tela (60% de baixo para cima)
        const chairsStartY = canvas.height * 0.65; // Começa em 60% da altura
        const chairsHeight = canvas.height - chairsStartY;
        
        // Mantém proporção da imagem
        const ratio = Math.min(
            canvas.width / cinemaSalaImg.width,
            chairsHeight / cinemaSalaImg.height
        );
        
        const w = cinemaSalaImg.width * ratio;
        const h = cinemaSalaImg.height * ratio;
        const chairsX = (canvas.width - w) / 2;
        
        ctx.drawImage(cinemaSalaImg, chairsX, chairsStartY, w, h);
    }

    // 2. PLAYER (sempre desenha, inclusive no cinema)
    const row = directionMap[player.direction];
    const sx = player.frame * 32;
    const sy = row * 32;

    ctx.drawImage(
        playerImg,
        sx,
        sy,
        32,
        32,
        Math.floor(player.x - camX),
        Math.floor(player.y - camY),
        32,
        32
    );

    if (currentMap === "city") {
        // 3. OBJETOS DO MAPA
        ctx.drawImage(objectsImg, camX, camY, camera.width, camera.height, 0, 0, canvas.width, canvas.height);

        // 4. CAMADA DE PRÉDIOS (Com transparência)
        const behindBuilding = isPlayerBehindAnyBuilding(player, cityFrontAreas);
        ctx.save();
        ctx.globalAlpha = behindBuilding ? 0.3 : 1;
        ctx.drawImage(cityFront, camX, camY, camera.width, camera.height, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        // 5. NUVENS
        const behindClouds = isPlayerBehindAnyBuilding(player, cloudsAreas);
        ctx.save();
        ctx.globalAlpha = behindClouds ? 0.3 : 1;
        ctx.drawImage(cloudsImg, camX, camY, camera.width, camera.height, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        // 6. NPCs
        npcs.forEach(npc => {
            let imgToDraw = (npc.id === "dinamico") ? getNpc4Image(npc, player) : npc.img;
            if (imgToDraw && imgToDraw.complete) {
                ctx.drawImage(imgToDraw, Math.floor(npc.x - camX), Math.floor(npc.y - camY), npc.width, npc.height);
            }
            if (isPlayerNear(player, npc)) {
                drawInteractionText("[E] Falar", npc.x, npc.y, camX, camY);
            }
        });
    }
    
    // 🏢 CAMADA FRONTAL DO PRÉDIO (desenha por cima do player)
    if (currentMap === "building" && buildingFrontImg.complete) {
        ctx.drawImage(buildingFrontImg, camX, camY, camera.width, camera.height, 0, 0, canvas.width, canvas.height);
    }
    
    // 🏠 CAMADA FRONTAL DA SALA (desenha por cima do player)
    if (currentMap === "room" && roomFrontImg.complete) {
        ctx.drawImage(roomFrontImg, camX, camY, camera.width, camera.height, 0, 0, canvas.width, canvas.height);
    }
    
    // 🔴 DEBUG - PORTAS E BARREIRAS
    if (window.showDebug) {
        ctx.save();
        
        if (currentMap === "city") {
            ctx.fillStyle = "rgba(0, 0, 255, 0.6)";
            buildingDoors.forEach(door => {
                ctx.fillRect(door.x - camX, door.y - camY, door.width, door.height);
            });
        }

        if (currentMap === "building") {
            ctx.fillStyle = "rgba(255, 0, 0, 0.6)";
            buildingExitDoors.forEach(door => {
                ctx.fillRect(door.x - camX, door.y - camY, door.width, door.height);
            });
            
            ctx.fillStyle = "rgba(255, 255, 0, 0.6)";
            ctx.fillRect(roomDoor.x - camX, roomDoor.y - camY, roomDoor.width, roomDoor.height);
        }

        if (currentMap === "room") {
            ctx.fillStyle = "rgba(255, 165, 0, 0.6)";
            ctx.fillRect(roomExitDoor.x - camX, roomExitDoor.y - camY, roomExitDoor.width, roomExitDoor.height);
        }

        const activeBarriers = 
            currentMap === "city" ? barriers : 
            currentMap === "building" ? buildingBarriers :
            currentMap === "room" ? roomBarriers :
            cinemaBarriers;
        
        ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
        activeBarriers.forEach(barrier => {
            ctx.fillRect(barrier.x - camX, barrier.y - camY, barrier.width, barrier.height);
        });

        ctx.strokeStyle = "lime";
        ctx.lineWidth = 2;
        activeBarriers.forEach(barrier => {
            ctx.strokeRect(barrier.x - camX, barrier.y - camY, barrier.width, barrier.height);
        });

        ctx.restore();
    }

    // 7. INTERFACE E OVERLAYS
    if (playerHasCoin) drawUI();
    
    if (currentMap === "building" && isPlayerNear(player, roomDoor)) {
        drawInteractionText("[E] Entrar", roomDoor.x, roomDoor.y, camX, camY);
    }
    
    if (currentMap === "room" && isPlayerNear(player, roomExitDoor)) {
        drawInteractionText("[E] Sair", roomExitDoor.x, roomExitDoor.y, camX, camY);
    }
    
    if (currentMap === "room" && isPlayerNear(player, computerObj) && !isComputerOpen) {
        drawInteractionText("[E] Usar", computerObj.x, computerObj.y, camX, camY);
    }
    
    if (isTelescopeOpen) drawTelescopeView();
    else if (isPlayerNear(player, telescopeObj)) {
        drawInteractionText("[E] Usar", telescopeObj.x, telescopeObj.y, camX, camY);
    }

    if (isComputerOpen) drawComputerScreen();

    drawDialogue();
    drawFades();
}


// ===== FUNÇÕES AUXILIARES =====

function drawInteractionText(text, x, y, camX, camY) {
    ctx.fillStyle = "white";
    ctx.font = `${Math.max(8, canvas.height * 0.018)}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(text, (x + 16) - camX, (y - 5) - camY);
}

function drawUI() {
    const coinSize = Math.max(16, canvas.height * 0.04);
    ctx.fillStyle = "gold";
    ctx.font = `bold ${coinSize}px Arial`;
    ctx.fillText("🪙", 20, coinSize + 10);
}

function drawDialogue() {
    if (!currentDialogue) return;
    
    // Pega o texto atual
    const text = currentDialogue[dialogueIndex];
    
    // Se o texto estiver vazio ou só espaços, pula
    if (!text || text.trim() === "") {
        console.warn("Texto vazio no índice", dialogueIndex);
        return;
    }

    const isMobile = window.isMobile;
    const isPortrait = canvas.height > canvas.width;
    
    // Ajustes responsivos baseados no dispositivo
    const padding = Math.max(10, canvas.width * 0.02);
    
    // Altura do box: maior no mobile portrait
    let boxHeight;
    if (isMobile && isPortrait) {
        boxHeight = Math.min(140, canvas.height * 0.3);
    } else if (isMobile) {
        boxHeight = Math.min(100, canvas.height * 0.25);
    } else {
        boxHeight = Math.min(100, canvas.height * 0.2);
    }
    
    // Posição do box: TOPO no mobile, BAIXO no desktop
    let boxY;
    if (isMobile) {
        boxY = padding + 10; // Topo da tela no mobile
    } else {
        boxY = canvas.height - boxHeight - padding; // Baixo no desktop
    }

    // Borda branca
    ctx.fillStyle = "white";
    ctx.fillRect(padding - 2, boxY - 2, canvas.width - (padding * 2) + 4, boxHeight + 4);
    
    // Fundo preto
    ctx.fillStyle = "black";
    ctx.fillRect(padding, boxY, canvas.width - (padding * 2), boxHeight);

    ctx.fillStyle = "white";
    
    // Tamanho da fonte: maior no mobile
    let fontSize;
    if (isMobile && isPortrait) {
        fontSize = Math.max(14, canvas.height * 0.028);
    } else if (isMobile) {
        fontSize = Math.max(12, canvas.height * 0.024);
    } else {
        fontSize = Math.max(10, canvas.height * 0.022);
    }
    
    ctx.font = `${fontSize}px 'Courier New', monospace`;
    ctx.textAlign = "left";
    
    const maxWidth = canvas.width - (padding * 4);
    
    // Quebra de linha automática - MELHORADA
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine !== '') {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    
    // Adiciona a última linha
    if (currentLine) {
        lines.push(currentLine);
    }
    
    // Desenha as linhas
    const lineHeight = fontSize + 4;
    const maxLines = Math.floor((boxHeight - padding * 2 - 20) / lineHeight);
    let y = boxY + padding + fontSize;
    
    for (let i = 0; i < Math.min(lines.length, maxLines); i++) {
        ctx.fillText(lines[i], padding + 10, y);
        y += lineHeight;
    }
    
    // Se tiver mais linhas que o espaço permite, adiciona "..."
    if (lines.length > maxLines) {
        const lastVisibleY = boxY + padding + fontSize + (maxLines - 1) * lineHeight;
        ctx.fillText(lines[maxLines - 1] + '...', padding + 10, lastVisibleY);
    }
    
    // Hint "Aperte E"
    const hintSize = Math.max(9, fontSize * 0.7);
    ctx.font = `${hintSize}px Arial`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.textAlign = "right";
    
    const hintY = boxY + boxHeight - padding - 5;
    const hintText = isMobile ? "[E] →" : "Aperte [E] para continuar...";
    ctx.fillText(hintText, canvas.width - padding - 10, hintY);
}

function drawFades() {
    if (fadeOpacity > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (teleportFadeOpacity > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${teleportFadeOpacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function drawTelescopeView() {
    ctx.fillStyle = "#131313";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (telescopeViewImg.complete) {
        const hRatio = canvas.width / telescopeViewImg.width;
        const vRatio = canvas.height / telescopeViewImg.height;
        const ratio  = Math.min(hRatio, vRatio);
        
        const centerShiftX = (canvas.width - telescopeViewImg.width * ratio) / 2;
        const centerShiftY = (canvas.height - telescopeViewImg.height * ratio) / 2;

        ctx.drawImage(
            telescopeViewImg, 
            0, 0, telescopeViewImg.width, telescopeViewImg.height,
            centerShiftX, centerShiftY, 
            telescopeViewImg.width * ratio, 
            telescopeViewImg.height * ratio
        );
    }
}

function drawComputerScreen() {
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#16213e";
    ctx.fillRect(0, 0, canvas.width, 40);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "left";
    ctx.fillText("💻 Meu Computador", 10, 25);

    ctx.fillStyle = "#ff4757";
    ctx.fillRect(canvas.width - 50, 10, 40, 20);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("✕", canvas.width - 30, 25);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "10px Arial";
    ctx.textAlign = "right";
    ctx.fillText("Pressione [E] para fechar", canvas.width - 10, canvas.height - 10);

    computerIcons.forEach(icon => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fillRect(icon.x, icon.y, icon.width, icon.height);

        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText(icon.icon, icon.x + icon.width / 2, icon.y + 50);

        ctx.fillStyle = "#ffffff";
        ctx.font = "12px Arial";
        ctx.fillText(icon.label, icon.x + icon.width / 2, icon.y + icon.height - 10);
    });
}