import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = 'https://uqdwtzlkqaosnweyoyit.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uafBQD1aJ3w8_eq4meOsNQ_wzk8TwhA';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

window.supabase = supabase;

document.getElementById("btn-entrar").addEventListener("click", async () => {
  const emailDigitado = document.getElementById("login-email").value.trim();
  const senhaDigitada = document.getElementById("login-pass").value.trim();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', emailDigitado)
    .eq('password', senhaDigitada)
    .maybeSingle();

  if (data && data.password === senhaDigitada) {
    // 🔊 1. TOCA O SOM PRIMEIRO
    if (window.OioSound) {
        window.OioSound.post(); 
    }

    // 🔓 2. ABRE A INTERFACE
    document.getElementById("portal-layer").classList.add("hidden");
    document.getElementById("app-layer").classList.remove("hidden");

    // 🚀 3. LIGA OS MÓDULOS (O Quantum)
    if (window.OioQuantum && typeof window.OioQuantum.loadModule === 'function') {
        window.OioQuantum.loadModule('origin'); 
    }
    
  } else {
    alert("Acesso Negado: Verifique seus dados.");
  }
});
