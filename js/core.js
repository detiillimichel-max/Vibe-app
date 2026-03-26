/**
 * OIO ONE - SISTEMA NERVOSO (CORE)
 * Função: Gestão de Identidade e Transição de Camada
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referências de Camadas
    const portal = document.getElementById('portal-layer');
    const appLayer = document.getElementById('app-layer');
    const mainVideo = document.getElementById('main-video');
    
    // Referências de Interação
    const btnEntrar = document.getElementById('btn-entrar');
    const inputUser = document.getElementById('user-email');
    const inputPass = document.getElementById('user-pass');

    if (btnEntrar) {
        btnEntrar.onclick = () => {
            const userValue = inputUser.value.trim();
            const passValue = inputPass.value.trim();

            // Validação de Identidade (Simples para o protótipo)
            if (userValue !== "" && passValue !== "") {
                
                // 1. Efeito de Desintegração do Portal (Fade)
                portal.style.opacity = '0';
                portal.style.pointerEvents = 'none';

                setTimeout(() => {
                    // 2. Troca de Camada
                    portal.classList.add('hidden');
                    appLayer.classList.remove('hidden');
                    
                    // 3. Ignora o silêncio e dá o Play no Feed
                    if (mainVideo) {
                        mainVideo.play().catch(error => {
                            console.log("O navegador bloqueou o autoplay, mas o sistema está pronto.");
                        });
                    }
                }, 800); // Sincronizado com a transição do dna.css

            } else {
                // Feedback tátil/visual simples
                alert("Identidade Requerida para Acesso.");
            }
        };
    }
});
