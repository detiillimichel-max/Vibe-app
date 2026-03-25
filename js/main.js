// OIO ONE - O Maestro (Arquitetura Central)
// Gerenciamento do Salto Quântico (Navegação por Pontos)

import { initDrawer } from './components/glass_drawer.js';

const App = {
    init() {
        this.renderBase();
        initDrawer();
        this.setupQuantumLeap();
    },

    renderBase() {
        const appElement = document.getElementById('app');
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
                    <div class="leap-dot" data-target="identity" title="Identidade"></div>
                    <div class="leap-dot active" data-target="feed" title="Feed"></div>
                    <div class="leap-dot" data-target="modules" title="Módulos"></div>
                </nav>
            </div>
        `;
    },

    setupQuantumLeap() {
        const dots = document.querySelectorAll('.leap-dot');
        const drawer = document.getElementById('vibe-drawer');

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                // Remove classe ativa de todos e coloca no clicado
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');

                const target = dot.getAttribute('data-target');
                const drawerElement = document.getElementById('vibe-drawer');

                // Lógica de Salto Quântico (Troca de profundidade)
                if (target === 'identity') {
                    drawerElement.style.height = '55vh'; // Salta para Identidade
                } else if (target === 'feed') {
                    drawerElement.style.height = '30vh'; // Salta para o Feed
                } else if (target === 'modules') {
                    // Placeholder para os novos apps
                    alert("Acessando Módulos de Acoplamento...");
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
