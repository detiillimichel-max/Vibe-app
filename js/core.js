// 1. IMPORTAÇÃO DO SUPABASE VIA CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 2. CONFIGURAÇÃO DO SEU PROJETO (OIO-TOC-CORE)
const SUPABASE_URL = 'https://uqdwtzlkqaosnweyoyit.supabase.co'
const SUPABASE_KEY = 'sb_publishable_uafBQD1aJ3w8_eq4meOsNQ_wzk8TwhA'

// 3. INICIALIZAÇÃO DO CLIENTE
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Exportamos o supabase para que os outros módulos (Home, Perfil, etc) possam usá-lo
export { supabase };

// 4. IMPORTAÇÃO DOS CONTROLADORES DO APP
import { OriginController } from './modules/origin/controller.js';
import { WatchController } from './modules/watch/controller.js';
import { FriendsController } from './modules/friends/controller.js';
import { MarketplaceController } from './modules/marketplace/controller.js';
import { NotificationsController } from './modules/notifications/controller.js';
import { ProfileController } from './modules/profile/controller.js';

// Nome de exibição temporário (depois faremos o sistema de login real)
let usuarioLogado = "Michel OIO";

// 5. ESCUTADOR DE CLIQUES GLOBAL (NAVEGAÇÃO)
document.addEventListener('click', async (e) => {
    
    // BOTÃO ENTRAR (PORTAL)
    if (e.target.id === 'btn-entrar') {
        const portal = document.getElementById('portal-layer');
        const appLayer = document.getElementById('app-layer');

        if (portal) portal.style.display = 'none';
        if (appLayer) {
            appLayer.classList.remove('hidden');
            appLayer.style.display = 'block';
        }

        // Inicia a Home (Origin) carregando os posts do Supabase
        OriginController.init(usuarioLogado);
    }

    // NAVEGAÇÃO ENTRE AS ABAS (MENU SUPERIOR)
    const navItem = e.target.closest('.nav-item');
    if (navItem) {
        // Remove a classe ativa de todos e coloca no clicado
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        navItem.classList.add('active');
        
        const titulo = navItem.getAttribute('title');

        // Lógica para carregar cada seção
        if (titulo === 'Home') {
            OriginController.init(usuarioLogado);
        } else if (titulo === 'Vídeos') {
            WatchController.init(); 
        } else if (titulo === 'Amigos') {
            FriendsController.init();
        } else if (titulo === 'Marketplace') {
            MarketplaceController.init();
        } else if (titulo === 'Notificações') {
            NotificationsController.init();
        } else if (titulo === 'Perfil') {
            ProfileController.init(usuarioLogado);
        }
    }
});

console.log("OIO ONE: Supabase conectado e pronto!");
