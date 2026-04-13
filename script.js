const textContent = `Mi amor, mi vida, mi Atziri:

Si estás leyendo esto es porque finalmente pude entregarte lo que ya tenía guardado para ti. Te confieso, y de verdad no te rías, que esta carta ya estaba lista desde antes del 10 de abril...

No fue falta de ganas, al contrario, me enfoqué tanto en que cada detalle de tu cumple fuera perfecto que se me pasó entregártela en el momento. Pero aquí está, porque eres mi motor y mi lugar seguro.

Gracias por estos 20 años que le regalas al mundo y por dejarme estar a tu lado. Te amo con toda mi alma.

Con todo mi amor, Jonathan.`;

const envelope = document.getElementById('envelope');
const typewriterElement = document.getElementById('typewriterText');
const music = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');
let hasStarted = false;

// Evento principal
envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
    
    if (!hasStarted && envelope.classList.contains('open')) {
        startEffects();
        hasStarted = true;
    }
});

function startEffects() {
    music.play().catch(e => console.log("El usuario debe interactuar para el audio"));
    
    let i = 0;
    typewriterElement.innerHTML = "";
    
    function type() {
        if (i < textContent.length) {
            typewriterElement.innerHTML += textContent.charAt(i);
            i++;
            setTimeout(type, 50); 
        }
    }
    
    setTimeout(type, 800); // Iniciamos escritura un poco antes
    startHeartRain();
}

// Canvas optimizado para móvil
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let hearts = [];

function startHeartRain() {
    // Reducimos frecuencia para que el móvil no se caliente
    setInterval(() => {
        if(hearts.length < 25) { // Límite de corazones simultáneos
            hearts.push({
                x: Math.random() * canvas.width,
                y: -20,
                size: Math.random() * 10 + 8, // Corazones ligeramente más pequeños
                speed: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
    }, 400);
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((h, index) => {
        h.y += h.speed;
        drawHeart(h.x, h.y, h.size, h.opacity);
        if (h.y > canvas.height) hearts.splice(index, 1);
    });
    requestAnimationFrame(animate);
}

function drawHeart(x, y, size, opacity) {
    ctx.save();
    ctx.beginPath();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = "#ff4b5c";
    ctx.translate(x, y);
    ctx.scale(size / 30, size / 30); 
    ctx.moveTo(0, 12); 
    ctx.bezierCurveTo(-15, -12, -30, 8, 0, 30); 
    ctx.bezierCurveTo(30, 8, 15, -12, 0, 12); 
    ctx.fill();
    ctx.restore();
}

muteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el click cierre el sobre
    music.muted = !music.muted;
    muteBtn.innerHTML = music.muted ? "🔇" : "🎵";
});