function ActionBar() {
    return `
        <div class="action-bar">
            <button class="btn-action" onclick="toggleLike(this)">👍 Curtir</button>
            <button class="btn-action">💬 Comentar</button>
            <button class="btn-action">🔄 Compartilhar</button>
        </div>
    `;
}

function toggleLike(button) {
    const isLiked = button.getAttribute('data-liked') === 'true';
    button.setAttribute('data-liked', !isLiked);
    button.innerHTML = isLiked ? '👍 Curtir' : '👍 Curtido';
    button.style.color = isLiked ? '#b0b3b8' : '#1877f2';
}
