// ===== CONTROLES =====
const keys = {};

window.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;

    if (e.key.toLowerCase() === "e" && !isFading) {

        // 1. Avança diálogo
        if (currentDialogue) {
            dialogueIndex++;
            if (dialogueIndex >= currentDialogue.length) {
                currentDialogue = null;
                dialogueIndex = 0;
            }
            return;
        }

        // 2. Interação com NPC
        let interacted = false;
        npcs.forEach(npc => {
            if (isPlayerNear(player, npc)) {
                currentDialogue = npc.dialogue;
                dialogueIndex = 0;
                interacted = true;

                if (npc.id === "moeda" && !playerHasCoin) {
                    playerHasCoin = true;
                }
            }
        });

        if (interacted) return;

        // 🚪 PORTAS CIDADE → PRÉDIO
        buildingDoors.forEach(door => {
            if (currentMap === "city" && isPlayerNear(player, door)) {
                currentMap = door.targetMap;
                player.x = door.spawn.x;
                player.y = door.spawn.y;
            }
        });

        // 🚪 SAÍDA DO PRÉDIO → CIDADE
        buildingExitDoors.forEach(door => {
            if (currentMap === "building" && isPlayerNear(player, door)) {
                currentMap = door.targetMap;
                player.x = door.spawn.x;
                player.y = door.spawn.y;
            }
        });

        // 🚪 PORTA PRÉDIO → SALA
        if (currentMap === "building" && isPlayerNear(player, roomDoor)) {
            currentMap = roomDoor.targetMap;
            player.x = roomDoor.spawn.x;
            player.y = roomDoor.spawn.y;
            return;
        }

        // 🚪 SAÍDA SALA → PRÉDIO
        if (currentMap === "room" && isPlayerNear(player, roomExitDoor)) {
            currentMap = roomExitDoor.targetMap;
            player.x = roomExitDoor.spawn.x;
            player.y = roomExitDoor.spawn.y;
            return;
        }

        // 🎬 ENTRAR NO CINEMA
        if (
            currentMap === "building" &&
            cinemaState === "closed" &&
            isPlayerNear(player, cinemaArea)
        ) {
            currentMap = "cinema";
            cinemaState = "watching";

            player.x = cinemaSpawn.x;
            player.y = cinemaSpawn.y;

            cinemaOverlay.style.display = "flex";
            cinemaIframe.src = CINEMA_YOUTUBE_URL;
            
            // Mostra botão de fechar no mobile
            if (window.isMobile && window.toggleCinemaCloseBtn) {
                window.toggleCinemaCloseBtn(true);
            }

            return;
        }

        // 🚪 SAÍDA CINEMA → PRÉDIO (pressionar E)
        if (currentMap === "cinema") {
            cinemaIframe.src = "";
            cinemaOverlay.style.display = "none";
            
            // Esconde botão de fechar no mobile
            if (window.isMobile && window.toggleCinemaCloseBtn) {
                window.toggleCinemaCloseBtn(false);
            }

            cinemaState = "closed";
            currentMap = "building";

            player.x = cinemaExitSpawn.x;
            player.y = cinemaExitSpawn.y;

            return;
        }

        // 3. Telescópio
        if (isTelescopeOpen) {
            isFading = true;
            fadeTarget = "hide";
        } else if (isPlayerNear(player, telescopeObj)) {
            if (playerHasCoin) {
                isFading = true;
                fadeTarget = "open";
            }
        }

        // 4. Computador
        if (isComputerOpen) {
            isComputerOpen = false;
        } else if (currentMap === "room" && isPlayerNear(player, computerObj)) {
            isComputerOpen = true;
        }
    }
});

window.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});

// ===== BOTÃO DE FECHAR CINEMA NO MOBILE =====
if (window.isMobile) {
    const closeCinemaBtn = document.createElement('button');
    closeCinemaBtn.id = 'close-cinema-btn';
    closeCinemaBtn.textContent = '✕ Sair';
    closeCinemaBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
        display: none;
        padding: 15px 25px;
        background: rgba(255, 77, 87, 0.9);
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    `;
    
    closeCinemaBtn.addEventListener('click', () => {
        if (currentMap === "cinema") {
            cinemaIframe.src = "";
            cinemaOverlay.style.display = "none";
            closeCinemaBtn.style.display = "none";

            cinemaState = "closed";
            currentMap = "building";

            player.x = cinemaExitSpawn.x;
            player.y = cinemaExitSpawn.y;
        }
    });
    
    document.body.appendChild(closeCinemaBtn);
    
    // Função global para mostrar/esconder o botão
    window.toggleCinemaCloseBtn = (show) => {
        closeCinemaBtn.style.display = show ? 'block' : 'none';
    };
}