import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Cpu, Zap, BarChart3, Shield, Cog, LineChart } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Real-time Monitoring',
    description: 'Continuous monitoring of all critical parameters with instant alerts for any anomalies detected.',
  },
  {
    icon: BarChart3,
    title: 'Performance Optimization',
    description: 'Identify inefficiencies and optimize equipment performance to reduce energy consumption and costs.',
  },
  {
    icon: Shield,
    title: 'Predictive Maintenance',
    description: 'Schedule maintenance based on actual equipment condition rather than arbitrary time intervals.',
  },
  {
    icon: Cog,
    title: 'Smart Automation',
    description: 'Automate routine tasks and responses to common issues, freeing up your team for higher-value work.',
  },
  {
    icon: LineChart,
    title: 'Comprehensive Reporting',
    description: 'Detailed reports and dashboards provide insights into equipment health and operational efficiency.',
  },
  {
    icon: Cpu,
    title: 'AI-Powered Analytics',
    description: 'Advanced machine learning algorithms analyze equipment data in real-time to predict failures before they happen.',
  },
];

function FeatureCard({
  feature,
  index
}: {
  feature: typeof features[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{
        y: -10,
        rotateX: 5,
        transition: { duration: 0.3 }
      }}
      className="group perspective-1000"
    >
      <div className="relative h-full glass-enhanced rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-blue-600/0 group-hover:from-cyan-500/10 group-hover:to-blue-600/10 transition-all duration-500" />

        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all duration-300">
            <feature.icon className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </div>
          {/* Decorative line */}
          <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-14 transition-all duration-500" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-100 transition-colors">
          {feature.title}
        </h3>
        <p className="text-white/60 leading-relaxed text-sm lg:text-base">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="section-content relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/70">About Our Platform</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-2 text-white mb-6"
          >
            Intelligent Industrial
            <span className="text-gradient"> Operations Platform</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="body-large text-white/60"
          >
            FactoryOps AI combines cutting-edge artificial intelligence with deep industrial
            expertise to deliver a comprehensive solution for modern manufacturing operations.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 lg:mt-24"
        >
          <div className="glass-enhanced rounded-3xl p-8 lg:p-12 border border-white/10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '99.9%', label: 'System Uptime', description: 'Reliable monitoring' },
                { value: '40%', label: 'Cost Savings', description: 'Average reduction' },
                { value: '500+', label: 'Factories', description: 'Worldwide deployment' },
                { value: '24/7', label: 'Support', description: 'Always available' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white font-medium mb-1">{stat.label}</div>
                  <div className="text-sm text-white/50">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
