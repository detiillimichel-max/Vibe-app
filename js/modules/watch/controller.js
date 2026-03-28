/**
 * OIO ONE - WATCH CONTROLLER (GALERIA ATIVA 🎬)
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
                    <br>
                    <label style="background: white; color: black; padding: 12px 25px; border-radius: 25px; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                        📁 Selecionar Galeria
                        <input type="file" id="input-video" accept="video/*" style="display: none;">
                    </label>
                    <p id="upload-status" style="color: #4cd137; font-size: 14px; margin-top: 15px; display: none;">✅ Vídeo carregado!</p>
                </div>

                <!-- PLAYER PRINCIPAL -->
                <div style="background: #1c1e21; border-radius: 12px; overflow: hidden; border: 1px solid #333;">
                    <div style="padding: 12px; display: flex; align-items: center; gap: 10px;">
                        <div style="width: 40px; height: 40px; background: #e67e22; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">OIO</div>
                        <strong id="display-title">OIO app</strong>
                    </div>
                    <video id="main-player" controls style="width: 100%; display: block; background: #000;">
                        <source src="" type="video/mp4">
                    </video>
                </div>
            </div>
        `;

        // LÓGICA DE CARREGAMENTO DO VÍDEO
        const inputVideo = document.getElementById('input-video');
        const player = document.getElementById('main-player');
        const status = document.getElementById('upload-status');
        const titleInput = document.getElementById('video-title');
        const displayTitle = document.getElementById('display-title');

        inputVideo.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const fileURL = URL.createObjectURL(file);
                player.src = fileURL;
                player.load();
                status.style.display = 'block';
                if(titleInput.value) displayTitle.innerText = titleInput.value;
                
                // Feedback visual de luxo
                player.play();
            }
        };
    }
};
