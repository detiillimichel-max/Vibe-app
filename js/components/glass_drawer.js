import { initDrawing } from '../modules/drawing.js';
import { Sound } from '../services/sound.js';

export function initDrawer() {
    const container = document.getElementById('interaction-layer');
    if (!container) return;

    container.innerHTML = `
        <div id="vibe-drawer" style="position:fixed; bottom:0; width:100%; height:30vh; z-index:100;">
            <div class="drag-handle" style="width:40px; height:4px; background:rgba(255,255,255,0.2); margin:10px auto; border-radius:10px;"></div>
            
            <div class="identity-pill" id="main-pill">
                <div class="profile-circle" style="display:flex; align-items:center; justify-content:center; background:#27272a; color:#fff; font-weight:bold;">
                    M
                </div>
                <div>
                    <h2 style="font-size: 0.9rem; letter-spacing: 1px; margin:0;">MICHEL</h2>
                    <p style="font-size: 0.5rem; opacity: 0.5; margin:0; text-transform: uppercase;">Identity Layer</p>
                </div>
                <div style="margin-left: 20px; opacity: 0.4;">⋮</div>
            </div>

            <div class="contact-stack">
                <div class="contact-dot" data-name="Daniel"></div>
                <div class="contact-dot" data-name="Gaby"></div>
                <div class="contact-dot" data-name="Rafael"></div>
                <button id="add-contact" style="background:none; border:none; color:rgba(255,255,255,0.5); font-size:20px; cursor:pointer;">+</button>
            </div>
        </div>
    `;

    // Ativa sons nos cliques
    document.querySelectorAll('.contact-dot, #main-pill, #add-contact').forEach(el => {
        el.onclick = () => Sound.playTick();
    });

    initDrawing();
}
