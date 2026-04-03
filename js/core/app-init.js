import { OriginController } from '../modules/origin/controller.js';

// Função para garantir que o Supabase está pronto antes de tentar o login
function waitForSupabase() {
    return new Promise((resolve) => {
        const check = () => {
            if (window.supabase) resolve(window.supabase);
            else requestAnimationFrame(check);
        };
        check();
    });
}

const AppInit = {
    async start() {
        const userName = localStorage.getItem('oio_user_name');
        const portal = document.getElementById('portal-layer');
        const app = document.getElementById('app-layer');

        if (userName) {
            // Se já estiver logado, esconde o portal e inicia o app
            if(portal) portal.classList.add('hidden');
            if(app) app.classList.remove('hidden');
            await OriginController.init();
        } else {
            // Se não estiver logado, mostra o portal e configura o botão
            if(portal) {
                portal.classList.remove('hidden');
                portal.style.display = 'flex';
            }
            if(app) app.classList.add('hidden');
            this.setupLoginEvent();
        }
    },

    setupLoginEvent() {
        const btn = document.getElementById('btn-entrar');
        if (!btn) return;

        btn.onclick = async () => {
            const nome = document.getElementById('login-email').value; // Seu input de nome
            const senha = document.getElementById('login-pass').value; // Seu input de senha

            if (!nome || !senha) {
                alert("Por favor, preencha Nome e Senha.");
                return;
            }

            btn.innerText = "VALIDANDO...";

            try {
                const supabase = await waitForSupabase();

                // Busca o usuário na tabela 'profiles' comparando Nome e Senha
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('username', nome)
                    .eq('password', senha)
                    .single();

                if (data) {
                    // Login Sucesso: Guarda no celular e recarrega
                    localStorage.setItem('oio_user_name', data.username);
                    localStorage.setItem('oio_user_id', data.id);
                    location.reload();
                } else {
                    alert("Dados incorretos. Verifique o nome e a senha (ex: 9927).");
                    btn.innerText = "ACESSAR UNIVERSO";
                }
            } catch (err) {
                console.error(err);
                alert("Erro de conexão com o Universo.");
                btn.innerText = "ACESSAR UNIVERSO";
            }
        };
    }
};

// Inicia o processo
AppInit.start();
