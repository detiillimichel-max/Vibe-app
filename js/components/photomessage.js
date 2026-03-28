// OIO ONE - Componente de Imagem (Galeria/Foto)
// Design: Bordas suaves e efeito de profundidade orgânica

export function createPhotoBubble(imageUrl, isUser = true) {
    const bubble = document.createElement('div');
    
    // Estilização da Moldura de Vidro
    Object.assign(bubble.style, {
        padding: '6px',
        margin: '8px 0',
        borderRadius: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        maxWidth: '75%',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        overflow: 'hidden',
        animation: 'bubbleFade 0.5s ease-out forwards'
    });

    // A Imagem em si
    bubble.innerHTML = `
        <img src="${imageUrl}" 
             style="width: 100%; height: auto; border-radius: 20px; display: block; object-fit: cover; max-height: 300px;" 
             alt="Vibe Photo"
             onload="this.style.opacity='1'"
        >
    `;

    // Toque de mestre: clique para ampliar (simulação)
    bubble.onclick = () => {
        console.log("OIO ONE: Expandindo imagem para visualização completa...");
    };

    return bubble;
}
