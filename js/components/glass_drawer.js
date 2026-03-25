// OIO ONE - Camada de Interação (Chat + Postagem Inteligente)
import { createBubble } from './chatBubble.js';
import { Database } from '../services/database.js';

export function initDrawer() {
    const container = document.getElementById('interaction-layer');
    if (!container) return;

    container.innerHTML = `
        <div id="vibe-drawer" class="glass-container">
            <div class="drag-handle"></div>
            
            <div id="chat-display" style="flex: 1; width: 100%; overflow-y: auto; padding: 10px; display: flex; flex-direction: column;">
                </div>

            <div class="input-area" style="width: 100%; padding: 15px; display: flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.3);">
                <button id="post-btn" style="background: none; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; width: 40px; height: 40px; color: #fff; font-size: 20px;">+</button>
                
                <input type="text" id="chat-input" placeholder="Diga algo..." 
                    style="flex: 1; background: rgba(255,255,255,0.1); border: none; padding: 12px; border-radius: 25px; color: #fff; outline: none;">
            </div>
        </div>
    `;

    const input = document.getElementById('chat-input');
    const display = document.getElementById('chat-display');
    const postBtn = document.getElementById('post-btn');

    // Lógica de Postagem (Simulando 1 posta, todos vêem)
    postBtn.onclick = () => {
        const videoDuration = 6; // Simulando um vídeo de 6 minutos
        display.appendChild(createBubble(`📹 Processando vídeo de ${videoDuration} min...`, false));
        
        setTimeout(() => {
            display.appendChild(createBubble(`✅ Snippet de 1 min criado! Publicado para todos os usuários.`, false));
            Database.sendPost("Michel", "url_do_video");
        }, 2000);
    };

    // Chat normal
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            display.appendChild(createBubble(input.value, true));
            input.value = '';
            display.scrollTop = display.scrollHeight;
        }
    });

    // Ergonomia Dinâmica (Arrasto)
    const drawer = document.getElementById('vibe-drawer');
    let startY = 0;
    drawer.ontouchstart = (e) => { startY = e.touches[0].clientY; drawer.style.transition = 'none'; };
    drawer.ontouchmove = (e) => {
        const deltaY = startY - e.touches[0].clientY;
        const h = 30 + (deltaY / window.innerHeight) * 100;
        if (h >= 30 && h <= 55) drawer.style.height = `${h}vh`;
    };
    drawer.ontouchend = () => {
        drawer.style.transition = 'height 0.3s ease';
        const currentH = parseFloat(drawer.style.height);
        drawer.style.height = currentH > 40 ? '55vh' : '30vh';
    };
}
