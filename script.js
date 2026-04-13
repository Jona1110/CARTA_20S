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

envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
    
    if (!hasStarted && envelope.classList.contains('open')) {
        startEffects();
        hasStarted = true;
    }
});

function startEffects() {
    // Intentar reproducir audio (algunos navegadores bloquean autoplay)
    music.play().catch(e => console.log("Audio bloqueado por el navegador"));
    
    let i = 0;
    typewriterElement.innerHTML = "";
    
    function type() {
        if (i < textContent.length) {
            typewriterElement.innerHTML += textContent.charAt(i);
            i++;
            setTimeout(type, 50); 
        }
    }
    // Pequeño delay para que la carta termine de subir antes de escribir
    setTimeout(type, 1000);
    startHeartRain();
}

// Lluvia de corazones (Mismo código de antes, funciona bien)
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function startHeartRain() {
    setInterval(() => {
        hearts.push({
            x: Math.random() * canvas.width,
            y: -20,
            size: Math.random() * 15 + 10,
            speed: Math.random() * 3 + 2,
            opacity: Math.random()
        });
    }, 300);
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
    
    // Eliminamos la rotación de 180 grados (PI) que lo invertía
    // ctx.rotate(Math.PI); 
    
    // Ajustamos la escala para que el tamaño sea proporcional
    ctx.scale(size / 30, size / 30); 
    
    // Dibujamos el corazón empezando desde la punta inferior (punto central inferior)
    // Coordenadas ajustadas para que la punta esté abajo
    ctx.moveTo(0, 12); // Punta inferior
    
    // Curva izquierda (hacia arriba y redondeada)
    // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
    ctx.bezierCurveTo(-15, -12, -30, 8, 0, 30); // Lado izquierdo
    
    // Curva derecha (redondeada y hacia abajo para cerrar en la punta)
    ctx.bezierCurveTo(30, 8, 15, -12, 0, 12); // Lado derecho
    
    ctx.fill();
    ctx.restore();
}

muteBtn.addEventListener('click', () => {
    music.muted = !music.muted;
    muteBtn.innerHTML = music.muted ? "🔇" : "🎵";
});

function startEffects() {
    music.play().catch(e => console.log("Audio requiere interacción"));
    
    let i = 0;
    typewriterElement.innerHTML = "";
    
    function type() {
        if (i < textContent.length) {
            typewriterElement.innerHTML += textContent.charAt(i);
            i++;
            setTimeout(type, 50); 
        }
    }
    
    // Esperamos 1 segundo a que la animación de la carta termine para empezar a escribir
    setTimeout(type, 1000); 
    startHeartRain();
}