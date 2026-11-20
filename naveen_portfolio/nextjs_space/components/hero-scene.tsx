'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX / (window?.innerWidth ?? 1),
      y: e.clientY / (window?.innerHeight ?? 1),
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted, handleMouseMove]);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxRaw = canvas.getContext('2d');
    if (!ctxRaw) return;
    const ctx: CanvasRenderingContext2D = ctxRaw;

    const resize = () => {
      const dpr = Math.min(window?.devicePixelRatio ?? 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    // Stars
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.4,
      size: Math.random() * 1.5 + 0.5,
      twinkle: Math.random() * Math.PI * 2,
    }));

    // Buildings
    const buildings = Array.from({ length: 18 }, (_, i) => ({
      x: i / 18,
      width: 0.03 + Math.random() * 0.04,
      height: 0.15 + Math.random() * 0.25,
      windows: Math.floor(Math.random() * 6) + 3,
    }));

    // Palm trees
    const palms = [
      { x: 0.08, scale: 1 },
      { x: 0.92, scale: 0.9 },
      { x: 0.18, scale: 0.7 },
      { x: 0.82, scale: 0.75 },
    ];

    function drawPalmTree(ctx: CanvasRenderingContext2D, cx: number, baseY: number, scale: number) {
      const trunkH = 80 * scale;
      ctx.strokeStyle = '#2a1a0a';
      ctx.lineWidth = 4 * scale;
      ctx.beginPath();
      ctx.moveTo(cx, baseY);
      ctx.quadraticCurveTo(cx + 5 * scale, baseY - trunkH * 0.5, cx + 2 * scale, baseY - trunkH);
      ctx.stroke();

      const topX = cx + 2 * scale;
      const topY = baseY - trunkH;
      const frondColor = 'rgba(0, 60, 30, 0.9)';
      ctx.fillStyle = frondColor;

      for (let angle = -150; angle <= 30; angle += 36) {
        const rad = (angle * Math.PI) / 180;
        const len = 40 * scale;
        ctx.beginPath();
        ctx.moveTo(topX, topY);
        const ex = topX + Math.cos(rad) * len;
        const ey = topY + Math.sin(rad) * len;
        const cp1x = topX + Math.cos(rad) * len * 0.4 + Math.sin(rad) * 10 * scale;
        const cp1y = topY + Math.sin(rad) * len * 0.4 - Math.cos(rad) * 10 * scale;
        ctx.quadraticCurveTo(cp1x, cp1y, ex, ey);
        const cp2x = topX + Math.cos(rad) * len * 0.4 - Math.sin(rad) * 10 * scale;
        const cp2y = topY + Math.sin(rad) * len * 0.4 + Math.cos(rad) * 10 * scale;
        ctx.quadraticCurveTo(cp2x, cp2y, topX, topY);
        ctx.fill();
      }
    }

    let t = 0;
    function draw() {
      t += 0.008;
      const W = w();
      const H = h();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const parallaxX = (mx - 0.5) * 20;
      const parallaxY = (my - 0.5) * 10;

      ctx.clearRect(0, 0, W, H);

      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.7);
      skyGrad.addColorStop(0, '#0A0E1A');
      skyGrad.addColorStop(0.3, '#1a0a2e');
      skyGrad.addColorStop(0.55, '#FF2D78');
      skyGrad.addColorStop(0.7, '#FF6B35');
      skyGrad.addColorStop(0.85, '#FFD700');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // Sun
      const sunY = H * 0.52 + parallaxY * 0.5;
      const sunX = W * 0.5 + parallaxX;
      const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 80);
      sunGrad.addColorStop(0, '#FFD700');
      sunGrad.addColorStop(0.5, 'rgba(255, 107, 53, 0.6)');
      sunGrad.addColorStop(1, 'rgba(255, 45, 120, 0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 80, 0, Math.PI * 2);
      ctx.fill();

      // Sun horizontal lines
      ctx.save();
      ctx.beginPath();
      ctx.arc(sunX, sunY, 60, 0, Math.PI * 2);
      ctx.clip();
      for (let i = 0; i < 8; i++) {
        const ly = sunY - 30 + i * 10 + Math.sin(t + i) * 2;
        ctx.fillStyle = 'rgba(10, 14, 26, 0.3)';
        ctx.fillRect(sunX - 70, ly, 140, 3);
      }
      ctx.restore();

      // Stars
      stars.forEach((s) => {
        const alpha = 0.3 + 0.4 * Math.sin(t * 2 + s.twinkle);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x * W + parallaxX * 0.3, s.y * H + parallaxY * 0.3, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Water
      const waterY = H * 0.7;
      const waterGrad = ctx.createLinearGradient(0, waterY, 0, H);
      waterGrad.addColorStop(0, 'rgba(255, 45, 120, 0.3)');
      waterGrad.addColorStop(0.3, 'rgba(0, 206, 209, 0.15)');
      waterGrad.addColorStop(1, '#0A0E1A');
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, waterY, W, H - waterY);

      // Water reflection lines
      for (let i = 0; i < 12; i++) {
        const ry = waterY + 10 + i * 8;
        const rw = 60 - i * 3;
        ctx.fillStyle = `rgba(255, 215, 0, ${0.1 - i * 0.007})`;
        ctx.fillRect(sunX - rw / 2 + Math.sin(t * 1.5 + i) * 5, ry, rw, 1.5);
      }

      // Skyline / buildings
      const buildingBaseY = waterY;
      buildings.forEach((b) => {
        const bx = b.x * W + parallaxX * 0.6;
        const bw = b.width * W;
        const bh = b.height * H * 0.4;
        ctx.fillStyle = '#0a0a15';
        ctx.fillRect(bx, buildingBaseY - bh, bw, bh);

        // Windows
        for (let wy = 0; wy < b.windows; wy++) {
          const lit = Math.sin(t + b.x * 10 + wy) > 0;
          if (lit) {
            ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
            ctx.fillRect(bx + bw * 0.25, buildingBaseY - bh + 6 + wy * (bh / b.windows), bw * 0.2, 3);
            ctx.fillRect(bx + bw * 0.55, buildingBaseY - bh + 6 + wy * (bh / b.windows), bw * 0.2, 3);
          }
        }
      });

      // Palm trees
      palms.forEach((p) => {
        if (ctx) drawPalmTree(ctx, p.x * W + parallaxX * 0.8, waterY, p.scale);
      });

      // Neon sign (reflection on water)
      ctx.fillStyle = 'rgba(255, 45, 120, 0.04)';
      ctx.fillRect(0, waterY, W, H - waterY);

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [mounted]);

  return (
    <motion.div
      className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: mounted ? 'block' : 'none' }}
      />
      {/* Overlay text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <motion.h1
          className="font-display text-5xl md:text-8xl font-extrabold tracking-tight text-white neon-glow text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          NAVEEN SIVAKUMAR
        </motion.h1>
        <motion.p
          className="font-mono text-sm md:text-base text-accent tracking-[0.3em] uppercase mt-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          AI / LLM Analyst • MLOps
        </motion.p>
        <motion.div
          className="flex gap-3 mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <span className="font-mono text-xs px-3 py-1 rounded-full border border-primary/40 text-primary/80">MISSION: PORTFOLIO</span>
          <span className="font-mono text-xs px-3 py-1 rounded-full border border-accent/40 text-accent/80">COIMBATORE, TN</span>
        </motion.div>
      </div>
      {/* Bottom gradient fade into dark bg */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </motion.div>
  );
}
