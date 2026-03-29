/* 🕹️ MODULO OIO GAMER - INDEPENDENTE */

export const GamesHub = {
    // Lista de Jogos (Fácil de adicionar novos depois)
    catalogo: {
        'domino': {
            titulo: 'Dominó Classic',
            url: 'https://www.agame.com/game/dominoes-classic',
            icone: 'fa-th-large'
        },
        'xadrez': {
            titulo: 'Xadrez Online',
            url: 'https://www.agame.com/game/chess-grandmaster',
            icone: 'fa-chess'
        }
    },

    // Função para renderizar o jogo no display do App
    abrirJogo(id) {
        const jogo = this.catalogo[id];
        const display = document.getElementById('universe-display');

        if (!jogo || !display) return;

        display.innerHTML = `
            <div id="game-container" style="height: 100%; display: flex; flex-direction: column; background: #000;">
                <div style="padding: 10px; background: #1c1e21; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                    <span style="color: #1877f2; font-weight: bold;"><i class="fas ${jogo.icone}"></i> ${jogo.titulo}</span>
                    <button onclick="document.getElementById('game-container').remove()" style="background: #ff3040; border: none; color: white; border-radius: 5px; padding: 5px 10px;">Sair</button>
                </div>
                <iframe src="${jogo.url}" style="flex-grow: 1; border: none; width: 100%;"></iframe>
            </div>
        `;
    }
};

// Torna a função acessível globalmente para os botões do Index
window.abrirJogoOIO = (id) => GamesHub.abrirJogo(id);
