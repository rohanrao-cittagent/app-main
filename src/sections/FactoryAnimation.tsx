import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Factory, Cpu, Zap, Activity } from 'lucide-react';

// Animated Factory Scene Component
function FactoryScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const drawFactory = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw grid floor
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, centerY + 50);
        ctx.lineTo(i - (i - centerX) * 0.3, height);
        ctx.stroke();
      }

      for (let i = centerY + 50; i < height; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Draw factory building outline
      const buildingWidth = 300;
      const buildingHeight = 150;
      const buildingX = centerX - buildingWidth / 2;
      const buildingY = centerY - 50;

      // Building glow
      const buildingGradient = ctx.createLinearGradient(buildingX, buildingY, buildingX, buildingY + buildingHeight);
      buildingGradient.addColorStop(0, 'rgba(0, 212, 255, 0.1)');
      buildingGradient.addColorStop(1, 'rgba(0, 153, 255, 0.05)');

      ctx.fillStyle = buildingGradient;
      ctx.fillRect(buildingX, buildingY, buildingWidth, buildingHeight);

      // Building outline
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(buildingX, buildingY, buildingWidth, buildingHeight);

      // Draw chimneys
      const chimneys = [
        { x: buildingX + 40, y: buildingY - 40, w: 20, h: 40 },
        { x: buildingX + 80, y: buildingY - 55, w: 20, h: 55 },
        { x: buildingX + buildingWidth - 60, y: buildingY - 45, w: 20, h: 45 },
      ];

      chimneys.forEach((chimney, i) => {
        // Chimney body
        ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
        ctx.fillRect(chimney.x, chimney.y, chimney.w, chimney.h);
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
        ctx.strokeRect(chimney.x, chimney.y, chimney.w, chimney.h);

        // Smoke particles
        const smokeCount = 5;
        for (let j = 0; j < smokeCount; j++) {
          const smokeY = chimney.y - 10 - ((time * 20 + j * 15) % 80);
          const smokeX = chimney.x + chimney.w / 2 + Math.sin(time * 2 + j + i) * 10;
          const smokeSize = 5 + ((time * 20 + j * 15) % 80) / 8;
          const smokeOpacity = 1 - ((time * 20 + j * 15) % 80) / 80;

          ctx.beginPath();
          ctx.arc(smokeX, smokeY, smokeSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 255, ${smokeOpacity * 0.3})`;
          ctx.fill();
        }
      });

      // Draw windows with pulsing lights
      const windows = [
        { x: buildingX + 30, y: buildingY + 30, w: 30, h: 25 },
        { x: buildingX + 80, y: buildingY + 30, w: 30, h: 25 },
        { x: buildingX + 130, y: buildingY + 30, w: 30, h: 25 },
        { x: buildingX + 180, y: buildingY + 30, w: 30, h: 25 },
        { x: buildingX + 230, y: buildingY + 30, w: 30, h: 25 },
        { x: buildingX + 30, y: buildingY + 80, w: 30, h: 25 },
        { x: buildingX + 80, y: buildingY + 80, w: 30, h: 25 },
        { x: buildingX + 130, y: buildingY + 80, w: 30, h: 25 },
        { x: buildingX + 180, y: buildingY + 80, w: 30, h: 25 },
        { x: buildingX + 230, y: buildingY + 80, w: 30, h: 25 },
      ];

      windows.forEach((window, i) => {
        const pulse = Math.sin(time * 3 + i * 0.5) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(0, 212, 255, ${pulse * 0.4})`;
        ctx.fillRect(window.x, window.y, window.w, window.h);
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
        ctx.strokeRect(window.x, window.y, window.w, window.h);
      });

      // Draw conveyor belt
      const beltY = buildingY + buildingHeight + 30;
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(buildingX - 50, beltY);
      ctx.lineTo(buildingX + buildingWidth + 50, beltY);
      ctx.stroke();

      // Moving items on conveyor
      const itemCount = 4;
      for (let i = 0; i < itemCount; i++) {
        const itemX = buildingX - 30 + ((time * 30 + i * 80) % (buildingWidth + 100));
        const itemY = beltY - 8;

        ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
        ctx.fillRect(itemX, itemY, 16, 12);
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.8)';
        ctx.strokeRect(itemX, itemY, 16, 12);
      }

      // Draw data flow lines
      const flowLines = [
        { startX: buildingX - 80, startY: centerY - 20, endX: buildingX, endY: centerY },
        { startX: buildingX + buildingWidth, startY: centerY, endX: buildingX + buildingWidth + 80, endY: centerY - 20 },
        { startX: buildingX - 60, startY: centerY + 40, endX: buildingX, endY: centerY + 30 },
        { startX: buildingX + buildingWidth, startY: centerY + 30, endX: buildingX + buildingWidth + 60, endY: centerY + 40 },
      ];

      flowLines.forEach((line, i) => {
        const progress = (time * 2 + i * 0.5) % 1;
        const currentX = line.startX + (line.endX - line.startX) * progress;
        const currentY = line.startY + (line.endY - line.startY) * progress;

        // Draw line
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.stroke();

        // Draw moving data packet
        ctx.beginPath();
        ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
        ctx.fill();
      });

      // Draw floating data nodes
      const nodes = [
        { x: buildingX - 100, y: centerY - 30, icon: 'cpu' },
        { x: buildingX + buildingWidth + 100, y: centerY - 30, icon: 'activity' },
        { x: buildingX - 80, y: centerY + 50, icon: 'zap' },
        { x: buildingX + buildingWidth + 80, y: centerY + 50, icon: 'factory' },
      ];

      nodes.forEach((node, i) => {
        const floatY = Math.sin(time * 2 + i) * 5;

        // Node glow
        const nodeGradient = ctx.createRadialGradient(
          node.x, node.y + floatY, 0,
          node.x, node.y + floatY, 25
        );
        nodeGradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
        nodeGradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

        ctx.fillStyle = nodeGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y + floatY, 25, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y + floatY, 15, 0, Math.PI * 2);
        ctx.stroke();

        // Inner dot
        ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(node.x, node.y + floatY, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 0.016;
      animationId = requestAnimationFrame(drawFactory);
    };

    resize();
    drawFactory();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default function FactoryAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  return (
    <section
      ref={containerRef}
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      <motion.div
        className="section-content relative z-10"
        style={{ opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-enhanced rounded-3xl border border-white/10 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 lg:p-8 border-b border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">
                  Smart Factory Visualization
                </h3>
                <p className="text-white/60">
                  Real-time data flow and equipment monitoring in action
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm text-white/70">Live</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-white/70">AI Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Animation Canvas */}
          <div className="relative h-[300px] lg:h-[400px]">
            <FactoryScene />

            {/* Overlay Stats */}
            <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-auto">
              <div className="flex flex-wrap gap-3">
                <div className="glass-dark rounded-xl px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Factory className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-white/70">24 Machines</span>
                  </div>
                </div>
                <div className="glass-dark rounded-xl px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-white/70">1,247 kW</span>
                  </div>
                </div>
                <div className="glass-dark rounded-xl px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-white/70">94.2% OEE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
