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
            if(portal) portal.style.display = 'none';
            if(app) {
                app.style.display = 'block';
                app.classList.remove('hidden');
            }
            await OriginController.init();
        } else {
            if(portal) portal.style.display = 'flex';
            this.setupLoginEvent();
        }
    },

    setupLoginEvent() {
        const btn = document.getElementById('btn-entrar');
        if (!btn) return;

        btn.onclick = async () => {
            const loginInput = document.getElementById('login-email').value.trim(); 
            const passInput = document.getElementById('login-pass').value.trim();

            if (!loginInput || !passInput) {
                alert("Preencha os campos.");
                return;
            }

            btn.innerText = "ENTRANDO...";

            try {
                const supabase = await waitForSupabase();

                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('email', loginInput) 
                    .eq('password', passInput)
                    .maybeSingle();

                if (data) {
                    localStorage.setItem('oio_user_email', data.email);
                    localStorage.setItem('oio_user_name', data.email);
                    localStorage.setItem('oio_user_id', data.id);
                    
                    location.reload();
                } else {
                    alert("Acesso negado. Verifique se o nome está igual ao banco.");
                    btn.innerText = "ACESSAR UNIVERSO";
                }
            } catch (err) {
                alert("Erro de conexão.");
                btn.innerText = "ACESSAR UNIVERSO";
            }
        };
    }
};

AppInit.start();
