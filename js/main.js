// OIO ONE - O Maestro (Arquitetura Central)
import { initDrawer } from './components/glass_drawer.js';

const App = {
    init() {
        this.renderBase();
        initDrawer();
        this.setupQuantumLeap();
    },

    renderBase() {
        const appElement = document.getElementById('app');
        // Vídeo Profissional de Fundo (Abstrato Dark)
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
                    drawerElement.style.height = '55vh'; // Salto para cima
                } else if (target === 'feed') {
                    drawerElement.style.height = '30vh'; // Salto para o padrão
                } else {
                    console.log("Acesso a Módulos Externos");
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
