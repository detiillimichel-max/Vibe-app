<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Vibe - OIO ONE Edition</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-database-compat.js"></script>
    <style>
        body { margin: 0; font-family: sans-serif; background: #000; color: #fff; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        #chat { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; background: radial-gradient(circle, #111, #000); }
        .balao { background: rgba(0, 240, 255, 0.1); padding: 10px 15px; border-radius: 15px; max-width: 80%; border: 1px solid #222; position: relative; }
        .balao.minha { align-self: flex-end; background: #0044ff; border: none; }
        .user-info { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; font-size: 12px; color: #00f0ff; }
        .user-img { width: 25px; height: 25px; border-radius: 50%; object-fit: cover; border: 1px solid #00f0ff; }
        .controles { display: flex; gap: 10px; padding: 12px; background: #111; border-top: 1px solid #222; align-items: center; }
        input { flex: 1; padding: 12px; border-radius: 25px; border: none; background: #222; color: #fff; outline: none; }
        .btn-vibe { color: #00f0ff; font-size: 24px; cursor: pointer; }
    </style>
</head>
<body>
    <div id="chat"></div>
    <div class="controles">
        <i class="fa-solid fa-camera btn-vibe" onclick="trocarIdentidade()"></i>
        <input id="msgInput" placeholder="Sua vibe..." autocomplete="off">
        <i class="fa-solid fa-paper-plane btn-vibe" onclick="enviar()"></i>
    </div>

    <script>
        const config = {
            apiKey: "AIzaSyAUJFmzPdwUbnfJdwQ3_YFC7A335AQ",
            databaseURL: "https://vibe-app-bbba2-default-rtdb.firebaseio.com/",
            projectId: "vibe-app-bbba2"
        };
        firebase.initializeApp(config);
        const db = firebase.database().ref("chat_vibe");

        // Identidade do Usuário
        let nick = localStorage.getItem('oio_name');
        let foto = localStorage.getItem('oio_photo') || 'https://via.placeholder.com/50';

        if (!nick) {
            nick = prompt("Bem-vindo ao OIO ONE! Digite seu nome:") || "Visitante";
            localStorage.setItem('oio_name', nick);
        }

        function trocarIdentidade() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = e => {
                const reader = new FileReader();
                reader.onload = () => {
                    localStorage.setItem('oio_photo', reader.result);
                    location.reload();
                };
                reader.readAsDataURL(e.target.files[0]);
            };
            input.click();
        }

        db.limitToLast(30).on("child_added", snap => {
            const m = snap.val();
            const div = document.createElement("div");
            div.className = "balao " + (m.autor === nick ? "minha" : "");
            div.innerHTML = `<div class="user-info"><img src="${m.foto || 'https://via.placeholder.com/50'}" class="user-img"><b>${m.autor}</b></div>` + 
                            (m.url ? `<img src="${m.url}" style="max-width:100%; border-radius:10px;">` : m.texto);
            document.getElementById("chat").appendChild(div);
            document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
        });

        function enviar() {
            const input = document.getElementById("msgInput");
            if(input.value.trim()){
                db.push({ autor: nick, foto: foto, texto: input.value, data: Date.now() });
                input.value = "";
            }
        }
        document.getElementById("msgInput").onkeypress = e => { if(e.key === "Enter") enviar(); };
    </script>
</body>
</html>
                              
