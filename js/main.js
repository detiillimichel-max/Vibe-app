// OIO ONE - O Maestro (Arquitetura Central)
// Este arquivo coordena a Interface Orgânica por Profundidade
// CORREÇÃO: Restaurando o vídeo de fundo e mantendo o canvas de desenho.

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
        
        // Link direto de vídeo abstrato (Estilo Premium)
        const videoUrl = "https://v1.pexels.com/video-files/2813583/2813583-uhd_2560_1440_30fps.mp4";

        appElement.innerHTML = `
            <div class="vibe-container" style="position:relative; width:100%; height:100vh; overflow:hidden;">
                <section id="feed-container" class="video-feed" style="height:70vh; position:relative; overflow:hidden;">
                    
                    <video autoplay muted loop playsinline class="bg-video" style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:1;">
                        <source src="${videoUrl}" type="video/mp4">
                    </video>
                    
                    <div class="video-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 50%, rgba(0,0,0,0.8) 100%); pointer-events:none; z-index:2;"></div>

                    <canvas id="drawing-canvas" style="position:absolute; top:0; left:0; width:100%; height:100%; cursor:crosshair; z-index:5;"></canvas>
                
                </section>

                <div id="interaction-layer"></div>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
