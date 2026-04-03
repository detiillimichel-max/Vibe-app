import { Logger } from '../../services/Logger.js';

function waitForSupabase(timeout = 5000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();

        const check = () => {
            if (window.supabase) return resolve(window.supabase);

            if (Date.now() - start > timeout) {
                return reject(new Error('Supabase não carregou a tempo'));
            }

            requestAnimationFrame(check);
        };

        check();
    });
}

export const OriginController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        display.innerHTML = '<div class="loading">Carregando Universo...</div>';

        try {
            // 🔥 GARANTE que o Supabase existe antes de usar
            const supabase = await waitForSupabase();

            const { data: posts, error } = await supabase
                .from('profiles')
                .select('*');

            if (error) throw error;

            const listaPosts = posts || [];

            if (listaPosts.length === 0) {
                display.innerHTML = `
                    <div class="empty">
                        Nenhum usuário encontrado.
                    </div>
                `;
                return;
            }

            display.innerHTML = listaPosts.map(post => `
                <div class="post-card">
                    <div class="post-header">
                        <strong>${post.username || 'Usuário'}</strong>
                    </div>
                    <div class="post-content">
                        ${post.content || '<span style="opacity:0.5">Sem status disponível</span>'}
                    </div>
                </div>
            `).join('');

            Logger.info("Origin renderizada com sucesso.");

        } catch (e) {
            console.error(e);
            Logger.error("Erro na Origin: " + e.message);

            display.innerHTML = `
                <div class="error">
                    Falha ao carregar dados.<br>
                    <small>${e.message}</small>
                </div>
            `;
        }
    }
};
