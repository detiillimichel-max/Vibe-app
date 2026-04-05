function AlertCard(alert) {
    return `
        <div class="alert-card">
            <div class="alert-info">
                <i class="fa-solid fa-bell"></i>
                <span class="alert-title">${alert.title}</span>
            </div>
            <p>${alert.message}</p>
            ${ActionBar(alert.id)}
        </div>
    `;
}
