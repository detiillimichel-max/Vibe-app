/**
 * OIO ONE - STATUS SYSTEM 💎
 * A Voz do Ecossistema: Resume o que está acontecendo no Watch e Market.
 */
import { supabase } from '../../../core.js';

export const Status = {
    // Busca os números reais no Supabase
    async fetchGlobalStats() {
        try {
            // Conta quantos posts/vídeos existem no Watch (Exemplo)
            const { count: watchCount } = await supabase
                .from('posts') // Ou a tabela que você usa para vídeos
                .select('*', { count: 'exact', head: true });

            // Simulação de curtidas e anúncios (Pode ser conectado a outras tabelas depois)
            const stats = {
                vibe: watchCount || 0,
                market_active: "Ativo", // Aqui buscaremos na tabela Market no futuro
                notifications: 5 // Simulação de alertas
            };

            return stats;
        } catch (e) {
            return { vibe: 0, market_active: "Offline", notifications: 0 };
        }
    },

    // Desenha o painel de status na Home
    async renderDashboard() {
        const data = await this.fetchGlobalStats();

        return `
            <div id="oio-status-dashboard" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 25px;">
                
                <!-- CARD WATCH -->
                <div style="background: #242526; padding: 15px; border-radius: 15px; border-left: 4px solid #e67e22;">
                    <small style="color: #888; text-transform: uppercase; font-size: 9px; font-weight: bold;">Watch Live</small>
                    <div style="color: white; font-size: 16px; font-weight: bold; margin-top: 5px;">
                        ${data.vibe} Interações
                    </div>
                </div>

                <!-- CARD MARKET -->
                <div style="background: #242526; padding: 15px; border-radius: 15px; border-left: 4px solid #2ecc71;">
                    <small style="color: #888; text-transform: uppercase; font-size: 9px; font-weight: bold;">OIO Market</small>
                    <div style="color: white; font-size: 16px; font-weight: bold; margin-top: 5px;">
                        Status: ${data.market_active}
                    </div>
                </div>

            </div>
        `;
    }
};
