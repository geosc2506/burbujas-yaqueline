const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const messages = [
  "Eres mi amor eterno, Yaqueline ❤️",
  "Mi corazón es tuyo, Yaqueline 💘",
  "Iluminas mi alma, Yaqueline ✨",
  "Eres mi universo, Yaqueline 🌌",
  "Te amo sin fin, Yaqueline 😘",
  "Contigo, todo es un sueño 🌹 Yaqueline",
  "Eres mi destino, Yaqueline 💫"
];


class Bubble {
  constructor() {
    this.radius = 40 + Math.random() * 30;
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + this.radius;
    this.speed = 1 + Math.random() * 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    this.message = messages[Math.floor(Math.random() * messages.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.6;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  update() {
    this.y -= this.speed;
    this.draw();
  }

  isClicked(mx, my) {
    const dx = mx - this.x;
    const dy = my - this.y;
    return Math.sqrt(dx * dx + dy * dy) < this.radius;
  }
}

let bubbles = [];

function createBubbles(num) {
  for (let i = 0; i < num; i++) {
    bubbles.push(new Bubble());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(b => b.update());
  requestAnimationFrame(animate);
}

canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  bubbles.forEach((b, index) => {
    if (b.isClicked(mx, my)) {
      alert(b.message);
      bubbles.splice(index, 1);
    }
  });
});

createBubbles(25);
animate();
