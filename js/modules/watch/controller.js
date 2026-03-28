/**
 * OIO ONE - WATCH CONTROLLER (MÓDULO DE VÍDEOS)
 * Responsável por gerenciar e exibir a tela de vídeos.
 */

export const WatchController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        // 1. LIMPEZA E ESTILO DA TELA
        // Remove os posts da Home e prepara o visual Dark de luxo para os vídeos.
        display.innerHTML = `
            <div id="watch-container" style="max-width: 600px; margin: 0 auto; font-family: sans-serif; color: #e4e6eb; padding-bottom: 80px;">
                
                <!-- CABEÇALHO DO MÓDULO -->
                <div style="padding: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Vídeos</h2>
                    <div style="width: 35px; height: 35px; background: #3a3b3c; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-search" style="font-size: 16px;"></i>
                    </div>
                </div>

                <!-- CARD DE VÍDEO (MODELO PROFISSIONAL) -->
                <div style="background: #242526; margin-bottom: 15px; border-top: 1px solid #3e4042; border-bottom: 1px solid #3e4042;">
                    
                    <!-- Topo do Post (Canal/Autor) -->
                    <div style="padding: 12px; display: flex; align-items: center; gap: 10px;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: #1877f2; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-play" style="color: white; font-size: 14px;"></i>
                        </div>
                        <div>
                            <div style="font-weight: 600; color: #fff;">OIO TV Oficial</div>
                            <div style="font-size: 12px; color: #b0b3b8;">Recomendado para você • <i class="fas fa-globe-americas"></i></div>
                        </div>
                    </div>

                    <!-- Legenda do Vídeo -->
                    <div style="padding: 0 15px 12px 15px; font-size: 15px;">
                        Bem-vindo ao novo módulo Watch do seu sistema! 🎬 Aqui você verá os melhores conteúdos em vídeo.
                    </div>

                    <!-- PLAYER DE VÍDEO (USANDO O LINK DO SEU SERVIDOR) -->
                    <div style="width: 100%; background: #000; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center;">
                        <video controls style="width: 100%; max-height: 400px; border: none;">
                            <source src="https://vibe-app-tawny.vercel.app/assets/video_demo.mp4" type="video/mp4">
                            Seu navegador não suporta a reprodução de vídeo.
                        </video>
                    </div>

                    <!-- BOTÕES DE INTERAÇÃO (LIKE/COMMENT/SHARE) -->
                    <div style="padding: 5px 15px; display: flex; justify-content: space-around; border-top: 1px solid #3e4042; margin-top: 5px;">
                        <div style="padding: 10px; flex: 1; text-align: center; color: #b0b3b8; font-weight: 600; font-size: 14px; cursor: pointer;">
                            <i class="far fa-thumbs-up"></i> Curtir
                        </div>
                        <div style="padding: 10px; flex: 1; text-align: center; color: #b0b3b8; font-weight: 600; font-size: 14px; cursor: pointer;">
                            <i class="far fa-comment"></i> Comentar
                        </div>
                        <div style="padding: 10px; flex: 1; text-align: center; color: #b0b3b8; font-weight: 600; font-size: 14px; cursor: pointer;">
                            <i class="fas fa-share"></i> Partilhar
                        </div>
                    </div>
                </div>

                <p style="text-align: center; color: #b0b3b8; font-size: 13px; padding: 20px;">
                    Mais vídeos serão carregados em breve.
                </p>

            </div>
        `;
    }
};
