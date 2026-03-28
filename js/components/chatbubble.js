// OIO ONE - Componente: Bolha de Chat Profissional
// Design: Bordas arredondadas e transparência sutil

export function createBubble(text, isUser = true) {
    const bubble = document.createElement('div');
    
    // Estilização dinâmica via JS para manter o design limpo
    Object.assign(bubble.style, {
        padding: '12px 16px',
        margin: '8px 0',
        borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
        backgroundColor: isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        maxWidth: '80%',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '0.9rem',
        animation: 'bubbleFade 0.4s ease-out forwards'
    });

    bubble.innerHTML = `<p style="color: #fff; margin: 0;">${text}</p>`;
    return bubble;
}
