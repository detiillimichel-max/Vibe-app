// OIO ONE CORE - Motor de Identidade
document.addEventListener('DOMContentLoaded', () => {
    const btnEntrar = document.getElementById('btn-entrar');
    const portal = document.getElementById('portal-layer');
    const appLayer = document.getElementById('app-layer');
    const video = document.getElementById('main-video');

    if (btnEntrar) {
        btnEntrar.onclick = () => {
            const email = document.getElementById('user-email').value;
            const pass = document.getElementById('user-pass').value;

            if (email !== "" && pass !== "") {
                portal.style.opacity = '0';
                setTimeout(() => {
                    portal.classList.add('hidden');
                    appLayer.classList.remove('hidden');
                    if (video) video.play();
                }, 1000);
            } else {
                alert("Identifique-se para entrar no Universo.");
            }
        };
    }
});

