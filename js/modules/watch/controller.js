/**
 * OIO ONE - WATCH CONTROLLER (MODULAR & ACUMULATIVO 🎥)
 */
import { LikeSystem } from './likes.js';
import { CommentSystem } from './comments.js';

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

                <div id="video-feed" style="display: flex; flex-direction: column; gap: 20px;"></div>
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
                const videoId = "vid_" + Date.now(); // ID único para o comentário saber qual vídeo é

                const cardHtml = `
                    <div id="${videoId}" class="video-card" style="background: #1c1e21; border-radius: 12px; overflow: hidden; border: 1px solid #333;">
                        <div style="padding: 12px; display: flex; align-items: center; gap: 10px;">
                            <div style="width: 40px; height: 40px; background: #e67e22; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">OIO</div>
                            <strong>${titulo}</strong>
                        </div>
                        <video controls style="width: 100%; display: block; background: #000;">
                            <source src="${fileURL}" type="video/mp4">
                        </video>
                        
                        <div style="padding: 12px; display: flex; gap: 20px; border-top: 1px solid #333;">
                            <button class="btn-like" style="background:none; border:none; color:white; cursor:pointer; display:flex; align-items:center; gap:5px;">
                                <i class="far fa-heart"></i> <span class="like-count">0</span>
                            </button>
                            <button class="btn-comment" style="background:none; border:none; color:white; cursor:pointer; display:flex; align-items:center; gap:5px;">
                                <i class="far fa-comment"></i> Comentar
                            </button>
                        </div>
                    </div>
                `;

                // Adiciona ao topo
                feed.insertAdjacentHTML('afterbegin', cardHtml);
                
                // Conecta os eventos dos botões recém-criados
                const novoCard = feed.firstElementChild;
                
                novoCard.querySelector('.btn-like').onclick = function() {
                    LikeSystem.toggleLike(this);
                };
                
                novoCard.querySelector('.btn-comment').onclick = function() {
                    CommentSystem.openComments(videoId);
                };

                titleInput.value = "";
            }
        };
    }
};
