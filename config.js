// configurações globais

// Detecta se é mobile
window.isMobile = (function() {
    // 1. Verifica o tamanho da tela primeiro
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const maxDimension = Math.max(screenWidth, screenHeight);
    const minDimension = Math.min(screenWidth, screenHeight);
    
    // Se a tela for muito larga, definitivamente é desktop
    if (screenWidth >= 2560) {
        console.log("Detectado monitor ultrawide - Desktop");
        return false;
    }
    
    // Se a tela for muito grande em qualquer dimensão, é desktop
    if (maxDimension >= 1920 && minDimension >= 1080) {
        console.log("Detectado tela grande - Desktop");
        return false;
    }
    
    // 2. Verifica se tem touch
    const hasTouch = ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0) || 
                     (navigator.msMaxTouchPoints > 0);
    
    // Se não tem touch e tela é média/grande, é desktop
    if (!hasTouch && minDimension >= 768) {
        console.log("Sem touch e tela grande - Desktop");
        return false;
    }
    
    // 3. Verifica user agent apenas para telas menores
    const ua = navigator.userAgent.toLowerCase();
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
    
    // Se tem user agent mobile e tela pequena, é mobile
    if (isMobileUA && maxDimension < 1366) {
        console.log("User agent mobile e tela pequena - Mobile");
        return true;
    }
    
    // Se chegou aqui e tem touch em tela pequena, é mobile
    if (hasTouch && maxDimension < 1024) {
        console.log("Touch em tela pequena - Mobile");
        return true;
    }
    
    // Padrão: desktop
    console.log("Padrão - Desktop");
    return false;
})();

console.log("═══════════════════════════════════");
console.log("Device type:", window.isMobile ? "📱 MOBILE" : "🖥️ DESKTOP");
console.log("Screen:", window.screen.width + "x" + window.screen.height);
console.log("Window:", window.innerWidth + "x" + window.innerHeight);
console.log("═══════════════════════════════════");