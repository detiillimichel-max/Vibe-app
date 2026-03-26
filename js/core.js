import { OriginController } from './modules/origin/controller.js';

document.getElementById('btn-entrar').addEventListener('click', () => {
    const user = document.getElementById('user-email').value;
    
    if(user.length > 2) {
        // Esconde o portal e mostra o app
        document.getElementById('portal-layer').classList.add('hidden');
        document.getElementById('app-layer').classList.remove('hidden');
        
        // Atualiza o nome no Hub (opcional)
        const userDisplay = document.getElementById('user-display-name');
        if(userDisplay) userDisplay.innerText = user.toUpperCase();

        // DISPARO AUTOMÁTICO: Inicia o primeiro módulo (Casinha)
        OriginController.init();
        
        console.log("OIO ONE: Sistema Orgânico Iniciado.");
    }
});
