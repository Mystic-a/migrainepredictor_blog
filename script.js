const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function randomColor() {
  const colors = ['#00ffff', '#ff00ff', '#81f7ff', '#00ffcc', '#ff66cc'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createParticles() {
  particles = [];
  for (let i = 0; i < 130; i++) {
    const radius = Math.random() * 1.3 + 0.5;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: radius,
      color: randomColor()
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = p.color;
    ctx.fill();
  });

  connectParticles(); // Keep connections if you want the line effect
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = particles[i].color + '22';
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }
  }
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
  drawParticles(); // Re-draw once on resize
});

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

resizeCanvas();
createParticles();
drawParticles(); // Only draw once (no animation)
