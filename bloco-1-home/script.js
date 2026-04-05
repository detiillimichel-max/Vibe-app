// Script principal do Bloco 1 - Home
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('app');
    const { data, error } = await getPosts();

    if (error) {
        container.innerHTML = "<p>Erro ao carregar posts.</p>";
        console.error(error);
        return;
    }

    container.innerHTML = `
        <div class="home-container">
            ${data.map(post => PostCard(post)).join('')}
        </div>
    `;
});
