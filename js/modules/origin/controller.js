import { supabase } from '../../core.js';

// 1. IDENTIDADE (Crachá de Luxo)
const Identity = {
    get() {
        return {
            name: localStorage.getItem('oio_user_name') || "Membro OIO",
            avatar: localStorage.getItem('oio_user_avatar') || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        };
    }
};

export const OriginController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        // LIMPEZA OBRIGATÓRIA: Expulsa o módulo "Friends" ou qualquer outro da tela
        display.innerHTML = ''; 

        const user = Identity.get();

        // MONTAGEM DA ESTRUTURA (Status + Atalhos + Feed)
        display.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; padding: 15px; padding-bottom: 100px;">
                
                <!-- HEADER (IDENTIDADE) -->
                <div style="display: flex; align-items: center; gap: 12px; padding: 15px; background: #242526; border-radius: 15px; margin-bottom: 20px; border: 1px solid #333;">
                    <img src="${user.avatar}" style="width: 45px; height: 45px; border-radius: 12px; object-fit: cover; border: 1px solid #e67e22;">
                    <div>
                        <div style="color: white; font-weight: bold;">${user.name}</div>
                        <div style="color: #e67e22; font-size: 10px; font-weight: bold;">UNIVERSO OIO</div>
                    </div>
                </div>

                <!-- DASHBOARD (STATUS) -->
                <div id="status-area" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                    <div style="background: #1c1e21; padding: 12px; border-radius: 12px; border: 1px solid #333;">
                        <small style="color: #888; font-size: 9px;">VIBE CHECK</small>
                        <div style="color: white; font-weight: bold;">Sincronizado</div>
                    </div>
                    <div style="background: #1c1e21; padding: 12px; border-radius: 12px; border: 1px solid #333;">
                        <small style="color: #888; font-size: 9px;">OIO MARKET</small>
                        <div style="color: #2ecc71; font-weight: bold;">Online</div>
                    </div>
                </div>

                <!-- BOX DE POSTAGEM (FEED INTELIGENTE) -->
                <div style="background: #242526; padding: 15px; border-radius: 15px; margin-bottom: 25px; border: 1px solid #333;">
                    <textarea id="origin-post-input" placeholder="O que há de novo, ${user.name}?" 
                        style="width: 100%; background: transparent; border: none; color: #fff; outline: none; resize: none; font-size: 15px; height: 60px;"></textarea>
                    <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
                        <button id="btn-origin-post" style="background: #e67e22; color: white; border: none; padding: 8px 25px; border-radius: 20px; font-weight: bold; cursor: pointer;">Publicar</button>
                    </div>
                </div>

                <!-- FEED DE POSTS -->
                <div id="origin-feed-container" style="display: flex; flex-direction: column; gap: 15px;">
                    <p style="color: #666; text-align: center;">Carregando...</p>
                </div>
            </div>
        `;

        this.bindEvents();
        this.loadPosts();
    },

    bindEvents() {
        const btn = document.getElementById('btn-origin-post');
        const input = document.getElementById('origin-post-input');

        btn.onclick = async () => {
            const user = Identity.get();
            const text = input.value.trim();
            if (!text) return;

            btn.disabled = true;
            const { error } = await supabase.from('posts').insert([{
                author: user.name,
                avatar_url: user.avatar,
                content: text
            }]);

            if (!error) {
                input.value = "";
                this.loadPosts();
            }
            btn.disabled = false;
        };
    },

    async loadPosts() {
        const container = document.getElementById('origin-feed-container');
        const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false });

        if (!posts) return;

        container.innerHTML = posts.map(post => `
            <div style="background: #1c1e21; border-radius: 15px; border: 1px solid #333; overflow: hidden;">
                <div style="padding: 12px; display: flex; align-items: center; gap: 10px;">
                    <img src="${post.avatar_url}" style="width: 35px; height: 35px; border-radius: 10px; object-fit: cover;">
                    <div>
                        <div style="font-weight: bold; color: white; font-size: 13px;">${post.author}</div>
                        <div style="font-size: 9px; color: #e67e22; font-weight: bold;">OIO VERIFIED</div>
                    </div>
                </div>
                <div style="padding: 0 12px 12px 12px; color: #ccc; font-size: 14px;">${post.content}</div>
                
                <!-- COMENTÁRIO COM FOTO DIMINUTA -->
                <div style="padding: 8px 12px; background: #242526; border-top: 1px solid #222; display: flex; align-items: center; gap: 8px;">
                    <img src="${Identity.get().avatar}" style="width: 18px; height: 18px; border-radius: 50%; opacity: 0.6;">
                    <div style="color: #666; font-size: 11px;">Escrever comentário...</div>
                </div>
            </div>
        `).join('');
    }
};
