/**
 * OIO ONE - LIKE SYSTEM 💎
 */
window.LikeSystem = {
    toggleLike(btn) {
        const icon = btn.querySelector('i');
        const countSpan = btn.querySelector('.like-count');
        let count = parseInt(countSpan.innerText);

        if (icon.classList.contains('far')) {
            icon.classList.replace('far', 'fas');
            icon.style.color = '#ff3040';
            countSpan.innerText = count + 1;
        } else {
            icon.classList.replace('fas', 'far');
            icon.style.color = 'white';
            countSpan.innerText = count - 1;
        }
    }
};
