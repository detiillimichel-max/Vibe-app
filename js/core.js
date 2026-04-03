// CONFIGURAÇÃO DO UNIVERSO OIO ONE
const SUPABASE_URL = 'https://uqdwtzlkqaosnweyoyit.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uafBQD1aJ3w8_eq4meOsNQ_wzk8TwhA';

// Inicializa o cliente globalmente
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const App = {
    init() {
        const portal = document.getElementById('portal-layer');
        const app = document.getElementById('app-layer');
        const userSalvo = localStorage.getItem('oio_user_name');

        // Fluxo de Entrada
        if (userSalvo) {
            portal?.classList.add('hidden');
            app?.classList.remove('hidden');
            console.log("Sistema Pronto. Bem-vindo, " + userSalvo);
        } else {
            this.setupLogin();
        }
    },

    setupLogin() {
        const btn = document.getElementById('btn-entrar');
        if (!btn) return;

        btn.onclick = async () => {
            const userDigitado = document.getElementById('login-user')?.value || document.getElementById('login-email')?.value;
            const passDigitada = document.getElementById('login-pass')?.value;

            if (!userDigitado || !passDigitada) {
                alert("Digite seu Nome e Senha!");
                return;
            }

            btn.innerText = "CONECTANDO...";

            try {
                // Validação direta na tabela 'profiles'
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('username', userDigitado)
                    .eq('password', passDigitada)
                    .single();

                if (data) {
                    localStorage.setItem('oio_user_name', data.username);
                    localStorage.setItem('oio_user_id', data.id);
                    location.reload(); // Recarrega para entrar no App
                } else {
                    alert("Usuário ou Senha incorretos!");
                    btn.innerText = "ACESSAR UNIVERSO";
                }
            } catch (err) {
                console.error(err);
                alert("Erro de conexão com o Supabase.");
                btn.innerText = "ACESSAR UNIVERSO";
            }
        };
    }
};

// Dispara quando o navegador terminar de carregar
window.onload = () => App.init();
