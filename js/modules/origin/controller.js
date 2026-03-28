/**
 * OIO ONE - ORIGIN CONTROLLER (A CASINHA)
 * Este é o cérebro que organiza o Feed, as Sugestões e o Marketing.
 */

import { OriginTemplates } from './template.js';

export const OriginController = {
    async init() {
        const display = document.getElementById('universe-display');
        
        if (!display) {
            console.error("OIO-ERROR: Elemento 'universe-display' não encontrado.");
            return;
        }

        // Monta a estrutura visual das seções
        display.innerHTML = `
            <div class="origin-wrapper" style="padding: 20px; padding-bottom: 100px;">
                <!-- Área de Marketing -->
                <section id="marketing-area" class="section-vibe"></section>
                
                <div class="discovery-header" style="margin: 20px 0; opacity: 0.6; font-size: 12px; letter-spacing: 2px;">
                    <span>CONEXÕES SUGERIDAS</span>
                </div>
                
                <!-- Área de Sugestões -->
                <section id="suggestions-area" class="horizontal-scroll" style="display: flex; gap: 15px; overflow-x: auto; padding-bottom: 15px;"></section>
                
                <div class="discovery-header" style="margin: 20px 0; opacity: 0.6; font-size: 12px; letter-spacing: 2px;">
                    <span>FLUXO DE IDEIAS</span>
                </div>
                
                <!-- Área de Postagens e Pensamentos -->
                <section id="ideas-feed" style="display: flex; flex-direction: column; gap: 15px;"></section>
            </div>
        `;

        try {
            // Busca o JSON (Caminho ajustado para compatibilidade com GitHub Pages)
            const response = await fetch('data/origin-feed.json');
            
            if (!response.ok) throw new Error("Falha ao carregar origin-feed.json");
            
            const data = await response.json();
            
            // Renderiza o conteúdo
            this.renderContent(data);
            
            console.log("OIO-INFO: Ecossistema VIBE carregado.");
        } catch (error) {
            console.error("OIO-ERROR:", error);
            display.innerHTML = `<div style="padding: 50px; text-align: center; opacity: 0.3;">SISTEMA OFFLINE</div>`;
        }
    },

    renderContent(data) {
        const mktArea = document.getElementById('marketing-area');
        const suggestArea = document.getElementById('suggestions-area');
        const ideasArea = document.getElementById('ideas-feed');

        // Limpa as áreas antes de injetar conteúdo (Prevenção de bugs)
        if(mktArea) mktArea.innerHTML = '';
        if(suggestArea) suggestArea.innerHTML = '';
        if(ideasArea) ideasArea.innerHTML = '';

        // 1. Marketing
        if (data.marketing) {
            data.marketing.forEach(item => {
                mktArea.innerHTML += OriginTemplates.marketingCard(item);
            });
        }

        // 2. Sugestões
        if (data.suggestions) {
            data.suggestions.forEach(user => {
                suggestArea.innerHTML += OriginTemplates.connectionSuggest(user);
            });
        }

        // 3. Ideias
        if (data.ideas) {
            data.ideas.forEach(post => {
                ideasArea.innerHTML += `
                    <div class="glass-card thought-card" style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 10px;">
                        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 10px; font-style: italic;">"${post.content}"</p>
                        <small style="color: #d4af37; text-transform: uppercase; letter-spacing: 1px;">— ${post.author}</small>
                    </div>
                `;
            });
        }
    }
};
