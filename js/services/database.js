// OIO ONE - Banco de Dados em Tempo Real (Simulado)

export const Database = {
    // 1 Posta
    async sendPost(userName, videoUrl) {
        console.log(`[FIREBASE] ${userName} postou um vídeo.`);
        // Aqui o Firebase enviaria para todos os outros 4 usuários
        this.notifyOthers(userName);
    },

    // Todos Vêem (Simulação de Notificação)
    notifyOthers(userName) {
        console.log(`Notificando usuários 1, 2, 3 e 4 sobre o post de ${userName}`);
    }
};
