// OIO ONE - PORTEIRO DE LUXO (CORE) 💎
const display = document.getElementById('universe-display');
const portal = document.getElementById('portal-layer');
const app = document.getElementById('app-layer');
const btnEntrar = document.getElementById('btn-entrar');

// 1. ACESSO AO ECOSSISTEMA
btnEntrar.onclick = () => {
    portal.classList.add('hidden');
    app.classList.remove('hidden');
    carregarModulo('origin'); // Começa na Home (Origin)
};

// 2. FUNÇÃO MESTRA DE INJEÇÃO (INQUEBRÁVEL)
async function carregarModulo(nomeModulo) {
    display.innerHTML = '<p style="text-align:center; padding:20px;">Carregando Módulo...</p>';
    
    try {
        // Tenta importar o código específico da pasta do módulo
        const modulo = await import(`./modules/${nomeModulo}/controller.js`);
        modulo.init(display); 
    } catch (error) {
        console.error(`Erro ao carregar o módulo ${nomeModulo}:`, error);
        display.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <p>Módulo ${nomeModulo} em manutenção.</p>
                <button onclick="location.reload()" style="background:#1877f2; border:none; color:white; padding:10px; border-radius:5px;">Recarregar</button>
            </div>`;
    }
}

// 3. NAVEGAÇÃO ENTRE MÓDULOS
const navItems = document.querySelectorAll('.nav-item');
const rotas = ['origin', 'watch', 'friends', 'marketplace', 'notifications', 'profile'];

navItems.forEach((item, index) => {
    item.onclick = () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        carregarModulo(rotas[index]);
    };
});
