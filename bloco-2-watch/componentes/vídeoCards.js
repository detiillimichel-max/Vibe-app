function VideoCard(video) {
    return `
        <div class="video-card">
            <div class="header-video">
                <div class="user-name">${video.user_name}</div>
                <div class="video-time">${new Date(video.created_at).toLocaleString()}</div>
            </div>
            <div class="video-content">
                <video controls width="100%">
                    <source src="${video.url}" type="video/mp4">
                    Seu navegador não suporta vídeo.
                </video>
                <p>${video.description}</p>
            </div>
            ${ActionBar()}
        </div>
    `;
}
