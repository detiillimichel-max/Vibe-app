<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<title>Vibe Toc - Engajamento Completo</title>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
<script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-database-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-storage-compat.js"></script>

<style>
body { margin:0; background:#000; font-family:sans-serif; color:#fff; display:flex; flex-direction:column; height:100vh; overflow:hidden; }
.header-vibe { display:flex; align-items:center; justify-content:space-between; background:#111; padding:10px 15px; border-bottom:1px solid #333; }
.perfil-autor { display:flex; align-items:center; gap:10px; }
.foto-perfil { width:40px; height:40px; border-radius:50%; border:2px solid #00a884; }

#caixa-msg { flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:12px; background: linear-gradient(to bottom, #000 0%, #111 100%); }
.balao { background: rgba(0,168,132,0.15); padding:12px; border-radius:15px; border-left:4px solid #00a884; max-width:85%; font-size:15px; line-height:1.4; position:relative; }
.minha { align-self:flex-end; border-left:none; border-right:4px solid #fff; background: rgba(255,255,255,0.08); }

.controles { display:flex; align-items:center; gap:12px; padding:12px; background:#111; border-top:1px solid #333; }
input { flex:1; padding:12px; border-radius:25px; border:none; background:#2a2a2a; color:#fff; outline:none; font-size:16px; }
.btn-vibe { color:#00a884; font-size:26px; cursor:pointer; transition:0.2s; }
.btn-vibe:active { transform:scale(0.9); opacity:0.7; }

#feed { flex:1; overflow-y:auto; padding:15px; display:none; flex-direction:column; gap:15px; background:#111; }
.feed-item { position:relative; border-radius:12px; overflow:hidden; background:#111; }
.feed-item img, .feed-item video { width:100%; border-radius:12px; }
.feed-icons { position:absolute; bottom:10px; right:10px; display:flex; gap:10px; }
.feed-icons i { font-size:22px; color:#fff; cursor:pointer; transition:0.2s; }
.feed-icons i:hover { transform:scale(1.2); }

.like { color:#ff3b30; }
.saved { color:#ffd60a; }
</style>
</head>
<body>

<div class="header-vibe">
    <div class="perfil-autor">
        <img src="https://i.pravatar.cc/100?u=michel" class="foto-perfil">
        <div>
            <div style="font-weight:bold; font-size:14px;">Michel Detilli</div>
            <div style="font-size:10px; color:#00a884;">Status: Vibe Ativa</div>
        </div>
    </div>
    <div style="display:flex; gap:18px; color:#65676b;">
        <i class="fa-solid fa-comment btn-vibe" onclick="toggleChat()"></i>
        <i class="fa-solid fa-photo-film btn-vibe" onclick="toggleFeed()"></i>
        <i class="fa-solid fa-share-nodes btn-vibe" onclick="compartilharApp()"></i>
    </div>
</div>

<div id="caixa-msg"></div>
<div id="feed"></div>

<div class="controles">
    <i class="fa-solid fa-camera btn-vibe" onclick="document.getElementById('input-camera').click()"></i>
    <input id="msg-input" placeholder="Digite sua mensagem..." autocomplete="off">
    <i class="fa-solid fa-paper-plane btn-vibe" onclick="enviar()"></i>
</div>

<input type="file" id="input-camera" accept="image/*" capture="user" style="display:none">
<audio id="plim" src="https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3"></audio>

<script>
const firebaseConfig = {
    apiKey: "AIzaSyB8K6H6W5h4Hq9HBg6YXoGhk4w-mSQ",
    databaseURL: "https://vibe-app-bbba2-default-rtdb.firebaseio.com/",
    projectId: "vibe-app-bbba2"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const storage = firebase.storage();
let meuNome = "Michel";
let chatAtivo = true;

// Mensagens Realtime
db.ref("chat_teste").limitToLast(25).on("child_added", snap => {
    const msg = snap.val();
    const div = document.createElement("div");
    div.className = "balao"+(msg.autor===meuNome?" minha":"");
    div.innerHTML = "<strong>"+msg.autor+"</strong><br>"+(msg.url?`<img src='${msg.url}' style='width:100%; border-radius:10px;'>` : msg.texto);
    document.getElementById("caixa-msg").appendChild(div);
    document.getElementById("caixa-msg").scrollTop = document.getElementById("caixa-msg").scrollHeight;
    if(msg.autor!==meuNome) document.getElementById("plim").play().catch(e=>{});
});

// Enviar mensagem
function enviar(){
    const input = document.getElementById("msg-input");
    if(input.value.trim()){
        db.ref("chat_teste").push({ autor:meuNome, texto:input.value, data:Date.now() });
        input.value="";
    }
}

// Upload de fotos
document.getElementById('input-camera').addEventListener('change', function(){
    if(this.files && this.files[0]){
        const file = this.files[0];
        const ref = storage.ref('fotos/'+Date.now()+'_'+file.name);
        ref.put(file).then(snapshot=>{
            snapshot.ref.getDownloadURL().then(url=>{
                db.ref("chat_teste").push({ autor:meuNome, texto:"[Foto]", url:url, data:Date.now() });
            });
        });
    }
});

// Toggle Chat / Feed
function toggleChat(){ chatAtivo=true; document.getElementById("caixa-msg").style.display="flex"; document.getElementById("feed").style.display="none"; }
function toggleFeed(){ chatAtivo=false; document.getElementById("feed").style.display="flex"; document.getElementById("caixa-msg").style.display="none"; }

// Compartilhar App
function compartilharApp(){
    if(navigator.share){
        navigator.share({ title:"Vibe Toc", text:"Confira o Vibe Toc!", url:window.location.href });
    }else{ alert("Seu navegador não suporta compartilhar diretamente."); }
}

// Feed de vídeos com engajamento
function carregarFeed(){
    const feed = document.getElementById("feed");
    const videos = [
        "https://assets.mixkit.co/videos/preview/mixkit-beautiful-aerial-view-of-a-mountain-landscape-40432-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-snowy-mountain-landscape-40414-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-city-drone-pan-4069-large.mp4"
    ];
    feed.innerHTML="";
    videos.forEach((url,i)=>{
        const div=document.createElement("div");
        div.className="feed-item";
        const vid=document.createElement("video");
        vid.src=url; vid.controls=true; vid.loop=true; vid.autoplay=false;
        div.appendChild(vid);
        const icons=document.createElement("div");
        icons.className="feed-icons";
        icons.innerHTML=`<i class="fa-regular fa-heart" onclick="curtir(${i}, this)"></i>
                         <i class="fa-regular fa-comment"></i>
                         <i class="fa-solid fa-share-nodes"></i>
                         <i class="fa-regular fa-bookmark" onclick="salvar(${i}, this)"></i>`;
        div.appendChild(icons);
        feed.appendChild(div);
    });
}
carregarFeed();

// Engajamento
function curtir(i, el){
    el.classList.toggle("like");
}
function salvar(i, el){
    el.classList.toggle("saved");
}
</script>
</body>
</html>
