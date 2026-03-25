// OIO ONE - Banco de Dados em Tempo Real
// Lógica: Usuário 1 posta -> Usuários 1,2,3,4,5 recebem.

export const Database = {
    // Envia o vídeo (Máximo 1 minuto para o Feed)
    async sendPost(userId, videoUrl, description) {
        console.log("Enviando post para a nuvem...");
        // Lógica de postagem aqui
    },

    // Escuta o feed em tempo real (Sem precisar de refresh)
    listenFeed(callback) {
        console.log("Sintonizando feed global...");
        // O Firebase vai 'empurrar' o vídeo novo para todos aqui
    }
};
