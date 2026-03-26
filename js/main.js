import { Logger } from './services/Logger.js';

const App = {
    init() {
        Logger.info("OIO ONE System Initialized...");
        this.setupPWA();
    },

    setupPWA() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(() => Logger.info("PWA Ready"))
                    .catch(err => Logger.error("PWA Failed: " + err));
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
