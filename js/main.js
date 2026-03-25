// OIO ONE - O Maestro (Arquitetura Central)
// Este arquivo coordena a Interface Orgânica por Profundidade

import { initDrawer } from './components/glass_drawer.js';
import { Storage } from './services/storage.js';

const App = {
    // Inicialização do Sistema
    init() {
        console.log("Vibe App: Sistema OIO ONE Iniciado.");
        this.renderBase();
        
        // Inicia a Ergonomia Dinâmica (Gesto de Arrasto)
        initDrawer();
        
        // Verifica se existe Identidade Salva
        const savedUser = Storage.get('user_identity');
        if (savedUser) {
            console.log("Usuário reconhecido:", savedUser.name);
        }
    },

    // Renderização da Base (DNA do Projeto: 70/30)
    renderBase() {
        const appElement = document.getElementById('app');
        
        appElement.innerHTML = `
            <div class="vibe-container">
                <section id="feed-container" class="video-feed">
                    <div class="placeholder-content">
                        <p>FEED DE VÍDEO INFINITO</p>
                    </div>
                </section>

                <div id="interaction-layer">
                    </div>

                <nav class="quantum-leap">
                    <div class="leap-dot active"></div>
                    <div class="leap-dot"></div>
                    <div class="leap-dot"></div>
                </nav>
            </div>
        `;
    }
};

// Dispara o motor assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => App.init());
