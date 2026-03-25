// OIO ONE - Camada de Interface Unificada (Padrão Elite)
import { createBubble } from './chatBubble.js';
import { createAudioBubble } from './audioMessage.js';
import { createPhotoBubble } from './photoMessage.js';
import { Sound } from '../services/sound.js';

export function initUI() {
    const container = document.getElementById('interaction-layer');
    if (!container) return;

    // Ícones em SVG Minimalistas (Gemini/Apple Style)
    const icons = {
        plus: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
        hub: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/></svg>`,
        mic: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>`,
        send: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`
    };

    container.innerHTML = `
        <div id="chat-display"></div>
        
        <div class="unified-input-bar">
            <div class="user-avatar-small" id="identity-btn">M</div>
            
            <input type="text" id="chat-input" placeholder="Sua vibe...">
            
            <div class="icon-actions">
                <button class="icon-btn" id="upload-btn" title="Subir Galeria">${icons.plus}</button>
                <button class="icon-btn" id="hub-btn" title="Hub de Jogos">${icons.hub}</button>
                <button class="icon-btn" id="audio-btn" title="Gravar Áudio">${icons.mic}</button>
                <button class="icon-btn" id="send-btn" title="Enviar">${icons.send}</button>
            </div>
        </div>
    `;

    const input = document.getElementById('chat-input');
    const display = document.getElementById('chat-display');

    const addMessage = (text, isUser = true) => {
        Sound.playTick();
        const bubble = createBubble(text, isUser);
        display.appendChild(bubble);
        display.scrollTop = display.scrollHeight;
    };

    // --- LÓGICA DO MICHEL ---

    // + (Upload Galeria)
    document.getElementById('upload-btn').onclick = () => {
        addMessage("📂 Acessando Galeria para subir vídeo no Feed...", false);
    };

    // = (Hub de Jogos / Universos)
    document.getElementById('hub-btn').onclick = () => {
        addMessage("🪐 Abrindo Hub de Jogos e Novos Universos...", false);
    };

    // Microfone (Áudio)
    document.getElementById('audio-btn').onclick = () => {
        Sound.playTick();
        display.appendChild(createAudioBubble(null, true));
        display.scrollTop = display.scrollHeight;
    };

    // Aviãozinho (Envio)
    const handleSend = () => {
        if (input.value.trim() !== '') {
            addMessage(input.value.trim(), true);
            input.value = '';
        }
    };

    document.getElementById('send-btn').onclick = handleSend;
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
}
