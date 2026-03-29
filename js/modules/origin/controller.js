// OIO ORIGIN - FEED DINÂMICO COM UPLOAD DE FOTO 💎📸
export const OriginController = {
    init: async () => {
        const display = document.getElementById('universe-display');
        
        // Pega os dados do usuário
        const userName = localStorage.getItem('oio_user_name') || 'Explorador';
        const userAvatar = localStorage.getItem('oio_user_avatar') || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
        const userEmail = localStorage.getItem('oio_user_email'); // Precisamos disso para identificar no banco

        display.innerHTML = `
            <div style="padding: 15px; max-width: 600px; margin: 0 auto;">
                
                <!-- INPUT ESCONDIDO PARA GALERIA -->
                <input type="file" id="avatar-input" style="display: none;" accept="image/*">

                <!-- CARD DE PERFIL COM GATILHO NA FOTO -->
                <div style="background: #1c1e21; padding: 15px; border-radius: 15px; display: flex; align-items: center; margin-bottom: 20px; border: 1px solid #333;">
                    <img id="btn-foto" src="${userAvatar}" 
                        style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #1877f2; margin-right: 15px; cursor: pointer; transition: 0.3s;" 
                        title="Clique para mudar a foto">
                    <div>
                        <div style="font-weight: bold; font-size: 18px;">${userName}</div>
                        <div style="color: #1877f2; font-size: 10px; font-weight: bold; letter-spacing: 1px;">OIO VERIFIED</div>
                    </div>
                </div>

                <!-- CAMPO DE POSTAGEM -->
                <div style="background: #1c1e21; padding: 20px; border-radius: 15px; border: 1px solid #333; margin-bottom: 20px;">
                    <textarea id="post-text" placeholder="O que há de novo, ${userName.split(' ')[0]}?" 
                        style="width: 100%; background: transparent; border: none; color: white; font-size: 18px; outline: none; resize: none; min-height: 80px;"></textarea>
                    <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
                        <button id="btn-postar" style="background: #1877f2; color: white; border: none; padding: 10px 30px; border-radius: 20px; font-weight: bold; cursor: pointer;">Postar</button>
                    </div>
                </div>

                <!-- ÁREA DOS POSTS -->
                <div id="feed-container"></div>
            </div>
        `;

        // --- LÓGICA DO CLIQUE NA FOTO (ABRIR GALERIA) ---
        const btnFoto = document.getElementById('btn-foto');
        const inputFoto = document.getElementById('avatar-input');

        btnFoto.onclick = () => inputFoto.click();

        inputFoto.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            btnFoto.style.opacity = "0.3"; // Efeito visual de carregando

            // 1. Nome único para o arquivo
            const fileName = `avatar_${Date.now()}_${userName.replace(/\s/g, '')}`;

            // 2. Sobe para o Storage do Supabase (O Balde 'avatars' que você criou)
            const { data, error: uploadError } = await window.supabase.storage
                .from('avatars')
                .upload(fileName, file);

            if (uploadError) {
                alert("Erro ao subir foto: " + uploadError.message);
                btnFoto.style.opacity = "1";
                return;
            }

            // 3. Pega o Link Público da foto
            const { data: { publicUrl } } = window.supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            // 4. Salva o link na tabela 'profiles' do usuário atual
            await window.supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('email', userEmail);

            // 5. Atualiza o celular (LocalStorage) e recarrega
            localStorage.setItem('oio_user_avatar', publicUrl);
            location.reload(); 
        };

        // --- LÓGICA DO BOTÃO POSTAR ---
        const btn = document.getElementById('btn-postar');
        const text = document.getElementById('post-text');

        btn.onclick = async () => {
            const conteudo = text.value.trim();
            if (!conteudo) return;

            btn.innerText = "...";
            btn.disabled = true;

            const { error } = await window.supabase
                .from('posts')
                .insert([{ 
                    author_name: userName, 
                    author_avatar: localStorage.getItem('oio_user_avatar') || userAvatar, 
                    content: conteudo 
                }]);

            if (!error) {
                text.value = "";
                btn.innerText = "Postar";
                btn.disabled = false;
                OriginController.loadPosts(); 
            }
        };

        OriginController.loadPosts();
    },

    loadPosts: async () => {
        const feed = document.getElementById('feed-container');
        const { data: posts, error } = await window.supabase
            .from('posts')
            .select('*')
            .order('id', { ascending: false });

        if (posts) {
            feed.innerHTML = posts.map(p => `
                <div style="background: #1c1e21; padding: 15px; border-radius: 15px; margin-bottom: 15px; border: 1px solid #333;">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <img src="${p.author_avatar}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                        <div>
                            <div style="font-weight: bold; font-size: 14px;">${p.author_name}</div>
                            <div style="color: #1877f2; font-size: 9px; font-weight: bold;">OIO VERIFIED</div>
                        </div>
                    </div>
                    <div style="font-size: 15px; line-height: 1.5; color: #e4e6eb;">${p.content}</div>
                </div>
            `).join('');
        }
    }
};
