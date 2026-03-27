/**
 * OIO ONE - CAMADA SENSORIAL DE ÁUDIO (SOUND SERVICE)
 * Gera feedbacks sonoros orgânicos para a interface.
 * Regra: Tons minimalistas, sem arquivos externos.
 */

export const Sound = {
    // Som de clique "Glass" (Feedback tátil visual)
    playTick() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            // Configuração do timbre (Senoide para som suave)
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(850, audioCtx.currentTime); 
            
            // Envelope de volume (Ataque rápido e decaimento suave)
            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        } catch (e) {
            // Silencia erro se o navegador bloquear o áudio sem interação prévia
            console.log("OIO-SOUND: Aguardando interação para ativar áudio.");
        }
    },

    // Som de transição de camada (Mais grave e profundo)
    playTransition() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.3);

            gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.3);
        } catch (e) {}
    }
};
