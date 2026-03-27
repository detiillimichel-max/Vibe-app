/**
 * OIO ONE - ORIGIN CONTROLLER (A CASINHA)
 * Este é o cérebro que organiza o Feed, as Sugestões e o Marketing.
 */

import { OriginTemplates } from './template.js';

export const OriginController = {
    async init() {
        // Busca o elemento principal onde o conteúdo será injetado
        const display = document.getElementById('universe-display');
        
        if (!display) {
            console.error("OIO-ERROR: Elemento 'universe-display' não encontrado no HTML.");
            return;
        }

        // Limpa a tela e monta a estrutura visual das seções
        display.innerHTML = `
            <div class="origin-wrapper" style="padding: 20px; padding-bottom: 100px;">
                <!-- Área de Marketing (OIO ARCHITECTURE) -->
                <section id="marketing-area" class="section-vibe"></section>
                
                <div class="discovery-header" style="margin: 20px 0; opacity: 0.6; font-size: 12px; letter-spacing: 2px;">
                    <span>CONEXÕES SUGERIDAS</span>
                </div>
                
                <!-- Área de Sugestões (Diego, Michelle, etc.) -->
                <section id="suggestions-area" class="horizontal-scroll" style="display: flex; gap: 15px; overflow-x: auto; padding-bottom: 15px;"></section>
                
                <div class="discovery-header" style="margin: 20px 0; opacity: 0.6; font-size: 12px; letter-spacing: 2px;">
                    <span>FLUXO DE IDEIAS</span>
                </div>
                
                <!-- Área de Postagens e Pensamentos -->
                <section id="ideas-feed" style="display: flex; flex-direction: column; gap: 15px;"></section>
            </div>
        `;

        try {
            // Busca o banco de dados dinâmico (O Panorama Completo que você enviou)
            const response = await fetch('./data/origin-feed.json');
            if (!response.ok) throw new Error("Falha ao carregar origin-feed.json");
            
            const data = await response.json();
            
            // Dispara a renderização dos blocos
            this.renderContent(data);
            
            console.log("OIO-INFO: Ecossistema VIBE carregado com sucesso.");
        } catch (error) {
            console.error("OIO-ERROR: Falha ao carregar o ecossistema.", error);
            display.innerHTML = `<div style="padding: 50px; text-align: center; opacity: 0.3;">SISTEMA OFFLINE</div>`;
        }
    },

    renderContent(data) {
        const mktArea = document.getElementById('marketing-area');
        const suggestArea = document.getElementById('suggestions-area');
        const ideasArea = document.getElementById('ideas-feed');

        // 1. Renderiza Marketing (Configurado no seu JSON)
        if (data.marketing) {
            data.marketing.forEach(item => {
                mktArea.innerHTML += OriginTemplates.marketingCard(item);
            });
        }

        // 2. Renderiza Sugestões de Amizade (Diego, Claudia, Michelle, Douglas)
        if (data.suggestions) {
            data.suggestions.forEach(user => {
                suggestArea.innerHTML += OriginTemplates.connectionSuggest(user);
            });
        }

        // 3. Renderiza Ideias (Pensamentos do Sistema OIO)
        if (data.ideas) {
            data.ideas.forEach(post => {
                ideasArea.innerHTML += `
                    <div class="glass-card thought-card" style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
                        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 10px; font-style: italic;">"${post.content}"</p>
                        <small style="color: #d4af37; text-transform: uppercase; letter-spacing: 1px;">— ${post.author}</small>
                    </div>
                `;
            });
        }
    }
};
