// OIO ONE - CORE SYSTEM (PORTEIRO DINÂMICO) 💎
const display = document.getElementById('universe-display');
const portal = document.getElementById('portal-layer');
const app = document.getElementById('app-layer');
const btnEntrar = document.getElementById('btn-entrar');

// 1. ACESSO AO APP COM CAPTURA DE NOME
if (btnEntrar) {
    btnEntrar.onclick = () => {
        // Pergunta o nome do usuário antes de entrar
        let nomeUsuario = prompt("Bem-vindo ao OIO. Qual o seu nome?");
        
        // Se ele não digitar nada, vira "Membro OIO"
        if (!nomeUsuario || nomeUsuario.trim() === "") {
            nomeUsuario = "Membro OIO";
        }

        // SALVA NA MOCHILA: Agora a Home (Origin) vai ler esse nome!
        localStorage.setItem('oio_user_name', nomeUsuario);
        
        portal.classList.add('hidden');
        app.classList.remove('hidden');
        carregarModulo('origin'); 
    };
}

// 2. CARREGADOR DE MÓDULOS
async function carregarModulo(nomeModulo) {
    display.innerHTML = '<p style="text-align:center; padding:20px; color: #888;">Conectando...</p>';
    
    try {
        const caminho = `./modules/${nomeModulo}/controller.js`;
        const moduloCarregado = await import(caminho);
        
        // Procura pelo Controller (aceita OriginController ou export default)
        const chave = Object.keys(moduloCarregado)[0];
        const controller = moduloCarregado[chave] || moduloCarregado.default;

        if (controller && typeof controller.init === 'function') {
            await controller.init();
        } else {
            throw new Error("Controller não encontrado");
        }

    } catch (error) {
        console.error("Erro:", error);
        display.innerHTML = `<div style="text-align:center; padding:40px; color:#666;">Módulo ${nomeModulo} em ajuste.</div>`;
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
