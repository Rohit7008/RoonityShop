
import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 32;
const COLORS = ["#9b87f599", "#6366f199", "#fff1", "#fff1"];

interface Particle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  color: string;
}

function randomBetween(a: number, b: number) {
  return a + (b - a) * Math.random();
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles: Particle[] = Array(PARTICLE_COUNT)
      .fill(0)
      .map(() => ({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        r: randomBetween(16, 42),
        dx: randomBetween(-0.08, 0.1),
        dy: randomBetween(-0.08, 0.1),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.3;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 32;
        ctx.fill();
        ctx.restore();

        // Move particle
        p.x += p.dx;
        p.y += p.dy;
        // Wrap
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = height + p.r;
        if (p.y > height + p.r) p.y = -p.r;
      }
      requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Move them around
      particles.forEach((p) => {
        p.x = randomBetween(0, width);
        p.y = randomBetween(0, height);
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ filter: "blur(0.5px)", background: "transparent" }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
