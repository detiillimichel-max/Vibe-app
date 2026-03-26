import { OriginController } from './modules/origin/controller.js';

window.switchUniverse = (universe) => {
    // 1. Gerir estado visual dos botões
    const items = document.querySelectorAll('.nav-item');
    items.forEach(item => item.classList.remove('active'));
    
    // Procura o botão clicado para ativar o brilho e o traço "__"
    const clickedItem = event.currentTarget;
    if(clickedItem) clickedItem.classList.add('active');

    // 2. Lógica de carregamento de módulos
    if (universe === 'home') {
        OriginController.init();
    } else {
        // Limpa o display para os outros módulos que vamos criar
        document.getElementById('universe-display').innerHTML = `
            <div class="module-container active" style="display:flex; align-items:center; justify-content:center; height:100vh;">
                <p style="color:var(--inactive); letter-spacing:2px;">MÓDULO ${universe.toUpperCase()} EM DESENVOLVIMENTO</p>
            </div>
        `;
    }
};
