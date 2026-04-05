import { abrirBloco } from "./quantum.js";

document.addEventListener('DOMContentLoaded', () => {
  const botoes = document.querySelectorAll('.grid button');
  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const bloco = botao.dataset.bloco;
      abrirBloco(bloco);
    });
  });
});
