/**
 * OIO ONE - CORE JS
 * Responsável por ligar o botão de acesso e carregar os módulos.
 */

import { OriginController } from './modules/origin/controller.js';

// Escuta o clique no botão ACESSAR
document.addEventListener('click', (e) => {
    if (e.target.id === 'btn-entrar') {
        
        const portal = document.getElementById('portal-layer');
        const appLayer = document.getElementById('app-layer');

        // 1. Esconde a tela de login e mostra a estrutura do App
        if (portal) portal.style.display = 'none';
        if (appLayer) {
            appLayer.classList.remove('hidden');
            appLayer.style.display = 'block';
        }

        // 2. Chama o primeiro módulo da esquerda (Home/Feed)
        // Passamos o seu nome para o sistema já te reconhecer
        OriginController.init("Michel Detilli");
    }
});
