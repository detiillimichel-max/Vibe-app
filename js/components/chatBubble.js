// OIO ONE - Componente de Interface: Bolhas de Chat
// Responsável por renderizar mensagens dinâmicas sobre o feed

export function createBubble(text, type = 'user') {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${type}`;
    bubble.innerHTML = `<p>${text}</p>`;
    
    // Efeito de entrada suave
    bubble.style.opacity = '0';
    bubble.style.transform = 'translateY(10px)';
    
    return bubble;
}
