// Conexão Supabase exclusiva do Bloco 2
const supabaseUrl = "https://SEU-PROJETO.supabase.co";
const supabaseKey = "SEU-CHAVE-ANON";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function getVideos() {
    return await supabase.from('videos').select('*').order('created_at', { ascending: false });
}
