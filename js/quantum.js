/**
 * OIO ONE - SISTEMA QUANTUM (INTERAÇÃO)
 * Função: Navegação de Universos e Curadoria Visual de Elite
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

function switchUniverse(universeId) {
    const navItems = document.querySelectorAll('.nav-item');
    const display = document.getElementById('universe-display');

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick').includes(universeId)) {
            item.classList.add('active');
        }
    });

    switch(universeId) {
        case 'home':
            display.innerHTML = `
                <video muted loop playsinline id="main-video" style="width:100%; height:100%; object-fit:cover;">
                    <source src="https://archive.org/download/steamboat-willie-1928/SteamboatWillie1928.mp4" type="video/mp4">
                </video>`;
            const v = document.getElementById('main-video');
            if (v) v.play();
            break;
        
        case 'reels': 
            display.innerHTML = `
                <div class="list-container">
                    <div class="section-title">DESENHOS E ANIMAÇÕES</div>
                    <div class="art-card">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Popeye_the_Sailor_1933.jpg/800px-Popeye_the_Sailor_1933.jpg" class="art-preview">
                        <div class="art-info">
                            <span class="t-title">Popeye the Sailor</span>
                            <span class="t-meta">1933 • Fleischer Studios</span>
                        </div>
                    </div>
                </div>`;
            break;

        case 'market': 
            display.innerHTML = `
                <div class="grid-container">
                    <div class="movie-card">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Metropolis-poster.jpg/800px-Metropolis-poster.jpg" class="movie-poster">
                        <div class="movie-info">
                            <span class="price">DOMÍNIO PÚBLICO</span>
                            <span class="desc">Metropolis (1927)</span>
                        </div>
                    </div>
                    <div class="movie-card">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Nosferatu_1922_poster.jpg" class="movie-poster">
                        <div class="movie-info">
                            <span class="price">DOMÍNIO PÚBLICO</span>
                            <span class="desc">Nosferatu (1922)</span>
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
                    <div class="notify-item" style="padding: 20px; background: rgba(255,255,255,0.02); border-radius: 15px;">
                        <span style="font-size: 13px; color: rgba(255,255,255,0.7);">Acervo OIO atualizado com obras de 1920.</span>
                    </div>
                </div>`;
            break;

        case 'profile':
            display.innerHTML = `
                <div class="profile-header" style="padding: 40px 20px; text-align: center;">
                    <div style="width: 100px; height: 100px; background: rgba(255,255,255,0.05); border-radius: 50%; margin: 0 auto 20px;"></div>
                    <span class="profile-status" style="letter-spacing: 4px; font-size: 10px; opacity: 0.5;">AUTOR DO UNIVERSO</span>
                </div>`;
            break;
    }
}
