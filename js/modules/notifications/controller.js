export const NotificationsController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        // ✅ Pede permissão de notificação nativa
        NotificationsController.pedirPermissao();

        // ✅ Inicia verificação de mensagens em tempo real
        NotificationsController.iniciarVigilancia();

        display.innerHTML = `
            <div style="max-width:600px; margin:0 auto; color:#e4e6eb; padding:15px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <h2 style="margin:0;">Notificações</h2>
                    <span id="badge-count" style="background:#ff3040; color:white; border-radius:50%; width:24px; height:24px; display:none; align-items:center; justify-content:center; font-size:12px; font-weight:bold;"></span>
                </div>
                <div id="lista-notificacoes">
                    <p style="text-align:center; color:#666; padding:40px;">Carregando...</p>
                </div>
            </div>
        `;

        await NotificationsController.loadNotificacoes();
    },

    // ✅ Pede permissão para notificação nativa do celular
    pedirPermissao() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    },

    // ✅ Dispara notificação nativa + vibração + som
    async dispararAlerta(titulo, corpo, avatar) {
        // Vibração
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }

        // Som (só funciona após toque do usuário)
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.4);
        } catch (e) {}

        // Notificação nativa do celular
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(titulo, {
                body: corpo,
                icon: avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                badge: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                vibrate: [200, 100, 200]
            });
        }

        // ✅ Ícone piscando na aba de notificações
        NotificationsController.piscarIcone();
    },

    // ✅ Ícone da aba de notificações pisca
    piscarIcone() {
        const navItems = document.querySelectorAll('.nav-item');
        const abaNotif = navItems[4]; // 5ª aba = notificações
        if (!abaNotif) return;

        let piscando = true;
        abaNotif.style.color = '#ff3040';

        const intervalo = setInterval(() => {
            abaNotif.style.color = piscando ? '#ff3040' : '#b0b3b8';
            piscando = !piscando;
        }, 500);

        // Para de piscar quando o usuário abre a aba
        abaNotif.addEventListener('click', () => {
            clearInterval(intervalo);
            abaNotif.style.color = '#1877f2';
        }, { once: true });
    },

    // ✅ Vigia mensagens novas a cada 15 segundos
    iniciarVigilancia() {
        const meuNome = localStorage.getItem('oio_user_name');
        if (!meuNome) return;

        let ultimoId = localStorage.getItem('oio_ultima_msg') || 0;

        const verificar = async () => {
            const { data: msgs } = await window.supabase
                .from('messages')
                .select('*')
                .eq('receiver_id', meuNome)
                .gt('id', ultimoId)
                .order('id', { ascending: false });

            if (msgs && msgs.length > 0) {
                const nova = msgs[0];
                ultimoId = nova.id;
                localStorage.setItem('oio_ultima_msg', ultimoId);

                await NotificationsController.dispararAlerta(
                    `💬 Nova mensagem de ${nova.sender_id}`,
                    nova.content,
                    null
                );
            }
        };

        verificar();
        setInterval(verificar, 15000); // verifica a cada 15s
    },

    async loadNotificacoes() {
        const lista = document.getElementById('lista-notificacoes');
        if (!lista) return;

        const meuNome = localStorage.getItem('oio_user_name');

        // Busca mensagens recebidas
        const { data: msgs } = await window.supabase
            .from('messages')
            .select('*')
            .eq('receiver_id', meuNome)
            .order('id', { ascending: false })
            .limit(30);

        if (!msgs || msgs.length === 0) {
            lista.innerHTML = `<p style="text-align:center; color:#666; padding:40px;">Nenhuma notificação ainda.</p>`;
            return;
        }

        lista.innerHTML = msgs.map(m => {
            const tempo = NotificationsController.tempoRelativo(m.created_at);
            return `
                <div style="display:flex; gap:12px; align-items:flex-start; padding:12px; background:#242526; border-radius:10px; margin-bottom:8px; border:1px solid #3a3b3c;">
                    <div style="width:46px; height:46px; border-radius:50%; background:#1877f2; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:18px; flex-shrink:0;">
                        ${m.sender_id ? m.sender_id.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div style="flex:1;">
                        <div style="font-size:14px;"><strong>${m.sender_id}</strong> enviou uma mensagem</div>
                        <div style="font-size:13px; color:#b0b3b8; margin-top:4px;">"${m.content}"</div>
                        <div style="font-size:11px; color:#1877f2; margin-top:4px; font-weight:600;">${tempo}</div>
                    </div>
                </div>
            `;
        }).join('');
    },

    tempoRelativo(data) {
        const diff = Math.floor((new Date() - new Date(data)) / 1000);
        if (diff < 60) return 'Agora mesmo';
        if (diff < 3600) return `Há ${Math.floor(diff / 60)} minutos`;
        if (diff < 86400) return `Há ${Math.floor(diff / 3600)} horas`;
        return `Há ${Math.floor(diff / 86400)} dias`;
    }
};
