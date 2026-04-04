// 🧠 ALMA DO BLOCO 3 - FRIENDS
console.log("Bloco 3: Friends Ativo!");

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-add')) {
        const btn = e.target;
        btn.innerText = "Solicitado";
        btn.style.background = "#333";
        console.log("Solicitação de amizade enviada!");
    }
});
