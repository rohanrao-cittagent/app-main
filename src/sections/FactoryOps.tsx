import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Plug, BrainCircuit, LineChart } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Connect",
    description: "Install non-intrusive sensors on your machinery in under 15 minutes. Plug-and-play compatibility with 99% of legacy equipment.",
    icon: Plug,
  },
  {
    id: 2,
    title: "Analyze",
    description: "Data streams securely to the cloud where AI models analyze frequencies, power consumption, and vibration patterns in real-time.",
    icon: BrainCircuit,
  },
  {
    id: 3,
    title: "Optimize",
    description: "Receive instant alerts on downtime risks and OEE bottlenecks via dashboard or mobile app. Take action before failure occurs.",
    icon: LineChart,
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

  return (
    <section
      ref={containerRef}
      id="factoryops"
      className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">We Monitor It All</span>
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
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 hidden md:block"></div>

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
                {/* Connector Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#020c1b] border-4 border-cyan-500 z-10 shadow-[0_0_15px_rgba(6,182,212,0.5)] hidden md:block"></div>

                <div className="flex-1 text-center md:text-left">
                  <div className={`p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    <h3 className="text-2xl font-bold text-cyan-400 mb-2 flex items-center gap-2 justify-center md:justify-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-sm font-extrabold mr-2 text-cyan-300">
                        {step.id}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex justify-center">
                  <motion.div
                    className="relative w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20"
                    animate={{
                      boxShadow: [
                        "0 0 30px -5px rgba(16, 185, 129, 0.3)",
                        "0 0 50px 0px rgba(16, 185, 129, 0.2)",
                        "0 0 30px -5px rgba(16, 185, 129, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <step.icon className="w-10 h-10" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
