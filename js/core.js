// OIO ONE - CORE SYSTEM (AUTO-REGISTRO) 💎
const display = document.getElementById('universe-display');
const portal = document.getElementById('portal-layer');
const app = document.getElementById('app-layer');
const btnEntrar = document.getElementById('btn-entrar');

if (btnEntrar) {
    btnEntrar.onclick = async () => {
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();

        if (!email || !pass) return alert("Preencha os campos!");

        btnEntrar.innerText = "Sincronizando...";

        // TENTA BUSCAR O PERFIL
        let { data: user, error } = await window.supabase
            .from('profiles')
            .select('*')
            .eq('email', email)
            .maybeSingle();

        // SE NÃO EXISTE, GRAVA NO BANCO NA HORA (AUTOCADASTRO)
        if (!user) {
            const { data: newUser, error: createError } = await window.supabase
                .from('profiles')
                .insert([{ 
                    email: email, 
                    password: pass, 
                    username: email.split('@')[0],
                    avatar_url: "https://cdn-icons-png.flaticon.com/512/149/149071.png" 
                }])
                .select()
                .single();
            user = newUser;
        }

        // VALIDA A SENHA E ENTRA NO APP
        if (user && user.password === pass) {
            localStorage.setItem('oio_user_name', user.username);
            localStorage.setItem('oio_user_avatar', user.avatar_url);
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
    display.innerHTML = '<div style="padding:50px; text-align:center;"><i class="fas fa-circle-notch fa-spin"></i></div>';
    try {
        const caminho = `./modules/${nomeModulo}/controller.js`;
        const mod = await import(caminho);
        const controller = mod[Object.keys(mod)[0]] || mod.default;
        if (controller) await controller.init();
    } catch (e) {
        display.innerHTML = `<p style="text-align:center; padding:50px; color:#444;">Módulo ${nomeModulo} indisponível.</p>`;
    }
}

const navItems = document.querySelectorAll('.nav-item');
const rotas = ['origin', 'watch', 'friends', 'market', 'notifications', 'profile'];

navItems.forEach((item, index) => {
    item.onclick = () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        carregarModulo(rotas[index]);
    };
});
