// OIO ONE - Cérebro de Universos e Hub de Jogos
const App = {
    // Lista de Universos (A Vitrine Automática)
    universos: [
        { 
            nome: "TETRIS RETRO", 
            desc: "A alma do MSN e Orkut em blocos.", 
            vibe: "glow-blue",
            url: "https://chvin.github.io/react-tetris/" // Versão clean em HTML5
        },
        { 
            nome: "2048 LUX", 
            desc: "Raciocínio puro e minimalista.", 
            vibe: "glow-gold",
            url: "https://play2048.co/" 
        },
        { 
            nome: "SNAKE OIO", 
            desc: "Nostalgia dos anos 2000.", 
            vibe: "glow-green",
            url: "https://www.google.com/logos/2010/pacman10-i.html" // Exemplo: Pacman icônico
        },
        { 
            nome: "SPACE INVADERS", 
            desc: "O despertar do Arcade.", 
            vibe: "glow-red",
            url: "https://freeinvaders.org/" 
        }
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
                document.getElementById('main-video').play();
            }, 1000);
        };
    },

    hubLogic() {
        const hub = document.getElementById('hub-layer');
        const btnHub = document.getElementById('btn-hub');
        const btnClose = document.querySelector('.close-hub');

        btnHub.onclick = () => hub.classList.remove('hub-hidden');
        btnClose.onclick = () => hub.classList.add('hub-hidden');
    },

    // Função que "Injeta" o Jogo na Camada de Mídia (70%)
    abrirJogo(url) {
        const videoContainer = document.querySelector('.video-container');
        const hub = document.getElementById('hub-layer');
        
        // Esconde o Hub e limpa o container de vídeo
        hub.classList.add('hub-hidden');
        
        // Substitui o vídeo por um Iframe do jogo com transparência
        videoContainer.innerHTML = `
            <iframe src="${url}" style="width:100%; height:100%; border:none; background:#000;"></iframe>
            <div class="video-overlay"></div>
            <button id="btn-voltar-video" style="position:absolute; top:20px; left:20px; z-index:200; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; padding:8px 15px; border-radius:20px; font-size:10px; cursor:pointer; backdrop-filter:blur(10px);">⬅ VOLTAR AO VÍDEO</button>
        `;

        document.getElementById('btn-voltar-video').onclick = () => location.reload(); // Simples reset para o vídeo original
    },

    renderVitrine() {
        const container = document.getElementById('vitrine-main');
        container.innerHTML = ''; // Limpa antes de renderizar

        this.universos.forEach(uni => {
            const card = document.createElement('div');
            card.className = `vitrine-card ${uni.vibe}`;
            card.innerHTML = `
                <h3>${uni.nome}</h3>
                <p>${uni.desc}</p>
            `;
            
            // Ao clicar na joia, o jogo abre no 70%
            card.onclick = () => this.abrirJogo(uni.url);
            
            container.appendChild(card);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
