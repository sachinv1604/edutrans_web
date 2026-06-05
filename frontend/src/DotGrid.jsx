'use client';
import { useRef, useEffect, useCallback, useMemo } from 'react';
import './DotGrid.css';

function hexToRgba(hex) {
  const cleaned = hex.replace('#', '');
  if (cleaned.length === 3) {
    const r = parseInt(cleaned[0] + cleaned[0], 16);
    const g = parseInt(cleaned[1] + cleaned[1], 16);
    const b = parseInt(cleaned[2] + cleaned[2], 16);
    return { r, g, b, a: 1.0 };
  }
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  let a = 1.0;
  if (cleaned.length === 8) {
    a = parseInt(cleaned.substring(6, 8), 16) / 255;
  }
  return {
    r: isNaN(r) ? 0 : r,
    g: isNaN(g) ? 0 : g,
    b: isNaN(b) ? 0 : b,
    a: isNaN(a) ? 1.0 : a
  };
}

const DotGrid = ({
  dotSize = 3,
  gap = 22,
  baseColor = '#ffffff12',
  activeColor = '#ffffff',
  proximity = 120,
  shockRadius = 180,
  shockStrength = 18,
  className = '',
  style
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({ x: -1000, y: -1000 });
  const shockwavesRef = useRef([]);

  const baseRgba = useMemo(() => hexToRgba(baseColor), [baseColor]);
  const activeRgba = useMemo(() => hexToRgba(activeColor), [activeColor]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    // Secure fallback: use client window dimensions if container has no rect
    let { width, height } = wrap.getBoundingClientRect();
    if (!width || !height) {
      width = window.innerWidth || 800;
      height = window.innerHeight || 600;
    }

    // Set 1:1 pixel scaling for standard screen mapping
    const dpr = 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({
          cx,
          cy,
          x: cx,
          y: cy
        });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    let rafId;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const px = pointerRef.current.x;
      const py = pointerRef.current.y;

      // 1. Update Click Shockwaves
      shockwavesRef.current = shockwavesRef.current.filter(wave => {
        wave.radius += wave.speed;
        return wave.radius < wave.maxRadius;
      });

      // 2. Draw Spotlight Aura behind the dots at the cursor position
      if (px !== -1000 && py !== -1000) {
        const glowRad = proximity * 2.5; 
        const grad = ctx.createRadialGradient(px, py, 0, px, py, glowRad);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.38)');  
        grad.addColorStop(0.25, 'rgba(6, 182, 212, 0.22)'); 
        grad.addColorStop(0.55, 'rgba(99, 102, 241, 0.08)'); 
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, glowRad, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw Dots with smooth target-based interpolation
      for (const dot of dotsRef.current) {
        let targetX = dot.cx;
        let targetY = dot.cy;

        // Repulsion from cursor
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        if (dsq < proxSq) {
          const dist = Math.sqrt(dsq) || 1;
          const force = (proximity - dist) / proximity; // 0 to 1
          const displacement = force * 24; 
          targetX += (dx / dist) * displacement;
          targetY += (dy / dist) * displacement;
        }

        // Repulsion from shockwaves
        for (const wave of shockwavesRef.current) {
          const wdx = dot.cx - wave.x;
          const wdy = dot.cy - wave.y;
          const wdist = Math.hypot(wdx, wdy);
          const ringWidth = 40;
          const distToRing = Math.abs(wdist - wave.radius);

          if (distToRing < ringWidth) {
            const force = (ringWidth - distToRing) / ringWidth; 
            const strength = force * wave.strength * (1 - wave.radius / wave.maxRadius);
            targetX += (wdx / (wdist || 1)) * strength;
            targetY += (wdy / (wdist || 1)) * strength;
          }
        }

        // Smooth position tracking (chase target position)
        dot.x += (targetX - dot.x) * 0.12;
        dot.y += (targetY - dot.y) * 0.12;

        // Calculate opacity and size based on proximity to cursor
        let fillStyle = baseColor;
        let currentSize = dotSize;

        const drawDx = dot.cx - px;
        const drawDy = dot.cy - py;
        const drawDsq = drawDx * drawDx + drawDy * drawDy;

        if (drawDsq < proxSq) {
          const dist = Math.sqrt(drawDsq);
          const t = 1 - dist / proximity;

          // Interpolate both RGB and Alpha channels cleanly
          const r = Math.round(baseRgba.r + (activeRgba.r - baseRgba.r) * t);
          const g = Math.round(baseRgba.g + (activeRgba.g - baseRgba.g) * t);
          const b = Math.round(baseRgba.b + (activeRgba.b - baseRgba.b) * t);
          const a = baseRgba.a + (activeRgba.a - baseRgba.a) * t;
          fillStyle = `rgba(${r},${g},${b},${a})`;

          // Enlarge dots dynamically
          currentSize = dotSize + (3.0 * t);
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgba, baseRgba, dotSize]);

  useEffect(() => {
    buildGrid();
    let ro = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid);
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = e => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      pointerRef.current.x = -1000;
      pointerRef.current.y = -1000;
    };

    const onClick = e => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      shockwavesRef.current.push({
        x: cx,
        y: cy,
        radius: 0,
        maxRadius: 240,
        speed: 5,
        strength: shockStrength
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('click', onClick);
    };
  }, [shockStrength]);

  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid;
