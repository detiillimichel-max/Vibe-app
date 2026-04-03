      if (data && data.password === senhaDigitada) {
        // 🔊 Toca o som de confirmação
        if (window.OioSound) window.OioSound.post();

        // 🔓 Abre a interface
        document.getElementById("portal-layer").classList.add("hidden");
        document.getElementById("app-layer").classList.remove("hidden");

        // 🚀 LIGA O MOTOR DOS MÓDULOS (O que faltava!)
        // Isso vai dizer ao js/quantum.js para carregar a página inicial
        if (window.OioQuantum && typeof window.OioQuantum.loadModule === 'function') {
            window.OioQuantum.loadModule('origin'); 
        } else {
            console.log("Aguardando carregamento do Quantum...");
        }

      }
