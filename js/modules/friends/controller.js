/**
 * OIO ONE - FRIENDS CONTROLLER (VIVO 🚀)
 * Gerencia a lista de amigos e conexões reais do Supabase.
 */

export const FriendsController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        // 1. BUSCANDO OS DADOS REAIS
        const { data: profiles, error } = await window.supabase
            .from('profiles')
            .select('*');

        // 2. O SEU VISUAL DE LUXO (O CABEÇALHO)
        let htmlContent = `
            <div style="max-width: 600px; margin: 0 auto; color: #e4e6eb; font-family: sans-serif; padding: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Amigos</h2>
                    <i class="fas fa-search" style="color: #b0b3b8; font-size: 18px;"></i>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <span style="font-weight: 600; font-size: 17px;">Conexões Reais</span>
                    <span style="color: #1877f2; font-size: 14px; cursor: pointer;">Ver tudo</span>
                </div>
        `;

        // 3. INJETANDO OS AMIGOS DO BANCO (Michel, Maria Gabriela, etc)
        if (profiles && profiles.length > 0) {
            profiles.forEach(amigo => {
                htmlContent += `
                    <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 20px;">
                        <div style="width: 80px; height: 80px; border-radius: 50%; background: #3a3b3c; overflow: hidden; border: 2px solid #1877f2;">
                            <img src="${amigo.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'}" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="flex: 1; border-bottom: 1px solid #3e4042; padding-bottom: 15px;">
                            <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">${amigo.username}</div>
                            <div style="color: #b0b3b8; font-size: 14px; margin-bottom: 8px;">📍 ${amigo.city || 'OIO ONE'}</div>
                            <div style="display: flex; gap: 8px;">
                                <button style="flex: 1; background: #1877f2; color: white; border: none; padding: 8px; border-radius: 6px; font-weight: 600; cursor: pointer;">Perfil</button>
                                <button style="flex: 1; background: #3a3b3c; color: white; border: none; padding: 8px; border-radius: 6px; font-weight: 600; cursor: pointer;">Mensagem</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            htmlContent += `<p style="text-align: center; color: #b0b3b8;">Nenhum amigo encontrado no banco.</p>`;
        }

        htmlContent += `</div>`;
        display.innerHTML = htmlContent;
    }
};
