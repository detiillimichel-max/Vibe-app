// OIO ONE - STATUS SYSTEM 💎
// ✅ Removido import quebrado, usando global
const supabase = window.supabase;

export const Status = {
    async fetchGlobalStats() {
        try {
            const { count: watchCount } = await supabase
                .from('posts')
                .select('*', { count: 'exact', head: true });

            return {
                vibe: watchCount || 0,
                market_active: "Ativo",
                notifications: 5
            };
        } catch (e) {
            return { vibe: 0, market_active: "Offline", notifications: 0 };
        }
    },

    async renderDashboard() {
        const data = await this.fetchGlobalStats();
        return `
            <div id="oio-status-dashboard" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 25px;">
                <div style="background: #242526; padding: 15px; border-radius: 15px; border-left: 4px solid #e67e22;">
                    <small style="color: #888; text-transform: uppercase; font-size: 9px; font-weight: bold;">Watch Live</small>
                    <div style="color: white; font-size: 16px; font-weight: bold; margin-top: 5px;">${data.vibe} Interações</div>
                </div>
                <div style="background: #242526; padding: 15px; border-radius: 15px; border-left: 4px solid #2ecc71;">
                    <small style="color: #888; text-transform: uppercase; font-size: 9px; font-weight: bold;">OIO Market</small>
                    <div style="color: white; font-size: 16px; font-weight: bold; margin-top: 5px;">Status: ${data.market_active}</div>
                </div>
            </div>
        `;
    }
};
