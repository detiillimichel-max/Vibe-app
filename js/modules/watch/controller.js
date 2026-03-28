/**
 * OIO ONE - WATCH CONTROLLER 🎬
 * Gerencia a exibição de vídeos e conteúdos.
 */

export const WatchController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        display.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; color: #e4e6eb; font-family: sans-serif; padding: 15px;">
                <div style="margin-bottom: 20px;">
                    <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Vídeos</h2>
                    <p style="color: #b0b3b8; font-size: 14px;">Conteúdo Exclusivo OIO ONE</p>
                </div>

                <!-- PLAYER DE VÍDEO PREMIUM -->
                <div style="background: #242526; border-radius: 12px; overflow: hidden; border: 1px solid #3a3b3c; margin-bottom: 20px;">
                    <video controls style="width: 100%; display: block; background: #000;">
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                        Seu navegador não suporta vídeos.
                    </video>
                    <div style="padding: 15px;">
                        <div style="font-weight: 600; font-size: 18px; margin-bottom: 5px;">Abertura do Ecossistema</div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 30px; height: 30px; background: #1877f2; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-gem" style="font-size: 12px; color: white;"></i>
                            </div>
                            <span style="color: #b0b3b8; font-size: 14px;">Canal Oficial OIO</span>
                        </div>
                    </div>
                </div>

                <p style="text-align: center; color: #b0b3b8; font-size: 14px; margin-top: 30px;">Novos conteúdos sendo processados...</p>
            </div>
        `;
    }
};
