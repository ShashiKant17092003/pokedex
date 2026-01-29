'use client';

import React, { useEffect, useRef } from 'react';

const LeafAttackBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId : number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const particles :RazorLeaf[] = [];
    // 60-80 particles create a dense "storm" without lagging
    const particleCount = 70; 

    class RazorLeaf {
      x: number;
      y: number;
      currentY: number;

      speedX: number;
      speedY: number;

      size: number;

      rotation: number;
      rotationSpeed: number;

      angle: number;
      amplitude: number;

      color: string;

      constructor(private width: number, private height: number) {
        this.x = 0;
        this.y = 0;
        this.currentY = 0;

        this.speedX = 0;
        this.speedY = 0;

        this.size = 0;

        this.rotation = 0;
        this.rotationSpeed = 0;

        this.angle = 0;
        this.amplitude = 0;

        this.color = "#000";

        this.init();
      }

      init() {
        // Spawn off-screen to the left
        this.x = Math.random() * -500;
        this.y = Math.random() * this.height;

        this.speedX = Math.random() * 12 + 15;
        this.speedY = (Math.random() - 0.5) * 3;

        this.size = Math.random() * 8 + 12;

        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.3 + 0.2;

        this.angle = 0;
        this.amplitude = Math.random() * 30;

        const colors = ['#48d0b0', '#78c850', '#a8e4a0', '#389030'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.angle += 0.1;
        this.currentY = this.y + Math.sin(this.angle) * this.amplitude;
        this.rotation += this.rotationSpeed;

        if (this.x > this.width + 50) {
          this.init();
          this.x = -50;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.currentY);
        ctx.rotate(this.rotation);

        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.quadraticCurveTo(this.size / 3, 0, 0, this.size);
        ctx.quadraticCurveTo(-this.size / 3, 0, 0, -this.size);

        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(0, this.size);
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new RazorLeaf(canvas.width, canvas.height));
    }

    const render = () => {
      // Clear for transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
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
      }}
    />
  );
};

export default LeafAttackBackground;