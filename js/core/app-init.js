// Vibe-app/js/core/app-init.js
import { Logger } from '../services/Logger.js';
import { OriginController } from '../modules/origin/controller.js';

const AppInit = {
    async start() {
        Logger.info("Iniciando Motores OIO ONE...");

        // 1. Verifica se o usuário está logado (simulado pelo localStorage por enquanto)
        const userEmail = localStorage.getItem('oio_user_email');
        
        if (userEmail) {
            // Se logado, mostra o App e esconde o Portal
            document.getElementById('portal-layer').classList.add('hidden');
            document.getElementById('app-layer').classList.remove('hidden');
            
            // 2. Carrega a Home (Origin) manualmente para garantir que não fique tela preta
            await this.loadInitialModule();
        } else {
            Logger.info("Aguardando Login...");
        }

        this.setupLoginEvent();
    },

    async loadInitialModule() {
        // Chama o controlador da Home
        try {
            await OriginController.init();
            Logger.info("Universo Origin carregado com sucesso.");
        } catch (e) {
            Logger.error("Erro ao carregar Origin: " + e.message);
        }
    },

    setupLoginEvent() {
        const btn = document.getElementById('btn-entrar');
        if (btn) {
            btn.onclick = () => {
                const email = document.getElementById('login-email').value;
                if (email) {
                    localStorage.setItem('oio_user_email', email);
                    localStorage.setItem('oio_user_name', email.split('@')[0]);
                    location.reload(); // Reinicia para aplicar as camadas
                }
            };
        }
    }
};

// Dispara o boot
AppInit.start();
