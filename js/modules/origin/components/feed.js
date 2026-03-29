// OIO ONE - INTELLIGENT FEED 💎
// ✅ BUG 3 - Removido import quebrado, usando global
const supabase = window.supabase;
import { Identity } from './identity.js';

export const Feed = {
    async render() {
        const user = Identity.get();
        return `
            <div id="oio-feed-box">
                <div style="background: #242526; padding: 15px; border-radius: 15px; margin-bottom: 25px; border: 1px solid #333;">
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <img src="${user.avatar}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                        <textarea id="feed-input" placeholder="O que há de novo, ${user.name}?" 
                            style="flex: 1; background: #3a3b3c; border: none; padding: 12px; border-radius: 20px; color: #fff; outline: none; resize: none; font-size: 14px; height: 45px;"></textarea>
                        <button id="btn-feed-post" style="background: #e67e22; color: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
                <div id="posts-container" style="display: flex; flex-direction: column; gap: 20px;">
                    <p style="text-align: center; color: #666;">Carregando o Universo...</p>
                </div>
            </div>
        `;
    },

    async loadPosts() {
        const container = document.getElementById('posts-container');
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error || !posts) return;

        container.innerHTML = posts.map(post => {
            const isMarket = post.content.toLowerCase().includes('venda') || post.content.toLowerCase().includes('r$');
            return `
                <div style="background: #1c1e21; border-radius: 20px; border: 1px solid ${isMarket ? '#2ecc71' : '#333'}; overflow: hidden;">
                    <div style="padding: 15px; display: flex; align-items: center; gap: 12px;">
                        <img src="${post.avatar_url}" style="width: 38px; height: 38px; border-radius: 12px; object-fit: cover; border: 1px solid #444;">
                        <div>
                            <div style="font-weight: bold; color: white; font-size: 14px;">${post.author}</div>
                            <div style="font-size: 10px; color: ${isMarket ? '#2ecc71' : '#e67e22'}; font-weight: 800;">${isMarket ? 'OIO MARKET' : 'OIO VERIFIED'}</div>
                        </div>
                    </div>
                    <div style="padding: 0 15px 15px 15px; color: #ccc; font-size: 15px; line-height: 1.5;">
                        ${post.content}
                    </div>
                    <div style="padding: 10px 15px; background: #242526; border-top: 1px solid #333;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <img src="${Identity.get().avatar}" style="width: 22px; height: 22px; border-radius: 50%; object-fit: cover; opacity: 0.7;">
                            <input type="text" placeholder="Comentar..." style="background: transparent; border: none; color: #888; font-size: 12px; outline: none; flex: 1;">
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    setupEvents() {
        const btn = document.getElementById('btn-feed-post');
        const input = document.getElementById('feed-input');

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
    }
};
