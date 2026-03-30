export const NotificationService = {
    // Solicita permissão ao usuário
    requestPermission: async () => {
        if (!("Notification" in window)) {
            console.log("Este navegador não suporta notificações.");
            return;
        }
        
        if (Notification.permission !== "granted") {
            await Notification.permission;
        }
    },

    // Dispara o alerta visual e vibração
    notify: (title, message) => {
        if (Notification.permission === "granted") {
            const options = {
                body: message,
                icon: 'assets/icons/logo-oio.png', // Caminho do seu ícone
                vibrate: [200, 100, 200], // Vibra, para, vibra
                badge: 'assets/icons/badge.png'
            };
            
            new Notification(title, options);
        } else {
            // Fallback: Se não tiver permissão, usa um alerta interno no Hub
            console.log("Permissão de notificação negada.");
        }
    }
};
