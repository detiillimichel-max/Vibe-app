import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export const OriginController = {
    init(userName) {
        const display = document.getElementById('universe-display');
        if (!display) return;

        // Renderiza a estrutura da Home com o Campo de Post
        display.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; padding-bottom: 80px;">
                
                <!-- ÁREA DE CRIAÇÃO DE POST -->
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

                <!-- CONTAINER ONDE OS POSTS VÃO APARECER -->
                <div id="feed-container">
                    <p style="text-align: center; color: #b0b3b8;">Carregando feed...</p>
                </div>
            </div>
        `;

        this.setupEventListeners(userName);
        this.loadPosts();
    },

    setupEventListeners(userName) {
        const btn = document.getElementById('btn-postar');
        const input = document.getElementById('post-input');
        const db = getDatabase();

        btn.onclick = async () => {
            if (input.value.trim() === "") return;

            const postsRef = ref(db, 'posts');
            const newPostRef = push(postsRef);
            
            await set(newPostRef, {
                author: userName,
                content: input.value,
                timestamp: Date.now()
            });

            input.value = ""; // Limpa o campo após postar
        };
    },

    loadPosts() {
        const db = getDatabase();
        const postsRef = ref(db, 'posts');
        const feedContainer = document.getElementById('feed-container');

        // Escuta o Firebase em tempo real
        onValue(postsRef, (snapshot) => {
            if (!snapshot.exists()) {
                feedContainer.innerHTML = '<p style="text-align: center; color: #b0b3b8;">Nenhum post ainda. Seja o primeiro!</p>';
                return;
            }

            let html = "";
            const data = snapshot.val();
            // Inverter para mostrar os mais novos primeiro
            const sortedPosts = Object.values(data).reverse();

            sortedPosts.forEach(post => {
                html += `
                    <div style="background: #242526; margin-bottom: 10px; padding: 12px; border-radius: 8px; border: 1px solid #3e4042;">
                        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
                            <div style="width: 35px; height: 35px; border-radius: 50%; background: #fb3958; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">
                                ${post.author.charAt(0)}
                            </div>
                            <div>
                                <div style="font-weight: 600; font-size: 14px; color: #fff;">${post.author}</div>
                                <div style="font-size: 11px; color: #b0b3b8;">Agora mesmo • <i class="fas fa-globe-americas"></i></div>
                            </div>
                        </div>
                        <div style="color: #e4e6eb; font-size: 15px;">${post.content}</div>
                    </div>
                `;
            });
            feedContainer.innerHTML = html;
        });
    }
};
