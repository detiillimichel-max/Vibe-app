import { OriginTemplates } from './template.js';

export const OriginController = {
    async init() {
        const display = document.getElementById('universe-display');
        
        // Estrutura Base
        display.innerHTML = `
            <div class="origin-wrapper">
                <section id="marketing-area"></section>
                <div class="discovery-header"><span>CONEXÕES SUGERIDAS</span></div>
                <section id="suggestions-area" class="horizontal-scroll"></section>
                <div class="discovery-header"><span>FLUXO DE IDEIAS</span></div>
                <section id="ideas-feed"></section>
            </div>
        `;

        try {
            const response = await fetch('./data/origin-feed.json');
            const data = await response.json();
            this.renderContent(data);
        } catch (error) {
            console.error("OIO-ERROR: Falha ao carregar o ecossistema.", error);
        }
    },

    renderContent(data) {
        const mktArea = document.getElementById('marketing-area');
        const suggestArea = document.getElementById('suggestions-area');
        const ideasArea = document.getElementById('ideas-feed');

        // Renderiza Marketing
        data.marketing.forEach(item => {
            mktArea.innerHTML += OriginTemplates.marketingCard(item);
        });

        // Renderiza Sugestões (Amizades)
        data.suggestions.forEach(user => {
            suggestArea.innerHTML += OriginTemplates.connectionSuggest(user);
        });

        // Renderiza Ideias (Postagens)
        data.ideas.forEach(post => {
            ideasArea.innerHTML += `
                <div class="glass-card thought-card">
                    <p>${post.content}</p>
                    <small>— ${post.author}</small>
                </div>
            `;
        });
    }
};
