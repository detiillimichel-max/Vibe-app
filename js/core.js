import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAkJLFtmzPdvJBmPJKwVQz_VRC7A3SsAQ",
  authDomain: "vibe-app-bbba2.firebaseapp.com",
  databaseURL: "https://vibe-app-bbba2-default-rtdb.firebaseio.com",
  projectId: "vibe-app-bbba2",
  storageBucket: "vibe-app-bbba2.appspot.com",
  messagingSenderId: "329513213082",
  appId: "1:329513213082:web:ca896a67b1dc7a58a5323"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// O código abaixo assume o controle do botão que já está lá no seu HTML
document.addEventListener('click', async (e) => {
    if (e.target.id === 'btn-entrar' || e.target.innerText === 'ACESSAR') {
        // Abre o App
        document.getElementById('portal-layer').style.display = 'none';
        document.getElementById('app-layer').style.display = 'block';
        document.getElementById('app-layer').classList.remove('hidden');

        // Puxa os dados reais do seu Firebase
        const snapshot = await get(ref(db, 'origin-feed'));
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById('universe-display').innerText = data.ideas[0].content;
        }
    }
});
