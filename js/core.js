import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { OriginController } from './modules/origin/controller.js';

const firebaseConfig = {
    apiKey: "AIzaSyAkJLFtmzPdvJBmPJKwVQz_VRC7A3SsAQ",
    authDomain: "vibe-app-bbba2.firebaseapp.com",
    databaseURL: "https://vibe-app-bbba2-default-rtdb.firebaseio.com",
    projectId: "vibe-app-bbba2",
    appId: "1:329513213082:web:ca896a67b1dc7a58a5323"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener('click', async (e) => {
    if (e.target.id === 'btn-entrar') {
        // Simulação de Login (Pode ser expandida para Auth real depois)
        console.log("OIO-INFO: Validando Acesso...");

        const portal = document.getElementById('portal-layer');
        const appLayer = document.getElementById('app-layer');

        // Troca as telas
        if (portal) portal.style.display = 'none';
        if (appLayer) appLayer.style.display = 'block';

        // Inicializa o visual do Facebook
        OriginController.init();
    }
});
