import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// IMPORTANDO OS 5 MÓDULOS QUE JÁ TEMOS NAS PASTAS
import { OriginController } from './modules/origin/controller.js';
import { WatchController } from './modules/watch/controller.js';
import { FriendsController } from './modules/friends/controller.js';
import { MarketplaceController } from './modules/marketplace/controller.js';
import { NotificationsController } from './modules/notifications/controller.js';

const firebaseConfig = {
    apiKey: "AIzaSyAkJLFtmzPdvJBmPJKwVQz_VRC7A3SsAQ",
    authDomain: "vibe-app-bbba2.firebaseapp.com",
    databaseURL: "https://vibe-app-bbba2-default-rtdb.firebaseio.com",
    projectId: "vibe-app-bbba2",
    appId: "1:329513213082:web:ca896a67b1dc7a58a5323"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let usuarioLogado = "Usuário OIO";

document.addEventListener('click', async (e) => {
    
    // 1. LOGIN
    if (e.target.id === 'btn-entrar') {
        const portal = document.getElementById('portal-layer');
        const appLayer = document.getElementById('app-layer');

        try {
            const userRef = ref(db, 'users/admin/name');
            const snapshot = await get(userRef);
            if (snapshot.exists()) usuarioLogado = snapshot.val();
        } catch (error) { console.error("Firebase:", error); }

        if (portal) portal.style.display = 'none';
        if (appLayer) {
            appLayer.classList.remove('hidden');
            appLayer.style.display = 'block';
        }

        OriginController.init(usuarioLogado);
    }

    // 2. INTERRUPTOR DA BARRA SUPERIOR (NAV BAR)
    const navItem = e.target.closest('.nav-item');
    if (navItem) {
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        navItem.classList.add('active');

        const titulo = navItem.getAttribute('title');

        // Lógica de Troca de Módulos
        if (titulo === 'Home') {
            OriginController.init(usuarioLogado);
        } 
        else if (titulo === 'Vídeos') {
            WatchController.init(); 
        }
        else if (titulo === 'Amigos') {
            FriendsController.init();
        }
        else if (titulo === 'Marketplace') {
            MarketplaceController.init();
        }
        else if (titulo === 'Notificações') {
            // ATIVA O MÓDULO 5!
            NotificationsController.init();
        }
    }
});
