// Inicialização do Bloco 4
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('app');
    const { data, error } = await getProducts();

    if (error) {
        container.innerHTML = "<p>Erro ao carregar produtos.</p>";
        return;
    }

    container.innerHTML = `
        <div class="market-container">
            ${data.map(product => ProductCard(product)).join('')}
        </div>
    `;
});
