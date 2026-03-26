// OIO ONE - Conexão Vital
document.addEventListener('DOMContentLoaded', () => {
    console.log("Cérebro OIO Conectado!");

    // 1. ABRIR O HUB (=)
    const btnHub = document.getElementById('btn-hub');
    const hubLayer = document.getElementById('hub-layer');

    if (btnHub && hubLayer) {
        btnHub.onclick = () => {
            hubLayer.classList.remove('hub-hidden');
            console.log("Hub Aberto");
        };
    }

    // 2. FECHAR O HUB
    const btnClose = document.querySelector('.close-hub');
    if (btnClose && hubLayer) {
        btnClose.onclick = () => {
            hubLayer.classList.add('hub-hidden');
        };
    }

    // 3. LOGIC DA ESTRELA (PORTAL)
    const star = document.getElementById('star-trigger');
    const portal = document.getElementById('portal-layer');
    const appBody = document.getElementById('app-layer');

    if (star) {
        star.onclick = () => {
            portal.style.opacity = '0';
            setTimeout(() => {
                portal.classList.add('hidden');
                appBody.classList.remove('hidden');
            }, 1000);
        };
    }
});
