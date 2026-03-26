/**
 * OIO ONE - SISTEMA QUANTUM (INTERAÇÃO)
 * Função: Gestão do Hub, Vitrine e Transições de Profundidade
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referências dos Elementos da Vitrine
    const btnHub = document.getElementById('btn-hub');
    const hubLayer = document.getElementById('hub-layer');
    const btnCloseHub = document.querySelector('.close-hub');
    const vitrineMain = document.getElementById('vitrine-main');

    /**
     * Lógica de Ativação do Hub (=)
     * Remove a classe de ocultação para revelar a camada de vidro
     */
    if (btnHub) {
        btnHub.onclick = () => {
            if (hubLayer) {
                hubLayer.classList.remove('hub-hidden');
                console.log("Salto Quântico: Vitrine Ativada.");
            }
        };
    }

    /**
     * Lógica de Fecho
     * Adiciona a classe que aplica o efeito de descida e opacidade
     */
    if (btnCloseHub) {
        btnCloseHub.onclick = () => {
            if (hubLayer) {
                hubLayer.classList.add('hub-hidden');
            }
        };
    }

    // Futura função para injetar os "Universos" (Cards) sem quebrar o sistema
    const carregarUniversos = () => {
        // Esta área está preparada para receber os seus módulos de 
        // Desenhos, Motores ou Memórias de forma dinâmica.
    };
});
