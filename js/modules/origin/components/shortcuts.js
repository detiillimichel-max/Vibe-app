/**
 * OIO ONE - SHORTCUTS SYSTEM 💎
 * Atalhos Rápidos para as Funções do Ecossistema.
 */

export const Shortcuts = {
    // Desenha a grade de botões de luxo
    render() {
        return `
            <div id="oio-shortcuts-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 30px;">
                
                <!-- ATALHO POSTAR VÍDEO (WATCH) -->
                <button onclick="window.OioApp.goTo('watch')" style="background: #242526; border: 1px solid #333; padding: 15px 10px; border-radius: 15px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                    <div style="width: 35px; height: 35px; background: rgba(230, 126, 34, 0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #e67e22;">
                        <i class="fas fa-video"></i>
                    </div>
                    <span style="color: white; font-size: 10px; font-weight: bold; text-transform: uppercase;">Postar Vibe</span>
                </button>

                <!-- ATALHO VENDER (MARKET) -->
                <button onclick="window.OioApp.goTo('market')" style="background: #242526; border: 1px solid #333; padding: 15px 10px; border-radius: 15px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                    <div style="width: 35px; height: 35px; background: rgba(46, 204, 113, 0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #2ecc71;">
                        <i class="fas fa-tag"></i>
                    </div>
                    <span style="color: white; font-size: 10px; font-weight: bold; text-transform: uppercase;">Anunciar</span>
                </button>

                <!-- ATALHO PERFIL (IDENTITY) -->
                <button id="btn-edit-identity" style="background: #242526; border: 1px solid #333; padding: 15px 10px; border-radius: 15px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                    <div style="width: 35px; height: 35px; background: rgba(52, 152, 219, 0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #3498db;">
                        <i class="fas fa-user-edit"></i>
                    </div>
                    <span style="color: white; font-size: 10px; font-weight: bold; text-transform: uppercase;">Meu Perfil</span>
                </button>

            </div>
        `;
    }
};
