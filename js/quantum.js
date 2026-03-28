/**
 * OIO ONE - SISTEMA QUANTUM (MOTOR DE EMERGÊNCIA)
 * Simplificado para garantir o visual no celular.
 */

const QuantumSystem = {
    init() {
        console.log("Sistema Quantum: Iniciado.");
        this.setupNavigation();
        this.renderHome(); // Força a primeira tela
    },

    // Desenha a tela inicial manualmente para garantir que não fique preto
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
                const target = item.innerText.toLowerCase();
                this.switchUniverse(target);
            };
        });
    },

    switchUniverse(id) {
        const display = document.getElementById('universe-display');
        const navItems = document.querySelectorAll('.nav-item');

        // Feedback visual
        navItems.forEach(item => {
            item.classList.remove('active');
            if(item.innerText.toLowerCase() === id) item.classList.add('active');
        });

        // Troca de conteúdo simples
        display.innerHTML = `
            <div style="display: flex; height: 100%; align-items: center; justify-content: center; color: white; opacity: 0.5;">
                <span style="letter-spacing: 5px;">MÓDULO ${id.toUpperCase()} ATIVO</span>
            </div>`;
        
        console.log("Mudando para:", id);
    }
};

// Inicializa sem precisar de export/import complexo
document.addEventListener('DOMContentLoaded', () => QuantumSystem.init());

// Torna global para o HTML alcançar
window.switchUniverse = (id) => QuantumSystem.switchUniverse(id);
