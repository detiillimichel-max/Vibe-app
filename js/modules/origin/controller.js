import { OriginTemplates } from './template.js';

export const OriginController = {
    render() {
        const display = document.getElementById('universe-display');
        
        display.innerHTML = `
            <div class="origin-wrapper">
                <!-- Seção de Marketing de Luxo -->
                <section id="marketing-area"></section>
                
                <!-- Grade de Sugestões de Amizade -->
                <div class="discovery-header">
                    <span>NOVAS CONEXÕES</span>
                </div>
                <section id="suggestions-area" class="horizontal-scroll"></section>
                
                <!-- Feed de Ideias (Placeholder para o que virá) -->
                <section id="ideas-feed"></section>
            </div>
        `;
        
        this.loadMockData();
    },

    loadMockData() {
        // Exemplo de como o sistema preencherá os espaços
        const mktArea = document.getElementById('marketing-area');
        mktArea.innerHTML = OriginTemplates.marketingCard({
            title: "OIO DESIGN",
            description: "A nova era do minimalismo orgânico chegou.",
            image: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?q=80&w=500"
        });
    }
};
