/**
 * OIO ONE - SISTEMA QUANTUM (INTERAÇÃO)
 * Função: Navegação entre Universos e Controle de Profundidade
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referências do Hub (Vitrine)
    const btnHub = document.getElementById('btn-hub');
    const hubLayer = document.getElementById('hub-layer');
    const btnCloseHub = document.querySelector('.close-hub');

    // --- 1. LÓGICA DO HUB (=) ---
    if (btnHub) {
        btnHub.onclick = () => {
            hubLayer.classList.remove('hub-hidden');
        };
    }

    if (btnCloseHub) {
        btnCloseHub.onclick = () => {
            hubLayer.classList.add('hub-hidden');
        };
    }
});

/**
 * --- 2. LÓGICA DE NAVEGAÇÃO ENTRE UNIVERSOS ---
 * Esta função é chamada pelos botões da 'quantum-nav' no index.html
 */
function switchUniverse(universeId) {
    const navItems = document.querySelectorAll('.nav-item');
    const display = document.getElementById('universe-display');

    // 1. Atualiza o estado visual dos ícones (Botão Ativo)
    navItems.forEach(item => {
        item.classList.remove('active');
        // Verifica se o onclick do botão contém o ID do universo clicado
        if (item.getAttribute('onclick').includes(universeId)) {
            item.classList.add('active');
        }
    });

    // 2. Transição de Conteúdo (Simulação de Profundidade)
    // Aqui o sistema decide o que mostrar em cada seção
    switch(universeId) {
        case 'home':
            display.innerHTML = `<video muted loop playsinline id="main-video" style="width:100%; height:100%; object-fit:cover;"><source src="https://archive.org/download/steamboat-willie-1928/SteamboatWillie1928.mp4" type="video/mp4"></video>`;
            document.getElementById('main-video').play();
            break;
        
        case 'reels':
            display.innerHTML = `<div class="placeholder-universe">🎬 UNIVERSO REELS (EM BREVE)</div>`;
            break;

        case 'friends':
            display.innerHTML = `<div class="placeholder-universe">👥 CONEXÕES EM REDE</div>`;
            break;

        case 'market':
            display.innerHTML = `<div class="placeholder-universe">🛒 MERCADO OIO</div>`;
            break;

        case 'notify':
            display.innerHTML = `<div class="placeholder-universe">🔔 ALERTAS DE SISTEMA</div>`;
            break;

        case 'profile':
            display.innerHTML = `<div class="placeholder-universe">👤 IDENTIDADE DO AUTOR</div>`;
            break;
    }

    console.log(`Universo alterado para: ${universeId}`);
}
