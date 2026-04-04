import { OriginController } from '../modules/origin/controller.js';

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
        const userEmail = localStorage.getItem('oio_user_email');
        const portal = document.getElementById('portal-layer');
        const app = document.getElementById('app-layer');

        if (userEmail) {
            if(portal) portal.classList.add('hidden');
            if(app) app.classList.remove('hidden');
            await OriginController.init();
        } else {
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
            const emailDigitado = document.getElementById('login-email').value.trim(); 
            const senhaDigitada = document.getElementById('login-pass').value.trim();

            if (!emailDigitado || !senhaDigitada) {
                alert("Por favor, preencha os dados.");
                return;
            }

            btn.innerText = "VALIDANDO...";

            try {
                const supabase = await waitForSupabase();

                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('email', emailDigitado) 
                    .eq('password', senhaDigitada)
                    .maybeSingle();

                if (data && data.password === senhaDigitada) {
                    // Guarda os dados conforme o que está no seu banco agora
                    localStorage.setItem('oio_user_email', data.email);
                    localStorage.setItem('oio_user_name', data.email);
                    localStorage.setItem('oio_user_id', data.id || data.email);
                    
                    if (window.OioSound) window.OioSound.post();

                    location.reload();
                } else {
                    alert("Acesso Negado: Verifique se digitou o nome e número exatamente como no banco.");
                    btn.innerText = "ACESSAR UNIVERSO";
                }
            } catch (err) {
                console.error(err);
                alert("Erro de conexão.");
                btn.innerText = "ACESSAR UNIVERSO";
            }
        };
    }
};

AppInit.start();
