/**
 * OIO ONE - SISTEMA QUANTUM (ORQUESTRADOR)
 * Gerencia a troca de camadas e a ativação de módulos dinâmicos.
 */

// Importamos os controladores (O Core que criamos antes)
import { OriginController } from './modules/origin/controller.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnHub = document.getElementById('btn-hub');
    const hubLayer = document.getElementById('hub-layer');
    const btnCloseHub = document.querySelector('.close-hub');

    if (btnHub) btnHub.onclick = () => hubLayer.classList.remove('hub-hidden');
    if (btnCloseHub) btnCloseHub.onclick = () => hubLayer.classList.add('hub-hidden');
});

// Tornamos a função global para o 'onclick' do HTML funcionar
window.switchUniverse = function(universeId) {
    const navItems = document.querySelectorAll('.nav-item');
    const display = document.getElementById('universe-display');

    // 1. Feedback Visual dos Ícones
    navItems.forEach(item => {
        item.classList.remove('active');
        // Verifica se o atributo onclick contém o ID atual
        if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(universeId)) {
            item.classList.add('active');
        }
    });

    // 2. Troca de Universo Dinâmica
    switch(universeId) {
        case 'home':
            // Em vez de escrever o HTML aqui, chamamos o controlador
            OriginController.init(); 
            break;
        
        case 'friends':
            // Aqui chamaremos o NexusController no futuro
            display.innerHTML = `<div class="universe-empty"><span>CONEXÕES EM REDE</span></div>`;
            break;

        case 'reels': 
        case 'market': 
        case 'notify':
        case 'profile':
            // Placeholder para os outros módulos
            display.innerHTML = `
                <div class="module-loading">
                    <span style="letter-spacing: 5px; opacity: 0.3;">CARREGANDO ${universeId.toUpperCase()}...</span>
                </div>`;
            break;
    }
}
