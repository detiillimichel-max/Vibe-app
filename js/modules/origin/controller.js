/**
 * OIO ONE - ORIGIN CONTROLLER (O FACEBOOK)
 * Este cérebro desenha o Feed profissional com ícones customizados.
 */

export const OriginController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        // Injeta os ícones profissionais (FontAwesome)
        if (!document.getElementById('fa-icons')) {
            const link = document.createElement('link');
            link.id = 'fa-icons';
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            document.head.appendChild(link);
        }

        // Layout de Facebook Dark Profissional
        display.innerHTML = `
            <div class="fb-container" style="max-width: 680px; margin: 0 auto; padding: 10px; background:#111; color: #e4e6eb;">
                
                <!-- Barra de Postagem: No que você está pensando? -->
                <div class="fb-card" style="background:#242526; padding:12px 16px; border-radius:8px; margin-bottom:16px; border: 1px solid #3a3b3c;">
                    <div style="display:flex; gap:10px; align-items:center;">
                        <div style="width:40px; height:40px; border-radius:50%; background:#4e4f50; border: 1px solid #d4af37;"></div>
                        <input type="text" placeholder="No que você está pensando?" style="flex:1; background:#3a3b3c; border:none; border-radius:20px; padding:10px 15px; color:#b0b3b8; font-size:15px;">
                    </div>
                </div>

                <div id="fb-feed"></div>
            </div>
        `;

        this.loadFeed();
    },

    async loadFeed() {
        const feedArea = document.getElementById('fb-feed');
        if (!feedArea) return;

        try {
            const response = await fetch('data/origin-feed.json');
            if (!response.ok) throw new Error("Erro ao carregar o feed.");
            const data = await response.json();

            // Transforma seus dados em Posts de Facebook
            feedArea.innerHTML = data.ideas.map(post => `
                <div class="fb-post-card" style="background:#242526; border-radius:8px; margin-bottom:16px; border: 1px solid #3a3b3c; overflow:hidden;">
                    
                    <div style="padding:12px 16px; display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; border-radius:50%; background:#d4af37; color:#111; display:flex; align-items:center; justify-content:center; font-weight:bold;">${post.author[0]}</div>
                        <div>
                            <div style="font-weight:600; color:#e4e6eb;">${post.author}</div>
                            <div style="font-size:13px; color:#b0b3b8;">Agora mesmo • <i class="fas fa-globe-americas"></i></div>
                        </div>
                    </div>

                    <div style="padding:4px 16px 16px 16px; color:#e4e6eb; font-size:15px; line-height:1.5;">
                        ${post.content}
                    </div>

                    <!-- Botões de Ação Profissionais -->
                    <div style="padding:4px 12px; border-top: 1px solid #3a3b3c; display:flex; justify-content:space-around; color:#b0b3b8; font-weight:600; font-size:14px; background:#1c1d1e;">
                        
                        <div style="cursor:pointer; display:flex; align-items:center; gap:8px; padding:10px; flex:1; justify-content:center;">
                            <i class="far fa-thumbs-up"></i> Curtir
                        </div>
                        
                        <div style="cursor:pointer; display:flex; align-items:center; gap:8px; padding:10px; flex:1; justify-content:center;">
                            <i class="far fa-comment-alt"></i> Comentar
                        </div>
                        
                        <div style="cursor:pointer; display:flex; align-items:center; gap:8px; padding:10px; flex:1; justify-content:center;">
                            <i class="fas fa-share"></i> Partilhar
                        </div>
                        
                    </div>
                </div>
            `).join('');

        } catch (error) {
            feedArea.innerHTML = "<p style='text-align:center; color:gray; padding:20px;'>Erro ao carregar.</p>";
        }
    }
};
