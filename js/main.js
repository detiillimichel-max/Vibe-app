// OIO ONE - O Maestro (Arquitetura Central)
// Este arquivo coordena a Interface Orgânica por Profundidade

import { initDrawer } from './components/glass_drawer.js';
import { Storage } from './services/storage.js';

const App = {
    init() {
        this.renderBase();
        initDrawer();
        this.setupQuantumLeap();
    },

    renderBase() {
        const appElement = document.getElementById('app');
        
        // Link direto de vídeo abstrato (Estilo Premium)
        const videoUrl = "https://v1.pexels.com/video-files/2813583/2813583-uhd_2560_1440_30fps.mp4";

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
                    <div class="leap-dot" data-target="identity"></div>
                    <div class="leap-dot active" data-target="feed"></div>
                    <div class="leap-dot" data-target="modules"></div>
                </nav>
            </div>
        `;
    },

    setupQuantumLeap() {
        const dots = document.querySelectorAll('.leap-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');

                const target = dot.getAttribute('data-target');
                const drawerElement = document.getElementById('vibe-drawer');

                if (target === 'identity') {
                    drawerElement.style.height = '55vh'; 
                } else if (target === 'feed') {
                    drawerElement.style.height = '30vh';
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
