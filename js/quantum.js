export function abrirBloco(nome) {
  const container = document.getElementById('app');
  container.classList.add('fade-out');

  setTimeout(() => {
    fetch(`./bloco-${nome}/index.html`)
      .then(res => res.text())
      .then(html => {
        container.innerHTML = `<div class="tela">${html}</div>`;
        container.classList.remove('fade-out');
        container.classList.add('fade-in');
      })
      .catch(err => {
        container.innerHTML = `<p style="color:red;">Erro ao carregar bloco ${nome}</p>`;
        console.error(err);
      });
  }, 300);
}
