// OIO ONE - Serviço de Autenticação (Portaria)
export const Auth = {
    async login(email, pass) {
        console.log("Iniciando autenticação...");
        // Futura integração: firebase.auth().signIn...
    },
    async loginWithGoogle() {
        console.log("Conectando via Google...");
    }
};
