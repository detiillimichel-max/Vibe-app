// core.js - Motor com Supabase Auth
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://uqdwtzlkqaosnweyoyit.supabase.co";
const SUPABASE_KEY = "sb_publishable_uafBQD1aJ3w8_eq4meOsNQ_wzk8TwhA";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "/login.html";
    return;
  }

  // Navegação interna
  const botoes = document.querySelectorAll('.menu-principal a');
  botoes.forEach(botao => {
    botao.addEventListener('click', (e) => {
      e.preventDefault();
      const destino = botao.getAttribute('href').replace('/', '');
      abrirBloco(destino);
    });
  });
});
