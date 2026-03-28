/**
 * OIO ONE - NOTIFICATIONS CONTROLLER
 * Gerencia o histórico de alertas e interações.
 */

export const NotificationsController = {
    async init() {
        const display = document.getElementById('universe-display');
        if (!display) return;

        display.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; color: #e4e6eb; font-family: sans-serif; padding: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Notificações</h2>
                    <i class="fas fa-ellipsis-h" style="background: #3a3b3c; padding: 10px; border-radius: 50%;"></i>
                </div>

                <div style="font-weight: 600; margin-bottom: 15px;">Novas</div>

                <!-- NOTIFICAÇÃO 1 (NÃO LIDA) -->
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 10px; padding: 10px; background: rgba(24, 119, 242, 0.1); border-radius: 8px;">
                    <div style="position: relative;">
                        <div style="width: 56px; height: 56px; border-radius: 50%; background: #1877f2; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-heart" style="color: white; font-size: 20px;"></i>
                        </div>
                        <div style="position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; background: #fb3958; border-radius: 50%; border: 2px solid #242526; display: flex; align-items: center; justify-content: center;">
                             <i class="fas fa-comment" style="font-size: 10px; color: white;"></i>
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-size: 14px;"><strong>Sistema OIO</strong> comentou na sua foto: "O protocolo de design está impecável!"</div>
                        <div style="font-size: 12px; color: #1877f2; font-weight: 600; margin-top: 4px;">Há 2 minutos</div>
                    </div>
                    <div style="width: 12px; height: 12px; background: #1877f2; border-radius: 50%;"></div>
                </div>

                <!-- NOTIFICAÇÃO 2 -->
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 10px; padding: 10px; border-radius: 8px;">
                    <div style="width: 56px; height: 56px; border-radius: 50%; background: #3a3b3c; overflow: hidden;">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div style="flex: 1;">
                        <div style="font-size: 14px;"><strong>Michel Detilli</strong> adicionou um novo vídeo no Marketplace.</div>
                        <div style="font-size: 12px; color: #b0b3b8; margin-top: 4px;">Ontem às 18:30</div>
                    </div>
                </div>

                <p style="text-align: center; color: #b0b3b8; font-size: 14px; margin-top: 30px;">Notificações anteriores</p>
            </div>
        `;
    }
};
