// OIO ONE - Identidade Flutuante e Módulos
import { initDrawing } from '../modules/drawing.js';

export function initDrawer() {
    const container = document.getElementById('interaction-layer');
    if (!container) return;

    container.innerHTML = `
        <div id="vibe-drawer" style="position:fixed; bottom:0; width:100%; height:30vh; transition: 0.4s;">
            <div class="drag-handle" style="width:40px; height:4px; background:rgba(255,255,255,0.2); margin:10px auto; border-radius:10px;"></div>
            
            <div class="identity-pill">
                <div class="profile-circle">
                    <img src="https://via.placeholder.com/45" style="width:100%; border-radius:50%;">
                </div>
                <div>
                    <h2 style="font-size: 1rem; letter-spacing: 1px;">MICHEL</h2>
                    <p style="font-size: 0.6rem; opacity: 0.5;">IDENTITY LAYER</p>
                </div>
                <div style="margin-left: 20px; opacity: 0.5;">⋮</div>
            </div>

            <div class="contact-stack">
                <div class="contact-dot"></div>
                <div class="contact-dot"></div>
                <div class="contact-dot"></div>
                <button style="background:none; border:none; color:#fff; font-size:20px;">+</button>
            </div>
        </div>
    `;

    // Inicia o desenho na camada superior
    initDrawing();
}
