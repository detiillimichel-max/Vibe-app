/**
 * OIO ONE - IDENTITY SYSTEM 💎
 * Gerencia o Nome e a Foto do Usuário em todo o Ecossistema.
 */

export const Identity = {
    // Salva os dados para sempre no navegador
    save(name, avatar) {
        if (name) localStorage.setItem('oio_user_name', name);
        if (avatar) localStorage.setItem('oio_user_avatar', avatar);
    },

    // Puxa os dados salvos
    get() {
        return {
            name: localStorage.getItem('oio_user_name') || "Membro OIO",
            avatar: localStorage.getItem('oio_user_avatar') || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        };
    },

    // Gera o HTML da barra de perfil no topo da Home
    renderHeader() {
        const user = this.get();
        return `
            <div id="oio-profile-header" style="display: flex; align-items: center; gap: 15px; padding: 20px; background: #1c1e21; border-radius: 20px; margin-bottom: 25px; border: 1px solid #333;">
                <img src="${user.avatar}" style="width: 50px; height: 50px; border-radius: 15px; object-fit: cover; border: 2px solid #e67e22;">
                <div>
                    <h3 style="margin: 0; color: white; font-size: 18px;">${user.name}</h3>
                    <span style="font-size: 11px; color: #e67e22; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Status: Luxo Ativo</span>
                </div>
            </div>
        `;
    }
};
