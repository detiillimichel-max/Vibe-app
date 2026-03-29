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
                    <input id="prod-titulo" placeholder="O que você está vendendo?" style="width:100%; background:#3a3b3c; border:none; padding:12px; border-radius:8px; color:white; margin-bottom:10px; box-sizing:border-box;">
                    <input id="prod-preco" placeholder="Preço (ex: R$ 450)" style="width:100%; background:#3a3b3c; border:none; padding:12px; border-radius:8px; color:white; margin-bottom:10px; box-sizing:border-box;">
                    
                    <!-- BOTÃO DE FOTO REAL -->
                    <div style="margin-bottom:10px;">
                        <input type="file" id="prod-foto-file" style="display:none;" accept="image/*">
                        <button id="btn-escolher-foto" style="width:100%; background:#3a3b3c; color:#b0b3b8; border:1px dashed #555; padding:12px; border-radius:8px; cursor:pointer;">
                            📸 Selecionar Foto do Produto
                        </button>
                        <div id="preview-area" style="display:none; margin-top:10px; text-align:center;">
                            <img id="img-preview" style="width:100px; height:100px; object-fit:cover; border-radius:8px; border:2px solid #1877f2;">
                        </div>
                    </div>

                    <textarea id="prod-descricao" placeholder="Descrição do produto" style="width:100%; background:#3a3b3c; border:none; padding:12px; border-radius:8px; color:white; margin-bottom:10px; box-sizing:border-box; resize:none; height:80px;"></textarea>
                    <button id="btn-publicar" style="width:100%; background:#2ecc71; color:white; border:none; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer;">Publicar Anúncio</button>
                </div>

                <div id="lista-produtos" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <p style="grid-column:span 2; text-align:center; color:#666;">Carregando anúncios...</p>
                </div>
            </div>
        `;

        const fileInput = document.getElementById('prod-foto-file');
        const btnFoto = document.getElementById('btn-escolher-foto');
        const imgPreview = document.getElementById('img-preview');
        const previewArea = document.getElementById('preview-area');

        // Gatilho do input de arquivo
        btnFoto.onclick = () => fileInput.click();

        // Mostrar preview da foto selecionada
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    imgPreview.src = ev.target.result;
                    previewArea.style.display = 'block';
                    btnFoto.innerText = "📸 Foto selecionada!";
                };
                reader.readAsDataURL(file);
            }
        };

        document.getElementById('btn-novo-produto').onclick = () => {
            const form = document.getElementById('form-produto');
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        };

        // Lógica de Publicar com Upload
        document.getElementById('btn-publicar').onclick = async () => {
            const titulo = document.getElementById('prod-titulo').value.trim();
            const preco = document.getElementById('prod-preco').value.trim();
            const descricao = document.getElementById('prod-descricao').value.trim();
            const foto = fileInput.files[0];

            if (!titulo || !preco) return alert('Título e preço são obrigatórios!');

            const btn = document.getElementById('btn-publicar');
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            let publicUrl = null;

            // 1. Faz upload da foto se houver uma
            if (foto) {
                const fileName = `prod_${Date.now()}`;
                const { data: uploadData, error: uploadError } = await window.supabase.storage
                    .from('products')
                    .upload(fileName, foto);

                if (uploadError) {
                    alert('Erro no upload da imagem: ' + uploadError.message);
                } else {
                    const { data } = window.supabase.storage.from('products').getPublicUrl(fileName);
                    publicUrl = data.publicUrl;
                }
            }

            // 2. Insere os dados no banco
            const { error } = await window.supabase
                .from('products')
                .insert([{
                    title: titulo,
                    price: preco,
                    image_url: publicUrl,
                    description: descricao || null
                }]);

            if (!error) {
                document.getElementById('form-produto').style.display = 'none';
                previewArea.style.display = 'none';
                fileInput.value = "";
                btnFoto.innerText = "📸 Selecionar Foto do Produto";
                await MarketplaceController.loadProdutos();
            } else {
                alert('Erro ao salvar anúncio: ' + error.message);
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
            lista.innerHTML = `<p style="grid-column:span 2; text-align:center; color:#666; padding:40px;">Nenhum anúncio disponível.</p>`;
            return;
        }

        lista.innerHTML = produtos.map(p => `
            <div style="background:#242526; border-radius:8px; overflow:hidden; border:1px solid #3a3b3c;">
                <div style="width:100%; aspect-ratio:1/1; background:#1c1e21; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                    <img src="${p.image_url || 'https://via.placeholder.com/200x200?text=OIO'}" 
                        style="width:100%; height:100%; object-fit:cover;"
                        onerror="this.src='https://via.placeholder.com/200x200?text=Erro+Imagem'">
                </div>
                <div style="padding:10px;">
                    <div style="font-weight:bold; font-size:15px; color:#2ecc71;">${p.price}</div>
                    <div style="font-size:13px; color:#e4e6eb; margin-top:2px; font-weight:600;">${p.title}</div>
                    ${p.description ? `<div style="font-size:11px; color:#b0b3b8; margin-top:4px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${p.description}</div>` : ''}
                </div>
            </div>
        `).join('');
    }
};
