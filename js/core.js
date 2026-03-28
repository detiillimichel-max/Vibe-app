// OIO ONE - CORE SYSTEM 💎
const display = document.getElementById('universe-display');
const portal = document.getElementById('portal-layer');
const app = document.getElementById('app-layer');
const btnEntrar = document.getElementById('btn-entrar');

// 1. FUNÇÃO PARA ACESSAR O APP
btnEntrar.onclick = () => {
    portal.classList.add('hidden');
    app.classList.remove('hidden');
    carregarAmigos(); // Começa mostrando os amigos por padrão
};

// 2. FUNÇÃO PARA BUSCAR AMIGOS NO SUPABASE
async function carregarAmigos() {
    display.innerHTML = '<p style="text-align:center;">Buscando conexões...</p>';
    
    const { data: profiles, error } = await window.supabase
        .from('profiles')
        .select('*');

    if (error) {
        display.innerHTML = '<p>Erro ao carregar amigos.</p>';
        return;
    }

    display.innerHTML = '<h2 style="margin-bottom:15px;">Amigos</h2>';
    
    profiles.forEach(amigo => {
        const card = `
            <div class="friend-card">
                <div style="width:50px; height:50px; background:#1877f2; border-radius:50%; margin-right:15px; display:flex; align-items:center; justify-content:center;">
                    <i class="fas fa-user" style="color:white;"></i>
                </div>
                <div>
                    <strong style="display:block; font-size:1.1em;">${amigo.username}</strong>
                    <span style="color:#b0b3b8; font-size:0.9em;">📍 ${amigo.city || 'Global'}</span>
                </div>
            </div>
        `;
        display.insertAdjacentHTML('beforeend', card);
    });
}

// 3. LÓGICA DAS ABAS (NAVEGAÇÃO)
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach((item, index) => {
    item.onclick = () => {
        // Remove 'active' de todos e coloca no clicado
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Muda o conteúdo baseado no ícone (Módulos 1, 2, 3...)
        if (index === 0) display.innerHTML = '<h2>Home</h2><p>Bem-vindo ao OIO ONE.</p>';
        if (index === 1) display.innerHTML = '<h2>Vídeos</h2><p>Em breve: Suas pregações e vídeos aqui.</p>';
        if (index === 2) carregarAmigos(); // Módulo de Amigos
        if (index === 3) display.innerHTML = '<h2>Marketplace</h2><p>Loja em construção.</p>';
    };
});
