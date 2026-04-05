// quantum.js - O Corredor
function abrirBloco(nome) {
  const container = document.getElementById('app');
  container.classList.add('fade-out');

  setTimeout(() => {
    fetch(`/bloco-${nome}/index.html`)
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;
        container.classList.remove('fade-out');
        container.classList.add('fade-in');
      });
  }, 300);
}

function fecharBloco() {
  window.history.back();
}
