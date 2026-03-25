// OIO ONE - O Maestro (Arquitetura Central)
// Este arquivo coordena a Interface Orgânica por Profundidade

import { initDrawer } from './components/glass_drawer.js';
import { Storage } from './services/storage.js';

const App = {
    init() {
        console.log("Vibe App: Sistema OIO ONE Iniciado.");
        this.renderBase();
        initDrawer();
        
        const savedUser = Storage.get('user_name');
        if (savedUser) {
            console.log("Usuário reconhecido:", savedUser);
        }
    },

    renderBase() {
        const appElement = document.getElementById('app');
        
        // Link de vídeo exemplo (vibe dark profissional)
        const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-smoke-in-dark-background-3031-large.mp4";

        appElement.innerHTML = `
            <div class="vibe-container">
                <section id="feed-container" class="video-feed">
                    <video autoplay muted loop playsinline class="bg-video">
                        <source src="${videoUrl}" type="video/mp4">
                    </video>
                    <div class="video-overlay"></div>
                </section>

                <div id="interaction-layer"></div>

                <nav class="quantum-leap">
                    <div class="leap-dot active"></div>
                    <div class="leap-dot"></div>
                    <div class="leap-dot"></div>
                </nav>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
