document.querySelectorAll('button[data-bloco]').forEach(button => {
    button.addEventListener('click', () => {
        const bloco = button.getAttribute('data-bloco');
        carregarModulo(bloco);
    });
});

async function carregarModulo(nome) {
    const appContainer = document.getElementById('app');
    const gridMenu = document.querySelector('.grid');
    const headerPrincipal = document.querySelector('header');

    // Efeito de saída
    gridMenu.classList.add('fade-out');
    
    try {
        // Busca o index.html dentro da pasta do bloco (ex: bloco-2-watch/index.html)
        const response = await fetch(`./bloco-${getNumeroBloco(nome)}-${nome}/index.html`);
        const html = await response.text();
        
        // Esconde o menu e mostra o módulo
        gridMenu.style.display = 'none';
        headerPrincipal.style.display = 'none';
        
        appContainer.innerHTML = html;
        appContainer.classList.add('fade-in');

        // Executa scripts internos do módulo se houver
        const scripts = appContainer.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement("script");
            newScript.text = oldScript.text;
            document.body.appendChild(newScript);
        });

    } catch (error) {
        console.error("Erro ao carregar módulo:", error);
        alert("Erro ao abrir o módulo " + nome);
    }
}

function getNumeroBloco(nome) {
    const mapeamento = {
        'home': '1', 'watch': '2', 'friends': '3', 
        'market': '4', 'alerts': '5', 'menu': '6'
    };
    return mapeamento[nome];
}
