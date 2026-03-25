// OIO ONE - Maestro Unificado
import { initUI } from './components/ui_layers.js';

const App = {
    init() {
        this.renderBase();
        initUI();
    },

    renderBase() {
        const appElement = document.getElementById('app');
        const videoUrl = "https://v1.pexels.com/video-files/2813583/2813583-uhd_2560_1440_30fps.mp4";

        appElement.innerHTML = `
            <div class="vibe-container">
                <section class="video-feed">
                    <video autoplay muted loop playsinline id="bg-video">
                        <source src="${videoUrl}" type="video/mp4">
                    </video>
                    <div class="video-overlay"></div>
                </section>

                <div id="interaction-layer"></div>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
