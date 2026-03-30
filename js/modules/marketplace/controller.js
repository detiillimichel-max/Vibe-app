export const MarketplaceController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        display.innerHTML = `
            <div style="max-width:600px; margin:0 auto; color:#e4e6eb; padding:15px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <h2 style="margin:0;">Marketplace</h2>
                    <button id="btn-novo-produto" style="background:#1877f2; color:white; border:none; padding:10px 16px; border-radius:20px; font-weight:bold; cursor:pointer;">
                        + Anunciar
                    </button>
                </div>

                <!-- FORMULÁRIO DE ANÚNCIO -->
                <div id="form-produto" style="display:none; background:#242526; padding:15px; border-radius:12px; margin-bottom:20px; border:1px solid #3a3b3c;">
                    <input id="prod-titulo" placeholder="Título do produto" style="width:100%; background:#3a3b3c; border:none; padding:12px; border-radius:8px; color:white; margin-bottom:10px; box-sizing:border-box;">
                    <input id="prod-preco" placeholder="Preço (ex: R$ 150)" style="width:100%; background:#3a3b3c; border:none; padding:12px; border-radius:8px; color:white; margin-bottom:10px; box-sizing:border-box;">
                    <input id="prod-imagem" placeholder="URL da imagem" style="width:100%; background:#3a3b3c; border:none; padding:12px; border-radius:8px; color:white; margin-bottom:10px; box-sizing:border-box;">
                    <textarea id="prod-descricao" placeholder="Descrição do produto" style="width:100%; background:#3a3b3c; border:none; padding:12px; border-radius:8px; color:white; margin-bottom:10px; box-sizing:border-box; resize:none; height:80px;"></textarea>
                    <button id="btn-publicar" style="width:100%; background:#2ecc71; color:white; border:none; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer;">Publicar Anúncio</button>
                </div>

                <!-- LISTA DE PRODUTOS -->
                <div id="lista-produtos" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <p style="grid-column:span 2; text-align:center; color:#666;">Carregando anúncios...</p>
                </div>
            </div>
        `;

        document.getElementById('btn-novo-produto').onclick = () => {
            const form = document.getElementById('form-produto');
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        };

        document.getElementById('btn-publicar').onclick = async () => {
            const titulo = document.getElementById('prod-titulo').value.trim();
            const preco = document.getElementById('prod-preco').value.trim();
            const imagem = document.getElementById('prod-imagem').value.trim();
            const descricao = document.getElementById('prod-descricao').value.trim();

            if (!titulo || !preco) return alert('Título e preço são obrigatórios!');

            const btn = document.getElementById('btn-publicar');
            btn.innerText = 'Publicando...';
            btn.disabled = true;

            // Salva o nome do vendedor junto com o produto
            const nomeVendedor = localStorage.getItem('oio_user_name') || 'Vendedor OIO';

            const { error } = await window.supabase
                .from('products')
                .insert([{
                    title: titulo,
                    price: preco,
                    image_url: imagem || null,
                    description: descricao || null,
                    seller_name: nomeVendedor // ✅ salva o nome para contato
                }]);

            if (!error) {
                document.getElementById('form-produto').style.display = 'none';
                ['prod-titulo','prod-preco','prod-imagem','prod-descricao']
                    .forEach(id => document.getElementById(id).value = '');
                await MarketplaceController.loadProdutos();
            } else {
                alert('Erro ao publicar: ' + error.message);
            }

            btn.innerText = 'Publicar Anúncio';
            btn.disabled = false;
        };

        await MarketplaceController.loadProdutos();
    },

    async loadProdutos() {
        const lista = document.getElementById('lista-produtos');
        if (!lista) return;

        const { data: produtos, error } = await window.supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error || !produtos || produtos.length === 0) {
            lista.innerHTML = `<p style="grid-column:span 2; text-align:center; color:#666; padding:40px;">Nenhum anúncio ainda. Seja o primeiro!</p>`;
            return;
        }

        lista.innerHTML = produtos.map(p => `
            <div style="background:#242526; border-radius:12px; overflow:hidden; border:1px solid #3a3b3c;">
                <img src="${p.image_url || 'https://via.placeholder.com/200x200?text=OIO'}" 
                    style="width:100%; aspect-ratio:1/1; object-fit:cover;"
                    onerror="this.src='https://via.placeholder.com/200x200?text=OIO'">
                <div style="padding:10px;">
                    <div style="font-weight:bold; font-size:15px; color:#e4e6eb;">${p.price}</div>
                    <div style="font-size:13px; color:#b0b3b8; margin-top:2px;">${p.title}</div>
                    ${p.description ? `<div style="font-size:11px; color:#666; margin-top:4px;">${p.description}</div>` : ''}
                    
                    <!-- ✅ BOTÃO DE CONTATO COM VENDEDOR -->
                    ${p.seller_name ? `
                    <button onclick="window.contatarVendedor('${p.seller_name}', '${p.title}')"
                        style="width:100%; margin-top:10px; background:#1877f2; color:white; border:none; padding:8px; border-radius:8px; font-weight:bold; cursor:pointer; font-size:12px;">
                        💬 Contatar ${p.seller_name.split(' ')[0]}
                    </button>` : ''}
                </div>
            </div>
        `).join('');
    }
};

// ✅ FUNÇÃO DE CONTATO — envia mensagem direto pela tabela messages
window.contatarVendedor = async (nomeVendedor, tituloProduto) => {
    const meuNome = localStorage.getItem('oio_user_name');

    if (meuNome === nomeVendedor) {
        alert('Este anúncio é seu!');
        return;
    }

    const msg = prompt(`Enviar mensagem para ${nomeVendedor} sobre "${tituloProduto}":`);
    if (!msg || msg.trim() === '') return;

    const { error } = await window.supabase
        .from('messages')
        .insert([{
            sender_id: meuNome,
            receiver_id: nomeVendedor,
            content: msg.trim(),
            type: 'text'
        }]);

    if (!error) {
        alert(`✅ Mensagem enviada para ${nomeVendedor}!`);
    } else {
        alert('Erro ao enviar: ' + error.message);
    }
};
