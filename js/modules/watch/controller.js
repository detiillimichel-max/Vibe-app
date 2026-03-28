import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export const WatchController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        display.innerHTML = `
            <div id="watch-wrapper" style="max-width: 600px; margin: 0 auto; color: #e4e6eb; font-family: sans-serif; padding-bottom: 80px;">
                <div style="padding: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Vídeos</h2>
                    <i class="fas fa-search" style="background: #3a3b3c; padding: 10px; border-radius: 50%;"></i>
                </div>
                
                <div id="video-feed">
                    <p style="text-align: center; color: #b0b3b8; padding: 20px;">Buscando vídeos no servidor...</p>
                </div>
            </div>
        `;

        this.loadVideos();
    },

    loadVideos() {
        const db = getDatabase();
        const videoRef = ref(db, 'videos');
        const feed = document.getElementById('video-feed');

        onValue(videoRef, (snapshot) => {
            if (!snapshot.exists()) {
                // Caso não tenha vídeos no Firebase, mostramos um padrão para não ficar vazio
                this.renderEmptyNotice(feed);
                return;
            }

            let html = "";
            const data = snapshot.val();
            
            Object.values(data).reverse().forEach(video => {
                html += `
                    <div style="background: #242526; margin-bottom: 15px; border-top: 1px solid #3e4042; border-bottom: 1px solid #3e4042;">
                        <div style="padding: 12px; display: flex; align-items: center; gap: 10px;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; background: #1877f2; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-video" style="color: white; font-size: 14px;"></i>
                            </div>
                            <div>
                                <div style="font-weight: 600; color: #fff;">${video.title || 'OIO Video'}</div>
                                <div style="font-size: 12px; color: #b0b3b8;">${video.category || 'Destaque'}</div>
                            </div>
                        </div>
                        <div style="width: 100%; background: #000; aspect-ratio: 16/9;">
                            <video controls style="width: 100%; height: 100%;">
                                <source src="${video.url}" type="video/mp4">
                            </video>
                        </div>
                    </div>
                `;
            });
            feed.innerHTML = html;
        });
    },

    renderEmptyNotice(container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-clapperboard" style="font-size: 40px; color: #3a3b3c; margin-bottom: 15px;"></i>
                <p style="color: #b0b3b8;">Nenhum vídeo disponível no momento.</p>
            </div>
        `;
    }
};
