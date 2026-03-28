import { supabase } from '../../core.js';

export const WatchController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        // Título da seção
        display.innerHTML = `
            <div style="padding: 15px; max-width: 800px; margin: 0 auto;">
                <h2 style="color: #fff; margin-bottom: 20px;">Vídeos</h2>
                <div id="video-feed" style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                    <p style="color: #b0b3b8;">Carregando vídeos...</p>
                </div>
            </div>
        `;

        this.loadVideos();
    },

    async loadVideos() {
        const videoFeed = document.getElementById('video-feed');

        // BUSCA OS VÍDEOS NA TABELA QUE VOCÊ CRIOU
        const { data: videos, error } = await supabase
            .from('videos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error || !videos || videos.length === 0) {
            videoFeed.innerHTML = '<p style="color: #b0b3b8; text-align: center;">Nenhum vídeo disponível ainda.</p>';
            return;
        }

        // Gera o visual dos vídeos
        let html = "";
        videos.forEach(vid => {
            html += `
                <div style="background: #242526; border-radius: 8px; overflow: hidden; border: 1px solid #3e4042;">
                    <div style="padding: 12px; display: flex; align-items: center; gap: 10px;">
                        <div style="width: 32px; height: 32px; background: #1877f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white;">
                            O
                        </div>
                        <span style="color: white; font-weight: 600;">OIO ONE Video</span>
                    </div>
                    
                    <video controls poster="${vid.thumbnail || ''}" style="width: 100%; aspect-ratio: 16/9; background: #000;">
                        <source src="${vid.video_url}" type="video/mp4">
                        Seu navegador não suporta vídeos.
                    </video>

                    <div style="padding: 12px;">
                        <h3 style="color: white; font-size: 16px; margin: 0;">${vid.title}</h3>
                    </div>
                </div>
            `;
        });
        videoFeed.innerHTML = html;
    }
};
