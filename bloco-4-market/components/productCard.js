function ProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <strong>R$ ${product.price}</strong>
            </div>
            ${ActionBar(product.id)}
        </div>
    `;
}
