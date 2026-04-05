// Conexão Supabase exclusiva do Bloco 1
const supabaseUrl = "https://SEU-PROJETO.supabase.co";
const supabaseKey = "SEU-CHAVE-ANON";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function getPosts() {
    return await supabase.from('posts').select('*').order('created_at', { ascending: false });
}
