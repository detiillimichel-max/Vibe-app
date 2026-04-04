const AppInit = {
    async start() {
        const userEmail = localStorage.getItem('oio_user_email');
        const portal = document.getElementById('portal-layer');
        const app = document.getElementById('app-layer');

        if (userEmail) {
            portal.style.display = 'none';
            app.style.display = 'block';
            console.log("Usuário já logado.");
        } else {
            this.setupLoginEvent();
        }
    },

    setupLoginEvent() {
        const btn = document.getElementById('btn-entrar');
        if (!btn) return;

        btn.onclick = async () => {
            const user = document.getElementById('login-email').value.trim();
            const pass = document.getElementById('login-pass').value.trim();

            btn.innerText = "VERIFICANDO...";

            try {
                // ✅ Busca exata no banco
                const { data, error } = await window.supabase
                    .from('profiles')
                    .select('*')
                    .eq('email', user)
                    .eq('password', pass)
                    .maybeSingle();

                if (data) {
                    localStorage.setItem('oio_user_email', data.email);
                    location.reload();
                } else {
                    alert("Acesso negado. Verifique os dados.");
                    btn.innerText = "ACESSAR UNIVERSO";
                }
            } catch (err) {
                alert("Erro de conexão com o Supabase.");
                btn.innerText = "ACESSAR UNIVERSO";
            }
        };
    }
};

// Inicia o processo
AppInit.start();
