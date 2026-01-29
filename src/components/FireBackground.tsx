'use client';

import React, { useEffect, useRef } from 'react';

const FireBackground = () => {
  // Fix 1: Explicitly type the ref so 'canvas' isn't 'never'
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Define the particle count
    const particleCount = 200; 
    const particles: Particle[] = [];

    class Particle {
      x!: number;
      y!: number;
      size!: number;
      speedX!: number;
      speedY!: number;
      life!: number;
      decay!: number;

      constructor(width: number, height: number) {
        this.init(width, height);
      }

      init(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 25 + 10;
        this.speedY = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.life = 1;
        this.decay = Math.random() * 0.015 + 0.005;
      }

      update(width: number, height: number) {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.life -= this.decay;

        // Respawn particle if it dies or goes off screen
        if (this.life <= 0) {
          this.init(width, height);
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Create a nice fire-like gradient effect using the particle's life
        const r = 255;
        const g = Math.floor(200 * this.life);
        const b = 0;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.life})`;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    const render = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 'lighter' makes overlapping particles look like glowing fire
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'black' // Fire looks better on a dark background
      }}
    />
  );
};

export default FireBackground;