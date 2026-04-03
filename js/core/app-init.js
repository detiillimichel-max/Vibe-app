// Importa o cliente Supabase
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Configuração do seu projeto
const SUPABASE_URL = 'https://uqdwtzlkqaosnweyoyit.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uafBQD1aJ3w8_eq4meOsNQ_wzk8TwhA';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Torna o supabase global para os outros arquivos (como o de som) usarem
window.supabase = supabase;

document.getElementById("btn-entrar").addEventListener("click", async () => {
  const emailDigitado = document.getElementById("login-email").value.trim();
  const senhaDigitada = document.getElementById("login-pass").value.trim();

  // MUDANÇA REAL: Buscamos na sua tabela 'profiles' em vez do Auth vazio
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', emailDigitado) // Onde está o seu nome/email na tabela
    .eq('password', senhaDigitada) // Onde está o seu 4012
    .maybeSingle();

  if (data && data.password === senhaDigitada) {
    // SUCESSO: Toca o som que está no seu core.js
    if (window.OioSound) window.OioSound.post();

    // Esconde tela de login e mostra app
    document.getElementById("portal-layer").classList.add("hidden");
    document.getElementById("app-layer").classList.remove("hidden");
    
    console.log("Bem-vindo ao Universo OIO!");
  } else {
    // Se não encontrar na tabela ou a senha estiver errada
    alert("Acesso Negado: Verifique seus dados na tabela Profiles.");
    if(error) console.error(error);
  }
});
