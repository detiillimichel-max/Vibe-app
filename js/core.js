// core.js - O Motor
document.addEventListener('DOMContentLoaded', () => {
  // Simulação de login (depois vamos integrar com Supabase Auth)
  const userLogged = true; // trocar para false para testar bloqueio

  if (!userLogged) {
    alert("Você precisa estar logado para acessar os blocos.");
    window.location.href = "/login.html"; // página de login futura
    return;
  }

  // Controle de navegação do menu inicial
  const links = document.querySelectorAll('.menu-principal a');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const destino = link.getAttribute('href');
      abrirBloco(destino.replace('/', '')); // chama o corredor
    });
  });
});
