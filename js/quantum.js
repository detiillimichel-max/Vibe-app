/**
 * OIO ONE - MOTOR QUANTUM PRO
 * Focado em Performance Mobile e Conexão Supabase
 */
window.OioQuantum = {
    init() {
        console.log("Quantum: Ativando Sistema...");
        this.setupNavigation();
        // Inicializa na Home (Origin)
        this.switchUniverse('origin', document.querySelector('[data-module="origin"]'));
    },

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.onclick = () => {
                const modulo = item.getAttribute('data-module');
                if (window.OioSound) window.OioSound.mensagem();
                this.switchUniverse(modulo, item);
            };
        });
    },

    async switchUniverse(id, element) {
        const display = document.getElementById('universe-display');
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        if(element) element.classList.add('active');

        // Loader Limpo
        display.innerHTML = `<div style="display:flex;height:60vh;align-items:center;justify-content:center;color:#1877f2;"><i class="fa-solid fa-circle-notch fa-spin fa-2x"></i></div>`;

        try {
            const response = await fetch(`modules/${id}.html`);
            if (response.ok) {
                const html = await response.text();
                display.innerHTML = html;
                
                // Executa scripts internos do módulo se houver
                const scripts = display.querySelectorAll('script');
                scripts.forEach(oldScript => {
                    const newScript = document.createElement('script');
                    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                    oldScript.parentNode.replaceChild(newScript, oldScript);
                });
            } else {
                display.innerHTML = `<div style="padding:50px;text-align:center;color:gray;">MÓDULO ${id.toUpperCase()} INDISPONÍVEL</div>`;
            }
        } catch (e) {
            console.error("Erro Quantum:", e);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => window.OioQuantum.init());
