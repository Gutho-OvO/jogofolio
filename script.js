const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const cinemaOverlay = document.getElementById("cinemaOverlay");
const cinemaIframe  = document.getElementById("cinemaIframe");

const CINEMA_YOUTUBE_URL =
"https://www.youtube.com/embed/yrFZcAA7M4k?si=CUKCJKDKnhYBQRYx";

// Estados do Jogo
window.teleportFading = false;
window.teleportFadeOpacity = 0;
window.teleportStep = ""; 
window.teleportWaitTime = 0;
window.isTelescopeOpen = false;
window.isComputerOpen = false; // NOVO
window.currentDialogue = null;
window.dialogueIndex = 0;
window.playerHasCoin = false;
window.fadeOpacity = 0;
window.isFading = false;
window.fadeTarget = "";
window.currentMap = "city";
window.cinemaState = "closed"; 

// Funções de utilidade
function isPlayerNear(p, obj) {
    const dist = 20; 
    return (
        p.x < obj.x + obj.width + dist &&
        p.x + p.width > obj.x - dist &&
        p.y < obj.y + obj.height + dist &&
        p.y + p.height > obj.y - dist
    );
}

function update() {
    if (currentDialogue) return; 

    // Lógica de Fade do Telescópio
    if (isFading) {
        if (fadeTarget === "open") {
            fadeOpacity += 0.05;
            if (fadeOpacity >= 1) {
                fadeOpacity = 1;
                isTelescopeOpen = true; 
                fadeTarget = "show";
            }
        } else if (fadeTarget === "show" || fadeTarget === "hide") {
            fadeOpacity -= 0.05;
            if (fadeOpacity <= 0) {
                fadeOpacity = 0;
                isFading = false;
                if (fadeTarget === "hide") isTelescopeOpen = false;
            }
        }
        return; 
    }

    if (isTelescopeOpen || isComputerOpen) return;

    // Lógica de Teleporte
    if (!teleportFading && isInsideArea(player, teleportArea)) {
        teleportFading = true;
        teleportStep = "out";
    }

    if (teleportFading) {
        if (teleportStep === "out") {
            teleportFadeOpacity += 0.05;
            if (teleportFadeOpacity >= 1) {
                teleportFadeOpacity = 1;
                teleportStep = "wait";
                teleportWaitTime = 0;
            }
        } else if (teleportStep === "wait") {
            teleportWaitTime++;
            if (teleportWaitTime >= 180) {
                player.x = teleportTarget.x;
                player.y = teleportTarget.y;
                teleportStep = "in";
            }
        } else if (teleportStep === "in") {
            teleportFadeOpacity -= 0.05;
            if (teleportFadeOpacity <= 0) {
                teleportFadeOpacity = 0;
                teleportFading = false;
            }
        }
        return;
    }

    updatePlayer();
}

function loop() {
    update();
    draw(); // Esta função está no render.js
    requestAnimationFrame(loop);
}

function start() {
    if (!window.assetsReady) {
       requestAnimationFrame(start);
        return;
    }

    resizeCanvas();
    
    // Ajusta a barreira direita do cinema baseado no tamanho do canvas
    cinemaBarriers[1].x = canvas.width - 50;

    player.x = spawnPoint.x;
    player.y = spawnPoint.y;

    requestAnimationFrame(loop);
}

// Inicia o processo de checagem
start();

// ===== CLIQUE NO COMPUTADOR =====
canvas.addEventListener("click", (e) => {
    if (!isComputerOpen) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    console.log("Clique detectado em:", clickX, clickY); // DEBUG

    // Verifica se clicou em algum ícone
    computerIcons.forEach(icon => {
        console.log("Verificando ícone:", icon.label, "em", icon.x, icon.y, icon.width, icon.height); // DEBUG
        
        if (
            clickX >= icon.x &&
            clickX <= icon.x + icon.width &&
            clickY >= icon.y &&
            clickY <= icon.y + icon.height
        ) {
            console.log("✅ Clicou no ícone:", icon.label, "URL:", icon.url); // DEBUG
            window.open(icon.url, "_blank");
        }
    });
});

// Muda o cursor quando está sobre um ícone
canvas.addEventListener("mousemove", (e) => {
    if (!isComputerOpen) {
        canvas.style.cursor = "default";
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    let overIcon = false;
    computerIcons.forEach(icon => {
        if (
            mouseX >= icon.x &&
            mouseX <= icon.x + icon.width &&
            mouseY >= icon.y &&
            mouseY <= icon.y + icon.height
        ) {
            overIcon = true;
        }
    });

    canvas.style.cursor = overIcon ? "pointer" : "default";
});