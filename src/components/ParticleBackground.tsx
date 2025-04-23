
import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 32;
const COLORS = ["#9b87f599", "#6366f199", "#fff1", "#fff1"];

interface Particle {
  x: number;
  y: number;
  baseY: number; // for wave
  r: number;
  dx: number;
  dy: number;
  color: string;
  phase: number; // for wave offset
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
        baseY: 0, // will be set below
        r: randomBetween(16, 42),
        dx: randomBetween(0.025, 0.075), // wave, soft rightward movement
        dy: randomBetween(-0.08, 0.08),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        phase: Math.random() * Math.PI * 2,
      }));

    // Set baseY for wave
    particles.forEach((p, index) => {
      p.baseY = p.y;
    });

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Parallax based on mouse
      const parallaxIntensity = 48;
      const mx = (mouseRef.current.x - 0.5) * parallaxIntensity;
      const my = (mouseRef.current.y - 0.5) * parallaxIntensity;

      for (const [i, p] of particles.entries()) {
        // Wave motion: particles move right and bob on sinusoidal curve
        p.x += p.dx;
        p.y =
          p.baseY +
          Math.sin(t * 0.7 + p.phase + i) * 32; // vertical wave

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
        ctx.globalAlpha = 0.32;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 34;
        ctx.fill();
        ctx.restore();

        // Loop particles from right->left edge
        if (p.x > width + p.r) {
          p.x = -p.r;
          p.baseY = randomBetween(0, height);
        }
      }
      t += 0.006;
      requestAnimationFrame(draw);
    }

    draw();

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
      style={{ filter: "blur(0.5px)", background: "transparent" }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
