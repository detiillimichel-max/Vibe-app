// Inicialização do Bloco 5
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('app');
    const { data, error } = await getAlerts();

    if (error) {
        container.innerHTML = "<p>Erro ao carregar alertas.</p>";
        return;
    }

    container.innerHTML = `
        <div class="alerts-container">
            ${data.map(alert => AlertCard(alert)).join('')}
        </div>
    `;
});
