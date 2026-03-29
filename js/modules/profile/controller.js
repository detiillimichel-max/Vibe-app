// OIO ONE - PROFILE CONTROLLER 💎
export const ProfileController = {
    async init() { // ✅ BUG 2 - sem parâmetro
        const userName = localStorage.getItem('oio_user_name') || 'Membro OIO';
        const userEmail = localStorage.getItem('oio_user_email') || '';
        const userAvatar = localStorage.getItem('oio_user_avatar') || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

        const display = document.getElementById('universe-display');
        if (!display) return;

        display.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; color: #e4e6eb; font-family: sans-serif; padding: 15px;">
                
                <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: bold;">Menu</h2>

                <div style="background: #242526; border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                    <img src="${userAvatar}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid #1877f2;">
                    <div>
                        <div style="font-weight: 600; font-size: 18px;">${userName}</div>
                        <div style="font-size: 14px; color: #b0b3b8;">${userEmail}</div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div style="background: #242526; padding: 15px; border-radius: 8px; font-weight: 600;">
                        <i class="fas fa-bookmark" style="color: #9360f7; margin-right: 10px;"></i> Salvos
                    </div>
                    <div style="background: #242526; padding: 15px; border-radius: 8px; font-weight: 600;">
                        <i class="fas fa-history" style="color: #1877f2; margin-right: 10px;"></i> Recordações
                    </div>
                    <div style="background: #242526; padding: 15px; border-radius: 8px; font-weight: 600;">
                        <i class="fas fa-users-cog" style="color: #2abba7; margin-right: 10px;"></i> Grupos
                    </div>
                    <div style="background: #242526; padding: 15px; border-radius: 8px; font-weight: 600;">
                        <i class="fas fa-cog" style="color: #b0b3b8; margin-right: 10px;"></i> Definições
                    </div>
                </div>

                <button onclick="localStorage.clear(); location.reload();" 
                    style="width: 100%; background: #3a3b3c; color: #e4e6eb; border: none; padding: 12px; border-radius: 6px; font-weight: 600; margin-top: 20px; cursor: pointer;">
                    Sair da conta
                </button>
            </div>
        `;
    }
};
