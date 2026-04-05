// Configuração do Supabase
const _supabase = supabase.createClient('SUA_URL', 'SUA_KEY');

// Função de Navegação que NÃO DESTRÓI, apenas troca o módulo
async function navegar(modulo) {
    const view = document.getElementById('app-view');
    const response = await fetch(`./bloco-${modulo}/index.html`);
    const html = await response.text();
    
    // Injeta o HTML e o CSS específico do bloco
    view.innerHTML = `
        <link rel="stylesheet" href="./bloco-${modulo}/style.css">
        ${html}
    `;
    view.style.display = 'block';
}

// Escuta mudanças em tempo real (Ex: Novas mensagens no chat)
_supabase
  .channel('public:posts')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, payload => {
    console.log('Nova atualização em tempo real!', payload);
    // Aqui o app atualiza o feed sozinho sem dar refresh
  })
  .subscribe();
