<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>OIO ONE</title>
    
    <link rel="stylesheet" href="styles/dna.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
    
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>
<body>

    <div id="portal-layer">
        <div class="login-box">
            <h1 class="portal-label">OIO ONE</h1>
            <input type="email" id="login-email" placeholder="E-mail">
            <input type="password" id="login-pass" placeholder="Senha">
            <button id="btn-entrar" class="glass-btn">ACESSAR UNIVERSO</button>
        </div>
    </div>

    <div id="app-layer" class="hidden">
        <header style="height:60px; background:#1877f2; display:flex; align-items:center; justify-content:space-between; padding:0 20px;">
            <span style="font-weight:900; font-size:20px;">OIO ONE</span>
            <div style="width:35px; height:35px; border-radius:50%; background:#fff; overflow:hidden;">
                <img id="user-avatar" src="" style="width:100%; height:100%; object-fit:cover;">
            </div>
        </header>

        <main id="universe-display">
            </main>

        <nav class="quantum-nav">
            <div class="nav-item active"><i class="fa-solid fa-house"></i></div>
            <div class="nav-item"><i class="fa-solid fa-play"></i></div>
            <div class="nav-item"><i class="fa-solid fa-comment"></i></div>
            <div class="nav-item"><i class="fa-solid fa-bag-shopping"></i></div>
            <div class="nav-item"><i class="fa-solid fa-bell"></i></div>
            <div class="nav-item"><i class="fa-solid fa-bars"></i></div>
        </nav>
    </div>

    <script src="js/core.js"></script>
    <script src="js/quantum.js"></script>
    <script type="module" src="js/core/app-init.js"></script>

</body>
</html>
