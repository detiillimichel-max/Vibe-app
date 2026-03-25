// OIO ONE - Camada de Interface Unificada (Gemini Style)
// CORREÇÃO: Removendo menus laterais e unificando o input no fundo.

import { createBubble } from './chatBubble.js';
import { createAudioBubble } from './audioMessage.js';
import { createPhotoBubble } from './photoMessage.js';
import { Sound } from '../services/sound.js';
import { Database } from '../services/database.js';

export function initUI() {
    const container = document.getElementById('interaction-layer');
    if (!container) return;

    // Estrutura Unificada: Avatar (Esq) | Input (Meio) | Ícones (Dir)
    container.innerHTML = `
        <div class="unified-input-bar">
            <div class="user-avatar-small" id="identity-btn">M</div>
            
            <input type="text" id="chat-input" placeholder="Sua vibe...">
            
            <div class="icon-actions">
                <button class="icon-btn" id="photo-btn" title="Enviar Foto">📸</button>
                <button class="icon-btn" id="audio-btn" title="Gravar Áudio">🎙️</button>
                <button class="icon-btn" id="post-btn" title="Postar Vídeo">➕</button>
                <button class="icon-btn" id="like-btn" title="Gostar">🤍</button>
            </div>
        </div>

        <div id="chat-display" style="position:fixed; bottom:80px; left:0; width:100%; max-height: 50vh; overflow-y:auto; padding:20px; display:flex; flex-direction:column-reverse; z-index:90; pointer-events:none;">
            </div>
    `;

    // Lógica e Sons (Selo de Qualidade)
    const input = document.getElementById('chat-input');
    const display = document.getElementById('chat-display');
    const photoBtn = document.getElementById('photo-btn');
    const audioBtn = document.getElementById('audio-btn');
    const postBtn = document.getElementById('post-btn');
    const likeBtn = document.getElementById('like-btn');
    const identityBtn = document.getElementById('identity-btn');

    // Sons e Feedback Visual
    document.querySelectorAll('.icon-btn, .user-avatar-small').forEach(el => {
        el.onclick = () => Sound.playTick();
    });

    // Ativando as Funções (Simulação Profissional)
    photoBtn.onclick = () => {
        Sound.playTick();
        const demoPhoto = "https://images.pexels.com/photos/3584437/pexels-photo-3584437.jpeg?auto=compress&cs=tinysrgb&w=400";
        const bubble = createPhotoBubble(demoPhoto, true);
        bubble.style.pointerEvents = 'auto'; // Reativa cliques na bolha
        display.prepend(bubble);
    };

    audioBtn.onclick = () => {
        Sound.playTick();
        const bubble = createAudioBubble(null, true);
        bubble.style.pointerEvents = 'auto'; // Reativa cliques na bolha
        display.prepend(bubble);
    };

    postBtn.onclick = () => {
        Sound.playTick();
        const bubble = createBubble("📹 Processando Snippet de 1 min...", false);
        display.prepend(bubble);
        setTimeout(() => {
            const confirmBubble = createBubble("✅ Vídeo publicado no feed global!", false);
            display.prepend(confirmBubble);
            Database.sendPost("Autor", "url_video");
        }, 1500);
    };

    likeBtn.onclick = () => {
        Sound.playTick();
        // Simulação de Like
        const bubble = createBubble("❤️ Você curtiu este vídeo!", true);
        display.prepend(bubble);
    };

    identityBtn.onclick = () => {
        Sound.playTick();
        // Futuro: Abrir Perfil do Usuário
        const bubble = createBubble("👤 Acessando sua Camada de Identidade...", false);
        display.prepend(bubble);
    };

    // Chat normal (Texto)
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            const bubble = createBubble(input.value.trim(), true);
            display.prepend(bubble);
            input.value = '';
            // Sem scroll.display.scrollTop = display.scrollHeight; pois estamos usando flex-direction: column-reverse;
        }
    });
}
