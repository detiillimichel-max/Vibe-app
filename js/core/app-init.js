// Importa o cliente Supabase
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Configuração do seu projeto Supabase
const SUPABASE_URL = 'https://uqdwtzlkqaosnweyoyit.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uafBQD1aJ3w8_eq4meOsNQ_wzk8TwhA';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Função de login
document.getElementById("btn-entrar").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const senha = document.getElementById("login-pass").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: senha
  });

  if (error) {
    alert("Erro no login: " + error.message);
  } else {
    // Esconde tela de login e mostra app
    document.getElementById("portal-layer").classList.add("hidden");
    document.getElementById("app-layer").classList.remove("hidden");
  }
});
