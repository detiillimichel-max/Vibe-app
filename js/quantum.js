    async switchUniverse(id, element) {
        const display = document.getElementById('universe-display');
        const navItems = document.querySelectorAll('.nav-item');

        // 1. Estilo do ícone ativo
        navItems.forEach(i => i.classList.remove('active'));
        if(element) element.classList.add('active');

        // 2. Tela de "Carregando" premium
        display.innerHTML = `
            <div style="display: flex; height: 80vh; align-items: center; justify-content: center; flex-direction: column; color: white;">
                <i class="fa-solid fa-atom fa-spin" style="font-size: 40px; color: #1877f2;"></i>
                <p style="margin-top: 20px; letter-spacing: 2px; font-size: 10px; opacity: 0.5;">CONECTANDO AO MÓDULO ${id.toUpperCase()}...</p>
            </div>`;

        try {
            // 3. BUSCA O CONTEÚDO REAL (Ex: data/origin-feed.json)
            // Ajuste o caminho se suas pastas forem diferentes
            const response = await fetch(`data/${id}-feed.json`);
            if (!response.ok) throw new Error("Arquivo não encontrado");
            
            const conteudo = await response.json();

            // 4. DESENHA O CONTEÚDO NA TELA
            display.innerHTML = ''; // Limpa o "Carregando"
            
            conteudo.forEach(item => {
                const card = document.createElement('div');
                card.className = 'quantum-card'; // Use seu CSS dna.css
                card.innerHTML = `
                    <div style="background: rgba(255,255,255,0.05); margin: 15px; border-radius: 15px; padding: 15px; border: 1px solid rgba(255,255,255,0.1);">
                        <h3 style="color: #fff; font-size: 14px;">${item.titulo || 'OIO Post'}</h3>
                        <p style="color: #ccc; font-size: 12px; margin-top: 8px;">${item.descricao || item.texto}</p>
                        ${item.imagem ? `<img src="${item.imagem}" style="width:100%; border-radius:10px; margin-top:10px;">` : ''}
                    </div>
                `;
                display.appendChild(card);
            });

        } catch (erro) {
            // Se não tiver o arquivo .json ainda, ele mostra o aviso
            display.innerHTML = `
                <div style="padding: 40px; text-align: center; color: rgba(255,255,255,0.3);">
                    <i class="fa-solid fa-folder-open" style="font-size: 30px;"></i>
                    <p style="margin-top:10px;">Módulo ${id.toUpperCase()} vazio ou em manutenção.</p>
                </div>`;
            console.log("Erro ao carregar módulo:", erro);
        }
    }
