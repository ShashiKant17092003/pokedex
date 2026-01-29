'use client';

import React, { useEffect, useRef } from 'react';

const LeafAttackBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    // 60-80 particles create a dense "storm" without lagging
    const particleCount = 70; 

    class RazorLeaf {
      constructor() {
        this.init();
      }

      init() {
        // Spawn off-screen to the left
        this.x = Math.random() * -500; 
        this.y = Math.random() * canvas.height;
        
        // High horizontal speed (Wind force)
        this.speedX = Math.random() * 12 + 15; 
        // Slight vertical oscillation
        this.speedY = (Math.random() - 0.5) * 3; 
        
        this.size = Math.random() * 8 + 12;
        
        // Rapid spinning for an aggressive feel
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.3 + 0.2;
        
        // Turbulence/Wave effect
        this.angle = 0;
        this.amplitude = Math.random() * 30;

        // Variety of leaf greens
        const colors = ['#48d0b0', '#78c850', '#a8e4a0', '#389030'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.angle += 0.1;
        this.currentY = this.y + Math.sin(this.angle) * this.amplitude;
        this.rotation += this.rotationSpeed;

        // Reset once it crosses the right edge
        if (this.x > canvas.width + 50) {
          this.init();
          this.x = -50; 
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.currentY);
        ctx.rotate(this.rotation);
        
        // Draw a sharp, aerodynamic leaf
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        // Tighter curves for a "razor" look
        ctx.quadraticCurveTo(this.size / 3, 0, 0, this.size);
        ctx.quadraticCurveTo(-this.size / 3, 0, 0, -this.size);
        
        // Add a subtle "energy" glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Central vein for detail
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
      particles.push(new RazorLeaf());
    }

    const render = () => {
      // Clear for transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
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