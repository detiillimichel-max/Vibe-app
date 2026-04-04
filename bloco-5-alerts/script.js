// 🧠 ALMA DO BLOCO 5 - ALERTAS
console.log("Central de Notificações: Online.");

// Função para o usuário interagir com os alertas
document.addEventListener('click', function(e) {
    const item = e.target.closest('.notif-item');
    if (item && item.classList.contains('unread')) {
        item.classList.remove('unread');
        item.style.borderLeft = "1px solid rgba(255, 255, 255, 0.05)";
        console.log("Notificação marcada como lida pelo usuário.");
    }
});
