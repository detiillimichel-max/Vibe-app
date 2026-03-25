// OIO ONE - Interface Unificada
import { createBubble } from './chatBubble.js';
import { Sound } from '../services/sound.js';

export function initUI() {
    const container = document.getElementById('interaction-layer');
    if (!container) return;

    // Limpa qualquer resquício de interfaces antigas
    container.innerHTML = `
        <div id="chat-display"></div>
        
        <div class="unified-input-bar">
            <div class="user-avatar-small">M</div>
            
            <input type="text" id="chat-input" placeholder="Sua vibe...">
            
            <div class="icon-actions">
                <button class="icon-btn" id="photo-btn">📸</button>
                <button class="icon-btn" id="audio-btn">🎙️</button>
                <button class="icon-btn" id="post-btn">➕</button>
                <button class="icon-btn" id="like-btn">🤍</button>
            </div>
        </div>
    `;

    const input = document.getElementById('chat-input');
    const display = document.getElementById('chat-display');

    // Função para adicionar mensagem e tocar som
    const addMessage = (text, isUser = true) => {
        Sound.playTick();
        const bubble = createBubble(text, isUser);
        display.appendChild(bubble);
        display.scrollTop = display.scrollHeight;
    };

    // Eventos dos botões
    document.getElementById('photo-btn').onclick = () => addMessage("📸 Abrindo Galeria...", false);
    document.getElementById('audio-btn').onclick = () => addMessage("🎙️ Gravando áudio...", false);
    document.getElementById('post-btn').onclick = () => addMessage("➕ Preparando postagem...", false);
    document.getElementById('like-btn').onclick = () => addMessage("❤️ Você curtiu!", true);

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            addMessage(input.value.trim(), true);
            input.value = '';
        }
    });
}
