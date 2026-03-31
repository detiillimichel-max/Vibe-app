// OIO ONE - SERVICE WORKER 💎
const CACHE = 'oio-v1';

// Instala o service worker
self.addEventListener('install', e => {
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    self.clients.claim();
});

// ✅ Recebe notificação push
self.addEventListener('push', e => {
    const data = e.data ? e.data.json() : {};
    
    const titulo = data.titulo || 'OIO ONE';
    const corpo = data.corpo || 'Nova mensagem recebida';
    const icone = data.icone || 'https://ui-avatars.com/api/?name=OIO&background=1877f2&color=fff';

    e.waitUntil(
        self.registration.showNotification(titulo, {
            body: corpo,
            icon: icone,
            badge: icone,
            vibrate: [200, 100, 200, 100, 200],
            tag: 'oio-mensagem',
            renotify: true,
            data: { url: '/' }
        })
    );
});

// ✅ Clique na notificação abre o app
self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: 'window' }).then(lista => {
            if (lista.length > 0) {
                lista[0].focus();
            } else {
                clients.openWindow('/');
            }
        })
    );
});

// ✅ Verifica mensagens novas a cada 30 segundos (background sync)
self.addEventListener('periodicsync', e => {
    if (e.tag === 'verificar-mensagens') {
        e.waitUntil(verificarMensagensBackground());
    }
});

async function verificarMensagensBackground() {
    // Notifica se tiver mensagens novas
    await self.registration.showNotification('OIO ONE 💬', {
        body: 'Você tem mensagens não lidas',
        icon: 'https://ui-avatars.com/api/?name=OIO&background=1877f2&color=fff',
        vibrate: [200, 100, 200],
        tag: 'oio-background'
    });
}
