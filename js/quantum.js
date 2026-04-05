// quantum.js - O Corredor
function abrirBloco(nome) {
  // animação de transição suave
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = `/${nome}`;
  }, 300);
}

function fecharBloco() {
  window.history.back();
}
