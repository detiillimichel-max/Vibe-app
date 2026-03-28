// OIO ONE - Componente de Áudio (Reprodutor Simples)
// Este componente cria a interface para mensagens de áudio.

export function createAudioBubble(audioUrl, isUser = true) {
    const bubble = document.createElement('div');
    
    // Estilização base da bolha
    Object.assign(bubble.style, {
        padding: '12px 16px',
        margin: '8px 0',
        borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
        backgroundColor: isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        maxWidth: '80%',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'bubbleFade 0.4s ease-out forwards'
    });

    // Conteúdo: Ícone de Play e Barra de Progresso
    bubble.innerHTML = `
        <button class="audio-play-btn" style="background: none; border: none; color: #fff; cursor: pointer; font-size: 1.2rem;">▶️</button>
        <div class="audio-progress" style="flex: 1; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; position: relative;">
            <div class="audio-bar" style="width: 0%; height: 100%; background: #fff; border-radius: 2px;"></div>
        </div>
        <span class="audio-time" style="font-size: 0.8rem; opacity: 0.6;">0:00</span>
    `;

    // Lógica simples de reprodução (Simulada por enquanto)
    const playBtn = bubble.querySelector('.audio-play-btn');
    const progressBar = bubble.querySelector('.audio-bar');
    const timeDisplay = bubble.querySelector('.audio-time');
    let isPlaying = false;
    let duration = 15; // Simulação de 15 segundos de áudio

    playBtn.onclick = () => {
        isPlaying = !isPlaying;
        playBtn.innerText = isPlaying ? '⏸️' : '▶️';
        
        if (isPlaying) {
            let progress = 0;
            const interval = setInterval(() => {
                if (!isPlaying || progress >= duration) {
                    clearInterval(interval);
                    if (progress >= duration) {
                        isPlaying = false;
                        playBtn.innerText = '▶️';
                        progressBar.style.width = '0%';
                        timeDisplay.innerText = '0:00';
                    }
                    return;
                }
                progress += 0.1;
                progressBar.style.width = `${(progress / duration) * 100}%`;
                const seconds = Math.floor(progress % 60);
                timeDisplay.innerText = `0:${seconds < 10 ? '0' : ''}${seconds}`;
            }, 100);
        }
    };

    return bubble;
}
