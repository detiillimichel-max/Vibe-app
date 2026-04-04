// 🧠 ALMA DO BLOCO 6 - PROFILE & MENU
console.log("Módulo de Perfil OIO: Ativo.");

// Função para gerenciar cliques no menu
document.addEventListener('click', function(e) {
    const card = e.target.closest('.setting-card');
    if (card) {
        const opcao = card.innerText.trim();
        console.log(`Usuário acessou: ${opcao}`);
        
        // Exemplo: Se for o botão de sair
        if (opcao.includes("Sair")) {
            if(confirm("Deseja desconectar do Vibe-app?")) {
                window.location.reload();
            }
        }
    }
});
