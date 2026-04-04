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
            if(portal) portal.classList.remove('hidden');
            this.setupLoginEvent();
        }
    },

    setupLoginEvent() {
        const btn = document.getElementById('btn-entrar');
        if (!btn) return;

        btn.onclick = async () => {
            const loginInformado = document.getElementById('login-email').value.trim(); 
            const senhaInformada = document.getElementById('login-pass').value.trim();

            try {
                const supabase = await waitForSupabase();

                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('email', loginInformado)  // ✅ corrigido: era 'emall'
                    .eq('password', senhaInformada)
                    .maybeSingle();

                if (data) {
                    localStorage.setItem('oio_user_email', data.email); // ✅ corrigido
                    localStorage.setItem('oio_user_name', data.email);  // ✅ corrigido
                    localStorage.setItem('oio_user_id', data.id || 1);
                    
                    location.reload();
                } else {
                    alert("Dados incorretos. Verifique o nome e a senha.");
                }
            } catch (err) {
                alert("Erro de conexão com o banco.");
            }
        };
    }
};

AppInit.start();
