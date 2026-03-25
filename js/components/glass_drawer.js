// OIO ONE - Camada de Interação e Identidade
import { createBubble } from './chatBubble.js';
import { Storage } from '../services/storage.js';

export function initDrawer() {
    const container = document.getElementById('interaction-layer');
    if (!container) return;

    const savedName = Storage.get('user_name') || 'IDENTIDADE';

    container.innerHTML = `
        <div id="vibe-drawer" class="glass-container">
            <div class="drag-handle"></div>
            
            <div id="chat-display" style="flex: 1; width: 100%; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; align-items: center;">
                <div class="drawer-content">
                    <div class="profile-photo" style="width: 70px; height: 70px; border-radius: 50%; background: #222; margin: 0 auto 15px; border: 2px solid rgba(255,255,255,0.1); overflow: hidden;">
                        <img src="https://via.placeholder.com/70/333/fff?text=M" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <p id="display-name" style="text-transform: uppercase; letter-spacing: -0.05em; font-weight: 800;">${savedName}</p>
                    <div class="status-dot"></div>
                </div>
            </div>

            <div class="input-area" style="width: 100%; padding: 20px; background: rgba(0,0,0,0.3);">
                <input type="text" id="chat-input" placeholder="Mensagem..." 
                    style="width: 100%; background: rgba(255,255,255,0.1); border: none; padding: 14px; border-radius: 25px; color: #fff; outline: none; font-size: 16px;">
            </div>
        </div>
    `;

    const input = document.getElementById('chat-input');
    const display = document.getElementById('chat-display');

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            display.appendChild(createBubble(input.value.trim(), true));
            input.value = '';
            display.scrollTop = display.scrollHeight;
        }
    });

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
