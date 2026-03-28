// OIO ONE - Conexão Suprema com o Banco de Dados 💎
alert("OIO ONE Conectado! 🚀");

async function carregarAmigos() {
    // 1. Onde a lista vai aparecer no seu HTML (ID da div de amigos)
    const listaAmigos = document.querySelector('.friends-list') || document.body; 

    // 2. Buscando os dados na tabela 'profiles' que você criou
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');

    if (error) {
        console.error("Erro ao buscar amigos:", error);
        return;
    }

    // 3. Limpa a tela (remove o "Desenvolvedor OIO" fixo)
    // Se você tiver uma div específica para a lista, limpe ela aqui
    // listaAmigos.innerHTML = ''; 

    // 4. Fazendo cada amigo "nascer" na tela
    profiles.forEach(amigo => {
        const cardAmigo = `
            <div class="friend-card" style="display: flex; align-items: center; padding: 15px; border-bottom: 1px solid #333;">
                <img src="${amigo.avatar_url || 'https://via.placeholder.com/60'}" 
                     style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #00ff88; margin-right: 15px;">
                <div>
                    <h3 style="margin: 0; color: #fff;">${amigo.username}</h3>
                    <p style="margin: 0; color: #888; font-size: 0.9em;">📍 ${amigo.city || 'Terra'}</p>
                    <small style="color: #00ff88;">${amigo.is_online ? '● Online' : '○ Offline'}</small>
                </div>
            </div>
        `;
        listaAmigos.insertAdjacentHTML('beforeend', cardAmigo);
    });
}

// Inicia tudo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    carregarAmigos();

    // Lógica do seu Hub (mantida)
    const btnHub = document.getElementById('btn-hub');
    const hubLayer = document.getElementById('hub-layer');
    if (btnHub && hubLayer) {
        btnHub.onclick = () => hubLayer.classList.toggle('hub-hidden');
    }
});
