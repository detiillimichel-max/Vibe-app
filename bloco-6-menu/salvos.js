async function carregarMeusSalvos() {
    const display = document.getElementById('menu-hub-container'); // Onde vamos mostrar a lista
    display.innerHTML = "<h3><i class='fas fa-arrow-left' onclick='window.location.reload()'></i> Meus Itens Salvos</h3><hr><p>Carregando seus tesouros...</p>";

    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        const { data: itens, error } = await supabase
            .from('salvos')
            .select('*')
            .eq('user_id', session.user.id);

        if (error || !itens || itens.length === 0) {
            display.innerHTML = `
                <h3><i class="fas fa-arrow-left" onclick="window.location.reload()" style="cursor:pointer"></i> Itens Salvos</h3>
                <div style="text-align:center; padding: 40px 20px;">
                    <i class="fas fa-bookmark" style="font-size: 50px; color: #3a3b3c; margin-bottom: 15px;"></i>
                    <p style="color: #b0b3b8;">Você ainda não salvou nada no OIO.</p>
                </div>`;
            return;
        }

        // Se tiver itens, monta a lista:
        let htmlLista = `<h3><i class="fas fa-arrow-left" onclick="window.location.reload()" style="cursor:pointer"></i> Itens Salvos</h3>`;
        itens.forEach(item => {
            htmlLista += `
                <div style="background:#242526; padding:15px; border-radius:10px; margin-bottom:10px; border:1px solid #3a3b3c;">
                    <strong style="display:block;">${item.titulo}</strong>
                    <small style="color:#b0b3b8;">Salvo em: ${new Date(item.data_salvo).toLocaleDateString()}</small>
                </div>`;
        });
        display.innerHTML = htmlLista;
    }
}

// Exporta para o botão conseguir enxergar
window.funcaoAbrirSalvos = carregarMeusSalvos;
