export const OriginController = {
    init: async () => {
        const display = document.getElementById('universe-display');
        
        const userName = localStorage.getItem('oio_user_name') || 'Explorador';
        const userAvatar = localStorage.getItem('oio_user_avatar') || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
        const userEmail = localStorage.getItem('oio_user_email');

        display.innerHTML = `
            <div style="padding:15px; max-width:600px; margin:0 auto;">
                <input type="file" id="avatar-input" style="display:none;" accept="image/*">

                <div style="background:#1c1e21; padding:15px; border-radius:15px; display:flex; align-items:center; margin-bottom:20px; border:1px solid #333;">
                    <img id="btn-foto" src="${userAvatar}" 
                        style="width:50px; height:50px; border-radius:50%; border:2px solid #1877f2; margin-right:15px; cursor:pointer;"
                        onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'">
                    <div>
                        <div style="font-weight:bold; font-size:18px;">${userName}</div>
                        <div style="color:#1877f2; font-size:10px; font-weight:bold; letter-spacing:1px;">OIO VERIFIED</div>
                    </div>
                </div>

                <div style="background:#1c1e21; padding:20px; border-radius:15px; border:1px solid #333; margin-bottom:20px;">
                    <textarea id="post-text" placeholder="O que há de novo, ${userName.split(' ')[0]}?" 
                        style="width:100%; background:transparent; border:none; color:white; font-size:16px; outline:none; resize:none; min-height:80px; box-sizing:border-box;"></textarea>
                    <div style="display:flex; justify-content:flex-end; margin-top:10px;">
                        <button id="btn-postar" style="background:#1877f2; color:white; border:none; padding:10px 30px; border-radius:20px; font-weight:bold; cursor:pointer;">Postar</button>
                    </div>
                </div>

                <div id="feed-container"></div>
            </div>
        `;

        // Troca de foto
        document.getElementById('btn-foto').onclick = () => document.getElementById('avatar-input').click();
        document.getElementById('avatar-input').onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const btnFoto = document.getElementById('btn-foto');
            btnFoto.style.opacity = '0.3';

            const fileName = `avatar_${Date.now()}`;
            const { error: uploadError } = await window.supabase.storage
                .from('avatars').upload(fileName, file);

            if (uploadError) {
                alert('Erro ao subir foto: ' + uploadError.message);
                btnFoto.style.opacity = '1';
                return;
            }

            const { data: { publicUrl } } = window.supabase.storage
                .from('avatars').getPublicUrl(fileName);

            await window.supabase.from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('email', userEmail);

            localStorage.setItem('oio_user_avatar', publicUrl);
            location.reload();
        };

        // Postar
        document.getElementById('btn-postar').onclick = async () => {
            const text = document.getElementById('post-text').value.trim();
            if (!text) return;

            const btn = document.getElementById('btn-postar');
            btn.innerText = '...';
            btn.disabled = true;

            const { error } = await window.supabase.from('posts').insert([{
                author_name: userName,
                author_avatar: userAvatar, // ✅ coluna correta
                content: text
            }]);

            if (!error) {
                document.getElementById('post-text').value = '';
                await OriginController.loadPosts();
            }

            btn.innerText = 'Postar';
            btn.disabled = false;
        };

        await OriginController.loadPosts();
    },

    loadPosts: async () => {
        const feed = document.getElementById('feed-container');
        if (!feed) return;

        const { data: posts } = await window.supabase
            .from('posts')
            .select('*')
            .order('id', { ascending: false });

        if (!posts) return;

        feed.innerHTML = posts.map(p => `
            <div style="background:#1c1e21; padding:15px; border-radius:15px; margin-bottom:15px; border:1px solid #333;">
                <div style="display:flex; align-items:center; margin-bottom:10px;">
                    <img src="${p.author_avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}" 
                        style="width:40px; height:40px; border-radius:50%; margin-right:10px; object-fit:cover;"
                        onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'">
                    <div>
                        <div style="font-weight:bold; font-size:14px;">${p.author_name}</div>
                        <div style="color:#1877f2; font-size:9px; font-weight:bold;">OIO VERIFIED</div>
                    </div>
                </div>
                <div style="font-size:15px; line-height:1.5; color:#e4e6eb;">${p.content}</div>
            </div>
        `).join('');
    }
};
