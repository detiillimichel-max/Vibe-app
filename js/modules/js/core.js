// ✅ Carrega o sistema de som global
import('./sounds.js').catch(() => {});
// OIO ONE - SISTEMA DE SOM GLOBAL 🔊
window.OioSound = {

    // ✅ Contexto de áudio (criado uma vez)
    ctx: null,

    iniciar() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    // 🔵 Som de mensagem (chat)
    mensagem() {
        this.iniciar();
        this._tocar([880, 660], 0.4, 'sine', 0.4);
    },

    // 🟠 Som de post (feed)
    post() {
        this.iniciar();
        this._tocar([440, 550, 660], 0.15, 'triangle', 0.5);
    },

    // 🟢 Som de like
    like() {
        this.iniciar();
        this._tocar([660, 880], 0.2, 'sine', 0.3);
    },

    // 🟣 Som de vídeo (watch)
    video() {
        this.iniciar();
        this._tocar([300, 450, 600], 0.2, 'triangle', 0.6);
    },

    // 🔴 Som de notificação
    notificacao() {
        this.iniciar();
        this._tocar([523, 659, 784], 0.15, 'sine', 0.7);
    },

    // 🟡 Som de marketplace (anúncio publicado)
    marketplace() {
        this.iniciar();
        this._tocar([440, 554, 659, 880], 0.12, 'sine', 0.6);
    },

    // ⚙️ Motor interno
    _tocar(notas, duracao, tipo, volume) {
        try {
            const ctx = this.ctx;
            notas.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = tipo;
                osc.frequency.setValueAtTime(freq, ctx.currentTime + i * duracao);
                gain.gain.setValueAtTime(volume, ctx.currentTime + i * duracao);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * duracao + duracao);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ctx.currentTime + i * duracao);
                osc.stop(ctx.currentTime + i * duracao + duracao);
            });
        } catch (e) {
            console.log('OIO Sound: aguardando interação do usuário.');
        }
    }
};

// ✅ Ativa o contexto de áudio no primeiro toque do usuário
document.addEventListener('touchstart', () => window.OioSound.iniciar(), { once: true });
document.addEventListener('click', () => window.OioSound.iniciar(), { once: true });
