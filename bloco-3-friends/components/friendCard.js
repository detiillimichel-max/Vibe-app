function FriendCard(friend) {
    return `
        <div class="friend-card">
            <div class="friend-info">
                <i class="fa-solid fa-user"></i>
                <span class="friend-name">${friend.name}</span>
            </div>
            ${ActionBar(friend.id)}
        </div>
    `;
}
