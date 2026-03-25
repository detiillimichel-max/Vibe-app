// OIO ONE - Camada de Interação e Identidade Dinâmica
import { createBubble } from './chatBubble.js';
import { Storage } from '../services/storage.js';

export function initDrawer() {
    const container = document.getElementById('interaction-layer');
    if (!container) return;

    // Recupera o nome guardado ou usa o padrão da Identidade
    const savedName = Storage.get('user_name') || 'IDENTIDADE';

    container.innerHTML = `
        <div id="vibe-drawer" class="glass-container">
            <div class="drag-handle"></div>
            
            <div id="chat-display" style="flex: 1; width: 100%; overflow-y: auto; padding: 10px; display: flex; flex-direction: column;">
                <div class="drawer-content">
                    <p id="display-name" style="text-transform: uppercase;">${savedName}</p>
                    <div class="status-dot"></div>
                </div>
            </div>

            <div class="input-area" style="width: 100%; padding: 15px; background: rgba(0,0,0,0.2);">
                <input type="text" id="chat-input" placeholder="Define o teu nome ou envia uma mensagem..." 
                    style="width: 100%; background: rgba(255,255,255,0.1); border: none; padding: 12px; border-radius: 25px; color: #fff; outline: none; font-size: 16px;">
            </div>
        </div>
    `;

    const input = document.getElementById('chat-input');
    const display = document.getElementById('chat-display');
    const nameLabel = document.getElementById('display-name');

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            const val = input.value.trim();

            // Lógica de Identidade: Se for a primeira interação ou um comando, guarda o nome
            if (nameLabel.innerText === 'IDENTIDADE') {
                Storage.save('user_name', val);
                nameLabel.innerText = val.toUpperCase();
                display.appendChild(createBubble(`Prazer, ${val}! O teu nome foi guardado na memória.`, false));
            } else {
                display.appendChild(createBubble(val, true));
            }

            input.value = '';
            display.scrollTop = display.scrollHeight;
        }
    });

    // Ergonomia Dinâmica: Lógica de Arrasto
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
