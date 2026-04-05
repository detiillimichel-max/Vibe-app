// Script principal do Bloco 5 - Alerts
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('app');
    const { data, error } = await getAlerts();

    if (error) {
        container.innerHTML = "<p>Erro ao carregar alertas.</p>";
        console.error(error);
        return;
    }

    container.innerHTML = `
        <div class="alerts-container">
            ${data.map(alert => AlertCard(alert)).join('')}
        </div>
    `;
});
