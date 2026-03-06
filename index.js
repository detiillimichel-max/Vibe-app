<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OIO ONE - Oficial</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
    <script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-database-compat.js"></script>
    <style>
        body { margin: 0; background: #000; font-family: sans-serif; color: white; display: flex; flex-direction: column; height: 100vh; }
        
        /* TOPO: SUA IDENTIDADE (O CENTRO) */
        .header-vibe { display: flex; align-items: center; justify-content: space-between; background: #1a1a1a; padding: 10px 15px; border-bottom: 1px solid #333; }
        .perfil-autor { display: flex; align-items: center; gap: 10px; }
        .foto-perfil { width: 40px; height: 40px; border-radius: 50%; border: 2px solid #00a884; }
        
        #caixa-msg { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
        .balao { background: rgba(0, 168, 132, 0.2); padding: 12px; border-radius: 15px; border-left: 4px solid #00a884; max-width: 80%; }
        .minha { align-self: flex-end; border-left: none; border-right: 4px solid #fff; background: rgba(255,255,255,0.1); }
        
        /* BARRA DE BAIXO: PROFISSIONAL */
        .controles { display: flex; align-items: center; gap: 10px; padding: 10px; background: #1a1a1a; border-top: 1px solid #333; }
        input { flex: 1; padding: 12px; border-radius: 25px; border: none; background: #333; color: #fff; outline: none; }
        .btn-vibe { color: #00a884; font-size: 24px; cursor: pointer; }
    </style>
</head>
<body>

    <div class="header-vibe">
        <div class="perfil-autor">
            <img src="https://i.pravatar.cc/100?u=michel" class="foto-perfil">
            <div>
                <div style="font-weight: bold; font-size: 14px;">Michel Detilli</div>
                <div style="font-size: 10px; color: #00a884;">Status: Vibe Ativa</div>
            </div>
        </div>
        <div style="display: flex; gap: 15px; color: #65676b;">
            <i class="fa-solid fa-play-circle"></i>
            <i class="fa-solid fa-shop"></i>
        </div>
    </div>

    <div id="caixa-msg"></div>

    <div class="controles">
        <i class="fa-solid fa-camera btn-vibe"></i>
        <input id="msg-input" placeholder="Sua vibe..." autocomplete="off">
        <i class="fa-solid fa-paper-plane btn-vibe" onclick="enviar()"></i>
    </div>

    <script>
        // Configuração do seu Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyB8K6H6W5h4Hq9HBg6YXoGhk4w-mSQ",
            databaseURL: "https://vibe-app-bbba2-default-rtdb.firebaseio.com/",
            projectId: "vibe-app-bbba2"
        };
        firebase.initializeApp(firebaseConfig);
        const db = firebase.database();
        let meuNome = "Michel";

        db.ref("chat_geral").limitToLast(20).on("child_added", snap => {
            const msg = snap.val();
            const div = document.createElement("div");
            div.className = "balao" + (msg.autor === meuNome ? " minha" : "");
            div.innerHTML = "<strong>" + msg.autor + "</strong><br>" + msg.texto;
            document.getElementById("caixa-msg").appendChild(div);
            document.getElementById("caixa-msg").scrollTop = document.getElementById("caixa-msg").scrollHeight;
        });

        function enviar() {
            const input = document.getElementById("msg-input");
            if (input.value.trim()) {
                db.ref("chat_geral").push({ autor: meuNome, texto: input.value, data: Date.now() });
                input.value = "";
            }
        }
    </script>
</body>
</html>
            
