import { supabase } from '../../core.js';

export const OriginController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        // Criamos a interface com campos para Nome e Foto (Avatar)
        display.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; padding: 15px; padding-bottom: 80px; font-family: sans-serif;">
                
                <h2 style="color: white; margin-bottom: 20px; font-size: 22px;">🏠 Universo OIO</h2>

                <!-- BOX DE CRIAÇÃO DE POST (COM NOME E FOTO) -->
                <div style="background: #242526; padding: 20px; border-radius: 15px; border: 1px solid #333; margin-bottom: 25px; display: flex; flex-direction: column; gap: 15px;">
                    
                    <div style="display: flex; gap: 10px;">
                        <!-- CAMPO PARA O NOME -->
                        <input id="user-name-input" type="text" placeholder="Seu Nome..." 
                            style="flex: 1; background: #3a3b3c; border: 1px solid #444; padding: 10px; border-radius: 8px; color: #fff; outline: none;">
                        
                        <!-- CAMPO PARA O LINK DA FOTO -->
                        <input id="user-avatar-input" type="text" placeholder="Link da sua Foto (URL)..." 
                            style="flex: 2; background: #3a3b3c; border: 1px solid #444; padding: 10px; border-radius: 8px; color: #fff; outline: none;">
                    </div>

                    <!-- CAMPO DA MENSAGEM -->
                    <textarea id="post-content-input" placeholder="No que você está pensando?" 
                        style="width: 100%; height: 80px; background: #1c1e21; border: none; padding: 12px; border-radius: 8px; color: #fff; outline: none; resize: none;"></textarea>

                    <div style="display: flex; justify-content: flex-end;">
                        <button id="btn-postar-origin" style="background: #e67e22; color: white; border: none; padding: 10px 30px; border-radius: 20px; font-weight: bold; cursor: pointer;">
                            Postar no Feed
                        </button>
                    </div>
                </div>

                <!-- CONTAINER ONDE APARECEM OS POSTS -->
                <div id="feed-origin" style="display: flex; flex-direction: column; gap: 15px;">
                    <p style="text-align: center; color: #666;">Carregando o Universo OIO...</p>
                </div>
            </div>
        `;

        this.setupPostLogic();
        this.loadFeed();
    },

    setupPostLogic() {
        const btn = document.getElementById('btn-postar-origin');
        
        btn.onclick = async () => {
            const nome = document.getElementById('user-name-input').value.trim();
            const foto = document.getElementById('user-avatar-input').value.trim();
            const texto = document.getElementById('post-content-input').value.trim();

            if (!nome || !texto) {
                alert("Por favor, preencha pelo menos seu nome e a mensagem! 💎");
                return;
            }

            btn.disabled = true;
            btn.innerText = "Enviando...";

            // SALVANDO NO SUPABASE
            const { error } = await supabase
                .from('posts')
                .insert([{ 
                    author: nome, 
                    content: texto, 
                    avatar_url: foto || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' // Foto padrão se não colocar nada
                }]);

            if (error) {
                alert("Erro ao postar: " + error.message);
            } else {
                document.getElementById('post-content-input').value = "";
                this.loadFeed(); // Recarrega o feed na hora
            }

            btn.disabled = false;
            btn.innerText = "Postar no Feed";
        };
    },

    async loadFeed() {
        const feedContainer = document.getElementById('feed-origin');
        
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            feedContainer.innerHTML = '<p style="color: red;">Erro ao carregar o feed.</p>';
            return;
        }

        feedContainer.innerHTML = posts.map(post => `
            <div style="background: #1c1e21; padding: 15px; border-radius: 12px; border: 1px solid #333; animation: fadeIn 0.4s ease;">
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                    <img src="${post.avatar_url}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid #e67e22;">
                    <div>
                        <div style="font-weight: bold; color: #fff;">${post.author}</div>
                        <div style="font-size: 10px; color: #888;">Postado agora</div>
                    </div>
                </div>
                <div style="color: #ccc; font-size: 15px; line-height: 1.4;">
                    ${post.content}
                </div>
            </div>
        `).join('');
    }
};
