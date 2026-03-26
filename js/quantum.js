/**
 * OIO ONE - SISTEMA QUANTUM (INTERAÇÃO)
 * Função: Navegação de Universos e Vitrine de Clássicos
 */

document.addEventListener('DOMContentLoaded', () => {
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
 * Transforma o 'Market' em Galeria de Domínio Público
 */
function switchUniverse(universeId) {
    const navItems = document.querySelectorAll('.nav-item');
    const display = document.getElementById('universe-display');

    // Atualiza estado visual da barra superior
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick').includes(universeId)) {
            item.classList.add('active');
        }
    });

    // Injeção de Estruturas de Elite
    switch(universeId) {
        case 'home':
            display.innerHTML = `
                <video muted loop playsinline id="main-video" style="width:100%; height:100%; object-fit:cover;">
                    <source src="https://archive.org/download/steamboat-willie-1928/SteamboatWillie1928.mp4" type="video/mp4">
                </video>`;
            const v = document.getElementById('main-video');
            if (v) v.play();
            break;
        
        case 'reels': // Desenhos e Animações Curtas
            display.innerHTML = `
                <div class="list-container">
                    <div class="section-title">DESENHOS E ANIMAÇÕES</div>
                    <div class="art-card">
                        <div class="art-preview"></div>
                        <div class="art-info">
                            <span class="t-title">Popeye the Sailor</span>
                            <span class="t-meta">1933 • Fleischer Studios</span>
                        </div>
                    </div>
                </div>`;
            break;

        case 'market': // A VITRINE DE CLÁSSICOS (O "Novo" Marketplace)
            display.innerHTML = `
                <div class="grid-container">
                    <div class="movie-card">
                        <div class="movie-poster"></div>
                        <div class="movie-info">
                            <span class="price">DOMÍNIO PÚBLICO</span>
                            <span class="desc">Metropolis (1927)</span>
                        </div>
                    </div>
                    <div class="movie-card">
                        <div class="movie-poster"></div>
                        <div class="movie-info">
                            <span class="price">DOMÍNIO PÚBLICO</span>
                            <span class="desc">The General (1926)</span>
                        </div>
                    </div>
                </div>`;
            break;

        case 'friends':
            display.innerHTML = `<div class="universe-empty"><span>CONEXÕES EM REDE</span></div>`;
            break;

        case 'notify':
            display.innerHTML = `
                <div class="list-container">
                    <div class="notify-item">
                        <div class="dot-active"></div>
                        <span>Acervo OIO atualizado com novas obras clássicas.</span>
                    </div>
                </div>`;
            break;

        case 'profile':
            display.innerHTML = `
                <div class="profile-header">
                    <div class="profile-avatar-large"></div>
                    <span class="profile-status">AUTOR DO UNIVERSO</span>
                </div>`;
            break;
    }
}
