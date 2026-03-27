/**
 * OIO ONE - SISTEMA QUANTUM (ORQUESTRADOR DE NAVEGAÇÃO)
 * Gerencia a troca de camadas e a ativação de módulos dinâmicos.
 * Regra: Processamento por IDs de Universo, sem nomes fixos.
 */

import { OriginController } from './modules/origin/controller.js';
import { Logger } from './services/Logger.js';

const QuantumSystem = {
    init() {
        this.setupHub();
        this.setupNavigation();
        Logger.info("Sistema Quantum: Orquestrador Ativado.");
    },

    // Gerencia a abertura e fechamento do HUB de Luxo
    setupHub() {
        const btnHub = document.getElementById('btn-hub');
        const hubLayer = document.getElementById('hub-layer');
        const btnCloseHub = document.querySelector('.close-hub');

        if (btnHub && hubLayer) {
            btnHub.onclick = () => {
                hubLayer.classList.remove('hub-hidden');
                hubLayer.classList.add('hub-visible');
            };
        }

        if (btnCloseHub && hubLayer) {
            btnCloseHub.onclick = () => {
                hubLayer.classList.add('hub-hidden');
                hubLayer.classList.remove('hub-visible');
            };
        }
    },

    // Configura os cliques na barra de navegação (Os ícones que você mandou na imagem)
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Captura o destino pelo atributo data-universe ou pelo ID do elemento
                const target = item.getAttribute('data-universe') || item.id.replace('nav-', '');
                this.switchUniverse(target);
            });
        });
    },

    // A "Chave Mestra" que troca as telas (Universos)
    switchUniverse(universeId) {
        const navItems = document.querySelectorAll('.nav-item');
        const display = document.getElementById('universe-display');

        if (!display) {
            Logger.error("Display de universo não encontrado.");
            return;
        }

        // 1. Feedback Visual dos Ícones (Ativo/Inativo)
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-universe') === universeId) {
                item.classList.add('active');
            }
        });

        // 2. Lógica de Troca Dinâmica
        Logger.info(`Navegando para: ${universeId.toUpperCase()}`);

        switch(universeId) {
            case 'home':
            case 'feed':
                // Chama o controlador da Casinha (Origin)
                OriginController.init(); 
                break;
            
            case 'friends':
                // Espaço para o NexusController (Lista de Diego, Michelle, etc.)
                display.innerHTML = `<div class="universe-empty"><span>CONEXÕES EM REDE</span></div>`;
                break;

            case 'reels': 
            case 'market': 
            case 'notify':
            case 'profile':
                // Placeholder genérico para carregamento
                display.innerHTML = `
                    <div class="module-loading" style="display: flex; height: 100%; align-items: center; justify-content: center;">
                        <span style="letter-spacing: 5px; opacity: 0.3; text-transform: uppercase;">
                            CARREGANDO ${universeId}...
                        </span>
                    </div>`;
                break;
            
            default:
                Logger.info("Universo desconhecido. Retornando ao fluxo base.");
                OriginController.init();
        }
    }
};

// Torna a função de troca acessível globalmente caso o HTML use 'onclick'
window.switchUniverse = (id) => QuantumSystem.switchUniverse(id);

// Inicia o orquestrador
document.addEventListener('DOMContentLoaded', () => QuantumSystem.init());

export { QuantumSystem };
