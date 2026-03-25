// OIO ONE - Camada de Memória (Persistência)
// Este serviço salva o nome e as memórias no celular do usuário

export const Storage = {
    // Grava a informação
    save(key, value) {
        localStorage.setItem(`vibe_${key}`, JSON.stringify(value));
    },
    
    // Busca a informação
    get(key) {
        const data = localStorage.getItem(`vibe_${key}`);
        return data ? JSON.parse(data) : null;
    }
};
