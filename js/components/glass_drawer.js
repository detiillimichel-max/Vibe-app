// OIO ONE - Camada Sensorial e de Interação (Gesto)
// Responsável pelo efeito de vidro e arrasto dinâmico

export function initDrawer() {
    const interactionLayer = document.getElementById('interaction-layer');
    if (!interactionLayer) return;

    // Criando a estrutura da gaveta (Efeito Vidro)
    interactionLayer.innerHTML = `
        <div id="vibe-drawer" class="glass-container">
            <div class="drag-handle"></div>
            <div class="drawer-content">
                <p>Identidade do Usuário</p>
                <div class="status-dot"></div>
            </div>
        </div>
    `;

    const drawer = document.getElementById('vibe-drawer');
    let startY = 0;
    let currentHeight = 30; // Começa em 30%

    // Lógica de Arrasto (Touch para celular)
    drawer.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        drawer.style.transition = 'none'; // Remove delay durante o toque
    });

    drawer.addEventListener('touchmove', (e) => {
        const deltaY = startY - e.touches[0].clientY;
        const newHeight = 30 + (deltaY / window.innerHeight) * 100;

        // Limite de segurança: entre 30% e 55% da tela
        if (newHeight >= 30 && newHeight <= 55) {
            drawer.style.height = `${newHeight}vh`;
        }
    });

    drawer.addEventListener('touchend', () => {
        drawer.style.transition = 'height 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
        const finalHeight = parseFloat(drawer.style.height);

        // Snap: se soltar perto do topo, ele "atraca" em 50%
        if (finalHeight > 40) {
            drawer.style.height = '50vh';
        } else {
            drawer.style.height = '30vh';
        }
    });
}
