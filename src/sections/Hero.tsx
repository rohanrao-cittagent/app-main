import { useRef, useEffect, useState, memo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Activity, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const words = [
  { text: "Factory Ops", color: "text-gradient" },
  { text: "Production Line", color: "text-gradient-gold" },
  { text: "Factory Floor", color: "text-cyan-400" },
];

// 3D Particle Network Component
const ParticleNetwork = memo(function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(canvasRef, { margin: "100px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

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
      // Responsive particle count: fewer on mobile
      const isMobile = window.innerWidth < 768;
      const baseCount = isMobile ? 20 : 50;
      const count = Math.min(baseCount, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 15000));
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
      /* Optimization: only draw if in view */
      if (!isInView) {
        animationId = requestAnimationFrame(draw);
        return;
      }

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
  }, [isInView]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
});

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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="relative"
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

import VideoModal from '@/components/VideoModal';
import videoUrl from '@/assets/video/Energy_Intelligence.mp4';

// ... existing code ...

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [index, setIndex] = useState(0);

  // Performance Optimization: Use useMotionValue instead of useState for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  // Transformations for background elements based on mouse position
  const bgX1 = useTransform(springX, (value) => value * 30);
  const bgY1 = useTransform(springY, (value) => value * 30);

  const bgX2 = useTransform(springX, (value) => -value * 20);
  const bgY2 = useTransform(springY, (value) => -value * 20);

  const bgX3 = useTransform(springX, (value) => value * 15);
  const bgY3 = useTransform(springY, (value) => value * 15);


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
    let rafId: number;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return; // Throttle using RAF

      rafId = requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          // Calculate normalized position (-0.5 to 0.5)
          const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
          const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

          // Only update if movement is significant
          if (Math.abs(x - lastX) > 0.01 || Math.abs(y - lastY) > 0.01) {
            mouseX.set(x);
            mouseY.set(y);
            lastX = x;
            lastY = y;
          }
        }
        rafId = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

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
          style={{ x: bgX1, y: bgY1 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]"
          style={{ x: bgX2, y: bgY2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-400/15 rounded-full blur-[80px]"
          style={{ x: bgX3, y: bgY3 }}
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
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    size="lg"
                    onClick={() => {
                      setIsPopoverOpen(true);
                      setTimeout(() => setIsPopoverOpen(false), 1500);
                    }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 px-8 py-6 text-lg font-semibold group"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-80 bg-[rgba(2,12,27,0.95)] backdrop-blur-xl border border-cyan-500/20 text-white"
                  side="top"
                  sideOffset={10}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Coming Soon!</h4>
                      <p className="text-sm text-white/70">Free trials will be available shortly.</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsVideoOpen(true)}
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
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
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
      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc={videoUrl}
      />
    </section>
  );
}
