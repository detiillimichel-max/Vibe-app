/**
 * OIO ONE - WATCH CONTROLLER (LISTA ACUMULATIVA 🎥)
 */
export const WatchController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        display.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; color: white; font-family: sans-serif; padding: 15px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 25px;">
                    <span style="background: red; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">LIVE</span>
                    <h2 style="margin: 0; font-size: 24px;">Vídeos OIO</h2>
                </div>

                <!-- ÁREA DE UPLOAD -->
                <div style="background: #242526; padding: 20px; border-radius: 15px; border: 1px dashed #3a3b3c; margin-bottom: 25px; text-align: center;">
                    <p style="color: #b0b3b8; margin-bottom: 15px;">Suba vídeos da sua galeria (Máx 50MB)</p>
                    <input type="text" id="video-title" placeholder="Título do vídeo..." style="width: 90%; padding: 10px; background: #3a3b3c; border: none; border-radius: 8px; color: white; margin-bottom: 15px;">
                    <br><br>
                    <label style="background: white; color: black; padding: 12px 25px; border-radius: 25px; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                        📁 Selecionar Galeria
                        <input type="file" id="input-video" accept="video/*" style="display: none;">
                    </label>
                </div>

                <!-- FEED DE VÍDEOS (ONDE OS VÍDEOS VÃO SOMAR) -->
                <div id="video-feed" style="display: flex; flex-direction: column; gap: 20px;">
                    <!-- Vídeos entram aqui -->
                </div>
            </div>
        `;

        const inputVideo = document.getElementById('input-video');
        const feed = document.getElementById('video-feed');
        const titleInput = document.getElementById('video-title');

        inputVideo.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const fileURL = URL.createObjectURL(file);
                const titulo = titleInput.value || "OIO feito para você";

                // CRIANDO UM NOVO CARD (SEM APAGAR O ANTERIOR)
                const novoVideo = `
                    <div class="video-card" style="background: #1c1e21; border-radius: 12px; overflow: hidden; border: 1px solid #333;">
                        <div style="padding: 12px; display: flex; align-items: center; gap: 10px;">
                            <div style="width: 40px; height: 40px; background: #e67e22; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">OIO</div>
                            <strong>${titulo}</strong>
                        </div>
                        <video controls style="width: 100%; display: block; background: #000;">
                            <source src="${fileURL}" type="video/mp4">
                        </video>
                    </div>
                `;

                // INSERE NO TOPO DO FEED
                feed.insertAdjacentHTML('afterbegin', novoVideo);
                
                // Limpa o campo de título para o próximo
                titleInput.value = "";
            }
        };
    }
};
