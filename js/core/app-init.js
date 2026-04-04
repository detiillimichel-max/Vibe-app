// OIO ONE - CORE SYSTEM 💎 (Versão Michel Reforçada)

const portal = document.getElementById('portal-layer');
const app = document.getElementById('app-layer');
const btnEntrar = document.getElementById('btn-entrar');

if (btnEntrar) {
    btnEntrar.onclick = async () => {
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();

        if (!email || !pass) return alert("Preencha os campos!");

        btnEntrar.innerText = "Sincronizando...";

        try {
            // ✅ Conecta direto com o banco que você configurou
            let { data: user } = await window.supabase
                .from('profiles')
                .select('*')
                .eq('email', email)
                .maybeSingle();

            if (user && user.password === pass) {
                localStorage.setItem('oio_user_name', user.username || email);
                localStorage.setItem('oio_user_email', email);
                
                // 🚀 FORÇA A TROCA DE TELA (Isso resolve a tela preta)
                if (portal) portal.style.display = 'none';
                if (app) {
                    app.style.display = 'block';
                    app.style.visibility = 'visible';
                }
                
                carregarModulo('origin');
            } else {
                alert("Usuário ou senha incorretos!");
                btnEntrar.innerText = "ACESSAR UNIVERSO";
            }
        } catch (err) {
            alert("Erro de conexão com o banco!");
            btnEntrar.innerText = "ACESSAR UNIVERSO";
        }
    };
}

async function carregarModulo(nomeModulo) {
    const display = document.getElementById('universe-display');
    if (!display) return;
    
    display.innerHTML = '<div style="padding:50px; text-align:center; color:#1877f2;">Conectando ao Universo...</div>';
    try {
        const caminho = `../modules/${nomeModulo}/controller.js`;
        const mod = await import(caminho);
        const controller = mod[Object.keys(mod)[0]] || mod.default;
        if (controller && controller.init) await controller.init();
    } catch (e) {
        display.innerHTML = `<p style="text-align:center; padding:50px; color:#444;">Módulo offline.</p>`;
    }
}
