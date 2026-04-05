// Inicialização do Bloco 3
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('app');
    const { data, error } = await getFriends();

    if (error) {
        container.innerHTML = "<p>Erro ao carregar amigos.</p>";
        return;
    }

    container.innerHTML = `
        <div class="friends-container">
            ${data.map(friend => FriendCard(friend)).join('')}
        </div>
    `;
});
