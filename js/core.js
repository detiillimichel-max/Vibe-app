import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAkJLFtmzPdvJBmPJKwVQz_VRC7A3SsAQ",
    authDomain: "vibe-app-bbba2.firebaseapp.com",
    databaseURL: "https://vibe-app-bbba2-default-rtdb.firebaseio.com",
    projectId: "vibe-app-bbba2",
    appId: "1:329513213082:web:ca896a67b1dc7a58a5323"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// O "Dedo" do usuário no botão ACESSAR
document.addEventListener('click', async (e) => {
    if (e.target.id === 'btn-entrar') {
        // 1. Mata o quadro de login
        document.getElementById('portal-layer').classList.remove('layer-visible');
        document.getElementById('portal-layer').style.display = 'none';
        
        // 2. Abre a tela do sistema
        const appLayer = document.getElementById('app-layer');
        appLayer.classList.remove('hidden');
        appLayer.style.display = 'block';

        // 3. Puxa os dados reais (2.29GB) do seu Firebase
        const snapshot = await get(ref(db, 'origin-feed'));
        if (snapshot.exists()) {
            document.getElementById('universe-display').innerHTML = `
                <div style="padding:40px; text-align:center; font-size:1.5rem;">
                    ${snapshot.val().ideas[0].content}
                </div>
            `;
        }
    }
});
