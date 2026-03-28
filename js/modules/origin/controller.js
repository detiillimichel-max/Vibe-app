/**
 * OIO ONE - ORIGIN CONTROLLER (HOME) 💎
 * Versão com correção de imagens e feed inteligente.
 */

const Identity = {
    get() {
        return {
            name: localStorage.getItem('oio_user_name') || "Michel Detilli",
            avatar: localStorage.getItem('oio_user_avatar') || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
        };
    }
};

export const OriginController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        display.innerHTML = ''; 
        const user = Identity.get();

        display.innerHTML = `
            <div id="origin-container" style="max-width: 600px; margin: 0 auto; padding: 15px; font-family: sans-serif;">
                
                <!-- HEADER DE IDENTIDADE -->
                <div style="display: flex; align-items: center; gap: 12px; padding: 15px; background: #242526; border-radius: 15px; margin-bottom: 20px; border: 1px solid #333;">
                    <img src="${user.avatar}" style="width: 45px; height: 45px; border-radius: 12px; object-fit: cover; border: 1px solid #e67e22;" onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'">
                    <div>
                        <div style="color: white; font-weight: bold; font-size: 16px;">${user.name}</div>
                        <div style="color: #e67e22; font-size: 10px; font-weight: 800; letter-spacing: 1px;">OIO VERIFIED</div>
                    </div>
                </div>

                <!-- DASHBOARD DE STATUS -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 25px;">
                    <div style="background: #1c1e21; padding: 12px; border-radius: 12px; border: 1px solid #333; text-align: center;">
                        <div style="color: #888; font-size: 9px; margin-bottom: 4px;">SISTEMA</div>
                        <div style="color: #2ecc71; font-weight: bold; font-size: 12px;">ONLINE</div>
                    </div>
                    <div style="background: #1c1e21; padding: 12px; border-radius: 12px; border: 1px solid #333; text-align: center;">
                        <div style="color: #888; font-size: 9px; margin-bottom: 4px;">CONEXÃO</div>
                        <div style="color: white; font-weight: bold; font-size: 12px;">SINCRONIZADA</div>
                    </div>
                </div>

                <!-- BOX DE POSTAGEM -->
                <div style="background: #242526; padding: 15px; border-radius: 15px; margin-bottom: 25px; border: 1px solid #333;">
                    <textarea id="origin-post-input" placeholder="O que há de novo, ${user.name.split(' ')[0]}?" 
                        style="width: 100%; background: transparent; border: none; color: #fff; outline: none; resize: none; font-size: 15px; height: 50px;"></textarea>
                    <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
                        <button id="btn-origin-post" style="background: #e67e22; color: white; border: none; padding: 8px 25px; border-radius: 20px; font-weight: bold; cursor: pointer;">Postar</button>
                    </div>
                </div>

                <!-- FEED DINÂMICO -->
                <div id="origin-feed" style="display: flex; flex-direction: column; gap: 15px;">
                    <p style="color: #666; text-align: center; font-size: 13px;">Buscando pulsações...</p>
                </div>
            </div>
        `;

        this.bindEvents();
        await this.loadPosts();
    },

    bindEvents() {
        const btn = document.getElementById('btn-origin-post');
        const input = document.getElementById('origin-post-input');

        btn.onclick = async () => {
            const user = Identity.get();
            const text = input.value.trim();
            if (!text) return;

            btn.disabled = true;
            const { error } = await window.supabase.from('posts').insert([{
                author: user.name,
                avatar_url: user.avatar,
                content: text
            }]);

            if (!error) {
                input.value = "";
                await this.loadPosts();
            }
            btn.disabled = false;
        };
    },

    async loadPosts() {
        const container = document.getElementById('origin-feed');
        const { data: posts } = await window.supabase.from('posts').select('*').order('created_at', { ascending: false });

        if (!posts || posts.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:#555;">Nenhum sinal detectado.</p>';
            return;
        }

        container.innerHTML = posts.map(post => `
            <div style="background: #1c1e21; border-radius: 15px; border: 1px solid #333; overflow: hidden; margin-bottom: 5px;">
                <div style="padding: 12px; display: flex; align-items: center; gap: 10px;">
                    <!-- Fallback para imagem quebrada -->
                    <img src="${post.avatar_url}" 
                         onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'"
                         style="width: 38px; height: 38px; border-radius: 10px; object-fit: cover; border: 1px solid #444;">
                    <div>
                        <div style="font-weight: bold; color: white; font-size: 14px;">${post.author}</div>
                        <div style="font-size: 9px; color: #e67e22; font-weight: 800;">OIO VERIFIED</div>
                    </div>
                </div>
                
                <div style="padding: 0 12px 15px 12px; color: #ccc; font-size: 15px; line-height: 1.4;">
                    ${post.content}
                </div>
                
                <div style="padding: 10px 12px; background: #242526; border-top: 1px solid #222; display: flex; align-items: center; gap: 10px;">
                    <img src="${Identity.get().avatar}" 
                         onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'"
                         style="width: 20px; height: 20px; border-radius: 50%; object-fit: cover; border: 1px solid #444; opacity: 0.8;">
                    <div style="color: #666; font-size: 12px; font-style: italic;">Adicionar comentário...</div>
                </div>
            </div>
        `).join('');
    }
};
