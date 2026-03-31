export const FriendsController = {
    async init() {
        const display = document.getElementById('universe-display');
        const myName = localStorage.getItem('oio_user_name');
        const myEmail = localStorage.getItem('oio_user_email');

        const { data: perfis } = await window.supabase
            .from('profiles')
            .select('*')
            .neq('email', myEmail);

        // Guarda os contatos globalmente para o chat acessar
        window._contatos = perfis || [];

        display.innerHTML = `
            <div id="tela-conexoes" style="padding:15px; max-width:600px; margin:0 auto;">
                <h2 style="color:white; margin-bottom:20px;">Conexões Reais</h2>
                <div id="lista-amigos">
                    ${perfis && perfis.length > 0 ? perfis.map((p, i) => `
                        <div style="background:#1c1e21; padding:15px; border-radius:15px; margin-bottom:12px; border:1px solid #333; display:flex; align-items:center;">
                            <img src="${p.avatar_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}" 
                                style="width:55px; height:55px; border-radius:50%; margin-right:15px; object-fit:cover; border:2px solid #1877f2;"
                                onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'">
                            <div style="flex:1;">
                                <div style="font-weight:bold; color:white; font-size:15px;">${p.username || p.email}</div>
                                <div style="color:#aaa; font-size:12px; margin-bottom:8px;">📍 OIO ONE</div>
                                <div style="display:flex; gap:8px;">
                                    <button style="flex:1; background:#1877f2; color:white; border:none; padding:8px; border-radius:8px; font-weight:bold; cursor:pointer;">
                                        Perfil
                                    </button>
                                    <button onclick="window.abrirChat(${i})"
                                        style="flex:1; background:#333; color:white; border:none; padding:8px; border-radius:8px; font-weight:bold; cursor:pointer;">
                                        💬 Mensagem
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('') : '<p style="color:#666; text-align:center; padding:40px;">Nenhuma conexão ainda.</p>'}
                </div>
            </div>

            <!-- TELA DE CHAT -->
            <div id="tela-chat" style="display:none; flex-direction:column; height:calc(100vh - 60px); max-width:600px; margin:0 auto;">
                
                <!-- HEADER -->
                <div style="background:#242526; padding:12px 15px; display:flex; align-items:center; gap:12px; border-bottom:1px solid #3a3b3c; position:sticky; top:0; z-index:10;">
                    <button onclick="window.fecharChat()" style="background:none; border:none; color:white; font-size:22px; cursor:pointer; padding:0 8px 0 0;">←</button>
                    <img id="chat-avatar" src="" style="width:42px; height:42px; border-radius:50%; object-fit:cover; border:2px solid #1877f2;"
                        onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'">
                    <div>
                        <div id="chat-nome" style="font-weight:bold; color:white; font-size:16px;"></div>
                        <div style="color:#1877f2; font-size:11px;">OIO ONE</div>
                    </div>
                </div>

                <!-- MENSAGENS -->
                <div id="chat-mensagens" style="flex:1; overflow-y:auto; padding:15px 15px 80px 15px; display:flex; flex-direction:column; gap:10px; background:#111;">
                    <p style="text-align:center; color:#444; font-size:12px;">Carregando conversa...</p>
                </div>

                <!-- INPUT FIXO NO FUNDO -->
                <div style="background:#242526; padding:10px 15px; display:flex; align-items:center; gap:10px; border-top:1px solid #3a3b3c; position:sticky; bottom:0;">
                    <input id="chat-input" type="text" placeholder="Digite uma mensagem..."
                        style="flex:1; background:#3a3b3c; border:none; padding:13px 18px; border-radius:25px; color:white; outline:none; font-size:15px;">
                    <button id="chat-enviar" style="background:#1877f2; border:none; width:46px; height:46px; border-radius:50%; color:white; font-size:20px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        ➤
                    </button>
                </div>
            </div>
        `;
    }
};

// ✅ Abre o chat pelo índice (evita bug de aspas)
window.abrirChat = async (index) => {
    const p = window._contatos[index];
    if (!p) return;

    const nomeContato = p.username || p.email;
    const avatarContato = p.avatar_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    const myName = localStorage.getItem('oio_user_name');

    document.getElementById('tela-conexoes').style.display = 'none';
    const telaChat = document.getElementById('tela-chat');
    telaChat.style.display = 'flex';
    document.getElementById('chat-nome').innerText = nomeContato;
    document.getElementById('chat-avatar').src = avatarContato;

    await window.carregarMensagens(myName, nomeContato);

    const input = document.getElementById('chat-input');

    input.onkeypress = (e) => {
        if (e.key === 'Enter') document.getElementById('chat-enviar').click();
    };

    document.getElementById('chat-enviar').onclick = async () => {
        const texto = input.value.trim();
        if (!texto) return;
        input.value = '';

        // ✅ Som ao enviar (ativado pelo toque do usuário)
        window.tocarSomMensagem();

        await window.supabase.from('messages').insert([{
            sender_id: myName,
            receiver_id: nomeContato,
            content: texto,
            type: 'text'
        }]);

        await window.carregarMensagens(myName, nomeContato);
    };

    if (window._chatInterval) clearInterval(window._chatInterval);
    window._chatInterval = setInterval(async () => {
        const anterior = document.getElementById('chat-mensagens')?.children.length;
        await window.carregarMensagens(myName, nomeContato);
        const atual = document.getElementById('chat-mensagens')?.children.length;

        // ✅ Som ao receber mensagem nova
        if (atual > anterior) window.tocarSomMensagem();
    }, 5000);
};

// ✅ Som de mensagem
window.tocarSomMensagem = () => {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
};

// ✅ Carrega mensagens da conversa
window.carregarMensagens = async (myName, nomeContato) => {
    const box = document.getElementById('chat-mensagens');
    if (!box) return;

    const { data: msgs } = await window.supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${myName},receiver_id.eq.${nomeContato}),and(sender_id.eq.${nomeContato},receiver_id.eq.${myName})`)
        .order('id', { ascending: true });

    if (!msgs || msgs.length === 0) {
        box.innerHTML = `<p style="text-align:center; color:#444; font-size:13px; margin-top:40px;">Nenhuma mensagem ainda. Diga olá! 👋</p>`;
        return;
    }

    const eraNoFundo = box.scrollTop + box.clientHeight >= box.scrollHeight - 10;

    box.innerHTML = msgs.map(m => {
        const isMeu = m.sender_id === myName;
        return `
            <div style="display:flex; justify-content:${isMeu ? 'flex-end' : 'flex-start'};">
                <div style="
                    background:${isMeu ? '#1877f2' : '#242526'};
                    color:white;
                    padding:10px 14px;
                    border-radius:${isMeu ? '18px 18px 4px 18px' : '18px 18px 18px 4px'};
                    max-width:85%;
                    font-size:15px;
                    line-height:1.5;
                    border:1px solid ${isMeu ? '#1565c0' : '#3a3b3c'};
                    word-break:break-word;
                ">
                    ${m.content}
                    <div style="font-size:10px; opacity:0.6; margin-top:5px; text-align:right;">
                        ${new Date(m.created_at).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Só rola para o fundo se já estava no fundo
    if (eraNoFundo) box.scrollTop = box.scrollHeight;
};

// ✅ Fecha o chat
window.fecharChat = () => {
    if (window._chatInterval) clearInterval(window._chatInterval);
    document.getElementById('tela-chat').style.display = 'none';
    document.getElementById('tela-conexoes').style.display = 'block';
};
