// OIO ONE - Camada de Interação (Gaveta + Chat)
import { createBubble } from './chatBubble.js';

export function initDrawer() {
    const container = document.getElementById('interaction-layer');
    if (!container) return;

    container.innerHTML = `
        <div id="vibe-drawer" class="glass-container">
            <div class="drag-handle"></div>
            
            <div id="chat-display" style="flex: 1; width: 100%; overflow-y: auto; padding: 10px; display: flex; flex-direction: column;">
                <div class="drawer-content">
                    <p>MICHEL</p>
                    <div class="status-dot"></div>
                </div>
                </div>

            <div class="input-area" style="width: 100%; padding: 15px; background: rgba(0,0,0,0.2);">
                <input type="text" id="chat-input" placeholder="Diga algo..." 
                    style="width: 100%; background: rgba(255,255,255,0.1); border: none; padding: 12px; border-radius: 25px; color: #fff; outline: none;">
            </div>
        </div>
    `;

    // Lógica de Envio
    const input = document.getElementById('chat-input');
    const display = document.getElementById('chat-display');

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            const bubble = createBubble(input.value);
            display.appendChild(bubble);
            input.value = '';
            display.scrollTop = display.scrollHeight;
        }
    });

    // Lógica de Arrasto (Mantida)
    const drawer = document.getElementById('vibe-drawer');
    let startY = 0;

    drawer.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        drawer.style.transition = 'none';
    });

    drawer.addEventListener('touchmove', (e) => {
        const deltaY = startY - e.touches[0].clientY;
        const h = 30 + (deltaY / window.innerHeight) * 100;
        if (h >= 30 && h <= 55) drawer.style.height = `${h}vh`;
    });

    drawer.addEventListener('touchend', () => {
        drawer.style.transition = 'height 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
        const currentH = parseFloat(drawer.style.height);
        drawer.style.height = currentH > 40 ? '55vh' : '30vh';
    });
}
