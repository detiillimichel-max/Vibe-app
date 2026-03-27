/**
 * OIO ONE - CORE ENGINE
 * Gerenciador de Autenticação e Inicialização de Camadas.
 * Regra: Sem nomes fixos. Processamento dinâmico de objetos.
 */

import { OriginController } from './modules/origin/controller.js';
import { Logger } from './services/Logger.js';

const CoreEngine = {
    init() {
        const btnEntrar = document.getElementById('btn-entrar');
        
        if (btnEntrar) {
            btnEntrar.addEventListener('click', () => this.handleLogin());
        } else {
            Logger.error("Botão 'btn-entrar' não localizado no DOM.");
        }
    },

    handleLogin() {
        // Captura os dados inseridos pelo usuário no Portal
        const emailInput = document.getElementById('user-email');
        const passInput = document.getElementById('user-pass'); // Campo de senha conforme sua regra
        
        if (!emailInput || !passInput) {
            Logger.error("Campos de entrada não encontrados.");
            return;
        }

        const email = emailInput.value.trim();
        const password = passInput.value.trim();

        // Validação mínima para liberar o acesso ao ecossistema
        if (email.length > 2 && password.length > 0) {
            this.unlockApp(email);
        } else {
            Logger.info("Tentativa de acesso negada: Credenciais incompletas.");
        }
    },

    unlockApp(userIdentifier) {
        // 1. Gerencia a transição visual das camadas (DNA.css)
        const portal = document.getElementById('portal-layer');
        const app = document.getElementById('app-layer');

        if (portal && app) {
            portal.classList.add('hidden');
            app.classList.remove('hidden');
        }

        // 2. Registra o usuário na interface de forma dinâmica (Hub/Perfil)
        const displayTarget = document.getElementById('user-display-name');
        if (displayTarget) {
            displayTarget.innerText = userIdentifier.split('@')[0].toUpperCase();
        }

        // 3. DISPARO: Inicializa o módulo Origin (A Casinha)
        Logger.info("OIO ONE: Sistema Orgânico Iniciado via Core.");
        OriginController.init();
    }
};

// Inicializa o motor assim que o script for carregado
document.addEventListener('DOMContentLoaded', () => CoreEngine.init());
