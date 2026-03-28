import { supabase } from '../../core.js';

export const WatchController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        display.innerHTML = `
            <div style="padding: 15px; max-width: 600px; margin: 0 auto; padding-bottom: 100px;">
                <h2 style="color: #fff; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                    <span style="background: #ff0000; padding: 5px 10px; border-radius: 8px; font-size: 14px;">LIVE</span> 
                    Vídeos OIO
                </h2>

                <!-- ÁREA DE UPLOAD -->
                <div style="background: #242526; padding: 20px; border-radius: 12px; border: 1px dashed #3e4042; margin-bottom: 25px; text-align: center;">
                    <p style="color: #b0b3b8; font-size: 14px; margin-bottom: 15px;">Suba vídeos da sua galeria (Máx 50MB)</p>
                    
                    <input type="text" id="vid-title" placeholder="Título do vídeo..." 
                        style="width: 90%; background: #3a3b3c; border: none; padding: 10px; border-radius: 8px; color: #fff; margin-bottom: 15px; outline: none;">
                    
                    <label for="file-upload" style="background: #fff; color: #000; padding: 10px 20px; border-radius: 20px; font-weight: bold; cursor: pointer; display: inline-block;">
                        📁 Selecionar Galeria
                    </label>
                    <input type="file" id="file-upload" accept="video/*" style="display: none;">
                    
                    <div id="upload-status" style="margin-top: 15px; color: #1877f2; font-size: 13px; font-weight: bold;"></div>
                </div>

                <!-- FEED DE VÍDEOS -->
                <div id="video-feed" style="display: flex; flex-direction: column; gap: 20px;">
                    <p style="color: #b0b3b8; text-align: center;">Carregando o cinema...</p>
                </div>
            </div>
        `;

        this.setupUpload();
        this.loadVideos();
    },

    setupUpload() {
        const fileInput = document.getElementById('file-upload');
        const titleInput = document.getElementById('vid-title');
        const status = document.getElementById('upload-status');

        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            const title = titleInput.value.trim();

            if (!file) return;
            if (!title) {
                alert("Por favor, digite um título primeiro!");
                return;
            }

            // Validação de tamanho (50MB)
            if (file.size > 50 * 1024 * 1024) {
                alert("Vídeo muito grande! O limite é 50MB.");
                return;
            }

            status.innerText = "🚀 Enviando vídeo... aguarde.";

            // 1. Enviar para o STORAGE
            const fileName = `${Date.now()}_${file.name}`;
            const { data, error: uploadError } = await supabase.storage
                .from('videos-storage')
                .upload(fileName, file);

            if (uploadError) {
                status.innerText = "❌ Erro no upload.";
                console.error(uploadError);
                return;
            }

            // 2. Pegar a URL pública do vídeo
            const { data: urlData } = supabase.storage
                .from('videos-storage')
                .getPublicUrl(fileName);

            const videoUrl = urlData.publicUrl;

            // 3. Salvar na TABELA 'videos'
            const { error: dbError } = await supabase
                .from('videos')
                .insert([{ title: title, video_url: videoUrl }]);

            if (dbError) {
                status.innerText = "❌ Erro ao salvar dados.";
            } else {
                status.innerText = "✅ Vídeo publicado!";
                titleInput.value = "";
                this.loadVideos();
            }
        };
    },

    async loadVideos() {
        const feed = document.getElementById('video-feed');
        const { data: videos, error } = await supabase
            .from('videos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error || !videos || videos.length === 0) {
            feed.innerHTML = '<p style="color: #b0b3b8; text-align: center;">Nenhum vídeo ainda. Seja o primeiro diretor!</p>';
            return;
        }

        let html = "";
        videos.forEach(v => {
            html += `
                <div style="background: #242526; border-radius: 12px; overflow: hidden; border: 1px solid #3e4042; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                    <div style="padding: 12px; display: flex; align-items: center; gap: 10px;">
                        <div style="width: 35px; height: 35px; background: linear-gradient(45deg, #f09433, #e6683c); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">OIO</div>
                        <span style="color: white; font-weight: 600; font-size: 14px;">${v.title}</span>
                    </div>
                    <video controls style="width: 100%; max-height: 400px; background: #000; display: block;">
                        <source src="${v.video_url}" type="video/mp4">
                    </video>
                </div>
            `;
        });
        feed.innerHTML = html;
    }
};
