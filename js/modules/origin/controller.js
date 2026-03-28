import { supabase } from '../../core.js';

export const OriginController = {
    async init(userName) {
        const display = document.getElementById('universe-display');
        if (!display) return;

        // Monta a interface da Home (Campo de postar + container do Feed)
        display.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; padding-bottom: 80px;">
                <div style="background: #242526; padding: 15px; margin-bottom: 15px; border-bottom: 1px solid #3e4042;">
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: #3a3b3c; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #fff;">
                            ${userName.charAt(0)}
                        </div>
                        <input id="post-input" type="text" placeholder="No que você está pensando, ${userName}?" 
                            style="flex: 1; background: #3a3b3c; border: none; padding: 10px 15px; border-radius: 20px; color: #fff; outline: none;">
                        <button id="btn-postar" style="background: #1877f2; color: white; border: none; padding: 8px 15px; border-radius: 15px; font-weight: 600; cursor: pointer;">
                            Postar
                        </button>
                    </div>
                </div>
                <div id="feed-container"></div>
            </div>
        `;

        this.setupEventListeners(userName);
        this.loadPosts();
    },

    setupEventListeners(userName) {
        const btn = document.getElementById('btn-postar');
        const input = document.getElementById('post-input');

        btn.onclick = async () => {
            const texto = input.value.trim();
            if (texto === "") return;

            // SALVANDO NO SUPABASE (Naquela tabela 'posts' que criamos)
            const { error } = await supabase
                .from('posts')
                .insert([{ author: userName, content: texto }]);

            if (error) {
                console.error("Erro ao postar:", error);
                alert("Erro ao enviar post: " + error.message);
            } else {
                input.value = "";
                this.loadPosts(); // Atualiza a lista para mostrar o novo post
            }
        };
    },

    async loadPosts() {
        const feedContainer = document.getElementById('feed-container');

        // BUSCANDO OS POSTS DO SUPABASE
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            feedContainer.innerHTML = '<p style="text-align: center; color: #b0b3b8;">Erro ao carregar posts.</p>';
            return;
        }

        // Gera o HTML para cada post encontrado
        let html = "";
        posts.forEach(post => {
            html += `
                <div style="background: #242526; margin-bottom: 10px; padding: 12px; border-radius: 8px; border: 1px solid #3e4042;">
                    <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
                        <div style="width: 35px; height: 35px; border-radius: 50%; background: #fb3958; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">
                            ${post.author.charAt(0)}
                        </div>
                        <div>
                            <div style="font-weight: 600; font-size: 14px; color: #fff;">${post.author}</div>
                            <div style="font-size: 11px; color: #b0b3b8;">Postado via OIO ONE</div>
                        </div>
                    </div>
                    <div style="color: #e4e6eb; font-size: 15px; word-break: break-word;">${post.content}</div>
                </div>
            `;
        });
        feedContainer.innerHTML = html || '<p style="text-align: center; color: #b0b3b8;">Nenhum post ainda. Seja o primeiro!</p>';
    }
};
