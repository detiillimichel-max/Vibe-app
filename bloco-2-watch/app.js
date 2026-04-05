// Inicialização do Bloco 2
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('app');
    const { data, error } = await getVideos();

    if (error) {
        container.innerHTML = "<p>Erro ao carregar vídeos.</p>";
        return;
    }

    container.innerHTML = `
        <div class="watch-container">
            ${data.map(video => VideoCard(video)).join('')}
        </div>
    `;
});
