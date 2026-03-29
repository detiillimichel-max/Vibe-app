export const NotificationsController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        display.innerHTML = `
            <div style="max-width:600px; margin:0 auto; color:#e4e6eb; padding:15px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <h2 style="margin:0;">Notificações</h2>
                </div>
                <div id="lista-notificacoes">
                    <p style="text-align:center; color:#666; padding:40px;">Carregando...</p>
                </div>
            </div>
        `;

        await NotificationsController.loadNotificacoes();
    },

    async loadNotificacoes() {
        const lista = document.getElementById('lista-notificacoes');
        if (!lista) return;

        const userEmail = localStorage.getItem('oio_user_email');

        // Busca posts recentes dos outros usuários como notificações
        const { data: posts, error } = await window.supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);

        if (error || !posts || posts.length === 0) {
            lista.innerHTML = `<p style="text-align:center; color:#666; padding:40px;">Nenhuma notificação ainda.</p>`;
            return;
        }

        lista.innerHTML = posts.map(p => {
            const tempo = NotificationsController.tempoRelativo(p.created_at);
            const isPropio = p.author_name === localStorage.getItem('oio_user_name');
            return `
                <div style="display:flex; gap:12px; align-items:flex-start; padding:12px; background:${isPropio ? 'rgba(24,119,242,0.08)' : '#242526'}; border-radius:10px; margin-bottom:8px; border:1px solid #3a3b3c;">
                    <img src="${p.author_avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}" 
                        style="width:46px; height:46px; border-radius:50%; object-fit:cover; flex-shrink:0;"
                        onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'">
                    <div style="flex:1;">
                        <div style="font-size:14px;"><strong>${p.author_name}</strong> fez uma nova publicação</div>
                        <div style="font-size:12px; color:#b0b3b8; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:220px;">"${p.content}"</div>
                        <div style="font-size:11px; color:#1877f2; margin-top:4px; font-weight:600;">${tempo}</div>
                    </div>
                </div>
            `;
        }).join('');
    },

    tempoRelativo(data) {
        const agora = new Date();
        const criado = new Date(data);
        const diff = Math.floor((agora - criado) / 1000);
        if (diff < 60) return 'Agora mesmo';
        if (diff < 3600) return `Há ${Math.floor(diff / 60)} minutos`;
        if (diff < 86400) return `Há ${Math.floor(diff / 3600)} horas`;
        return `Há ${Math.floor(diff / 86400)} dias`;
    }
};
