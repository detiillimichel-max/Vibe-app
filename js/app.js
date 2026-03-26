// TESTE DE CONEXÃO OIO ONE
alert("O Cérebro está VIVO! 🚀");

document.addEventListener('DOMContentLoaded', () => {
    const btnHub = document.getElementById('btn-hub');
    const hubLayer = document.getElementById('hub-layer');

    if (btnHub && hubLayer) {
        btnHub.onclick = () => {
            hubLayer.classList.toggle('hub-hidden');
            alert("Você abriu o Hub! 💎");
        };
    } else {
        alert("Erro: O botão ou a vitrine não foram encontrados no HTML.");
    }
});
