// OIO ONE - CORE SYSTEM (SEGURANÇA TOTAL) 💎
const display = document.getElementById('universe-display');
const portal = document.getElementById('portal-layer');
const app = document.getElementById('app-layer');
const btnEntrar = document.getElementById('btn-entrar');
const loginError = document.getElementById('login-error');

// 1. LÓGICA DE LOGIN REAL
if (btnEntrar) {
    btnEntrar.onclick = async () => {
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();

        if (!email || !pass) {
            alert("Preencha todos os campos.");
            return;
        }

        btnEntrar.innerText = "VERIFICANDO...";
        btnEntrar.disabled = true;

        // Busca o usuário no banco (tabela profiles)
        const { data: user, error } = await window.supabase
            .from('profiles')
            .select('*')
            .eq('email', email)
            .eq('password', pass) // No futuro usaremos Auth real, mas aqui resolve agora
            .single();

        if (user && !error) {
            // SUCESSO: Salva os dados dele na sessão local
            localStorage.setItem('oio_user_name', user.username);
            localStorage.setItem('oio_user_avatar', user.avatar_url);
            
            portal.classList.add('hidden');
            app.classList.remove('hidden');
            carregarModulo('origin');
        } else {
            // ERRO: Não deixa entrar
            loginError.classList.remove('hidden');
            btnEntrar.innerText = "ACESSAR UNIVERSO";
            btnEntrar.disabled = false;
        }
    };
}

// 2. CARREGADOR DE MÓDULOS
async function carregarModulo(nomeModulo) {
    display.innerHTML = '<div style="padding:50px; text-align:center; color:#555;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    try {
        const caminho = `./modules/${nomeModulo}/controller.js`;
        const moduloCarregado = await import(caminho);
        const controller = moduloCarregado[Object.keys(moduloCarregado)[0]] || moduloCarregado.default;

        if (controller && typeof controller.init === 'function') {
            await controller.init();
        }
    } catch (e) {
        console.error(e);
        display.innerHTML = `<p style="text-align:center; color:#444; margin-top:50px;">Módulo ${nomeModulo} em manutenção.</p>`;
    }
}

// 3. NAVEGAÇÃO
const navItems = document.querySelectorAll('.nav-item');
const rotas = ['origin', 'watch', 'friends', 'market', 'notifications', 'profile'];

navItems.forEach((item, index) => {
    item.onclick = () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        carregarModulo(rotas[index]);
    };
});
