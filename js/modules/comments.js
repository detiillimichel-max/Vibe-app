import { LikeSystem } from './likes.js';
import { CommentSystem } from './comments.js';

export const WatchController = {
    async init() {
        const display = document.getElementById('universe-display');
        // ... (mantenha a estrutura anterior, mas mude a parte do "novoVideo")

        // No comando onde você cria o "novoVideo", adicione os botões:
        const novoVideo = `
            <div class="video-card" style="background: #1c1e21; border-radius: 12px; overflow: hidden; border: 1px solid #333; margin-bottom:20px;">
                <div style="padding: 12px; display: flex; align-items: center; gap: 10px;">
                    <div style="width: 40px; height: 40px; background: #e67e22; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">OIO</div>
                    <strong>${titulo}</strong>
                </div>
                <video controls style="width: 100%; display: block; background: #000;">
                    <source src="${fileURL}" type="video/mp4">
                </video>
                
                <!-- BARRA DE INTERAÇÃO MODULAR -->
                <div style="padding: 15px; display: flex; gap: 20px; border-top: 1px solid #333;">
                    <button class="btn-like" style="background:none; border:none; color:white; cursor:pointer;">
                        <i class="far fa-heart"></i> <span class="like-count">0</span>
                    </button>
                    <button class="btn-comment" style="background:none; border:none; color:white; cursor:pointer;">
                        <i class="far fa-comment"></i> Comentar
                    </button>
                </div>
            </div>
        `;

        // Lógica para ativar os botões após injetar o vídeo:
        // (Isso garante que o LikeSystem e CommentSystem funcionem)
    }
};
