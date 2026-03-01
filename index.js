<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OIO ONE - Oficial</title>
    <script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-database-compat.js"></script>
    <style>
        body { margin: 0; background: #000; color: white; font-family: sans-serif; display: flex; flex-direction: column; height: 100vh; }
        #caixa-msg { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px; padding-bottom: 90px; }
        .balao { background: rgba(0, 242, 254, 0.1); padding: 12px; border-radius: 15px; border-left: 4px solid #00f2fe; max-width: 85%; align-self: flex-start; word-wrap: break-word; }
        .minha { align-self: flex-end; border-left: none; border-right: 4px solid #fff; background: rgba(255,255,255,0.1); }
        .controles { position: fixed; bottom: 0; width: 100%; padding: 15px; background: #111; display: flex; gap: 10px; box-sizing: border-box; border-top: 1px solid #333; z-index: 100; }
        input { flex: 1; padding: 15px; border-radius: 25px; border: none; background: #222; color: #fff; outline: none; font-size: 16px; }
        button { width: 55px; height: 55px; border-radius: 50%; border: none; background: #00f2fe; color: #000; font-weight: bold; cursor: pointer; }
    </style>
</head>
<body>
    <div id="caixa-msg"></div>
    <div class="controles">
        <input id="msg-input" placeholder="Sua vibe..." autocomplete="off">
        <button onclick="enviar()">➤</button>
    </div>
    <script>
        const firebaseConfig = {
            apiKey: "AIzaSyBG3oBoBvOwySN64gR6CgCcXTo2DG-av60",
            authDomain: "vibe-app-bbba2.firebaseapp.com",
            databaseURL: "https://vibe-app-bbba2-default-rtdb.firebaseio.com/",
            projectId: "vibe-app-bbba2",
            storageBucket: "vibe-app-bbba2.firebasestorage.app",
            messagingSenderId: "329513213082",
            appId: "1:329513213082:web:3938e86538bf8a04a05323"
        };
        firebase.initializeApp(firebaseConfig);
        const db = firebase.database();
        let meuNome = localStorage.getItem("oio_nome") || prompt("Identidade OIO ONE - Nome:") || "Michel";
        localStorage.setItem("oio_nome", meuNome);

        db.ref("chat_geral").limitToLast(20).on("child_added", snap => {
            const msg = snap.val();
            const div = document.createElement("div");
            div.className = "balao" + (msg.autor === meuNome ? " minha" : "");
            div.innerHTML = "<strong>" + msg.autor + "</strong><br>" + msg.texto;
            const caixa = document.getElementById("caixa-msg");
            caixa.appendChild(div);
            caixa.scrollTop = caixa.scrollHeight;
        });

        function enviar() {
            const input = document.getElementById("msg-input");
            if (input.value.trim()) {
                db.ref("chat_geral").push({ autor: meuNome, texto: input.value, data: Date.now() });
                input.value = "";
            }
        }
        document.getElementById("msg-input").addEventListener("keypress", e => { if(e.key==="Enter") enviar(); });
    </script>
</body>
</html>
      
