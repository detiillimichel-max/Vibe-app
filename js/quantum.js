/**
 * OIO ONE - SISTEMA QUANTUM (ORQUESTRADOR DE NAVEGAÇÃO)
 * Gerencia a troca de camadas e a ativação de módulos dinâmicos.
 * Regra: Integração total sem costura. Processamento por IDs.
 */

import { OriginController } from './modules/origin/controller.js';
import { ProfileController } from './modules/profile/controller.js';
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

    // Configura os cliques na barra de navegação profissional
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const target = item.getAttribute('data-universe') || item.id.replace('nav-', '');
                this.switchUniverse(target);
            });
        });
    },

    // Orquestrador de Telas (Universos)
    switchUniverse(universeId) {
        const navItems = document.querySelectorAll('.nav-item');
        const display = document.getElementById('universe-display');

        if (!display) {
            Logger.error("Display de universo não encontrado.");
            return;
        }

        // 1. Feedback Visual dos Ícones
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-universe') === universeId) {
                item.classList.add('active');
            }
        });

        // 2. Lógica de Execução de Módulos
        Logger.info(`Transição Quantum: ${universeId.toUpperCase()}`);

        switch(universeId) {
            case 'home':
            case 'feed':
                // Carrega a Casinha (Origin)
                OriginController.init(); 
                break;
            
            case 'profile':
                // Carrega o Perfil Real (Michel Detilli / Atividades)
                ProfileController.init();
                break;

            case 'friends':
                display.innerHTML = `<div class="vibe-module-placeholder">REDE DE CONEXÕES</div>`;
                break;

            case 'reels': 
            case 'market': 
            case 'notify':
                display.innerHTML = `
                    <div class="module-loading" style="display: flex; height: 100%; align-items: center; justify-content: center;">
                        <span style="letter-spacing: 5px; opacity: 0.3; text-transform: uppercase;">
                            ACESSO AO MÓDULO ${universeId}
                        </span>
                    </div>`;
                break;
            
            default:
                OriginController.init();
        }
    }
};

// Exposição global para chamadas via HTML
window.switchUniverse = (id) => QuantumSystem.switchUniverse(id);

// Inicialização automática
document.addEventListener('DOMContentLoaded', () => QuantumSystem.init());

export { QuantumSystem };
