// OIO ONE QUANTUM - Gestos e Transições
document.addEventListener('DOMContentLoaded', () => {
    const btnHub = document.getElementById('btn-hub');
    const hubLayer = document.getElementById('hub-layer');
    const btnCloseHub = document.querySelector('.close-hub');

    if (btnHub) {
        btnHub.onclick = () => {
            hubLayer.classList.remove('hub-hidden');
        };
    }

    if (btnCloseHub) {
        btnCloseHub.onclick = () => {
            hubLayer.classList.add('hub-hidden');
        };
    }
});
