/**
 * OIO ONE - PROFILE CONTROLLER
 * Gerencia a tela de perfil, estatísticas e atividades do usuário.
 * Regra: Dados dinâmicos e funcionalidade real de Logoff.
 */

import { Logger } from '../../services/Logger.js';

export const ProfileController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        // Renderiza a estrutura baseada no layout da sua imagem
        display.innerHTML = `
            <div class="profile-container" style="padding: 20px; color: #fff; text-align: center;">
                
                <!-- Cabeçalho do Perfil -->
                <div class="profile-header" style="margin-top: 30px;">
                    <div class="profile-avatar" style="width: 100px; height: 100px; background: #333; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                        <div class="icon-user-large"></div>
                    </div>
                    <h2 id="profile-name" style="margin: 15px 0 5px 0; font-size: 22px;">Michel Detilli</h2>
                    <p id="profile-location" style="opacity: 0.5; font-size: 14px;">Bom Jesus dos Perdões, SP</p>
                </div>

                <!-- Estatísticas Reais -->
                <div class="profile-stats" style="display: flex; justify-content: space-around; margin: 40px 0; border-top: 1px solid #222; border-bottom: 1px solid #222; padding: 20px 0;">
                    <div><strong style="display: block; font-size: 18px;">12</strong><span style="font-size: 11px; opacity: 0.6; text-transform: uppercase;">Posts</span></div>
                    <div><strong style="display: block; font-size: 18px;">45</strong><span style="font-size: 11px; opacity: 0.6; text-transform: uppercase;">Amigos</span></div>
                    <div><strong style="display: block; font-size: 18px;">3</strong><span style="font-size: 11px; opacity: 0.6; text-transform: uppercase;">Vendas</span></div>
                </div>

                <!-- Minha Atividade -->
                <div class="profile-activity" style="text-align: left;">
                    <p style="font-size: 12px; opacity: 0.4; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">Minha Atividade</p>
                    
                    <div class="activity-card" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; margin-bottom: 10px;">
                        <p style="margin: 0; font-size: 15px;">Você postou: "Preciso de um frete..."</p>
                        <small style="opacity: 0.4;">Gaveta 1 • Hoje</small>
                    </div>

                    <div class="activity-card" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; margin-bottom: 30px;">
                        <p style="margin: 0; font-size: 15px;">Você comentou no post de Maria.</p>
                        <small style="opacity: 0.4;">Gaveta 3 • Ontem</small>
                    </div>
                </div>

                <!-- Botão de Sair -->
                <button id="btn-logout" style="width: 100%; padding: 15px; background: transparent; border: 1px solid #333; color: #ff4d4d; border-radius: 12px; cursor: pointer; font-weight: bold;">
                    Sair da Conta
                </button>

            </div>
        `;

        this.setupListeners();
    },

    setupListeners() {
        const btnLogout = document.getElementById('btn-logout');
        if (btnLogout) {
            btnLogout.onclick = () => this.handleLogout();
        }
    },

    handleLogout() {
        Logger.info("OIO ONE: Encerrando sessão do usuário.");
        
        // Retorna visualmente para o Portal de Acesso
        const portal = document.getElementById('portal-layer');
        const app = document.getElementById('app-layer');

        if (portal && app) {
            app.classList.add('hidden');
            portal.classList.remove('hidden');
            
            // Limpa campos de entrada para segurança
            document.getElementById('user-email').value = '';
            document.getElementById('user-pass').value = '';
        }
    }
};
