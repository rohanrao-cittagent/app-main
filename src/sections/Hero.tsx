import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Activity, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const words = [
  { text: "Factory Ops", color: "text-gradient" },
  { text: "Production Line", color: "text-gradient-gold" },
  { text: "Factory Floor", color: "text-cyan-400" }, // Using a solid blue/cyan style or we can define a new gradient
];

// 3D Particle Network Component
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(50, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 15000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

// 3D Floating Card Component
function FloatingCard({
  icon: Icon,
  title,
  value,
  trend,
  delay
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  trend: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="relative preserve-3d"
    >
      <div className="glass-enhanced rounded-2xl p-5 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 glow-blue">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-sm text-white/60">{title}</span>
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-emerald-400 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40"
    >
      {/* 3D Background Effect */}
      <motion.div
        className="absolute inset-0"
        style={{ y, opacity }}
      >
        {/* Particle Network */}
        <ParticleNetwork />

        {/* Gradient Orbs with 3D effect */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]"
          animate={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]"
          animate={{
            x: -mousePosition.x * 20,
            y: -mousePosition.y * 20,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-400/15 rounded-full blur-[80px]"
          animate={{
            x: mousePosition.x * 15,
            y: mousePosition.y * 15,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
      </motion.div>

      {/* Content */}
      <div className="section-content relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white/70">AI-Powered Industrial Intelligence</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="heading-1 text-white mb-6"
            >
              <span className="block">Transform Your</span>
              <span className="block h-[1.2em] overflow-hidden whitespace-nowrap">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index].text}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block ${words[index].color}`}
                  >
                    {words[index].text}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="block">with AI</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="body-large text-white/60 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Harness the power of artificial intelligence to monitor, analyze, and optimize
              your industrial equipment in real-time. Reduce downtime, cut costs, and maximize efficiency.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 px-8 py-6 text-lg font-semibold group"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg font-semibold group"
              >
                <Play className="w-5 h-5 mr-2 text-cyan-400" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { value: '99.9%', label: 'Uptime' },
                { value: '40%', label: 'Cost Reduction' },
                { value: '500+', label: 'Factories' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - 3D Cards */}
          <div className="relative perspective-1000">
            <motion.div
              initial={{ opacity: 0, rotateY: -30 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative preserve-3d"
              style={{
                transform: `rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`,
              }}
            >
              {/* Main 3D Visualization */}
              <div className="relative">
                {/* Central Hub */}
                <motion.div
                  className="relative mx-auto w-64 h-64 lg:w-80 lg:h-80"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/30" />

                  {/* Middle Ring */}
                  <div className="absolute inset-8 rounded-full border border-blue-500/40" />

                  {/* Inner Ring */}
                  <div className="absolute inset-16 rounded-full border-2 border-purple-500/50" />

                  {/* Center */}
                  <div className="absolute inset-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center glow-cyan">
                    <Activity className="w-12 h-12 text-white" />
                  </div>

                  {/* Orbiting Dots */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 rounded-full bg-cyan-400"
                      style={{
                        top: `${50 + 45 * Math.sin((angle * Math.PI) / 180)}%`,
                        left: `${50 + 45 * Math.cos((angle * Math.PI) / 180)}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Floating Stats Cards */}
                <div className="absolute -left-4 top-0 lg:-left-8">
                  <FloatingCard
                    icon={Activity}
                    title="Live Monitoring"
                    value="2,847"
                    trend="+12.5%"
                    delay={0.5}
                  />
                </div>

                <div className="absolute -right-4 top-1/4 lg:-right-8">
                  <FloatingCard
                    icon={TrendingUp}
                    title="Efficiency"
                    value="94.2%"
                    trend="+5.3%"
                    delay={0.6}
                  />
                </div>

                <div className="absolute -left-4 bottom-0 lg:-left-8">
                  <FloatingCard
                    icon={Shield}
                    title="Alerts"
                    value="0"
                    trend="All Clear"
                    delay={0.7}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
