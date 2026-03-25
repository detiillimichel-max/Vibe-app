// OIO ONE - Módulo de Desenho Orgânico
export function initDrawing() {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');

    // Ajusta o tamanho do canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let drawing = false;

    function start(e) { drawing = true; draw(e); }
    function stop() { drawing = false; ctx.beginPath(); }

    function draw(e) {
        if (!drawing) return;
        const x = e.clientX || e.touches[0].clientX;
        const y = (e.clientY || e.touches[0].clientY);

        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stop);
    
    canvas.addEventListener('touchstart', start);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stop);
}
