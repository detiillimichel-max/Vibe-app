// OIO ONE - CORE SYSTEM (PORTEIRO INTELIGENTE) 💎
const display = document.getElementById('universe-display');
const portal = document.getElementById('portal-layer');
const app = document.getElementById('app-layer');
const btnEntrar = document.getElementById('btn-entrar');

// 1. ACESSO AO APP
if (btnEntrar) {
    btnEntrar.onclick = () => {
        portal.classList.add('hidden');
        app.classList.remove('hidden');
        carregarModulo('friends'); // Começa pelos amigos para validar o Supabase
    };
}

// 2. CARREGADOR DE MÓDULOS (ADAPTÁVEL)
async function carregarModulo(nomeModulo) {
    display.innerHTML = '<p style="text-align:center; padding:20px;">Carregando...</p>';
    
    try {
        const caminho = `./modules/${nomeModulo}/controller.js`;
        const moduloCarregado = await import(caminho);
        
        // Aqui ele verifica todos os nomes possíveis (FriendsController, WatchController, etc)
        const chave = Object.keys(moduloCarregado)[0];
        const controller = moduloCarregado[chave];

        if (controller && typeof controller.init === 'function') {
            await controller.init();
        } else if (typeof moduloCarregado.init === 'function') {
            await moduloCarregado.init();
        } else {
            throw new Error("Função init não encontrada");
        }

    } catch (error) {
        console.error("Erro no módulo:", error);
        display.innerHTML = `
            <div style="text-align:center; padding:40px; color:#b0b3b8;">
                <i class="fas fa-tools" style="font-size:30px; margin-bottom:10px;"></i>
                <p>Módulo ${nomeModulo} em ajuste técnico.</p>
                <button onclick="location.reload()" style="background:#1877f2; border:none; color:white; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer;">Recarregar App</button>
            </div>`;
    }
}

// 3. NAVEGAÇÃO (BOTÕES SUPERIORES)
const navItems = document.querySelectorAll('.nav-item');
const rotas = ['origin', 'watch', 'friends', 'marketplace', 'notifications', 'profile'];

navItems.forEach((item, index) => {
    item.onclick = () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        carregarModulo(rotas[index]);
    };
});
