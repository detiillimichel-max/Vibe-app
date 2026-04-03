import { OriginController } from '../modules/origin/controller.js';

const AppInit = {
    async start() {
        // Verifica se o usuário já está autenticado no celular
        const userName = localStorage.getItem('oio_user_name');
        
        const portal = document.getElementById('portal-layer');
        const app = document.getElementById('app-layer');

        if (userName) {
            // Se já tem o nome salvo, entra direto no App
            if(portal) portal.classList.add('hidden');
            if(app) app.classList.remove('hidden');
            
            // Inicia o conteúdo (Home/Origin)
            await OriginController.init();
        } else {
            // Se não tem nome salvo, garante que o Portal de Login apareça
            if(portal) portal.classList.remove('hidden');
            if(app) app.classList.add('hidden');
            
            this.setupLoginEvent();
        }
    },

    setupLoginEvent() {
        const btn = document.getElementById('btn-entrar');
        if (btn) {
            btn.onclick = async () => {
                // Pega os valores dos inputs (ajustados para Nome e Senha)
                const nome = document.querySelector('#login-email')?.value; // O ID pode ser email no HTML, mas pegamos o texto
                const senha = document.querySelector('#login-pass')?.value;

                if (nome && senha) {
                    // Salva no celular para não precisar logar toda hora
                    localStorage.setItem('oio_user_name', nome);
                    // Opcional: Salvar senha se for necessário para outras requisições
                    localStorage.setItem('oio_user_temp_pass', senha);
                    
                    // Recarrega para o start() acima liberar o acesso
                    location.reload(); 
                } else {
                    alert("Por favor, digite seu Nome e Senha!");
                }
            };
        }
    }
};

// Inicia o motor
AppInit.start();
