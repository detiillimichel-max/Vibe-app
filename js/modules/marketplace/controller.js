/**
 * OIO ONE - MARKETPLACE CONTROLLER
 * Gerencia a vitrine de produtos e vendas.
 */

export const MarketplaceController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        display.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; color: #e4e6eb; font-family: sans-serif; padding: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Marketplace</h2>
                    <div style="display: flex; gap: 10px;">
                        <i class="fas fa-search" style="background: #3a3b3c; padding: 10px; border-radius: 50%;"></i>
                        <i class="fas fa-user" style="background: #3a3b3c; padding: 10px; border-radius: 50%;"></i>
                    </div>
                </div>

                <!-- CATEGORIAS RÁPIDAS -->
                <div style="display: flex; gap: 10px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 5px;">
                    <span style="background: #3a3b3c; padding: 8px 15px; border-radius: 20px; font-size: 14px; font-weight: 600; white-space: nowrap;">Vender</span>
                    <span style="background: #3a3b3c; padding: 8px 15px; border-radius: 20px; font-size: 14px; font-weight: 600; white-space: nowrap;">Eletrônicos</span>
                    <span style="background: #3a3b3c; padding: 8px 15px; border-radius: 20px; font-size: 14px; font-weight: 600; white-space: nowrap;">Imóveis</span>
                </div>

                <!-- GRADE DE PRODUTOS -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    
                    <!-- PRODUTO 1 -->
                    <div style="background: #242526; border-radius: 8px; overflow: hidden;">
                        <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8" style="width: 100%; aspect-ratio: 1/1; object-fit: cover;">
                        <div style="padding: 10px;">
                            <div style="font-weight: bold; font-size: 16px;">R$ 4.500</div>
                            <div style="font-size: 14px; color: #e4e6eb;">MacBook Pro M1</div>
                            <div style="font-size: 12px; color: #b0b3b8;">São Paulo, SP</div>
                        </div>
                    </div>

                    <!-- PRODUTO 2 -->
                    <div style="background: #242526; border-radius: 8px; overflow: hidden;">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e" style="width: 100%; aspect-ratio: 1/1; object-fit: cover;">
                        <div style="padding: 10px;">
                            <div style="font-weight: bold; font-size: 16px;">R$ 890</div>
                            <div style="font-size: 14px; color: #e4e6eb;">Headphone Premium</div>
                            <div style="font-size: 12px; color: #b0b3b8;">Rio de Janeiro, RJ</div>
                        </div>
                    </div>

                </div>
            </div>
        `;
    }
};

