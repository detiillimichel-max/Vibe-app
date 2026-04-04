// 🧠 ALMA DO BLOCO 2 - WATCH
console.log("Bloco 2: Watch Ativo!");

// Função para simular o Play/Pause
document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('video-placeholder')) {
        console.log("Vídeo acionado!");
        // Aqui entrará a lógica de abrir o vídeo real
        alert("Iniciando Reprodução...");
    }
});

async function carregarVideos() {
    console.log("Conectando ao banco de vídeos...");
    // Espaço para o Supabase no futuro
}

carregarVideos();
