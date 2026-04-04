// 🧠 A ALMA DO BLOCO 1 - HOME

// 1. Função para gerenciar as curtidas (Interação)
function toggleLike(button) {
    const isLiked = button.getAttribute('data-liked') === 'true';
    
    if (isLiked) {
        button.style.color = '#b0b3b8'; // Cor cinza (descurtido)
        button.innerHTML = '👍 Curtir';
        button.setAttribute('data-liked', 'false');
    } else {
        button.style.color = '#1877f2'; // Azul Facebook (curtido)
        button.innerHTML = '👍 Curtido';
        button.setAttribute('data-liked', 'true');
        
        // Pequena vibração ou efeito pode ser adicionado aqui
        console.log("Post curtido no Bloco 1!");
    }
}

// 2. Simulador de carregamento de posts (Futuro Supabase)
async function loadHomePosts() {
    console.log("Buscando posts no universo...");
    
    // Aqui no futuro entra o seu código do Supabase:
    // const { data, error } = await supabase.from('posts').select('*');
    
    // Por enquanto, ele apenas confirma que o sistema está pronto
}

// 3. Inicialização automática
document.addEventListener('DOMContentLoaded', () => {
    loadHomePosts();
    console.log("Bloco 1 (Home) 100% Funcional.");
});
