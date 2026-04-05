function MenuItem(item) {
    return `
        <div class="menu-item">
            <div class="menu-info">
                <i class="${item.icon}"></i>
                <span class="menu-title">${item.title}</span>
            </div>
            ${ActionBar(item.id)}
        </div>
    `;
}
