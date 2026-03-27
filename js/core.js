// JS/core.js
document.getElementById('btn-entrar').addEventListener('click', async () => {
    const user = document.getElementById('user-email').value;
    
    if(user.length > 2) {
        // 1. Troca de Camada
        document.getElementById('portal-layer').style.display = 'none';
        const appLayer = document.getElementById('app-layer');
        appLayer.classList.remove('hidden');
        appLayer.style.display = 'block';
        
        const display = document.getElementById('universe-display');
        display.innerHTML = `<p style="padding:20px; opacity:0.5;">Iniciando VIBE...</p>`;

        try {
            // 2. Leitura do arquivo que você mostrou na foto
            const response = await fetch('./data/origin-feed.json');
            const data = await response.json();
            
            // 3. Renderização do conteúdo (Diego, Michelle, etc)
            display.innerHTML = `
                <div style="padding: 25px;">
                    <h2 style="font-size:10px; letter-spacing:4px; margin-bottom:20px; opacity:0.5;">ORIGIN FEED</h2>
                    <div style="background:rgba(255,255,255,0.05); padding:20px; border-radius:15px; border:1px solid rgba(255,255,255,0.1);">
                        <p style="font-size:1.1rem; line-height:1.5;">${data.ideas[0].content}</p>
                        <hr style="margin:15px 0; border:0; border-top:1px solid rgba(255,255,255,0.1);">
                        <span style="font-size:12px; color:#007bff;">Sugerido: ${data.suggestions[0].name}</span>
                    </div>
                </div>
            `;
        } catch (error) {
            display.innerHTML = `<p style="padding:20px;">Erro ao carregar o feed. Verifique a pasta data.</p>`;
        }
    }
});
