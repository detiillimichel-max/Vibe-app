import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { OriginController } from './modules/origin/controller.js';

// Sua configuração original do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAkJLFtmzPdvJBmPJKwVQz_VRC7A3SsAQ",
    authDomain: "vibe-app-bbba2.firebaseapp.com",
    databaseURL: "https://vibe-app-bbba2-default-rtdb.firebaseio.com",
    projectId: "vibe-app-bbba2",
    appId: "1:329513213082:web:ca896a67b1dc7a58a5323"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Escuta o evento de clique no botão ACESSAR
document.addEventListener('click', async (e) => {
    if (e.target.id === 'btn-entrar') {
        
        // 1. Transição de Telas (Portal -> App)
        const portal = document.getElementById('portal-layer');
        const appLayer = document.getElementById('app-layer');

        if (portal) {
            portal.classList.remove('layer-visible');
            portal.style.display = 'none';
        }

        if (appLayer) {
            appLayer.classList.remove('hidden');
            appLayer.style.display = 'block';
        }

        // 2. Dispara a Arquitetura Modular (OriginController)
        // Isso vai carregar o Marketing, Sugestões e Ideias do origin-feed.json
        OriginController.init();

        // 3. Opcional: Busca algo específico no Firebase se necessário
        try {
            const snapshot = await get(ref(db, 'origin-feed'));
            if (snapshot.exists()) {
                console.log("OIO-INFO: Dados extras do Firebase carregados.");
            }
        } catch (error) {
            console.warn("OIO-WARN: Firebase não respondeu, usando dados locais.");
        }
    }
});
