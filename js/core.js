// OIO ONE - CORE SYSTEM (PORTEIRO INTELIGENTE) 💎 - VERSÃO FINAL SEM REMENDOS
const display = document.getElementById('universe-display');
const portal = document.getElementById('portal-layer');
const app = document.getElementById('app-layer');
const btnEntrar = document.getElementById('btn-entrar');

// 1. ACESSO AO APP (CORRIGIDO PARA COMECAR NA HOME/ORIGIN)
if (btnEntrar) {
    btnEntrar.onclick = () => {
        portal.classList.add('hidden');
        app.classList.remove('hidden');
        // Mudança crucial: Começa na Origin para bater com o ícone azul da Home
        carregarModulo('origin'); 
    };
}

// 2. CARREGADOR DE MÓDULOS (ADAPTÁVEL)
async function carregarModulo(nomeModulo) {
    display.innerHTML = '<p style="text-align:center; padding:20px; color: #888;">Iniciando Universo OIO...</p>';
    
    try {
        const caminho = `./modules/${nomeModulo}/controller.js`;
        const moduloCarregado = await import(caminho);
        
        // Busca o Controller dinamicamente (OriginController, FriendsController, etc)
        const chave = Object.keys(moduloCarregado)[0];
        const controller = moduloCarregado[chave];

        if (controller && typeof controller.init === 'function') {
            await controller.init();
        } else if (typeof moduloCarregado.init === 'function') {
            await moduloCarregado.init();
        } else {
            throw new Error("Função init não encontrada no módulo " + nomeModulo);
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

// 3. NAVEGAÇÃO (SINCRONIZADA COM AS PASTAS DO CELULAR)
const navItems = document.querySelectorAll('.nav-item');
// Nomes das rotas devem ser IGUAIS aos nomes das suas pastas
const rotas = ['origin', 'watch', 'friends', 'market', 'notifications', 'profile'];

navItems.forEach((item, index) => {
    item.onclick = () => {
        // Estilo visual do botão ativo
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Chama a pasta correta baseada no clique
        carregarModulo(rotas[index]);
    };
});
