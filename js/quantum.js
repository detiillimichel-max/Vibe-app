/**
 * OIO ONE - SISTEMA QUANTUM (INTERAÇÃO)
 * Função: Navegação de Universos com Estruturas Profissionais
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referências do Hub (Vitrine de 30%)
    const btnHub = document.getElementById('btn-hub');
    const hubLayer = document.getElementById('hub-layer');
    const btnCloseHub = document.querySelector('.close-hub');

    if (btnHub) {
        btnHub.onclick = () => hubLayer.classList.remove('hub-hidden');
    }

    if (btnCloseHub) {
        btnCloseHub.onclick = () => hubLayer.classList.add('hub-hidden');
    }
});

/**
 * MOTOR DE TROCA DE UNIVERSO
 * Substitui Emojis por Componentes de Interface SVG
 */
function switchUniverse(universeId) {
    const navItems = document.querySelectorAll('.nav-item');
    const display = document.getElementById('universe-display');

    // 1. Atualiza Navegação (Estado Ativo)
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick').includes(universeId)) {
            item.classList.add('active');
        }
    });

    // 2. Injeção de Componentes Profissionais
    switch(universeId) {
        case 'home':
            display.innerHTML = `
                <video muted loop playsinline id="main-video" style="width:100%; height:100%; object-fit:cover;">
                    <source src="https://archive.org/download/steamboat-willie-1928/SteamboatWillie1928.mp4" type="video/mp4">
                </video>`;
            document.getElementById('main-video').play();
            break;
        
        case 'reels':
            display.innerHTML = `
                <div class="universe-empty">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1">
                        <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M10 9L15 12L10 15V9Z"/>
                    </svg>
                    <span>IMERSÃO EM VÍDEO</span>
                </div>`;
            break;

        case 'friends':
            display.innerHTML = `
                <div class="list-container">
                    <div class="section-title">PEDIDOS DE CONEXÃO</div>
                    <div class="user-card-pro">
                        <div class="avatar-min"></div>
                        <div class="user-info-min">
                            <span class="u-name">USUÁRIO EM REDE</span>
                            <span class="u-meta">15 conexões em comum</span>
                        </div>
                        <button class="action-mini">CONFIRMAR</button>
                    </div>
                </div>`;
            break;

        case 'market':
            display.innerHTML = `
                <div class="grid-container">
                    <div class="market-card">
                        <div class="market-img"></div>
                        <div class="market-info">
                            <span class="price">R$ 1.500</span>
                            <span class="desc">Veículo / Motor</span>
                        </div>
                    </div>
                    <div class="market-card">
                        <div class="market-img"></div>
                        <div class="market-info">
                            <span class="price">R$ 3.000</span>
                            <span class="desc">Equipamento Profissional</span>
                        </div>
                    </div>
                </div>`;
            break;

        case 'notify':
            display.innerHTML = `
                <div class="list-container">
                    <div class="notify-item">
                        <div class="dot-active"></div>
                        <span>Nova atualização de sistema disponível</span>
                    </div>
                </div>`;
            break;

        case 'profile':
            display.innerHTML = `
                <div class="profile-header">
                    <div class="cover-photo"></div>
                    <div class="profile-main-info">
                        <div class="profile-avatar-large"></div>
                        <span class="profile-status">CRIADOR & AUTOR</span>
                    </div>
                </div>`;
            break;
    }
}
