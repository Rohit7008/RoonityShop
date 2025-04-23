
// Enhanced dynamic/wave-like particle background with t-shirt "bubble" interaction
import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 32;
const COLORS = ["#9b87f599", "#6366f199", "#fff1", "#fff1"];

// Coordinates to match the t-shirt/hero location (centered, 60% height; fine-tune as needed)
const TSHIRT_CENTER = { x: 0.5, y: 0.61 }; // [0,1] screen percents
const TSHIRT_RADIUS = 0.16; // relative radius of "do not enter" bubble zone

interface Particle {
  x: number;
  y: number;
  baseY: number; // for wave
  r: number;
  dx: number;
  dy: number;
  color: string;
  phase: number; // wave offset
}

function randomBetween(a: number, b: number) {
  return a + (b - a) * Math.random();
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // normalized mouse [0-1]

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
        baseY: 0, // set below
        r: randomBetween(16, 44),
        dx: randomBetween(0.024, 0.08), // wave, rightward
        dy: randomBetween(-0.06, 0.06),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        phase: Math.random() * Math.PI * 2,
      }));

    // Set baseY for wave
    particles.forEach((p) => {
      p.baseY = p.y;
    });

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Parallax based on mouse (with extra depth)
      const parallaxIntensity = 64;
      const mx = (mouseRef.current.x - 0.5) * parallaxIntensity;
      const my = (mouseRef.current.y - 0.4) * parallaxIntensity; // slightly higher center

      for (const [i, p] of particles.entries()) {
        // Fluid wave motion + subtle y oscillation (sin/cos mix, per-particle phase)
        p.x += p.dx * (0.86 + 0.08 * Math.sin(i + t));
        // Y is baseline+wave, plus extra slow undulation
        p.y =
          p.baseY +
          Math.sin(t * 0.86 + p.phase + i) * 34 + // main vertical wave
          Math.cos(t * 0.23 + i) * 18; // slower undulate

        // Interactive "bubble" effect: repel softly from t-shirt area
        const pxNorm = (p.x + mx) / width;
        const pyNorm = (p.y + my) / height;
        const dx = pxNorm - TSHIRT_CENTER.x;
        const dy = pyNorm - TSHIRT_CENTER.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < TSHIRT_RADIUS) {
          // Soft push outward
          const pushMag = (TSHIRT_RADIUS - dist) * 166;
          p.x += dx / (dist + 0.02) * pushMag;
          p.y += dy / (dist + 0.02) * pushMag * 0.72;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(
          p.x + mx,
          p.y + my,
          p.r,
          0,
          Math.PI * 2,
          false
        );
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.29;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 34;
        ctx.fill();
        ctx.restore();

        // Loop right-to-left so the flow never stops
        if (p.x > width + p.r) {
          p.x = -p.r;
          p.baseY = randomBetween(0, height);
        }
      }
      t += 0.0071;
      requestAnimationFrame(draw);
    }

    draw();

    // Responsive
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles.forEach((p) => {
        p.x = randomBetween(0, width);
        p.y = randomBetween(0, height);
        p.baseY = p.y;
      });
    }
    function handleMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    }
    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length) {
        mouseRef.current.x = e.touches[0].clientX / window.innerWidth;
        mouseRef.current.y = e.touches[0].clientY / window.innerHeight;
      }
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ filter: "blur(0.7px)", background: "transparent" }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
