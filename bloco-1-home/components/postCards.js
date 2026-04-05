function PostCard(post) {
    return `
        <div class="post-card">
            <div class="header-post">
                <div class="avatar-user"></div>
                <div>
                    <div class="user-name">${post.user_name}</div>
                    <div class="post-time">${new Date(post.created_at).toLocaleString()}</div>
                </div>
            </div>
            <div class="content-text">${post.content}</div>
            ${ActionBar()}
        </div>
    `;
}
