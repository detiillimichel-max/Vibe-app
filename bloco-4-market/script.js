// 🧠 ALMA DO MARKETPLACE - OIO ONE
console.log("Sistema de Vendas OIO: Ativo.");

// Simulação de clique no produto
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-buy')) {
        const card = e.target.closest('.product-card');
        const preco = card.querySelector('.product-price').innerText;
        alert(`Interessado no item de ${preco}? Iniciando chat com o vendedor...`);
    }
});

// Futura integração com Supabase para carregar produtos reais
async function fetchMarketProducts() {
    console.log("Carregando vitrine do banco de dados...");
}

fetchMarketProducts();

