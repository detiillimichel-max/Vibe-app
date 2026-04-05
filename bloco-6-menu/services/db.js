// Conexão Supabase exclusiva do Bloco 6
const supabaseUrl = "https://SEU-PROJETO.supabase.co"; // depois vamos colocar sua chave
const supabaseKey = "SUA_CHAVE_ANON"; // depois vamos substituir
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function getMenuItems() {
    return await supabase.from('menu').select('*').order('created_at', { ascending: false });
}
