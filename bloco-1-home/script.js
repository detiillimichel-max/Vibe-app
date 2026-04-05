// Importante: Não use DOMContentLoaded aqui, pois o bloco é carregado dinamicamente
async function initHome() {
    const feed = document.getElementById('home-feed');
    
    // Simulação ou chamada real do Supabase
    // const { data, error } = await getPosts(); 

    // Dados de teste para você ver o visual agora
    const mockPosts = [
        { user_name: "Michel Detilli", content: "Sistema OIO ONE em desenvolvimento modular! 🚀", created_at: new Date() }
    ];

    feed.innerHTML = mockPosts.map(post => `
        <div class="post-card">
            <div class="header-post">
                <div class="avatar-user"></div>
                <div>
                    <div class="user-name">${post.user_name}</div>
                    <div class="post-time">agora mesmo</div>
                </div>
            </div>
            <div class="content-text">${post.content}</div>
            <div class="action-bar">
                <button class="btn-action">👍 Curtir</button>
                <button class="btn-action">💬 Comentar</button>
            </div>
        </div>
    `).join('');
}

initHome();
