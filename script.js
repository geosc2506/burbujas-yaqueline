const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// SONIDO DE POP
const popSound = new Audio("pop.mp3");

const messages = [
  "Eres mi amor eterno, Yaqueline ❤️",
  "Mi corazón es tuyo, Yaqueline 💘",
  "Iluminas mi alma, Yaqueline ✨",
  "Eres mi universo, Yaqueline 🌌",
  "Te amo sin fin, Yaqueline 😘",
  "Contigo, todo es un sueño 🌹",
  "Eres mi destino, Yaqueline 💫"
];

const floatingMessages = [];

class Bubble {
  constructor() {
    this.radius = 40 + Math.random() * 30;
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + this.radius;
    this.speed = 0.3 + Math.random() * 0.8; // más lento
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    this.message = messages[Math.floor(Math.random() * messages.length)];
    this.opacity = 1;
    this.popped = false;
  }

  draw() {
    if (this.opacity <= 0) return;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity * 0.6;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  update() {
    if (!this.popped) {
      this.y -= this.speed;
    } else {
      this.opacity -= 0.05;
    }
    this.draw();
  }

  isClicked(mx, my) {
    const dx = mx - this.x;
    const dy = my - this.y;
    return Math.sqrt(dx * dx + dy * dy) < this.radius;
  }
}

function createFloatingMessage(x, y, text) {
  floatingMessages.push({
    x,
    y,
    text,
    alpha: 1,
    dy: 0
  });
}

function drawFloatingMessages() {
  ctx.font = "18px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  floatingMessages.forEach((msg, index) => {
    ctx.fillStyle = `rgba(255, 255, 255, ${msg.alpha})`;
    ctx.fillText(msg.text, msg.x, msg.y - msg.dy);
    msg.dy += 1;
    msg.alpha -= 0.01;
    if (msg.alpha <= 0) floatingMessages.splice(index, 1);
  });
}

let bubbles = [];

function createBubbles(num) {
  for (let i = 0; i < num; i++) {
    bubbles.push(new Bubble());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach((b, i) => {
    b.update();
    if (b.opacity <= 0) {
      bubbles.splice(i, 1);
    }
  });
  drawFloatingMessages();
  requestAnimationFrame(animate);
}

canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  bubbles.forEach(b => {
    if (b.isClicked(mx, my) && !b.popped) {
      b.popped = true;
      createFloatingMessage(b.x, b.y, b.message);
      popSound.currentTime = 0;
      popSound.play();
    }
  });
});

createBubbles(15); // menos burbujas para mejor visibilidad
animate();
