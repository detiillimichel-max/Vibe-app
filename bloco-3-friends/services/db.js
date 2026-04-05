// Conexão Supabase exclusiva do Bloco 3
const supabaseUrl = "https://SEU-PROJETO.supabase.co"; // depois vamos colocar sua chave
const supabaseKey = "SUA_CHAVE_ANON"; // depois vamos substituir
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function getFriends() {
    return await supabase.from('friends').select('*').order('created_at', { ascending: false });
}
