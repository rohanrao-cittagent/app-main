import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Plug, BrainCircuit, LineChart } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Connect",
    description: "Install non-intrusive sensors on your machinery in under 15 minutes. Plug-and-play compatibility with 99% of legacy equipment.",
    icon: Plug,
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
    glowColor: "rgba(6, 182, 212, 0.5)",
  },
  {
    id: 2,
    title: "Analyze",
    description: "Data streams securely to the cloud where AI models analyze frequencies, power consumption, and vibration patterns in real-time.",
    icon: BrainCircuit,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    glowColor: "rgba(168, 85, 247, 0.5)",
  },
  {
    id: 3,
    title: "Optimize",
    description: "Receive instant alerts on downtime risks and OEE bottlenecks via dashboard or mobile app. Take action before failure occurs.",
    icon: LineChart,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    glowColor: "rgba(16, 185, 129, 0.5)",
  },
];

export default function FactoryOps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      id="factoryops"
      className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Enhanced Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-[180px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            From Individual Assets to Entire Assembly Lines —<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 animate-gradient">
              We Monitor It All
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Deployment is simple. Our hardware-agnostic platform gets you live data without stopping your production line.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-purple-500/20 to-emerald-500/20" />
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyan-400 via-purple-400 to-emerald-400"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Enhanced Connector Dot with Pulse */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full z-10 hidden md:block"
                  animate={{
                    boxShadow: [
                      `0 0 20px 5px ${step.glowColor}`,
                      `0 0 30px 10px ${step.glowColor}`,
                      `0 0 20px 5px ${step.glowColor}`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${step.gradient} border-2 border-white/20`} />
                </motion.div>

                {/* Enhanced Card with Gradient Border */}
                <div className="flex-1 text-center md:text-left w-full">
                  <motion.div
                    className={`relative p-[2px] rounded-2xl bg-gradient-to-br ${step.gradient} ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                      }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Animated gradient border effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0"
                      animate={{
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        background: `linear-gradient(45deg, transparent, ${step.glowColor}, transparent)`,
                        filter: 'blur(10px)',
                      }}
                    />

                    <div className="relative p-6 rounded-2xl bg-[#020c1b] backdrop-blur">
                      <h3 className={`text-2xl font-bold mb-2 flex items-center gap-3 ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                        } justify-center`}>
                        <motion.span
                          className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-sm font-extrabold text-white shadow-lg`}
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          {step.id}
                        </motion.span>
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${step.gradient}`}>
                          {step.title}
                        </span>
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Enhanced Icon with Particles Effect */}
                <div className="flex-1 flex justify-center">
                  <div className="relative">
                    {/* Particle rings */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} opacity-20 blur-xl`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} opacity-10 blur-2xl`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.3, 0.1],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />

                    {/* Main Icon */}
                    <motion.div
                      className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white border-2 border-white/20 shadow-2xl`}
                      animate={{
                        boxShadow: [
                          `0 0 40px 10px ${step.glowColor}`,
                          `0 0 60px 20px ${step.glowColor}`,
                          `0 0 40px 10px ${step.glowColor}`,
                        ],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 15,
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <step.icon className="w-7 h-7" strokeWidth={1.5} />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
