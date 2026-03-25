// O Maestro - Responsável por orquestrar a interface do Vibe App
import { initDrawer } from './components/glass_drawer.js';

const App = {
    init() {
        console.log("Vibe App: Sistema Iniciado...");
        this.renderBase();
        
        // Inicia a Ergonomia Dinâmica (Gaveta de Vidro)
        initDrawer();
    },

    renderBase() {
        const appElement = document.getElementById('app');
        
        // Aqui montamos a Camada de Identidade (Base) 
        // O DNA do OIO ONE: Interface Orgânica por Profundidade
        appElement.innerHTML = `
            <main class="vibe-container">
                <section id="feed-container" class="video-feed">
                    <div class="placeholder-content">Feed de Vídeo Infinito</div>
                </section>

                <div id="interaction-layer"></div>
            </main>
        `;
    }
};

// Dispara o app assim que a página carregar
window.addEventListener('DOMContentLoaded', () => App.init());
