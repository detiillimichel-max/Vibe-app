// Conexão Supabase exclusiva do Bloco 5
const supabaseUrl = "https://SEU-PROJETO.supabase.co"; // depois vamos colocar sua chave
const supabaseKey = "SUA_CHAVE_ANON"; // depois vamos substituir
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function getAlerts() {
    return await supabase.from('alerts').select('*').order('created_at', { ascending: false });
}
