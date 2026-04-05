// core.js - O Motor
document.addEventListener('DOMContentLoaded', () => {
  const userLogged = true; // depois integrar com Supabase Auth

  if (!userLogged) {
    alert("Você precisa estar logado para usar o app.");
    window.location.href = "/login.html";
    return;
  }

  // Navegação interna
  const botoes = document.querySelectorAll('.menu-principal a');
  botoes.forEach(botao => {
    botao.addEventListener('click', (e) => {
      e.preventDefault();
      const destino = botao.getAttribute('href').replace('/', '');
      abrirBloco(destino);
    });
  });
});
