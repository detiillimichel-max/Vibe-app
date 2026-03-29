// OIO FRIENDS - LISTA E MENSAGENS 💎
export const FriendsController = {
    init: async () => {
        const display = document.getElementById('universe-display');
        
        // 1. Busca todos os perfis no banco (exceto o seu)
        const myEmail = localStorage.getItem('oio_user_email');
        const { data: perfis, error } = await window.supabase
            .from('profiles')
            .select('*')
            .neq('email', myEmail); // Não mostra você mesmo na lista

        if (error) {
            display.innerHTML = `<p style="color: white; padding: 20px;">Erro ao carregar amigos.</p>`;
            return;
        }

        display.innerHTML = `
            <div style="padding: 15px; max-width: 600px; margin: 0 auto;">
                <h2 style="color: white; margin-bottom: 20px;">Conexões Reais</h2>
                <div id="friends-list">
                    ${perfis.map(p => `
                        <div style="background: #1c1e21; padding: 15px; border-radius: 15px; margin-bottom: 15px; border: 1px solid #333; display: flex; align-items: center;">
                            <img src="${p.avatar_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}" 
                                 style="width: 60px; height: 60px; border-radius: 50%; margin-right: 15px;">
                            <div style="flex: 1;">
                                <div style="font-weight: bold; color: white;">${p.full_name || p.email}</div>
                                <div style="color: #aaa; font-size: 12px; margin-bottom: 10px;">📍 OIO ONE</div>
                                <div style="display: flex; gap: 10px;">
                                    <button class="btn-perfil" style="flex: 1; background: #1877f2; color: white; border: none; padding: 8px; border-radius: 8px; font-weight: bold;">Perfil</button>
                                    <button onclick="enviarMensagem('${p.email}', '${p.full_name || p.email}')" 
                                            style="flex: 1; background: #333; color: white; border: none; padding: 8px; border-radius: 8px; font-weight: bold;">Mensagem</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
};

// --- GATILHO DE MENSAGEM ---
window.enviarMensagem = async (receiverEmail, receiverName) => {
    const msg = prompt(`Enviar mensagem para ${receiverName}:`);
    
    if (!msg || msg.trim() === "") return;

    const myEmail = localStorage.getItem('oio_user_email'); 

    // Grava na tabela 'messages' que você criou no Supabase
    const { error } = await window.supabase
        .from('messages')
        .insert([{ 
            sender_id: myEmail, 
            receiver_id: receiverEmail, 
            content: msg 
        }]);

    if (!error) {
        alert("Mensagem enviada com sucesso! 💎");
    } else {
        alert("Erro ao enviar: " + error.message);
    }
};
