// ===== CONTROLES MOBILE =====

// Cria os botões de controle
if (window.isMobile) {
    createMobileControls();
}

function createMobileControls() {
    // Container dos controles
    const controlsDiv = document.createElement('div');
    controlsDiv.id = 'mobile-controls';
    controlsDiv.innerHTML = `
        <!-- D-Pad (esquerda) -->
        <div id="dpad">
            <button class="dpad-btn" id="btn-up">↑</button>
            <button class="dpad-btn" id="btn-left">←</button>
            <button class="dpad-btn" id="btn-down">↓</button>
            <button class="dpad-btn" id="btn-right">→</button>
        </div>
        
        <!-- Botão de ação (direita) -->
        <div id="action-buttons">
            <button class="action-btn" id="btn-e">E</button>
        </div>
    `;
    document.body.appendChild(controlsDiv);

    // Adiciona os estilos
    addMobileStyles();

    // Configura os eventos touch
    setupTouchControls();
}

function addMobileStyles() {
    const style = document.createElement('style');
    style.textContent = `
        #mobile-controls {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 200px;
            pointer-events: none;
            z-index: 998; /* Abaixo do cinema */
        }

        #dpad {
            position: absolute;
            bottom: 20px;
            left: 20px;
            width: 150px;
            height: 150px;
            pointer-events: auto;
        }

        .dpad-btn {
            position: absolute;
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            color: white;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }

        .dpad-btn:active {
            background: rgba(255, 255, 255, 0.6);
        }

        #btn-up {
            top: 0;
            left: 50px;
        }

        #btn-down {
            bottom: 0;
            left: 50px;
        }

        #btn-left {
            top: 50px;
            left: 0;
        }

        #btn-right {
            top: 50px;
            right: 0;
        }

        #action-buttons {
            position: absolute;
            bottom: 20px;
            right: 20px;
            pointer-events: auto;
        }

        .action-btn {
            width: 70px;
            height: 70px;
            background: rgba(76, 175, 80, 0.5);
            border: 3px solid rgba(76, 175, 80, 0.8);
            border-radius: 50%;
            color: white;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }

        .action-btn:active {
            background: rgba(76, 175, 80, 0.8);
            transform: scale(0.95);
        }

        /* Esconde controles mobile no desktop */
        @media (min-width: 768px) {
            #mobile-controls {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

function setupTouchControls() {
    // Mapeamento de botões para teclas
    const buttonKeyMap = {
        'btn-up': 'w',
        'btn-down': 's',
        'btn-left': 'a',
        'btn-right': 'd',
        'btn-e': 'e'
    };

    // Para cada botão, adiciona eventos touch
    Object.keys(buttonKeyMap).forEach(btnId => {
        const btn = document.getElementById(btnId);
        const key = buttonKeyMap[btnId];

        // Touch start = pressionar tecla
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keys[key] = true;
            
            // Para o botão E, simula keydown também
            if (key === 'e') {
                const event = new KeyboardEvent('keydown', { key: 'e' });
                window.dispatchEvent(event);
            }
        });

        // Touch end = soltar tecla
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            keys[key] = false;
        });

        // Touch cancel = soltar tecla (se o dedo sair do botão)
        btn.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            keys[key] = false;
        });
    });
}

// Previne zoom no mobile ao dar double tap
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Previne scroll no canvas
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });