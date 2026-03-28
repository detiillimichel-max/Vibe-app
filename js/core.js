import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 1. IMPORTANDO OS DOIS MÓDULOS QUE JÁ TEMOS NAS PASTAS
import { OriginController } from './modules/origin/controller.js';
import { WatchController } from './modules/watch/controller.js';

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
    
    // BOTÃO ENTRAR (LOGIN)
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

        // Começa sempre pela Home
        OriginController.init(usuarioLogado);
    }

    // INTERRUPTOR DOS ÍCONES (NAV BAR)
    const navItem = e.target.closest('.nav-item');
    if (navItem) {
        // Troca a cor azul do ícone selecionado
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        navItem.classList.add('active');

        const titulo = navItem.getAttribute('title');

        if (titulo === 'Home') {
            OriginController.init(usuarioLogado);
        } 
        else if (titulo === 'Vídeos') {
            // AQUI É ONDE O MÓDULO 2 É ATIVADO!
            WatchController.init(); 
        }
    }
});
