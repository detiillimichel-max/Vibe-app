// OIO ORIGIN - FEED DINÂMICO 💎
export const OriginController = {
    init: async () => {
        const display = document.getElementById('universe-display');
        
        // Pega os dados do usuário que salvamos no login
        const userName = localStorage.getItem('oio_user_name') || 'Explorador';
        const userAvatar = localStorage.getItem('oio_user_avatar') || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

        display.innerHTML = `
            <div style="padding: 15px; max-width: 600px; margin: 0 auto;">
                
                <!-- CARD DE PERFIL -->
                <div style="background: #1c1e21; padding: 15px; border-radius: 15px; display: flex; align-items: center; margin-bottom: 20px; border: 1px solid #333;">
                    <img src="${userAvatar}" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #1877f2; margin-right: 15px;">
                    <div>
                        <div style="font-weight: bold; font-size: 18px;">${userName}</div>
                        <div style="color: #1877f2; font-size: 10px; font-weight: bold; letter-spacing: 1px;">OIO VERIFIED</div>
                    </div>
                </div>

                <!-- CAMPO DE POSTAGEM -->
                <div style="background: #1c1e21; padding: 20px; border-radius: 15px; border: 1px solid #333; margin-bottom: 20px;">
                    <textarea id="post-text" placeholder="O que há de novo, ${userName.split(' ')[0]}?" 
                        style="width: 100%; background: transparent; border: none; color: white; font-size: 18px; outline: none; resize: none; min-height: 80px;"></textarea>
                    <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
                        <button id="btn-postar" style="background: #1877f2; color: white; border: none; padding: 10px 30px; border-radius: 20px; font-weight: bold; cursor: pointer;">Postar</button>
                    </div>
                </div>

                <!-- ÁREA DOS POSTS -->
                <div id="feed-container"></div>
            </div>
        `;

        // Lógica do Botão Postar
        const btn = document.getElementById('btn-postar');
        const text = document.getElementById('post-text');

        btn.onclick = async () => {
            const conteudo = text.value.trim();
            if (!conteudo) return;

            btn.innerText = "...";
            btn.disabled = true;

            // GRAVA NO SUPABASE
            const { error } = await window.supabase
                .from('posts')
                .insert([{ 
                    author_name: userName, 
                    author_avatar: userAvatar, 
                    content: conteudo 
                }]);

            if (!error) {
                text.value = "";
                btn.innerText = "Postar";
                btn.disabled = false;
                OriginController.loadPosts(); // Recarrega o feed
            }
        };

        OriginController.loadPosts();
    },

    loadPosts: async () => {
        const feed = document.getElementById('feed-container');
        
        // BUSCA OS POSTS NO BANCO
        const { data: posts, error } = await window.supabase
            .from('posts')
            .select('*')
            .order('id', { ascending: false });

        if (posts) {
            feed.innerHTML = posts.map(p => `
                <div style="background: #1c1e21; padding: 15px; border-radius: 15px; margin-bottom: 15px; border: 1px solid #333;">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <img src="${p.author_avatar}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                        <div>
                            <div style="font-weight: bold; font-size: 14px;">${p.author_name}</div>
                            <div style="color: #1877f2; font-size: 9px; font-weight: bold;">OIO VERIFIED</div>
                        </div>
                    </div>
                    <div style="font-size: 15px; line-height: 1.5; color: #e4e6eb;">${p.content}</div>
                </div>
            `).join('');
        }
    }
};
