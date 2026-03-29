// OIO ONE - CORE SYSTEM 💎
const display = document.getElementById('universe-display');
const portal = document.getElementById('portal-layer');
const app = document.getElementById('app-layer');
const btnEntrar = document.getElementById('btn-entrar');

if (btnEntrar) {
    btnEntrar.onclick = async () => {
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();

        if (!email || !pass) return alert("Preencha todos os campos!");

        btnEntrar.innerText = "Sincronizando...";

        let { data: user, error } = await window.supabase
            .from('profiles')
            .select('*')
            .eq('email', email)
            .maybeSingle();

        if (!user) {
            const { data: newUser } = await window.supabase
                .from('profiles')
                .insert([{ 
                    email: email, 
                    password: pass, 
                    username: email.split('@')[0],
                    avatar_url: "https://ui-avatars.com/api/?name=" + email 
                }])
                .select().single();
            user = newUser;
        }

        if (user && user.password === pass) {
            localStorage.setItem('oio_user_name', user.username);
            localStorage.setItem('oio_user_avatar', user.avatar_url);
            localStorage.setItem('oio_user_email', email); // ✅ BUG 1
            portal.classList.add('hidden');
            app.classList.remove('hidden');
            carregarModulo('origin');
        } else {
            alert("Senha incorreta!");
            btnEntrar.innerText = "ACESSAR UNIVERSO";
        }
    };
}

async function carregarModulo(nomeModulo) {
    display.innerHTML = '<div style="padding:50px; text-align:center; color:#1877f2;"><i class="fas fa-circle-notch fa-spin fa-2x"></i></div>';
    try {
        const caminho = `./modules/${nomeModulo}/controller.js`; // ✅ CAMINHO CORRETO
        const mod = await import(caminho);
        const controller = mod[Object.keys(mod)[0]] || mod.default;
        if (controller && controller.init) await controller.init();
    } catch (e) {
        console.error("Erro ao carregar módulo:", e);
        display.innerHTML = `<p style="text-align:center; padding:50px; color:#444;">Módulo ${nomeModulo} indisponível.</p>`;
    }
}

const navItems = document.querySelectorAll('.nav-item');
const rotas = ['origin', 'watch', 'friends', 'marketplace', 'notifications', 'profile'];

navItems.forEach((item, index) => {
    item.onclick = () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        carregarModulo(rotas[index]);
    };
});
