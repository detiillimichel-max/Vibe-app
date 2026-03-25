const App = {
    universos: [
        { nome: "HUB DE JOGOS", desc: "Clássicos Arcade", vibe: "glow-blue" },
        { nome: "AUDIOBOOKS IA", desc: "Sua biblioteca de voz", vibe: "glow-gold" },
        { nome: "MOTORES", desc: "Universo Automotivo", vibe: "glow-red" },
        { nome: "MEMÓRIAS", desc: "Banco de dados pessoal", vibe: "glow-white" }
    ],

    init() {
        this.portalLogic();
        this.hubLogic();
        this.renderVitrine();
    },

    portalLogic() {
        const star = document.getElementById('star-trigger');
        const portal = document.getElementById('portal-layer');
        const app = document.getElementById('app-layer');

        star.onclick = () => {
            portal.style.opacity = '0';
            setTimeout(() => {
                portal.classList.add('hidden');
                app.classList.remove('hidden');
                // Play no vídeo após entrada
                document.getElementById('main-video').play();
            }, 1000);
        };
    },

    hubLogic() {
        const hub = document.getElementById('hub-layer');
        document.getElementById('btn-hub').onclick = () => hub.classList.remove('hub-hidden');
        document.querySelector('.close-hub').onclick = () => hub.classList.add('hub-hidden');
    },

    renderVitrine() {
        const container = document.getElementById('vitrine-main');
        this.universos.forEach(uni => {
            const card = document.createElement('div');
            card.className = 'vitrine-card';
            card.innerHTML = `
                <h3>${uni.nome}</h3>
                <p>${uni.desc}</p>
            `;
            container.appendChild(card);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
