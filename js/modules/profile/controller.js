/**
 * OIO ONE - PROFILE CONTROLLER
 * Gerencia a exibição do perfil e menu de usuário.
 */

export const ProfileController = {
    async init(userName) {
        const display = document.getElementById('universe-display');
        if (!display) return;

        display.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; color: #e4e6eb; font-family: sans-serif; padding: 15px;">
                
                <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: bold;">Menu</h2>

                <!-- CARD DE PERFIL -->
                <div style="background: #242526; border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 15px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                    <div style="width: 60px; height: 60px; border-radius: 50%; overflow: hidden; border: 2px solid #3e4042;">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div>
                        <div style="font-weight: 600; font-size: 18px;">${userName}</div>
                        <div style="font-size: 14px; color: #b0b3b8;">Ver seu perfil</div>
                    </div>
                </div>

                <!-- LISTA DE OPÇÕES (ESTILO PREMIUM) -->
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

                <button style="width: 100%; background: #3a3b3c; color: #e4e6eb; border: none; padding: 12px; border-radius: 6px; font-weight: 600; margin-top: 20px; cursor: pointer;">
                    Sair da conta
                </button>

            </div>
        `;
    }
};
