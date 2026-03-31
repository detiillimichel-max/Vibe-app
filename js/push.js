// OIO ONE - SISTEMA DE PUSH NOTIFICATIONS 🔔
window.OioPush = {

    swRegistration: null,

    // ✅ Inicializa o sistema
    async iniciar() {
        if (!('serviceWorker' in navigator) || !('Notification' in window)) {
            console.log('OIO Push: navegador não suporta.');
            return;
        }

        try {
            // Registra o Service Worker
            this.swRegistration = await navigator.serviceWorker.register('/sw.js');
            console.log('OIO Push: Service Worker registrado.');

            // Pede permissão
            await this.pedirPermissao();

            // Inicia vigilância de mensagens
            this.iniciarVigilancia();

        } catch (e) {
            console.log('OIO Push erro:', e);
        }
    },

    // ✅ Pede permissão de notificação
    async pedirPermissao() {
        if (Notification.permission === 'default') {
            const resultado = await Notification.requestPermission();
            if (resultado === 'granted') {
                // Mostra notificação de boas-vindas
                this.notificar('OIO ONE ✅', 'Notificações ativadas com sucesso!', null);
            }
        }
    },

    // ✅ Dispara notificação nativa ALTA
    notificar(titulo, corpo, avatar) {
        if (Notification.permission !== 'granted') return;

        // Vibração forte
        if (navigator.vibrate) {
            navigator.vibrate([300, 100, 300, 100, 300]);
        }

        // Som alto via AudioContext
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Toca 3 notas em sequência — som de notificação
            [[880, 0], [1100, 0.2], [1320, 0.4]].forEach(([freq, delay]) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
                gain.gain.setValueAtTime(0.5, ctx.currentTime + delay);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.3);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ctx.currentTime + delay);
                osc.stop(ctx.currentTime + delay + 0.3);
            });
        } catch (e) {}

        // Notificação nativa do sistema
        if (this.swRegistration) {
            this.swRegistration.showNotification(titulo, {
                body: corpo,
                icon: avatar || 'https://ui-avatars.com/api/?name=OIO&background=1877f2&color=fff',
                badge: 'https://ui-avatars.com/api/?name=OIO&background=1877f2&color=fff',
                vibrate: [300, 100, 300, 100, 300],
                tag: 'oio-msg-' + Date.now(),
                renotify: true
            });
        } else {
            new Notification(titulo, {
                body: corpo,
                icon: avatar || 'https://ui-avatars.com/api/?name=OIO&background=1877f2&color=fff'
            });
        }
    },

    // ✅ Vigia mensagens novas mesmo com app em segundo plano
    iniciarVigilancia() {
        const meuNome = localStorage.getItem('oio_user_name');
        if (!meuNome) return;

        let ultimoId = parseInt(localStorage.getItem('oio_ultima_msg') || '0');

        const verificar = async () => {
            try {
                const { data: msgs } = await window.supabase
                    .from('messages')
                    .select('id, sender_id, content')
                    .eq('receiver_id', meuNome)
                    .gt('id', ultimoId)
                    .order('id', { ascending: false })
                    .limit(5);

                if (msgs && msgs.length > 0) {
                    const nova = msgs[0];
                    ultimoId = nova.id;
                    localStorage.setItem('oio_ultima_msg', ultimoId);

                    // ✅ Dispara notificação nativa ALTA
                    this.notificar(
                        `💬 ${nova.sender_id}`,
                        nova.content,
                        null
                    );
                }
            } catch (e) {}
        };

        // Verifica imediatamente e depois a cada 15 segundos
        verificar();
        setInterval(() => verificar(), 15000);
    }
};

// ✅ Ativa ao primeiro toque do usuário
document.addEventListener('touchstart', () => {
    if (!window.OioPush.swRegistration) {
        window.OioPush.iniciar();
    }
}, { once: true });

document.addEventListener('click', () => {
    if (!window.OioPush.swRegistration) {
        window.OioPush.iniciar();
    }
}, { once: true });
