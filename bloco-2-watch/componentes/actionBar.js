function ActionBar() {
    return `
        <div class="action-bar">
            <button class="btn-action" onclick="toggleLike(this)">
                <i class="fa-solid fa-thumbs-up"></i> Curtir
            </button>
            <button class="btn-action">
                <i class="fa-solid fa-comment"></i> Comentar
            </button>
            <button class="btn-action">
                <i class="fa-solid fa-share"></i> Compartilhar
            </button>
            <button class="btn-action">
                <i class="fa-solid fa-bookmark"></i> Salvar
            </button>
        </div>
    `;
}

function toggleLike(button) {
    const isLiked = button.getAttribute('data-liked') === 'true';
    button.setAttribute('data-liked', !isLiked);
    button.innerHTML = isLiked 
        ? '<i class="fa-solid fa-thumbs-up"></i> Curtir' 
        : '<i class="fa-solid fa-thumbs-up"></i> Curtido';
    button.style.color = isLiked ? '#b0b3b8' : '#1877f2';
}
