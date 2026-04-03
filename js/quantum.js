/**
 * OIO ONE - SISTEMA QUANTUM (CORRIGIDO)
 * Integrado com Som e Login do Michel
 */

const OioQuantum = {
    init() {
        console.log("Sistema Quantum: Motor de Pastas Ligado.");
        this.setupNavigation();
        this.renderHome(); 
    },

    renderHome() {
        const display = document.getElementById('universe-display');
        if (display) {
            display.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px 20px;">
                        <h2 style="letter-spacing: 3px; color: #fff;">VIBE CONNECT</h2>
                        <p style="opacity: 0.5; font-size: 12px; margin-top: 10px;">SINCRONIZANDO UNIVERSOS...</p>
                    </div>
                </div>
            `;
        }
    },

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.onclick = () => {
                // Pega o módulo pelo data-module (origin, watch, etc)
                const modulo = item.getAttribute('data-module');
                
                // 🔊 TOCA O SOM AO CLICAR NA PASTA
                if (window.OioSound) window.OioSound.mensagem();

                this.switchUniverse(modulo, item);
            };
        });
    },

    switchUniverse(id, element) {
        const display = document.getElementById('universe-display');
        const navItems = document.querySelectorAll('.nav-item');

        // Feedback visual nos ícones
        navItems.forEach(i => i.classList.remove('active'));
        if(element) element.classList.add('active');

        // Troca o conteúdo na tela
        display.innerHTML = `
            <div style="display: flex; height: 100%; align-items: center; justify-content: center; color: white; opacity: 0.8;">
                <div style="text-align:center;">
                    <i class="fa-solid fa-microchip" style="font-size:30px; margin-bottom:15px; display:block; color:#1877f2;"></i>
                    <span style="letter-spacing: 5px; font-size:10px;">MÓDULO ${id.toUpperCase()} ATIVO</span>
                </div>
            </div>`;
        
        console.log("Navegando para:", id);
    }
};

// Torna global para o app-init.js conseguir ligar o motor
window.OioQuantum = OioQuantum;

// Inicializa o básico
document.addEventListener('DOMContentLoaded', () => OioQuantum.init());
