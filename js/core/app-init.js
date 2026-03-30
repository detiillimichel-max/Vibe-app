import { NotificationService } from '../services/notification-service.js';

document.addEventListener('DOMContentLoaded', () => {
    // Ao carregar o OIO ONE, já prepara as notificações
    NotificationService.requestPermission();
    
    console.log("Sistema OIO ONE inicializado e permissões solicitadas.");
});
