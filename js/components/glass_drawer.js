// OIO ONE - Camada de Interação Multimídia
import { createBubble } from './chatBubble.js';
import { createAudioBubble } from './audioMessage.js';
import { createPhotoBubble } from './photoMessage.js';
import { Database } from '../services/database.js';

export function initDrawer() {
    const container = document.getElementById('interaction-layer');
    if (!container) return;

    container.innerHTML = `
        <div id="vibe-drawer" class="glass-container">
            <div class="drag-handle"></div>
            
            <div id="chat-display" style="flex: 1; width: 100%; overflow-y: auto; padding: 15px; display: flex; flex-direction: column;">
                </div>

            <div class="input-area" style="width: 100%; padding: 15px; display: flex; align-items: center; gap: 12px; background: rgba(0,0,0,0.4);">
                <button id="photo-btn" title="Enviar Foto" style="background: none; border: none; font-size: 1.4rem; cursor: pointer;">📸</button>
                <button id="audio-btn" title="Gravar Áudio" style="background: none; border: none; font-size: 1.4rem; cursor: pointer;">🎙️</button>
                <button id="post-btn" title="Postar Vídeo" style="background: none; border: none; font-size: 1.4rem; cursor: pointer;">➕</button>
                
                <input type="text" id="chat-input" placeholder="Diga algo..." 
                    style="flex: 1; background: rgba(255,255,255,0.1); border: none; padding: 12px 18px; border-radius: 25px; color: #fff; outline: none; font-size: 16px;">
            </div>
        </div>
    `;

    const input = document.getElementById('chat-input');
    const display = document.getElementById('chat-display');
    const postBtn = document.getElementById('post-btn');
    const photoBtn = document.getElementById('photo-btn');
    const audioBtn = document.getElementById('audio-btn');

    // Simulação: Enviar Foto
    photoBtn.onclick = () => {
        const demoPhoto = "https://images.pexels.com/photos/3584437/pexels-photo-3584437.jpeg?auto=compress&cs=tinysrgb&w=400";
        display.appendChild(createPhotoBubble(demoPhoto, true));
        display.scrollTop = display.scrollHeight;
    };

    // Simulação: Enviar Áudio
    audioBtn.onclick = () => {
        display.appendChild(createAudioBubble(null, true));
        display.scrollTop = display.scrollHeight;
    };

    // Simulação: Postar Vídeo (1 posta, todos veem)
    postBtn.onclick = () => {
        display.appendChild(createBubble("📹 Processando Snippet de 1 min...", false));
        setTimeout(() => {
            display.appendChild(createBubble("✅ Vídeo publicado no feed global!", false));
            Database.sendPost("Autor", "url_video");
        }, 1500);
    };

    // Mensagens de texto
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            display.appendChild(createBubble(input.value.trim(), true));
            input.value = '';
            display.scrollTop = display.scrollHeight;
        }
    });

    // Lógica de Arrasto (Ergonomia Dinâmica)
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
