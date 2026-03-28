import { Identity } from './components/identity.js';
import { Status } from './components/status.js';
import { Shortcuts } from './components/shortcuts.js';
import { Feed } from './components/feed.js';

export const OriginController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        // Limpa e prepara a tela
        display.innerHTML = '<div id="origin-wrapper" style="max-width: 600px; margin: 0 auto; padding: 15px;"></div>';
        const wrapper = document.getElementById('origin-wrapper');

        // Renderiza as 4 partes em ordem (1, 2, 3, 4)
        wrapper.innerHTML += Identity.renderHeader(); // 1. Identidade
        wrapper.innerHTML += await Status.renderDashboard(); // 2. Status
        wrapper.innerHTML += Shortcuts.render(); // 3. Atalhos
        wrapper.innerHTML += await Feed.render(); // 4. Feed

        // Ativa as funções do Feed
        Feed.setupEvents();
        Feed.loadPosts();
    }
};
