// Inicialização do Bloco 6
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('app');
    const { data, error } = await getMenuItems();

    if (error) {
        container.innerHTML = "<p>Erro ao carregar menu.</p>";
        return;
    }

    container.innerHTML = `
        <div class="menu-container">
            ${data.map(item => MenuItem(item)).join('')}
        </div>
    `;
});
