// OIO ONE - Camada de Interação Multimídia (Versão Gemini Style)
import { createBubble } from './chatBubble.js';
import { createAudioBubble } from './audioMessage.js';
import { createPhotoBubble } from './photoMessage.js';

export function initDrawer() {
    const container = document.getElementById('interaction-layer');
    if (!container) return;

    // Ícones em SVG para o visual Gemini
    const icons = {
        camera: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
        mic: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
        plus: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
    };

    container.innerHTML = `
        <div id="vibe-drawer" class="glass-container">
            <div class="drag-handle"></div>
            
            <div id="chat-display" style="flex: 1; width: 100%; overflow-y: auto; padding: 15px; display: flex; flex-direction: column;">
                </div>

            <div class="input-area" style="width: 100%; padding: 12px 20px; display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.5);">
                <button id="photo-btn" class="gemini-icon-btn">${icons.camera}</button>
                <button id="audio-btn" class="gemini-icon-btn">${icons.mic}</button>
                <button id="post-btn" class="gemini-icon-btn">${icons.plus}</button>
                
                <input type="text" id="chat-input" placeholder="Sua vibe..." 
                    style="flex: 1; background: rgba(255,255,255,0.08); border: none; padding: 10px 18px; border-radius: 20px; color: #fff; outline: none; font-size: 16px;">
            </div>
        </div>
    `;

    // Lógica de botões (Mantida a mesma do passo anterior)
    const photoBtn = document.getElementById('photo-btn');
    const audioBtn = document.getElementById('audio-btn');
    const display = document.getElementById('chat-display');

    photoBtn.onclick = () => {
        display.appendChild(createPhotoBubble("https://images.pexels.com/photos/3584437/pexels-photo-3584437.jpeg?auto=compress&cs=tinysrgb&w=400", true));
        display.scrollTop = display.scrollHeight;
    };

    audioBtn.onclick = () => {
        display.appendChild(createAudioBubble(null, true));
        display.scrollTop = display.scrollHeight;
    };

    // Lógica de arrasto profissional
    const drawer = document.getElementById('vibe-drawer');
    let startY = 0;
    drawer.ontouchstart = (e) => { startY = e.touches[0].clientY; drawer.style.transition = 'none'; };
    drawer.ontouchmove = (e) => {
        const deltaY = startY - e.touches[0].clientY;
        const h = 30 + (deltaY / window.innerHeight) * 100;
        if (h >= 30 && h <= 55) drawer.style.height = `${h}vh`;
    };
    drawer.ontouchend = () => {
        drawer.style.transition = 'height 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        const currentH = parseFloat(drawer.style.height);
        drawer.style.height = currentH > 40 ? '55vh' : '30vh';
    };
}
