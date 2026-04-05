// Inicialização do Bloco 1
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('app');
    const { data, error } = await getPosts();

    if (error) {
        container.innerHTML = "<p>Erro ao carregar posts.</p>";
        return;
    }

    container.innerHTML = `
        <div class="home-container">
            ${data.map(post => PostCard(post)).join('')}
        </div>
    `;
});
